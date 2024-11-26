from rest_framework.serializers import ModelSerializer
from .models import Document
import time

# serailizer for the  documents
class DocumentSerializer(ModelSerializer):
    
    class Meta:
        model=Document
        fields=['id','name','content','created_at','size']

    def to_representation(self, instance):
        representation = super().to_representation(instance)

        size_in_bytes=instance.size

        if size_in_bytes < 1024 * 1024:  # Less than 1 MB
            representation['size'] = f"{round(size_in_bytes / 1024, 2)} KB"
        else:  # 1 MB or more
            representation['size'] = f"{round(size_in_bytes / (1024 * 1024), 2)} MB"
            
        # Convert created_at to a timestamp
        if instance.created_at:
            representation['created_at'] =instance.created_at.date()
        return representation