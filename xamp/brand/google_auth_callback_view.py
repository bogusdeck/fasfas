import requests
from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model
from django.conf import settings
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

from .models import BrandUser
from .serializers import GoogleAuthCallbackSerializer

User = get_user_model()


class GoogleAuthCallbackAPIView(APIView):
    """
    API endpoint for Google OAuth callback

    Handles the callback from Google OAuth with authorization code
    """
    permission_classes = [permissions.AllowAny]

    @swagger_auto_schema(
        operation_summary="Google OAuth Callback",
        operation_description="Handle the callback from Google OAuth with authorization code",
        request_body=GoogleAuthCallbackSerializer,
        responses={
            200: openapi.Response(
                description="Authentication successful",
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'success': openapi.Schema(type=openapi.TYPE_BOOLEAN),
                        'message': openapi.Schema(type=openapi.TYPE_STRING),
                        'is_new_user': openapi.Schema(type=openapi.TYPE_BOOLEAN),
                        'token': openapi.Schema(type=openapi.TYPE_OBJECT),
                        'user_id': openapi.Schema(type=openapi.TYPE_INTEGER),
                    }
                )
            ),
            400: openapi.Response(description="Bad request, validation error"),
        }
    )
    def post(self, request):
        serializer = GoogleAuthCallbackSerializer(data=request.data)
        if serializer.is_valid():
            code = serializer.validated_data['code']

            # Exchange authorization code for access token
            token_url = 'https://oauth2.googleapis.com/token'
            token_data = {
                'code': code,
                'client_id': getattr(settings, 'GOOGLE_OAUTH_CLIENT_ID', ''),
                'client_secret': getattr(settings, 'GOOGLE_OAUTH_CLIENT_SECRET', ''),
                'redirect_uri': getattr(settings, 'GOOGLE_OAUTH_REDIRECT_URI', ''),
                'grant_type': 'authorization_code'
            }

            try:
                token_response = requests.post(token_url, data=token_data)
                token_response.raise_for_status()
                token_json = token_response.json()
                access_token = token_json.get('access_token')

                if not access_token:
                    return Response(
                        {'success': False, 'message': 'Failed to get access token from Google'},
                        status=status.HTTP_400_BAD_REQUEST
                    )

                # Get user info from Google
                user_info_url = 'https://www.googleapis.com/oauth2/v3/userinfo'
                user_info_response = requests.get(
                    user_info_url,
                    headers={'Authorization': f'Bearer {access_token}'}
                )
                user_info_response.raise_for_status()
                user_info = user_info_response.json()

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

            except requests.exceptions.RequestException as e:
                return Response(
                    {'success': False, 'message': f'Error communicating with Google: {str(e)}'},
                    status=status.HTTP_400_BAD_REQUEST
                )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
