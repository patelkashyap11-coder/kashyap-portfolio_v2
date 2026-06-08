import type { FeaturedProjectMeta } from './categoryData';
import type { MediaItem } from '@/components/GalleryPage';

function itemLabel(item: MediaItem): string {
  return `${item.publicId ?? ''} ${item.src}`.toLowerCase();
}

/** Matches Cloudinary names like "project 1", "project-2", "project_3", "project1" */
function getProjectSlot(item: MediaItem): 1 | 2 | 3 | null {
  const label = itemLabel(item);

  if (/project[\s_-]?0?1(?:\D|$)/.test(label)) return 1;
  if (/project[\s_-]?0?2(?:\D|$)/.test(label)) return 2;
  if (/project[\s_-]?0?3(?:\D|$)/.test(label)) return 3;

  return null;
}

function matchesImage(media: MediaItem, key: string): boolean {
  return itemLabel(media).includes(key.toLowerCase());
}

function pickByProjectNames(
  media: MediaItem[],
  slots: number,
): { featuredMedia: MediaItem[]; usedSrcs: Set<string> } {
  const featuredMedia: MediaItem[] = [];
  const usedSrcs = new Set<string>();

  for (let slot = 1; slot <= slots; slot++) {
    const match = media.find(
      (item) => !usedSrcs.has(item.src) && getProjectSlot(item) === slot,
    );

    if (match) {
      featuredMedia.push(match);
      usedSrcs.add(match.src);
    }
  }

  return { featuredMedia, usedSrcs };
}

/**
 * Priority:
 * 1. Files renamed in Cloudinary as "project 1", "project 2", "project 3"
 * 2. Photos in `category/featured/` subfolder
 * 3. `image` filename in categoryData.ts
 * 4. First available photos
 */
export function splitFeaturedMedia(
  media: MediaItem[],
  featuredProjects: FeaturedProjectMeta[],
  featuredFolderMedia: MediaItem[] = [],
): { featuredMedia: MediaItem[]; galleryMedia: MediaItem[] } {
  const projectSlots = featuredProjects.slice(0, 3);
  const targetCount = Math.min(3, projectSlots.length, media.length);

  const byName = pickByProjectNames(media, targetCount);
  const featuredMedia = [...byName.featuredMedia];
  const usedSrcs = new Set(byName.usedSrcs);

  if (featuredMedia.length < targetCount && featuredFolderMedia.length > 0) {
    for (const item of featuredFolderMedia) {
      if (featuredMedia.length >= targetCount) break;
      if (usedSrcs.has(item.src)) continue;
      featuredMedia.push(item);
      usedSrcs.add(item.src);
    }
  }

  if (featuredMedia.length < targetCount) {
    for (const project of projectSlots) {
      if (featuredMedia.length >= targetCount) break;
      if (!project.image) continue;

      const match = media.find(
        (item) => !usedSrcs.has(item.src) && matchesImage(item, project.image!),
      );

      if (match) {
        featuredMedia.push(match);
        usedSrcs.add(match.src);
      }
    }
  }

  while (featuredMedia.length < targetCount) {
    const match = media.find((item) => !usedSrcs.has(item.src));
    if (!match) break;
    featuredMedia.push(match);
    usedSrcs.add(match.src);
  }

  const galleryMedia = media.filter((item) => !usedSrcs.has(item.src));

  return { featuredMedia, galleryMedia };
}
