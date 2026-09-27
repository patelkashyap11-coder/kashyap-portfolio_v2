const LEGACY_HOMEPAGE_POSTER = /^\/homepage\/.+\.(jpe?g|png|webp)$/i;
const VIDEO_FILE = /\.(mp4|mov|webm|mkv)(\?|$)/i;

/**
 * Poster for a category hero. Missing `/homepage/*.jpg` files and video URLs
 * are not images — return nothing so the hero video can play on its own.
 */
export function resolveHeroPosterSrc(imageSrc: string | undefined): string | undefined {
  if (!imageSrc || LEGACY_HOMEPAGE_POSTER.test(imageSrc) || VIDEO_FILE.test(imageSrc)) {
    return undefined;
  }

  return imageSrc;
}

/** @deprecated Use resolveHeroPosterSrc — kept for call sites that only pass imageSrc. */
export function heroPosterUrl(src?: string): string | undefined {
  if (!src) return undefined;
  return src;
}
