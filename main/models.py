from django.db import models

class Service(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    icon = models.CharField(max_length=100, default='fas fa-camera')
    image = models.ImageField(upload_to='services/', blank=True, null=True)
    order = models.IntegerField(default=0)
    
    class Meta:
        ordering = ['order']
    
    def __str__(self):
        return self.title

class TeamMember(models.Model):
    name = models.CharField(max_length=200)
    position = models.CharField(max_length=200)
    bio = models.TextField()
    image = models.ImageField(upload_to='team/', blank=True, null=True)
    order = models.IntegerField(default=0)
    
    class Meta:
        ordering = ['order']
    
    def __str__(self):
        return self.name

class Gallery(models.Model):
    CATEGORY_CHOICES = [
        ('wedding', 'Wedding'),
        ('party', 'Party'),
        ('ceremony', 'Ceremony'),
        ('other', 'Other Events'),
    ]
    
    title = models.CharField(max_length=200)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, default='wedding')
    image = models.ImageField(upload_to='gallery/')
    description = models.TextField(blank=True)
    location = models.CharField(max_length=200, blank=True)
    event_date = models.DateField(null=True, blank=True)
    date_added = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-date_added']
        verbose_name_plural = 'Galleries'
    
    def __str__(self):
        return self.title

class GalleryImage(models.Model):
    gallery = models.ForeignKey(Gallery, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='gallery/images/')
    caption = models.CharField(max_length=200, blank=True)
    order = models.IntegerField(default=0)
    
    class Meta:
        ordering = ['order']
    
    def __str__(self):
        return f"{self.gallery.title} - Image {self.order}"

class GalleryVideo(models.Model):
    gallery = models.ForeignKey(Gallery, on_delete=models.CASCADE, related_name='videos')
    video = models.FileField(upload_to='gallery/videos/', blank=True, null=True)
    video_url = models.URLField(blank=True, null=True)
    thumbnail = models.ImageField(upload_to='gallery/thumbnails/', blank=True, null=True)
    caption = models.CharField(max_length=200, blank=True)
    order = models.IntegerField(default=0)
    
    class Meta:
        ordering = ['order']
    
    def __str__(self):
        return f"{self.gallery.title} - Video {self.order}"

class Contact(models.Model):
    name = models.CharField(max_length=200)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    event_type = models.CharField(max_length=100)
    event_date = models.DateField()
    message = models.TextField()
    submitted_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-submitted_at']
    
    def __str__(self):
        return f"{self.name} - {self.event_type}"

class SocialMedia(models.Model):
    PLATFORM_CHOICES = [
        ('facebook', 'Facebook'),
        ('instagram', 'Instagram'),
        ('twitter', 'Twitter'),
        ('youtube', 'YouTube'),
        ('whatsapp', 'WhatsApp'),
        ('linkedin', 'LinkedIn'),
        ('pinterest', 'Pinterest'),
    ]
    
    platform = models.CharField(max_length=50, choices=PLATFORM_CHOICES, unique=True)
    url = models.URLField()
    is_active = models.BooleanField(default=True)
    order = models.IntegerField(default=0)
    
    class Meta:
        ordering = ['order']
        verbose_name_plural = 'Social Media'
    
    def __str__(self):
        return f"{self.get_platform_display()}"

class AboutUs(models.Model):
    title = models.CharField(max_length=200)
    subtitle = models.CharField(max_length=300, blank=True)
    description = models.TextField()
    image = models.ImageField(upload_to='about/')
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = 'About Us'
        verbose_name_plural = 'About Us'
    
    def __str__(self):
        return self.title

class OwnerMessage(models.Model):
    owner_name = models.CharField(max_length=200)
    owner_title = models.CharField(max_length=200)
    message = models.TextField()
    image = models.ImageField(upload_to='owner/')
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = 'Owner Message'
        verbose_name_plural = 'Owner Messages'
    
    def __str__(self):
        return f"Message from {self.owner_name}"

