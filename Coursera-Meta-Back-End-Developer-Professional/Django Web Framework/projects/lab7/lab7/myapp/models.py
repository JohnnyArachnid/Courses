from django.db import models

# Create your models here.
class Booking(models.Model):
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    guest_count = models.IntegerField()
    resrvation_time = models.DateField(auto_now=True)
    comments = models.CharField(max_length=1000)
