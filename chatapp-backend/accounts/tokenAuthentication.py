from channels.db import database_sync_to_async
import jwt
from jwt.exceptions import InvalidTokenError, ExpiredSignatureError
from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from django.conf import settings
from .models import MyUser
from datetime import datetime, timedelta

class JWTAuthentication(BaseAuthentication):

    def extract_token(self, request):
        auth_header = request.headers.get('Authorization')
        if auth_header and auth_header.startswith('Bearer '):
            return auth_header.split(" ")[1]
        return None

    def authenticate(self, request):
        token = self.extract_token(request)
        if token is None:
            return None
        try:
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
            self.verify_token(payload)
            user_id = payload["id"]
            user = MyUser.objects.get(id=user_id)
            return (user, token)
        except (InvalidTokenError, ExpiredSignatureError, MyUser.DoesNotExist):
            raise AuthenticationFailed("Invalid token")

    def verify_token(self, payload):
        if "exp" not in payload:
            raise InvalidTokenError("Token has no expiration")
        exp_timestamp = payload['exp']
        current_time = datetime.now().timestamp()
        if current_time > exp_timestamp:
            raise ExpiredSignatureError("The token has expired")
    
    @database_sync_to_async
    def authenticate_websocket(self, scope, token):
        try:
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
            self.verify_token(payload=payload)
            user_id = payload['id']
            user = MyUser.objects.get(id=user_id)
            return user 
        except InvalidTokenError as e:
            raise AuthenticationFailed("Invalid token")
        except ExpiredSignatureError as e:
            raise AuthenticationFailed("Invalid token")
        except MyUser.DoesNotExist as e:
            raise AuthenticationFailed("Invalid token")
        except Exception as e:
            raise AuthenticationFailed("Invalid token")

    @staticmethod
    def generate_token(payload):
        expiration = datetime.now() + timedelta(hours=24)
        payload['exp'] = expiration.timestamp()  # Ensure the timestamp is properly formatted
        token = jwt.encode(payload, key=settings.SECRET_KEY, algorithm="HS256")
        return token
