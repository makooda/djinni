import json
import logging
import requests
import os

from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.http import QueryDict
from django.contrib.auth.models import User
from .serializers import UserSerializer
from django.contrib.auth.hashers import make_password
from django.http import JsonResponse

from dotenv import load_dotenv

logger = logging.getLogger(__name__)

# Load the environment variables from .env file
load_dotenv()

@api_view(['GET'])
@permission_classes([IsAuthenticated]) 
def list_users(_request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        # Hash the password before saving
        serializer.validated_data['password'] = make_password(serializer.validated_data['password'])
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
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


