import { getImageKitUrlEndpoint } from './imagekit';

export type ImageKitVideoPreset =
  | 'hero'
  | 'hero-hd'
  | 'hero-mobile'
  | 'featured'
  | 'masonry'
  | 'lightbox';

const VIDEO_PRESETS: Record<
  ImageKitVideoPreset,
  { width: number; height?: number; quality: number }
> = {
  hero: { width: 1920, quality: 90 },
  'hero-hd': { width: 1920, height: 1080, quality: 90 },
  'hero-mobile': { width: 1080, quality: 90 },
  featured: { width: 1280, quality: 80 },
  masonry: { width: 800, quality: 80 },
  lightbox: { width: 1920, quality: 90 },
};

export type ImageKitPreset = 'featured' | 'masonry' | 'lightbox' | 'hero' | 'logo';

export const MEDIA_IMAGE_SIZES = {
  hero: '100vw',
  featured:
    '(max-width: 639px) 100vw, (max-width: 1199px) 50vw, 1200px',
  masonry:
    '(max-width: 639px) calc((100vw - 42px) / 2), (max-width: 1199px) calc((100vw - 80px) / 3), calc((100vw - 160px) / 5)',
  lightbox: '96vw',
  logo: '(max-width: 639px) 25vw, 120px',
  contactCard: '(max-width: 768px) 50vw, 20vw',
  categoryPoster: '100vw',
} as const;

/** @deprecated Use MEDIA_IMAGE_SIZES */
export const CLOUDINARY_IMAGE_SIZES = MEDIA_IMAGE_SIZES;

export const MEDIA_RESPONSIVE_WIDTH = {
  mobile: 400,
  tablet: 800,
  desktop: 1200,
} as const;

const WATERMARK_TEXT = '© Kashyap Patel';

const PRESETS: Record<
  ImageKitPreset,
  { width: number; watermark?: boolean; watermarkSize?: number }
> = {
  featured: { width: MEDIA_RESPONSIVE_WIDTH.desktop, watermark: true, watermarkSize: 14 },
  masonry: { width: MEDIA_RESPONSIVE_WIDTH.tablet, watermark: true, watermarkSize: 12 },
  lightbox: { width: MEDIA_RESPONSIVE_WIDTH.desktop, watermark: true, watermarkSize: 18 },
  hero: { width: MEDIA_RESPONSIVE_WIDTH.desktop, watermark: true, watermarkSize: 16 },
  logo: { width: MEDIA_RESPONSIVE_WIDTH.mobile, watermark: false },
};

export interface ImageKitTransformOptions {
  width?: number;
  height?: number;
  quality?: string | number;
  format?: string;
  crop?: string;
  watermark?: boolean;
  watermarkSize?: number;
}

const IMAGEKIT_HOST = /^https?:\/\/ik\.imagekit\.io\/[^/]+/;

export function isImageKitUrl(url: string): boolean {
  return url.includes('ik.imagekit.io');
}

export function capImageWidth(requested: number): number {
  if (requested <= MEDIA_RESPONSIVE_WIDTH.mobile) {
    return MEDIA_RESPONSIVE_WIDTH.mobile;
  }
  if (requested <= MEDIA_RESPONSIVE_WIDTH.tablet) {
    return MEDIA_RESPONSIVE_WIDTH.tablet;
  }
  return MEDIA_RESPONSIVE_WIDTH.desktop;
}

/** @deprecated Use capImageWidth */
export const capCloudinaryImageWidth = capImageWidth;

function watermarkLayer(fontSize: number): string {
  const text = WATERMARK_TEXT.replace(/ /g, '_');
  return `l-text,i-${text},fs-${fontSize},co-FFFFFF,o-32,lfo-bottom_right,lx-16,ly-16,l-end`;
}

function buildTransformString(options: ImageKitTransformOptions): string {
  const parts: string[] = [];

  if (options.width) parts.push(`w-${options.width}`);
  if (options.height) parts.push(`h-${options.height}`);
  parts.push(`c-${options.crop ?? 'at_max'}`);

  if (options.quality !== undefined) {
    parts.push(`q-${options.quality}`);
  }

  if (options.format) {
    parts.push(`f-${options.format}`);
  }

  if (options.watermark) {
    parts.push(watermarkLayer(options.watermarkSize ?? 14));
  }

  return parts.join(',');
}

function resolveAbsoluteUrl(urlOrPath: string): string {
  if (urlOrPath.startsWith('/') && !urlOrPath.startsWith('//')) {
    const endpoint = getImageKitUrlEndpoint();
    return endpoint ? `${endpoint}${urlOrPath}` : urlOrPath;
  }

  return urlOrPath;
}

function withPathTransforms(absoluteUrl: string, transform: string): string {
  const [base, query = ''] = absoluteUrl.split('?');
  const match = base.match(/^(https?:\/\/ik\.imagekit\.io\/[^/]+)(\/.*)$/);

  if (!match) return absoluteUrl;

  const [, origin, assetPath] = match;
  const transformed = `${origin}/tr:${transform}${assetPath}`;
  return query ? `${transformed}?${query}` : transformed;
}

/** Insert ImageKit delivery transforms without changing non-ImageKit URLs. */
export function imagekitUrl(
  urlOrPath: string,
  options: ImageKitTransformOptions = {},
): string {
  const absoluteUrl = resolveAbsoluteUrl(urlOrPath);
  if (!IMAGEKIT_HOST.test(absoluteUrl)) return urlOrPath;

  const transform = buildTransformString(options);
  if (!transform) return absoluteUrl;

  return withPathTransforms(absoluteUrl, transform);
}

export function imagekitPreset(urlOrPath: string, preset: ImageKitPreset): string {
  const { width, watermark = false, watermarkSize } = PRESETS[preset];
  return imagekitUrl(urlOrPath, {
    width: capImageWidth(width),
    quality: 'auto',
    format: 'auto',
    watermark,
    watermarkSize,
  });
}

/** Logo delivery — keep SVGs as vectors and skip watermark overlays. */
export function imagekitLogoUrl(urlOrPath: string): string {
  const absoluteUrl = resolveAbsoluteUrl(urlOrPath);
  const isSvg = /\.svg(\?|$)/i.test(absoluteUrl);

  if (isSvg) {
    return imagekitUrl(urlOrPath, {
      width: PRESETS.logo.width,
      format: 'svg',
      watermark: false,
    });
  }

  return imagekitPreset(urlOrPath, 'logo');
}

/** Deliver a compressed web-sized MP4 from an ImageKit video master. */
export function imagekitVideoUrl(
  urlOrPath: string,
  preset: ImageKitVideoPreset = 'hero',
): string {
  const { width, height, quality } = VIDEO_PRESETS[preset];
  return imagekitUrl(urlOrPath, {
    width,
    height,
    quality,
    crop: 'at_max',
  });
}

/** First-frame JPG poster for ImageKit videos (fixes blank/grey tiles on mobile). */
export function imagekitVideoPosterUrl(
  urlOrPath: string,
  preset: ImageKitVideoPreset = 'masonry',
): string {
  const absoluteUrl = resolveAbsoluteUrl(urlOrPath);
  if (!IMAGEKIT_HOST.test(absoluteUrl)) return urlOrPath;

  const { width } = VIDEO_PRESETS[preset];
  const thumbUrl = `${absoluteUrl.split('?')[0]}/ik-thumbnail.jpg`;

  return imagekitUrl(thumbUrl, {
    width: capImageWidth(width),
    quality: 'auto',
    format: 'auto',
  });
}
