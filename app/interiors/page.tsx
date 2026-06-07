import { GalleryPage } from '@/components/GalleryPage';
import type { MediaItem } from '@/components/GalleryPage';

// Add your actual files to /public/interiors/
// Example:
// const media: MediaItem[] = [
//   { src: '/interiors/photo-01.jpg', type: 'image', alt: 'INTERIORS & SPACES' },
//   { src: '/interiors/video-01.mp4', type: 'video' },
// ];

const media: MediaItem[] = [
  { src: '/interiors/DSC02369-HDR.jpg', type: 'image', alt: 'Interiors' },
  { src: '/interiors/IMG_0380.jpg', type: 'image', alt: 'Interiors' },
  { src: '/interiors/IMG_0396.jpg', type: 'image', alt: 'Interiors' },
  { src: '/interiors/IMG_0398.jpg', type: 'image', alt: 'Interiors' },
  { src: '/interiors/IMG_0421.jpg', type: 'image', alt: 'Interiors' },
  { src: '/interiors/IMG_0585.jpg', type: 'image', alt: 'Interiors' },
  { src: '/interiors/IMG_2175.jpg', type: 'image', alt: 'Interiors' },
  { src: '/interiors/IMG_7388.jpg', type: 'image', alt: 'Interiors' },
  { src: '/interiors/IMG_8800.jpg', type: 'image', alt: 'Interiors' },
  { src: '/interiors/IMG_8808.jpg', type: 'image', alt: 'Interiors' },
];

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
