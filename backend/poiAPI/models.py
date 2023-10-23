from django.db import models


class POI(models.Model):
    objectid = models.IntegerField(unique=True, primary_key=True)
    surveyor = models.CharField(max_length=50, blank=True, null=True)
    surveydate = models.DateTimeField(blank=True, null=True)
    poicat = models.SmallIntegerField(blank=True, null=True)
    poitype = models.SmallIntegerField(blank=True, null=True)
    signupdate = models.SmallIntegerField(blank=True, null=True)
    notes = models.CharField(max_length=255, blank=True, null=True)
    poiname = models.CharField(max_length=255, blank=True, null=True)
    # uploader = models.CharField(max_length=50, blank=True, null=True)
    # uploaddate = models.DateTimeField(blank=True, null=True)
    # editor = models.CharField(max_length=50, blank=True, null=True)
    # editiondate = models.DateTimeField(blank=True, null=True)
    poi_id = models.CharField(max_length=50, blank=True, null=True)
    # img_url = models.CharField(max_length=100, blank=True, null=True)
    img_flag = models.SmallIntegerField(blank=True, null=True)
    # verzio = models.SmallIntegerField(blank=True, null=True)
    existing = models.SmallIntegerField(blank=True, null=True)
    # surveyor_checked = models.SmallIntegerField(blank=True, null=True)
    # valid_status = models.SmallIntegerField(blank=True, null=True)
    # bc_link = models.CharField(max_length=500, blank=True, null=True)
    egyeb_szuro = models.SmallIntegerField(blank=True, null=True)
    # qa_date = models.DateTimeField(blank=True, null=True)
    # fieldcheck_date = models.DateTimeField(blank=True, null=True)
    # piheno_id = models.CharField(max_length=50, blank=True, null=True)
    shape = models.TextField(blank=True, null=True) 
    class Meta:
        managed = False
        db_table = 'keszpoi_teszt_bagger'
