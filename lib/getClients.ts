import { unstable_cache } from 'next/cache';
import { cloudinaryLogoUrl } from './cloudinaryUrl';
import { listCloudinaryFolderResources } from './listCloudinaryFolderResources';

/** Cloudinary DAM folders checked for client logos, in priority order. */
const CLIENT_FOLDERS = ['clients', 'client'] as const;

export interface Client {
  id: string;
  name: string;
  logo: string | null;
}

function nameFromPublicId(publicId: string): string {
  const base = publicId.split('/').pop() ?? publicId;
  const stripped = base
    .replace(/^\d+[-_]/, '')
    .replace(/\.[^.]+$/, '')
    .replace(/_[a-z0-9]{5,}$/i, '');

  return stripped
    .split(/[-_]/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(' ');
}

function sortKey(publicId: string): string {
  const base = publicId.split('/').pop() ?? publicId;
  const orderMatch = base.match(/^(\d+)/);
  return orderMatch ? orderMatch[1].padStart(4, '0') : base;
}

async function fetchClientsFromCloudinary(): Promise<Client[]> {
  const resources = await listCloudinaryFolderResources({
    folders: CLIENT_FOLDERS,
    maxResults: 100,
    sortBy: 'public_id',
    sortDirection: 'asc',
  });

  return resources
    .filter((item) => !item.resource_type || item.resource_type === 'image')
    .map((item) => ({
      id: item.public_id,
      name: nameFromPublicId(item.public_id),
      logo: cloudinaryLogoUrl(item.secure_url),
    }))
    .sort((a, b) => sortKey(a.id).localeCompare(sortKey(b.id)));
}

const getCachedClients = unstable_cache(
  fetchClientsFromCloudinary,
  ['cloudinary-client-logos-v2'],
  { revalidate: 3600, tags: ['client-logos'] },
);

/** Client logos from Cloudinary DAM folder `clients/`. Name files e.g. `01-zara.png`. */
export async function getClients(): Promise<Client[]> {
  try {
    const clients = await getCachedClients();
    if (clients.length > 0) return clients;

    console.warn(
      `[getClients] No logos found in Cloudinary asset folders: ${CLIENT_FOLDERS.join(', ')}`,
    );
    return [];
  } catch (error) {
    console.error('[getClients] Cloudinary lookup failed:', error);
    return [];
  }
}
