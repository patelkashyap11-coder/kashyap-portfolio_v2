import type { MediaItem } from '@/components/GalleryPage';
import { getGallery } from './getGallery';

export type ReelsCollection = {
  vertical: MediaItem[];
  horizontal: MediaItem[];
  youtube?: MediaItem[];
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
  const [verticalFolder, horizontalFolder, reelsFolder, reelFolder] =
    await Promise.all([
      getGallery('reels/vertical'),
      getGallery('reels/horizontal'),
      getGallery('reels'),
      getGallery('reel'),
    ]);

  const fallbackFolder = [...reelsFolder, ...reelFolder];

  const fallbackVideos = dedupeVideos(fallbackFolder.filter(isVideo));
  const verticalFromFolder = dedupeVideos(verticalFolder.filter(isVideo));
  const horizontalFromFolder = dedupeVideos(horizontalFolder.filter(isVideo));

  if (verticalFromFolder.length > 0 || horizontalFromFolder.length > 0) {
    return {
      vertical:
        verticalFromFolder.length > 0
          ? verticalFromFolder
          : fallbackVideos.filter(isPortrait),
      horizontal:
        horizontalFromFolder.length > 0
          ? horizontalFromFolder
          : fallbackVideos.filter((item) => !isPortrait(item)),
    };
  }

  return {
    vertical: fallbackVideos.filter(isPortrait),
    horizontal: fallbackVideos.filter((item) => !isPortrait(item)),
  };
}

function dedupeVideos(videos: MediaItem[]): MediaItem[] {
  const seen = new Set<string>();

  return videos.filter((item) => {
    const key = item.publicId ?? item.src;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
