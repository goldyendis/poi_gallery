import os
from rest_framework import serializers
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
            full_image_names = [os.path.join(folder_path,image_name) for image_name in image_names]
        return full_image_names
