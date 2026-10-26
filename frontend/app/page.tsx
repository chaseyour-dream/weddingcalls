"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaCamera, FaVideo, FaCalendarCheck, FaHeart, FaPlane, FaBook } from "react-icons/fa";
import { getServices, getTeam, getHeroSection, getStatistics, getFeaturedPhotos } from "@/lib/api";
import SocialSidebar from "@/components/SocialSidebar";
import HeroSection from "@/components/HeroSection";
import AccordionGallery from "../components/AccordionGallery";

interface Service {
  id: number;
  title: string;
  description: string;
  icon?: string;
  image?: string;
}

interface TeamMember {
  id: number;
  name: string;
  position: string;
  bio: string;
  image?: string;
}

interface HeroImage {
  id: number;
  image: string;
  alt_text: string;
  order: number;
}

interface HeroData {
  title: string;
  subtitle: string;
  button_text: string;
  button_link: string;
  images: HeroImage[];
}

interface Statistics {
  total_projects: number;
  total_clients: number;
  customer_satisfaction: number;
  years_experience: number;
}

interface FeaturedPhoto {
  id: number;
  image: string;
  title: string;
  orientation: 'portrait' | 'landscape';
  row: number;
  position: number;
}

export default function Home() {
  const [services, setServices] = useState<Service[]>([]);
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [heroData, setHeroData] = useState<HeroData | null>(null);
  const [statistics, setStatistics] = useState<Statistics | null>(null);
  const [featuredPhotos, setFeaturedPhotos] = useState<FeaturedPhoto[]>([]);

  useEffect(() => {
    getServices()
      .then(res => {
        const servicesData = res.data.results || res.data;
        setServices(Array.isArray(servicesData) ? servicesData.slice(0, 6) : []);
      })
      .catch(err => console.error('Services API error:', err));
    
    getTeam()
      .then(res => {
        const teamData = res.data.results || res.data;
        setTeam(Array.isArray(teamData) ? teamData.slice(0, 4) : []);
      })
      .catch(err => console.error('Team API error:', err));
    
    getHeroSection('home')
      .then(res => {
        setHeroData(res.data);
      })
      .catch(err => console.error('Hero Section API error:', err));
    
    getStatistics()
      .then(res => {
        const statsData = res.data.results?.[0] || res.data;
        setStatistics(statsData);
      })
      .catch(err => console.error('Statistics API error:', err));
    
    getFeaturedPhotos()
      .then(res => {
        const photosData = res.data.results || res.data;
        setFeaturedPhotos(Array.isArray(photosData) ? photosData : []);
      })
      .catch(err => console.error('Featured Photos API error:', err));
  }, []);

  const icons = { FaCamera, FaVideo, FaCalendarCheck, FaHeart, FaPlane, FaBook };

  return (
    <>
      <SocialSidebar />

      {/* Hero Section - Dynamic */}
      {heroData ? (
        <HeroSection
          title={heroData.title}
          subtitle={heroData.subtitle}
          buttonText={heroData.button_text}
          buttonLink={heroData.button_link}
          images={heroData.images}
        />
      ) : (
        <HeroSection
          title="Capturing Love Stories"
          subtitle="Professional Wedding Photography & Event Management"
          buttonText="Explore Our Gallery"
          buttonLink="/gallery"
          images={[]}
        />
      )}

      {/* Statistics Section */}
      {statistics && (
        <section className="relative py-20 overflow-hidden bg-white">
          <div className="container mx-auto px-4 relative z-10">
            {/* Banner image with statistics overlay */}
            <div className="flex justify-center">
              <div className="relative w-full max-w-5xl">
                {/* Background Banner Image */}
                <Image
                  src="https://media.istockphoto.com/id/1780329898/vector/red-christmas-banner-with-snowflakes-and-stars-merry-christmas-and-happy-new-year-greeting.jpg?s=612x612&w=0&k=20&c=3HUaj-zYRM_k2sQSBjBI0O_OGEJyCq2fcbu4W13C754="
                  alt="Decorative Banner"
                  width={1200}
                  height={300}
                  className="w-full h-auto object-cover rounded-lg"
                  unoptimized
                />
                
                {/* Statistics Grid Overlay */}
                <div className="absolute inset-0 flex items-center justify-center p-4 md:p-8">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 w-full max-w-4xl">
                    <StatCounter
                      end={statistics.total_projects}
                      label="Projects Completed"
                      suffix="+"
                    />
                    <StatCounter
                      end={statistics.total_clients}
                      label="Happy Clients"
                      suffix="+"
                    />
                    <StatCounter
                      end={statistics.customer_satisfaction}
                      label="Customer Satisfaction"
                      suffix="%"
                    />
                    <StatCounter
                      end={statistics.years_experience}
                      label="Years of Experience"
                      suffix="+"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Team */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-playfair font-bold mb-4 text-white">Meet Our Team</h2>
            <p className="text-gray-400 text-lg">Passionate professionals dedicated to your perfect day</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.length > 0 ? team.map((member) => (
              <div key={member.id} className="team-card bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:-translate-y-2">
                <div className="overflow-hidden">
                  <Image 
                    src={member.image || `https://ui-avatars.com/api/?name=${member.name}&size=400&background=dc3545&color=fff`} 
                    alt={member.name}
                    width={400}
                    height={400}
                    className="w-full h-64 object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-6 text-center">
                  <h5 className="text-xl font-bold mb-2">{member.name}</h5>
                  <p className="text-red-600 mb-3">{member.position}</p>
                  <p className="text-gray-600 text-sm">{member.bio.substring(0, 60)}...</p>
                </div>
              </div>
            )) : (
              <div className="team-card bg-white rounded-lg shadow-lg overflow-hidden">
                <Image 
                  src="https://ui-avatars.com/api/?name=John+Doe&size=400&background=dc3545&color=fff" 
                  alt="Team Member"
                  width={400}
                  height={400}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6 text-center">
                  <h5 className="text-xl font-bold mb-2">John Doe</h5>
                  <p className="text-red-600 mb-3">Lead Photographer</p>
                  <p className="text-gray-600 text-sm">Capturing moments for over 10 years</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Featured Photos Gallery */}
      {featuredPhotos.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-playfair font-bold mb-4">Featured Moments</h2>
              <p className="text-gray-600 text-lg">A glimpse of our beautiful work</p>
            </div>
            
            {/* Group photos by row */}
            {[1, 2, 3].map(rowNum => {
              const rowPhotos = featuredPhotos.filter(p => p.row === rowNum);
              if (rowPhotos.length === 0) return null;
              
              // Sort by position
              const sortedPhotos = rowPhotos.sort((a, b) => a.position - b.position);
              
              return (
                <div key={rowNum} className="grid grid-cols-3 gap-4 mb-4">
                  {sortedPhotos.map(photo => (
                    <div
                      key={photo.id}
                      className={`relative overflow-hidden rounded-lg shadow-lg group ${
                        photo.orientation === 'portrait' ? 'col-span-1' : 'col-span-2'
                      }`}
                      style={{ height: '500px' }}
                    >
                      <Image
                        src={photo.image}
                        alt={photo.title || 'Featured photo'}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        unoptimized
                      />
                      {photo.title && (
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                          <p className="text-white p-4 font-semibold">{photo.title}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Services */}
      <section className="py-20 relative overflow-hidden bg-white">
        {/* Background with fade in/out animation */}
        <div 
          className="absolute inset-0 animate-fadeInOut"
          style={{
            backgroundImage: `url('https://media.istockphoto.com/id/2036160149/vector/elegant-grey-victorian-seamless-wallpaper.jpg?s=612x612&w=0&k=20&c=4kWjNN8Gia3PtQgxtILby1S_1_Kj0hHVqwl_fQ1YfA0=')`,
            backgroundSize: '300px 300px',
            backgroundRepeat: 'repeat',
            backgroundPosition: 'center',
          }}
        />
        
        <style jsx>{`
          @keyframes fadeInOut {
            0%, 100% {
              opacity: 0.08;
            }
            50% {
              opacity: 0.25;
            }
          }
        `}</style>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-playfair font-bold mb-4">Our Services</h2>
            <p className="text-gray-600 text-lg">Comprehensive solutions for your special day</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.length > 0 ? services.map((service) => (
              <div key={service.id} className="service-card bg-white p-8 rounded-lg shadow-lg transition-all duration-300 hover:-translate-y-2">
                {service.image ? (
                  <div className="mb-4 overflow-hidden rounded-lg">
                    <Image 
                      src={service.image} 
                      alt={service.title}
                      width={400}
                      height={250}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                ) : (
                  <div className="text-red-600 text-5xl mb-4">
                    {service.icon && icons[service.icon.split(' ')[1] as keyof typeof icons] ? 
                      React.createElement(icons[service.icon.split(' ')[1] as keyof typeof icons]) : 
                      <FaCamera />
                    }
                  </div>
                )}
                <h4 className="text-xl font-bold mb-3">{service.title}</h4>
                <p className="text-gray-600">{service.description}</p>
              </div>
            )) : (
              <>
                <ServiceCard icon={<FaCamera />} title="Wedding Photography" description="Stunning photos that capture every emotion and moment of your special day." />
                <ServiceCard icon={<FaVideo />} title="Videography" description="Cinematic wedding films that tell your unique love story." />
                <ServiceCard icon={<FaCalendarCheck />} title="Event Management" description="Complete event planning and coordination for a stress-free celebration." />
              </>
            )}
          </div>
        </div>
      </section>

      {/* Accordion Gallery */}
      <AccordionGallery />
    </>
  );
}

function ServiceCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="service-card bg-white p-8 rounded-lg shadow-lg">
      <div className="text-red-600 text-5xl mb-4">{icon}</div>
      <h4 className="text-xl font-bold mb-3">{title}</h4>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function StatCounter({ end, label, suffix = '' }: { end: number; label: string; suffix?: string }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!hasAnimated && end > 0) {
      setHasAnimated(true);
      let startTime: number | null = null;
      const duration = 2500;
      
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        setCount(Math.floor(easeOutQuart * end));
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setCount(end);
        }
      };
      
      requestAnimationFrame(animate);
    }
  }, [end, hasAnimated]);

  return (
    <div className="text-center">
      <div className="text-white font-bold text-4xl md:text-5xl lg:text-6xl mb-2 font-playfair drop-shadow-lg">
        {count}{suffix}
      </div>
      <div className="text-white/95 text-xs md:text-sm font-semibold uppercase tracking-wider drop-shadow-md px-2">
        {label}
      </div>
    </div>
  );
}

