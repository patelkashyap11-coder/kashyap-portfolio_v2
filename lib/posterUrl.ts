import { cloudinaryVideoPosterUrl } from './cloudinaryUrl';

const LEGACY_HOMEPAGE_POSTER = /^\/homepage\/.+\.(jpe?g|png|webp)$/i;

/** Legacy `/homepage/*.jpg` fallbacks are not shipped — use a Cloudinary video frame instead. */
export function resolveHeroPosterSrc(
  imageSrc: string | undefined,
  videoSrc?: string,
): string | undefined {
  if (!imageSrc) {
    return videoSrc ? cloudinaryVideoPosterUrl(videoSrc, 'hero') : undefined;
  }

  if (LEGACY_HOMEPAGE_POSTER.test(imageSrc) && videoSrc) {
    return cloudinaryVideoPosterUrl(videoSrc, 'hero');
  }

  return imageSrc;
}

/** @deprecated Use resolveHeroPosterSrc — kept for call sites that only pass imageSrc. */
export function heroPosterUrl(src?: string): string | undefined {
  if (!src) return undefined;
  return src;
}
