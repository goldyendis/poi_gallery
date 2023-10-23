from django.urls import path
from . import views

urlpatterns = [
    path('poi/', views.POIList.as_view(), name='poi-list'),
    path('poi/<int:pk>/', views.POIDetail.as_view(), name='poi-detail'),
]
