import { GalleryPage } from '@/components/GalleryPage';
import { getCategoryPageProps } from '@/lib/getCategoryPageProps';

export const dynamic = 'force-dynamic';

export default async function Page() {
  const { category, featuredMedia, galleryMedia, nextCategory } = await getCategoryPageProps('interiors');

  return (
    <GalleryPage
      title={category.title}
      subtitle={category.subtitle}
      description={category.description}
      featuredMedia={featuredMedia}
      galleryMedia={galleryMedia}
      heroVideo={category.videoSrc}
      heroImage={category.imageSrc}
      featuredProjects={category.featuredProjects}
      nextCategory={nextCategory}
    />
  );
}
