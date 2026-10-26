from django.contrib import admin
from .models import Service, TeamMember, Gallery, GalleryImage, GalleryVideo, Contact, SocialMedia, AboutUs, OwnerMessage, HeroSection, HeroImage, Statistics, ContactInfo, FeaturedPhoto, AccordionGalleryItem

@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ['title', 'order']
    list_editable = ['order']

@admin.register(TeamMember)
class TeamMemberAdmin(admin.ModelAdmin):
    list_display = ['name', 'position', 'order']
    list_editable = ['order']

class GalleryImageInline(admin.TabularInline):
    model = GalleryImage
    extra = 3

class GalleryVideoInline(admin.TabularInline):
    model = GalleryVideo
    extra = 1

@admin.register(Gallery)
class GalleryAdmin(admin.ModelAdmin):
    list_display = ['title', 'category', 'event_date', 'date_added']
    list_filter = ['category', 'date_added']
    search_fields = ['title', 'description', 'location']
    inlines = [GalleryImageInline, GalleryVideoInline]

@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'event_type', 'event_date', 'submitted_at']
    list_filter = ['event_type', 'submitted_at']
    search_fields = ['name', 'email', 'phone']
    readonly_fields = ['submitted_at']

@admin.register(SocialMedia)
class SocialMediaAdmin(admin.ModelAdmin):
    list_display = ['platform', 'url', 'is_active', 'order']
    list_editable = ['is_active', 'order']
    list_filter = ['is_active', 'platform']

@admin.register(AboutUs)
class AboutUsAdmin(admin.ModelAdmin):
    list_display = ['title', 'is_active', 'created_at']
    list_editable = ['is_active']
    list_filter = ['is_active']
    search_fields = ['title', 'subtitle', 'description']

@admin.register(OwnerMessage)
class OwnerMessageAdmin(admin.ModelAdmin):
    list_display = ['owner_name', 'owner_title', 'is_active', 'created_at']
    list_editable = ['is_active']
    list_filter = ['is_active']
    search_fields = ['owner_name', 'owner_title', 'message']

class HeroImageInline(admin.TabularInline):
    model = HeroImage
    extra = 3
    fields = ['image', 'alt_text', 'order', 'is_active']

@admin.register(HeroSection)
class HeroSectionAdmin(admin.ModelAdmin):
    list_display = ['page', 'title', 'is_active', 'created_at']
    list_editable = ['is_active']
    list_filter = ['page', 'is_active']
    search_fields = ['title', 'subtitle']
    inlines = [HeroImageInline]

@admin.register(Statistics)
class StatisticsAdmin(admin.ModelAdmin):
    list_display = ['total_projects', 'total_clients', 'customer_satisfaction', 'years_experience', 'is_active', 'updated_at']
    list_editable = ['is_active']
    list_filter = ['is_active']
    
    def has_add_permission(self, request):
        # Only allow one statistics entry
        return not Statistics.objects.exists()

@admin.register(ContactInfo)
class ContactInfoAdmin(admin.ModelAdmin):
    list_display = ['phone_primary', 'email_primary', 'is_active', 'updated_at']
    list_editable = ['is_active']
    list_filter = ['is_active']
    fieldsets = (
        ('Contact Details', {
            'fields': ('phone_primary', 'phone_secondary', 'email_primary', 'email_secondary', 'address')
        }),
        ('Business Hours', {
            'fields': ('business_hours_weekday', 'business_hours_saturday', 'business_hours_sunday')
        }),
        ('Map', {
            'fields': ('map_embed_url',)
        }),
        ('Status', {
            'fields': ('is_active',)
        }),
    )
    
    def has_add_permission(self, request):
        # Only allow one contact info entry
        return not ContactInfo.objects.exists()

@admin.register(FeaturedPhoto)
class FeaturedPhotoAdmin(admin.ModelAdmin):
    list_display = ['row', 'position', 'orientation', 'title', 'is_active', 'created_at']
    list_filter = ['row', 'orientation', 'is_active']
    list_editable = ['is_active']
    search_fields = ['title']
    
    fieldsets = (
        ('Photo Details', {
            'fields': ('image', 'title')
        }),
        ('Layout Settings', {
            'fields': ('row', 'position', 'orientation'),
            'description': 'Row 1: Portrait-Landscape, Row 2: Landscape-Portrait, Row 3: Portrait-Landscape'
        }),
        ('Status', {
            'fields': ('is_active',)
        }),
    )

@admin.register(AccordionGalleryItem)
class AccordionGalleryItemAdmin(admin.ModelAdmin):
    list_display = ['order', 'title', 'media_type', 'is_active', 'created_at']
    list_filter = ['media_type', 'is_active']
    list_editable = ['is_active']
    search_fields = ['title', 'description']
    ordering = ['order']
    
    fieldsets = (
        ('Content', {
            'fields': ('title', 'description', 'order')
        }),
        ('Media', {
            'fields': ('media_type', 'image', 'video', 'video_url'),
            'description': 'Upload image for "Image" type, or upload video/provide video URL for "Video" type'
        }),
        ('Status', {
            'fields': ('is_active',)
        }),
    )



