import type { MetadataRoute } from 'next';
import { REELS_LOCKED } from '@/lib/reels';
import { SITE_URL } from '@/lib/site';

const ROUTES = [
  '',
  '/fashion',
  '/food-hospitality',
  '/jewellery',
  '/products',
  '/interiors',
  ...(REELS_LOCKED ? [] : ['/reels']),
  '/contact',
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: path === '' ? 'weekly' : 'monthly',
    priority: path === '' ? 1 : 0.8,
  }));
}
