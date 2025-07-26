from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.utils import timezone
import uuid
import pyotp
import random
import string
from datetime import datetime, timedelta


class UserManager(BaseUserManager):
    def create_user(self, email=None, password=None, **extra_fields):
        # Allow email to be None/blank for phone-first registration
        if email:
            email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        if password:
            user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        # Superusers still require an email
        if not email:
            raise ValueError('The Email field must be set for superusers')

        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(email, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True, blank=True, null=True)
    first_name = models.CharField(max_length=30, blank=True)
    last_name = models.CharField(max_length=30, blank=True)
    phone_number = models.CharField(max_length=15, unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_email_verified = models.BooleanField(default=False)
    is_phone_verified = models.BooleanField(default=False)
    date_joined = models.DateTimeField(default=timezone.now)
    last_modified = models.DateTimeField(auto_now=True)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email

    def get_full_name(self):
        return f"{self.first_name} {self.last_name}".strip()

    def get_short_name(self):
        return self.first_name


class OTPVerification(models.Model):
    OTP_TYPE_CHOICES = (
        ('email', 'Email'),
        ('phone', 'Phone'),
    )

    user = models.ForeignKey('User', on_delete=models.CASCADE, related_name='otps')
    otp_type = models.CharField(max_length=10, choices=OTP_TYPE_CHOICES)
    otp_code = models.CharField(max_length=6)
    is_verified = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField()

    def __str__(self):
        return f"{self.user.email} - {self.otp_type} OTP"

    def save(self, *args, **kwargs):
        if not self.otp_code:
            # Generate a 6-digit OTP code
            self.otp_code = ''.join(random.choices(string.digits, k=6))

        if not self.expires_at:
            # Set expiration time to 10 minutes from now
            self.expires_at = timezone.now() + timedelta(minutes=10)

        super().save(*args, **kwargs)

    @property
    def is_expired(self):
        return timezone.now() > self.expires_at

    @classmethod
    def generate_otp(cls, user, otp_type):
        # Delete any existing OTPs of the same type for this user
        cls.objects.filter(user=user, otp_type=otp_type).delete()

        # Create a new OTP
        otp = cls.objects.create(
            user=user,
            otp_type=otp_type
        )

        return otp

    @classmethod
    def verify_otp(cls, user, otp_type, otp_code):
        try:
            otp = cls.objects.get(
                user=user,
                otp_type=otp_type,
                otp_code=otp_code,
                is_verified=False
            )

            if otp.is_expired:
                return False, "OTP has expired"

            # Mark OTP as verified
            otp.is_verified = True
            otp.save()

            # Update user verification status
            if otp_type == 'email':
                user.is_email_verified = True
            elif otp_type == 'phone':
                user.is_phone_verified = True
            user.save()

            return True, "OTP verified successfully"
        except cls.DoesNotExist:
            return False, "Invalid OTP"
