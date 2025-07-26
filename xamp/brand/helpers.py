import random
import string
from rest_framework import status
from rest_framework.response import Response
from brand.models import BrandDetails, BrandUser


def check_user_verification(user):
    """
    Helper function to check if user has verified email and phone
    Returns (is_verified, error_response)
    """
    if not user.is_email_verified or not user.is_phone_verified:
        error_response = Response(
            {
                'success': False,
                'message': 'Both email and phone must be verified before proceeding'
            },
            status=status.HTTP_403_FORBIDDEN
        )
        return False, error_response
    return True, None


def get_brand_user(user):
    """
    Helper function to get BrandUser for authenticated user
    Returns (brand_user, error_response)
    """
    try:
        brand_user = BrandUser.objects.get(user=user)
        return brand_user, None
    except BrandUser.DoesNotExist:
        error_response = Response(
            {
                'success': False,
                'message': 'Brand profile not found'
            },
            status=status.HTTP_404_NOT_FOUND
        )
        return None, error_response


def generate_unique_onboarding_id():
    """
    Generate a unique onboarding ID that doesn't already exist in the database
    Format: ONBOARD-XXXX-YYYY where XXXX is 4 random uppercase letters and YYYY is 4 random digits
    """
    while True:
        # Generate a random ID with format: ONBOARD-XXXX-YYYY
        # Where XXXX is 4 random uppercase letters and YYYY is 4 random digits
        letters = ''.join(random.choices(string.ascii_uppercase, k=4))
        digits = ''.join(random.choices(string.digits, k=4))
        onboarding_id = f"ONBOARD-{letters}-{digits}"

        # Check if this ID already exists in the database
        if not BrandDetails.objects.filter(onboarding_id=onboarding_id).exists():
            return onboarding_id
