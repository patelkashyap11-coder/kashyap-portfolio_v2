import fs from 'fs/promises';
import path from 'path';
import { unstable_cache } from 'next/cache';
import { cache } from 'react';
import { cloudinaryLogoUrl } from './cloudinaryUrl';
import { listCloudinaryFolderResources } from './listCloudinaryFolderResources';

export interface Client {
  id: string;
  name: string;
  logo: string | null;
}

const CLIENTS_FOLDER = 'clients';
const CLIENTS_DIR = path.join(process.cwd(), 'public', 'clients');
const IMAGE_EXT = /\.(png|jpe?g|svg|webp)$/i;

/** Strip Cloudinary upload hash suffixes, e.g. `01_Craftroots_gzl7kl` → `01_Craftroots`. */
function stripCloudinaryHash(filename: string): string {
  return filename
    .replace(IMAGE_EXT, '')
    .replace(/_[a-z0-9]{5,}$/i, '');
}

function nameFromFilename(filename: string): string {
  const base = stripCloudinaryHash(filename);
  const stripped = base
    .replace(/^\d+\s*/, '')
    .replace(/^\d+[-_]/, '')
    .replace(/\.[^.]+$/, '');

  return stripped
    .split(/[-_]/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(' ')
    .trim();
}

function sortKey(filename: string): string {
  const match = filename.match(/^(\d+)/);
  return match ? match[1].padStart(4, '0') : filename;
}

function basenameFromPublicId(publicId: string): string {
  return publicId.split('/').pop() ?? publicId;
}

function publicLogoPath(filename: string): string {
  return `/clients/${encodeURIComponent(filename)}`;
}

type CloudinaryClientResource = {
  public_id: string;
  secure_url: string;
  resource_type?: string;
};

async function listCloudinaryClientResources(): Promise<CloudinaryClientResource[]> {
  const resources = await listCloudinaryFolderResources({
    folders: [CLIENTS_FOLDER],
    maxResults: 50,
    sortBy: 'public_id',
    sortDirection: 'asc',
  });

  return resources.filter(
    (item) => !item.resource_type || item.resource_type === 'image',
  ) as CloudinaryClientResource[];
}

const getCachedCloudinaryClientResources = unstable_cache(
  listCloudinaryClientResources,
  ['cloudinary-clients'],
  { revalidate: 3600, tags: ['client-logos'] },
);

function mapCloudinaryClients(resources: CloudinaryClientResource[]): Client[] {
  const clients: Client[] = [];
  const seenNames = new Set<string>();

  for (const item of resources) {
    const basename = basenameFromPublicId(item.public_id);
    const name = nameFromFilename(basename) || basename;
    const dedupeKey = name.toLowerCase();

    if (seenNames.has(dedupeKey)) continue;
    seenNames.add(dedupeKey);

    clients.push({
      id: item.public_id,
      name,
      logo: cloudinaryLogoUrl(item.secure_url),
    });
  }

  return clients.sort((a, b) =>
    sortKey(stripCloudinaryHash(basenameFromPublicId(a.id))).localeCompare(
      sortKey(stripCloudinaryHash(basenameFromPublicId(b.id))),
    ),
  );
}

/** Fallback when Cloudinary `clients/` is empty or unavailable. */
async function getLocalClients(): Promise<Client[]> {
  try {
    const files = await fs.readdir(CLIENTS_DIR);

    return files
      .filter((file) => IMAGE_EXT.test(file))
      .sort((a, b) => sortKey(a).localeCompare(sortKey(b)))
      .map((filename) => ({
        id: filename,
        name: nameFromFilename(filename) || filename,
        logo: publicLogoPath(filename),
      }));
  } catch {
    return [];
  }
}

/**
 * Client logos from Cloudinary folder `clients/`.
 * Name uploads like `01 Craftroots.png`, `02 Gramshree.png` — same as local convention.
 * Falls back to `public/clients/` if the Cloudinary folder is empty.
 */
export const getClients = cache(async (): Promise<Client[]> => {
  try {
    const resources = await getCachedCloudinaryClientResources();
    const clients = mapCloudinaryClients(resources);

    if (clients.length > 0) {
      return clients;
    }
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[getClients] Cloudinary clients/ failed, trying public/clients/.');
      console.warn(error);
    }
  }

  const local = await getLocalClients();

  if (local.length === 0 && process.env.NODE_ENV === 'development') {
    console.warn(
      '[getClients] No logos found. Upload to Cloudinary folder `clients/` or add files to public/clients/.',
    );
  }

  return local;
});
