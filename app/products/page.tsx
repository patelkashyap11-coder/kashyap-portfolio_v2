import { GalleryPage } from '@/components/GalleryPage';
import type { MediaItem } from '@/components/GalleryPage';

// Add your actual files to /public/products/
// Example:
// const media: MediaItem[] = [
//   { src: '/products/photo-01.jpg', type: 'image', alt: 'PRODUCTS' },
//   { src: '/products/video-01.mp4', type: 'video' },
// ];

const media: MediaItem[] = [
  { src: '/products/0B0A9264.jpg', type: 'image', alt: 'Products' },
  { src: '/products/0B0A9337.jpg', type: 'image', alt: 'Products' },
  { src: '/products/DSC00120.jpg', type: 'image', alt: 'Products' },
  { src: '/products/DSC01934.jpg', type: 'image', alt: 'Products' },
  { src: '/products/DSC01966.jpg', type: 'image', alt: 'Products' },
  { src: '/products/DSC08336.jpg', type: 'image', alt: 'Products' },
  { src: '/products/DSC09157.jpg', type: 'image', alt: 'Products' },
  { src: '/products/DSC09868.jpg', type: 'image', alt: 'Products' },
  { src: '/products/IMG_9659.jpg', type: 'image', alt: 'Products' },
  { src: '/products/IMG_9660.jpg', type: 'image', alt: 'Products' },
  { src: '/products/IMG_9662.jpg', type: 'image', alt: 'Products' },
  { src: '/products/IMG_9665.jpg', type: 'image', alt: 'Products' },
  { src: '/products/IMG_9666.jpg', type: 'image', alt: 'Products' },
];

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
