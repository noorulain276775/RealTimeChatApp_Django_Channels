from rest_framework import serializers
from .models import MyUser

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    
    def create(self, validated_data):
        user = MyUser.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data.get('first_name', ""),
            last_name=validated_data.get('last_name', "")
        )
        return user
    
    class Meta:
        model = MyUser
        fields = ["email", 'password', 'first_name', 'last_name']
        extra_kwargs = {'email': {'required': True}}
