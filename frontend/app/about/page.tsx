"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaBullseye, FaEye, FaAward, FaHeart, FaCameraRetro, FaUsers, FaCamera, FaVideo, FaCalendarCheck, FaPlane, FaBook, FaQuoteLeft } from "react-icons/fa";
import { getTeam, getServices, getAboutUs, getOwnerMessage, getHeroSection } from "@/lib/api";
import HeroSection from "@/components/HeroSection";

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

interface AboutUsData {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image?: string;
}

interface OwnerMessageData {
  id: number;
  owner_name: string;
  owner_title: string;
  message: string;
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

export default function AboutPage() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [aboutUs, setAboutUs] = useState<AboutUsData | null>(null);
  const [ownerMessage, setOwnerMessage] = useState<OwnerMessageData | null>(null);
  const [heroData, setHeroData] = useState<HeroData | null>(null);

  useEffect(() => {
    getTeam()
      .then(res => {
        const teamData = res.data.results || res.data;
        setTeam(Array.isArray(teamData) ? teamData : []);
      })
      .catch(err => console.error('Team API error:', err));
    
    getServices()
      .then(res => {
        const servicesData = res.data.results || res.data;
        setServices(Array.isArray(servicesData) ? servicesData : []);
      })
      .catch(err => console.error('Services API error:', err));
    
    getAboutUs()
      .then(res => {
        const aboutData = res.data.results || res.data;
        setAboutUs(Array.isArray(aboutData) ? aboutData[0] : aboutData);
      })
      .catch(err => console.error('About Us API error:', err));
    
    getOwnerMessage()
      .then(res => {
        const ownerData = res.data.results || res.data;
        setOwnerMessage(Array.isArray(ownerData) ? ownerData[0] : ownerData);
      })
      .catch(err => console.error('Owner Message API error:', err));
    
    getHeroSection('about')
      .then(res => {
        setHeroData(res.data);
      })
      .catch(err => console.error('Hero Section API error:', err));
  }, []);

  const icons = { FaCamera, FaVideo, FaCalendarCheck, FaHeart, FaPlane, FaBook };

