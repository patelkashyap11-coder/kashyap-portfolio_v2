import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import ImageKit from 'imagekit';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');
const outputDir = path.join(rootDir, 'public', 'homepage');

const IMAGEKIT_FOLDER = 'Home Page Videos';

const CATEGORY_SLUGS = new Set([
  'fashion',
  'food-hospitality',
  'jewellery',
  'products',
  'interiors',
]);

const SLUG_ALIASES = {
  food: 'food-hospitality',
  'food-hospitality': 'food-hospitality',
};

const OUTPUT_NAMES = {
  fashion: 'fashion.mp4',
  'food-hospitality': 'food.mp4',
  jewellery: 'jewellery.mp4',
  products: 'products.mp4',
  interiors: 'interiors.mp4',
};

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

function normalizeMediaKey(raw) {
  return raw
    .toLowerCase()
    .replace(/\.[^.]+$/, '')
    .replace(/_[a-z0-9]{5,}$/i, '')
    .replace(/^\d+[-_\s]+/, '')
    .replace(/_/g, '-')
    .trim();
}

function slugForMediaKey(key) {
  const normalized = normalizeMediaKey(key);
  const slug = SLUG_ALIASES[normalized] ?? normalized;
  if (CATEGORY_SLUGS.has(slug)) return slug;

  const slugs = [...CATEGORY_SLUGS].sort((left, right) => right.length - left.length);
  for (const categorySlug of slugs) {
    if (
      normalized === categorySlug ||
      normalized.startsWith(`${categorySlug}-`) ||
      normalized.endsWith(`-${categorySlug}`) ||
      normalized.includes(`-${categorySlug}-`) ||
      new RegExp(`^${categorySlug}\\d*$`).test(normalized)
    ) {
      return categorySlug;
    }
  }

  return null;
}

function formatBytes(bytes) {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

async function downloadVideo(privateKey, fileId) {
  const auth = Buffer.from(`${privateKey}:`).toString('base64');
  const response = await fetch(`https://api.imagekit.io/v1/files/${fileId}/download`, {
    headers: { Authorization: `Basic ${auth}` },
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Download failed (${response.status}): ${body.slice(0, 200)}`);
  }

  return Buffer.from(await response.arrayBuffer());
}

async function main() {
  await loadEnv();

  const urlEndpoint =
    process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT ?? process.env.IMAGEKIT_URL_ENDPOINT;
  const publicKey = process.env.IMAGEKIT_PUBLIC_KEY;
  const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;

  if (!urlEndpoint || !publicKey || !privateKey) {
    console.error('\nMissing ImageKit credentials in .env.local\n');
    process.exit(1);
  }

  const imagekit = new ImageKit({ urlEndpoint, publicKey, privateKey });
  const files = await imagekit.listFiles({
    searchQuery: `path = "/${IMAGEKIT_FOLDER}/"`,
    limit: 20,
    sort: 'DESC_CREATED',
  });

  const videos = files
    .filter((item) => item.type === 'file' && /\.mp4$/i.test(item.name))
    .map((item) => ({
      ...item,
      slug: slugForMediaKey(item.name),
    }))
    .filter((item) => item.slug);

  if (videos.length === 0) {
    console.error(`\nNo homepage videos found in ImageKit folder "${IMAGEKIT_FOLDER}/".\n`);
    process.exit(1);
  }

  await fs.mkdir(outputDir, { recursive: true });

  console.log(`\nSyncing ${videos.length} homepage video(s) from ImageKit → public/homepage/\n`);

  const usedSlugs = new Set();

  for (const video of videos) {
    if (usedSlugs.has(video.slug)) continue;
    usedSlugs.add(video.slug);

    const outputName = OUTPUT_NAMES[video.slug];
    if (!outputName) continue;

    const outputPath = path.join(outputDir, outputName);
    process.stdout.write(`  ${video.slug.padEnd(18)} ← ${video.name} ... `);

    const bytes = await downloadVideo(privateKey, video.fileId);
    await fs.writeFile(outputPath, bytes);

    console.log(`${formatBytes(bytes.length)} → ${path.relative(rootDir, outputPath)}`);
  }

  const missing = [...CATEGORY_SLUGS].filter((slug) => !usedSlugs.has(slug));
  if (missing.length > 0) {
    console.log(`\nMissing in ImageKit (still using existing file if present): ${missing.join(', ')}`);
  }

  console.log('\nDone. Run npm run dev and refresh the homepage.\n');
}

main().catch((error) => {
  console.error('\n[sync:homepage-videos] Failed:', error.message || error);
  process.exit(1);
});
