import { GalleryPage } from '@/components/GalleryPage';
import type { MediaItem } from '@/components/GalleryPage';

// Add your actual files to /public/jewellery/
// Example:
// const media: MediaItem[] = [
//   { src: '/jewellery/photo-01.jpg', type: 'image', alt: 'JEWELLERY' },
//   { src: '/jewellery/video-01.mp4', type: 'video' },
// ];

const media: MediaItem[] = [];

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
