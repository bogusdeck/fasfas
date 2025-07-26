from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

from .serializers import BrandProfileStatusSerializer
from .models import BrandUser


class BrandProfileStatusAPIView(APIView):
    """
    API endpoint to get brand profile and onboarding status

    Returns the current onboarding status of the brand user with appropriate status codes
    """
    permission_classes = [permissions.IsAuthenticated]

    @swagger_auto_schema(
        operation_summary="Get Brand Profile Status",
        operation_description="Get brand profile and onboarding status with status codes",
        responses={
            200: openapi.Response(
                description="Profile status retrieved successfully",
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'success': openapi.Schema(type=openapi.TYPE_BOOLEAN),
                        'message': openapi.Schema(type=openapi.TYPE_STRING),
                        'data': openapi.Schema(
                            type=openapi.TYPE_OBJECT,
                            properties={
                                'profile': openapi.Schema(type=openapi.TYPE_OBJECT),
                                'status_code': openapi.Schema(type=openapi.TYPE_STRING),
                                'status_message': openapi.Schema(type=openapi.TYPE_STRING),
                                'current_step': openapi.Schema(type=openapi.TYPE_STRING),
                                'is_onboarding_complete': openapi.Schema(type=openapi.TYPE_BOOLEAN),
                            }
                        )
                    }
                )
            ),
            404: openapi.Response(description="Brand profile not found"),
        }
    )
    def get(self, request):
        try:
            # Get or create brand user profile
            brand_user, created = BrandUser.objects.get_or_create(
                user=request.user,
                defaults={
                    'onboarding_status': 0  # Start with phone verification
                }
            )

            # Serialize the brand user data
            serializer = BrandProfileStatusSerializer(brand_user)
            profile_data = serializer.data

            # Get onboarding status details
            status_details = brand_user.get_onboarding_status_details()

            return Response({
                'success': True,
                'message': 'Profile status retrieved successfully',
                'data': {
                    'profile': profile_data,
                    'status_code': status_details['code'],
                    'status_message': status_details['message'],
                    'current_step': status_details['step'],
                    'is_onboarding_complete': brand_user.onboarding_status == 10,
                    'onboarding_progress': {
                        'current_step': brand_user.onboarding_status,
                        'total_steps': 10,
                        'percentage': (brand_user.onboarding_status / 10) * 100
                    }
                }
            }, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({
                'success': False,
                'message': f'Error retrieving profile status: {str(e)}'
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
