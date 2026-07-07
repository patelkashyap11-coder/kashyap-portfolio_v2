import type { ImageLoaderProps } from 'next/image';
import {
  capImageWidth,
  imagekitUrl,
  isImageKitUrl,
  isLocalPublicAssetPath,
} from '@/lib/imagekitUrl';

/** next/image loader — caps delivery width and applies f-auto,q-auto. */
export function imagekitImageLoader({
  src,
  width,
  quality,
}: ImageLoaderProps): string {
  if (
    !isImageKitUrl(src) &&
    (!src.startsWith('/') || isLocalPublicAssetPath(src))
  ) {
    return src;
  }

  return imagekitUrl(src, {
    width: capImageWidth(width),
    quality: quality ?? 'auto',
    format: 'auto',
  });
}
