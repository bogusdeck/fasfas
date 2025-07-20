"""
Entry point for Vercel serverless deployment.
"""
import os
import sys

# Add the project directory to the sys.path
path = os.path.dirname(os.path.abspath(__file__))
if path not in sys.path:
    sys.path.append(path)

# Set environment variables
os.environ.setdefault('ENVIRONMENT', 'production')
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'systum.settings.vercel')

# Create logs directory if it doesn't exist
logs_dir = os.path.join(path, 'logs')
if not os.path.exists(logs_dir):
    try:
        os.makedirs(logs_dir)
    except Exception:
        pass

# Import the WSGI application
from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()

# This is needed for Vercel
app = application
