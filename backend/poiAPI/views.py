from django.shortcuts import render

# Create your views here.
from rest_framework import generics
from django.http import Http404
from backend.throttle import AnonymousThrottle
from .filters import POIFilter
from .models import POI
from .serializers import POISerializer
from rest_framework.filters import SearchFilter

class POIList(generics.ListAPIView):
    serializer_class = POISerializer
    throttle_classes = [AnonymousThrottle]
    filter_backends = [SearchFilter]
    filter_class = POIFilter
    search_fields = ["poiname"]

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
    
    