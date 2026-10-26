import Link from "next/link";
import { FaHeart, FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from "react-icons/fa";

export default function Footer() {
  return (
    <>
      {/* Elegant Divider with Diamond Pattern */}
      <div className="relative bg-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-4">
            <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-gray-300 flex-1"></div>
            <div className="flex gap-2">
              <div className="w-2 h-2 bg-red-600 rotate-45"></div>
              <div className="w-2 h-2 bg-gray-400 rotate-45"></div>
              <div className="w-2 h-2 bg-red-600 rotate-45"></div>
            </div>
            <div className="h-px bg-gradient-to-l from-transparent via-gray-300 to-gray-300 flex-1"></div>
          </div>
        </div>
      </div>

      <footer className="bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white">
        <div className="container mx-auto px-4 pt-12 pb-6">
          {/* Main Footer Content */}
          <div className="grid md:grid-cols-12 gap-8 mb-10">
            {/* Brand Section - Takes more space */}
            <div className="md:col-span-5">
              <div className="mb-4">
                <h3 className="text-2xl font-playfair font-bold mb-3 flex items-center gap-2">
                  <FaHeart className="text-red-600" />
                  Wedding Calls
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Creating timeless memories through stunning photography and seamless event management. 
                  Your story deserves to be told beautifully.
                </p>
              </div>
              
              {/* Social Media Icons */}
              <div className="flex gap-3 mb-6">
                <a 
                  href="#" 
                  className="w-9 h-9 rounded-md bg-gray-800 hover:bg-red-600 flex items-center justify-center transition-all duration-300"
                  aria-label="Facebook"
                >
                  <FaFacebook size={16} />
                </a>
                <a 
                  href="#" 
                  className="w-9 h-9 rounded-md bg-gray-800 hover:bg-red-600 flex items-center justify-center transition-all duration-300"
                  aria-label="Instagram"
                >
                  <FaInstagram size={16} />
                </a>
                <a 
                  href="#" 
                  className="w-9 h-9 rounded-md bg-gray-800 hover:bg-red-600 flex items-center justify-center transition-all duration-300"
                  aria-label="Twitter"
                >
                  <FaTwitter size={16} />
                </a>
                <a 
                  href="#" 
                  className="w-9 h-9 rounded-md bg-gray-800 hover:bg-red-600 flex items-center justify-center transition-all duration-300"
                  aria-label="YouTube"
                >
                  <FaYoutube size={16} />
                </a>
              </div>

              {/* Business Hours */}
              <div className="border-l-2 border-red-600 pl-4">
                <div className="flex items-center gap-2 mb-2">
                  <FaClock className="text-red-600 text-sm" />
                  <h6 className="font-semibold text-sm">Business Hours</h6>
                </div>
                <p className="text-gray-400 text-xs">Mon - Fri: 9:00 AM - 6:00 PM</p>
                <p className="text-gray-400 text-xs">Sat: 10:00 AM - 4:00 PM</p>
                <p className="text-gray-400 text-xs">Sun: By Appointment</p>
              </div>
            </div>

            {/* Quick Links */}
            <div className="md:col-span-2">
              <h5 className="text-base font-semibold mb-4 text-white border-b border-gray-700 pb-2">
                Quick Links
              </h5>
              <div className="flex flex-col gap-2">
                <Link 
                  href="/" 
                  className="text-gray-400 hover:text-red-600 transition-colors text-sm"
                >
                  Home
                </Link>
                <Link 
                  href="/gallery" 
                  className="text-gray-400 hover:text-red-600 transition-colors text-sm"
                >
                  Gallery
                </Link>
                <Link 
                  href="/about" 
                  className="text-gray-400 hover:text-red-600 transition-colors text-sm"
                >
                  About Us
                </Link>
                <Link 
                  href="/contact" 
                  className="text-gray-400 hover:text-red-600 transition-colors text-sm"
                >
                  Contact
                </Link>
              </div>
            </div>

            {/* Services */}
            <div className="md:col-span-2">
              <h5 className="text-base font-semibold mb-4 text-white border-b border-gray-700 pb-2">
                Services
              </h5>
              <div className="flex flex-col gap-2">
                <Link 
                  href="#" 
                  className="text-gray-400 hover:text-red-600 transition-colors text-sm"
                >
                  Wedding Photography
                </Link>
                <Link 
                  href="#" 
                  className="text-gray-400 hover:text-red-600 transition-colors text-sm"
                >
                  Videography
                </Link>
                <Link 
                  href="#" 
                  className="text-gray-400 hover:text-red-600 transition-colors text-sm"
                >
                  Event Management
                </Link>
                <Link 
                  href="#" 
                  className="text-gray-400 hover:text-red-600 transition-colors text-sm"
                >
                  Pre-Wedding Shoots
                </Link>
              </div>
            </div>

            {/* Contact Info */}
            <div className="md:col-span-3">
              <h5 className="text-base font-semibold mb-4 text-white border-b border-gray-700 pb-2">
                Get In Touch
              </h5>
              <div className="flex flex-col gap-3 text-gray-400">
                <div className="flex items-start gap-2">
                  <FaPhone className="text-red-600 text-xs mt-1 flex-shrink-0" />
                  <p className="text-sm">+1 (555) 123-4567</p>
                </div>
                <div className="flex items-start gap-2">
                  <FaEnvelope className="text-red-600 text-xs mt-1 flex-shrink-0" />
                  <p className="text-sm">info@weddingcalls.com</p>
                </div>
                <div className="flex items-start gap-2">
                  <FaMapMarkerAlt className="text-red-600 text-xs mt-1 flex-shrink-0" />
                  <p className="text-sm">123 Wedding Street, Downtown City</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 pt-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-gray-400 text-xs">
              <p>
                &copy; 2026 <span className="text-red-600 font-semibold">Wedding Calls</span>. All rights reserved.
              </p>
              <div className="flex gap-4">
                <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
                <span className="text-gray-700">|</span>
                <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
                <span className="text-gray-700">|</span>
                <Link href="#" className="hover:text-white transition-colors">Sitemap</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
