import { unstable_cache } from 'next/cache';
import { cache } from 'react';
import { cloudinaryPreset, cloudinaryVideoUrl } from './cloudinaryUrl';
import { listCloudinaryFolderResources } from './listCloudinaryFolderResources';
import { categories } from './categoryData';

const HOMEPAGE_FOLDERS = ['homepage'] as const;

const CATEGORY_SLUGS = new Set(categories.map((category) => category.slug));

/** Map upload filenames like `food.mp4` to category slugs. */
const SLUG_ALIASES: Record<string, string> = {
  food: 'food-hospitality',
  'food-hospitality': 'food-hospitality',
};

export type HomepageMedia = {
  videoSrc?: string;
  imageSrc?: string;
};

export type HomepageMediaMap = Record<string, HomepageMedia>;

type CloudinaryResource = {
  public_id: string;
  secure_url: string;
  resource_type: string;
  created_at?: string;
};

function normalizeMediaKey(raw: string): string {
  return raw
    .toLowerCase()
    .replace(/\.[^.]+$/, '')
    .replace(/_[a-z0-9]{5,}$/i, '')
    .replace(/^\d+[-_\s]+/, '')
    .replace(/_/g, '-')
    .trim();
}

function slugForMediaKey(key: string): string | null {
  const normalized = normalizeMediaKey(key);
  const slug = SLUG_ALIASES[normalized] ?? normalized;
  return CATEGORY_SLUGS.has(slug) ? slug : null;
}

function slugFromPublicId(publicId: string): string | null {
  const segments = publicId.split('/');
  for (let i = segments.length - 1; i >= 0; i--) {
    const slug = slugForMediaKey(segments[i]);
    if (slug) return slug;
  }
  return slugForMediaKey(publicId);
}

async function listHomepageResources(): Promise<CloudinaryResource[]> {
  const resources = await listCloudinaryFolderResources({
    folders: HOMEPAGE_FOLDERS,
    maxResults: 30,
    sortBy: 'created_at',
    sortDirection: 'desc',
  });

  return resources as CloudinaryResource[];
}

const getCachedHomepageResources = unstable_cache(
  listHomepageResources,
  ['cloudinary-homepage-media-v2'],
  { revalidate: 300, tags: ['homepage-media'] },
);

/**
 * Homepage category backgrounds from Cloudinary folder `homepage/`.
 * Name uploads after the category slug, e.g. `fashion.mp4`, `food-hospitality.mp4`, `interiors.mp4`.
 * Falls back to `videoSrc` / `imageSrc` in categoryData when a file is missing.
 */
export const getHomepageMediaMap = cache(async (): Promise<HomepageMediaMap> => {
  try {
    const resources = [...(await getCachedHomepageResources())].sort((left, right) =>
      (right.created_at ?? '').localeCompare(left.created_at ?? ''),
    );
    const map: HomepageMediaMap = {};

    for (const item of resources) {
      const slug = slugFromPublicId(item.public_id);
      if (!slug) continue;

      if (!map[slug]) map[slug] = {};

      if (item.resource_type === 'video' && !map[slug].videoSrc) {
        map[slug].videoSrc = item.secure_url;
        continue;
      }

      if (item.resource_type === 'image' && !map[slug].imageSrc) {
        map[slug].imageSrc = cloudinaryPreset(item.secure_url, 'hero');
      }
    }

    return map;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('getHomepageMediaMap failed:', error);
    }
    return {};
  }
});

export async function resolveCategoryMedia(
  slug: string,
  fallback: { videoSrc: string; imageSrc: string },
): Promise<{ videoSrc: string; imageSrc: string }> {
  const map = await getHomepageMediaMap();
  const cloud = map[slug];

  return {
    videoSrc: cloudinaryVideoUrl(cloud?.videoSrc ?? fallback.videoSrc, 'hero'),
    imageSrc: cloud?.imageSrc ?? fallback.imageSrc,
  };
}
