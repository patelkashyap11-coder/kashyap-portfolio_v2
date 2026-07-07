/**
 * Maps site folder slugs to actual ImageKit media library paths.
 * ImageKit folder names are case-sensitive.
 */
const IMAGEKIT_FOLDER_MAP: Record<string, string> = {
  homepage: 'Home Page Videos',
  fashion: 'Fashion',
  'food-hospitality': 'Food',
  jewellery: 'Jewellery',
  products: 'Product',
  interiors: 'Interior',
  clients: 'CLIENT ',
  reels: 'Reels',
  reel: 'Reels',
  'reels/vertical': 'Reels/vertical',
  'reels/horizontal': 'Reels/horizontal',
  playcards: 'Playcard',
};

export function resolveImageKitFolder(folder: string): string {
  if (folder.includes('/')) {
    const [parent, child] = folder.split('/', 2);
    const resolvedParent = IMAGEKIT_FOLDER_MAP[parent] ?? parent;
    return `${resolvedParent}/${child}`;
  }

  return IMAGEKIT_FOLDER_MAP[folder] ?? folder;
}
