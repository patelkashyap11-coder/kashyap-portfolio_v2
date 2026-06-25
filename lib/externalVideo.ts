import { isInstagramUrl } from '@/lib/instagram';
import { isYouTubeUrl } from '@/lib/youtube';

export type ExternalVideoProvider = 'youtube' | 'instagram';

export function getExternalVideoProvider(
  url: string,
): ExternalVideoProvider | null {
  if (isYouTubeUrl(url)) return 'youtube';
  if (isInstagramUrl(url)) return 'instagram';
  return null;
}

export function isExternalVideoUrl(url: string): boolean {
  return getExternalVideoProvider(url) !== null;
}
