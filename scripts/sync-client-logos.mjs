import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { v2 as cloudinary } from 'cloudinary';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');
const outputPath = path.join(rootDir, 'data', 'client-logos.json');

const CLIENT_FOLDERS = ['clients', 'client'];

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
  if (!secureUrl.includes('res.cloudinary.com') || !secureUrl.includes('/upload/')) {
    return secureUrl;
  }

  const [base, assetPath] = secureUrl.split('/upload/');
  const versionMatch = assetPath.match(/(v\d+\/.+)$/);
  const asset = versionMatch ? versionMatch[1] : assetPath;
  const isSvg = /\.svg(\?|$)/i.test(secureUrl);
  const transforms = isSvg
    ? 'w_400,c_limit,q_auto:good,f_svg'
    : 'w_400,c_limit,q_auto:good,f_auto';

  return `${base}/upload/${transforms}/${asset}`;
}

async function listClientResources() {
  for (const folder of CLIENT_FOLDERS) {
    try {
      const result = await cloudinary.api.resources_by_asset_folder(folder, {
        max_results: 100,
      });

      if (result.resources?.length) {
        return result.resources;
      }
    } catch (error) {
      console.warn(`[sync-client-logos] asset folder "${folder}" failed:`, error.error?.message || error.message);
    }
  }

  for (const folder of CLIENT_FOLDERS) {
    try {
      const result = await cloudinary.search
        .expression(`asset_folder:${folder}`)
        .sort_by('public_id', 'asc')
        .max_results(100)
        .execute();

      if (result.resources?.length) {
        return result.resources;
      }
    } catch (error) {
      console.warn(`[sync-client-logos] search "${folder}" failed:`, error.error?.message || error.message);
    }
  }

  return [];
}

async function main() {
  await loadEnv();

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    throw new Error('Missing CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, or CLOUDINARY_API_SECRET');
  }

  const resources = await listClientResources();
  const clients = resources
    .filter((item) => !item.resource_type || item.resource_type === 'image')
    .map((item) => ({
      id: item.public_id,
      name: nameFromPublicId(item.public_id),
      logo: logoUrl(item.secure_url),
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
  console.error('[sync-client-logos] Failed:', error.error?.message || error.message || error);
  process.exit(1);
});
