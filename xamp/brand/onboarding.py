from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
import uuid
import os
import random
from decimal import Decimal

from .serializers import (
    GSTVerificationSerializer, BrandBasicInfoSerializer,
    SignatureUploadSerializer, SaveSignatureAndTANSerializer,
    FinalSubmissionSerializer, BusinessPreferenceSerializer,
    BankDetailsSerializer, MicroDepositVerificationSerializer,
    BrandProductDetailsSerializer, WarehouseDetailsSerializer
)
from .models import BrandUser

class GSTVerificationAPIView(APIView):
    """
    API endpoint for GST verification for brands

    Requires authentication and verified email and phone
    """
    permission_classes = [permissions.IsAuthenticated]

    @swagger_auto_schema(
        operation_summary="Verify GST for brand",
        operation_description="Verifies the GST number for the brand. Requires authenticated user with verified email and phone.",
        request_body=GSTVerificationSerializer,
        responses={
            200: openapi.Response(
                description="GST verification successful",
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'success': openapi.Schema(type=openapi.TYPE_BOOLEAN),
                        'message': openapi.Schema(type=openapi.TYPE_STRING),
                        'verified': openapi.Schema(type=openapi.TYPE_BOOLEAN),
                    }
                )
            ),
            400: openapi.Response(description="Bad request, validation error"),
            401: openapi.Response(description="Authentication required"),
            403: openapi.Response(description="Email or phone not verified"),
        }
    )
    def post(self, request):
        # Check if user has verified email and phone
        user = request.user
        if not user.is_email_verified or not user.is_phone_verified:
            return Response(
                {
                    'success': False,
                    'message': 'Both email and phone must be verified before GST verification'
                },
                status=status.HTTP_403_FORBIDDEN
            )

        serializer = GSTVerificationSerializer(data=request.data)
        if serializer.is_valid():
            # XXX: For now, we're just returning success without any actual verification logic
            return Response(
                {
                    'success': True,
                    'message': 'GST verification successful',
                    'verified': True
                },
                status=status.HTTP_200_OK
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class BrandBasicInfoAPIView(APIView):
    """
    API endpoint for submitting basic information for brands

    Requires authentication, verified email and phone, and completed GST verification
    """
    permission_classes = [permissions.IsAuthenticated]

    @swagger_auto_schema(
        operation_summary="Submit basic information for brand",
        operation_description="Submits basic information for the brand. Requires authenticated user with verified email, phone, and GST.",
        request_body=BrandBasicInfoSerializer,
        responses={
            200: openapi.Response(
                description="Basic information submitted successfully",
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
            403: openapi.Response(description="Email, phone, or GST not verified"),
        }
    )
    def post(self, request):
        # Check if user has verified email and phone
        user = request.user
        if not user.is_email_verified or not user.is_phone_verified:
            return Response(
                {
                    'success': False,
                    'message': 'Both email and phone must be verified before submitting basic information'
                },
                status=status.HTTP_403_FORBIDDEN
            )

        # Check if the brand has completed GST verification
        try:
            brand_user = BrandUser.objects.get(user=user)
            # For now, we're not actually checking GST verification since it's not implemented yet
            # In the future, we would check something like brand_user.is_gst_verified
        except BrandUser.DoesNotExist:
            return Response(
                {
                    'success': False,
                    'message': 'Brand profile not found'
                },
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = BrandBasicInfoSerializer(data=request.data)
        if serializer.is_valid():
            # Save the brand details to the BrandUser model
            brand_user.company_name = serializer.validated_data['company_name']

            # Update user email if provided and different
            if serializer.validated_data.get('email') and serializer.validated_data['email'] != user.email:
                user.email = serializer.validated_data['email']
                user.save()

            # Save the brand user first
            brand_user.save()

            # Import the BrandDetails model
            from .models import BrandDetails

            # Create or update the BrandDetails record
            BrandDetails.objects.update_or_create(
                brand_user=brand_user,
                defaults={
                    'owner_name': serializer.validated_data['owner_name'],
                    'contact_number': serializer.validated_data['contact_number'],
                    'company_type': serializer.validated_data['company_type'],
                    'address': serializer.validated_data['address']
                }
            )

            return Response(
                {
                    'success': True,
                    'message': 'Basic information submitted successfully'
                },
                status=status.HTTP_200_OK
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SignatureUploadAPIView(APIView):
    """
    API endpoint for uploading and verifying brand signature

    Requires authentication, verified email and phone, and completed basic information
    """
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    @swagger_auto_schema(
        operation_summary="Upload and verify brand signature",
        operation_description="Uploads and verifies the signature for the brand. Requires authenticated user with verified email, phone, and completed basic information.",
        request_body=SignatureUploadSerializer,
        responses={
            200: openapi.Response(
                description="Signature uploaded and verified successfully",
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'success': openapi.Schema(type=openapi.TYPE_BOOLEAN),
                        'message': openapi.Schema(type=openapi.TYPE_STRING),
                        'signature_id': openapi.Schema(type=openapi.TYPE_STRING),
                    }
                )
            ),
            400: openapi.Response(description="Bad request, validation error"),
            401: openapi.Response(description="Authentication required"),
            403: openapi.Response(description="Email or phone not verified"),
        }
    )
    def post(self, request):
        # Check if user has verified email and phone
        user = request.user
        if not user.is_email_verified or not user.is_phone_verified:
            return Response(
                {
                    'success': False,
                    'message': 'Both email and phone must be verified before uploading signature'
                },
                status=status.HTTP_403_FORBIDDEN
            )

        # Check if the brand exists
        try:
            brand_user = BrandUser.objects.get(user=user)
            # In a real implementation, we would check if basic information is completed
        except BrandUser.DoesNotExist:
            return Response(
                {
                    'success': False,
                    'message': 'Brand profile not found'
                },
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = SignatureUploadSerializer(data=request.data)
        if serializer.is_valid():
            # For now, we're just returning success without actually processing the file
            # In a real implementation, we would:
            # 1. Save the uploaded file
            # 2. Verify the signature (check format, dimensions, etc.)
            # 3. Generate a unique ID for the signature

            # Generate a mock signature ID
            signature_id = str(uuid.uuid4())

            return Response(
                {
                    'success': True,
                    'message': 'Signature uploaded and verified successfully',
                    'signature_id': signature_id
                },
                status=status.HTTP_200_OK
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SaveSignatureAndTANAPIView(APIView):
    """
    API endpoint for saving verified signature and TAN number

    Requires authentication, verified email and phone, and completed signature verification
    """
    permission_classes = [permissions.IsAuthenticated]

    @swagger_auto_schema(
        operation_summary="Save signature and TAN number",
        operation_description="Saves the verified signature and optional TAN number for the brand. Requires authenticated user with verified email, phone, and completed signature verification.",
        request_body=SaveSignatureAndTANSerializer,
        responses={
            200: openapi.Response(
                description="Signature and TAN saved successfully",
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
            403: openapi.Response(description="Email or phone not verified"),
        }
    )
    def post(self, request):
        # Check if user has verified email and phone
        user = request.user
        if not user.is_email_verified or not user.is_phone_verified:
            return Response(
                {
                    'success': False,
                    'message': 'Both email and phone must be verified before saving signature and TAN'
                },
                status=status.HTTP_403_FORBIDDEN
            )

        # Check if the brand exists
        try:
            brand_user = BrandUser.objects.get(user=user)
            # In a real implementation, we would check if signature verification is completed
        except BrandUser.DoesNotExist:
            return Response(
                {
                    'success': False,
                    'message': 'Brand profile not found'
                },
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = SaveSignatureAndTANSerializer(data=request.data)
        if serializer.is_valid():
            # For now, we're just returning success without actually saving the data
            # In a real implementation, we would:
            # 1. Verify the signature_id exists and belongs to this user
            # 2. Save the signature_id and TAN number to the brand profile

            # Example of how we might save this data in the future:
            # brand_user.signature_id = serializer.validated_data['signature_id']
            # brand_user.tan_number = serializer.validated_data.get('tan_number', '')
            # brand_user.save()

            return Response(
                {
                    'success': True,
                    'message': 'Signature and TAN saved successfully'
                },
                status=status.HTTP_200_OK
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class BrandOnboardingSummaryAPIView(APIView):
    """
    API endpoint for retrieving the complete brand onboarding summary

    Requires authentication and verified email and phone
    """
    permission_classes = [permissions.IsAuthenticated]

    @swagger_auto_schema(
        operation_summary="Get brand onboarding summary",
        operation_description="Retrieves the complete summary of all information provided during the onboarding process. Requires authenticated user with verified email and phone.",
        responses={
            200: openapi.Response(
                description="Brand onboarding summary retrieved successfully",
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'success': openapi.Schema(type=openapi.TYPE_BOOLEAN),
                        'data': openapi.Schema(
                            type=openapi.TYPE_OBJECT,
                            properties={
                                'basic_info': openapi.Schema(type=openapi.TYPE_OBJECT),
                                'gst_info': openapi.Schema(type=openapi.TYPE_OBJECT),
                                'signature_info': openapi.Schema(type=openapi.TYPE_OBJECT),
                                'business_preference': openapi.Schema(type=openapi.TYPE_OBJECT),
                                'warehouse_details': openapi.Schema(type=openapi.TYPE_OBJECT),
                                'product_details': openapi.Schema(type=openapi.TYPE_OBJECT),
                                'bank_details': openapi.Schema(type=openapi.TYPE_OBJECT),
                                'verification_status': openapi.Schema(type=openapi.TYPE_OBJECT),
                            }
                        )
                    }
                )
            ),
            401: openapi.Response(description="Authentication required"),
            403: openapi.Response(description="Email or phone not verified"),
            404: openapi.Response(description="Brand profile not found"),
        }
    )
    def get(self, request):
        # Check if user has verified email and phone
        user = request.user
        if not user.is_email_verified or not user.is_phone_verified:
            return Response(
                {
                    'success': False,
                    'message': 'Both email and phone must be verified to view onboarding summary'
                },
                status=status.HTTP_403_FORBIDDEN
            )

        # Check if the brand exists
        try:
            brand_user = BrandUser.objects.get(user=user)
        except BrandUser.DoesNotExist:
            return Response(
                {
                    'success': False,
                    'message': 'Brand profile not found'
                },
                status=status.HTTP_404_NOT_FOUND
            )

        # In a real implementation, we would fetch all the data from the database
        # For now, we'll return a mock response with placeholder data

        # Example of how we might fetch this data in the future:
        # basic_info = {
        #     'owner_name': brand_user.owner_name,
        #     'contact_number': brand_user.contact_number,
        #     'email': brand_user.email,
        #     'company_name': brand_user.company_name,
        #     'company_type': brand_user.company_type,
        #     'address': brand_user.address,
        # }

        # Mock response data
        summary_data = {
            'basic_info': {
                'owner_name': 'John Doe',
                'contact_number': '+919876543210',
                'email': 'john.doe@example.com',
                'company_name': 'Example Enterprises',
                'company_type': 'Private Limited',
                'address': '123 Main Street, Mumbai, Maharashtra, India',
            },
            'gst_info': {
                'gst_number': '27AAPFU0939F1ZV',
                'company_name': 'Example Enterprises',
                'verification_status': 'Verified',
            },
            'signature_info': {
                'signature_id': '550e8400-e29b-41d4-a716-446655440000',
                'tan_number': 'AAAA99999A',
            },
            'business_preference': {
                'preference': 'marketplace_and_api',
                'description': 'Sell via market place and API also',
            },
            'warehouse_details': {
                'city_warehouses': [
                    {'city_name': 'Mumbai', 'warehouse_count': 2},
                    {'city_name': 'Delhi', 'warehouse_count': 1},
                    {'city_name': 'Bangalore', 'warehouse_count': 3},
                ],
                'daily_order_volume': '100_to_500',
            },
            'product_details': {
                'brand_logo': 'https://example.com/media/brand_logos/logo.png',
                'product_categories': ['Apparel', 'Footwear', 'Accessories'],
                'gender': ['men', 'women'],
                'target_age_groups': ['19_25', '26_35'],
                'price_range': ['mid_range', 'premium'],
                'product_catalog_uploaded': True,
            },
            'bank_details': {
                'account_holder_name': 'John Doe',
                'account_number': '1234567890123456',
                'ifsc_code': 'ABCD0123456',
                'cancelled_cheque_uploaded': True,
                'bank_verification_status': 'Verified',
            },
            'verification_status': {
                'email_verified': True,
                'phone_verified': True,
                'gst_verified': True,
                'bank_verified': True,
                'onboarding_complete': False,
            }
        }

        return Response(
            {
                'success': True,
                'data': summary_data
            },
            status=status.HTTP_200_OK
        )


class FinalSubmissionAPIView(APIView):
    """
    API endpoint for final submission of the onboarding process

    Requires authentication, verified email and phone, and completed all previous steps
    """
    permission_classes = [permissions.IsAuthenticated]

    @swagger_auto_schema(
        operation_summary="Submit final onboarding",
        operation_description="Completes the onboarding process by accepting terms and conditions. Requires authenticated user with verified email, phone, and completed all previous onboarding steps.",
        request_body=FinalSubmissionSerializer,
        responses={
            200: openapi.Response(
                description="Onboarding completed successfully",
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'success': openapi.Schema(type=openapi.TYPE_BOOLEAN),
                        'message': openapi.Schema(type=openapi.TYPE_STRING),
                        'onboarding_id': openapi.Schema(type=openapi.TYPE_STRING),
                    }
                )
            ),
            400: openapi.Response(description="Bad request, validation error"),
            401: openapi.Response(description="Authentication required"),
            403: openapi.Response(description="Email or phone not verified"),
            404: openapi.Response(description="Brand profile not found"),
            422: openapi.Response(description="Incomplete onboarding steps"),
        }
    )
    def post(self, request):
        # Check if user has verified email and phone
        user = request.user
        if not user.is_email_verified or not user.is_phone_verified:
            return Response(
                {
                    'success': False,
                    'message': 'Both email and phone must be verified to complete onboarding'
                },
                status=status.HTTP_403_FORBIDDEN
            )

        # Check if the brand exists
        try:
            brand_user = BrandUser.objects.get(user=user)
        except BrandUser.DoesNotExist:
            return Response(
                {
                    'success': False,
                    'message': 'Brand profile not found'
                },
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = FinalSubmissionSerializer(data=request.data)
        if serializer.is_valid():
            # In a real implementation, we would:
            # 1. Check if all required onboarding steps are completed
            # 2. Save the terms acceptance status
            # 3. Mark the onboarding as complete

            # Example of how we might check for incomplete steps:
            # incomplete_steps = []
            # if not brand_user.gst_verified:
            #     incomplete_steps.append('GST Verification')
            # if not brand_user.basic_info_completed:
            #     incomplete_steps.append('Basic Information')
            # # ... and so on for all required steps
            #
            # if incomplete_steps:
            #     return Response(
            #         {
            #             'success': False,
            #             'message': 'Please complete all required onboarding steps',
            #             'incomplete_steps': incomplete_steps
            #         },
            #         status=status.HTTP_422_UNPROCESSABLE_ENTITY
            #     )

            # Example of how we might save the terms acceptance:
            # brand_user.terms_accepted = serializer.validated_data['terms_accepted']
            # brand_user.privacy_policy_accepted = serializer.validated_data['privacy_policy_accepted']
            # brand_user.onboarding_completed = True
            # brand_user.onboarding_completed_at = timezone.now()
            #
            # # Set the brand verification status to pending (1)
            # # Brand verification status codes:
            # # 0: Disabled
            # # 1: Pending
            # # 2: Accepted
            # # 3: Rejected
            # brand_user.verification_status = 1  # Pending
            # brand_user.save()

            # Generate a mock onboarding ID
            onboarding_id = f"ONBOARD-{user.id}-{brand_user.id}"

            return Response(
                {
                    'success': True,
                    'message': 'Onboarding completed successfully. Your account is now under review.',
                    'onboarding_id': onboarding_id,
                    'verification_status': {
                        'code': 1,
                        'status': 'Pending',
                        'message': 'Your brand profile is pending verification by our team.'
                    }
                },
                status=status.HTTP_200_OK
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class BusinessPreferenceAPIView(APIView):
    """
    API endpoint for saving business preferences for brands

    Requires authentication, verified email and phone, and completed signature verification
    """
    permission_classes = [permissions.IsAuthenticated]

    @swagger_auto_schema(
        operation_summary="Save business preferences",
        operation_description="Saves the business preferences for the brand. Requires authenticated user with verified email, phone, and completed signature verification.",
        request_body=BusinessPreferenceSerializer,
        responses={
            200: openapi.Response(
                description="Business preferences saved successfully",
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
            403: openapi.Response(description="Email or phone not verified"),
            404: openapi.Response(description="Brand profile not found"),
        }
    )
    def post(self, request):
        # Check if user has verified email and phone
        user = request.user
        if not user.is_email_verified or not user.is_phone_verified:
            return Response(
                {
                    'success': False,
                    'message': 'Both email and phone must be verified before saving business preferences'
                },
                status=status.HTTP_403_FORBIDDEN
            )

        # Check if the brand exists
        try:
            brand_user = BrandUser.objects.get(user=user)
            # In a real implementation, we would check if signature verification is completed
        except BrandUser.DoesNotExist:
            return Response(
                {
                    'success': False,
                    'message': 'Brand profile not found'
                },
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = BusinessPreferenceSerializer(data=request.data)
        if serializer.is_valid():
            # For now, we're just returning success without actually saving the data
            # In a real implementation, we would:
            # 1. Save the business preference to the brand profile

            # Example of how we might save this data in the future:
            # brand_user.business_preference = serializer.validated_data['business_preference']
            # brand_user.save()

            return Response(
                {
                    'success': True,
                    'message': 'Business preferences saved successfully'
                },
                status=status.HTTP_200_OK
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class BankDetailsAPIView(APIView):
    """
    API endpoint for saving bank details for brands

    Requires authentication, verified email and phone, and completed product details
    """
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    @swagger_auto_schema(
        operation_summary="Save bank details",
        operation_description="Saves the bank account details and cancelled cheque image. Requires authenticated user with verified email, phone, and completed product details.",
        request_body=BankDetailsSerializer,
        responses={
            200: openapi.Response(
                description="Bank details saved successfully",
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'success': openapi.Schema(type=openapi.TYPE_BOOLEAN),
                        'message': openapi.Schema(type=openapi.TYPE_STRING),
                        'bank_reference_id': openapi.Schema(type=openapi.TYPE_STRING),
                    }
                )
            ),
            400: openapi.Response(description="Bad request, validation error"),
            401: openapi.Response(description="Authentication required"),
            403: openapi.Response(description="Email or phone not verified"),
            404: openapi.Response(description="Brand profile not found"),
        }
    )
    def post(self, request):
        # Check if user has verified email and phone
        user = request.user
        if not user.is_email_verified or not user.is_phone_verified:
            return Response(
                {
                    'success': False,
                    'message': 'Both email and phone must be verified before saving bank details'
                },
                status=status.HTTP_403_FORBIDDEN
            )

        # Check if the brand exists
        try:
            brand_user = BrandUser.objects.get(user=user)
            # In a real implementation, we would check if product details are completed
        except BrandUser.DoesNotExist:
            return Response(
                {
                    'success': False,
                    'message': 'Brand profile not found'
                },
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = BankDetailsSerializer(data=request.data)
        if serializer.is_valid():
            # For now, we're just returning success without actually saving the data
            # In a real implementation, we would:
            # 1. Save the bank details to the brand profile
            # 2. Save the cancelled cheque image to a file storage system
            # 3. Initiate a micro-deposit to verify the bank account

            # Example of how we might save this data in the future:
            # # Save bank details
            # brand_user.account_holder_name = serializer.validated_data['account_holder_name']
            # brand_user.account_number = serializer.validated_data['account_number']
            # brand_user.ifsc_code = serializer.validated_data['ifsc_code']
            # brand_user.save()

            # # Save cancelled cheque image
            # cheque_file = serializer.validated_data['cancelled_cheque']
            # cheque_filename = f"cheque_{brand_user.id}_{uuid.uuid4()}.{cheque_file.name.split('.')[-1]}"
            # cheque_path = os.path.join('media', 'cancelled_cheques', cheque_filename)
            # os.makedirs(os.path.dirname(cheque_path), exist_ok=True)
            # with open(cheque_path, 'wb') as destination:
            #     for chunk in cheque_file.chunks():
            #         destination.write(chunk)
            # brand_user.cancelled_cheque_path = cheque_path

            # Generate a mock bank reference ID
            bank_reference_id = f"BANK-REF-{uuid.uuid4().hex[:8].upper()}"

            # In a real implementation, we would initiate a micro-deposit here
            # and store the expected amount for verification later

            return Response(
                {
                    'success': True,
                    'message': 'Bank details saved successfully. A micro-deposit has been initiated for verification.',
                    'bank_reference_id': bank_reference_id
                },
                status=status.HTTP_200_OK
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class MicroDepositVerificationAPIView(APIView):
    """
    API endpoint for verifying micro-deposit for bank account verification

    Requires authentication, verified email and phone, and completed bank details submission
    """
    permission_classes = [permissions.IsAuthenticated]

    @swagger_auto_schema(
        operation_summary="Verify micro-deposit",
        operation_description="Verifies the micro-deposit amount received in the bank account. Requires authenticated user with verified email, phone, and completed bank details submission.",
        request_body=MicroDepositVerificationSerializer,
        responses={
            200: openapi.Response(
                description="Micro-deposit verified successfully",
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
            403: openapi.Response(description="Email or phone not verified"),
            404: openapi.Response(description="Brand profile not found"),
            422: openapi.Response(description="Incorrect micro-deposit amount"),
        }
    )
    def post(self, request):
        # Check if user has verified email and phone
        user = request.user
        if not user.is_email_verified or not user.is_phone_verified:
            return Response(
                {
                    'success': False,
                    'message': 'Both email and phone must be verified before verifying micro-deposit'
                },
                status=status.HTTP_403_FORBIDDEN
            )

        # Check if the brand exists
        try:
            brand_user = BrandUser.objects.get(user=user)
            # In a real implementation, we would check if bank details are submitted
        except BrandUser.DoesNotExist:
            return Response(
                {
                    'success': False,
                    'message': 'Brand profile not found'
                },
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = MicroDepositVerificationSerializer(data=request.data)
        if serializer.is_valid():
            # For now, we're just returning success without actually verifying the amount
            # In a real implementation, we would:
            # 1. Verify the bank_reference_id belongs to this user
            # 2. Compare the amount_received with the actual amount deposited
            # 3. Mark the bank account as verified if correct

            # Example of how we might verify this in the future:
            # bank_reference_id = serializer.validated_data['bank_reference_id']
            # amount_received = serializer.validated_data['amount_received']
            #
            # # Check if the reference ID is valid for this user
            # if brand_user.bank_reference_id != bank_reference_id:
            #     return Response(
            #         {
            #             'success': False,
            #             'message': 'Invalid bank reference ID'
            #         },
            #         status=status.HTTP_400_BAD_REQUEST
            #     )
            #
            # # Check if the amount matches
            # if brand_user.micro_deposit_amount != amount_received:
            #     return Response(
            #         {
            #             'success': False,
            #             'message': 'Incorrect micro-deposit amount'
            #         },
            #         status=status.HTTP_422_UNPROCESSABLE_ENTITY
            #     )
            #
            # # Mark the bank account as verified
            # brand_user.is_bank_verified = True
            # brand_user.save()

            return Response(
                {
                    'success': True,
                    'message': 'Micro-deposit verified successfully. Your bank account has been verified.'
                },
                status=status.HTTP_200_OK
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class BrandProductDetailsAPIView(APIView):
    """
    API endpoint for saving brand and product details

    Requires authentication, verified email and phone, and completed warehouse details
    """
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    @swagger_auto_schema(
        operation_summary="Save brand and product details",
        operation_description="Saves the brand logo, product categories, target demographics, and product catalog. Requires authenticated user with verified email, phone, and completed warehouse details.",
        request_body=BrandProductDetailsSerializer,
        responses={
            200: openapi.Response(
                description="Brand and product details saved successfully",
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
            403: openapi.Response(description="Email or phone not verified"),
            404: openapi.Response(description="Brand profile not found"),
        }
    )
    def post(self, request):
        # Check if user has verified email and phone
        user = request.user
        if not user.is_email_verified or not user.is_phone_verified:
            return Response(
                {
                    'success': False,
                    'message': 'Both email and phone must be verified before saving brand and product details'
                },
                status=status.HTTP_403_FORBIDDEN
            )

        # Check if the brand exists
        try:
            brand_user = BrandUser.objects.get(user=user)
            # In a real implementation, we would check if warehouse details are completed
        except BrandUser.DoesNotExist:
            return Response(
                {
                    'success': False,
                    'message': 'Brand profile not found'
                },
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = BrandProductDetailsSerializer(data=request.data)
        if serializer.is_valid():
            # For now, we're just returning success without actually saving the data
            # In a real implementation, we would:
            # 1. Save the brand logo to a file storage system
            # 2. Save the product categories, gender, age groups, and price range to the brand profile
            # 3. Process and store the product catalog CSV file

            # Example of how we might save this data in the future:
            # # Save brand logo
            # logo_file = serializer.validated_data['brand_logo']
            # logo_filename = f"brand_logo_{brand_user.id}_{uuid.uuid4()}.{logo_file.name.split('.')[-1]}"
            # logo_path = os.path.join('media', 'brand_logos', logo_filename)
            # os.makedirs(os.path.dirname(logo_path), exist_ok=True)
            # with open(logo_path, 'wb') as destination:
            #     for chunk in logo_file.chunks():
            #         destination.write(chunk)
            # brand_user.logo_path = logo_path

            # # Save product categories
            # brand_user.product_categories = serializer.validated_data['product_categories']
            # brand_user.gender_focus = serializer.validated_data['gender']
            # brand_user.target_age_groups = serializer.validated_data['target_age_groups']
            # brand_user.price_range = serializer.validated_data['price_range']
            # brand_user.save()

            # # Process product catalog if provided
            # if 'product_catalog' in serializer.validated_data:
            #     catalog_file = serializer.validated_data['product_catalog']
            #     catalog_filename = f"product_catalog_{brand_user.id}_{uuid.uuid4()}.{catalog_file.name.split('.')[-1]}"
            #     catalog_path = os.path.join('media', 'product_catalogs', catalog_filename)
            #     os.makedirs(os.path.dirname(catalog_path), exist_ok=True)
            #     with open(catalog_path, 'wb') as destination:
            #         for chunk in catalog_file.chunks():
            #             destination.write(chunk)
            #     # TODO: Parse CSV and load products into database

            return Response(
                {
                    'success': True,
                    'message': 'Brand and product details saved successfully'
                },
                status=status.HTTP_200_OK
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class WarehouseDetailsAPIView(APIView):
    """
    API endpoint for saving warehouse details for brands

    Requires authentication, verified email and phone, and completed business preference selection
    """
    permission_classes = [permissions.IsAuthenticated]

    @swagger_auto_schema(
        operation_summary="Save warehouse details",
        operation_description="Saves the warehouse details for the brand including city locations, warehouse count per city, and daily order volume. Requires authenticated user with verified email, phone, and completed business preference selection.",
        request_body=WarehouseDetailsSerializer,
        responses={
            200: openapi.Response(
                description="Warehouse details saved successfully",
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
            403: openapi.Response(description="Email or phone not verified"),
            404: openapi.Response(description="Brand profile not found"),
        }
    )
    def post(self, request):
        # Check if user has verified email and phone
        user = request.user
        if not user.is_email_verified or not user.is_phone_verified:
            return Response(
                {
                    'success': False,
                    'message': 'Both email and phone must be verified before saving warehouse details'
                },
                status=status.HTTP_403_FORBIDDEN
            )

        # Check if the brand exists
        try:
            brand_user = BrandUser.objects.get(user=user)
            # In a real implementation, we would check if business preference is completed
        except BrandUser.DoesNotExist:
            return Response(
                {
                    'success': False,
                    'message': 'Brand profile not found'
                },
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = WarehouseDetailsSerializer(data=request.data)
        if serializer.is_valid():
            # For now, we're just returning success without actually saving the data
            # In a real implementation, we would:
            # 1. Save the warehouse details to the brand profile or related models
            # 2. Process the city_warehouses list and create appropriate records

            # Example of how we might save this data in the future:
            # brand_user.daily_order_volume = serializer.validated_data['daily_order_volume']
            # brand_user.save()
            #
            # For city_warehouses, we might create related records:
            # for city_warehouse in serializer.validated_data['city_warehouses']:
            #     BrandWarehouse.objects.create(
            #         brand_user=brand_user,
            #         city_name=city_warehouse['city_name'],
            #         warehouse_count=city_warehouse['warehouse_count']
            #     )

            return Response(
                {
                    'success': True,
                    'message': 'Warehouse details saved successfully'
                },
                status=status.HTTP_200_OK
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
