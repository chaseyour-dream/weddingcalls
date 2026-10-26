import axios from 'axios';

// Detect if we're on localhost or network IP
const getAPIUrl = () => {
  const envUrl = process.env.NEXT_PUBLIC_API_URL;
  
  // If running in browser and localhost:8000 doesn't work, try the network IP
  if (typeof window !== 'undefined' && window.location.hostname !== 'localhost') {
    // Try to use the actual backend IP/port
    return 'http://localhost:8000/api'; // Primary
  }
  
  return envUrl || 'http://localhost:8000/api';
};

const API_URL = getAPIUrl();

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getServices = () => api.get('/services/');
export const getTeam = () => api.get('/team/');
export const getGallery = (category?: string) => {
  const params = category && category !== 'all' ? { category } : {};
  return api.get('/gallery/', { params });
};
export const getGalleryDetail = (id: string) => api.get(`/gallery/${id}/`);
export const getSocialMedia = () => api.get('/social-media/');
export const getAboutUs = () => api.get('/about-us/');
export const getOwnerMessage = () => api.get('/owner-message/');
export const getHeroSection = (page: string) => api.get(`/hero-sections/${page}/`);
export const getStatistics = () => api.get('/statistics/');
export const getContactInfo = () => api.get('/contact-info/');
export const getFeaturedPhotos = () => api.get('/featured-photos/');
export const getAccordionGallery = () => api.get('/accordion-gallery/');
export const submitContact = (data: any) => api.post('/contact/', data);
