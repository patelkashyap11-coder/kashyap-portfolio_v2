import { timelessContent } from '@/lib/content/timeless';
import { visualStoriesContent } from '@/lib/content/visual-stories';
import type { ContentVersionId, SiteContent } from '@/lib/content/types';

/** Live site copy */
export const ACTIVE_CONTENT_ID: ContentVersionId = 'visual-stories';

/** New copy — share via /preview/timeless */
export const PREVIEW_CONTENT_ID: ContentVersionId = 'timeless';

/**
 * Live site is visual-stories. To swap live site to timeless, tell the agent:
 *   deploy timeless
 *
 * To restore visual-stories after that:
 *   deploy visual-stories
 */
export const CONTENT_RESTORE_COMMAND = 'deploy visual-stories';

const versions: Record<ContentVersionId, SiteContent> = {
  timeless: timelessContent,
  'visual-stories': visualStoriesContent,
};

export const siteContent = versions[ACTIVE_CONTENT_ID];

export function getContentVersion(id: ContentVersionId): SiteContent {
  return versions[id];
}

export function getCategoryCopy(slug: string, content: SiteContent = siteContent) {
  return content.categories[slug];
}
