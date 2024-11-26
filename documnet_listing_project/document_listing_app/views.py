from  rest_framework.views import APIView
from  rest_framework import status
from rest_framework.response import Response


# view  for  the  documents
class DocumentsListingView(APIView):
    def get(self,request):
        return  Response({"message":"success"},status=status.HTTP_200_OK)