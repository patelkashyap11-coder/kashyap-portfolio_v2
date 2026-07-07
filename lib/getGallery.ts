import { unstable_cache } from 'next/cache';
import type { MediaItem } from '@/components/GalleryPage';
import { PAGE_REVALIDATE_SECONDS } from './cacheConfig';
import { listImageKitFolderResources } from './listImageKitFolderResources';
import {
  deliverImageKitVideoUrl,
  resolveSignedHeroPoster,
} from './signImageKitMedia';

function mapResource(
  item: {
    secure_url: string;
    resource_type?: string;
    public_id: string;
    width?: number;
    height?: number;
  },
  folder: string,
): MediaItem {
  const isVideo = item.resource_type === 'video';

  return {
    src: isVideo ? deliverImageKitVideoUrl(item.secure_url) : item.secure_url,
    type: isVideo ? 'video' : 'image',
    alt: folder,
    width: item.width,
    height: item.height,
    publicId: item.public_id,
    lightboxSrc: isVideo ? deliverImageKitVideoUrl(item.secure_url) : undefined,
  };
}

async function fetchGallery(folder: string): Promise<MediaItem[]> {
  const resources = await listImageKitFolderResources({
    folders: [folder],
    maxResults: 500,
    sortBy: 'public_id',
    sortDirection: 'asc',
  });

  return resources.map((item) => mapResource(item, folder));
}

async function fetchFeaturedGallery(folder: string): Promise<MediaItem[]> {
  const resources = await listImageKitFolderResources({
    folders: [`${folder}/featured`],
    maxResults: 3,
    sortBy: 'public_id',
    sortDirection: 'asc',
    exactFolder: true,
  });

  return resources.map((item) => mapResource(item, folder));
}

/** All images in a category folder (including subfolders). */
export async function getGallery(folder: string): Promise<MediaItem[]> {
  return unstable_cache(
    async () => fetchGallery(folder),
    ['imagekit-gallery-v3', folder],
    {
      revalidate: PAGE_REVALIDATE_SECONDS,
      tags: ['gallery', `gallery-${folder}`],
    },
  )();
}

/**
 * Featured project photos — upload to a `featured` subfolder in ImageKit.
 * Name files 01-, 02-, 03- to control order (e.g. 01-editorial.jpg).
 */
export async function getFeaturedGallery(folder: string): Promise<MediaItem[]> {
  return unstable_cache(
    async () => fetchFeaturedGallery(folder),
    ['imagekit-featured-v3', folder],
    {
      revalidate: PAGE_REVALIDATE_SECONDS,
      tags: ['gallery', `gallery-featured-${folder}`],
    },
  )();
}
