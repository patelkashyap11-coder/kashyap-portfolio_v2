'use client';

import Image, { type ImageProps } from 'next/image';
import { imagekitImageLoader } from '@/lib/imagekitLoader';
import { isImageKitUrl } from '@/lib/imagekitUrl';
import { protectedImageProps } from '@/lib/mediaProtection';

type Props = Omit<ImageProps, 'loader'> & {
  src: string;
};

export function MediaImage({
  src,
  alt,
  priority = false,
  loading,
  unoptimized,
  ...props
}: Props) {
  const isImageKit = isImageKitUrl(src) || src.startsWith('/');
  const isSvg = /\.svg(\?|$)/i.test(src);

  return (
    <Image
      src={src}
      alt={alt}
      loader={isImageKit ? imagekitImageLoader : undefined}
      priority={priority}
      loading={priority ? undefined : loading ?? 'lazy'}
      unoptimized={unoptimized ?? (isSvg && !isImageKit)}
      {...protectedImageProps}
      {...props}
    />
  );
}

/** @deprecated Use MediaImage */
export const CloudinaryImage = MediaImage;
