from django.db import models
from django.conf import settings


class BrandUser(models.Model):
    """
    Model to store brand-specific user information
    """
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='brand_profile')
    company_name = models.CharField(max_length=255, blank=True, null=True)
    website = models.URLField(blank=True, null=True)
    industry = models.CharField(max_length=100, blank=True, null=True)
    is_verified = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.email or self.user.phone_number} - Brand Profile"


class BrandDetails(models.Model):
    """
    Model to store additional brand details
    """
    brand_user = models.OneToOneField(BrandUser, on_delete=models.CASCADE, related_name='details')
    owner_name = models.CharField(max_length=255)
    contact_number = models.CharField(max_length=20)
    company_type = models.CharField(max_length=100)
    address = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Details for {self.brand_user}"
