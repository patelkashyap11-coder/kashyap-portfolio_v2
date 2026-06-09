import fs from 'fs/promises';
import path from 'path';

export interface Client {
  id: string;
  name: string;
  logo: string | null;
}

const CLIENTS_DIR = path.join(process.cwd(), 'public', 'clients');
const IMAGE_EXT = /\.(png|jpe?g|svg|webp)$/i;

function nameFromFilename(filename: string): string {
  const base = filename.replace(IMAGE_EXT, '');
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

function publicLogoPath(filename: string): string {
  return `/clients/${encodeURIComponent(filename)}`;
}

/** Client logos from files in `public/clients/`. Name files e.g. `1 Brand Name.png`. */
export async function getClients(): Promise<Client[]> {
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
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(
        '[getClients] No logos found. Add PNG/SVG files to public/clients/.',
      );
      console.warn(error);
    }
    return [];
  }
}
