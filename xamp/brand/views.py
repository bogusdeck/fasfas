from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

from accounts.utils.brand_service import BrandOTPService
from accounts.utils.throttling import OTPRequestThrottle, OTPVerifyThrottle
from .serializers import (
    RequestPhoneOTPSerializer, VerifyPhoneOTPSerializer,
    RequestEmailOTPSerializer, VerifyEmailOTPSerializer,
    BrandUserSerializer, UserSerializer, BrandProfileUpdateSerializer,
    GoogleAuthSerializer, EmailPasswordSignupSerializer
)
from .models import BrandUser

User = get_user_model()


class RequestPhoneOTPAPIView(APIView):
    """
    API endpoint for requesting phone OTP verification for brands

    Sends an OTP code to the provided phone number
    Rate limited to 5 requests per day per IP address
    """
    permission_classes = [AllowAny]
    throttle_classes = [OTPRequestThrottle]

    @swagger_auto_schema(
        operation_summary="Request phone OTP verification for brand",
        operation_description="Sends an OTP code to the provided phone number",
        request_body=RequestPhoneOTPSerializer,
        responses={
            200: openapi.Response(
                description="OTP sent successfully",
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'success': openapi.Schema(type=openapi.TYPE_BOOLEAN),
                        'message': openapi.Schema(type=openapi.TYPE_STRING),
                    }
                )
            ),
            400: openapi.Response(description="Bad request, validation error"),
        }
    )
    def post(self, request):
        serializer = RequestPhoneOTPSerializer(data=request.data)
        if serializer.is_valid():
            phone_number = serializer.validated_data['phone_number']

            # Use the brand service to request OTP
            success, message, user_id = BrandOTPService.request_phone_otp(phone_number)

            if success:
                return Response(
                    {'success': True, 'message': message},
                    status=status.HTTP_200_OK
                )
            else:
                return Response(
                    {'success': False, 'message': message},
                    status=status.HTTP_400_BAD_REQUEST
                )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class VerifyPhoneOTPAPIView(APIView):
    """
    API endpoint for verifying phone OTP for brands

    Verifies the OTP code sent to the provided phone number
    Rate limited to 5 verification attempts per hour per IP address
    """
    permission_classes = [AllowAny]
    throttle_classes = [OTPVerifyThrottle]

    @swagger_auto_schema(
        operation_summary="Verify phone OTP for brand",
        operation_description="Verifies the OTP code sent to the provided phone number",
        request_body=VerifyPhoneOTPSerializer,
        responses={
            200: openapi.Response(
                description="OTP verified successfully",
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'success': openapi.Schema(type=openapi.TYPE_BOOLEAN),
                        'message': openapi.Schema(type=openapi.TYPE_STRING),
                        'is_new_user': openapi.Schema(type=openapi.TYPE_BOOLEAN),
                        'user_id': openapi.Schema(type=openapi.TYPE_INTEGER),
                    }
                )
            ),
            400: openapi.Response(description="Bad request, validation error"),
        }
    )
    def post(self, request):
        serializer = VerifyPhoneOTPSerializer(data=request.data)
        if serializer.is_valid():
            phone_number = serializer.validated_data['phone_number']
            otp_code = serializer.validated_data['otp_code']

            # Use the brand service to verify OTP
            success, message, user_id = BrandOTPService.verify_phone_otp(phone_number, otp_code)

            if success:
                user = User.objects.get(id=user_id)

                # Check if this is a new brand user
                is_new_user = False
                try:
                    brand_user = BrandUser.objects.get(user=user)
                except BrandUser.DoesNotExist:
                    # Create a new brand user profile
                    brand_user = BrandUser.objects.create(user=user)
                    is_new_user = True

                return Response({
                    'success': True,
                    'message': message,
                    'is_new_user': is_new_user,
                    'user_id': user_id
                }, status=status.HTTP_200_OK)
            else:
                return Response(
                    {'success': False, 'message': message},
                    status=status.HTTP_400_BAD_REQUEST
                )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class BrandDashboardAPIView(APIView):
    """
    API endpoint for brand dashboard

    Requires authentication
    """
    permission_classes = [permissions.IsAuthenticated]

    @swagger_auto_schema(
        operation_summary="Brand Dashboard",
        operation_description="Get brand dashboard data",
        responses={
            200: openapi.Response(
                description="Dashboard data retrieved successfully",
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'success': openapi.Schema(type=openapi.TYPE_BOOLEAN),
                        'data': openapi.Schema(type=openapi.TYPE_OBJECT),
                    }
                )
            ),
            401: openapi.Response(description="Authentication required"),
        }
    )
    def get(self, request):
        user = request.user

        # Get or create brand profile
        brand_profile, created = BrandUser.objects.get_or_create(user=user)

        # Get dashboard data
        dashboard_data = {
            'user': {
                'id': user.id,
                'email': user.email,
                'phone_number': user.phone_number,
                'is_email_verified': user.is_email_verified,
                'is_phone_verified': user.is_phone_verified,
            },
            'brand': {
                'company_name': brand_profile.company_name,
                'website': brand_profile.website,
                'industry': brand_profile.industry,
                'is_verified': brand_profile.is_verified,
            }
        }

        return Response({
            'success': True,
            'data': dashboard_data
        }, status=status.HTTP_200_OK)


