from django.contrib import admin
from .models import Drinks, DrinksCategory

# Register your models here.
admin.site.register(DrinksCategory)
admin.site.register(Drinks)
