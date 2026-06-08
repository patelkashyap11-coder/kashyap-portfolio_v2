import type { NextConfig } from "next";
import path from "path";
import { fileURLToPath } from "url";

const rootDir = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  // Allow phone/tablet on the same Wi‑Fi to load dev assets (e.g. 192.168.1.11:3000)
  allowedDevOrigins: ['192.168.1.11', '192.168.1.*'],
  turbopack: {
    root: rootDir,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: [],
  },
};

export default nextConfig;
