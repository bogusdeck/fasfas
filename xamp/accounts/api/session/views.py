from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.sessions.models import Session
from django.utils import timezone
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

from accounts.utils.session_utils import (
    get_active_sessions_for_user,
    terminate_all_sessions_for_user,
    extend_session
)


class SessionInfoAPIView(APIView):
    """
    View to get information about the current session and all active sessions
    """
    permission_classes = [permissions.IsAuthenticated]
    
    @swagger_auto_schema(
        operation_summary="Get session information",
        operation_description="Returns information about the current session and all active sessions for the user",
        responses={
            200: openapi.Response(
                description="Session information retrieved successfully",
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'current_session': openapi.Schema(type=openapi.TYPE_OBJECT),
                        'all_sessions': openapi.Schema(
                            type=openapi.TYPE_ARRAY,
                            items=openapi.Schema(type=openapi.TYPE_OBJECT)
                        ),
                    }
                )
            ),
            401: openapi.Response(description="Authentication required")
        }
    )
    def get(self, request):
        if not request.user.is_authenticated:
            return Response(
                {"detail": "Authentication required"}, 
                status=status.HTTP_401_UNAUTHORIZED
            )
        
        # Get current session info
        current_session = {
            'session_key': request.session.session_key,
            'is_authenticated': request.user.is_authenticated,
            'user_id': request.user.id,
            'user_email': request.user.email,
        }
        
        # Get all active sessions for this user
        all_sessions = get_active_sessions_for_user(request.user)
        
        return Response({
            'current_session': current_session,
            'all_active_sessions': all_sessions,
            'total_active_sessions': len(all_sessions)
        })


class TerminateSessionsAPIView(APIView):
    """
    View to terminate all other sessions for the current user
    """
    permission_classes = [permissions.IsAuthenticated]
    
    @swagger_auto_schema(
        operation_summary="Terminate other sessions",
        operation_description="Terminates all other active sessions for the current user except the current one",
        responses={
            200: openapi.Response(
                description="Sessions terminated successfully",
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'detail': openapi.Schema(type=openapi.TYPE_STRING),
                        'terminated_count': openapi.Schema(type=openapi.TYPE_INTEGER),
                    }
                )
            ),
            401: openapi.Response(description="Authentication required")
        }
    )
    def post(self, request):
        if not request.user.is_authenticated:
            return Response(
                {"detail": "Authentication required"}, 
                status=status.HTTP_401_UNAUTHORIZED
            )
        
        # Keep current session, terminate all others
        terminated_count = terminate_all_sessions_for_user(
            request.user, 
            except_session_key=request.session.session_key
        )
        
        return Response({
            'detail': f'Successfully terminated {terminated_count} other sessions',
            'terminated_count': terminated_count
        })


class ExtendSessionAPIView(APIView):
    """
    View to extend the current session
    """
    permission_classes = [permissions.IsAuthenticated]
    
    @swagger_auto_schema(
        operation_summary="Extend current session",
        operation_description="Extends the expiry time of the current session",
        responses={
            200: openapi.Response(
                description="Session extended successfully",
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'detail': openapi.Schema(type=openapi.TYPE_STRING),
                        'new_expiry': openapi.Schema(type=openapi.TYPE_STRING, format='date-time'),
                    }
                )
            ),
            401: openapi.Response(description="Authentication required")
        }
    )
    def post(self, request):
        if not request.user.is_authenticated:
            return Response(
                {"detail": "Authentication required"}, 
                status=status.HTTP_401_UNAUTHORIZED
            )
        
        # Extend the current session
        extend_session(request.session)
        
        return Response({
            'detail': 'Session extended successfully',
            'new_expiry': timezone.now() + timezone.timedelta(seconds=request.session.get_expiry_age())
        })
