import { GalleryPage } from '@/components/GalleryPage';
import { CategoryStructuredData } from '@/components/StructuredData';
import { getCategoryPageProps } from '@/lib/getCategoryPageProps';
import { getCategoryMetadata } from '@/lib/seo';

const SLUG = 'food-hospitality';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
  return getCategoryMetadata(SLUG);
}

export default async function Page() {
  const { category, featuredMedia, galleryMedia, nextCategory } = await getCategoryPageProps(SLUG);

  return (
    <>
      <CategoryStructuredData slug={SLUG} />
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
    </>
  );
}
