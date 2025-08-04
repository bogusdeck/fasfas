from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
import uuid
import os

from .serializers import (
    GSTVerificationSerializer, BrandBasicInfoSerializer,
    SignatureUploadSerializer, SaveSignatureAndTANSerializer,
    FinalSubmissionSerializer, BusinessPreferenceSerializer,
    BankDetailsSerializer, MicroDepositVerificationSerializer,
    BrandProductDetailsSerializer, WarehouseDetailsSerializer,
    BrandProfileStatusSerializer
)
from .models import BrandUser
from brand.helpers import check_user_verification, get_brand_user


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
        is_verified, error_response = check_user_verification(user)
        if not is_verified:
            return error_response

        serializer = GSTVerificationSerializer(data=request.data)
        if serializer.is_valid():
            # Get or create brand user
            brand_user, created = BrandUser.objects.get_or_create(user=user)

            # Update onboarding status to GST verified
            brand_user.update_onboarding_status(3)  # Move to brand info step

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
        is_verified, error_response = check_user_verification(user)
        if not is_verified:
            return error_response

        # Get brand user
        brand_user, error_response = get_brand_user(user)
        if error_response:
            return error_response
        # For now, we're not actually checking GST verification since it's not implemented yet
        # In the future, we would check something like brand_user.is_gst_verified

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

            # Update onboarding status to brand info completed
            brand_user.update_onboarding_status(4)

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
        is_verified, error_response = check_user_verification(user)
        if not is_verified:
            return error_response

        # Get brand user
        brand_user, error_response = get_brand_user(user)
        if error_response:
            return error_response
        # In a real implementation, we would check if basic information is completed

        serializer = SignatureUploadSerializer(data=request.data)
        if serializer.is_valid():
            # For now, we're just returning success without actually processing the file
            # In a real implementation, we would:
            # 1. Save the uploaded file
            # 2. Verify the signature (check format, dimensions, etc.)
            # 3. Generate a unique ID for the signature
            # TODO : we implement our logic for signature verification and upload the signature on s3 storage

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
        is_verified, error_response = check_user_verification(user)
        if not is_verified:
            return error_response

        # Get brand user
        brand_user, error_response = get_brand_user(user)
        if error_response:
            return error_response

        serializer = SaveSignatureAndTANSerializer(data=request.data)
        if serializer.is_valid():
            # 1. Verify the signature_id exists and belongs to this user (this would be implemented in a real system)
            # 2. Save the signature_id and TAN number to the brand details

            # Get or create brand details for this user
            from brand.models import BrandDetails
            brand_details, created = BrandDetails.objects.get_or_create(brand_user=brand_user)

            # Save signature_id and tan_number to BrandDetails
            brand_details.signature_id = serializer.validated_data['signature_id']
            brand_details.tan_number = serializer.validated_data.get('tan_number', '')
            brand_details.save(update_fields=['signature_id', 'tan_number', 'updated_at'])

            # Update onboarding status to signature uploaded
            brand_user.update_onboarding_status(5)

            return Response(
                {
                    'success': True,
                    'message': 'Signature and TAN saved successfully'
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
        is_verified, error_response = check_user_verification(user)
        if not is_verified:
            return error_response

        # Get brand user
        brand_user, error_response = get_brand_user(user)
        if error_response:
            return error_response
        # In a real implementation, we would check if signature verification is completed

        serializer = BusinessPreferenceSerializer(data=request.data)
        if serializer.is_valid():
            # Import BrandDetails model
            from .models import BrandDetails

            # Get or create BrandDetails and save the business preference
            brand_details, created = BrandDetails.objects.get_or_create(
                brand_user=brand_user,
                defaults={
                    'owner_name': '',
                    'contact_number': '',
                    'company_type': '',
                    'address': '',
                    'business_preference': serializer.validated_data['business_preference']
                }
            )

            # If BrandDetails already exists, update the business preference
            if not created:
                brand_details.business_preference = serializer.validated_data['business_preference']
                brand_details.save()

            # Update onboarding status to business preference completed
            brand_user.update_onboarding_status(6)

            return Response(
                {
                    'success': True,
                    'message': 'Business preferences saved successfully'
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
        is_verified, error_response = check_user_verification(user)
        if not is_verified:
            return error_response

        # Get brand user
        brand_user, error_response = get_brand_user(user)
        if error_response:
            return error_response
        # In a real implementation, we would check if business preference is completed

        serializer = WarehouseDetailsSerializer(data=request.data)
        if serializer.is_valid():
            # Import required models
            from .models import BrandDetails, Brand, State, Warehouse

            # Get or create BrandDetails and save daily order volume
            brand_details, created = BrandDetails.objects.get_or_create(
                brand_user=brand_user,
                defaults={
                    'owner_name': '',
                    'contact_number': '',
                    'company_type': '',
                    'address': '',
                    'daily_order_volume': serializer.validated_data['daily_order_volume']
                }
            )

            # If BrandDetails already exists, update the daily order volume
            if not created:
                brand_details.daily_order_volume = serializer.validated_data['daily_order_volume']
                brand_details.save()

            # Get or create Brand for this user
            brand, brand_created = Brand.objects.get_or_create(
                brand_user=brand_user,
                defaults={
                    'name': brand_user.company_name or f"Brand {brand_user.user.id}",
                    'description': 'Brand created during onboarding'
                }
            )

            # Process city_warehouses and create State and Warehouse records
            for city_warehouse in serializer.validated_data['city_warehouses']:
                city_name = city_warehouse['city_name']
                warehouse_count = city_warehouse['warehouse_count']

                # Get or create State
                state, state_created = State.objects.get_or_create(
                    brand=brand,
                    name=city_name,
                    defaults={
                        'country': 'India',
                        'is_active': True
                    }
                )

                # Create warehouses for this state if they don't exist
                existing_warehouses = state.warehouses.count()
                warehouses_to_create = warehouse_count - existing_warehouses

                for i in range(warehouses_to_create):
                    warehouse_number = existing_warehouses + i + 1
                    Warehouse.objects.create(
                        state=state,
                        name=f"{city_name} Warehouse {warehouse_number}",
                        warehouse_code=f"{city_name.upper()[:3]}-WH-{warehouse_number:03d}",
                        warehouse_type='main',
                        address=f"Warehouse {warehouse_number}, {city_name}",
                        is_active=True
                    )

            # Update onboarding status to warehouse details completed
            brand_user.update_onboarding_status(7)

            return Response(
                {
                    'success': True,
                    'message': 'Warehouse details saved successfully'
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
        is_verified, error_response = check_user_verification(user)
        if not is_verified:
            return error_response

        # Get brand user
        brand_user, error_response = get_brand_user(user)
        if error_response:
            return error_response

        serializer = BrandProductDetailsSerializer(data=request.data)
        if serializer.is_valid():
            # Get or create the Brand for this user
            from brand.models import Brand
            brand, created = Brand.objects.get_or_create(brand_user=brand_user)
            brand.logo = serializer.validated_data['brand_logo']
            brand.product_categories = serializer.validated_data['product_categories']
            brand.gender = list(serializer.validated_data['gender'])
            target_age_range = serializer.validated_data['target_age_groups']

            if isinstance(target_age_range, list) and len(target_age_range) >= 2:
                brand.min_age_group = int(target_age_range[0])
                brand.max_age_group = int(target_age_range[1])
            else:
                brand.min_age_group = 0
                brand.max_age_group = 100

            price_range = serializer.validated_data['price_range']

            if isinstance(price_range, list) and len(price_range) >= 2:
                brand.min_price_range = float(price_range[0])
                brand.max_price_range = float(price_range[1])
            else:
                brand.min_price_range = 0
                brand.max_price_range = 100000

            brand.average_order_value = 0
            brand.total_skus = 0
            brand.save()

            if 'product_catalog' in serializer.validated_data:
                # TODO: We don't process the CSV now as our team will look at it later
                pass

            brand_user.update_onboarding_status(8)

            return Response(
                {
                    'success': True,
                    'message': 'Brand and product details saved successfully'
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
        is_verified, error_response = check_user_verification(user)
        if not is_verified:
            return error_response

        # Get brand user
        brand_user, error_response = get_brand_user(user)
        if error_response:
            return error_response
        # In a real implementation, we would check if product details are completed

        serializer = BankDetailsSerializer(data=request.data)
        if serializer.is_valid():
            from brand.models import BrandDetails
            brand_details, created = BrandDetails.objects.get_or_create(brand_user=brand_user)

            brand_details.account_holder_name = serializer.validated_data['account_holder_name']
            brand_details.account_number = serializer.validated_data['account_number']
            brand_details.ifsc_code = serializer.validated_data['ifsc_code']

            if 'cancelled_cheque' in serializer.validated_data:
                cheque_file = serializer.validated_data['cancelled_cheque']
                cheque_filename = f"cheque_{brand_user.id}_{uuid.uuid4()}.{cheque_file.name.split('.')[-1]}"
                cheque_path = os.path.join('media', 'cancelled_cheques', cheque_filename)
                os.makedirs(os.path.dirname(cheque_path), exist_ok=True)
                with open(cheque_path, 'wb') as destination:
                    for chunk in cheque_file.chunks():
                        destination.write(chunk)
                brand_details.cancelled_cheque_path = cheque_path

            bank_reference_id = f"BANK-REF-{uuid.uuid4().hex[:8].upper()}"
            brand_details.bank_reference_id = bank_reference_id

            micro_deposit_amount = 1.00
            brand_details.micro_deposit_amount = micro_deposit_amount
            brand_details.save()

            brand_user.update_onboarding_status(9)

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
        is_verified, error_response = check_user_verification(user)
        if not is_verified:
            return error_response

        # Get brand user
        brand_user, error_response = get_brand_user(user)
        if error_response:
            return error_response
        # In a real implementation, we would check if bank details are saved

        serializer = MicroDepositVerificationSerializer(data=request.data)
        if serializer.is_valid():
            # Get BrandDetails for this user
            from brand.models import BrandDetails
            try:
                brand_details = BrandDetails.objects.get(brand_user=brand_user)
            except BrandDetails.DoesNotExist:
                return Response(
                    {
                        'success': False,
                        'message': 'Bank details not found. Please submit your bank details first.'
                    },
                    status=status.HTTP_404_NOT_FOUND
                )

            # Get verification data from request
            bank_reference_id = serializer.validated_data['bank_reference_id']
            amount_received = serializer.validated_data['amount_received']

            # Check if the reference ID is valid for this user
            if brand_details.bank_reference_id != bank_reference_id:
                return Response(
                    {
                        'success': False,
                        'message': 'Invalid bank reference ID'
                    },
                    status=status.HTTP_400_BAD_REQUEST
                )

            # Check if the amount matches
            if float(brand_details.micro_deposit_amount) != float(amount_received):
                return Response(
                    {
                        'success': False,
                        'message': 'Incorrect micro-deposit amount'
                    },
                    status=status.HTTP_422_UNPROCESSABLE_ENTITY
                )

            # Mark the bank account as verified
            brand_details.is_bank_verified = True
            brand_details.save(update_fields=['is_bank_verified', 'updated_at'])

            return Response(
                {
                    'success': True,
                    'message': 'Micro-deposit verified successfully. Your bank account has been verified.'
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
        is_verified, error_response = check_user_verification(user)
        if not is_verified:
            return error_response

        # Get brand user
        brand_user, error_response = get_brand_user(user)
        if error_response:
            return error_response

        # Fetch actual data from the database
        from brand.models import BrandDetails, Brand, State, Warehouse

        # Get user details
        user_details = {
            'owner_name': user.get_full_name(),
            'contact_number': user.phone_number,
            'email': user.email,
        }

        # Get brand details
        try:
            brand_details = BrandDetails.objects.get(brand_user=brand_user)
            brand_details_data = {
                'company_name': brand_details.brand_user.company_name or '',
                'company_type': brand_details.company_type or '',
                'address': brand_details.address or '',
                'gst_number': brand_details.gst_number or '',
                'signature_id': brand_details.signature_id or '',
                'tan_number': brand_details.tan_number or '',
                'daily_order_volume': brand_details.daily_order_volume or 0,
                'account_holder_name': brand_details.account_holder_name or '',
                'account_number': brand_details.account_number or '',
                'ifsc_code': brand_details.ifsc_code or '',
                'cancelled_cheque_path': brand_details.cancelled_cheque_path or '',
                'bank_reference_id': brand_details.bank_reference_id or '',
                'is_bank_verified': brand_details.is_bank_verified,
                'onboarding_id': brand_details.onboarding_id or '',
                'terms_accepted': brand_details.terms_accepted,
                'privacy_policy_accepted': brand_details.privacy_policy_accepted,
                'onboarding_completed': brand_details.onboarding_completed,
                'verification_status': brand_details.verification_status,
            }
        except BrandDetails.DoesNotExist:
            brand_details_data = {}

        # Get brand information
        try:
            brand = Brand.objects.get(brand_user=brand_user)
            brand_data = {
                'brand_name': brand.name or '',
                'brand_logo': brand.logo.url if brand.logo else '',
                'product_categories': brand.product_categories or [],
                'gender': brand.gender or [],
                'min_age_group': brand.min_age_group or 0,
                'max_age_group': brand.max_age_group or 0,
                'min_price_range': float(brand.min_price_range) if brand.min_price_range else 0,
                'max_price_range': float(brand.max_price_range) if brand.max_price_range else 0,
                'average_order_value': float(brand.average_order_value) if brand.average_order_value else 0,
                'total_skus': brand.total_skus or 0,
            }

            # Get warehouse details
            states = State.objects.filter(brand=brand)
            city_warehouses = []
            for state in states:
                warehouses = Warehouse.objects.filter(state=state)
                city_warehouses.append({
                    'city_name': state.name,
                    'warehouse_count': warehouses.count(),
                })
        except Brand.DoesNotExist:
            brand_data = {}
            city_warehouses = []

        # Compile all data
        summary_data = {
            'basic_info': {
                **user_details,
                'company_name': brand_details_data.get('company_name', ''),
                'company_type': brand_details_data.get('company_type', ''),
                'address': brand_details_data.get('address', ''),
            },
            'gst_info': {
                'gst_number': brand_details_data.get('gst_number', ''),
                'company_name': brand_details_data.get('company_name', ''),
                'verification_status': brand_details_data.get('is_gst_verified', False),
            },
            'signature_info': {
                'signature_id': brand_details_data.get('signature_id', ''),
                'tan_number': brand_details_data.get('tan_number', ''),
            },
            'business_preference': {
                'preference': brand_details_data.get('business_preference', ''),
                'description': dict(BrandDetails.BUSINESS_PREFERENCE_CHOICES).get(brand_details_data.get('business_preference', ''), '') if brand_details_data.get('business_preference', '') else '',
            },
            'warehouse_details': {
                'city_warehouses': city_warehouses,
                'daily_order_volume': brand_details_data.get('daily_order_volume', 0),
            },
            'product_details': {
                'brand_logo': brand_data.get('brand_logo', ''),
                'product_categories': brand_data.get('product_categories', []),
                'gender': brand_data.get('gender', []),
                'age_group_range': [brand_data.get('min_age_group', 0), brand_data.get('max_age_group', 0)],
                'price_range': [brand_data.get('min_price_range', 0), brand_data.get('max_price_range', 0)],
                'average_order_value': brand_data.get('average_order_value', 0),
                'total_skus': brand_data.get('total_skus', 0),
            },
            'bank_details': {
                'account_holder_name': brand_details_data.get('account_holder_name', ''),
                'account_number': brand_details_data.get('account_number', ''),
                'ifsc_code': brand_details_data.get('ifsc_code', ''),
                'cancelled_cheque_uploaded': bool(brand_details_data.get('cancelled_cheque_path', '')),
                'bank_reference_id': brand_details_data.get('bank_reference_id', ''),
                'bank_verification_status': brand_details_data.get('is_bank_verified', False),
            },
            'verification_status': {
                'email_verified': user.is_email_verified,
                'phone_verified': user.is_phone_verified,
                'gst_verified': brand_details_data.get('is_gst_verified', False),
                'bank_verified': brand_details_data.get('is_bank_verified', False),
                'onboarding_complete': brand_details_data.get('onboarding_completed', False),
                'onboarding_id': brand_details_data.get('onboarding_id', ''),
                'terms_accepted': brand_details_data.get('terms_accepted', False),
                'privacy_policy_accepted': brand_details_data.get('privacy_policy_accepted', False),
                'onboarding_status': brand_user.onboarding_status,
                'onboarding_status_details': brand_user.get_onboarding_status_details(),
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
        is_verified, error_response = check_user_verification(user)
        if not is_verified:
            return error_response

        # Get brand user
        brand_user, error_response = get_brand_user(user)
        if error_response:
            return error_response

        serializer = FinalSubmissionSerializer(data=request.data)
        if serializer.is_valid():
            # Check if all required onboarding steps are completed
            if brand_user.onboarding_status < 9:  # 9 means bank details are completed
                # Use the status map directly from the model to determine incomplete steps
                # First get the current status details to access the status_map structure
                status_details = brand_user.get_onboarding_status_details()

                # Determine which steps are incomplete
                incomplete_steps = []

                # These are the status levels we need to check (GST verification to Bank details)
                required_steps = [
                    {'level': 2, 'name': 'GST Verification'},
                    {'level': 3, 'name': 'Brand Basic Information'},
                    {'level': 4, 'name': 'Signature and TAN'},
                    {'level': 5, 'name': 'Business Preference'},
                    {'level': 6, 'name': 'Warehouse Details'},
                    {'level': 7, 'name': 'Product Details'},
                    {'level': 8, 'name': 'Bank Details'}
                ]

                # Check each step that should be completed
                for step in required_steps:
                    if brand_user.onboarding_status < step['level']:
                        incomplete_steps.append(step['name'])

                return Response(
                    {
                        'success': False,
                        'message': 'Please complete all required onboarding steps',
                        'incomplete_steps': incomplete_steps
                    },
                    status=status.HTTP_422_UNPROCESSABLE_ENTITY
                )

            from brand.models import BrandDetails
            from django.utils import timezone
            brand_details, created = BrandDetails.objects.get_or_create(brand_user=brand_user)

            brand_details.terms_accepted = serializer.validated_data['terms_accepted']
            brand_details.privacy_policy_accepted = serializer.validated_data['privacy_policy_accepted']
            brand_details.onboarding_completed = True
            brand_details.onboarding_completed_at = timezone.now()

            brand_details.verification_status = 1
            brand_details.save()

            from brand.helpers import generate_unique_onboarding_id
            onboarding_id = generate_unique_onboarding_id()
            brand_details.onboarding_id = onboarding_id
            brand_details.save(update_fields=['onboarding_id'])

            brand_user.update_onboarding_status(10)

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
