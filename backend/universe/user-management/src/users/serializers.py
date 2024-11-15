from django.contrib.auth.models import User
from rest_framework import serializers
from .models import UserProfile

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['phone_number', 'address', 'first_time_login', 'last_password_update'] 
        extra_kwargs = {'first_time_login': {'read_only': True}}
        
class UserSerializer(serializers.ModelSerializer):
    profile = UserProfileSerializer()
    class Meta:
        model = User
        fields = ('id','username', 'email', 'first_name', 'last_name', 'is_staff', 'profile')
        extra_kwargs = {'password': {'write_only': True}}
    
    def create(self, validated_data):
        profile_data = validated_data.pop('profile', None)  
        user = User.objects.create(**validated_data)         
        if profile_data:  
            UserProfile.objects.create(user=user, **profile_data)
        
        return user

    def update(self, instance, validated_data):
        profile_data = validated_data.pop('profile', None) 
        for attr, value in validated_data.items(): 
            setattr(instance, attr, value)
        
        instance.save()

        if profile_data: 
            profile = instance.profile
            for attr, value in profile_data.items():
                setattr(profile, attr, value)
            profile.save()
        
