import { GalleryPage } from '@/components/GalleryPage';
import type { MediaItem } from '@/components/GalleryPage';

// Add your actual files to /public/interiors/
// Example:
// const media: MediaItem[] = [
//   { src: '/interiors/photo-01.jpg', type: 'image', alt: 'INTERIORS & SPACES' },
//   { src: '/interiors/video-01.mp4', type: 'video' },
// ];

const media: MediaItem[] = [];

export default function Page() {
  return (
    <GalleryPage
      title="INTERIORS & SPACES"
      subtitle="Interiors & Architecture"
      description="Architectural and interior photography that captures the soul of a space."
      media={media}
    />
  );
}
