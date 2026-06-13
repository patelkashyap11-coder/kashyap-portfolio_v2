import { cloudinaryPreset, isCloudinaryUrl } from './cloudinaryUrl';

/** Hero/poster delivery URL — same asset, web-sized when on Cloudinary. */
export function heroPosterUrl(src?: string): string | undefined {
  if (!src) return undefined;
  return isCloudinaryUrl(src) ? cloudinaryPreset(src, 'hero') : src;
}
