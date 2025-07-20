from rest_framework.throttling import UserRateThrottle, AnonRateThrottle

class OTPRequestThrottle(AnonRateThrottle):
    """
    Limits the rate of OTP request API calls that may be made by an IP address.
    
    The user is identified by their IP address.
    Restricts IPs to 5 OTP requests per day.
    """
    rate = '5/day'
    scope = 'otp_request'

class OTPVerifyThrottle(AnonRateThrottle):
    """
    Limits the rate of OTP verification API calls that may be made by an IP address.
    
    The user is identified by their IP address.
    Restricts IPs to 5 verification attempts per hour.
    """
    rate = '5/hour'
    scope = 'otp_verify'

class LoginThrottle(AnonRateThrottle):
    """
    Limits the rate of login attempts for anonymous users.
    
    Restricts to 5 login attempts per hour per IP address.
    """
    rate = '5/hour'
    scope = 'login'

class RegistrationThrottle(AnonRateThrottle):
    """
    Limits the rate of registration attempts for anonymous users.
    
    Restricts to 3 registration attempts per hour per IP address.
    """
    rate = '3/hour'
    scope = 'registration'
