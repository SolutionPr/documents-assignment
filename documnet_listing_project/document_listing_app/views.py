from  rest_framework.views import APIView
from  rest_framework import status
from rest_framework.response import Response
from .serializer import DocumentSerializer
from .models import Document


# view  for  the  documents
class DocumentsListingView(APIView):
    # api to store the documents
    def post(self,request):
        try:
            file=request.FILES.get('file')

            if not file:
                return Response({"errors":"Please upload the File"},status=status.HTTP_400_BAD_REQUEST)
            
            # Check if the file is of the correct type
            if not file.name.endswith('.txt'):
                return Response({"errors": "Invalid file type. Only .txt files are allowed."}, status=status.HTTP_400_BAD_REQUEST)
        
             
            document={
                'name':file.name,
                "content":file.read().decode('utf-8'),
                "size":file.size
            }
            
            # call teh  serailizer to  save the  file
            serializer = DocumentSerializer(data=document)
            if  serializer.is_valid():
                serializer.save()
            
                return Response({"messsage":serializer.data},status=status.HTTP_201_CREATED)
            return Response({"messsage":"unable to  store the data"},status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"errors": "An unexpected error occurred. Please try again later."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

    