import json
import logging
import requests
import os
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.http import QueryDict
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from .serializers import UserSerializer
from django.contrib.auth.hashers import make_password
from django.http import JsonResponse
from .utilities import Utilities
from django.utils import timezone

from dotenv import load_dotenv

logger = logging.getLogger(__name__)

# Load the environment variables from .env file
load_dotenv()

from django.contrib.auth import update_session_auth_hash

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def update_password(request):
    new_password = request.data.get('new_password')
    request.user.set_password(new_password)
    request.user.save()

    request.user.profile.first_time_login = False
    request.user.profile.last_password_update = timezone.now()
    request.user.profile.save()
    
    update_session_auth_hash(request, request.user)  
    return Response({"message": "Password updated successfully"}, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated]) 
def get_user_details(request, user_id):
    user = get_object_or_404(User, id=user_id)
    serializer = UserSerializer(user)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated]) 
def list_users(_request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def register(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        #Create a default password and comunicate to client later
        password = Utilities.generate_random_password()
        print(password)
        serializer.validated_data['password'] = make_password(password)
        user = serializer.save()

        # Create a new user profile
        profile_data = request.data.get('profile')
        if profile_data:
          user.profile.phone_number = profile_data.get('phone_number')
          user.profile.address = profile_data.get('address')
          user.profile.first_time_login = True
          user.profile.save() 

        # Send the password to the user's email
        # email = user.email
        # subject = 'Welcome to Universe'
        # message = f'Hi {user.username},\n\nWelcome to Universe! Your account has been created successfully. Your password is: {password}\n\nPlease login to your account and change your password.\n\nThanks,\nUniverse Team'
        # Utilities.send_email(email, subject, message)
        # logger.info(f"Password sent to {email}")

        response_data = serializer.data
        response_data['password'] = password  # Add the random password to the response

        return Response(response_data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([AllowAny])
def signin(request):
    logger.debug(f"Headers: {request.headers}")
    logger.debug(f"Body: {request.data}")
    
    if request.content_type == 'application/json':
        try:
            data = json.dumps(request.data)
            data = json.loads(data)
            
            username = data.get('username')
            password = data.get('password')
            
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
     
    
        if not username or not password:
            return JsonResponse({'error': 'Username and password are required'}, status=400)

        base_url = os.getenv('UNIVERSE_USER_MANAGEMENT_BASE_URL')
        token_url = f"{base_url}/api/o/token/"

        data = {
            'grant_type': 'password',
            'username': username,
            'password': password,
            'client_id': os.getenv('OAUTH_CLIENT_ID'),
            'client_secret': os.getenv('OAUTH_CLIENT_SECRET')
        }

        # Send the request to the OAuth2 token endpoint
        response = requests.post(token_url, data=data)

        if response.status_code == 200:
            # Return the tokens to the frontend
            return JsonResponse(response.json(), status=200)
        else:
            # Return an error response if the token request fails
            return JsonResponse(response.json(), status=response.status_code)
    else:
        return JsonResponse({'error': 'Invalid content type'}, status=400)
    

@api_view(['POST'])
@permission_classes([AllowAny])
def refresh_token(request):
    if request.content_type == 'application/json':
        try:
            data = json.dumps(request.data)
            data = json.loads(data)

            refresh_token = data.get('refresh_token')
            
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
        
        if not refresh_token:
            return JsonResponse({'error': 'Refresh token is required'}, status=400)

        # OAuth2 server URL and data for refreshing the token
        base_url = os.getenv('UNIVERSE_USER_MANAGEMENT_BASE_URL')
        token_url = f"{base_url}/api/o/token/"
        
        data = {
            'grant_type': 'refresh_token',
            'refresh_token': refresh_token,
            'client_id': os.getenv('OAUTH_CLIENT_ID'),
            'client_secret': os.getenv('OAUTH_CLIENT_SECRET')
        }

        # Send request to OAuth2 server for a new token
        response = requests.post(token_url, data=data)

        if response.status_code == 200:
            # Return the new tokens to the frontend
            return JsonResponse(response.json(), status=200)
        else:
            # Return an error response if the token request fails
            return JsonResponse(response.json(), status=response.status_code)
    else:
        return JsonResponse({'error': 'Invalid content type'}, status=400)


