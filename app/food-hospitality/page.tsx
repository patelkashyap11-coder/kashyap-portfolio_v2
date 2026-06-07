import { GalleryPage } from '@/components/GalleryPage';
import { getGallery } from '@/lib/getGallery';

export const dynamic = 'force-dynamic';

export default async function Page() {
  const media = await getGallery('food-hospitality');

  return (
    <GalleryPage
      title="FOOD & HOSPITALITY"
      subtitle="Food & Hospitality Photography"
      description="Capturing restaurants, hotels, cuisine and hospitality experiences with refined visual storytelling."
      media={media}
    />
  );
}
