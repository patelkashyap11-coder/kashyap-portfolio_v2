import cloudinary from './cloudinary';

export type CloudinaryListedResource = {
  public_id: string;
  secure_url: string;
  resource_type?: string;
  format?: string;
  created_at?: string;
};

type ListOptions = {
  folders: readonly string[];
  maxResults?: number;
  sortBy?: 'public_id' | 'created_at';
  sortDirection?: 'asc' | 'desc';
};

function folderSearchExpression(folders: readonly string[]): string {
  return folders.map((folder) => `folder:${folder}`).join(' OR ');
}

function assetFolderSearchExpression(folders: readonly string[]): string {
  return folders.map((folder) => `asset_folder:${folder}`).join(' OR ');
}

function sortListedResources(
  resources: CloudinaryListedResource[],
  sortBy: 'public_id' | 'created_at',
  sortDirection: 'asc' | 'desc',
): CloudinaryListedResource[] {
  const direction = sortDirection === 'asc' ? 1 : -1;

  return [...resources].sort((left, right) => {
    const leftValue = left[sortBy] ?? '';
    const rightValue = right[sortBy] ?? '';

    if (leftValue === rightValue) return 0;
    return leftValue < rightValue ? -direction : direction;
  });
}

async function listByAssetFolderApi(
  folders: readonly string[],
  maxResults: number,
): Promise<CloudinaryListedResource[]> {
  for (const folder of folders) {
    try {
      const result = await cloudinary.api.resources_by_asset_folder(folder, {
        max_results: maxResults,
      });

      if (result.resources?.length) {
        return result.resources;
      }
    } catch {
      // Try the next asset folder.
    }
  }

  return [];
}

/** List Cloudinary assets using the fewest Admin API calls possible. */
export async function listCloudinaryFolderResources({
  folders,
  maxResults = 100,
  sortBy = 'public_id',
  sortDirection = 'asc',
}: ListOptions): Promise<CloudinaryListedResource[]> {
  const fromAssetFolderApi = await listByAssetFolderApi(folders, maxResults);
  if (fromAssetFolderApi.length > 0) {
    return sortListedResources(fromAssetFolderApi, sortBy, sortDirection);
  }

  try {
    const result = await cloudinary.search
      .expression(assetFolderSearchExpression(folders))
      .sort_by(sortBy, sortDirection)
      .max_results(maxResults)
      .execute();

    if (result.resources?.length) {
      return result.resources;
    }
  } catch {
    // Fall through to legacy folder lookup.
  }

  try {
    const result = await cloudinary.search
      .expression(folderSearchExpression(folders))
      .sort_by(sortBy, sortDirection)
      .max_results(maxResults)
      .execute();

    if (result.resources?.length) {
      return result.resources;
    }
  } catch {
    // Fall through to prefix lookup.
  }

  for (const folder of folders) {
    try {
      const result = await cloudinary.api.resources({
        type: 'upload',
        prefix: `${folder}/`,
        max_results: maxResults,
      });

      if (result.resources?.length) {
        return result.resources;
      }
    } catch {
      // Try the next folder prefix.
    }
  }

  return [];
}
