import { GalleryPage } from '@/components/GalleryPage';
import type { MediaItem } from '@/components/GalleryPage';

// Add your actual files to /public/products/
// Example:
// const media: MediaItem[] = [
//   { src: '/products/photo-01.jpg', type: 'image', alt: 'PRODUCTS' },
//   { src: '/products/video-01.mp4', type: 'video' },
// ];

const media: MediaItem[] = [];

export default function Page() {
  return (
    <GalleryPage
      title="PRODUCTS"
      subtitle="Product Photography"
      description="Clean, compelling product imagery for e-commerce, catalogues, and brand campaigns."
      media={media}
    />
  );
}
