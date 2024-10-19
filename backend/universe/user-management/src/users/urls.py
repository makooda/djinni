from django.urls import path
from . import views
from .views import CustomTokenView

urlpatterns = [
    path('register/', views.register, name='register'),
    path('signin/', views.signin_view, name='signin'),
    path('o/token/', CustomTokenView.as_view(), name='token'),
]
