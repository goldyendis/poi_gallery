# Generated by Django 4.1 on 2023-10-24 19:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('poiAPI', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='MyImageModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to='thumbnails/')),
            ],
        ),
    ]