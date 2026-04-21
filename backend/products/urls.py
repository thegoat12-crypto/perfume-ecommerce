from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProductViewSet, BrandViewSet, CategoryViewSet

router = DefaultRouter()
router.register(r'items', ProductViewSet) # L'URL sera /api/products/items/
router.register(r'brands', BrandViewSet)
router.register(r'categories', CategoryViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
