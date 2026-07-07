import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import ImageKit from 'imagekit';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');

const IMAGEKIT_FOLDER_MAP = {
  homepage: 'Home Page Videos',
  fashion: 'Fashion',
  'food-hospitality': 'Food',
  jewellery: 'Jewellery',
  products: 'Product',
  interiors: 'Interior',
  clients: 'client',
  reels: 'Reels',
  reel: 'Reels',
  'reels/vertical': 'Reels/vertical',
  'reels/horizontal': 'Reels/horizontal',
  playcards: 'Playcard',
};

function resolveImageKitFolder(folder) {
  if (folder.includes('/')) {
    const [parent, child] = folder.split('/', 2);
    const resolvedParent = IMAGEKIT_FOLDER_MAP[parent] ?? parent;
    return `${resolvedParent}/${child}`;
  }

  return IMAGEKIT_FOLDER_MAP[folder] ?? folder;
}

const FOLDERS_TO_CHECK = [
  'homepage',
  'clients',
  'fashion',
  'fashion/featured',
  'food-hospitality',
  'food-hospitality/featured',
  'jewellery',
  'jewellery/featured',
  'products',
  'products/featured',
  'interiors',
  'interiors/featured',
  'reels',
  'reels/vertical',
  'reels/horizontal',
  'playcards',
];

async function loadEnv() {
  const envPath = path.join(rootDir, '.env.local');
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
}

function isPlaceholder(value) {
  return !value || value.includes('your_imagekit_id');
}

async function listFolder(imagekit, folder) {
  const resolved = resolveImageKitFolder(folder);
  const result = await imagekit.listFiles({
    searchQuery: `path = "/${resolved}/"`,
    limit: 10,
    sort: 'ASC_NAME',
  });

  return result.filter((item) => item.type === 'file');
}

async function main() {
  await loadEnv();

  const urlEndpoint =
    process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT ?? process.env.IMAGEKIT_URL_ENDPOINT;
  const publicKey = process.env.IMAGEKIT_PUBLIC_KEY;
  const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;

  if (isPlaceholder(urlEndpoint) || !publicKey || !privateKey) {
    console.error('\nImageKit credentials are missing in .env.local\n');
    console.error('Add these from https://imagekit.io/dashboard/developer/api-keys :\n');
    console.error('  NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/YOUR_ID');
    console.error('  IMAGEKIT_PUBLIC_KEY=public_...');
    console.error('  IMAGEKIT_PRIVATE_KEY=private_...');
    console.error('\nThen run: npm run imagekit:check\n');
    process.exit(1);
  }

  const imagekit = new ImageKit({ urlEndpoint, publicKey, privateKey });

  console.log(`\nConnected to ${urlEndpoint}\n`);
  console.log('Folder check:\n');

  let totalFiles = 0;
  let emptyFolders = 0;

  for (const folder of FOLDERS_TO_CHECK) {
    try {
      const files = await listFolder(imagekit, folder);
      totalFiles += files.length;

      if (files.length === 0) {
        emptyFolders += 1;
        console.log(`  [empty]  ${folder}/`);
      } else {
        const names = files.map((file) => file.name).join(', ');
        const suffix = files.length >= 10 ? '…' : '';
        console.log(`  [${String(files.length).padStart(2)}]  ${folder}/  →  ${names}${suffix}`);
      }
    } catch (error) {
      console.log(`  [error]  ${folder}/  →  ${error.message || error}`);
    }
  }

  console.log(`\nFound ${totalFiles} file(s) across checked folders.`);

  if (emptyFolders > 0) {
    console.log(`${emptyFolders} folder(s) are empty — upload media there, or ignore if not needed yet.`);
  }

  console.log('\nNext: npm run dev  →  open http://localhost:3000\n');
}

main().catch((error) => {
  console.error('\n[imagekit:check] Failed:', error.message || error);
  process.exit(1);
});
