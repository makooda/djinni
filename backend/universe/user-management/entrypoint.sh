#!/bin/sh

# Load environment variables
export $(grep -v '^#' .env | xargs)

# Wait for PostgreSQL to be ready
./wait-for-it.sh db:5432 --timeout=60 --strict -- echo "Database is up"

# Run migrations
python src/manage.py makemigrations users
python src/manage.py migrate

# Create OAuth app
python src/create_oauth_app.py

# Create superuser if not exists
python src/manage.py shell -c "
import os
from django.contrib.auth import get_user_model;
User = get_user_model();
username = os.getenv('DJANGO_SUPERUSER_USERNAME');
email = os.getenv('DJANGO_SUPERUSER_EMAIL');
password = os.getenv('DJANGO_SUPERUSER_PASSWORD');
if not User.objects.filter(username=username).exists():
    User.objects.create_superuser(username=username, email=email, password=password);
"

# Start server
python src/manage.py runserver 0.0.0.0:8000
