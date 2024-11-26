from django.db import models

# Create your models here.


class Document(models.Model):
    name = models.CharField(max_length=255) 
    content = models.TextField() 
    created_at = models.DateTimeField(auto_now_add=True) 
    size = models.FloatField()
    def __str__(self):
        return self.name
