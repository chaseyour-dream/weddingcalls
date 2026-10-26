"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getGallery, getHeroSection } from "@/lib/api";
import HeroSection from "@/components/HeroSection";

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

export default function GalleryPage() {
  const [gallery, setGallery] = useState([]);
  const [category, setCategory] = useState("all");
  const [heroData, setHeroData] = useState<HeroData | null>(null);

  useEffect(() => {
    getGallery(category).then(res => setGallery(res.data));
    
    getHeroSection('gallery')
      .then(res => {
        setHeroData(res.data);
      })
      .catch(err => console.error('Hero Section API error:', err));
  }, [category]);

  const placeholders = [
    { id: 1, src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=500", title: "Beautiful Wedding Day", category: "Wedding" },
    { id: 2, src: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=500", title: "Reception Celebration", category: "Wedding" },
    { id: 3, src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=500", title: "Romantic Moments", category: "Wedding" },
    { id: 4, src: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=500", title: "Birthday Bash", category: "Party" },
    { id: 5, src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=500", title: "Sacred Ceremony", category: "Ceremony" },
    { id: 6, src: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=500", title: "Corporate Event", category: "Other" },
  ];

  return (
    <>
      <style jsx>{`
        .gallery-card {
          transition: all 0.3s ease;
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }
        .gallery-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.2);
        }
        .gallery-card img {
          transition: transform 0.5s ease;
        }
        .gallery-card:hover img {
          transform: scale(1.1);
        }
        .gallery-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.7), transparent);
          opacity: 0;
          transition: opacity 0.3s ease;
          display: flex;
          align-items: flex-end;
          padding: 1rem;
        }
        .gallery-card:hover .gallery-overlay {
          opacity: 1;
        }
        .filter-btn {
          transition: all 0.3s ease;
        }
        .filter-btn:hover {
          transform: translateY(-2px);
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
            <h1 className="text-5xl font-playfair font-bold mb-4">Our Gallery</h1>
            <p className="text-gray-600 text-lg">Explore our stunning collection of captured moments</p>
          </div>
        </section>
      )}

      <section className="sticky top-16 bg-white shadow-sm py-4 z-40">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-2">
            {['all', 'wedding', 'party', 'ceremony', 'other'].map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`filter-btn px-6 py-2 rounded-lg font-semibold transition ${
                  category === cat ? 'bg-red-600 text-white' : 'border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white'
                }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(gallery.length > 0 ? gallery : placeholders).map((item: any) => (
              <Link 
                key={item.id} 
                href={`/gallery/${item.id}`}
                className="gallery-card bg-white rounded-lg shadow-lg overflow-hidden block"
              >
                <div className="relative h-80">
                  <Image 
                    src={item.image || item.src} 
                    alt={item.title} 
                    width={500} 
                    height={350}
                    className="w-full h-full object-cover"
                  />
                  <div className="gallery-overlay">
                    <div className="text-white">
                      <h5 className="font-bold text-lg mb-1">{item.title}</h5>
                      <p className="text-sm">{item.category_display || item.category}</p>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h5 className="font-bold text-lg mb-2">{item.title}</h5>
                  <p className="text-gray-600 text-sm flex items-center gap-2">
                    <span className="inline-block w-2 h-2 bg-red-600 rounded-full"></span>
                    {item.category_display || item.category}
                  </p>
                  {item.description && (
                    <p className="text-gray-600 text-sm mt-2">{item.description.substring(0, 80)}...</p>
                  )}
                  <div className="mt-3 text-red-600 font-semibold text-sm">
                    View Details →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
