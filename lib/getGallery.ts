import { unstable_cache } from 'next/cache';
import cloudinary from './cloudinary';
import type { MediaItem } from '@/components/GalleryPage';
import { PAGE_REVALIDATE_SECONDS } from './cacheConfig';

function mapResource(
  item: {
    secure_url: string;
    resource_type: string;
    public_id: string;
    width?: number;
    height?: number;
  },
  folder: string,
): MediaItem {
  return {
    src: item.secure_url,
    type: item.resource_type === 'video' ? 'video' : 'image',
    alt: folder,
    width: item.width,
    height: item.height,
    publicId: item.public_id,
  };
}

async function fetchGallery(folder: string): Promise<MediaItem[]> {
  const result = await cloudinary.search
    .expression(`folder:${folder}`)
    .sort_by('public_id', 'asc')
    .max_results(500)
    .execute();

  return result.resources.map(
    (item: {
      secure_url: string;
      resource_type: string;
      public_id: string;
      width?: number;
      height?: number;
    }) => mapResource(item, folder),
  );
}

async function fetchFeaturedGallery(folder: string): Promise<MediaItem[]> {
  const result = await cloudinary.search
    .expression(`folder:${folder}/featured`)
    .sort_by('public_id', 'asc')
    .max_results(3)
    .execute();

  return result.resources.map(
    (item: {
      secure_url: string;
      resource_type: string;
      public_id: string;
      width?: number;
      height?: number;
    }) => mapResource(item, folder),
  );
}

/** All images in a category folder (including subfolders). */
export async function getGallery(folder: string): Promise<MediaItem[]> {
  return unstable_cache(
    async () => fetchGallery(folder),
    ['cloudinary-gallery', folder],
    {
      revalidate: PAGE_REVALIDATE_SECONDS,
      tags: ['gallery', `gallery-${folder}`],
    },
  )();
}

/**
 * Featured project photos — upload to a `featured` subfolder in Cloudinary.
 * Name files 01-, 02-, 03- to control order (e.g. 01-editorial.jpg).
 */
export async function getFeaturedGallery(folder: string): Promise<MediaItem[]> {
  return unstable_cache(
    async () => fetchFeaturedGallery(folder),
    ['cloudinary-featured', folder],
    {
      revalidate: PAGE_REVALIDATE_SECONDS,
      tags: ['gallery', `gallery-featured-${folder}`],
    },
  )();
}
