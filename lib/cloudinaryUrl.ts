export type CloudinaryPreset = 'featured' | 'masonry' | 'lightbox' | 'hero' | 'logo';

const PRESETS: Record<CloudinaryPreset, { width: number }> = {
  featured: { width: 1600 },
  masonry: { width: 800 },
  lightbox: { width: 2400 },
  hero: { width: 1920 },
  logo: { width: 400 },
};

export interface CloudinaryTransformOptions {
  width?: number;
  height?: number;
  quality?: string | number;
  format?: string;
  crop?: string;
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
  return `${base}${transforms.join(',')}/${assetPath}`;
}

export function cloudinaryPreset(url: string, preset: CloudinaryPreset): string {
  const { width } = PRESETS[preset];
  return cloudinaryUrl(url, { width });
}
