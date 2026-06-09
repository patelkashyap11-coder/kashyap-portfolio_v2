import { GalleryPage } from '@/components/GalleryPage';
import { getContentVersion } from '@/lib/content';
import { getCategoryPageProps } from '@/lib/getCategoryPageProps';
import { PREVIEW_TIMELESS_PATH } from '@/lib/content/preview';
import { notFound } from 'next/navigation';

const PREVIEW_SLUGS = [
  'fashion',
  'food-hospitality',
  'jewellery',
  'products',
  'interiors',
] as const;

type PreviewSlug = (typeof PREVIEW_SLUGS)[number];

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export async function generateStaticParams() {
  return PREVIEW_SLUGS.map((slug) => ({ slug }));
}

export default async function TimelessPreviewCategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!PREVIEW_SLUGS.includes(slug as PreviewSlug)) notFound();

  const timelessContent = getContentVersion('timeless');
  const { category, featuredMedia, galleryMedia, nextCategory } = await getCategoryPageProps(
    slug,
    { linkBase: PREVIEW_TIMELESS_PATH, content: timelessContent },
  );

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
      homeHref={PREVIEW_TIMELESS_PATH}
    />
  );
}
