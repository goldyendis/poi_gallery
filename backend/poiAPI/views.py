from itertools import chain
from django.shortcuts import render
from django.db.models import QuerySet

# Create your views here.
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import APIView

from backend.throttle import AnonymousThrottle
from poiAPI.domain_const import POICAT
from .pagination import ItemPagination
from .filters import POIFilter
from .models import POI
from .serializers import POIFilterValuesSerializer, POISerializer, POIListItemSerializer
from django_filters import rest_framework as filters
from rest_framework import filters as drf_filters

class POIList(generics.ListAPIView):
    serializer_class = POIListItemSerializer
    throttle_classes = [AnonymousThrottle]
    filter_backends = [filters.DjangoFilterBackend, drf_filters.SearchFilter]
    filterset_class = POIFilter
    search_fields = ["poiname","notes"]
    pagination_class = ItemPagination
    queryset = POI.objects.all().order_by('objectid').exclude(img_url__isnull=True)



class POIDetail(generics.RetrieveAPIView):
    queryset = POI.objects.all().exclude(img_url__isnull=True)
    serializer_class = POISerializer
    throttle_classes = [AnonymousThrottle]

    
 
    
class POIFilterValuesPOIType(generics.ListAPIView):
    serializer_class=POIFilterValuesSerializer
    def get_queryset(self):
        query = POI.objects.all().exclude(poitype__isnull=True).distinct('poitype',"poicat")
        cat_list = set()
        type_list = set()
        for i in range(0,len(query)):
            cat_list.add(query[i].poicat)
            type_list.add(query[i].poitype)
        return [{"poicat":list(cat_list),"poitype":list(type_list)}]
        # return [{"poicat":[{(list(cat_list), POICAT[int(cat_list_item)]) for cat_list_item in list(cat_list)}],"poitype":list(type_list)}]
    