import type { ImageLoaderProps } from 'next/image';
import {
  capCloudinaryImageWidth,
  cloudinaryUrl,
  isCloudinaryUrl,
} from '@/lib/cloudinaryUrl';

/** next/image loader — caps delivery width and applies f_auto,q_auto. */
export function cloudinaryImageLoader({
  src,
  width,
  quality,
}: ImageLoaderProps): string {
  if (!isCloudinaryUrl(src)) return src;

  return cloudinaryUrl(src, {
    width: capCloudinaryImageWidth(width),
    quality: quality ?? 'auto',
    format: 'auto',
  });
}
