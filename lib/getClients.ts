import cloudinary from './cloudinary';

const CLIENT_FOLDERS = ['client', 'clients'] as const;

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

type CloudinaryResource = {
  public_id: string;
  secure_url: string;
  resource_type?: string;
};

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

function mapResources(resources: CloudinaryResource[]): Client[] {
  return resources
    .filter((item) => !item.resource_type || item.resource_type === 'image')
    .map((item) => ({
      id: item.public_id,
      name: nameFromPublicId(item.public_id),
      logo: item.secure_url,
    }))
    .sort((a, b) => a.id.localeCompare(b.id));
}

async function listClientResources(): Promise<CloudinaryResource[]> {
  for (const folder of CLIENT_FOLDERS) {
    const attempts: Array<() => Promise<CloudinaryResource[]>> = [
      async () => {
        const result = await cloudinary.search
          .expression(`asset_folder:${folder}`)
          .sort_by('public_id', 'asc')
          .max_results(100)
          .execute();
        return result.resources;
      },
      async () => {
        const result = await cloudinary.search
          .expression(`folder:${folder}`)
          .sort_by('public_id', 'asc')
          .max_results(100)
          .execute();
        return result.resources;
      },
      async () => {
        const result = await cloudinary.api.resources({
          type: 'upload',
          prefix: `${folder}/`,
          max_results: 100,
        });
        return result.resources;
      },
    ];

    for (const attempt of attempts) {
      try {
        const resources = await attempt();
        if (resources.length > 0) return resources;
      } catch {
        // Try the next lookup strategy.
      }
    }
  }

  return [];
}

/** Client logos from Cloudinary folder `client/` or `clients/`. Name files e.g. `01-zara.png` for order + label. */
export async function getClients(): Promise<Client[]> {
  try {
    const resources = await listClientResources();
    const clients = mapResources(resources);
    return clients.length > 0 ? clients : FALLBACK_CLIENTS;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('getClients failed:', error);
    }
    return FALLBACK_CLIENTS;
  }
}
