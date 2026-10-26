"use client";
import { useState, useEffect } from "react";
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { submitContact, getHeroSection } from "@/lib/api";
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

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", event_type: "", event_date: "", message: ""
  });
  const [status, setStatus] = useState("");
  const [heroData, setHeroData] = useState<HeroData | null>(null);

  useEffect(() => {
    getHeroSection('contact')
      .then(res => {
        setHeroData(res.data);
      })
      .catch(err => console.error('Hero Section API error:', err));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await submitContact(formData);
      setStatus("Thank you! We will get back to you soon.");
      setFormData({ name: "", email: "", phone: "", event_type: "", event_date: "", message: "" });
    } catch (error) {
      setStatus("Error submitting form. Please try again.");
    }
  };

  return (
    <>
      <style jsx>{`
        .form-input {
          transition: all 0.3s ease;
        }
        .form-input:focus {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(220, 53, 69, 0.2);
        }
        .contact-card {
          transition: all 0.3s ease;
        }
        .contact-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0,0,0,0.15);
        }
        .social-btn {
          transition: all 0.3s ease;
        }
        .social-btn:hover {
          transform: translateY(-3px) rotate(5deg);
        }
        .info-icon {
          transition: all 0.3s ease;
        }
        .contact-info-item:hover .info-icon {
          transform: scale(1.2);
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
            <h1 className="text-5xl font-playfair font-bold mb-4">Contact Us</h1>
            <p className="text-gray-600 text-lg">Let's discuss your upcoming event</p>
          </div>
        </section>
      )}

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold mb-6">Send Us a Message</h3>
                
                {status && (
                  <div className={`p-4 rounded mb-6 ${status.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                    {status}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-2 font-semibold">Full Name *</label>
                      <input 
                        type="text" 
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="form-input w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-red-600"
                      />
                    </div>
                    <div>
                      <label className="block mb-2 font-semibold">Email *</label>
                      <input 
                        type="email" 
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="form-input w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-red-600"
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-2 font-semibold">Phone *</label>
                      <input 
                        type="tel" 
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="form-input w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-red-600"
                      />
                    </div>
                    <div>
                      <label className="block mb-2 font-semibold">Event Type *</label>
                      <select 
                        required
                        value={formData.event_type}
                        onChange={(e) => setFormData({...formData, event_type: e.target.value})}
                        className="form-input w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-red-600"
                      >
                        <option value="">Select Type</option>
                        <option value="Wedding">Wedding</option>
                        <option value="Birthday Party">Birthday Party</option>
                        <option value="Corporate Event">Corporate Event</option>
                        <option value="Anniversary">Anniversary</option>
                        <option value="Religious Ceremony">Religious Ceremony</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block mb-2 font-semibold">Event Date *</label>
                    <input 
                      type="date" 
                      required
                      value={formData.event_date}
                      onChange={(e) => setFormData({...formData, event_date: e.target.value})}
                      className="form-input w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-red-600"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 font-semibold">Message *</label>
                    <textarea 
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="form-input w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-red-600"
                    ></textarea>
                  </div>

                  <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold transition">
                    Send Message
                  </button>
                </form>
              </div>
            </div>

            <div>
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-4">Get In Touch</h3>
                <p className="text-gray-600">Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
              </div>

              <div className="contact-card bg-white p-6 rounded-lg shadow-lg mb-6">
                <div className="contact-info-item flex items-start gap-4 mb-6">
                  <FaMapMarkerAlt className="info-icon text-red-600 text-2xl mt-1" />
                  <div>
                    <h5 className="font-bold mb-1">Address</h5>
                    <p className="text-gray-600">123 Wedding Street<br />City, State 12345</p>
                  </div>
                </div>
                <hr className="my-4" />
                <div className="contact-info-item flex items-start gap-4 mb-6">
                  <FaPhone className="info-icon text-red-600 text-2xl mt-1" />
                  <div>
                    <h5 className="font-bold mb-1">Phone</h5>
                    <p className="text-gray-600">+1 (555) 123-4567<br />+1 (555) 987-6543</p>
                  </div>
                </div>
                <hr className="my-4" />
                <div className="contact-info-item flex items-start gap-4">
                  <FaEnvelope className="info-icon text-red-600 text-2xl mt-1" />
                  <div>
                    <h5 className="font-bold mb-1">Email</h5>
                    <p className="text-gray-600">info@weddingcalls.com<br />bookings@weddingcalls.com</p>
                  </div>
                </div>
              </div>

              <div className="contact-card bg-red-600 text-white p-6 rounded-lg shadow-lg mb-6">
                <h5 className="font-bold mb-4">Business Hours</h5>
                <ul className="space-y-2">
                  <li><strong>Monday - Friday:</strong> 9:00 AM - 6:00 PM</li>
                  <li><strong>Saturday:</strong> 10:00 AM - 4:00 PM</li>
                  <li><strong>Sunday:</strong> By Appointment Only</li>
                </ul>
              </div>

              <div>
                <h5 className="font-bold mb-4">Follow Us</h5>
                <div className="flex gap-3">
                  <a href="#" className="social-btn w-12 h-12 border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white rounded-lg flex items-center justify-center transition">
                    <FaFacebook size={20} />
                  </a>
                  <a href="#" className="social-btn w-12 h-12 border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white rounded-lg flex items-center justify-center transition">
                    <FaInstagram size={20} />
                  </a>
                  <a href="#" className="social-btn w-12 h-12 border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white rounded-lg flex items-center justify-center transition">
                    <FaTwitter size={20} />
                  </a>
                  <a href="#" className="social-btn w-12 h-12 border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white rounded-lg flex items-center justify-center transition">
                    <FaYoutube size={20} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1841!2d-73.98731668459391!3d40.74844097932847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1234567890" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </section>
    </>
  );
}
