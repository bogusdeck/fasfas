from django.db import models
from django.conf import settings
from django.utils import timezone
from django.core.validators import MinValueValidator
from decimal import Decimal


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


class Brand(models.Model):
    """
    Model to represent a brand/company
    """
    brand_user = models.OneToOneField(BrandUser, on_delete=models.CASCADE, related_name='brand')
    name = models.CharField(max_length=255, unique=True)
    description = models.TextField(blank=True, null=True)
    logo = models.ImageField(upload_to='brand_logos/', blank=True, null=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name

    @property
    def total_states(self):
        return self.states.count()

    @property
    def total_warehouses(self):
        return sum(state.warehouses.count() for state in self.states.all())

    @property
    def total_products(self):
        return Product.objects.filter(warehouses__state__brand=self).distinct().count()


class State(models.Model):
    """
    Model to represent states/cities where brand operates
    """
    brand = models.ForeignKey(Brand, on_delete=models.CASCADE, related_name='states')
    name = models.CharField(max_length=100)
    state_code = models.CharField(max_length=10, blank=True, null=True)
    country = models.CharField(max_length=100, default='India')
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['name']
        unique_together = ['brand', 'name']  # Same brand can't have duplicate state names

    def __str__(self):
        return f"{self.name} - {self.brand.name}"

    @property
    def total_warehouses(self):
        return self.warehouses.count()

    @property
    def total_products(self):
        return Product.objects.filter(warehouses__state=self).distinct().count()


class Warehouse(models.Model):
    """
    Model to represent warehouses in different states
    """
    WAREHOUSE_TYPES = (
        ('main', 'Main Warehouse'),
        ('distribution', 'Distribution Center'),
        ('retail', 'Retail Store'),
        ('fulfillment', 'Fulfillment Center'),
    )

    state = models.ForeignKey(State, on_delete=models.CASCADE, related_name='warehouses')
    name = models.CharField(max_length=255)
    warehouse_code = models.CharField(max_length=50, unique=True)
    warehouse_type = models.CharField(max_length=20, choices=WAREHOUSE_TYPES, default='main')
    address = models.TextField()
    contact_person = models.CharField(max_length=255, blank=True, null=True)
    contact_phone = models.CharField(max_length=20, blank=True, null=True)
    contact_email = models.EmailField(blank=True, null=True)
    capacity = models.PositiveIntegerField(help_text="Storage capacity in square feet", blank=True, null=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['name']
        unique_together = ['state', 'name']  # Same state can't have duplicate warehouse names

    def __str__(self):
        return f"{self.name} ({self.warehouse_code}) - {self.state.name}"

    @property
    def total_products(self):
        return self.products.count()

    @property
    def brand(self):
        return self.state.brand


class Product(models.Model):
    """
    Model to represent products that can be stored in multiple warehouses
    """
    PRODUCT_STATUS = (
        ('active', 'Active'),
        ('inactive', 'Inactive'),
        ('discontinued', 'Discontinued'),
        ('out_of_stock', 'Out of Stock'),
    )

    brand = models.ForeignKey(Brand, on_delete=models.CASCADE, related_name='products')
    name = models.CharField(max_length=255)
    sku = models.CharField(max_length=100, unique=True, help_text="Stock Keeping Unit")
    description = models.TextField(blank=True, null=True)
    category = models.CharField(max_length=100, blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, validators=[MinValueValidator(Decimal('0.01'))])
    cost_price = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True, validators=[MinValueValidator(Decimal('0.01'))])
    weight = models.DecimalField(max_digits=8, decimal_places=2, blank=True, null=True, help_text="Weight in kg")
    dimensions = models.CharField(max_length=100, blank=True, null=True, help_text="L x W x H in cm")
    image = models.ImageField(upload_to='product_images/', blank=True, null=True)
    status = models.CharField(max_length=20, choices=PRODUCT_STATUS, default='active')
    warehouses = models.ManyToManyField(Warehouse, through='ProductWarehouse', related_name='products')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['name']
        unique_together = ['brand', 'sku']  # Same brand can't have duplicate SKUs

    def __str__(self):
        return f"{self.name} ({self.sku}) - {self.brand.name}"

    @property
    def total_stock(self):
        return sum(pw.quantity for pw in self.productwarehouse_set.all())

    @property
    def warehouse_count(self):
        return self.warehouses.count()

    def get_stock_in_warehouse(self, warehouse):
        try:
            return self.productwarehouse_set.get(warehouse=warehouse).quantity
        except ProductWarehouse.DoesNotExist:
            return 0


class ProductWarehouse(models.Model):
    """
    Intermediate model to store product quantities in specific warehouses
    """
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    warehouse = models.ForeignKey(Warehouse, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=0)
    minimum_stock_level = models.PositiveIntegerField(default=10, help_text="Minimum stock level for reorder")
    maximum_stock_level = models.PositiveIntegerField(blank=True, null=True, help_text="Maximum stock level")
    last_restocked = models.DateTimeField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ['product', 'warehouse']
        ordering = ['-quantity']

    def __str__(self):
        return f"{self.product.name} in {self.warehouse.name}: {self.quantity} units"

    @property
    def is_low_stock(self):
        return self.quantity <= self.minimum_stock_level

    @property
    def is_out_of_stock(self):
        return self.quantity == 0

    def save(self, *args, **kwargs):
        # Update last_restocked when quantity increases
        if self.pk:
            old_quantity = ProductWarehouse.objects.get(pk=self.pk).quantity
            if self.quantity > old_quantity:
                self.last_restocked = timezone.now()
        super().save(*args, **kwargs)
