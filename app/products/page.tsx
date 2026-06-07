import { GalleryPage } from '@/components/GalleryPage';
import { getGallery } from '@/lib/getGallery';

export default async function Page() {
  const media = await getGallery('products');

  return (
    <GalleryPage
      title="PRODUCTS"
      subtitle="Product Photography"
      description="Clean, commercial product imagery designed for brands, campaigns and e-commerce."
      media={media}
    />
  );
}
