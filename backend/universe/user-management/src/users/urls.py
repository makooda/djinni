from django.urls import path
from . import views
from .view_classes.custom_token_view import CustomTokenView

urlpatterns = [
    path('updatepassword/', views.update_password, name='update_password'),
    path('register/', views.register, name='register'),
    path('signin/', views.signin, name='signin'),
    path('refreshtoken/', views.refresh_token, name='refresh_token'),
    path('o/token/', CustomTokenView.as_view(), name='token'),
    path('users/', views.list_users, name='list_users'),
]
