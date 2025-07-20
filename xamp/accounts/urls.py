from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView, TokenVerifyView
from .api.auth.views import RegisterAPIView, LoginAPIView, LogoutAPIView, UserProfileAPIView, ChangePasswordAPIView, CSRFTokenView
from .api.session.views import SessionInfoAPIView, TerminateSessionsAPIView, ExtendSessionAPIView
from .api.otp.views import RequestOTPAPIView, VerifyOTPAPIView, UpdatePhoneNumberAPIView
from .api.password.views import PasswordResetRequestAPIView, PasswordResetConfirmAPIView, EmailVerificationRequestAPIView, EmailVerificationConfirmAPIView

urlpatterns = [
    path('register/', RegisterAPIView.as_view(), name='register'),
    path('login/', LoginAPIView.as_view(), name='login'),
    path('logout/', LogoutAPIView.as_view(), name='logout'),
    path('profile/', UserProfileAPIView.as_view(), name='profile'),
    path('change-password/', ChangePasswordAPIView.as_view(), name='change-password'),
    
    # JWT token endpoints
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('csrf-token/', CSRFTokenView.as_view(), name='csrf_token'),
    
    # Session management endpoints
    path('sessions/', SessionInfoAPIView.as_view(), name='session_info'),
    path('sessions/terminate-others/', TerminateSessionsAPIView.as_view(), name='terminate_sessions'),
    path('sessions/extend/', ExtendSessionAPIView.as_view(), name='extend_session'),
    
    # OTP verification endpoints
    path('otp/request/', RequestOTPAPIView.as_view(), name='request_otp'),
    path('otp/verify/', VerifyOTPAPIView.as_view(), name='verify_otp'),
    path('update-phone/', UpdatePhoneNumberAPIView.as_view(), name='update_phone'),
    
    # Password reset endpoints
    path('password/reset/request/', PasswordResetRequestAPIView.as_view(), name='password-reset-request'),
    path('password/reset/confirm/', PasswordResetConfirmAPIView.as_view(), name='password-reset-confirm'),
    
    # Email verification endpoints
    path('email/verify/request/', EmailVerificationRequestAPIView.as_view(), name='email-verify-request'),
    path('email/verify/confirm/', EmailVerificationConfirmAPIView.as_view(), name='email-verify-confirm'),
]
