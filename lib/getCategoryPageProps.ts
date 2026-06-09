import { getCategoryBySlug, getNextCategory } from './categoryData';
import { getFeaturedGallery, getGallery } from './getGallery';
import { splitFeaturedMedia } from './splitFeaturedMedia';

function shuffleGallery<T>(items: T[]): T[] {
  const shuffled = [...items];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

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
    galleryMedia: shuffleGallery(galleryMedia),
    nextCategory: {
      title: next.title,
      subtitle: next.subtitle,
      href: `/${next.slug}`,
    },
  };
}
