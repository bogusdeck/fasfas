import os
from rest_framework.throttling import UserRateThrottle, AnonRateThrottle

class OTPRequestThrottle(AnonRateThrottle):
    """
    Limits the rate of OTP request API calls that may be made by an IP address.
    
    The user is identified by their IP address.
    Restricts IPs to 5 OTP requests per day.
    Rate limiting is disabled in development environment.
    """
    rate = '5/day'
    scope = 'otp_request'
    
    def allow_request(self, request, view):
        # Skip throttling in development environment
        if os.environ.get('ENVIRONMENT', 'development') == 'development':
            return True
        return super().allow_request(request, view)

class OTPVerifyThrottle(AnonRateThrottle):
    """
    Limits the rate of OTP verification API calls that may be made by an IP address.
    
    The user is identified by their IP address.
    Restricts IPs to 5 verification attempts per hour.
    Rate limiting is disabled in development environment.
    """
    rate = '5/hour'
    scope = 'otp_verify'
    
    def allow_request(self, request, view):
        # Skip throttling in development environment
        if os.environ.get('ENVIRONMENT', 'development') == 'development':
            return True
        return super().allow_request(request, view)

class LoginThrottle(AnonRateThrottle):
    """
    Limits the rate of login attempts for anonymous users.
    
    Restricts to 5 login attempts per hour per IP address.
    Rate limiting is disabled in development environment.
    """
    rate = '5/hour'
    scope = 'login'
    
    def allow_request(self, request, view):
        # Skip throttling in development environment
        if os.environ.get('ENVIRONMENT', 'development') == 'development':
            return True
        return super().allow_request(request, view)

class RegistrationThrottle(AnonRateThrottle):
    """
    Limits the rate of registration attempts for anonymous users.
    
    Restricts to 3 registration attempts per hour per IP address.
    Rate limiting is disabled in development environment.
    """
    rate = '3/hour'
    scope = 'registration'
    
    def allow_request(self, request, view):
        # Skip throttling in development environment
        if os.environ.get('ENVIRONMENT', 'development') == 'development':
            return True
        return super().allow_request(request, view)
