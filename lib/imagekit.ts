import ImageKit from 'imagekit';

let client: ImageKit | null = null;

export function getImageKitUrlEndpoint(): string {
  return (
    process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT ??
    process.env.IMAGEKIT_URL_ENDPOINT ??
    ''
  ).replace(/\/$/, '');
}

export function getImageKit(): ImageKit {
  if (client) return client;

  const urlEndpoint = getImageKitUrlEndpoint();
  const publicKey = process.env.IMAGEKIT_PUBLIC_KEY;
  const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;

  if (!urlEndpoint || !publicKey || !privateKey) {
    throw new Error(
      'Missing ImageKit credentials. Set NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT, IMAGEKIT_PUBLIC_KEY, and IMAGEKIT_PRIVATE_KEY.',
    );
  }

  client = new ImageKit({ urlEndpoint, publicKey, privateKey });
  return client;
}
