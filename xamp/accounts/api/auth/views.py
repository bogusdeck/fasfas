import time
from rest_framework import status, generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate, get_user_model, login, logout
from django.conf import settings
from django.middleware.csrf import get_token
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

from accounts.models import OTPVerification
from accounts.utils.otp_utils import send_otp_via_email, send_otp_via_sms
from accounts.utils.throttling import LoginThrottle, RegistrationThrottle
from accounts.utils.jwt_utils import get_token_for_user, create_jwt_pair_for_user
from .serializers import (
    UserSerializer, 
    UserRegistrationSerializer,
    LoginSerializer,
    ChangePasswordSerializer
)

User = get_user_model()


class RegisterAPIView(generics.CreateAPIView):
    """
    API endpoint for user registration
    
    Creates a new user account with the provided information and returns authentication tokens
    Rate limited to 3 registration attempts per hour per IP address
    """
    permission_classes = [permissions.AllowAny]
    serializer_class = UserRegistrationSerializer
    throttle_classes = [RegistrationThrottle]
    
    @swagger_auto_schema(
        operation_summary="Register a new user",
        operation_description="Creates a new user account and returns authentication tokens",
        responses={
            201: openapi.Response(
                description="User registered successfully",
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'user': openapi.Schema(type=openapi.TYPE_OBJECT),
                        'tokens': openapi.Schema(type=openapi.TYPE_OBJECT),
                    }
                )
            ),
            400: "Bad request"
        }
    )
    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            
            # Generate tokens
            tokens = create_jwt_pair_for_user(user)
            
            # Send verification OTP if email or phone is provided
            if user.email:
                otp = OTPVerification.generate_otp(user, 'email')
                send_otp_via_email(user, otp.otp_code)
            
            if user.phone_number:
                otp = OTPVerification.generate_otp(user, 'phone')
                send_otp_via_sms(user, otp.otp_code)
            
            return Response(
                {
                    'user': UserSerializer(user).data,
                    'tokens': tokens,
                    'message': 'User registered successfully. Please verify your email and phone number.'
                },
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginAPIView(APIView):
    """
    API endpoint for user login
    
    Authenticates a user with email and password and returns authentication tokens
    Rate limited to 5 login attempts per hour per IP address
    """
    permission_classes = [permissions.AllowAny]
    throttle_classes = [LoginThrottle]
    
    @swagger_auto_schema(
        operation_summary="Login a user",
        operation_description="Authenticates a user with email and password and returns authentication tokens",
        request_body=LoginSerializer,
        responses={
            200: openapi.Response(
                description="Login successful",
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'user': openapi.Schema(type=openapi.TYPE_OBJECT),
                        'tokens': openapi.Schema(type=openapi.TYPE_OBJECT),
                    }
                )
            ),
            400: "Bad request",
            401: "Invalid credentials"
        }
    )
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']
            
            user = authenticate(request, email=email, password=password)
            
            if user is not None:
                login(request, user)
                
                # Set last activity time for session management
                request.session['last_activity'] = int(time.time())
                request.session['ip_address'] = request.META.get('REMOTE_ADDR', '')
                request.session['user_agent'] = request.META.get('HTTP_USER_AGENT', '')
                
                # Generate tokens
                tokens = create_jwt_pair_for_user(user)
                
                return Response(
                    {
                        'user': UserSerializer(user).data,
                        'tokens': tokens
                    },
                    status=status.HTTP_200_OK
                )
            else:
                return Response(
                    {'detail': 'Invalid credentials'},
                    status=status.HTTP_401_UNAUTHORIZED
                )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LogoutAPIView(APIView):
    """
    API endpoint for user logout
    
    Logs out the current user and invalidates their authentication token
    """
    permission_classes = [permissions.IsAuthenticated]
    
    @swagger_auto_schema(
        operation_summary="Logout a user",
        operation_description="Logs out the current user and invalidates their authentication token",
        responses={
            200: "Logout successful",
            401: "Unauthorized"
        }
    )
    def post(self, request):
        # Delete the user's token
        Token.objects.filter(user=request.user).delete()
        
        # Logout the user
        logout(request)
        
        return Response(
            {'detail': 'Successfully logged out'},
            status=status.HTTP_200_OK
        )


class UserProfileAPIView(APIView):
    """
    API endpoint for user profile
    
    Retrieves or updates the current user's profile information
    """
    permission_classes = [permissions.IsAuthenticated]
    
    @swagger_auto_schema(
        operation_summary="Get user profile",
        operation_description="Retrieves the current user's profile information",
        responses={
            200: UserSerializer,
            401: "Unauthorized"
        }
    )
    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)
    
    @swagger_auto_schema(
        operation_summary="Update user profile",
        operation_description="Updates the current user's profile information",
        request_body=UserSerializer,
        responses={
            200: UserSerializer,
            400: "Bad request",
            401: "Unauthorized"
        }
    )
    def put(self, request):
        serializer = UserSerializer(request.user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ChangePasswordAPIView(APIView):
    """
    API endpoint for changing user password
    
    Changes the current user's password
    """
    permission_classes = [permissions.IsAuthenticated]
    
    @swagger_auto_schema(
        operation_summary="Change user password",
        operation_description="Changes the current user's password",
        request_body=ChangePasswordSerializer,
        responses={
            200: "Password changed successfully",
            400: "Bad request",
            401: "Unauthorized"
        }
    )
    def post(self, request):
        serializer = ChangePasswordSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            request.user.set_password(serializer.validated_data['new_password'])
            request.user.save()
            return Response(
                {'detail': 'Password changed successfully'},
                status=status.HTTP_200_OK
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CSRFTokenView(APIView):
    """
    API endpoint for getting a CSRF token
    
    Returns a CSRF token for use in forms
    """
    permission_classes = [permissions.AllowAny]
    
    @swagger_auto_schema(
        operation_summary="Get CSRF token",
        operation_description="Returns a CSRF token for use in forms",
        responses={
            200: openapi.Response(
                description="CSRF token",
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'csrfToken': openapi.Schema(type=openapi.TYPE_STRING),
                    }
                )
            )
        }
    )
    def get(self, request):
        token = get_token(request)
        return Response({'csrfToken': token})
