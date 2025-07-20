from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

from .oauth_utils import get_google_auth_url


class GoogleAuthURLAPIView(APIView):
    """
    API endpoint to get Google OAuth URL for frontend redirection

    Returns the Google OAuth URL that the frontend can use to redirect users
    """
    permission_classes = [permissions.AllowAny]

    @swagger_auto_schema(
        operation_summary="Get Google OAuth URL",
        operation_description="Returns the Google OAuth URL for frontend redirection",
        manual_parameters=[
            openapi.Parameter(
                'redirect_uri',
                openapi.IN_QUERY,
                description="Optional custom redirect URI after Google authentication",
                type=openapi.TYPE_STRING,
                required=False
            ),
        ],
        responses={
            200: openapi.Response(
                description="Google OAuth URL",
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'success': openapi.Schema(type=openapi.TYPE_BOOLEAN),
                        'auth_url': openapi.Schema(type=openapi.TYPE_STRING),
                    }
                )
            ),
        }
    )
    def get(self, request):
        # Get optional redirect URI from query parameters
        redirect_uri = request.query_params.get('redirect_uri', None)

        # Generate Google OAuth URL
        auth_url = get_google_auth_url(redirect_uri)

        return Response({
            'success': True,
            'auth_url': auth_url
        }, status=status.HTTP_200_OK)
