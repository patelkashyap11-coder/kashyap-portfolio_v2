export type CloudinaryVideoPreset =
  | 'hero'
  | 'hero-hd'
  | 'hero-mobile'
  | 'featured'
  | 'masonry'
  | 'lightbox';

const VIDEO_PRESETS: Record<
  CloudinaryVideoPreset,
  { width: number; height?: number; quality: string }
> = {
  hero: { width: 1920, quality: 'auto:best' },
  /** Full HD web delivery from 4K masters — Cloudinary transcodes, site never serves the raw upload. */
  'hero-hd': { width: 1920, height: 1080, quality: 'auto:best' },
  /** Full-width category backgrounds on phones — 1080px for retina sharpness. */
  'hero-mobile': { width: 1080, quality: 'auto:best' },
  featured: { width: 1280, quality: 'auto:good' },
  masonry: { width: 800, quality: 'auto:good' },
  lightbox: { width: 1920, quality: 'auto:best' },
};

export type CloudinaryPreset = 'featured' | 'masonry' | 'lightbox' | 'hero' | 'logo';

/** Responsive delivery caps — images never exceed these widths. */
export const CLOUDINARY_RESPONSIVE_WIDTH = {
  mobile: 400,
  tablet: 800,
  desktop: 1200,
} as const;

