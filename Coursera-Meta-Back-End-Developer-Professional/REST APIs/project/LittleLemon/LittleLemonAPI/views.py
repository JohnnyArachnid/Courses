from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User, Group
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework import status
from .models import MenuItem, Category, Order, Cart, OrderItem
from .serializers import MenuItemSerializer, CategorySerializer, UserSerializer, CartSerializer, OrderSerializer
from .permissions import IsManagerUser, IsDeliveryCrewUser


class CategoriesView(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

    def get_permissions(self):
        if self.request.method == "GET":
            return []
        elif self.request.method == "POST":
            return [IsAdminUser()]
        return [permission() for permission in self.permission_classes]


class MenuItemsView(generics.ListCreateAPIView):
    queryset = MenuItem.objects.all()
    serializer_class = MenuItemSerializer
    ordering_fields = ['price', 'inventory']
    filterset_fields = ['price', 'inventory', 'category']
    search_fields = ['title', ]

    def get_permissions(self):
        if self.request.method == "GET":
            return []
        elif self.request.method == "POST":
            return [IsAdminUser()]
        return [permission() for permission in self.permission_classes]


class MenuItemView(generics.RetrieveUpdateAPIView):
    queryset = MenuItem.objects.all()
    serializer_class = MenuItemSerializer

    def get_permissions(self):
        if self.request.method == "GET":
            return []
        elif self.request.method == "PUT" or self.request.method == "PATCH":
            return [(IsManagerUser() or IsAdminUser())]
        return [permission() for permission in self.permission_classes]


@api_view(['POST', 'DELETE'])
@permission_classes([IsAdminUser])
def managers(request):
    username = request.data['username']
    if username:
        user = get_object_or_404(User, username=username)
        managers = Group.objects.get(name='Manager')
        if request.method == "POST":
            managers.user_set.add(user)
        if request.method == "DELETE":
            managers.user_set.remove(user)
        return Response({'messages': 'ok'})

    return Response({"messages": 'error'}, status.HTTP_400_BAD_REQUEST)


@api_view(['POST', 'DELETE'])
@permission_classes([IsAdminUser | IsManagerUser])
def delivery_crew(request):
    username = request.data['username']
    if username:
        user = get_object_or_404(User, username=username)
        managers = Group.objects.get(name='Delivery crew')
        if request.method == "POST":
            managers.user_set.add(user)
        if request.method == "DELETE":
            managers.user_set.remove(user)
        return Response({'messages': 'ok'})

    return Response({"messages": 'error'}, status.HTTP_400_BAD_REQUEST)


class ManagerList(generics.ListAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    permission_classes = [IsAdminUser]

    def get_queryset(self):
        users = User.objects.filter(groups__name='Manager')
        return users


class UserList(generics.ListAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    permission_classes = [IsAdminUser | IsManagerUser]

    def get_queryset(self):
        users = User.objects.filter(groups__name='Delivery crew')
        return users


@api_view(['PATCH', 'DELETE'])
@permission_classes([IsAdminUser | IsManagerUser])
def manager_order_assign_crew(request, pk):
    order = get_object_or_404(Order, pk=pk)
    username = request.data['username']
    if username:
        user = get_object_or_404(User, username=username)
        if user.groups.filter(name='Delivery crew').exists():
            if request.method == "PATCH":
                order.delivery_crew = user
            if request.method == "DELETE":
                order.deliverycrew = None
            order.save()
            return Response({'messages': 'ok'})

    return Response({"messages": 'error'}, status.HTTP_400_BAD_REQUEST)


class CrewOrderList(generics.ListAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    permission_classes = [IsDeliveryCrewUser]

    def get_queryset(self):
        orders = Order.objects.filter(delivery_crew=self.request.user)
        return orders


@api_view(['PATCH'])
@permission_classes([IsDeliveryCrewUser])
def crew_update_order(request, pk):
    order = get_object_or_404(Order, pk=pk)
    status = request.data['status']
    if status:
        order.status = status
        order.save()
        return Response({'messages': 'ok'})

    return Response({"messages": 'error'}, status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def cart(request):
    if request.method == 'GET':
        carts = Cart.objects.all()
        serializer = CartSerializer(carts, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':

        #  Have to make the request data mutable and add the request user..
        #  couldnt find a reasonable way to get user into the serializer otherwise
        request.data._mutable = True
        request.data['user'] = request.user.pk

        serializer = CartSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CartItemView(generics.RetrieveUpdateAPIView):
    serializer_class = CartSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Cart.objects.filter(user=self.request.user)


class OrderList(generics.ListAPIView):
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def place_order(request):
    cart = Cart.objects.filter(user=request.user)
    if cart:
        order = Order(
            user=request.user,
        )
        order.save()
        for c in cart:
            order_item = OrderItem(
                order=order,
                menuitem=c.menuitem,
                quantity=c.quantity,
                unit_price=c.unit_price,
                price=c.price
            )
            order_item.save()
            order.total += order_item.price
            order.save()
        cart.delete()
        serializer = OrderSerializer(data=order)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    return Response({'error': 'Bad Request'}, status=status.HTTP_400_BAD_REQUEST)
