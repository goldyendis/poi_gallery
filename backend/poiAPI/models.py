from django.db import models


class POI(models.Model):
    objectid = models.IntegerField(unique=True, primary_key=True)
    surveyor = models.CharField(max_length=50, blank=True, null=True)
    surveydate = models.DateTimeField(blank=True, null=True)
    poicat = models.IntegerField(blank=True, null=True,)
    poitype = models.IntegerField(blank=True, null=True,)
    signupdate = models.SmallIntegerField(blank=True, null=True)
    notes = models.CharField(max_length=255, blank=True, null=True)
    poiname = models.CharField(max_length=255, blank=True, null=True)
    poi_id = models.CharField(max_length=50, blank=True, null=True)
    img_url = models.CharField(max_length=100, blank=True, null=True)
    img_flag = models.SmallIntegerField()
    existing = models.SmallIntegerField()
    egyeb_szuro = models.SmallIntegerField(blank=True, null=True)
    class Meta:
        managed = False
        db_table = 'keszpoi_teszt_bagger'

    @property
    def img_flag_display(self):
        if self.img_flag:
            return "Igen"
        else:
            return "Nem"
        
    @property
    def existing_display(self):
        if self.existing:
            return "Igen"
        else:
            return "Nem"
        
        
        