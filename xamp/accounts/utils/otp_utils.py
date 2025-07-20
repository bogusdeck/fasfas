from django.core.mail import send_mail
from django.conf import settings
import logging

logger = logging.getLogger(__name__)

def send_otp_via_email(user, otp_code, purpose='verification'):
    """
    Send OTP verification code via email

    Args:
        user: User object
        otp_code: The OTP code to send
        purpose: Purpose of the OTP ('verification', 'password_reset')
    """
    try:
        logger.info(f"Attempting to send OTP via email to {user.email}")
        name = user.first_name or user.email.split('@')[0]

        if purpose == 'password_reset':
            subject = "Password Reset Request"
            html_message = f"""
            <html>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
                    <h2 style="color: #4a6ee0;">Password Reset</h2>
                    <p>Hello {name},</p>
                    <p>We received a request to reset your password. Please use the verification code below to reset your password:</p>
                    <div style="background-color: #f7f7f7; padding: 10px; text-align: center; font-size: 24px; letter-spacing: 5px; font-weight: bold; margin: 20px 0;">
                        {otp_code}
                    </div>
                    <p>This code will expire in 10 minutes.</p>
                    <p>If you did not request a password reset, please ignore this email or contact support if you have concerns.</p>
                    <p>Best regards,<br>The XAMP Team</p>
                </div>
            </body>
            </html>
            """
            plain_message = f"Hello {name},\n\nWe received a request to reset your password. Please use the verification code below to reset your password:\n\n{otp_code}\n\nThis code will expire in 10 minutes.\n\nIf you did not request a password reset, please ignore this email or contact support if you have concerns.\n\nBest regards,\nThe XAMP Team"
        else:  # verification
            subject = "Email Verification Code"
            html_message = f"""
            <html>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
                    <h2 style="color: #4a6ee0;">Email Verification</h2>
                    <p>Hello {name},</p>
                    <p>Thank you for registering! Please use the verification code below to verify your email address:</p>
                    <div style="background-color: #f7f7f7; padding: 10px; text-align: center; font-size: 24px; letter-spacing: 5px; font-weight: bold; margin: 20px 0;">
                        {otp_code}
                    </div>
                    <p>This code will expire in 10 minutes.</p>
                    <p>Best regards,<br>The XAMP Team</p>
                </div>
            </body>
            </html>
            """
            plain_message = f"Hello {name},\n\nThank you for registering! Please use the verification code below to verify your email address:\n\n{otp_code}\n\nThis code will expire in 10 minutes.\n\nBest regards,\nThe XAMP Team"

        # Use a default email if DEFAULT_FROM_EMAIL is not set
        from_email = getattr(settings, 'DEFAULT_FROM_EMAIL', 'noreply@xamp.com')
        recipient_list = [user.email]

        logger.info(f"Sending email with subject: {subject}, from: {from_email}, to: {recipient_list}")
        try:
            send_mail(
                subject,
                plain_message,
                from_email,
                recipient_list,
                html_message=html_message,
                fail_silently=False,
            )
            logger.info(f"Email sent successfully to {user.email}")
            return True, f"OTP sent successfully to {user.email}"
        except Exception as mail_error:
            logger.error(f"Error in send_mail: {str(mail_error)}")
            return False, f"Failed to send OTP via email: {str(mail_error)}"
    except Exception as e:
        logger.error(f"Error sending email OTP: {str(e)}")
        return False, "Failed to send OTP via email"

def send_otp_via_sms(user, otp_code):
    """
    Send OTP verification code via SMS

    Note: This is a placeholder function. In a real implementation,
    you would integrate with an SMS service provider like Twilio, AWS SNS, etc.
    """
    try:
        # Placeholder for SMS sending logic
        # In a real implementation, you would use an SMS service provider API
        # Example with Twilio:
        # from twilio.rest import Client
        # client = Client(settings.TWILIO_ACCOUNT_SID, settings.TWILIO_AUTH_TOKEN)
        # message = client.messages.create(
        #     body=f"Your verification code is: {otp_code}. This code will expire in 10 minutes.",
        #     from_=settings.TWILIO_PHONE_NUMBER,
        #     to=user.phone_number
        # )

        # For now, we'll just log the OTP (for development purposes only)
        logger.info(f"SMS OTP for {user.phone_number}: {otp_code}")

        return True, "OTP sent successfully to your phone"
    except Exception as e:
        logger.error(f"Error sending SMS OTP: {str(e)}")
        return False, "Failed to send OTP via SMS"
