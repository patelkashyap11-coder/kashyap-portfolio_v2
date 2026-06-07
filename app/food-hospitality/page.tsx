import { GalleryPage } from '@/components/GalleryPage';
import type { MediaItem } from '@/components/GalleryPage';

// Add your actual files to /public/food-hospitality/
// Example:
// const media: MediaItem[] = [
//   { src: '/food-hospitality/photo-01.jpg', type: 'image', alt: 'FOOD & HOSPITALITY' },
//   { src: '/food-hospitality/video-01.mp4', type: 'video' },
// ];

const media: MediaItem[] = [
  { src: '/food-hospitality/IMG_0112.jpg', type: 'image', alt: 'Food & Hospitality' },
  { src: '/food-hospitality/IMG_1456.jpg', type: 'image', alt: 'Food & Hospitality' },
  { src: '/food-hospitality/IMG_2215.jpg', type: 'image', alt: 'Food & Hospitality' },
  { src: '/food-hospitality/KAS00052.jpg', type: 'image', alt: 'Food & Hospitality' },
  { src: '/food-hospitality/KAS00100.jpg', type: 'image', alt: 'Food & Hospitality' },
  { src: '/food-hospitality/KAS00305.jpg', type: 'image', alt: 'Food & Hospitality' },
];
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
