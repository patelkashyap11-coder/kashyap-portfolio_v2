import { GalleryPage } from '@/components/GalleryPage';
import type { MediaItem } from '@/components/GalleryPage';

// Add your actual files to /public/jewellery/
// Example:
// const media: MediaItem[] = [
//   { src: '/jewellery/photo-01.jpg', type: 'image', alt: 'JEWELLERY' },
//   { src: '/jewellery/video-01.mp4', type: 'video' },
// ];

const media: MediaItem[] = [
  { src: '/jewellery/RNS5578.jpg', type: 'image', alt: 'Jewellery' },
  { src: '/jewellery/RNS5733.jpg', type: 'image', alt: 'Jewellery' },
  { src: '/jewellery/RNS5911.jpg', type: 'image', alt: 'Jewellery' },
  { src: '/jewellery/RNS5938.jpg', type: 'image', alt: 'Jewellery' },
  { src: '/jewellery/RNS5941.jpg', type: 'image', alt: 'Jewellery' },
  { src: '/jewellery/SC00606.jpg', type: 'image', alt: 'Jewellery' },
  { src: '/jewellery/DSC01322.jpg', type: 'image', alt: 'Jewellery' },
  { src: '/jewellery/IMG_9905.jpg', type: 'image', alt: 'Jewellery' },
];

export default function Page() {
  return (
    <GalleryPage
      title="JEWELLERY"
      subtitle="Jewellery Photography"
      description="Precision lighting for fine jewellery — where every detail and sparkle tells a story."
      media={media}
    />
  );
}