class BrandProfileUpdateAPIView(APIView):
    """
    API endpoint for updating brand profile

    Requires authentication
    """
    permission_classes = [permissions.IsAuthenticated]

    @swagger_auto_schema(
        operation_summary="Update Brand Profile",
        operation_description="Update brand user profile with additional information",
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'email': openapi.Schema(type=openapi.TYPE_STRING, format='email'),
                'password': openapi.Schema(type=openapi.TYPE_STRING),
                'company_name': openapi.Schema(type=openapi.TYPE_STRING),
                'website': openapi.Schema(type=openapi.TYPE_STRING, format='uri'),
                'industry': openapi.Schema(type=openapi.TYPE_STRING),
            }
        ),
        responses={
            200: openapi.Response(
                description="Profile updated successfully",
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'success': openapi.Schema(type=openapi.TYPE_BOOLEAN),
                        'message': openapi.Schema(type=openapi.TYPE_STRING),
                    }
                )
            ),
            400: openapi.Response(description="Bad request, validation error"),
            401: openapi.Response(description="Authentication required"),
        }
    )
    def post(self, request):
        from .serializers import BrandProfileUpdateSerializer

        serializer = BrandProfileUpdateSerializer(data=request.data)
        if serializer.is_valid():
            user = request.user

            # Use the brand service to update profile
            success, message = BrandOTPService.update_brand_user_profile(user, serializer.validated_data)

            if success:
                return Response(
                    {'success': True, 'message': message},
                    status=status.HTTP_200_OK
                )
            else:
                return Response(
                    {'success': False, 'message': message},
                    status=status.HTTP_400_BAD_REQUEST
                )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class RequestEmailOTPAPIView(APIView):
    """
    API endpoint for requesting email OTP verification for brands

    Sends an OTP code to the provided email address
    Rate limited to 5 requests per day per IP address
    """
    permission_classes = [AllowAny]
    throttle_classes = [OTPRequestThrottle]

    @swagger_auto_schema(
        operation_summary="Request email OTP verification for brand",
        operation_description="Sends an OTP code to the provided email address. Requires a verified phone number.",
        request_body=RequestEmailOTPSerializer,
        responses={
            200: openapi.Response(
                description="OTP sent successfully",
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'success': openapi.Schema(type=openapi.TYPE_BOOLEAN),
                        'message': openapi.Schema(type=openapi.TYPE_STRING),
                    }
                )
            ),
            400: openapi.Response(description="Bad request, validation error"),
        }
    )
    def post(self, request):
        serializer = RequestEmailOTPSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            phone_number = serializer.validated_data['phone_number']

            # Use the brand service to request email OTP
            success, message, user_id = BrandOTPService.request_email_otp(email, phone_number)

            if success:
                return Response(
                    {'success': True, 'message': message},
                    status=status.HTTP_200_OK
                )
            else:
                return Response(
                    {'success': False, 'message': message},
                    status=status.HTTP_400_BAD_REQUEST
                )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class VerifyEmailOTPAPIView(APIView):
    """
    API endpoint for verifying email OTP for brands

    Verifies the OTP code sent to the provided email address
    Rate limited to 5 verification attempts per hour per IP address
    """
    permission_classes = [AllowAny]
    throttle_classes = [OTPVerifyThrottle]

    @swagger_auto_schema(
        operation_summary="Verify email OTP for brand",
        operation_description="Verifies the OTP code sent to the provided email address",
        request_body=VerifyEmailOTPSerializer,
        responses={
            200: openapi.Response(
                description="OTP verified successfully",
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'success': openapi.Schema(type=openapi.TYPE_BOOLEAN),
                        'message': openapi.Schema(type=openapi.TYPE_STRING),
                        'is_new_user': openapi.Schema(type=openapi.TYPE_BOOLEAN),
                        'user_id': openapi.Schema(type=openapi.TYPE_INTEGER),
                    }
                )
            ),
            400: openapi.Response(description="Bad request, validation error"),
        }
    )
    def post(self, request):
        serializer = VerifyEmailOTPSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            otp_code = serializer.validated_data['otp_code']

            # Use the brand service to verify email OTP
            success, message, user_id = BrandOTPService.verify_email_otp(email, otp_code)

            if success:
                user = User.objects.get(id=user_id)

                # Check if this is a new brand user
                is_new_user = False
                try:
                    brand_user = BrandUser.objects.get(user=user)
                except BrandUser.DoesNotExist:
                    # Create a new brand user profile
                    brand_user = BrandUser.objects.create(user=user)
                    is_new_user = True

                return Response({
                    'success': True,
                    'message': message,
                    'is_new_user': is_new_user,
                    'user_id': user_id
                }, status=status.HTTP_200_OK)
            else:
                return Response(
                    {'success': False, 'message': message},
                    status=status.HTTP_400_BAD_REQUEST
                )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class GoogleAuthAPIView(APIView):
    """
    API endpoint for Google OAuth authentication for brands

    Authenticates a user using Google OAuth2 token
    """
    permission_classes = [permissions.AllowAny]

    @swagger_auto_schema(
        operation_summary="Google OAuth Authentication",
        operation_description="Authenticate a user using Google OAuth2 token",
        request_body=GoogleAuthSerializer,
        responses={
            200: openapi.Response(
                description="Authentication successful",
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'success': openapi.Schema(type=openapi.TYPE_BOOLEAN),
                        'message': openapi.Schema(type=openapi.TYPE_STRING),
                        'is_new_user': openapi.Schema(type=openapi.TYPE_BOOLEAN),
                        'user_id': openapi.Schema(type=openapi.TYPE_INTEGER),
                    }
                )
            ),
            400: openapi.Response(description="Bad request, validation error"),
        }
    )
    def post(self, request):
        serializer = GoogleAuthSerializer(data=request.data)
        if serializer.is_valid():
            auth_token = serializer.validated_data['auth_token']

            # Verify the token with Google
            try:
                # Get user info from Google
                google_response = requests.get(
                    'https://www.googleapis.com/oauth2/v3/userinfo',
                    headers={'Authorization': f'Bearer {auth_token}'}
                )

                if google_response.status_code != 200:
                    return Response(
                        {'success': False, 'message': 'Invalid Google token'},
                        status=status.HTTP_400_BAD_REQUEST
                    )

                user_info = google_response.json()
                email = user_info.get('email')

                if not email:
                    return Response(
                        {'success': False, 'message': 'Email not found in Google response'},
                        status=status.HTTP_400_BAD_REQUEST
                    )

                # Check if user exists
                try:
                    user = User.objects.get(email=email)
                    is_new_user = False
                except User.DoesNotExist:
                    # Create a new user
                    user = User.objects.create(
                        email=email,
                        first_name=user_info.get('given_name', ''),
                        last_name=user_info.get('family_name', ''),
                        is_email_verified=True  # Email is verified by Google
                    )
                    is_new_user = True

                # Create or get brand user profile
                brand_user, created = BrandUser.objects.get_or_create(user=user)

                # Generate JWT tokens
                refresh = RefreshToken.for_user(user)

                return Response({
                    'success': True,
                    'message': 'Google authentication successful',
                    'token': {
                        'refresh': str(refresh),
                        'access': str(refresh.access_token),
                    },
                    'is_new_user': is_new_user,
                    'user_id': user.id
                }, status=status.HTTP_200_OK)

            except Exception as e:
                return Response(
                    {'success': False, 'message': f'Authentication error: {str(e)}'},
                    status=status.HTTP_400_BAD_REQUEST
                )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
