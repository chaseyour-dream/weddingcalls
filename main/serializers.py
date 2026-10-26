from rest_framework import serializers
from .models import Service, TeamMember, Gallery, GalleryImage, GalleryVideo, Contact, SocialMedia, AboutUs, OwnerMessage, HeroSection, HeroImage, Statistics, ContactInfo, FeaturedPhoto, AccordionGalleryItem

class ServiceSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()
    
    class Meta:
        model = Service
        fields = '__all__'
    
    def get_image(self, obj):
        if obj.image:
            request = self.context.get('request')
            if request:
                image_url = request.build_absolute_uri(obj.image.url)
                # Replace localhost with the actual host from the request
                if request.get_host():
                    image_url = image_url.replace('localhost:8000', request.get_host())
                    image_url = image_url.replace('127.0.0.1:8000', request.get_host())
                return image_url
            return obj.image.url
        return None

class TeamMemberSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()
    
    class Meta:
        model = TeamMember
        fields = '__all__'
    
    def get_image(self, obj):
        if obj.image:
            request = self.context.get('request')
            if request:
                image_url = request.build_absolute_uri(obj.image.url)
                # Replace localhost with the actual host from the request
                if request.get_host():
                    image_url = image_url.replace('localhost:8000', request.get_host())
                    image_url = image_url.replace('127.0.0.1:8000', request.get_host())
                return image_url
            return obj.image.url
        return None

class GalleryImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = GalleryImage
        fields = '__all__'

class GalleryVideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = GalleryVideo
        fields = '__all__'

class GallerySerializer(serializers.ModelSerializer):
    category_display = serializers.CharField(source='get_category_display', read_only=True)
    
    class Meta:
        model = Gallery
        fields = '__all__'

class GalleryDetailSerializer(serializers.ModelSerializer):
    category_display = serializers.CharField(source='get_category_display', read_only=True)
    images = GalleryImageSerializer(many=True, read_only=True)
    videos = GalleryVideoSerializer(many=True, read_only=True)
    
    class Meta:
        model = Gallery
        fields = '__all__'

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = '__all__'
        read_only_fields = ['submitted_at']

class SocialMediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = SocialMedia
        fields = '__all__'

class AboutUsSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()
    
    class Meta:
        model = AboutUs
        fields = '__all__'
    
    def get_image(self, obj):
        if obj.image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return None

class OwnerMessageSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()
    
    class Meta:
        model = OwnerMessage
        fields = '__all__'
    
    def get_image(self, obj):
        if obj.image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return None

class HeroImageSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()
    
    class Meta:
        model = HeroImage
        fields = ['id', 'image', 'alt_text', 'order', 'is_active']
    
    def get_image(self, obj):
        if obj.image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return None

class HeroSectionSerializer(serializers.ModelSerializer):
    images = HeroImageSerializer(many=True, read_only=True)
    page_display = serializers.CharField(source='get_page_display', read_only=True)
    
    class Meta:
        model = HeroSection
        fields = '__all__'

class StatisticsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Statistics
        fields = '__all__'

class ContactInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactInfo
        fields = '__all__'

class FeaturedPhotoSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()
    
    class Meta:
        model = FeaturedPhoto
        fields = '__all__'
    
    def get_image(self, obj):
        if obj.image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return None

class AccordionGalleryItemSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()
    video = serializers.SerializerMethodField()
    media_url = serializers.SerializerMethodField()
    
    class Meta:
        model = AccordionGalleryItem
        fields = '__all__'
    
    def get_image(self, obj):
        if obj.image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return None
    
    def get_video(self, obj):
        if obj.video:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.video.url)
            return obj.video.url
        return None
    
    def get_media_url(self, obj):
        """Return the appropriate media URL based on media type"""
        if obj.media_type == 'video':
            if obj.video_url:
                return obj.video_url
            elif obj.video:
                request = self.context.get('request')
                if request:
                    return request.build_absolute_uri(obj.video.url)
                return obj.video.url
        else:
            if obj.image:
                request = self.context.get('request')
                if request:
                    return request.build_absolute_uri(obj.image.url)
                return obj.image.url
        return None



