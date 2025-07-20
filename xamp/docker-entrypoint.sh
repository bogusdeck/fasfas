#!/bin/bash

# Print environment information for debugging
echo "Environment: $ENVIRONMENT"
echo "Django settings module: $DJANGO_SETTINGS_MODULE"

# Apply database migrations if database is available
echo "Attempting to apply database migrations..."
python manage.py migrate || echo "Database migrations failed - database may not be available"

# Collect static files
echo "Collecting static files..."
python manage.py collectstatic --noinput || echo "Static files collection failed"

# Create superuser if needed and if database is available
echo "Attempting to create superuser if it doesn't exist..."
python manage.py shell -c "
try:
    from django.contrib.auth import get_user_model;
    User = get_user_model();
    if not User.objects.filter(username='admin').exists():
        User.objects.create_superuser('admin', 'admin@example.com', 'admin');
        print('Superuser created.');
    else:
        print('Superuser already exists.');
except Exception as e:
    print(f'Could not create superuser: {e}');
" || echo "Superuser creation failed - database may not be available"

# Start server
echo "Starting server..."
exec "$@"
