from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

from .models import BrandUser
from .serializers import EmailPasswordSignupSerializer, EmailPasswordLoginSerializer
from django.contrib.auth import authenticate

User = get_user_model()


class EmailPasswordSignupAPIView(APIView):
    """
    API endpoint for email/password signup for brands

    Creates a new user with email and password after email verification
    """
    permission_classes = [permissions.AllowAny]

    @swagger_auto_schema(
        operation_summary="Email/Password Signup for Brand",
        operation_description="Create a new user with email and password after email verification",
        request_body=EmailPasswordSignupSerializer,
        responses={
            200: openapi.Response(
                description="Signup successful",
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'success': openapi.Schema(type=openapi.TYPE_BOOLEAN),
                        'message': openapi.Schema(type=openapi.TYPE_STRING),
                        'token': openapi.Schema(type=openapi.TYPE_OBJECT),
                        'user_id': openapi.Schema(type=openapi.TYPE_INTEGER),
                    }
                )
            ),
            400: openapi.Response(description="Bad request, validation error"),
        }
    )
    def post(self, request):
        serializer = EmailPasswordSignupSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']
            first_name = serializer.validated_data.get('first_name', '')
            last_name = serializer.validated_data.get('last_name', '')

            # Check if email is verified
            try:
                user = User.objects.get(email=email)

                if not user.is_email_verified:
                    return Response(
                        {'success': False, 'message': 'Email not verified. Please verify your email first.'},
                        status=status.HTTP_400_BAD_REQUEST
                    )

                # Set password for existing user
                user.set_password(password)
                if first_name:
                    user.first_name = first_name
                if last_name:
                    user.last_name = last_name
                user.save()

            except User.DoesNotExist:
                return Response(
                    {'success': False, 'message': 'Email not found. Please verify your email first.'},
                    status=status.HTTP_400_BAD_REQUEST
                )

            # Create or get brand user profile
            brand_user, created = BrandUser.objects.get_or_create(user=user)

            # Generate JWT tokens
            refresh = RefreshToken.for_user(user)

            return Response({
                'success': True,
                'message': 'Signup successful',
                'token': {
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                },
                'user_id': user.id
            }, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class EmailPasswordLoginAPIView(APIView):
    """
    API endpoint for email/password login for brands

    Authenticates a user with email and password
    """
    permission_classes = [permissions.AllowAny]

    @swagger_auto_schema(
        operation_summary="Email/Password Login for Brand",
        operation_description="Authenticate a user with email and password",
        request_body=EmailPasswordLoginSerializer,
        responses={
            200: openapi.Response(
                description="Login successful",
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'success': openapi.Schema(type=openapi.TYPE_BOOLEAN),
                        'message': openapi.Schema(type=openapi.TYPE_STRING),
                        'token': openapi.Schema(type=openapi.TYPE_OBJECT),
                        'user_id': openapi.Schema(type=openapi.TYPE_INTEGER),
                    }
                )
            ),
            400: openapi.Response(description="Bad request, validation error"),
            401: openapi.Response(description="Authentication failed"),
        }
    )
    def post(self, request):
        serializer = EmailPasswordLoginSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']

            # Authenticate user
            user = authenticate(username=email, password=password)

            if user is None:
                return Response(
                    {'success': False, 'message': 'Invalid email or password'},
                    status=status.HTTP_401_UNAUTHORIZED
                )

            # Check if user is a brand user
            try:
                brand_user = BrandUser.objects.get(user=user)
            except BrandUser.DoesNotExist:
                return Response(
                    {'success': False, 'message': 'User is not registered as a brand'},
                    status=status.HTTP_401_UNAUTHORIZED
                )

            # Generate JWT tokens
            refresh = RefreshToken.for_user(user)

            return Response({
                'success': True,
                'message': 'Login successful',
                'token': {
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                },
                'user_id': user.id
            }, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
