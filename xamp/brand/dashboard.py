from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from django.utils import timezone
from django.db import models

from .models import BrandUser, BrandDetails, Announcement, BrandPendingTask
from .serializers import AnnouncementSerializer, BrandPendingTaskSerializer


class OnboardingRequiredMixin:
    """
    Mixin to check if brand has completed onboarding process
    """
    def check_onboarding_completed(self, user):
        """
        Check if the brand has completed the onboarding process
        Returns a tuple (is_completed, response_or_none)
        """
        # Check if user has verified email and phone
        if not user.is_email_verified or not user.is_phone_verified:
            return False, Response(
                {
                    'success': False,
                    'message': 'Both email and phone must be verified'
                },
                status=status.HTTP_403_FORBIDDEN
            )

        # Check if the brand exists
        try:
            brand_user = BrandUser.objects.get(user=user)
        except BrandUser.DoesNotExist:
            return False, Response(
                {
                    'success': False,
                    'message': 'Brand profile not found'
                },
                status=status.HTTP_404_NOT_FOUND
            )

        # In a real implementation, we would check if all onboarding steps are completed
        # For now, we'll just check if the brand is verified
        if not brand_user.is_verified:
            return False, Response(
                {
                    'success': False,
                    'message': 'Brand onboarding not completed'
                },
                status=status.HTTP_403_FORBIDDEN
            )

        return True, brand_user


class BrandProfileAPIView(APIView, OnboardingRequiredMixin):
    """
    API endpoint for retrieving brand profile information

    Requires authentication and completed onboarding
    """
    permission_classes = [permissions.IsAuthenticated]

    @swagger_auto_schema(
        operation_summary="Get brand profile",
        operation_description="Retrieves the brand profile information. Requires authenticated user with completed onboarding.",
        responses={
            200: openapi.Response(
                description="Brand profile retrieved successfully",
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'success': openapi.Schema(type=openapi.TYPE_BOOLEAN),
                        'data': openapi.Schema(
                            type=openapi.TYPE_OBJECT,
                            properties={
                                'owner_name': openapi.Schema(type=openapi.TYPE_STRING),
                                'company_name': openapi.Schema(type=openapi.TYPE_STRING),
                                'onboarding_status': openapi.Schema(type=openapi.TYPE_OBJECT),
                            }
                        )
                    }
                )
            ),
            401: openapi.Response(description="Authentication required"),
            403: openapi.Response(description="Onboarding not completed"),
            404: openapi.Response(description="Brand profile not found"),
        }
    )
    def get(self, request):
        # Check if onboarding is completed
        is_completed, result = self.check_onboarding_completed(request.user)
        if not is_completed:
            return result

        brand_user = result  # If onboarding is completed, result contains the brand_user object

        # Get brand details
        try:
            brand_details = BrandDetails.objects.get(brand_user=brand_user)
            owner_name = brand_details.owner_name
        except BrandDetails.DoesNotExist:
            owner_name = "Not provided"

        # Prepare response data
        profile_data = {
            'owner_name': owner_name,
            'company_name': brand_user.company_name or "Not provided",
            'onboarding_status': {
                'email_verified': request.user.is_email_verified,
                'phone_verified': request.user.is_phone_verified,
                'is_verified': brand_user.is_verified,
                'onboarding_complete': brand_user.is_verified,  # In a real implementation, this might be more complex
            }
        }

        return Response(
            {
                'success': True,
                'data': profile_data
            },
            status=status.HTTP_200_OK
        )


class BrandAnnouncementsAPIView(APIView, OnboardingRequiredMixin):
    """
    API endpoint for retrieving brand announcements and new features

    Requires authentication and completed onboarding
    """
    permission_classes = [permissions.IsAuthenticated]

    @swagger_auto_schema(
        operation_summary="Get brand announcements",
        operation_description="Retrieves announcements and new features for brands. Requires authenticated user with completed onboarding.",
        responses={
            200: openapi.Response(
                description="Announcements retrieved successfully",
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'success': openapi.Schema(type=openapi.TYPE_BOOLEAN),
                        'data': openapi.Schema(
                            type=openapi.TYPE_OBJECT,
                            properties={
                                'announcements': openapi.Schema(type=openapi.TYPE_ARRAY, items=openapi.Schema(type=openapi.TYPE_OBJECT)),
                                'new_features': openapi.Schema(type=openapi.TYPE_ARRAY, items=openapi.Schema(type=openapi.TYPE_OBJECT)),
                            }
                        )
                    }
                )
            ),
            401: openapi.Response(description="Authentication required"),
            403: openapi.Response(description="Onboarding not completed"),
            404: openapi.Response(description="Brand profile not found"),
        }
    )
    def get(self, request):
        # Check if onboarding is completed
        is_completed, result = self.check_onboarding_completed(request.user)
        if not is_completed:
            return result

        # Get active announcements that are not expired
        current_time = timezone.now()
        announcements = Announcement.objects.filter(
            is_active=True,
            type='announcement',
            publish_date__lte=current_time
        ).filter(
            # Either no expiry date or expiry date is in the future
            models.Q(expiry_date__isnull=True) | models.Q(expiry_date__gt=current_time)
        ).order_by('-priority', '-publish_date')

        # Get active new features that are not expired
        new_features = Announcement.objects.filter(
            is_active=True,
            type='new_feature',
            publish_date__lte=current_time
        ).filter(
            # Either no expiry date or expiry date is in the future
            models.Q(expiry_date__isnull=True) | models.Q(expiry_date__gt=current_time)
        ).order_by('-priority', '-publish_date')

        # Serialize the data
        announcements_serializer = AnnouncementSerializer(announcements, many=True)
        new_features_serializer = AnnouncementSerializer(new_features, many=True)

        return Response(
            {
                'success': True,
                'data': {
                    'announcements': announcements_serializer.data,
                    'new_features': new_features_serializer.data
                }
            },
            status=status.HTTP_200_OK
        )


