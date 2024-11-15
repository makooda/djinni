import logging
from django.utils import timezone
from datetime import timedelta
from django.http import JsonResponse

logger = logging.getLogger(__name__)

class PasswordExpiryMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        print("PasswordExpiryMiddleware called for user:", request.user)
        logger.debug("PasswordExpiryMiddleware called for user")

        # Ensure the user is authenticated before accessing profile data
        if request.user.is_authenticated:
            profile = getattr(request.user, 'userprofile', None)
            if profile:
                if profile.first_time_login:
                    logger.info("Redirecting to update password for first login")
                    return JsonResponse({'detail': 'Password update required: first login'}, status=403)
                elif timezone.now() - profile.last_password_update > timedelta(days=30):
                    logger.info("Redirecting to update password due to monthly expiration")
                    return JsonResponse({'detail': 'Password update required: monthly expiration'}, status=403)
            else:
                logger.warning("User profile not found for user: %s", request.user.username)

        # Proceed with the request if no conditions match
        return self.get_response(request)
