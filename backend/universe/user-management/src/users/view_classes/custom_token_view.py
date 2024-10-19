import json
import requests
import os
import logging
from oauth2_provider.views import TokenView
from django.http import JsonResponse
from django.http import QueryDict

# Get an instance of a logger
logger = logging.getLogger(__name__)

class CustomTokenView(TokenView):
    def post(self, request, *args, **kwargs):
        # Log request headers and body
        logger.debug(f"Headers: {request.headers}")
        logger.debug(f"Body: {request.body.decode('utf-8')}")
        
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
                logger.error("Invalid JSON format.")
                return Response({"error": "Invalid JSON format."}, status=status.HTTP_400_BAD_REQUEST)

        # Now call the parent class's post method to handle the token request
        return super().post(request, *args, **kwargs)