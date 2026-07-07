import { imagekitVideoPosterUrl } from './imagekitUrl';

const LEGACY_HOMEPAGE_POSTER = /^\/homepage\/.+\.(jpe?g|png|webp)$/i;

/** Legacy `/homepage/*.jpg` fallbacks are not shipped — use an ImageKit video frame instead. */
export function resolveHeroPosterSrc(
  imageSrc: string | undefined,
  videoSrc?: string,
): string | undefined {
  if (!imageSrc) {
    return videoSrc ? imagekitVideoPosterUrl(videoSrc, 'hero') : undefined;
  }

  if (LEGACY_HOMEPAGE_POSTER.test(imageSrc) && videoSrc) {
    return imagekitVideoPosterUrl(videoSrc, 'hero');
  }

  return imageSrc;
}

/** @deprecated Use resolveHeroPosterSrc — kept for call sites that only pass imageSrc. */
export function heroPosterUrl(src?: string): string | undefined {
  if (!src) return undefined;
  return src;
}
