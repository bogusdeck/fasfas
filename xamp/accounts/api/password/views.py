from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import get_user_model
from django.utils import timezone
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

from accounts.models import OTPVerification
from .serializers import (
    PasswordResetRequestSerializer, 
    PasswordResetConfirmSerializer,
    EmailVerificationSerializer
)
from accounts.api.otp.serializers import VerifyOTPSerializer
from accounts.utils.otp_utils import send_otp_via_email
from accounts.utils.throttling import OTPRequestThrottle

User = get_user_model()


class PasswordResetRequestAPIView(APIView):
    """
    API endpoint for requesting a password reset
    
    Sends a password reset OTP code to the user's email
    Rate limited to 3 requests per hour per IP address
    """
    permission_classes = [permissions.AllowAny]
    throttle_classes = [OTPRequestThrottle]
    
    @swagger_auto_schema(
        operation_summary="Request password reset",
        operation_description="Sends a password reset OTP code to the user's email",
        request_body=PasswordResetRequestSerializer,
        responses={
            200: openapi.Response(
                description="Password reset OTP sent successfully",
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'success': openapi.Schema(type=openapi.TYPE_BOOLEAN),
                        'message': openapi.Schema(type=openapi.TYPE_STRING),
                    }
                )
            ),
            400: openapi.Response(description="Bad request, validation error"),
            404: openapi.Response(description="User not found")
        }
    )
    def post(self, request):
        serializer = PasswordResetRequestSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            
            try:
                user = User.objects.get(email=email)
                
                # Generate password reset OTP
                otp = OTPVerification.generate_otp(user, 'email')
                
                # Send OTP via email with password_reset purpose
                success, message = send_otp_via_email(user, otp.otp_code, purpose='password_reset')
                
                if success:
                    return Response(
                        {'success': True, 'message': 'Password reset instructions sent to your email'},
                        status=status.HTTP_200_OK
                    )
                else:
                    return Response(
                        {'success': False, 'message': 'Failed to send password reset email'},
                        status=status.HTTP_500_INTERNAL_SERVER_ERROR
                    )
                
            except User.DoesNotExist:
                # Return success even if user doesn't exist to prevent user enumeration
                return Response(
                    {'success': True, 'message': 'If your email is registered, you will receive password reset instructions'},
                    status=status.HTTP_200_OK
                )
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PasswordResetConfirmAPIView(APIView):
    """
    API endpoint for confirming password reset
    
    Verifies the OTP code and resets the user's password
    """
    permission_classes = [permissions.AllowAny]
    
    @swagger_auto_schema(
        operation_summary="Confirm password reset",
        operation_description="Verifies the OTP code and resets the user's password",
        request_body=PasswordResetConfirmSerializer,
        responses={
            200: openapi.Response(
                description="Password reset successful",
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'success': openapi.Schema(type=openapi.TYPE_BOOLEAN),
                        'message': openapi.Schema(type=openapi.TYPE_STRING),
                    }
                )
            ),
            400: openapi.Response(description="Bad request, validation error"),
            404: openapi.Response(description="User not found")
        }
    )
    def post(self, request):
        serializer = PasswordResetConfirmSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            otp_code = serializer.validated_data['otp_code']
            new_password = serializer.validated_data['new_password']
            
            try:
                user = User.objects.get(email=email)
                
                # Verify OTP
                success, message = OTPVerification.verify_otp(user, 'email', otp_code)
                
                if success:
                    # Reset password
                    user.set_password(new_password)
                    user.save()
                    
                    return Response(
                        {'success': True, 'message': 'Password reset successful'},
                        status=status.HTTP_200_OK
                    )
                else:
                    return Response(
                        {'success': False, 'message': message},
                        status=status.HTTP_400_BAD_REQUEST
                    )
                
            except User.DoesNotExist:
                return Response(
                    {'success': False, 'message': 'User not found'},
                    status=status.HTTP_404_NOT_FOUND
                )
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class EmailVerificationRequestAPIView(APIView):
    """
    API endpoint for requesting email verification
    
    Sends an email verification OTP code to the user's email
    """
    permission_classes = [permissions.AllowAny]
    throttle_classes = [OTPRequestThrottle]
    
    @swagger_auto_schema(
        operation_summary="Request email verification",
        operation_description="Sends an email verification OTP code to the user's email",
        request_body=EmailVerificationSerializer,
        responses={
            200: openapi.Response(
                description="Email verification OTP sent successfully",
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'success': openapi.Schema(type=openapi.TYPE_BOOLEAN),
                        'message': openapi.Schema(type=openapi.TYPE_STRING),
                    }
                )
            ),
            400: openapi.Response(description="Bad request, validation error"),
            404: openapi.Response(description="User not found")
        }
    )
    def post(self, request):
        serializer = EmailVerificationSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            
            try:
                user = User.objects.get(email=email)
                
                # Check if email is already verified
                if user.is_email_verified:
                    return Response(
                        {'success': True, 'message': 'Email is already verified'},
                        status=status.HTTP_200_OK
                    )
                
                # Generate email verification OTP
                otp = OTPVerification.generate_otp(user, 'email')
                
                # Send OTP via email
                success, message = send_otp_via_email(user, otp.otp_code)
                
                if success:
                    return Response(
                        {'success': True, 'message': 'Email verification code sent successfully'},
                        status=status.HTTP_200_OK
                    )
                else:
                    return Response(
                        {'success': False, 'message': 'Failed to send email verification code'},
                        status=status.HTTP_500_INTERNAL_SERVER_ERROR
                    )
                
            except User.DoesNotExist:
                return Response(
                    {'success': False, 'message': 'User not found'},
                    status=status.HTTP_404_NOT_FOUND
                )
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class EmailVerificationConfirmAPIView(APIView):
    """
    API endpoint for confirming email verification
    
    Verifies the OTP code and marks the user's email as verified
    """
    permission_classes = [permissions.AllowAny]
    
    @swagger_auto_schema(
        operation_summary="Confirm email verification",
        operation_description="Verifies the OTP code and marks the user's email as verified",
        request_body=VerifyOTPSerializer,
        responses={
            200: openapi.Response(
                description="Email verification successful",
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'success': openapi.Schema(type=openapi.TYPE_BOOLEAN),
                        'message': openapi.Schema(type=openapi.TYPE_STRING),
                    }
                )
            ),
            400: openapi.Response(description="Bad request, validation error"),
            404: openapi.Response(description="User not found")
        }
    )
    def post(self, request):
        serializer = VerifyOTPSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data.get('email')
            otp_code = serializer.validated_data['otp_code']
            otp_type = serializer.validated_data['otp_type']
            
            if otp_type != 'email':
                return Response(
                    {'success': False, 'message': 'Invalid OTP type for email verification'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            try:
                user = User.objects.get(email=email)
                
                # Verify OTP
                success, message = OTPVerification.verify_otp(user, otp_type, otp_code)
                
                if success:
                    return Response(
                        {'success': True, 'message': 'Email verified successfully'},
                        status=status.HTTP_200_OK
                    )
                else:
                    return Response(
                        {'success': False, 'message': message},
                        status=status.HTTP_400_BAD_REQUEST
                    )
                
            except User.DoesNotExist:
                return Response(
                    {'success': False, 'message': 'User not found'},
                    status=status.HTTP_404_NOT_FOUND
                )
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
