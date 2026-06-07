import { GalleryPage } from '@/components/GalleryPage';
import type { MediaItem } from '@/components/GalleryPage';

// Add your actual files to /public/food-hospitality/
// Example:
// const media: MediaItem[] = [
//   { src: '/food-hospitality/photo-01.jpg', type: 'image', alt: 'FOOD & HOSPITALITY' },
//   { src: '/food-hospitality/video-01.mp4', type: 'video' },
// ];

const media: MediaItem[] = [];

export default function Page() {
  return (
    <GalleryPage
      title="FOOD & HOSPITALITY"
      subtitle="Food & Hospitality"
      description="Mouthwatering food photography and restaurant imagery that drives bookings and appetites."
      media={media}
    />
  );
}
