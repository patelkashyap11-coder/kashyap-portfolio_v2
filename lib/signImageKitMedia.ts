import { stripImageKitTransforms, isImageKitUrl } from './imagekitUrl';
import { getImageKitUrlEndpoint } from './imagekit';

const LEGACY_HOMEPAGE_POSTER = /^\/homepage\/.+\.(jpe?g|png|webp)$/i;

function isImageKitMedia(urlOrPath: string): boolean {
  if (isImageKitUrl(urlOrPath)) return true;
  if (urlOrPath.startsWith('/') && getImageKitUrlEndpoint()) return true;
  return false;
}

/**
 * Deliver the original ImageKit MP4 without `tr:` transforms.
 * Transformed video URLs consume ImageKit video processing units and can hit plan limits.
 */
export function deliverImageKitVideoUrl(urlOrPath: string): string {
  if (!isImageKitMedia(urlOrPath)) return urlOrPath;
  return stripImageKitTransforms(urlOrPath);
}

/** Hero poster — only real images; skip `/ik-thumbnail.jpg` (also consumes video units). */
export function resolveSignedHeroPoster(
  imageSrc: string | undefined,
): string | undefined {
  if (imageSrc && !LEGACY_HOMEPAGE_POSTER.test(imageSrc)) {
    return imageSrc;
  }

  return undefined;
}
