from rest_framework.serializers import ModelSerializer
from .models import Document

# serailizer for the  documents
class DocumentSerializer(ModelSerializer):
    class Meta:
        model=Document
        fields=['id','name','content','created_at','size']