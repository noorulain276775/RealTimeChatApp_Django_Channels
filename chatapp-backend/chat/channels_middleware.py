from channels.middleware import BaseMiddleware
from rest_framework.exceptions import AuthenticationFailed
from django.db import close_old_connections
from accounts.tokenAuthentication import JWTAuthentication
import urllib.parse

class JWTwebsocketMiddleware(BaseMiddleware):
    async def __call__(self, scope, receive, send):
        close_old_connections()
        query_string = scope.get("query_string", b"").decode("utf-8")
        query_parameters = dict(qp.split("=") for qp in query_string.split("&"))
        token = query_parameters.get("token", None)

        if token is None:
            await send({
                "type": "websocket.close",
                "code": 4000 
            })
            return

        authentication = JWTAuthentication()
        try: 
            user = await authentication.authenticate_websocket(scope, token)
            if user is not None:
                scope['user'] = user
                print("User authenticated successfully:", user)
            else:
                print("User authentication failed: User is None")
                await send({
                    "type": "websocket.close",
                    "code": 4000 
                })
                return

            return await super().__call__(scope, receive, send)
        except AuthenticationFailed as e:
            print(f"Authentication failed: {str(e)}")
            await send({
                "type": "websocket.close",
                "code": 4002 
            })  
            return
        except Exception as e:
            print(f"Unexpected error: {str(e)}")
            await send({
                "type": "websocket.close",
                "code": 4003
            })
            return