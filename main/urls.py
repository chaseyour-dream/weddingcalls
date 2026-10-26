from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register('services', views.ServiceViewSet)
router.register('team', views.TeamMemberViewSet)
router.register('gallery', views.GalleryViewSet)
router.register('social-media', views.SocialMediaViewSet)
router.register('about-us', views.AboutUsViewSet)
router.register('owner-message', views.OwnerMessageViewSet)
router.register('hero-sections', views.HeroSectionViewSet)
router.register('statistics', views.StatisticsViewSet)
router.register('contact-info', views.ContactInfoViewSet)
router.register('featured-photos', views.FeaturedPhotoViewSet)
router.register('accordion-gallery', views.AccordionGalleryItemViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('contact/', views.contact_create, name='contact-create'),
]
