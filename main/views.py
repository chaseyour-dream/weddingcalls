from rest_framework import viewsets, status
from rest_framework.decorators import api_view, action
from rest_framework.response import Response
from .models import Service, TeamMember, Gallery, Contact, SocialMedia, AboutUs, OwnerMessage, HeroSection, Statistics, ContactInfo, FeaturedPhoto, AccordionGalleryItem
from .serializers import ServiceSerializer, TeamMemberSerializer, GallerySerializer, GalleryDetailSerializer, ContactSerializer, SocialMediaSerializer, AboutUsSerializer, OwnerMessageSerializer, HeroSectionSerializer, StatisticsSerializer, ContactInfoSerializer, FeaturedPhotoSerializer, AccordionGalleryItemSerializer

class ServiceViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer

class TeamMemberViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = TeamMember.objects.all()
    serializer_class = TeamMemberSerializer

class GalleryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Gallery.objects.all()
    
    def get_serializer_class(self):
        if self.action == 'retrieve':
            return GalleryDetailSerializer
        return GallerySerializer
    
    def get_queryset(self):
        queryset = Gallery.objects.all()
        category = self.request.query_params.get('category', None)
        if category and category != 'all':
            queryset = queryset.filter(category=category)
        return queryset

class SocialMediaViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = SocialMedia.objects.filter(is_active=True)
    serializer_class = SocialMediaSerializer

class AboutUsViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = AboutUs.objects.filter(is_active=True)
    serializer_class = AboutUsSerializer

class OwnerMessageViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = OwnerMessage.objects.filter(is_active=True)
    serializer_class = OwnerMessageSerializer

class HeroSectionViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = HeroSection.objects.filter(is_active=True).prefetch_related('images')
    serializer_class = HeroSectionSerializer
    lookup_field = 'page'

class StatisticsViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Statistics.objects.filter(is_active=True)
    serializer_class = StatisticsSerializer

class ContactInfoViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ContactInfo.objects.filter(is_active=True)
    serializer_class = ContactInfoSerializer

class FeaturedPhotoViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = FeaturedPhoto.objects.filter(is_active=True)
    serializer_class = FeaturedPhotoSerializer

class AccordionGalleryItemViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = AccordionGalleryItem.objects.filter(is_active=True)
    serializer_class = AccordionGalleryItemSerializer

@api_view(['POST'])
def contact_create(request):
    serializer = ContactSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'Thank you! We will get back to you soon.'}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
