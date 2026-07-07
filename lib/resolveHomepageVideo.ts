import { existsSync } from 'fs';
import path from 'path';

/** Basenames in `public/homepage/` for each category slug. */
const VIDEO_FILE_BASE: Record<string, string> = {
  fashion: 'fashion',
  'food-hospitality': 'food',
  jewellery: 'jewellery',
  products: 'products',
  interiors: 'interiors',
};

const homepageDir = () => path.join(process.cwd(), 'public', 'homepage');

export type HomepageVideoPaths = {
  desktop: string;
  mobile: string;
};

/** Local hero video paths — uses `-mobile.mp4` when that file exists. */
export function resolveHomepageVideoPaths(slug: string): HomepageVideoPaths {
  const base = VIDEO_FILE_BASE[slug] ?? slug;
  const desktop = `/homepage/${base}.mp4`;
  const mobileFile = `${base}-mobile.mp4`;
  const mobilePath = `/homepage/${mobileFile}`;

  return {
    desktop,
    mobile: existsSync(path.join(homepageDir(), mobileFile)) ? mobilePath : desktop,
  };
}
