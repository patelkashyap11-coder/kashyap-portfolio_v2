import { GalleryPage } from '@/components/GalleryPage';
import type { MediaItem } from '@/components/GalleryPage';

// Add your actual files to /public/fashion/
// Example:
// const media: MediaItem[] = [
//   { src: '/fashion/photo-01.jpg', type: 'image', alt: 'FASHION' },
//   { src: '/fashion/video-01.mp4', type: 'video' },
// ];

const media: MediaItem[] = [
  { src: '/fashion/fashion-1.jpg', type: 'image', alt: 'Fashion' },
  { src: '/fashion/fashion-2.jpg', type: 'image', alt: 'Fashion' },
  { src: '/fashion/fashion-3.jpeg', type: 'image', alt: 'Fashion' },
  { src: '/fashion/fashion-4.jpg', type: 'image', alt: 'Fashion' },
  { src: '/fashion/fashion-5.jpg', type: 'image', alt: 'Fashion' },
  { src: '/fashion/fashion-6.jpg', type: 'image', alt: 'Fashion' },
];
export default function Page() {
  return (
    <GalleryPage
      title="FASHION"
      subtitle="Fashion Photography"
      description="Editorial campaigns, lookbooks and fashion storytelling that brings clothing to life."
      media={media}
    />
  );
}
