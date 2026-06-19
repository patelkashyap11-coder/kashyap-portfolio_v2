import { ReelsPage } from '@/components/ReelsPage';
import { getReels } from '@/lib/getReels';
import { REELS_LOCKED } from '@/lib/reels';
import { getMotionMetadata } from '@/lib/seo';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export async function generateMetadata() {
  return getMotionMetadata();
}

export default async function Page() {
  const reels = REELS_LOCKED
    ? { vertical: [], horizontal: [] }
    : await getReels();

  return <ReelsPage reels={reels} locked={REELS_LOCKED} />;
}
