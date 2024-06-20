from django.db import models
from django.contrib.auth.models import AbstractUser, PermissionsMixin, Group, Permission
from django.utils.translation import gettext_lazy as _
from .managers import CustomUserManager


class MyUser(AbstractUser, PermissionsMixin):
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.EmailField(max_length=255, unique=True)
    groups = models.ManyToManyField(
        Group,
        related_name='custom_user_set', 
        blank=True,
        help_text=('The groups this user belongs to. A user will get all permissions '
                   'granted to each of their groups.'),
        related_query_name='user',
    )
    user_permissions = models.ManyToManyField(
        Permission,
        related_name='custom_user_permissions',
        blank=True,
        help_text='Specific permissions for this user.',
        related_query_name='user',
    )
    username = None

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self):
        return self.email