  return (
    <>
      <style jsx>{`
        .mission-card {
          transition: all 0.3s ease;
        }
        .mission-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.15);
        }
        .feature-icon {
          transition: all 0.3s ease;
        }
        .feature-item:hover .feature-icon {
          transform: scale(1.2) rotate(10deg);
        }
        .team-card {
          transition: all 0.3s ease;
          overflow: hidden;
        }
        .team-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.15);
        }
        .team-card img {
          transition: transform 0.5s ease;
        }
        .team-card:hover img {
          transform: scale(1.1);
        }
        .service-card {
          transition: all 0.3s ease;
        }
        .service-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.15);
        }
      `}</style>

      {/* Hero Section - Dynamic */}
      {heroData ? (
        <HeroSection
          title={heroData.title}
          subtitle={heroData.subtitle}
          buttonText={heroData.button_text}
          buttonLink={heroData.button_link}
          images={heroData.images}
          showCurve={true}
        />
      ) : (
        <section className="pt-32 pb-16 bg-gray-50">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-playfair font-bold mb-4">About Us</h1>
            <p className="text-gray-600 text-lg">Discover our passion for creating unforgettable moments</p>
          </div>
        </section>
      )}

      {/* About Us Section - Dynamic from Backend */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="rounded-lg overflow-hidden shadow-xl">
              {aboutUs?.image ? (
                <Image 
                  src={aboutUs.image} 
                  alt={aboutUs.title} 
                  width={600} 
                  height={400}
                  className="w-full h-auto object-cover"
                />
              ) : (
                <div className="bg-gradient-to-br from-red-100 to-red-200 p-12 rounded-lg h-96 flex items-center justify-center">
                  <FaCameraRetro className="text-red-600 text-9xl opacity-30" />
                </div>
              )}
            </div>
            <div>
              <h2 className="text-4xl font-playfair font-bold mb-4 text-gray-800">
                {aboutUs?.title || "ABOUT US / COMPANY OVERVIEW"}
              </h2>
              {aboutUs?.subtitle && (
                <p className="text-red-600 font-semibold text-lg mb-6 border-l-4 border-red-600 pl-4">
                  {aboutUs.subtitle}
                </p>
              )}
              <p className="text-gray-700 leading-relaxed text-justify">
                {aboutUs?.description || "Wedding Calls is more than just a photography and event management company – we're storytellers, memory makers, and dream weavers rolled into one passionate team."}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="mission-card bg-white p-10 rounded-lg shadow-lg">
              <FaBullseye className="text-red-600 text-5xl mb-4" />
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                To capture and preserve life's most beautiful moments with artistic excellence, 
                while providing seamless event management services that exceed expectations.
              </p>
            </div>
            <div className="mission-card bg-white p-10 rounded-lg shadow-lg">
              <FaEye className="text-red-600 text-5xl mb-4" />
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                To be the most trusted name in wedding photography and event management, 
                recognized for our creativity, professionalism, and unwavering commitment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Owner Message Section - Dynamic from Backend */}
      {ownerMessage && (
        <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-playfair font-bold text-center mb-12">
              MESSAGE FROM <span className="text-red-500">THE OWNER</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              <div className="order-2 md:order-1">
                <div className="bg-gray-800 p-8 rounded-lg shadow-2xl border-l-4 border-red-600">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-white mb-1">{ownerMessage.owner_name}</h3>
                    <p className="text-red-500 font-semibold">{ownerMessage.owner_title}</p>
                  </div>
                  <FaQuoteLeft className="text-red-600 text-3xl mb-4 opacity-50" />
                  <p className="text-gray-300 leading-relaxed italic text-justify">
                    {ownerMessage.message}
                  </p>
                </div>
              </div>
              <div className="order-1 md:order-2 flex justify-center">
                {ownerMessage.image ? (
                  <div className="rounded-lg overflow-hidden shadow-2xl border-4 border-gray-700">
                    <Image 
                      src={ownerMessage.image} 
                      alt={ownerMessage.owner_name}
                      width={400}
                      height={500}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-80 h-96 bg-gray-700 rounded-lg flex items-center justify-center">
                    <FaUsers className="text-gray-600 text-9xl" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-playfair font-bold text-center mb-12">Why Choose Us</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="feature-item text-center">
              <FaAward className="feature-icon text-red-600 text-5xl mx-auto mb-4" />
              <h5 className="font-bold mb-2">10+ Years Experience</h5>
              <p className="text-gray-600 text-sm">Seasoned professionals</p>
            </div>
            <div className="feature-item text-center">
              <FaHeart className="feature-icon text-red-600 text-5xl mx-auto mb-4" />
              <h5 className="font-bold mb-2">Passionate Team</h5>
              <p className="text-gray-600 text-sm">Love what we do</p>
            </div>
            <div className="feature-item text-center">
              <FaCameraRetro className="feature-icon text-red-600 text-5xl mx-auto mb-4" />
              <h5 className="font-bold mb-2">Premium Equipment</h5>
              <p className="text-gray-600 text-sm">State-of-the-art gear</p>
            </div>
            <div className="feature-item text-center">
              <FaUsers className="feature-icon text-red-600 text-5xl mx-auto mb-4" />
              <h5 className="font-bold mb-2">1000+ Happy Clients</h5>
              <p className="text-gray-600 text-sm">Trusted worldwide</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-playfair font-bold text-center mb-4">Our Services</h2>
          <p className="text-gray-600 text-lg text-center mb-12">Comprehensive solutions for your special day</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.length > 0 ? services.map((service) => (
              <div key={service.id} className="service-card bg-white rounded-lg shadow-lg overflow-hidden">
                {service.image ? (
                  <div className="overflow-hidden">
                    <Image 
                      src={service.image} 
                      alt={service.title}
                      width={400}
                      height={250}
                      className="w-full h-56 object-cover"
                    />
                  </div>
                ) : (
                  <div className="h-56 bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center">
                    <div className="text-red-600 text-6xl">
                      {service.icon && icons[service.icon.split(' ')[1] as keyof typeof icons] ? 
                        React.createElement(icons[service.icon.split(' ')[1] as keyof typeof icons]) : 
                        <FaCamera />
                      }
                    </div>
                  </div>
                )}
                <div className="p-6">
                  <h4 className="text-xl font-bold mb-3">{service.title}</h4>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              </div>
            )) : (
              Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="service-card bg-white p-8 rounded-lg shadow-lg">
                  <div className="text-red-600 text-5xl mb-4"><FaCamera /></div>
                  <h4 className="text-xl font-bold mb-3">Service {i + 1}</h4>
                  <p className="text-gray-600">Professional service description</p>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-playfair font-bold text-center mb-12">Meet Our Expert Team</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.length > 0 ? team.map((member) => (
              <div key={member.id} className="team-card bg-white rounded-lg shadow-lg overflow-hidden">
                <Image 
                  src={member.image || `https://ui-avatars.com/api/?name=${member.name}&size=400&background=dc3545&color=fff`} 
                  alt={member.name}
                  width={400}
                  height={400}
                  className="w-full h-80 object-cover"
                />
                <div className="p-6 text-center">
                  <h5 className="text-xl font-bold mb-2">{member.name}</h5>
                  <p className="text-red-600 mb-3">{member.position}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </div>
              </div>
            )) : (
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="team-card bg-white rounded-lg shadow-lg overflow-hidden">
                  <Image 
                    src={`https://ui-avatars.com/api/?name=Team+Member&size=400&background=dc3545&color=fff`} 
                    alt="Team Member"
                    width={400}
                    height={400}
                    className="w-full h-80 object-cover"
                  />
                  <div className="p-6 text-center">
                    <h5 className="text-xl font-bold mb-2">Team Member</h5>
                    <p className="text-red-600 mb-3">Position</p>
                    <p className="text-gray-600 text-sm">Professional expert</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      <section className="py-20 bg-red-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-playfair font-bold mb-6">Let's Create Something Amazing Together</h2>
          <p className="text-xl mb-8">Ready to make your event unforgettable? Get in touch with us today!</p>
          <Link href="/contact" className="inline-block bg-white text-red-600 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition">
            Contact Us Now
          </Link>
        </div>
      </section>
    </>
  );
}
