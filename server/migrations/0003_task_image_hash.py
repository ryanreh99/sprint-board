# Generated by Django 3.1.1 on 2020-10-20 17:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('server', '0002_auto_20200929_1913'),
    ]

    operations = [
        migrations.AddField(
            model_name='task',
            name='image_hash',
            field=models.CharField(blank=True, max_length=256, null=True),
        ),
    ]
