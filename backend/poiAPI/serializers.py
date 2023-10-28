import os
from rest_framework import serializers
from . domain_const import POICAT,POITYPE
from .models import POI



class POISerializer(serializers.ModelSerializer):
    class Meta:
        model = POI
        fields = "__all__"
    images_list = serializers.SerializerMethodField()
    poicat_alias = serializers.SerializerMethodField()
    poitype_alias = serializers.SerializerMethodField()
    def get_poitype_alias(self, obj:POI):
        return POITYPE[str(obj.poitype)]
    def get_poicat_alias(self, obj:POI):
        return POICAT[str(obj.poicat)]


    #TODO ONLY IMAGE FILE FORMAT
    def get_images_list(self, obj:POI):
        image_folder = r'\\192.168.121.2\images'
        folder_path = os.path.join(image_folder,obj.poi_id)
        full_image_names = []
        if os.path.exists(folder_path) and os.path.isdir(folder_path):
            image_names = []
            image_names = os.listdir(folder_path)
            full_image_names = (os.path.join("https://turistaterkepek.hu/poiimages/",obj.poi_id,image_name) for image_name in image_names)
        return full_image_names
    
    
class POICategorySerializer(serializers.Serializer):
    poicat = serializers.IntegerField()
    
class POIListItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = POI
        fields = ["objectid","poicat","poicat_alias","poitype","poitype_alias","poiname","shape","thumbnail","surveydate"]
    
    poicat_alias = serializers.SerializerMethodField()
    poitype_alias = serializers.SerializerMethodField()
    thumbnail = serializers.SerializerMethodField()
    def get_poitype_alias(self, obj:POI):
        return POITYPE[str(obj.poitype)]
    def get_poicat_alias(self, obj:POI):
        return POICAT[str(obj.poicat)]
    
    def get_thumbnail(self, obj:POI):
        '''Always get back the newest image as a thumbnail image'''
        image_folder = r'\\192.168.121.2\images'
        folder_path = os.path.join(image_folder,obj.poi_id)
        newest_image_full_path = ""
        if os.path.exists(folder_path) and os.path.isdir(folder_path):
            image_names = os.listdir(folder_path)
            newest_image_full_path = os.path.join("https://turistaterkepek.hu/poiimages/",obj.poi_id,image_names[0])
        return newest_image_full_path
    