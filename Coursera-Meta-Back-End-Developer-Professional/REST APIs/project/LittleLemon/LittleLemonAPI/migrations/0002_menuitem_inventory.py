# Generated by Django 3.2.16 on 2022-12-06 19:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('LittleLemonAPI', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='menuitem',
            name='inventory',
            field=models.SmallIntegerField(default=1),
        ),
    ]
