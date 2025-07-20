import os
from pathlib import Path
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Get environment type
ENVIRONMENT = os.environ.get('ENVIRONMENT', 'development')

# Import appropriate settings based on environment
if ENVIRONMENT == 'production':
    from .production import *
elif ENVIRONMENT == 'staging':
    from .staging import *
else:
    from .development import *

# Import Google OAuth settings
from .google_auth import *
