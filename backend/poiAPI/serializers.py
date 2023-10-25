import os
from rest_framework import serializers

from .image_editing import ImageEdit
from .models import POI

class POISerializer(serializers.ModelSerializer):
    class Meta:
        model = POI
        fields = '__all__'
    images_list = serializers.SerializerMethodField()
    
    def get_images_list(self, obj:POI):
        image_folder = r'\\192.168.121.2\images'
        folder_path = os.path.join(image_folder,obj.poi_id)
        full_image_names = []
        if os.path.exists(folder_path) and os.path.isdir(folder_path):
            image_names = []
            image_names = os.listdir(folder_path)
            full_image_names = [os.path.join("https://turistaterkepek.hu/poiimages/",obj.poi_id,image_name) for image_name in image_names]
        return full_image_names


class POICategorySerializer(serializers.Serializer):
    poicat = serializers.IntegerField()
    
class POIListItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = POI
        fields = ["objectid", "surveydate","poicat","poitype","notes","poiname","poi_id","img_flag","existing","shape","thumbnail"]
    
    thumbnail = serializers.SerializerMethodField()
    
    def get_thumbnail(self, obj:POI):
        '''Always get back the newest image as a thumbnail image'''
        image_folder = r'\\192.168.121.2\images'
        folder_path = os.path.join(image_folder,obj.poi_id)
        newest_image_full_path = ""
        if os.path.exists(folder_path) and os.path.isdir(folder_path):
            image_names = os.listdir(folder_path)
            newest_image_full_path = os.path.join("https://turistaterkepek.hu/poiimages/",obj.poi_id,image_names[0])
        return newest_image_full_path