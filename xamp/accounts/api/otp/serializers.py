from rest_framework import serializers


class RequestOTPSerializer(serializers.Serializer):
    otp_type = serializers.ChoiceField(choices=['email', 'phone'], required=True)


class VerifyOTPSerializer(serializers.Serializer):
    otp_type = serializers.ChoiceField(choices=['email', 'phone'], required=True)
    otp_code = serializers.CharField(required=True)
    email = serializers.EmailField(required=False)  # Optional for email verification


class PhoneNumberSerializer(serializers.Serializer):
    phone_number = serializers.CharField(required=True)
