"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface HeroImage {
  id: number;
  image: string;
  alt_text: string;
  order: number;
}

interface HeroSectionProps {
  title: string;
  subtitle: string;
  buttonText?: string;
  buttonLink?: string;
  images: HeroImage[];
  showCurve?: boolean;
}

export default function HeroSection({
  title,
  subtitle,
  buttonText,
  buttonLink,
  images,
  showCurve = false,
}: HeroSectionProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, [images.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Use placeholder image if no images provided
  const displayImages = images.length > 0 
    ? images 
    : [{
        id: 1,
        image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1920',
        alt_text: 'Wedding',
        order: 0
      }];

  return (
    <section className={`relative ${showCurve ? 'h-[70vh] min-h-[500px]' : 'h-screen min-h-[600px]'} overflow-visible`}>
      {/* Background Images Carousel */}
      <div className="absolute inset-0">
        {displayImages.map((image, index) => (
          <div
            key={image.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={image.image}
              alt={image.alt_text || title}
              fill
              className="object-cover"
              priority={index === 0}
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
          </div>
        ))}
      </div>

      {/* Curved Bottom Shape - SVG Wave */}
      {showCurve && (
        <div className="absolute bottom-0 left-0 right-0 z-10 -mb-1">
          <svg 
            viewBox="0 0 1440 120" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto block"
            preserveAspectRatio="none"
          >
            <path 
              d="M0,64 C240,100 480,120 720,100 C960,80 1200,60 1440,64 L1440,120 L0,120 Z" 
              fill="white"
            />
          </svg>
        </div>
      )}

      {/* Content - Conditional Layout */}
      {showCurve ? (
        /* Centered layout for other pages */
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-playfair font-bold mb-5 text-white animate-fade-in">
                {title}
              </h1>
              <p className="text-lg md:text-2xl mb-6 text-gray-200 animate-fade-in-delay">
                {subtitle}
              </p>
            </div>
          </div>
        </div>
      ) : (
        /* Left bottom layout for home page */
        <div className="relative z-10 h-full flex items-end">
          <div className="container mx-auto px-4 pb-24">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-6xl font-playfair font-bold mb-5 text-white animate-slide-in-left">
                {title}
              </h1>
              <p className="text-lg md:text-2xl mb-6 text-gray-200 animate-slide-in-left-delay">
                {subtitle}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Slide Indicators - Vertical on Left Bottom */}
      {displayImages.length > 1 && (
        <div className="absolute left-8 bottom-8 z-20 flex flex-col gap-4">
          {displayImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-4 h-4 rounded-full transition-all duration-300 border-2 border-white ${
                index === currentSlide
                  ? "bg-white scale-125"
                  : "bg-transparent hover:bg-white/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fade-in {
          animation: fadeIn 1s ease-out;
        }

        .animate-fade-in-delay {
          animation: fadeIn 1s ease-out 0.3s both;
        }

        .animate-fade-in-delay-2 {
          animation: fadeIn 1s ease-out 0.6s both;
        }

        .animate-slide-in-left {
          animation: slideInLeft 1s ease-out;
        }

        .animate-slide-in-left-delay {
          animation: slideInLeft 1s ease-out 1s both;
        }
      `}</style>
    </section>
  );
}
