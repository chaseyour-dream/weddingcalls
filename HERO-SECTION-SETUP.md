# Hero Section Implementation Guide

## What Was Created

### Backend (Django)
1. **New Models**:
   - `HeroSection` - Stores hero section data for each page
   - `HeroImage` - Multiple images for carousel effect

2. **API Endpoints**:
   - `/api/hero-sections/` - List all hero sections
   - `/api/hero-sections/{page}/` - Get specific page hero (home, about, gallery, contact)

3. **Features**:
   - Each page can have its own hero section
   - Multiple images per hero section for carousel
   - Customizable title, subtitle, button text, and button link
   - Active/inactive toggle

### Frontend (Next.js)
1. **New Component**: `HeroSection.tsx`
   - Automatic image carousel (changes every 5 seconds)
   - Manual navigation (prev/next buttons)
   - Slide indicators (dots)
   - Smooth transitions and animations
   - Gradient overlay for better text readability

2. **Updated Pages**:
   - Home page (`/`)
   - About page (`/about`)
   - Gallery page (`/gallery`)
   - Contact page (`/contact`)

## How to Use

### 1. Access Django Admin
Go to: `http://localhost:8000/admin/`

### 2. Manage Hero Sections
Navigate to: **Main > Hero Sections**

You'll see 4 hero sections (one for each page):
- Home Page
- About Page
- Gallery Page
- Contact Page

### 3. Edit a Hero Section
Click on any hero section to edit:
- **Title**: Main heading text
- **Subtitle**: Subheading text
- **Button Text**: Call-to-action button text (optional)
- **Button Link**: Where the button links to (optional)
- **Is Active**: Toggle to show/hide

### 4. Add Carousel Images
In the hero section edit page, scroll down to see "Hero Images" section:
- Click "Add another Hero Image"
- Upload image
- Set alt text (for SEO)
- Set order (controls display sequence)
- Set active status

**Recommended**:
- Add 3-5 images for a nice carousel effect
- Use high-quality images (1920x1080 or larger)
- Keep images in the same aspect ratio

### 5. Image Guidelines
- **Format**: JPG or PNG
- **Size**: Recommended 1920x1080px (Full HD)
- **File Size**: Keep under 2MB for faster loading
- **Content**: Use high-quality wedding/event photos

## Features

### Carousel
- **Auto-play**: Images change every 5 seconds
- **Manual Control**: Left/Right arrow buttons
- **Indicators**: Dots at bottom show current slide
- **Smooth Transitions**: 1-second fade effect

### Responsive
- Works on all screen sizes
- Touch-friendly navigation
- Optimized images

### Customization Per Page
Each page has its own hero section:

**Home Page**:
- Default: "Capturing Love Stories"
- Button: "Explore Our Gallery" → `/gallery`

**About Page**:
- Default: "About Us"
- No button (optional)

**Gallery Page**:
- Default: "Our Portfolio"
- No button (optional)

**Contact Page**:
- Default: "Get In Touch"
- No button (optional)

## Database Commands

### Populate Initial Data
```bash
python manage.py populate_data
```

### Create New Hero Section Manually
```python
from main.models import HeroSection, HeroImage

# Create hero section
hero = HeroSection.objects.create(
    page='home',
    title='Welcome to Our Studio',
    subtitle='Creating Beautiful Memories',
    button_text='View Gallery',
    button_link='/gallery',
    is_active=True
)

# Add images
HeroImage.objects.create(
    hero_section=hero,
    image='path/to/image1.jpg',
    alt_text='Wedding couple',
    order=1,
    is_active=True
)
```

## Testing

### Test API Endpoints
```bash
# Get home hero section
curl http://localhost:8000/api/hero-sections/home/

# Get all hero sections
curl http://localhost:8000/api/hero-sections/
```

### Frontend Testing
1. Visit each page: `/`, `/about`, `/gallery`, `/contact`
2. Verify hero section displays
3. Test carousel:
   - Wait 5 seconds for auto-advance
   - Click left/right arrows
   - Click indicator dots

## Troubleshooting

### Images Not Loading
1. Check that images are uploaded in Django admin
2. Verify image `is_active` is checked
3. Check that hero section `is_active` is checked
4. Ensure Django media files are configured correctly

### Carousel Not Working
1. Verify multiple images exist for the hero section
2. Check browser console for JavaScript errors
3. Ensure `lucide-react` package is installed

### Hero Section Not Showing
1. Check that hero section exists for the page
2. Verify `is_active` is True
3. Check API response: `/api/hero-sections/{page}/`
4. Look for errors in browser console

## Advanced Customization

### Change Carousel Speed
Edit `frontend/components/HeroSection.tsx`:
```typescript
// Line ~34 - Change 5000 to desired milliseconds
const timer = setInterval(() => {
  setCurrentSlide((prev) => (prev + 1) % images.length);
}, 5000); // 5 seconds
```

### Change Transition Duration
Edit `frontend/components/HeroSection.tsx`:
```typescript
// Line ~68 - Adjust duration-1000
className={`absolute inset-0 transition-opacity duration-1000 ${
  index === currentSlide ? "opacity-100" : "opacity-0"
}`}
```

### Customize Overlay Gradient
Edit `frontend/components/HeroSection.tsx`:
```typescript
// Line ~80 - Modify gradient colors
<div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
```

## Next Steps

1. **Upload Real Images**: Replace placeholder images with actual wedding photos
2. **Customize Text**: Update titles and subtitles for each page
3. **Test on Mobile**: Ensure carousel works on mobile devices
4. **Optimize Images**: Compress images for faster loading
5. **Add More Pages**: Create hero sections for additional pages as needed

## API Response Example

```json
{
  "id": 1,
  "page": "home",
  "page_display": "Home Page",
  "title": "Capturing Love Stories",
  "subtitle": "Professional Wedding Photography & Event Management",
  "button_text": "Explore Our Gallery",
  "button_link": "/gallery",
  "is_active": true,
  "images": [
    {
      "id": 1,
      "image": "http://localhost:8000/media/hero/wedding1.jpg",
      "alt_text": "Beautiful wedding ceremony",
      "order": 1,
      "is_active": true
    },
    {
      "id": 2,
      "image": "http://localhost:8000/media/hero/wedding2.jpg",
      "alt_text": "Happy couple portrait",
      "order": 2,
      "is_active": true
    }
  ]
}
```
