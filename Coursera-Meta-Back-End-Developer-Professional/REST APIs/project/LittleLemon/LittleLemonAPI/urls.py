from django.urls import path, include
from . import views
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
    path('categories', views.CategoriesView.as_view()),
    path('menu-items', views.MenuItemsView.as_view()),
    path('menu-items/<int:pk>', views.MenuItemView.as_view()),
    path('cart', views.cart),
    path('cart/<int:pk>', views.CartItemView.as_view()),
    path('orders', views.OrderList.as_view()),
    path('orders/place', views.place_order),
    path('manager/order/<int:pk>', views.manager_order_assign_crew),
    path('crew/orders', views.CrewOrderList.as_view()),
    path('crew/orders/<int:pk>', views.crew_update_order),
    path('api-token-auth/', obtain_auth_token),
    path('groups/manager', views.ManagerList.as_view()),
    path('groups/manager/users', views.managers),
    path('groups/delivery', views.UserList.as_view()),
    path('groups/delivery/users', views.delivery_crew),
]
