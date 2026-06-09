import { unstable_cache } from 'next/cache';
import { cloudinaryLogoUrl } from './cloudinaryUrl';
import { listCloudinaryFolderResources } from './listCloudinaryFolderResources';

/** Cloudinary folders checked for client logos, in priority order. */
const CLIENT_FOLDERS = [
  'clients',
  'client',
  'trusted-by',
  'trusted_by',
  'trusted',
  'logos',
  'brands',
] as const;

export interface Client {
  id: string;
  name: string;
  logo: string | null;
}

const FALLBACK_CLIENTS: Client[] = [
  { id: 'maison-noir', name: 'Maison Noir', logo: null },
  { id: 'velvet-line', name: 'Velvet Line', logo: null },
  { id: 'atelier-11', name: 'Atelier 11', logo: null },
  { id: 'ember-kitchen', name: 'Ember Kitchen', logo: null },
  { id: 'the-copper-room', name: 'The Copper Room', logo: null },
  { id: 'saffron-house', name: 'Saffron House', logo: null },
  { id: 'orion-fine', name: 'Orion Fine', logo: null },
  { id: 'lustre-co', name: 'Lustre Co.', logo: null },
  { id: 'form-studio', name: 'Form Studio', logo: null },
  { id: 'arc-space', name: 'Arc Space', logo: null },
  { id: 'north-co', name: 'North & Co.', logo: null },
  { id: 'studio-k', name: 'Studio K', logo: null },
  { id: 'axis-brands', name: 'Axis Brands', logo: null },
];

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
    .filter((item) => {
      if (item.resource_type && item.resource_type !== 'image') return false;
      return true;
    })
    .map((item) => ({
      id: item.public_id,
      name: nameFromPublicId(item.public_id),
      logo: cloudinaryLogoUrl(item.secure_url),
    }))
    .sort((a, b) => sortKey(a.id).localeCompare(sortKey(b.id)));
}

const getCachedClients = unstable_cache(
  fetchClientsFromCloudinary,
  ['cloudinary-client-logos'],
  { revalidate: 3600, tags: ['client-logos'] },
);

/** Client logos from Cloudinary folders such as `clients/` or `client/`. Name files e.g. `01-zara.png`. */
export async function getClients(): Promise<Client[]> {
  try {
    const clients = await getCachedClients();
    if (clients.length > 0) return clients;

    console.warn(
      `[getClients] No logos found in Cloudinary folders: ${CLIENT_FOLDERS.join(', ')}`,
    );
    return FALLBACK_CLIENTS;
  } catch (error) {
    console.error('[getClients] Cloudinary lookup failed:', error);
    return FALLBACK_CLIENTS;
  }
}
