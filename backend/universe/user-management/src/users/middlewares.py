from django.utils import timezone
from datetime import timedelta
from django.http import JsonResponse

class PasswordExpiryMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if request.user.is_authenticated:
            profile = request.user.profile
            if profile.first_time_login:
                return JsonResponse({'detail': 'Password update required: first login'}, status=403)
            elif timezone.now() - profile.last_password_update > timedelta(days=30):
                return JsonResponse({'detail': 'Password update required: monthly expiration'}, status=403)
        
        return self.get_response(request)