class HeroSection(models.Model):
    PAGE_CHOICES = [
        ('home', 'Home Page'),
        ('about', 'About Page'),
        ('gallery', 'Gallery Page'),
        ('contact', 'Contact Page'),
    ]
    
    page = models.CharField(max_length=50, choices=PAGE_CHOICES, unique=True)
    title = models.CharField(max_length=300)
    subtitle = models.CharField(max_length=500)
    button_text = models.CharField(max_length=100, blank=True)
    button_link = models.CharField(max_length=200, blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = 'Hero Section'
        verbose_name_plural = 'Hero Sections'
    
    def __str__(self):
        return f"{self.get_page_display()} Hero"

class HeroImage(models.Model):
    hero_section = models.ForeignKey(HeroSection, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='hero/')
    alt_text = models.CharField(max_length=200, blank=True)
    order = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)
    
    class Meta:
        ordering = ['order']
        verbose_name = 'Hero Image'
        verbose_name_plural = 'Hero Images'
    
    def __str__(self):
        return f"{self.hero_section.page} - Image {self.order}"

class Statistics(models.Model):
    total_projects = models.IntegerField(default=0)
    total_clients = models.IntegerField(default=0)
    customer_satisfaction = models.IntegerField(default=0, help_text='Percentage (0-100)')
    years_experience = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = 'Statistics'
        verbose_name_plural = 'Statistics'
    
    def __str__(self):
        return f"Statistics (Updated: {self.updated_at.strftime('%Y-%m-%d')})"

class ContactInfo(models.Model):
    address = models.TextField()
    phone_primary = models.CharField(max_length=20)
    phone_secondary = models.CharField(max_length=20, blank=True)
    email_primary = models.EmailField()
    email_secondary = models.EmailField(blank=True)
    business_hours_weekday = models.CharField(max_length=100, default='9:00 AM - 6:00 PM')
    business_hours_saturday = models.CharField(max_length=100, default='10:00 AM - 4:00 PM')
    business_hours_sunday = models.CharField(max_length=100, default='By Appointment Only')
    map_embed_url = models.TextField(help_text='Google Maps embed URL')
    is_active = models.BooleanField(default=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = 'Contact Information'
        verbose_name_plural = 'Contact Information'
    
    def __str__(self):
        return f"Contact Info (Updated: {self.updated_at.strftime('%Y-%m-%d')})"

class FeaturedPhoto(models.Model):
    ORIENTATION_CHOICES = [
        ('portrait', 'Portrait'),
        ('landscape', 'Landscape'),
    ]
    
    ROW_CHOICES = [
        (1, 'Row 1'),
        (2, 'Row 2'),
        (3, 'Row 3'),
    ]
    
    POSITION_CHOICES = [
        (1, 'Position 1'),
        (2, 'Position 2'),
    ]
    
    image = models.ImageField(upload_to='featured/')
    title = models.CharField(max_length=200, blank=True)
    orientation = models.CharField(max_length=10, choices=ORIENTATION_CHOICES)
    row = models.IntegerField(choices=ROW_CHOICES)
    position = models.IntegerField(choices=POSITION_CHOICES, help_text='Position in the row (1 or 2)')
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['row', 'position']
        verbose_name = 'Featured Photo'
        verbose_name_plural = 'Featured Photos'
        unique_together = ['row', 'position']
    
    def __str__(self):
        return f"Row {self.row} - Position {self.position} ({self.orientation})"

class AccordionGalleryItem(models.Model):
    MEDIA_TYPE_CHOICES = [
        ('image', 'Image'),
        ('video', 'Video'),
    ]
    
    title = models.CharField(max_length=200, help_text='Enter custom title (e.g., Wedding Photography, Pre-Wedding Shoots)')
    description = models.TextField(blank=True)
    media_type = models.CharField(max_length=10, choices=MEDIA_TYPE_CHOICES, default='image')
    image = models.ImageField(upload_to='accordion_gallery/', blank=True, null=True)
    video = models.FileField(upload_to='accordion_gallery/videos/', blank=True, null=True)
    video_url = models.URLField(blank=True, null=True, help_text='External video URL (YouTube, Vimeo, etc.)')
    order = models.IntegerField(default=0, help_text='Display order (1-5 for accordion gallery)')
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['order']
        verbose_name = 'Accordion Gallery Item'
        verbose_name_plural = 'Accordion Gallery Items'
    
    def __str__(self):
        return f"{self.order}. {self.title}"



