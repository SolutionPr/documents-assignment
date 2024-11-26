from  rest_framework.views import APIView
from  rest_framework import status
from rest_framework.response import Response
from .serializer import DocumentSerializer
from .models import Document
from rest_framework.pagination import PageNumberPagination
import logging


# logger setup
logger=logging.getLogger('document_listing_app')


class DocumentListPagination(PageNumberPagination):
    page_size = 10   #Number of items per page
    page_size_query_param = 'page_size'  
    max_page_size = 15  # Maximum items per page

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
                return Response({"data":serializer.data},status=status.HTTP_201_CREATED)
            
            logger.error('Unable to  store the data')
            return Response({"errors":"unable to  store the data"},status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            logger.error(f'file is not  uploaded due to : {e}')
            return Response({"errors": "An unexpected error occurred. Please try again later."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


    # to  retrieve documents
    def get(self,request,id=None):
        try:
            search_query = request.query_params.get('search', None)
            
            if search_query:
                # Search documents based on the name
                document_obj = Document.objects.filter(name__icontains=search_query)
            elif id:
                document_obj=Document.objects.filter(id=id)
            else:
                # fetch data in the  sorted form on the  basis of name and date
                document_obj=Document.objects.all().order_by('-created_at', 'name')

            # apply pagination
            paginator=DocumentListPagination()
            pginated_doc=paginator.paginate_queryset(document_obj,request)

            # serilize the  data
            serializer=DocumentSerializer(pginated_doc,many=True)
            # return Response({'data':serializer.data},status=status.HTTP_200_OK)
            return paginator.get_paginated_response(serializer.data)
        
        except Exception as e:
            logger.error(f'unable to  fetch the  file due to : {e}')
            return Response({"errors": "An unexpected error occurred. Please try again later."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    # for  delete the  file in  model
    def delete(self,request,id):
        try:
            if id:
                document_obj=Document.objects.get(id=id)
                document_obj.delete()
                return Response({"message":"Data deleted successfully"},status=status.HTTP_200_OK)
            return Response({"message":"Please chose the  file  to  delete"},status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            logger.error(f'unable to  delete the  file due to : {e}')
            return Response({"errors": "An unexpected error occurred. Please try again later."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        






    