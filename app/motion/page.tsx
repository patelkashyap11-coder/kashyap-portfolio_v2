import { ReelsPage } from '@/components/ReelsPage';
import type { MediaItem } from '@/components/GalleryPage';
import { getReels } from '@/lib/getReels';
import { MOTION_HERO_YOUTUBE_URL, MOTION_YOUTUBE_VIDEOS } from '@/lib/motion';
import { REELS_LOCKED } from '@/lib/reels';
import { getMotionMetadata } from '@/lib/seo';
import { isYouTubeUrl } from '@/lib/youtube';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

function youtubeToMediaItem(url: string): MediaItem {
  return {
    src: url,
    type: 'video',
    width: 1920,
    height: 1080,
  };
}

export async function generateMetadata() {
  return getMotionMetadata();
}

export default async function Page() {
  const reels = REELS_LOCKED
    ? { vertical: [], horizontal: [] }
    : await getReels();

  const youtubeItems = MOTION_YOUTUBE_VIDEOS.filter(isYouTubeUrl).map(youtubeToMediaItem);

  return (
    <ReelsPage
      reels={{
        ...reels,
        youtube: youtubeItems,
      }}
      heroYouTubeUrl={MOTION_HERO_YOUTUBE_URL || undefined}
      locked={REELS_LOCKED}
    />
  );
}
