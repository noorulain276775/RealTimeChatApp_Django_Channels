from django.urls import path
from .views import get_user_list
urlpatterns = [
    path('contact/', get_user_list,name="contact"),
]
