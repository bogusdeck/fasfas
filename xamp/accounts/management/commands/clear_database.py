from django.core.management.base import BaseCommand, CommandError
from django.db import transaction
from django.contrib.auth import get_user_model
from django.contrib.sessions.models import Session
from django.contrib.admin.models import LogEntry
from django.contrib.contenttypes.models import ContentType
from django.apps import apps
import os

# Import models
from accounts.models import User, OTPVerification
from brand.models import (
    BrandUser, BrandDetails, Announcement, BrandPendingTask,
    Brand, State, Warehouse, Product, ProductWarehouse
)

class Command(BaseCommand):
    help = 'Clear all data from the database. Use with caution!'

    def add_arguments(self, parser):
        parser.add_argument(
            '--all',
            action='store_true',
            help='Clear all data including users, brands, and system data',
        )
        parser.add_argument(
            '--users-only',
            action='store_true',
            help='Clear only user-related data (User, OTPVerification)',
        )
        parser.add_argument(
            '--brands-only',
            action='store_true',
            help='Clear only brand-related data (Brand, Product, Warehouse, etc.)',
        )
        parser.add_argument(
            '--system-only',
            action='store_true',
            help='Clear only system data (Sessions, Admin logs, etc.)',
        )
        parser.add_argument(
            '--confirm',
            action='store_true',
            help='Skip confirmation prompt (use for automated scripts)',
        )
        parser.add_argument(
            '--environment',
            type=str,
            default=None,
            help='Only run if ENVIRONMENT matches this value (safety check)',
        )

    def handle(self, *args, **options):
        # Safety check for environment
        current_env = os.environ.get('ENVIRONMENT', 'development')
        if options['environment'] and current_env != options['environment']:
            raise CommandError(
                f"Environment mismatch. Current: {current_env}, Required: {options['environment']}"
            )

        # Determine what to clear
        clear_all = options['all']
        clear_users = options['users_only'] or clear_all
        clear_brands = options['brands_only'] or clear_all
        clear_system = options['system_only'] or clear_all

        if not any([clear_all, clear_users, clear_brands, clear_system]):
            raise CommandError(
                "You must specify what to clear: --all, --users-only, --brands-only, or --system-only"
            )

        # Show warning and get confirmation
        if not options['confirm']:
            self.stdout.write(
                self.style.WARNING('⚠️  WARNING: This will permanently delete data from your database!')
            )
            self.stdout.write(f"Current environment: {current_env}")
            
            if clear_all:
                self.stdout.write("This will clear ALL data from the database.")
            else:
                actions = []
                if clear_users:
                    actions.append("user data")
                if clear_brands:
                    actions.append("brand data")
                if clear_system:
                    actions.append("system data")
                self.stdout.write(f"This will clear: {', '.join(actions)}")

            confirm = input("\nAre you sure you want to continue? Type 'yes' to confirm: ")
            if confirm.lower() != 'yes':
                self.stdout.write(self.style.SUCCESS('Operation cancelled.'))
                return

        # Start clearing data
        self.stdout.write(self.style.SUCCESS('Starting database cleanup...'))

        try:
            with transaction.atomic():
                deleted_counts = {}

                if clear_brands:
                    deleted_counts.update(self.clear_brand_data())

                if clear_users:
                    deleted_counts.update(self.clear_user_data())

                if clear_system:
                    deleted_counts.update(self.clear_system_data())

                # Display results
                self.stdout.write(self.style.SUCCESS('\n✅ Database cleanup completed successfully!'))
                self.stdout.write('\nDeleted records:')
                
                total_deleted = 0
                for model_name, count in deleted_counts.items():
                    if count > 0:
                        self.stdout.write(f"  • {model_name}: {count}")
                        total_deleted += count

                if total_deleted == 0:
                    self.stdout.write("  • No records found to delete")
                else:
                    self.stdout.write(f"\nTotal records deleted: {total_deleted}")

        except Exception as e:
            raise CommandError(f'Error during database cleanup: {str(e)}')

    def clear_brand_data(self):
        """Clear all brand-related data"""
        self.stdout.write('Clearing brand data...')
        
        deleted_counts = {}
        
        # Clear in order to respect foreign key constraints
        models_to_clear = [
            (ProductWarehouse, 'ProductWarehouse'),
            (Product, 'Product'),
            (Warehouse, 'Warehouse'),
            (State, 'State'),
            (Brand, 'Brand'),
            (BrandPendingTask, 'BrandPendingTask'),
            (Announcement, 'Announcement'),
            (BrandDetails, 'BrandDetails'),
            (BrandUser, 'BrandUser'),
        ]

        for model, name in models_to_clear:
            count, _ = model.objects.all().delete()
            deleted_counts[name] = count

        return deleted_counts

    def clear_user_data(self):
        """Clear all user-related data"""
        self.stdout.write('Clearing user data...')
        
        deleted_counts = {}
        
        # Clear OTP verifications first
        count, _ = OTPVerification.objects.all().delete()
        deleted_counts['OTPVerification'] = count

        # Clear users (this will cascade to related models)
        User = get_user_model()
        count, _ = User.objects.all().delete()
        deleted_counts['User'] = count

        return deleted_counts

    def clear_system_data(self):
        """Clear system-related data"""
        self.stdout.write('Clearing system data...')
        
        deleted_counts = {}

        # Clear sessions
        count, _ = Session.objects.all().delete()
        deleted_counts['Session'] = count

        # Clear admin log entries
        count, _ = LogEntry.objects.all().delete()
        deleted_counts['LogEntry'] = count

        # Clear any auth tokens if they exist
        try:
            from rest_framework.authtoken.models import Token
            count, _ = Token.objects.all().delete()
            deleted_counts['Token'] = count
        except ImportError:
            pass

        # Clear JWT blacklisted tokens if they exist
        try:
            from rest_framework_simplejwt.token_blacklist.models import BlacklistedToken, OutstandingToken
            count, _ = BlacklistedToken.objects.all().delete()
            deleted_counts['BlacklistedToken'] = count
            
            count, _ = OutstandingToken.objects.all().delete()
            deleted_counts['OutstandingToken'] = count
        except ImportError:
            pass

        return deleted_counts
