import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'ui-avatars.com',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
      },
      {
        protocol: 'http',
        hostname: '192.168.15.65',
        port: '8000',
      },
      {
        protocol: 'http',
        hostname: '192.168.1.72',
        port: '8000',
      },
      {
        protocol: 'http',
        hostname: '192.168.1.156',
        port: '8000',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '8000',
      },
    ],
    // Disable optimization for local development to avoid CORS issues
    unoptimized: true,
  },
  // Allow cross-origin requests from network IPs in development
  allowedDevOrigins: ['192.168.1.72', '192.168.1.156'],
};

export default nextConfig;
