import time
from django.conf import settings
from django.utils import timezone


class SessionActivityMiddleware:
    """
    Middleware to track user's last activity and manage session expiry
    """
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Process the request
        if request.user.is_authenticated:
            # Update last activity time in the session
            current_time = int(time.time())
            request.session['last_activity'] = current_time
            
            # Check if we should update the user's last_login in database
            # Only update once per day to avoid excessive database writes
            if not request.session.get('last_db_update') or \
               current_time - request.session.get('last_db_update', 0) > 86400:  # 24 hours
                request.user.last_login = timezone.now()
                request.user.save(update_fields=['last_login'])
                request.session['last_db_update'] = current_time

        response = self.get_response(request)
        return response


class JWTSessionMiddleware:
    """
    Middleware to synchronize JWT tokens with Django sessions
    """
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Check for JWT in the Authorization header
        auth_header = request.META.get('HTTP_AUTHORIZATION', '')
        if auth_header.startswith('Bearer '):
            # Store the JWT in the session for future use
            token = auth_header.split(' ')[1]
            request.session['jwt_token'] = token
            
            # Set session expiry to match JWT expiry
            # Default to 1 hour if not specified in settings
            jwt_expiry = getattr(settings, 'SIMPLE_JWT', {}).get(
                'ACCESS_TOKEN_LIFETIME', 3600
            )
            if hasattr(jwt_expiry, 'total_seconds'):
                jwt_expiry = int(jwt_expiry.total_seconds())
            request.session.set_expiry(jwt_expiry)

        response = self.get_response(request)
        return response
