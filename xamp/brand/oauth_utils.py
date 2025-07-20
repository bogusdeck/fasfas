from urllib.parse import urlencode
from django.conf import settings

def get_google_auth_url(redirect_uri=None):
    """
    Generate Google OAuth2 URL for authentication

    Args:
        redirect_uri: The URI to redirect to after authentication

    Returns:
        str: Google OAuth2 URL
    """
    # Google OAuth2 configuration
    client_id = getattr(settings, 'GOOGLE_OAUTH_CLIENT_ID', '')

    # Default redirect URI if not provided
    if not redirect_uri:
        redirect_uri = getattr(settings, 'GOOGLE_OAUTH_REDIRECT_URI', '')

    # OAuth2 parameters
    params = {
        'client_id': client_id,
        'redirect_uri': redirect_uri,
        'response_type': 'code',
        'scope': 'email profile',
        'access_type': 'offline',
        'prompt': 'consent',
    }

    # Build the authorization URL
    base_url = 'https://accounts.google.com/o/oauth2/auth'
    auth_url = f"{base_url}?{urlencode(params)}"

    return auth_url
