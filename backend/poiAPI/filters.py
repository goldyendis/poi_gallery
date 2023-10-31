from django_filters import rest_framework as filters
from .models import POI
from .domain_const import POICAT, POITYPE

POICAT_TUPLE = [(str(key),value) for key,value in POICAT.items()]
POITYPE_TUPLE =[(str(key),value) for key,value in POITYPE.items()]


BOOL_CHOICES = (
    (0, "Nem"),
    (1, "Igen"),
)

class POIFilter(filters.FilterSet):
    poicat = filters.MultipleChoiceFilter(choices=POICAT_TUPLE)
    poitype = filters.MultipleChoiceFilter(choices=POITYPE_TUPLE)
    existing = filters.ChoiceFilter(choices=BOOL_CHOICES)
    img_flag = filters.ChoiceFilter(choices=BOOL_CHOICES)
    class Meta:
        model = POI
        fields =  ["poicat", "poitype","existing"]
        
        
