import jwt
from jwt.exceptions import InvalidTokenError, ExpiredSignatureError
from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from django.conf import settings
from .models import MyUser
from datetime import datetime, timedelta



class JWTAuthentication(BaseAuthentication):

    # When the user makes a request to a protected resource, they include token
    # in the Authorization header. The server need to extract this token and 
    # verify it to ensure the user is authenticated.

    def extract_token(self, request):
        auth_header = request.headers.get('Authorization')
        if auth_header and auth_header.startswith('Bearer '):
            return auth_header.split(" ")[1]
        return None
    

    # If token expiration time is valid we will authenticate the user
    def authenticate(self, request):
        token = self.extract_token(request)
        if token is None:
            return None
        try:
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
            self.verify_token(payload)
            user_id = payload["id"]
            user = MyUser.objects.get(id=user_id)
            return user
        except (InvalidTokenError, ExpiredSignatureError, MyUser.DoesNotExist):
            raise AuthenticationFailed("Invalid token")
            

    # he server needs to extract this token and verify it 
    # to ensure the user is authenticated

    def verify_token(self, payload):
        if "exp" not in payload:
            raise InvalidTokenError("Token has no Expiration")
        exp_timestamp = payload['exp']
        current_time = datetime.now().timestamp()
        if current_time > exp_timestamp:
            raise ExpiredSignatureError("The token has been expire")
        



    # When a user logs in successfully, the server generates a token with information 
    # about the user (called the payload) and sends this token to the user. This is 
    # done using the generate_token method:

    @staticmethod
    def generate_token(payload):
        expirtaion = datetime.now() + timedelta(hours=24)
        payload['exp'] = expirtaion
        token = jwt.encode(payload=payload, key=settings.SECRET_KEY, algorithm="HS256")
        return token



