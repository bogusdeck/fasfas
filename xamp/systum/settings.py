"""Django settings for systum project."""

import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Get environment type
ENVIRONMENT = os.environ.get('ENVIRONMENT', 'development')

# Import settings from the appropriate environment module
if ENVIRONMENT == 'production':
    from .settings.production import *
elif ENVIRONMENT == 'staging':
    from .settings.staging import *
else:
    from .settings.development import *
