from django.core.management.base import BaseCommand
from main.models import Service, TeamMember, AboutUs, OwnerMessage, HeroSection, Statistics, ContactInfo, AccordionGalleryItem

class Command(BaseCommand):
    help = 'Populate database with initial data'

    def handle(self, *args, **options):
        # Create Services
        services_data = [
            {
                'title': 'Wedding Photography',
                'description': 'Capture your special day with stunning, timeless photographs that tell your unique love story.',
                'icon': 'fas fa-camera',
                'order': 1
            },
            {
                'title': 'Wedding Videography',
                'description': 'Cinematic wedding films that beautifully document every moment and emotion of your celebration.',
                'icon': 'fas fa-video',
                'order': 2
            },
            {
                'title': 'Event Management',
                'description': 'Complete wedding and event planning services to ensure your day is perfectly orchestrated.',
                'icon': 'fas fa-calendar-check',
                'order': 3
            },
            {
                'title': 'Pre-Wedding Shoots',
                'description': 'Creative and romantic pre-wedding photography sessions at stunning locations.',
                'icon': 'fas fa-heart',
                'order': 4
            },
            {
                'title': 'Drone Photography',
                'description': 'Spectacular aerial shots that add a breathtaking perspective to your wedding album.',
                'icon': 'fas fa-plane',
                'order': 5
            },
            {
                'title': 'Photo Albums',
                'description': 'Beautifully designed, premium quality photo albums to preserve your memories forever.',
                'icon': 'fas fa-book',
                'order': 6
            }
        ]
        
        for service_data in services_data:
            Service.objects.get_or_create(**service_data)
        
        self.stdout.write(self.style.SUCCESS('Successfully created services'))
        
        # Create Team Members
        team_data = [
            {
                'name': 'Sarah Johnson',
                'position': 'Lead Photographer',
                'bio': 'Award-winning photographer with over 12 years of experience capturing love stories. Sarah has a unique eye for candid moments and specializes in natural light photography.',
                'order': 1
            },
            {
                'name': 'Michael Chen',
                'position': 'Event Manager',
                'bio': 'Detail-oriented event planner with 10 years of experience coordinating luxury weddings. Michael ensures every aspect of your day runs smoothly and stress-free.',
                'order': 2
            },
            {
                'name': 'Emily Davis',
                'position': 'Lead Videographer',
                'bio': 'Creative storyteller who brings wedding moments to life through cinematic films. Emily specializes in creating emotional and artistic wedding videos.',
                'order': 3
            },
            {
                'name': 'David Martinez',
                'position': 'Creative Director',
                'bio': 'Visionary artist with a passion for creating unique and unforgettable wedding experiences. David oversees all creative aspects of our projects.',
                'order': 4
            }
        ]
        
        for member_data in team_data:
            TeamMember.objects.get_or_create(**member_data)
        
        self.stdout.write(self.style.SUCCESS('Successfully created team members'))
        
        # Create About Us
        about_us_data = {
            'title': 'ABOUT US / COMPANY OVERVIEW',
            'subtitle': 'Capturing Love Stories Since 2012',
            'description': 'Wedding Calls is a pioneering initiative focused on establishing comprehensive photography and videography services for weddings and events throughout the region. Established in 2012, and headquartered in the heart of the city, the company is dedicated to contributing to preserving precious memories through professional, efficient, and artistic photography. We believe every love story is unique and deserves to be told in the most beautiful way possible.',
            'is_active': True
        }
        AboutUs.objects.get_or_create(
            title=about_us_data['title'],
            defaults=about_us_data
        )
        
        self.stdout.write(self.style.SUCCESS('Successfully created About Us'))
        
        # Create Owner Message
        owner_message_data = {
            'owner_name': 'John Anderson',
            'owner_title': 'Founder & CEO',
            'message': 'Photography is blessed with the ability to freeze time — capturing moments that tell stories and preserve emotions forever. The transition to professional wedding photography is not merely a technological shift; it is an artistic and emotional imperative. At Wedding Calls, we are committed to ensuring that your special day is documented with the highest level of artistry and professionalism. Every photograph we create is a statement of confidence in preserving your most precious memories.',
            'is_active': True
        }
        OwnerMessage.objects.get_or_create(
            owner_name=owner_message_data['owner_name'],
            defaults=owner_message_data
        )
        
        self.stdout.write(self.style.SUCCESS('Successfully created Owner Message'))
        
        # Create Hero Sections
        hero_sections_data = [
            {
                'page': 'home',
                'title': 'Capturing Love Stories',
                'subtitle': 'Professional Wedding Photography & Event Management',
                'button_text': 'Explore Our Gallery',
                'button_link': '/gallery',
                'is_active': True
            },
            {
                'page': 'about',
                'title': 'About Us',
                'subtitle': 'Discover our passion for creating unforgettable moments',
                'button_text': '',
                'button_link': '',
                'is_active': True
            },
            {
                'page': 'gallery',
                'title': 'Our Portfolio',
                'subtitle': 'Explore our collection of beautiful memories we have captured',
                'button_text': '',
                'button_link': '',
                'is_active': True
            },
            {
                'page': 'contact',
                'title': 'Get In Touch',
                'subtitle': 'Let us help you create unforgettable memories',
                'button_text': '',
                'button_link': '',
                'is_active': True
            },
        ]
        
        for hero_data in hero_sections_data:
            HeroSection.objects.get_or_create(
                page=hero_data['page'],
                defaults=hero_data
            )
        
        self.stdout.write(self.style.SUCCESS('Successfully created Hero Sections'))
        
        # Create Statistics
        statistics_data = {
            'total_projects': 500,
            'total_clients': 350,
            'customer_satisfaction': 98,
            'years_experience': 12,
            'is_active': True
        }
        
        Statistics.objects.get_or_create(
            id=1,
            defaults=statistics_data
        )
        
        self.stdout.write(self.style.SUCCESS('Successfully created Statistics'))
        
        # Create Contact Info
        contact_info_data = {
            'address': '123 Wedding Street, Downtown City, State 12345, United States',
            'phone_primary': '+1 (555) 123-4567',
            'phone_secondary': '+1 (555) 987-6543',
            'email_primary': 'info@weddingcalls.com',
            'email_secondary': 'bookings@weddingcalls.com',
            'business_hours_weekday': '9:00 AM - 6:00 PM',
            'business_hours_saturday': '10:00 AM - 4:00 PM',
            'business_hours_sunday': 'By Appointment Only',
            'map_embed_url': 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1841!2d-73.98731668459391!3d40.74844097932847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1234567890',
            'is_active': True
        }
        
        ContactInfo.objects.get_or_create(
            id=1,
            defaults=contact_info_data
        )
        
        self.stdout.write(self.style.SUCCESS('Successfully created Contact Info'))
        
        # Create Accordion Gallery Items
        accordion_gallery_data = [
            {
                'title': 'Wedding Photography',
                'description': 'Capturing beautiful moments of your special day',
                'media_type': 'image',
                'order': 1,
                'is_active': True
            },
            {
                'title': 'Pre-Wedding Shoots',
                'description': 'Romantic pre-wedding photography sessions',
                'media_type': 'image',
                'order': 2,
                'is_active': True
            },
            {
                'title': 'Event Coverage',
                'description': 'Complete documentation of your celebration',
                'media_type': 'image',
                'order': 3,
                'is_active': True
            },
            {
                'title': 'Candid Moments',
                'description': 'Natural and spontaneous photography',
                'media_type': 'image',
                'order': 4,
                'is_active': True
            },
            {
                'title': 'Reception Highlights',
                'description': 'Celebration and joy of your reception',
                'media_type': 'image',
                'order': 5,
                'is_active': True
            }
        ]
        
        for item_data in accordion_gallery_data:
            AccordionGalleryItem.objects.get_or_create(
                order=item_data['order'],
                defaults=item_data
            )
        
        self.stdout.write(self.style.SUCCESS('Successfully created Accordion Gallery Items'))
        self.stdout.write(self.style.SUCCESS('Database populated successfully!'))
