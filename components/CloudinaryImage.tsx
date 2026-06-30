'use client';

import Image, { type ImageProps } from 'next/image';
import { cloudinaryImageLoader } from '@/lib/cloudinaryLoader';
import { isCloudinaryUrl } from '@/lib/cloudinaryUrl';
import { protectedImageProps } from '@/lib/mediaProtection';

type Props = Omit<ImageProps, 'loader'> & {
  src: string;
};

export function CloudinaryImage({
  src,
  alt,
  priority = false,
  loading,
  unoptimized,
  ...props
}: Props) {
  const isCloudinary = isCloudinaryUrl(src);
  const isSvg = /\.svg(\?|$)/i.test(src);

  return (
    <Image
      src={src}
      alt={alt}
      loader={isCloudinary ? cloudinaryImageLoader : undefined}
      priority={priority}
      loading={priority ? undefined : loading ?? 'lazy'}
      unoptimized={unoptimized ?? (isSvg && !isCloudinary)}
      {...protectedImageProps}
      {...props}
    />
  );
}
