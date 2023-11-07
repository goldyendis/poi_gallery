from django.db.models import Min, Max
from django.db.models import Q
from rest_framework import generics

from backend.throttle import AnonymousThrottle
from API.domain_const import POICAT, POITYPE
from .pagination import ItemPagination
from .models import POI
from .serializers import POIFilterValuesSerializer, POISerializer, POIListItemSerializer
from django_filters import rest_framework as filters
from rest_framework import filters as drf_filters

class POIList(generics.ListAPIView):
    serializer_class = POIListItemSerializer
    throttle_classes = [AnonymousThrottle]
    filter_backends = [filters.DjangoFilterBackend, drf_filters.SearchFilter]
    search_fields = ["poiname","notes"]
    pagination_class = ItemPagination
    queryset = POI.objects.all().order_by('objectid').exclude(img_url__isnull=True)

    def get_queryset(self):
        queryset = self.queryset
        poicat = self.request.query_params.getlist('poicat')
        poitypesstr  = self.request.query_params.getlist('poitype')
        if not poicat and not poitypesstr:
            return self.queryset

        if poicat and poitypesstr:
            test = poicat[0]
            t = test.split(",")
            poicats = [int(item) for item in t]
            test = poitypesstr[0]
            t = test.split(",")
            poitypes = [int(item) for item in t]
            queryset = queryset.filter(Q(poicat__in=poicats) | Q(poitype__in=poitypes))
            return queryset
        if poitypesstr:
            test = poitypesstr[0]
            t = test.split(",")
            poitypes = [int(item) for item in t]
            queryset = queryset.filter(poitype__in=poitypes )
            return queryset
        if poicat:
            test = poicat[0]
            t = test.split(",")
            poicats = [int(item) for item in t]
            queryset = queryset.filter(poicat__in=poicats)
            return queryset



class POIDetail(generics.RetrieveAPIView):
    queryset = POI.objects.all().exclude(img_url__isnull=True)
    serializer_class = POISerializer
    throttle_classes = [AnonymousThrottle]

    
 
    
class POIFilterValuesPOIType(generics.ListAPIView):
    serializer_class=POIFilterValuesSerializer
    def get_queryset(self):
        query = (
            POI.objects
            .exclude(poitype__isnull=True)
            .values('poicat', 'poitype')
            .distinct()
        )
        
        cat_list = set()
        type_list = set()
        
        for item in query:
            cat_list.add(item['poicat'])
            type_list.add(item['poitype'])
        
        result = [
            {
                "poicat": {
                    cat: POICAT[int(cat)] for cat in list(cat_list)
                },
                "poitype": {
                    ptype: POITYPE[int(ptype)] for ptype in list(type_list)
                }
                ,
                "min_surveydate": POI.objects.aggregate(min_surveydate=Min('surveydate'))['min_surveydate'],
                "max_surveydate": POI.objects.aggregate(max_surveydate=Max('surveydate'))['max_surveydate']
            }
        ]

        return result

