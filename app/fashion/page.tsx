import { GalleryPage } from '@/components/GalleryPage';
import { getGallery } from '@/lib/getGallery';

export default async function Page() {
  const media = await getGallery('fashion');

  return (
    <GalleryPage
      title="FASHION"
      subtitle="Fashion Photography"
      description="Editorial campaigns, lookbooks and fashion storytelling that brings clothing to life."
      media={media}
    />
  );
}
