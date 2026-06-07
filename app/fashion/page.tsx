import { GalleryPage } from '@/components/GalleryPage';
import type { MediaItem } from '@/components/GalleryPage';

// Add your actual files to /public/fashion/
// Example:
// const media: MediaItem[] = [
//   { src: '/fashion/photo-01.jpg', type: 'image', alt: 'FASHION' },
//   { src: '/fashion/video-01.mp4', type: 'video' },
// ];

const media: MediaItem[] = [];

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
