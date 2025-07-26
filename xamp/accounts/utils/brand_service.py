from accounts.models import User, OTPVerification
from accounts.utils.otp_utils import send_otp_via_sms, send_otp_via_email
from django.db import transaction
from rest_framework_simplejwt.tokens import RefreshToken
from django.conf import settings


class BrandOTPService:
    """
    Service class to handle OTP operations for brand users
    This service exposes OTP functionality to the brand app
    """

    @staticmethod
    def request_phone_otp(phone_number):
        """
        Request OTP verification for a phone number

        Args:
            phone_number: The phone number to send OTP to

        Returns:
            tuple: (success, message, user_id)
        """
        try:
            # Check if user with this phone number exists
            try:
                user = User.objects.get(phone_number=phone_number)
            except User.DoesNotExist:
                # Create a new user with just the phone number
                # No need to set email as it can now be null
                with transaction.atomic():
                    user = User.objects.create(
                        phone_number=phone_number,
                        email=None,  # Explicitly set to None for clarity
                        is_active=True,  # User is active but not verified yet
                        is_phone_verified=False
                    )

            # Generate OTP
            otp = OTPVerification.generate_otp(user, 'phone')

            # Send OTP
            success, message = send_otp_via_sms(user, otp.otp_code)

            if success:
                # In development mode, return the OTP code for testing
                if settings.DEBUG:
                    dev_message = f"{message} (DEV MODE - OTP: {otp.otp_code})"
                    return True, dev_message, user.id
                else:
                    return True, message, user.id
            else:
                return False, message, None

        except Exception as e:
            return False, f"Error requesting OTP: {str(e)}", None

    @staticmethod
    def verify_phone_otp(phone_number, otp_code):
        """
        Verify OTP for a phone number

        Args:
            phone_number: The phone number to verify
            otp_code: The OTP code to verify

        Returns:
            tuple: (success, message, user_id)
        """
        try:
            # Get user by phone number
            try:
                user = User.objects.get(phone_number=phone_number)
            except User.DoesNotExist:
                return False, "User with this phone number does not exist", None, None

            # Verify OTP
            success, message = OTPVerification.verify_otp(user, 'phone', otp_code)

            if success:
                return True, message, user.id
            else:
                return False, message, None

        except Exception as e:
            return False, f"Error verifying OTP: {str(e)}", None

    @staticmethod
    def request_email_otp(email, phone_number):
        """
        Request OTP for an email address

        Args:
            email: The email address to send OTP to
            phone_number: The phone number of the user (must be verified)

        Returns:
            tuple: (success, message, user_id)
        """
        import logging
        logger = logging.getLogger(__name__)
        try:
            logger.info(f"Email OTP request for email: {email}, phone: {phone_number}")
            # Check if user with this phone number exists
            try:
                user = User.objects.get(phone_number=phone_number)
                logger.info(f"Found user with phone number: {phone_number}, user_id: {user.id}")

                # Update the user's email if it's not already set
                if not user.email or user.email != email:
                    logger.info(f"Updating user email from '{user.email}' to '{email}'")
                    user.email = email
                    user.is_email_verified = False
                    user.save()
                else:
                    logger.info(f"User already has email: {email}")

            except User.DoesNotExist:
                logger.error(f"No user found with phone number: {phone_number}")
                return False, "Phone number not verified. Please verify your phone number first.", None

            # Generate OTP
            logger.info(f"Generating OTP for user: {user.id}, type: email")
            otp = OTPVerification.generate_otp(user, 'email')
            logger.info(f"OTP generated successfully: {otp.id}")

            # Send OTP
            logger.info(f"Sending OTP via email to: {user.email}")
            success, message = send_otp_via_email(user, otp.otp_code)
            logger.info(f"OTP send result: success={success}, message={message}")

            if success:
                # In development mode, return the OTP code for testing
                if settings.DEBUG:
                    dev_message = f"{message} (DEV MODE - OTP: {otp.otp_code})"
                    logger.info(f"Returning OTP in development mode: {otp.otp_code}")
                    return True, dev_message, user.id
                else:
                    return True, message, user.id
            else:
                logger.error(f"Failed to send OTP via email: {message}")
                return False, message, None

        except Exception as e:
            logger.error(f"Unexpected error in request_email_otp: {str(e)}", exc_info=True)
            return False, f"Error requesting email OTP: {str(e)}", None

    @staticmethod
    def verify_email_otp(email, otp_code):
        """
        Verify OTP for an email address

        Args:
            email: The email address to verify
            otp_code: The OTP code to verify

        Returns:
            tuple: (success, message, user_id)
        """
        try:
            # Get user by email
            try:
                user = User.objects.get(email=email)
            except User.DoesNotExist:
                return False, "User with this email does not exist", None, None

            # Verify OTP
            success, message = OTPVerification.verify_otp(user, 'email', otp_code)

            if success:
                # Mark email as verified
                user.is_email_verified = True
                user.save()

                return True, message, user.id
            else:
                return False, message, None

        except Exception as e:
            return False, f"Error verifying email OTP: {str(e)}", None

    @staticmethod
    def update_brand_user_profile(user, data):
        """
        Update brand user profile with additional information

        Args:
            user: User object
            data: Dictionary containing profile data

        Returns:
            tuple: (success, message)
        """
        try:
            # Update user email and password if provided
            if 'email' in data and data['email']:
                # Check if email is already in use by another user
                if User.objects.filter(email=data['email']).exclude(id=user.id).exists():
                    return False, "Email is already in use"

                user.email = data['email']
                user.is_email_verified = False  # Reset email verification status

            if 'password' in data and data['password']:
                user.set_password(data['password'])

            user.save()

            # Get or create brand user profile
            try:
                from brand.models import BrandUser
                brand_profile, created = BrandUser.objects.get_or_create(user=user)

                # Update brand profile fields
                if 'company_name' in data and data['company_name']:
                    brand_profile.company_name = data['company_name']

                if 'website' in data and data['website']:
                    brand_profile.website = data['website']

                if 'industry' in data and data['industry']:
                    brand_profile.industry = data['industry']

                brand_profile.save()

                return True, "Profile updated successfully"
            except Exception as e:
                return False, f"Error updating brand profile: {str(e)}"

        except Exception as e:
            return False, f"Error updating user profile: {str(e)}"
