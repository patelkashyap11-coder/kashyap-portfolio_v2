import { getCategoryBySlug, getNextCategory } from './categoryData';
import { getFeaturedGallery, getGallery } from './getGallery';
import { splitFeaturedMedia } from './splitFeaturedMedia';

export async function getCategoryPageProps(slug: string) {
  const category = getCategoryBySlug(slug);
  if (!category) throw new Error(`Unknown category: ${slug}`);

  const [media, featuredFolderMedia] = await Promise.all([
    getGallery(slug),
    getFeaturedGallery(slug),
  ]);

  const { featuredMedia, galleryMedia } = splitFeaturedMedia(
    media,
    category.featuredProjects,
    featuredFolderMedia,
  );

  const next = getNextCategory(slug);

  return {
    category,
    featuredMedia,
    galleryMedia,
    nextCategory: {
      title: next.title,
      subtitle: next.subtitle,
      href: `/${next.slug}`,
    },
  };
}
