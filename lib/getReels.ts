import type { MediaItem } from '@/components/GalleryPage';
import { getGallery } from './getGallery';

export type ReelsCollection = {
  vertical: MediaItem[];
  horizontal: MediaItem[];
};

function isVideo(item: MediaItem): boolean {
  return item.type === 'video';
}

function isPortrait(item: MediaItem): boolean {
  if (item.width && item.height) return item.height > item.width;
  return true;
}

/** Videos from Cloudinary `reels/vertical` and `reels/horizontal`, with aspect-ratio fallback. */
export async function getReels(): Promise<ReelsCollection> {
  const [verticalFolder, horizontalFolder, fallbackFolder] = await Promise.all([
    getGallery('reels/vertical'),
    getGallery('reels/horizontal'),
    getGallery('reels'),
  ]);

  const verticalFromFolder = verticalFolder.filter(isVideo);
  const horizontalFromFolder = horizontalFolder.filter(isVideo);

  if (verticalFromFolder.length > 0 || horizontalFromFolder.length > 0) {
    return {
      vertical: verticalFromFolder,
      horizontal: horizontalFromFolder,
    };
  }

  const videos = fallbackFolder.filter(isVideo);

  return {
    vertical: videos.filter(isPortrait),
    horizontal: videos.filter((item) => !isPortrait(item)),
  };
}
