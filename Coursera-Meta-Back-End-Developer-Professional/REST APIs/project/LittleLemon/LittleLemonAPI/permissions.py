from rest_framework.permissions import BasePermission

class IsManagerUser(BasePermission):
    def has_permission(self, request, view):
        return request.user.groups.filter(name="Manager").exists()

class IsDeliveryCrewUser(BasePermission):
    def has_permission(self, request, view):
        return request.user.groups.filter(name="Delivery Crew").exists()
