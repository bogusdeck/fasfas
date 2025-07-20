from rest_framework_simplejwt.tokens import RefreshToken
from django.conf import settings

def get_token_for_user(user):
    """
    Generate JWT token for a user
    """
    refresh = RefreshToken.for_user(user)
    
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

def create_jwt_pair_for_user(user):
    """
    Create JWT token pair for a user
    """
    refresh = RefreshToken.for_user(user)
    
    return {
        "refresh": str(refresh),
        "access": str(refresh.access_token),
    }
