import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: [],
  },
  experimental: {
    optimizeCss: true,
  },
};

export default nextConfig;
