"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { FaArrowLeft, FaMapMarkerAlt, FaCalendar, FaPlay } from "react-icons/fa";
import { getGalleryDetail } from "@/lib/api";

export default function GalleryDetailPage() {
  const params = useParams();
  const [gallery, setGallery] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (params.id) {
      getGalleryDetail(params.id as string)
        .then(res => {
          setGallery(res.data);
          setSelectedImage(res.data.image);
        })
        .catch(() => {
          // Set placeholder data if API fails
          setGallery({
            title: "Beautiful Wedding Ceremony",
            category_display: "Wedding",
            description: "A stunning wedding celebration capturing the magic of love. Every moment was filled with joy, laughter, and unforgettable memories.",
            location: "Grand Hotel Ballroom, New York",
            event_date: "2026-06-15",
            image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800",
            images: [
              { id: 1, image: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400", caption: "The Ceremony" },
              { id: 2, image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=400", caption: "First Dance" },
              { id: 3, image: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=400", caption: "Reception" },
              { id: 4, image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400", caption: "The Venue" },
              { id: 5, image: "https://images.unsplash.com/photo-1522413452208-996ff3f3e740?w=400", caption: "Decor Details" },
            ],
            videos: [
              { id: 1, video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ", caption: "Wedding Highlights", thumbnail: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400" }
            ]
          });
          setSelectedImage("https://images.unsplash.com/photo-1519741497674-611481863552?w=800");
        });
    }
  }, [params.id]);

  if (!gallery) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading gallery...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <style jsx>{`
        .thumbnail {
          cursor: pointer;
          transition: all 0.3s ease;
          border: 3px solid transparent;
        }
        .thumbnail:hover {
          transform: scale(1.05);
          border-color: #dc3545;
        }
        .thumbnail.active {
          border-color: #dc3545;
          box-shadow: 0 4px 12px rgba(220, 53, 69, 0.3);
        }
        .main-image {
          cursor: zoom-in;
          transition: transform 0.3s ease;
        }
        .main-image:hover {
          transform: scale(1.02);
        }
        .video-container {
          position: relative;
          padding-bottom: 56.25%;
          height: 0;
          overflow: hidden;
        }
        .video-container iframe {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        .modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.95);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }
        .modal img {
          max-width: 100%;
          max-height: 90vh;
          object-fit: contain;
        }
        .info-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: #f8f9fa;
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
          font-size: 0.875rem;
        }
      `}</style>

      <section className="pt-32 pb-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <Link href="/gallery" className="inline-flex items-center gap-2 text-red-600 hover:text-red-700 mb-6 transition">
            <FaArrowLeft /> Back to Gallery
          </Link>
          
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-4">
                <Image 
                  src={selectedImage} 
                  alt={gallery.title}
                  width={800}
                  height={600}
                  className="main-image w-full h-96 object-cover"
                  onClick={() => setIsModalOpen(true)}
                />
              </div>
              
              {gallery.images && gallery.images.length > 0 && (
                <div className="grid grid-cols-5 gap-2">
                  <div 
                    className={`thumbnail rounded overflow-hidden ${selectedImage === gallery.image ? 'active' : ''}`}
                    onClick={() => setSelectedImage(gallery.image)}
                  >
                    <Image 
                      src={gallery.image} 
                      alt="Main"
                      width={150}
                      height={150}
                      className="w-full h-20 object-cover"
                    />
                  </div>
                  {gallery.images.map((img: any) => (
                    <div 
                      key={img.id}
                      className={`thumbnail rounded overflow-hidden ${selectedImage === img.image ? 'active' : ''}`}
                      onClick={() => setSelectedImage(img.image)}
                    >
                      <Image 
                        src={img.image} 
                        alt={img.caption}
                        width={150}
                        height={150}
                        className="w-full h-20 object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <div className="bg-white rounded-lg shadow-lg p-8">
                <span className="inline-block bg-red-600 text-white px-4 py-1 rounded-full text-sm mb-4">
                  {gallery.category_display}
                </span>
                <h1 className="text-4xl font-playfair font-bold mb-6">{gallery.title}</h1>
                
                <div className="flex flex-wrap gap-3 mb-6">
                  {gallery.location && (
                    <div className="info-badge">
                      <FaMapMarkerAlt className="text-red-600" />
                      <span>{gallery.location}</span>
                    </div>
                  )}
                  {gallery.event_date && (
                    <div className="info-badge">
                      <FaCalendar className="text-red-600" />
                      <span>{new Date(gallery.event_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                  )}
                </div>

                <p className="text-gray-600 leading-relaxed mb-6">
                  {gallery.description || "A beautiful collection capturing precious moments and memories."}
                </p>

                <div className="border-t pt-6">
                  <h3 className="font-bold text-lg mb-4">Event Details</h3>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex justify-between">
                      <span>Total Photos:</span>
                      <span className="font-semibold">{(gallery.images?.length || 0) + 1}</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Total Videos:</span>
                      <span className="font-semibold">{gallery.videos?.length || 0}</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Category:</span>
                      <span className="font-semibold">{gallery.category_display}</span>
                    </li>
                  </ul>
                </div>

                <Link 
                  href="/contact"
                  className="block w-full text-center bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition mt-6"
                >
                  Book Similar Event
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {gallery.images && gallery.images.length > 0 && (
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-playfair font-bold mb-8">Photo Gallery</h2>
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
              {gallery.images.map((img: any) => (
                <div 
                  key={img.id}
                  className="thumbnail rounded-lg overflow-hidden shadow-lg"
                  onClick={() => {
                    setSelectedImage(img.image);
                    setIsModalOpen(true);
                  }}
                >
                  <Image 
                    src={img.image} 
                    alt={img.caption}
                    width={300}
                    height={300}
                    className="w-full h-64 object-cover"
                  />
                  {img.caption && (
                    <div className="p-3 bg-white">
                      <p className="text-sm text-gray-600">{img.caption}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {gallery.videos && gallery.videos.length > 0 && (
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-playfair font-bold mb-8">Video Highlights</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {gallery.videos.map((video: any) => (
                <div key={video.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  {video.video_url ? (
                    <div className="video-container">
                      <iframe 
                        src={video.video_url}
                        title={video.caption}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  ) : video.thumbnail && (
                    <div className="relative">
                      <Image 
                        src={video.thumbnail} 
                        alt={video.caption}
                        width={600}
                        height={400}
                        className="w-full h-64 object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-red-600 text-white rounded-full p-4">
                          <FaPlay size={24} />
                        </div>
                      </div>
                    </div>
                  )}
                  {video.caption && (
                    <div className="p-4">
                      <p className="font-semibold">{video.caption}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {isModalOpen && (
        <div className="modal" onClick={() => setIsModalOpen(false)}>
          <button 
            className="absolute top-4 right-4 text-white text-4xl hover:text-red-600 transition"
            onClick={() => setIsModalOpen(false)}
          >
            ×
          </button>
          <Image 
            src={selectedImage} 
            alt="Full size"
            width={1200}
            height={800}
            className="max-w-full max-h-screen"
          />
        </div>
      )}
    </>
  );
}
