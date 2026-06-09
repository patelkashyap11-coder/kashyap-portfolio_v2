import type { SiteContent } from '@/lib/content/types';
import { getCategoryBySlug, getNextCategory } from './categoryData';
import { getFeaturedGallery, getGallery } from './getGallery';
import { resolveCategoryMedia } from './getHomepageMedia';
import { shuffleGallery } from './shuffleGallery';
import { splitFeaturedMedia } from './splitFeaturedMedia';

export async function getCategoryPageProps(
  slug: string,
  options?: { linkBase?: string; content?: SiteContent },
) {
  const category = getCategoryBySlug(slug, options?.content);
  if (!category) throw new Error(`Unknown category: ${slug}`);

  const [media, featuredFolderMedia, resolvedMedia] = await Promise.all([
    getGallery(slug),
    getFeaturedGallery(slug),
    resolveCategoryMedia(slug, {
      videoSrc: category.videoSrc,
      imageSrc: category.imageSrc,
    }),
  ]);

  const resolvedCategory = {
    ...category,
    videoSrc: resolvedMedia.videoSrc,
    imageSrc: resolvedMedia.imageSrc,
  };

  const { featuredMedia, galleryMedia } = splitFeaturedMedia(
    media,
    resolvedCategory.featuredProjects,
    featuredFolderMedia,
  );

  const next = getNextCategory(slug, options?.content);
  const linkBase = options?.linkBase ?? '';

  return {
    category: resolvedCategory,
    featuredMedia,
    galleryMedia: shuffleGallery(galleryMedia),
    nextCategory: {
      title: next.title,
      subtitle: next.subtitle,
      href: `${linkBase}/${next.slug}`,
    },
  };
}
