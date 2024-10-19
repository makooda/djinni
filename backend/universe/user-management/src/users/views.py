import json
import logging
import requests
import os

from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from django.http import QueryDict
from django.contrib.auth.models import User
from .serializers import UserSerializer
from django.contrib.auth.hashers import make_password
from django.http import JsonResponse

from dotenv import load_dotenv

logger = logging.getLogger(__name__)

# Load the environment variables from .env file
load_dotenv()

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
def signin_view(request):
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

        # Prepare the data to request tokens from OAuth2 endpoint
        token_url = 'http://localhost:8000/api/o/token/'  # Your token endpoint
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

