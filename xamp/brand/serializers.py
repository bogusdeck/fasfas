from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import BrandUser, Announcement, BrandPendingTask

User = get_user_model()


class RequestPhoneOTPSerializer(serializers.Serializer):
    phone_number = serializers.CharField(required=True)


class VerifyPhoneOTPSerializer(serializers.Serializer):
    phone_number = serializers.CharField(required=True)
    otp_code = serializers.CharField(required=True)


class RequestEmailOTPSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    phone_number = serializers.CharField(required=True)


class VerifyEmailOTPSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    otp_code = serializers.CharField(required=True)


class BrandUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = BrandUser
        fields = ['company_name', 'website', 'industry', 'is_verified']


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'phone_number', 'is_email_verified', 'is_phone_verified']
        read_only_fields = ['id', 'is_email_verified', 'is_phone_verified']


class BrandProfileUpdateSerializer(serializers.Serializer):
    email = serializers.EmailField(required=False)
    password = serializers.CharField(required=False, write_only=True)
    company_name = serializers.CharField(required=False)
    website = serializers.URLField(required=False)
    industry = serializers.CharField(required=False)


class EmailPasswordSignupSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(required=True, write_only=True, min_length=8)
    first_name = serializers.CharField(required=False)
    last_name = serializers.CharField(required=False)


class EmailPasswordLoginSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(required=True, write_only=True)


class GSTVerificationSerializer(serializers.Serializer):
    gst_number = serializers.CharField(required=True)
    company_name = serializers.CharField(required=False)


class BrandBasicInfoSerializer(serializers.Serializer):
    owner_name = serializers.CharField(required=True)
    contact_number = serializers.CharField(required=True)
    email = serializers.EmailField(required=True)
    company_name = serializers.CharField(required=True)
    company_type = serializers.CharField(required=True)
    address = serializers.CharField(required=True)


class SignatureUploadSerializer(serializers.Serializer):
    signature_file = serializers.FileField(required=True)


class SaveSignatureAndTANSerializer(serializers.Serializer):
    signature_id = serializers.CharField(required=True)
    tan_number = serializers.CharField(required=False, allow_blank=True)


class BusinessPreferenceSerializer(serializers.Serializer):
    BUSINESS_CHOICES = (
        ('marketplace_only', 'Sell via our Market Place'),
        ('marketplace_and_api', 'Sell via market place and API also'),
    )
    business_preference = serializers.ChoiceField(choices=BUSINESS_CHOICES, required=True)


class CityWarehouseSerializer(serializers.Serializer):
    city_name = serializers.CharField(required=True)
    warehouse_count = serializers.IntegerField(required=True, min_value=1)


class WarehouseDetailsSerializer(serializers.Serializer):
    city_warehouses = serializers.ListField(
        child=CityWarehouseSerializer(),
        required=True
    )
    daily_order_volume = serializers.IntegerField(required=True, min_value=0)


class BrandProductDetailsSerializer(serializers.Serializer):
    GENDER_CHOICES = (
        ('men', 'Men'),
        ('women', 'Women'),
        ('kids', 'Kids'),
        ('unisex', 'Unisex'),
    )

    brand_logo = serializers.ImageField(required=True)
    product_categories = serializers.ListField(
        child=serializers.CharField(max_length=100),
        required=True
    )
    gender = serializers.MultipleChoiceField(choices=GENDER_CHOICES, required=True)

    # Direct input for age range as [min_age, max_age]
    target_age_groups = serializers.ListField(
        child=serializers.IntegerField(min_value=0, max_value=100),
        required=True,
        min_length=2,
        max_length=2,
        help_text="Age range as [min_age, max_age]"
    )

    # Direct input for price range as [min_price, max_price]
    price_range = serializers.ListField(
        child=serializers.DecimalField(max_digits=10, decimal_places=2, min_value=0),
        required=True,
        min_length=2,
        max_length=2,
        help_text="Price range as [min_price, max_price]"
    )

    product_catalog = serializers.FileField(required=False)  # Optional CSV upload


class BankDetailsSerializer(serializers.Serializer):
    account_holder_name = serializers.CharField(required=True, max_length=100)
    account_number = serializers.CharField(required=True, max_length=30)
    ifsc_code = serializers.CharField(required=True, max_length=11)
    cancelled_cheque = serializers.ImageField(required=True)


class MicroDepositVerificationSerializer(serializers.Serializer):
    amount_received = serializers.DecimalField(required=True, max_digits=10, decimal_places=2)
    bank_reference_id = serializers.CharField(required=True, max_length=100)


class FinalSubmissionSerializer(serializers.Serializer):
    terms_accepted = serializers.BooleanField(required=True)
    privacy_policy_accepted = serializers.BooleanField(required=True)


class AnnouncementSerializer(serializers.ModelSerializer):
    type_display = serializers.CharField(source='get_type_display', read_only=True)
    is_expired = serializers.BooleanField(read_only=True)

    class Meta:
        model = Announcement
        fields = ['id', 'title', 'content', 'type', 'type_display', 'is_active', 'priority',
                  'publish_date', 'expiry_date', 'is_expired', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']


class BrandPendingTaskSerializer(serializers.ModelSerializer):
    status_display = serializers.CharField(source='get_status_display', read_only=True)
    priority_display = serializers.CharField(source='get_priority_display', read_only=True)
    category_display = serializers.CharField(source='get_category_display', read_only=True)
    is_overdue = serializers.BooleanField(read_only=True)

    class Meta:
        model = BrandPendingTask
        fields = ['id', 'title', 'description', 'status', 'status_display', 'priority',
                  'priority_display', 'category', 'category_display', 'due_date',
                  'completion_date', 'is_actionable', 'action_url', 'is_overdue',
                  'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']


class BrandProfileStatusSerializer(serializers.ModelSerializer):
    """
    Serializer for brand profile status API
    """
    onboarding_status_details = serializers.SerializerMethodField()
    user_details = UserSerializer(source='user', read_only=True)
    business_preference = serializers.SerializerMethodField()

    class Meta:
        model = BrandUser
        fields = ['id', 'company_name', 'website', 'industry', 'is_verified',
                  'onboarding_status', 'onboarding_status_details', 'business_preference', 'user_details',
                  'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']

    def get_onboarding_status_details(self, obj):
        return obj.get_onboarding_status_details()

    def get_business_preference(self, obj):
        try:
            return obj.details.business_preference
        except:
            return None