class BrandPendingTasksAPIView(APIView, OnboardingRequiredMixin):
    """
    API endpoint for retrieving pending tasks for a brand

    Requires authentication and completed onboarding
    """
    permission_classes = [permissions.IsAuthenticated]

    @swagger_auto_schema(
        operation_summary="Get brand pending tasks",
        operation_description="Retrieves pending tasks for a brand. Requires authenticated user with completed onboarding.",
        responses={
            200: openapi.Response(
                description="Pending tasks retrieved successfully",
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'success': openapi.Schema(type=openapi.TYPE_BOOLEAN),
                        'data': openapi.Schema(
                            type=openapi.TYPE_OBJECT,
                            properties={
                                'tasks': openapi.Schema(type=openapi.TYPE_ARRAY, items=openapi.Schema(type=openapi.TYPE_OBJECT)),
                                'task_counts': openapi.Schema(
                                    type=openapi.TYPE_OBJECT,
                                    properties={
                                        'pending': openapi.Schema(type=openapi.TYPE_INTEGER),
                                        'in_progress': openapi.Schema(type=openapi.TYPE_INTEGER),
                                        'completed': openapi.Schema(type=openapi.TYPE_INTEGER),
                                        'overdue': openapi.Schema(type=openapi.TYPE_INTEGER),
                                        'total': openapi.Schema(type=openapi.TYPE_INTEGER),
                                    }
                                )
                            }
                        )
                    }
                )
            ),
            401: openapi.Response(description="Authentication required"),
            403: openapi.Response(description="Onboarding not completed"),
            404: openapi.Response(description="Brand profile not found"),
        },
        manual_parameters=[
            openapi.Parameter(
                name='status',
                in_=openapi.IN_QUERY,
                description='Filter tasks by status (pending, in_progress, completed, overdue)',
                type=openapi.TYPE_STRING,
                required=False
            ),
            openapi.Parameter(
                name='category',
                in_=openapi.IN_QUERY,
                description='Filter tasks by category',
                type=openapi.TYPE_STRING,
                required=False
            ),
            openapi.Parameter(
                name='priority',
                in_=openapi.IN_QUERY,
                description='Filter tasks by priority (low, medium, high, urgent)',
                type=openapi.TYPE_STRING,
                required=False
            )
        ]
    )
    def get(self, request):
        # Check if onboarding is completed
        is_completed, result = self.check_onboarding_completed(request.user)
        if not is_completed:
            return result

        brand_user = result

        # Get filter parameters
        status_filter = request.query_params.get('status')
        category_filter = request.query_params.get('category')
        priority_filter = request.query_params.get('priority')

        # Base queryset
        tasks = BrandPendingTask.objects.filter(brand_user=brand_user)

        # Apply filters if provided
        if status_filter:
            tasks = tasks.filter(status=status_filter)

        if category_filter:
            tasks = tasks.filter(category=category_filter)

        if priority_filter:
            tasks = tasks.filter(priority=priority_filter)

        # Get task counts by status
        task_counts = {
            'pending': BrandPendingTask.objects.filter(brand_user=brand_user, status='pending').count(),
            'in_progress': BrandPendingTask.objects.filter(brand_user=brand_user, status='in_progress').count(),
            'completed': BrandPendingTask.objects.filter(brand_user=brand_user, status='completed').count(),
            'overdue': BrandPendingTask.objects.filter(brand_user=brand_user, status='overdue').count(),
            'total': BrandPendingTask.objects.filter(brand_user=brand_user).count(),
        }

        # Serialize the tasks
        serializer = BrandPendingTaskSerializer(tasks, many=True)

        return Response(
            {
                'success': True,
                'data': {
                    'tasks': serializer.data,
                    'task_counts': task_counts
                }
            },
            status=status.HTTP_200_OK
        )

