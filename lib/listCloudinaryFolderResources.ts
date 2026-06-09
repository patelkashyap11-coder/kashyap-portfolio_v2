import cloudinary from './cloudinary';

export type CloudinaryListedResource = {
  public_id: string;
  secure_url: string;
  resource_type?: string;
  format?: string;
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

/** List Cloudinary assets using the fewest Admin API calls possible. */
export async function listCloudinaryFolderResources({
  folders,
  maxResults = 100,
  sortBy = 'public_id',
  sortDirection = 'asc',
}: ListOptions): Promise<CloudinaryListedResource[]> {
  const folderExpression = folderSearchExpression(folders);

  try {
    const result = await cloudinary.search
      .expression(folderExpression)
      .sort_by(sortBy, sortDirection)
      .max_results(maxResults)
      .execute();

    if (result.resources?.length) {
      return result.resources;
    }
  } catch {
    // Fall through to asset_folder lookup.
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
