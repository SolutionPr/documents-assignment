from  rest_framework.views import APIView
from  rest_framework import status
from rest_framework.response import Response
from .serializer import DocumentSerializer
from .models import Document
import logging


# logger setup
logger=logging.getLogger('document_listing_app')


# view  for  the  documents
class DocumentsListingView(APIView):
    # api to store the documents
    def post(self,request):
        try:
            file=request.FILES.get('file')

            if not file:
                logger.error('No  file  provided to  upload')
                return Response({"errors":"Please upload the File"},status=status.HTTP_400_BAD_REQUEST)
            
            # Check if the file is of the correct type
            if not file.name.endswith('.txt'):
                logger.error(f"invalid file type file_name:{file.name}. Fie type must be text ")
                return Response({"errors": "Invalid file type. Only .txt files are allowed."}, status=status.HTTP_400_BAD_REQUEST)
        
             
            document={
                'name':file.name,
                "content":file.read().decode('utf-8'),
                "size":file.size
            }
            # Log the file upload attempt
            logger.info(f'Attempting to upload file: {file.name}')
            
            # call teh  serailizer to  save the  file
            serializer = DocumentSerializer(data=document)
            if  serializer.is_valid():
                serializer.save()

                logger.info(f'{file.name} successfully upload')
                return Response({"messsage":serializer.data},status=status.HTTP_201_CREATED)
            
            logger.error('Unable to  store the data')
            return Response({"errors":"unable to  store the data"},status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            logger.error(f'file is not  uploaded due to : {e}')
            return Response({"errors": "An unexpected error occurred. Please try again later."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

    