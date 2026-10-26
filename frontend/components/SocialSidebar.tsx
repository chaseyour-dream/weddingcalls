"use client";
import { useEffect, useState } from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaWhatsapp, FaLinkedin, FaPinterest } from "react-icons/fa";
import { getSocialMedia } from "@/lib/api";

const iconMap = {
  facebook: FaFacebook,
  instagram: FaInstagram,
  twitter: FaTwitter,
  youtube: FaYoutube,
  whatsapp: FaWhatsapp,
  linkedin: FaLinkedin,
  pinterest: FaPinterest,
};

interface SocialLink {
  id: number;
  platform: keyof typeof iconMap;
  url: string;
}

export default function SocialSidebar() {
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([
    { id: 1, platform: 'facebook', url: '#' },
    { id: 2, platform: 'instagram', url: '#' },
    { id: 3, platform: 'whatsapp', url: '#' },
  ]);

  useEffect(() => {
    getSocialMedia()
      .then(res => {
        console.log('Social media data:', res.data);
        if (Array.isArray(res.data)) {
          setSocialLinks(res.data);
        }
      })
      .catch(err => {
        console.error('Social media API error:', err);
      });
  }, []);

  return (
    <div 
      className="fixed right-0 top-1/2 z-[9999]" 
      style={{ transform: 'translateY(-50%)' }}
    >
      <div className="bg-gray-800/90 backdrop-blur-sm py-2 px-2 rounded-l-2xl shadow-xl">
        <div className="flex flex-col gap-2">
          {socialLinks.map((link) => {
            const Icon = iconMap[link.platform as keyof typeof iconMap] || FaFacebook;
            
            let bgColor = 'bg-gray-700';
            if (link.platform === 'facebook') bgColor = 'bg-blue-600';
            if (link.platform === 'instagram') bgColor = 'bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500';
            if (link.platform === 'whatsapp') bgColor = 'bg-green-500';
            if (link.platform === 'youtube') bgColor = 'bg-red-600';
            if (link.platform === 'twitter') bgColor = 'bg-blue-400';
            if (link.platform === 'linkedin') bgColor = 'bg-blue-700';
            if (link.platform === 'pinterest') bgColor = 'bg-red-700';
            
            return (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-10 h-10 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110 shadow-md hover:shadow-lg ${bgColor}`}
                aria-label={link.platform}
              >
                <Icon size={18} />
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
