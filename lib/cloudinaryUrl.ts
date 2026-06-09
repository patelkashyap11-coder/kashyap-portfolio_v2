export type CloudinaryPreset = 'featured' | 'masonry' | 'lightbox' | 'hero' | 'logo';

const WATERMARK_TEXT = '© Kashyap Patel';

const PRESETS: Record<
  CloudinaryPreset,
  { width: number; watermark?: boolean; watermarkSize?: number }
> = {
  featured: { width: 1600, watermark: true, watermarkSize: 14 },
  masonry: { width: 800, watermark: true, watermarkSize: 12 },
  lightbox: { width: 2400, watermark: true, watermarkSize: 18 },
  hero: { width: 1920, watermark: true, watermarkSize: 16 },
  logo: { width: 400, watermark: false },
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
  transforms.push(`q_${options.quality ?? 'auto:good'}`);

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
  return cloudinaryUrl(url, { width, watermark, watermarkSize });
}
