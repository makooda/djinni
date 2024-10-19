import json
import requests
import os

from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from oauth2_provider.views import TokenView
from django.http import QueryDict
from django.contrib.auth.models import User
from .serializers import UserSerializer
from django.contrib.auth.hashers import make_password
from django.http import JsonResponse

from dotenv import load_dotenv

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
    username = request.POST.get('username')
    password = request.POST.get('password')
    
    if not username or not password:
        return JsonResponse({'error': 'Username and password are required'}, status=400)
    
    # Prepare the data to request tokens from OAuth2 endpoint
    token_url = 'http://localhost:8000/o/token/'  # Your token endpoint
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
    

class CustomTokenView(TokenView):
    def post(self, request, *args, **kwargs):
        if request.content_type == 'application/json':
            try:
                # Load JSON data
                data = json.loads(request.body.decode('utf-8'))

                # Convert the JSON data to a form-encoded QueryDict
                form_data = QueryDict('', mutable=True)
                form_data.update(data)

                # Replace request.POST with the form-encoded data
                request._post = form_data

            except json.JSONDecodeError:
                return Response({"error": "Invalid JSON format."}, status=status.HTTP_400_BAD_REQUEST)

        # Now call the parent class's post method to handle the token request
        return super().post(request, *args, **kwargs)
