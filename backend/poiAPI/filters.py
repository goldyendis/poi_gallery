import django_filters
from .models import POI


# POI_CAT_CHOICES = (
#     (100, '')
# )

class POIFilter(django_filters.FilterSet):
    poiname = django_filters.CharFilter(field_name="poiname",lookup_expr='icontains')
    # poicat = django_filters.ChoiceFilter(lookup_expr='icontains')
    class Meta:
        model = POI
        fields = ['poicat', 'poitype', 'surveydate', 'img_flag', 'poiname']
