import type { FeaturedProjectMeta } from './categoryData';
import type { MediaItem } from '@/components/GalleryPage';

function itemLabel(item: MediaItem): string {
  return `${item.publicId ?? ''} ${item.src}`.toLowerCase();
}

/** Matches Cloudinary names like "project 1", "project-2", "project_3", "project1" */
function getProjectSlot(item: MediaItem): 1 | 2 | 3 | null {
  const label = itemLabel(item);

  if (/project[\s_-]?0?1(?![0-9])/.test(label)) return 1;
  if (/project[\s_-]?0?2(?![0-9])/.test(label)) return 2;
  if (/project[\s_-]?0?3(?![0-9])/.test(label)) return 3;

  return null;
}

function matchesImage(media: MediaItem, key: string): boolean {
  return itemLabel(media).includes(key.toLowerCase());
}

function assignSlot(
  slots: (MediaItem | null)[],
  index: number,
  item: MediaItem,
  usedSrcs: Set<string>,
): boolean {
  if (index < 0 || index >= slots.length || slots[index] || usedSrcs.has(item.src)) {
    return false;
  }

  slots[index] = item;
  usedSrcs.add(item.src);
  return true;
}

/**
 * Priority per slot (project 1 → index 0, project 2 → index 1, project 3 → index 2):
 * 1. Files renamed in Cloudinary as "project 1", "project 2", "project 3"
 * 2. Photos in `category/featured/` subfolder (01-, 02-, 03- order)
 * 3. Optional `image` filename in categoryData.ts
 *
 * Does not auto-fill empty slots from random gallery photos.
 */
export function splitFeaturedMedia(
  media: MediaItem[],
  featuredProjects: FeaturedProjectMeta[],
  featuredFolderMedia: MediaItem[] = [],
): { featuredMedia: (MediaItem | null)[]; galleryMedia: MediaItem[] } {
  const projectSlots = featuredProjects.slice(0, 3);
  const slotCount = Math.min(3, projectSlots.length);
  const slots: (MediaItem | null)[] = Array.from({ length: slotCount }, () => null);
  const usedSrcs = new Set<string>();

  for (let slot = 1; slot <= slotCount; slot++) {
    const match = media.find(
      (item) => !usedSrcs.has(item.src) && getProjectSlot(item) === slot,
    );

    if (match) assignSlot(slots, slot - 1, match, usedSrcs);
  }

  for (let i = 0; i < slotCount; i++) {
    if (slots[i]) continue;

    const folderItem = featuredFolderMedia[i];
    if (folderItem) assignSlot(slots, i, folderItem, usedSrcs);
  }

  for (let i = 0; i < slotCount; i++) {
    if (slots[i]) continue;

    const imageKey = projectSlots[i]?.image;
    if (!imageKey) continue;

    const match = media.find(
      (item) => !usedSrcs.has(item.src) && matchesImage(item, imageKey),
    );

    if (match) assignSlot(slots, i, match, usedSrcs);
  }

  const galleryMedia = media.filter((item) => !usedSrcs.has(item.src));

  return { featuredMedia: slots, galleryMedia };
}
