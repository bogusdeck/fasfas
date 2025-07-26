from django.db import models
from django.conf import settings
from django.utils import timezone


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

    # Order statistics
    total_orders = models.IntegerField(default=0, help_text="Total number of orders received")
    orders_this_week = models.IntegerField(default=0, help_text="Number of orders received this week")
    return_rate = models.DecimalField(max_digits=5, decimal_places=2, default=0.0, help_text="Return rate percentage")

    # Payment information
    next_payment_date = models.DateField(null=True, blank=True, help_text="Date of next scheduled payment")
    next_payment_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0.0, help_text="Amount of next scheduled payment")
    total_outstanding_payment = models.DecimalField(max_digits=12, decimal_places=2, default=0.0, help_text="Total outstanding payment amount")
    total_payments_till_date = models.DecimalField(max_digits=12, decimal_places=2, default=0.0, help_text="Total payments received till date")

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Details for {self.brand_user}"


class Announcement(models.Model):
    """
    Model to store announcements and new features for brands
    """
    TYPE_CHOICES = (
        ('announcement', 'Announcement'),
        ('new_feature', 'New Feature'),
    )

    title = models.CharField(max_length=255)
    content = models.TextField()
    type = models.CharField(max_length=20, choices=TYPE_CHOICES, default='announcement')
    is_active = models.BooleanField(default=True)
    priority = models.IntegerField(default=0, help_text="Higher number means higher priority")
    publish_date = models.DateTimeField(default=timezone.now)
    expiry_date = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-priority', '-publish_date']

    def __str__(self):
        return f"{self.get_type_display()}: {self.title}"

    @property
    def is_expired(self):
        if self.expiry_date and timezone.now() > self.expiry_date:
            return True
        return False

class BrandPendingTask(models.Model):
    """
    Model to store pending tasks for brands
    """
    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('in_progress', 'In Progress'),
        ('completed', 'Completed'),
        ('overdue', 'Overdue'),
    )

    PRIORITY_CHOICES = (
        ('low', 'Low'),
        ('medium', 'Medium'),
        ('high', 'High'),
        ('urgent', 'Urgent'),
    )

    CATEGORY_CHOICES = (
        ('onboarding', 'Onboarding'),
        ('orders', 'Orders'),
        ('inventory', 'Inventory'),
        ('payments', 'Payments'),
        ('returns', 'Returns'),
        ('compliance', 'Compliance'),
        ('other', 'Other'),
    )

    brand_user = models.ForeignKey(BrandUser, on_delete=models.CASCADE, related_name='pending_tasks')
    title = models.CharField(max_length=255)
    description = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    priority = models.CharField(max_length=10, choices=PRIORITY_CHOICES, default='medium')
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='other')
    due_date = models.DateTimeField(null=True, blank=True)
    completion_date = models.DateTimeField(null=True, blank=True)
    is_actionable = models.BooleanField(default=True, help_text="Whether the brand can take action on this task")
    action_url = models.CharField(max_length=255, blank=True, null=True, help_text="URL for the action to be taken")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.brand_user} - {self.title} ({self.get_status_display()})"

    @property
    def is_overdue(self):
        if self.due_date and timezone.now() > self.due_date and self.status != 'completed':
            return True
        return False

    def save(self, *args, **kwargs):
        # Auto-update status to overdue if past due date
        if self.is_overdue and self.status == 'pending':
            self.status = 'overdue'
        super().save(*args, **kwargs)
