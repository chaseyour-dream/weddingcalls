"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { FaHeart, FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navClasses = !scrolled
    ? "fixed top-0 left-0 right-0 bg-transparent z-50 transition-all duration-300"
    : "fixed top-0 left-0 right-0 bg-white shadow-sm z-50 transition-all duration-300";

  const textClasses = !scrolled ? "text-white" : "text-gray-900";
  const linkClasses = !scrolled 
    ? "relative text-white font-barlow font-medium tracking-wide uppercase text-sm transition-all duration-300 hover:text-red-400 hover:scale-110 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-red-400 after:transition-all after:duration-300 hover:after:w-full" 
    : "relative text-gray-900 font-barlow font-medium tracking-wide uppercase text-sm transition-all duration-300 hover:text-red-600 hover:scale-110 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-red-600 after:transition-all after:duration-300 hover:after:w-full";

  return (
    <nav className={navClasses}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className={`flex items-center gap-2 text-xl font-playfair font-bold ${textClasses}`}>
            <FaHeart className="text-red-600" />
            <span>Wedding Calls</span>
          </Link>

          <button
            className={`md:hidden text-2xl ${textClasses}`}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className={linkClasses}>Home</Link>
            <Link href="/about" className={linkClasses}>About Us</Link>
            <Link href="/gallery" className={linkClasses}>Gallery</Link>
            <Link href="/contact" className={linkClasses}>Contact</Link>
          </div>
        </div>

        {isOpen && (
          <div className={`md:hidden py-4 border-t ${!scrolled ? 'border-white/20 bg-black/50' : 'border-gray-200'}`}>
            <div className="flex flex-col gap-4">
              <Link href="/" onClick={() => setIsOpen(false)} className={linkClasses}>Home</Link>
              <Link href="/gallery" onClick={() => setIsOpen(false)} className={linkClasses}>Gallery</Link>
              <Link href="/about" onClick={() => setIsOpen(false)} className={linkClasses}>About Us</Link>
              <Link href="/contact" onClick={() => setIsOpen(false)} className={linkClasses}>Contact</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
