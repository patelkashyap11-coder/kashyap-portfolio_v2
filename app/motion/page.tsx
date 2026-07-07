import { ReelsPage } from '@/components/ReelsPage';
import { MotionPasswordGate } from '@/components/MotionPasswordGate';
import type { MediaItem } from '@/components/GalleryPage';
import { getReels } from '@/lib/getReels';
import { fetchInstagramPreview, isInstagramUrl } from '@/lib/instagram';
import {
  MOTION_HERO_YOUTUBE_URL,
  MOTION_INSTAGRAM_REELS,
  MOTION_YOUTUBE_VIDEOS,
} from '@/lib/motion';
import { getMotionAccessFromCookies } from '@/lib/motionAccess';
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

async function instagramToMediaItem(url: string): Promise<MediaItem> {
  const preview = await fetchInstagramPreview(url);

  return {
    src: url,
    type: 'video',
    width: preview?.thumbnail_width ?? 1080,
    height: preview?.thumbnail_height ?? 1920,
    thumbnail: preview?.thumbnail_url,
  };
}

export async function generateMetadata() {
  return getMotionMetadata();
}

export default async function Page() {
  const hasAccess = await getMotionAccessFromCookies();

  if (!hasAccess) {
    return <MotionPasswordGate />;
  }

  const reels = REELS_LOCKED
    ? { vertical: [], horizontal: [] }
    : await getReels();

  const [youtubeItems, instagramItems] = await Promise.all([
    Promise.resolve(MOTION_YOUTUBE_VIDEOS.filter(isYouTubeUrl).map(youtubeToMediaItem)),
    Promise.all(
      MOTION_INSTAGRAM_REELS.filter(isInstagramUrl).map(instagramToMediaItem),
    ),
  ]);

  return (
    <ReelsPage
      reels={{
        ...reels,
        vertical: [...instagramItems, ...reels.vertical],
        youtube: youtubeItems,
      }}
      heroYouTubeUrl={MOTION_HERO_YOUTUBE_URL || undefined}
      locked={REELS_LOCKED}
    />
  );
}
