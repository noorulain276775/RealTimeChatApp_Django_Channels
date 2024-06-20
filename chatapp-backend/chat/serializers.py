from rest_framework import serializers
from accounts.models import MyUser


class UserGetSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyUser
        fields = ['email', 'first_name', 'last_name', 'id']
        extra_kwargs = {'id': {'read_only': True}}