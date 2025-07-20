from rest_framework import status, generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import get_user_model
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

from accounts.utils.throttling import OTPRequestThrottle, OTPVerifyThrottle
from accounts.models import OTPVerification
from .serializers import RequestOTPSerializer, VerifyOTPSerializer, PhoneNumberSerializer
from accounts.utils.otp_utils import send_otp_via_email, send_otp_via_sms

User = get_user_model()


class RequestOTPAPIView(APIView):
    """
    API endpoint for requesting OTP verification

    Sends an OTP code to the user's email or phone number
    Rate limited to 3 requests per hour per user
    """
    permission_classes = [permissions.IsAuthenticated]
    throttle_classes = [OTPRequestThrottle]

    @swagger_auto_schema(
        operation_summary="Request OTP verification",
        operation_description="Sends an OTP code to the user's email or phone number",
        request_body=RequestOTPSerializer,
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
            401: openapi.Response(description="Authentication required")
        }
    )
    def post(self, request):
        serializer = RequestOTPSerializer(data=request.data)
        if serializer.is_valid():
            user = request.user
            otp_type = serializer.validated_data['otp_type']

            # Check if the user has the required contact information
            if otp_type == 'email' and not user.email:
                return Response(
                    {'error': 'Email address not provided'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            elif otp_type == 'phone' and not user.phone_number:
                return Response(
                    {'error': 'Phone number not provided'},
                    status=status.HTTP_400_BAD_REQUEST
                )

            # Generate OTP
            otp = OTPVerification.generate_otp(user, otp_type)

            # Send OTP
            if otp_type == 'email':
                success, message = send_otp_via_email(user, otp.otp_code)
            else:  # phone
                success, message = send_otp_via_sms(user, otp.otp_code)

            if success:
                return Response(
                    {'success': True, 'message': message},
                    status=status.HTTP_200_OK
                )
            else:
                return Response(
                    {'success': False, 'message': message},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class VerifyOTPAPIView(APIView):
    """
    API endpoint for verifying OTP

    Verifies the OTP code sent to the user's email or phone number
    Rate limited to 5 verification attempts per hour per user
    """
    permission_classes = [permissions.IsAuthenticated]
    throttle_classes = [OTPVerifyThrottle]

    @swagger_auto_schema(
        operation_summary="Verify OTP",
        operation_description="Verifies the OTP code sent to the user's email or phone number",
        request_body=VerifyOTPSerializer,
        responses={
            200: openapi.Response(
                description="OTP verified successfully",
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'success': openapi.Schema(type=openapi.TYPE_BOOLEAN),
                        'message': openapi.Schema(type=openapi.TYPE_STRING),
                    }
                )
            ),
            400: openapi.Response(description="Bad request, validation error"),
            401: openapi.Response(description="Authentication required")
        }
    )
    def post(self, request):
        serializer = VerifyOTPSerializer(data=request.data)
        if serializer.is_valid():
            user = request.user
            otp_type = serializer.validated_data['otp_type']
            otp_code = serializer.validated_data['otp_code']

            # Verify OTP
            success, message = OTPVerification.verify_otp(user, otp_type, otp_code)

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


class UpdatePhoneNumberAPIView(APIView):
    """
    API endpoint for updating user's phone number

    Updates the user's phone number and resets phone verification status
    """
    permission_classes = [permissions.IsAuthenticated]

    @swagger_auto_schema(
        operation_summary="Update phone number",
        operation_description="Updates the user's phone number and resets phone verification status",
        request_body=PhoneNumberSerializer,
        responses={
            200: openapi.Response(
                description="Phone number updated successfully",
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'success': openapi.Schema(type=openapi.TYPE_BOOLEAN),
                        'message': openapi.Schema(type=openapi.TYPE_STRING),
                    }
                )
            ),
            400: openapi.Response(description="Bad request, validation error"),
            401: openapi.Response(description="Authentication required")
        }
    )
    def post(self, request):
        serializer = PhoneNumberSerializer(data=request.data)
        if serializer.is_valid():
            user = request.user
            phone_number = serializer.validated_data['phone_number']

            # Check if phone number is already in use
            if User.objects.filter(phone_number=phone_number).exclude(id=user.id).exists():
                return Response(
                    {'success': False, 'message': 'Phone number is already in use'},
                    status=status.HTTP_400_BAD_REQUEST
                )

            # Update phone number and reset verification status
            user.phone_number = phone_number
            user.is_phone_verified = False
            user.save()

            return Response(
                {'success': True, 'message': 'Phone number updated successfully'},
                status=status.HTTP_200_OK
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
