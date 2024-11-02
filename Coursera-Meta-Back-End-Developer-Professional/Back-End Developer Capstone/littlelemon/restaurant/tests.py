from django.test import TestCase
from restaurant.models import Menu

class MenuTest(TestCase):
    def test_get_item(self):
        item = Menu.objects.create(title="IceCream", price=80, inventory=100)
        self.assertEqual(str(item), "IceCream : 80")

class MenuViewTest(TestCase):
    def setUp(self):
        self.menu1 = Menu.objects.create(title="Cheese Pizza", price=8.99, inventory=50)
        self.menu2 = Menu.objects.create(title="Ice Cream", price=3.50, inventory=100)
        self.menu3 = Menu.objects.create(title="Pasta", price=7.25, inventory=30)

    def test_get_all(self):
        self.setUp()
        self.assertEqual([str(self.menu1), str(self.menu2), str(self.menu3)], ["Cheese Pizza : 8.99", "Ice Cream : 3.5", "Pasta : 7.25"])

