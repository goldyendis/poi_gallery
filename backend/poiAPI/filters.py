# from django_filters import rest_framework as filters
# from .models import POI
# from .domain_const import POICAT, POITYPE

# POICAT_TUPLE = [(str(key),value) for key,value in POICAT.items()]
# POITYPE_TUPLE =[(str(key),value) for key,value in POITYPE.items()]


BOOL_CHOICES = (
    (0, "Nem"),
    (1, "Igen"),
)

# class POIFilter(filters.FilterSet):
#     poicat = filters.BaseInFilter(field_name='poicat', lookup_expr='in')
#     poitype = filters.BaseInFilter(field_name='poitype', lookup_expr='in')
#     existing = filters.ChoiceFilter(choices=BOOL_CHOICES)
#     img_flag = filters.ChoiceFilter(choices=BOOL_CHOICES)
#     class Meta:
#         model = POI
#         fields =  ["existing"]
        
        
