
from django.contrib import admin
from django.urls import path
from .views import *

urlpatterns = [
    path('document/',DocumentsListingView.as_view(),name='document'),
    path('document/<int:id>',DocumentsListingView.as_view(),name='specefic_document'),
]