export const CLOUDINARY_IMAGE_SIZES = {
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

export function capCloudinaryImageWidth(requested: number): number {
  if (requested <= CLOUDINARY_RESPONSIVE_WIDTH.mobile) {
    return CLOUDINARY_RESPONSIVE_WIDTH.mobile;
  }
  if (requested <= CLOUDINARY_RESPONSIVE_WIDTH.tablet) {
    return CLOUDINARY_RESPONSIVE_WIDTH.tablet;
  }
  return CLOUDINARY_RESPONSIVE_WIDTH.desktop;
}

const WATERMARK_TEXT = '© Kashyap Patel';

const PRESETS: Record<
  CloudinaryPreset,
  { width: number; watermark?: boolean; watermarkSize?: number }
> = {
  featured: { width: CLOUDINARY_RESPONSIVE_WIDTH.desktop, watermark: true, watermarkSize: 14 },
  masonry: { width: CLOUDINARY_RESPONSIVE_WIDTH.tablet, watermark: true, watermarkSize: 12 },
  lightbox: { width: CLOUDINARY_RESPONSIVE_WIDTH.desktop, watermark: true, watermarkSize: 18 },
  hero: { width: CLOUDINARY_RESPONSIVE_WIDTH.desktop, watermark: true, watermarkSize: 16 },
  logo: { width: CLOUDINARY_RESPONSIVE_WIDTH.mobile, watermark: false },
};

export interface CloudinaryTransformOptions {
  width?: number;
  height?: number;
  quality?: string | number;
  format?: string;
  crop?: string;
  watermark?: boolean;
  watermarkSize?: number;
}

const CLOUDINARY_UPLOAD =
  /^https?:\/\/res\.cloudinary\.com\/[^/]+\/(image|video)\/upload\/(.+)$/;

export function isCloudinaryUrl(url: string): boolean {
  return url.includes('res.cloudinary.com') && url.includes('/upload/');
}

function assetPathFromUploadSegment(path: string): string {
  const versionMatch = path.match(/(v\d+\/.+)$/);
  return versionMatch ? versionMatch[1] : path;
}

function buildSubtleWatermark(fontSize: number): string {
  const text = encodeURIComponent(WATERMARK_TEXT);
  return `l_text:Arial_${fontSize}:${text},co_rgb:FFFFFF,o_32,g_south_east,x_16,y_16`;
}

/** Insert Cloudinary delivery transforms without changing non-Cloudinary URLs. */
export function cloudinaryUrl(
  url: string,
  options: CloudinaryTransformOptions = {},
): string {
  if (!isCloudinaryUrl(url)) return url;

  const match = url.match(CLOUDINARY_UPLOAD);
  if (!match) return url;

  const [, resourceType, uploadPath] = match;
  const assetPath = assetPathFromUploadSegment(uploadPath);
  const transforms: string[] = [];

  if (options.width) transforms.push(`w_${options.width}`);
  if (options.height) transforms.push(`h_${options.height}`);
  transforms.push(`c_${options.crop ?? 'limit'}`);
  transforms.push(`q_${options.quality ?? 'auto'}`);

  if (resourceType === 'image') {
    transforms.push(`f_${options.format ?? 'auto'}`);
  }

  const base = url.slice(0, url.indexOf('/upload/') + '/upload/'.length);
  const delivery = transforms.join(',');

  if (resourceType === 'image' && options.watermark) {
    const size = options.watermarkSize ?? 14;
    return `${base}${delivery}/${buildSubtleWatermark(size)}/${assetPath}`;
  }

  return `${base}${delivery}/${assetPath}`;
}

export function cloudinaryPreset(url: string, preset: CloudinaryPreset): string {
  const { width, watermark = false, watermarkSize } = PRESETS[preset];
  return cloudinaryUrl(url, {
    width: capCloudinaryImageWidth(width),
    quality: 'auto',
    format: 'auto',
    watermark,
    watermarkSize,
  });
}

/** Logo delivery — keep SVGs as vectors and skip watermark overlays. */
export function cloudinaryLogoUrl(url: string): string {
  if (!isCloudinaryUrl(url)) return url;

  const isSvg = /\.svg(\?|$)/i.test(url) || url.includes('/upload/') && url.endsWith('.svg');
  if (isSvg) {
    return cloudinaryUrl(url, { width: PRESETS.logo.width, format: 'svg', watermark: false });
  }

  return cloudinaryPreset(url, 'logo');
}

/** Deliver a compressed H.264 MP4 from a Cloudinary video master (e.g. 100MB upload → web-sized stream). */
export function cloudinaryVideoUrl(
  url: string,
  preset: CloudinaryVideoPreset = 'hero',
): string {
  if (!isCloudinaryUrl(url)) return url;

  const match = url.match(CLOUDINARY_UPLOAD);
  if (!match) return url;

  const [, resourceType, uploadPath] = match;
  if (resourceType !== 'video') return url;

  const { width, height, quality } = VIDEO_PRESETS[preset];
  const assetPath = assetPathFromUploadSegment(uploadPath);
  const transforms = [
    `w_${width}`,
    ...(height ? [`h_${height}`] : []),
    'c_limit',
    `q_${quality}`,
    'vc_h264',
    'ac_aac',
    'f_mp4',
  ].join(',');

  const base = url.slice(0, url.indexOf('/upload/') + '/upload/'.length);
  return `${base}${transforms}/${assetPath}`;
}

/** First-frame JPG poster for Cloudinary videos (fixes blank/grey tiles on mobile). */
export function cloudinaryVideoPosterUrl(
  url: string,
  preset: CloudinaryVideoPreset = 'masonry',
): string {
  if (!isCloudinaryUrl(url)) return url;

  const match = url.match(CLOUDINARY_UPLOAD);
  if (!match) return url;

  const [, resourceType, uploadPath] = match;
  if (resourceType !== 'video') return url;

  const { width } = VIDEO_PRESETS[preset];
  const assetPath = assetPathFromUploadSegment(uploadPath);
  const posterPath = assetPath.replace(/\.(mp4|mov|webm|mkv)$/i, '.jpg');
  const transforms = [
    `w_${capCloudinaryImageWidth(width)}`,
    'c_limit',
    'q_auto',
    'f_auto',
    'so_0',
  ].join(',');

  const base = url.slice(0, url.indexOf('/upload/') + '/upload/'.length);
  return `${base}${transforms}/${posterPath}`;
}
