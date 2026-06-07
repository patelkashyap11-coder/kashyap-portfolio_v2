import { GalleryPage } from '@/components/GalleryPage';
import { getGallery } from '@/lib/getGallery';

export default async function Page() {
  const media = await getGallery('interiors');

  return (
    <GalleryPage
      title="INTERIORS"
      subtitle="Interior Photography"
      description="Architectural and interior photography that highlights design, atmosphere and detail."
      media={media}
    />
  );
}
