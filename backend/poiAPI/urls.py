from django.urls import path
from . import views
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('poi/', views.POIList.as_view(), name='poi-list'),
    path('poi/<int:pk>/', views.POIDetail.as_view(), name='poi-detail'),
    path('poi/filter/',views.POIFilterValuesPOIType.as_view(), name='poi-filter')
]
