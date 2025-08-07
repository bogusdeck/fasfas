from django.core.management.base import BaseCommand, CommandError
from django.db import transaction
from brand.models import State


class Command(BaseCommand):
    help = 'Populate State model with Indian states and union territories'

    def add_arguments(self, parser):
        parser.add_argument(
            '--clear',
            action='store_true',
            help='Clear existing states before populating',
        )
        parser.add_argument(
            '--confirm',
            action='store_true',
            help='Skip confirmation prompts',
        )

    def handle(self, *args, **options):
        # Indian states and union territories with their codes
        states_data = [
            # States
            {'name': 'Andhra Pradesh', 'code': 'AP'},
            {'name': 'Arunachal Pradesh', 'code': 'AR'},
            {'name': 'Assam', 'code': 'AS'},
            {'name': 'Bihar', 'code': 'BR'},
            {'name': 'Chhattisgarh', 'code': 'CG'},
            {'name': 'Goa', 'code': 'GA'},
            {'name': 'Gujarat', 'code': 'GJ'},
            {'name': 'Haryana', 'code': 'HR'},
            {'name': 'Himachal Pradesh', 'code': 'HP'},
            {'name': 'Jharkhand', 'code': 'JH'},
            {'name': 'Karnataka', 'code': 'KA'},
            {'name': 'Kerala', 'code': 'KL'},
            {'name': 'Madhya Pradesh', 'code': 'MP'},
            {'name': 'Maharashtra', 'code': 'MH'},
            {'name': 'Manipur', 'code': 'MN'},
            {'name': 'Meghalaya', 'code': 'ML'},
            {'name': 'Mizoram', 'code': 'MZ'},
            {'name': 'Nagaland', 'code': 'NL'},
            {'name': 'Odisha', 'code': 'OR'},
            {'name': 'Punjab', 'code': 'PB'},
            {'name': 'Rajasthan', 'code': 'RJ'},
            {'name': 'Sikkim', 'code': 'SK'},
            {'name': 'Tamil Nadu', 'code': 'TN'},
            {'name': 'Telangana', 'code': 'TG'},
            {'name': 'Tripura', 'code': 'TR'},
            {'name': 'Uttar Pradesh', 'code': 'UP'},
            {'name': 'Uttarakhand', 'code': 'UK'},
            {'name': 'West Bengal', 'code': 'WB'},
            
            # Union Territories
            {'name': 'Andaman and Nicobar Islands', 'code': 'AN'},
            {'name': 'Chandigarh', 'code': 'CH'},
            {'name': 'Dadra and Nagar Haveli and Daman and Diu', 'code': 'DN'},
            {'name': 'Delhi', 'code': 'DL'},
            {'name': 'Jammu and Kashmir', 'code': 'JK'},
            {'name': 'Ladakh', 'code': 'LA'},
            {'name': 'Lakshadweep', 'code': 'LD'},
            {'name': 'Puducherry', 'code': 'PY'},
            
            # Major cities (for convenience)
            {'name': 'Mumbai', 'code': 'MUM'},
            {'name': 'Bangalore', 'code': 'BLR'},
            {'name': 'Hyderabad', 'code': 'HYD'},
            {'name': 'Chennai', 'code': 'CHE'},
            {'name': 'Kolkata', 'code': 'KOL'},
            {'name': 'Pune', 'code': 'PUN'},
            {'name': 'Ahmedabad', 'code': 'AMD'},
            {'name': 'Jaipur', 'code': 'JAI'},
            {'name': 'Surat', 'code': 'SUR'},
            {'name': 'Lucknow', 'code': 'LKO'},
            {'name': 'Kanpur', 'code': 'KAN'},
            {'name': 'Nagpur', 'code': 'NAG'},
            {'name': 'Indore', 'code': 'IND'},
            {'name': 'Thane', 'code': 'THA'},
            {'name': 'Bhopal', 'code': 'BHO'},
            {'name': 'Visakhapatnam', 'code': 'VIS'},
            {'name': 'Pimpri-Chinchwad', 'code': 'PIM'},
            {'name': 'Patna', 'code': 'PAT'},
            {'name': 'Vadodara', 'code': 'VAD'},
            {'name': 'Ghaziabad', 'code': 'GHA'},
            {'name': 'Ludhiana', 'code': 'LUD'},
            {'name': 'Agra', 'code': 'AGR'},
            {'name': 'Nashik', 'code': 'NAS'},
            {'name': 'Faridabad', 'code': 'FAR'},
            {'name': 'Meerut', 'code': 'MEE'},
            {'name': 'Rajkot', 'code': 'RAJ'},
            {'name': 'Kalyan-Dombivali', 'code': 'KAL'},
            {'name': 'Vasai-Virar', 'code': 'VAS'},
            {'name': 'Varanasi', 'code': 'VAR'},
            {'name': 'Srinagar', 'code': 'SRI'},
            {'name': 'Aurangabad', 'code': 'AUR'},
            {'name': 'Dhanbad', 'code': 'DHA'},
            {'name': 'Amritsar', 'code': 'AMR'},
            {'name': 'Navi Mumbai', 'code': 'NAV'},
            {'name': 'Allahabad', 'code': 'ALL'},
            {'name': 'Ranchi', 'code': 'RAN'},
            {'name': 'Howrah', 'code': 'HOW'},
            {'name': 'Coimbatore', 'code': 'COI'},
            {'name': 'Jabalpur', 'code': 'JAB'},
            {'name': 'Gwalior', 'code': 'GWA'},
            {'name': 'Vijayawada', 'code': 'VIJ'},
            {'name': 'Jodhpur', 'code': 'JOD'},
            {'name': 'Madurai', 'code': 'MAD'},
            {'name': 'Raipur', 'code': 'RAI'},
            {'name': 'Kota', 'code': 'KOT'},
            {'name': 'Guwahati', 'code': 'GUW'},
            {'name': 'Chandigarh', 'code': 'CHA'},
            {'name': 'Solapur', 'code': 'SOL'},
            {'name': 'Hubli-Dharwad', 'code': 'HUB'},
            {'name': 'Bareilly', 'code': 'BAR'},
            {'name': 'Moradabad', 'code': 'MOR'},
            {'name': 'Mysore', 'code': 'MYS'},
            {'name': 'Gurgaon', 'code': 'GUR'},
            {'name': 'Aligarh', 'code': 'ALI'},
            {'name': 'Jalandhar', 'code': 'JAL'},
            {'name': 'Tiruchirappalli', 'code': 'TIR'},
            {'name': 'Bhubaneswar', 'code': 'BHU'},
            {'name': 'Salem', 'code': 'SAL'},
            {'name': 'Warangal', 'code': 'WAR'},
            {'name': 'Mira-Bhayandar', 'code': 'MIR'},
            {'name': 'Thiruvananthapuram', 'code': 'THI'},
            {'name': 'Bhiwandi', 'code': 'BHI'},
            {'name': 'Saharanpur', 'code': 'SAH'},
            {'name': 'Guntur', 'code': 'GUN'},
            {'name': 'Amravati', 'code': 'AMV'},
            {'name': 'Bikaner', 'code': 'BIK'},
            {'name': 'Noida', 'code': 'NOI'},
            {'name': 'Jamshedpur', 'code': 'JAM'},
            {'name': 'Bhilai Nagar', 'code': 'BHL'},
            {'name': 'Cuttack', 'code': 'CUT'},
            {'name': 'Firozabad', 'code': 'FIR'},
            {'name': 'Kochi', 'code': 'KOC'},
            {'name': 'Bhavnagar', 'code': 'BHA'},
            {'name': 'Dehradun', 'code': 'DEH'},
            {'name': 'Durgapur', 'code': 'DUR'},
            {'name': 'Asansol', 'code': 'ASA'},
            {'name': 'Nanded-Waghala', 'code': 'NAN'},
            {'name': 'Kolhapur', 'code': 'KOL'},
            {'name': 'Ajmer', 'code': 'AJM'},
            {'name': 'Gulbarga', 'code': 'GUL'},
            {'name': 'Jamnagar', 'code': 'JAM'},
            {'name': 'Ujjain', 'code': 'UJJ'},
            {'name': 'Loni', 'code': 'LON'},
            {'name': 'Siliguri', 'code': 'SIL'},
            {'name': 'Jhansi', 'code': 'JHA'},
            {'name': 'Ulhasnagar', 'code': 'ULH'},
            {'name': 'Nellore', 'code': 'NEL'},
            {'name': 'Jammu', 'code': 'JAM'},
            {'name': 'Sangli-Miraj & Kupwad', 'code': 'SAN'},
            {'name': 'Belgaum', 'code': 'BEL'},
            {'name': 'Mangalore', 'code': 'MAN'},
            {'name': 'Ambattur', 'code': 'AMB'},
            {'name': 'Tirunelveli', 'code': 'TIR'},
            {'name': 'Malegaon', 'code': 'MAL'},
            {'name': 'Gaya', 'code': 'GAY'},
            {'name': 'Jalgaon', 'code': 'JAL'},
            {'name': 'Udaipur', 'code': 'UDA'},
            {'name': 'Maheshtala', 'code': 'MAH'},
        ]

        # Check if we should clear existing states
        if options['clear']:
            if not options['confirm']:
                confirm = input("This will delete all existing states. Are you sure? (yes/no): ")
                if confirm.lower() != 'yes':
                    self.stdout.write(self.style.ERROR('Operation cancelled.'))
                    return

            with transaction.atomic():
                deleted_count = State.objects.all().delete()[0]
                self.stdout.write(
                    self.style.WARNING(f'Deleted {deleted_count} existing states.')
                )

        # Create states
        created_count = 0
        updated_count = 0
        
        with transaction.atomic():
            for state_data in states_data:
                state, created = State.objects.get_or_create(
                    state_name=state_data['name'],
                    defaults={
                        'state_code': state_data['code'],
                        'country': 'India',
                        'is_active': True
                    }
                )
                
                if created:
                    created_count += 1
                    self.stdout.write(f"Created: {state.state_name} ({state.state_code})")
                else:
                    # Update existing state if needed
                    if state.state_code != state_data['code']:
                        state.state_code = state_data['code']
                        state.save()
                        updated_count += 1
                        self.stdout.write(f"Updated: {state.state_name} ({state.state_code})")

        # Summary
        self.stdout.write(
            self.style.SUCCESS(
                f'\nSummary:\n'
                f'- Created: {created_count} states\n'
                f'- Updated: {updated_count} states\n'
                f'- Total states in database: {State.objects.count()}'
            )
        )

        if created_count > 0:
            self.stdout.write(
                self.style.SUCCESS(
                    f'\nSuccessfully populated State model with {created_count} new states!'
                )
            )
        else:
            self.stdout.write(
                self.style.WARNING('No new states were created. All states already exist.')
            )
