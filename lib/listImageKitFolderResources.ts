import type { FileObject } from 'imagekit/dist/libs/interfaces/FileDetails';
import { getImageKit } from './imagekit';
import { resolveImageKitFolder } from './imagekitFolders';

export type ImageKitListedResource = {
  public_id: string;
  secure_url: string;
  resource_type?: string;
  format?: string;
  created_at?: string;
  width?: number;
  height?: number;
};

type ListOptions = {
  folders: readonly string[];
  maxResults?: number;
  sortBy?: 'public_id' | 'created_at';
  sortDirection?: 'asc' | 'desc';
  exactFolder?: boolean;
};

function normalizeFolder(folder: string): string {
  return folder.replace(/^\/+|\/+$/g, '');
}

function sortKey(sortBy: 'public_id' | 'created_at', sortDirection: 'asc' | 'desc'): string {
  if (sortBy === 'created_at') {
    return sortDirection === 'desc' ? 'DESC_CREATED' : 'ASC_CREATED';
  }

  return sortDirection === 'desc' ? 'DESC_NAME' : 'ASC_NAME';
}

function folderSearchExpression(folder: string, exactFolder: boolean): string {
  const normalized = normalizeFolder(resolveImageKitFolder(folder));
  const path = `/${normalized}/`;
  return exactFolder ? `path = "${path}"` : `path:"${path}"`;
}

function isVideoFile(item: FileObject): boolean {
  if (item.mime?.startsWith('video/')) return true;
  return /\.(mp4|mov|webm|mkv)$/i.test(item.name);
}

function mapFileObject(item: FileObject): ImageKitListedResource {
  const extension = item.name.includes('.') ? item.name.split('.').pop() : undefined;

  return {
    public_id: item.filePath.replace(/^\//, ''),
    secure_url: item.url,
    resource_type: isVideoFile(item) ? 'video' : 'image',
    format: extension,
    created_at: item.createdAt,
    width: item.width,
    height: item.height,
  };
}

function sortListedResources(
  resources: ImageKitListedResource[],
  sortBy: 'public_id' | 'created_at',
  sortDirection: 'asc' | 'desc',
): ImageKitListedResource[] {
  const direction = sortDirection === 'asc' ? 1 : -1;

  return [...resources].sort((left, right) => {
    const leftValue = (sortBy === 'public_id' ? left.public_id : left.created_at) ?? '';
    const rightValue = (sortBy === 'public_id' ? right.public_id : right.created_at) ?? '';

    if (leftValue === rightValue) return 0;
    return leftValue < rightValue ? -direction : direction;
  });
}

/** List ImageKit assets using folder search queries. */
export async function listImageKitFolderResources({
  folders,
  maxResults = 100,
  sortBy = 'public_id',
  sortDirection = 'asc',
  exactFolder = false,
}: ListOptions): Promise<ImageKitListedResource[]> {
  const imagekit = getImageKit();
  const resources: ImageKitListedResource[] = [];
  const seen = new Set<string>();

  for (const folder of folders) {
    const result = await imagekit.listFiles({
      searchQuery: folderSearchExpression(folder, exactFolder),
      limit: Math.min(maxResults, 1000),
      sort: sortKey(sortBy, sortDirection),
    });

    for (const item of result) {
      if (!('fileId' in item) || item.type !== 'file') continue;
      if (seen.has(item.fileId)) continue;

      seen.add(item.fileId);
      resources.push(mapFileObject(item));
    }
  }

  return sortListedResources(resources, sortBy, sortDirection);
}
