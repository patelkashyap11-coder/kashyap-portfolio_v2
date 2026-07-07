import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import ImageKit from 'imagekit';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');
const outputPath = path.join(rootDir, 'data', 'client-logos.json');

const CLIENT_FOLDERS = ['client'];

async function loadEnv() {
  const envPath = path.join(rootDir, '.env.local');
  try {
    const contents = await fs.readFile(envPath, 'utf8');
    for (const line of contents.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const index = trimmed.indexOf('=');
      if (index === -1) continue;
      const key = trimmed.slice(0, index).trim();
      const value = trimmed.slice(index + 1).trim().replace(/^['"]|['"]$/g, '');
      if (!process.env[key]) process.env[key] = value;
    }
  } catch {
    // .env.local is optional for CI if env vars are injected.
  }
}

function nameFromPublicId(publicId) {
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

function logoUrl(secureUrl) {
  if (!secureUrl.includes('ik.imagekit.io')) return secureUrl;

  const [base] = secureUrl.split('?');
  const match = base.match(/^(https?:\/\/ik\.imagekit\.io\/[^/]+)(\/.*)$/);
  if (!match) return secureUrl;

  const [, origin, assetPath] = match;
  const isSvg = /\.svg(\?|$)/i.test(secureUrl);
  const transforms = isSvg
    ? 'w-400,c-at_max,q-auto,f-svg'
    : 'w-400,c-at_max,q-auto,f-auto';

  return `${origin}/tr:${transforms}${assetPath}`;
}

async function listClientResources(imagekit) {
  for (const folder of CLIENT_FOLDERS) {
    try {
      const result = await imagekit.listFiles({
        searchQuery: `path = "/${folder}/"`,
        sort: 'ASC_NAME',
        limit: 100,
      });

      if (result.length) {
        return result.filter((item) => item.type === 'file');
      }
    } catch (error) {
      console.warn(`[sync-client-logos] folder "${folder}" failed:`, error.message || error);
    }
  }

  return [];
}

async function main() {
  await loadEnv();

  const urlEndpoint =
    process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT ?? process.env.IMAGEKIT_URL_ENDPOINT;
  const publicKey = process.env.IMAGEKIT_PUBLIC_KEY;
  const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;

  if (!urlEndpoint || !publicKey || !privateKey) {
    throw new Error(
      'Missing NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT, IMAGEKIT_PUBLIC_KEY, or IMAGEKIT_PRIVATE_KEY',
    );
  }

  const imagekit = new ImageKit({ urlEndpoint, publicKey, privateKey });
  const resources = await listClientResources(imagekit);
  const clients = resources
    .filter((item) => item.fileType === 'image')
    .map((item) => ({
      id: item.filePath.replace(/^\//, ''),
      name: nameFromPublicId(item.filePath),
      logo: logoUrl(item.url),
    }))
    .sort((a, b) => a.id.localeCompare(b.id));

  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, `${JSON.stringify(clients, null, 2)}\n`);

  console.log(`Synced ${clients.length} client logo(s) to data/client-logos.json`);
  for (const client of clients) {
    console.log(`- ${client.name}`);
  }
}

main().catch((error) => {
  console.error('[sync-client-logos] Failed:', error.message || error);
  process.exit(1);
});
