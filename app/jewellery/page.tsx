import { GalleryPage } from '@/components/GalleryPage';
import { getGallery } from '@/lib/getGallery';

export const dynamic = 'force-dynamic';

export default async function Page() {
  const media = await getGallery('jewellery');

  return (
    <GalleryPage
      title="JEWELLERY"
      subtitle="Jewellery Photography"
      description="Precision lighting for fine jewellery — where every detail and sparkle tells a story."
      media={media}
    />
  );
}
