from datetime import timezone
import datetime
import json
import os
from rest_framework import serializers
from . domain_const import POICAT,POITYPE
from .models import POI
from django.db import connection



class POISerializer(serializers.ModelSerializer):
    class Meta:
        model = POI
        fields = ["objectid","poicat","poicat_alias","poitype","poitype_alias","poiname","coordinates","surveydate", "images_list","notes","img_flag","existing"]
    images_list = serializers.SerializerMethodField()
    poicat_alias = serializers.SerializerMethodField()
    poitype_alias = serializers.SerializerMethodField()
    coordinates = serializers.SerializerMethodField()
    def get_poitype_alias(self, obj:POI):
        return POITYPE[(obj.poitype)]
    def get_poicat_alias(self, obj:POI):
        return POICAT[(obj.poicat)]
    
    def get_coordinates(self,obj:POI):
        sql_query = f"SELECT st_astext(shape) FROM sde.keszpoi_teszt_bagger where objectid={obj.objectid}"
        with connection.cursor() as cursor:
            cursor.execute(sql_query)
            results = cursor.fetchone()
            if results:
                wkt_point = results[0]
                if wkt_point.startswith("POINT ("):
                    wkt_point = results[0][8:-1]
                    x_str, y_str = wkt_point.split(" ")
                    x = float(x_str)
                    y = float(y_str)
                    return {"x": x, "y": y}

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
    
    
    
class POIListItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = POI
        fields = ["objectid","poicat","poitype","poicat_alias","poitype_alias","poiname","thumbnail","surveydate"]
    
    poicat_alias = serializers.SerializerMethodField()
    poitype_alias = serializers.SerializerMethodField()
    thumbnail = serializers.SerializerMethodField()
    
    def get_poitype_alias(self, obj:POI):
        return POITYPE[obj.poitype]
    def get_poicat_alias(self, obj:POI):
        return POICAT[obj.poicat]
    
    def get_thumbnail(self, obj:POI):
        '''Always get back the newest image as a thumbnail image'''
        image_folder = r'\\192.168.121.2\images'
        folder_path = os.path.join(image_folder,obj.poi_id)
        newest_image_full_path = ""
        if os.path.exists(folder_path) and os.path.isdir(folder_path):
            image_names = os.listdir(folder_path)
            newest_image_full_path = os.path.join("https://turistaterkepek.hu/poiimages/",obj.poi_id,image_names[0])
        return newest_image_full_path
    
class POIFilterValuesSerializer(serializers.Serializer):
    poicat = serializers.ListField()
    poitype = serializers.ListField()
        