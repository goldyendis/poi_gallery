from django.urls import path
from . import views
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('poi/', views.POIList.as_view(), name='poi-list'),
    path('poi/<int:pk>/', views.POIDetail.as_view(), name='poi-detail'),
    path('poi/categories/',views.POICategoryList.as_view(), name='poi-categories')
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)