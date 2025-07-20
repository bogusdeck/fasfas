import time
from datetime import datetime, timedelta
from django.conf import settings
from django.contrib.sessions.models import Session
from django.utils import timezone


def get_active_sessions_for_user(user):
    """
    Get all active sessions for a user
    """
    sessions = []
    all_sessions = Session.objects.filter(expire_date__gte=timezone.now())
    
    for session in all_sessions:
        session_data = session.get_decoded()
        if session_data.get('_auth_user_id') == str(user.id):
            sessions.append({
                'session_key': session.session_key,
                'expire_date': session.expire_date,
                'last_activity': datetime.fromtimestamp(session_data.get('last_activity', 0)),
                'ip_address': session_data.get('ip_address', 'Unknown'),
                'user_agent': session_data.get('user_agent', 'Unknown'),
            })
    
    return sessions


def terminate_all_sessions_for_user(user, except_session_key=None):
    """
    Terminate all sessions for a user except the current one
    """
    all_sessions = Session.objects.filter(expire_date__gte=timezone.now())
    terminated_count = 0
    
    for session in all_sessions:
        session_data = session.get_decoded()
        if session_data.get('_auth_user_id') == str(user.id):
            if except_session_key and session.session_key == except_session_key:
                continue
            session.delete()
            terminated_count += 1
    
    return terminated_count


def extend_session(session, duration_seconds=None):
    """
    Extend a session's expiry time
    """
    if duration_seconds is None:
        duration_seconds = settings.SESSION_COOKIE_AGE
    
    session.set_expiry(duration_seconds)
    session['last_activity'] = int(time.time())
    session.save()


def is_session_expired(session):
    """
    Check if a session is expired based on inactivity
    """
    last_activity = session.get('last_activity', 0)
    inactivity_period = int(time.time()) - last_activity
    max_inactivity = getattr(settings, 'SESSION_INACTIVITY_TIMEOUT', settings.SESSION_COOKIE_AGE)
    
    return inactivity_period > max_inactivity
