from django.shortcuts import render

# Create your views here.
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import APIView

from django.http import Http404
from backend.throttle import AnonymousThrottle
from .pagination import ItemPagination
from .filters import POIFilter
from .models import POI
from .serializers import POICategorySerializer, POISerializer, POIListItemSerializer
from rest_framework.filters import SearchFilter

class POIList(generics.ListAPIView):
    serializer_class = POIListItemSerializer
    throttle_classes = [AnonymousThrottle]
    filter_backends = [SearchFilter]
    filter_class = POIFilter
    search_fields = ["poiname"]
    pagination_class = ItemPagination

    def get_queryset(self):
        
        filter_value = self.request.query_params.get('category')

       
        queryset = POI.objects.all().order_by('objectid')

        
        if filter_value:
            queryset = queryset.filter(poicat=filter_value)

        return queryset


class POIDetail(generics.RetrieveAPIView):
    queryset = POI.objects.all()
    serializer_class = POISerializer
    throttle_classes = [AnonymousThrottle]

    
 
class POICategoryList(generics.ListAPIView):
    serializer_class=POICategorySerializer
    queryset = POI.objects.values('poicat').distinct()
    pagination_class=None