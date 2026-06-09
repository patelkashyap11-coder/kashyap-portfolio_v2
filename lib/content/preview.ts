import { SITE_URL } from '@/lib/site';
import type { ContentVersionId } from '@/lib/content/types';

export const PREVIEW_TIMELESS_ID: ContentVersionId = 'timeless';

/** Share this link to review the new copy without changing the live site */
export const PREVIEW_TIMELESS_PATH = '/preview/timeless';

export const PREVIEW_TIMELESS_URL = `${SITE_URL}${PREVIEW_TIMELESS_PATH}`;

export function getPreviewBase(pathname: string | null | undefined): string | null {
  const match = pathname?.match(/^\/preview\/(timeless|visual-stories)/);
  return match ? `/preview/${match[1]}` : null;
}

export function withPreviewBase(base: string | null, path: string): string {
  if (!base) return path;
  return `${base}${path}`;
}

export function isPreviewHome(pathname: string | null | undefined, previewBase: string | null): boolean {
  return pathname === '/' || (!!previewBase && pathname === previewBase);
}
