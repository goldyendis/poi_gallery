from io import BytesIO
from PIL import Image
from django.core.files import File
import os

class ImageEdit:

    def thumbnail(image_path, size=(100, 100)):
        thumbnail_filename = f"{os.path.basename(os.path.dirname(image_path))}.jpg"
        try:
            model_instance = MyImageModel.objects.get(image=thumbnail_filename)
            return model_instance
        except MyImageModel.DoesNotExist:
            pass
        image = Image.open(image_path)
        image.thumbnail(size)
        
        image_io = BytesIO()
        image.save(image_io, format='JPEG')  
        model_instance = MyImageModel()
        model_instance.image.save(thumbnail_filename, File(image_io), save=False)
        model_instance.save()
            
        return model_instance
