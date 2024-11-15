from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    phone_number = models.CharField(max_length=20, blank=True)
    address = models.TextField(blank=True) 
    first_time_login = models.BooleanField(default=True)  
    last_password_update = models.DateTimeField(default=timezone.now)  

    def __str__(self):
        return f"{self.user.username}'s profile"