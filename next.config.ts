import type { NextConfig } from "next";
import path from "path";
import { fileURLToPath } from "url";

const rootDir = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  turbopack: {
    root: rootDir,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: [],
  },
  experimental: {
    optimizeCss: true,
  },
};

export default nextConfig;
