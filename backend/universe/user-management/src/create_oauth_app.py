import os
import django
from dotenv import load_dotenv

from django.contrib.auth import get_user_model
from django.core.exceptions import ImproperlyConfigured
#from django.core.wsgi import get_wsgi_application


# Load the environment variables from .env file
load_dotenv()

# Get the WSGI application
#application = get_wsgi_application()


# Initialize Django
django.setup()

from oauth2_provider.models import Application

client_id = os.getenv('OAUTH_CLIENT_ID')
client_secret = os.getenv('OAUTH_CLIENT_SECRET')
oauth_admin_password = os.getenv('OAUTH_ADMIN_PASSWORD')

# Ensure environment variables are set
if not client_id or not client_secret or not oauth_admin_password:
    raise ImproperlyConfigured("Missing required environment variables for OAuth2 setup.")


User = get_user_model()

if not Application.objects.filter(name="LegacyOAuth2App").exists():
    admin_user, created = User.objects.get_or_create(username="oauth_admin")
    if created:
        admin_user.set_password(oauth_admin_password)
        admin_user.save()

    app = Application(
        name="LegacyOAuth2App",
        client_id=client_id,
        client_secret=client_secret,
        client_type=Application.CLIENT_CONFIDENTIAL,
        authorization_grant_type=Application.GRANT_PASSWORD,
        user=admin_user,
    )
    app.save()
