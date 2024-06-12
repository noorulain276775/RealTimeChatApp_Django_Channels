from django.urls import path
from .views import UserRegistration, UserLogin
urlpatterns = [
    path('register/', UserRegistration.as_view(),name="register"),
    path('login/', UserLogin.as_view(), name="login" )

]
