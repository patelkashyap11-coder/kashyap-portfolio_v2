import fs from 'fs/promises';
import path from 'path';

/** Replace files in `public/share/` to change the WhatsApp / social link preview collage. */
export const SHARE_COLLAGE_FILES = [
  '1-fashion.jpg',
  '2-food.jpg',
  '3-jewellery.jpg',
  '4-products.jpg',
  '5-interiors.jpg',
] as const;

const SHARE_DIR = path.join(process.cwd(), 'public', 'share');

function mimeForFilename(filename: string): string {
  const ext = path.extname(filename).toLowerCase();
  if (ext === '.png') return 'image/png';
  if (ext === '.webp') return 'image/webp';
  return 'image/jpeg';
}

/** Center panel index (0-based) — overlay with name + CTA. */
export const SHARE_COLLAGE_CENTER_INDEX = 2;

export const SHARE_OG_CTA = "Let's Talk";

export const SHARE_OG_SUBTITLE = 'to create visual stories';

export async function getShareCollageDataUrls(): Promise<string[]> {
  const urls: string[] = [];

  for (const filename of SHARE_COLLAGE_FILES) {
    const filePath = path.join(SHARE_DIR, filename);
    const buffer = await fs.readFile(filePath);
    const mime = mimeForFilename(filename);
    urls.push(`data:${mime};base64,${buffer.toString('base64')}`);
  }

  return urls;
}
