from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from accounts.models import MyUser
from .serializers import UserGetSerializer

@api_view(['GET'])
@permission_classes([IsAuthenticated]) 
def get_user_list(request):
    try:
        users = MyUser.objects.exclude(id=request.user.id)
        serializer = UserGetSerializer(users, many=True)
        return Response(serializer.data, status=200)
    except Exception as e:
        print("Error in getting contact list", str(e))
        return Response({"error": "Error in getting contact list"}, status=400)
