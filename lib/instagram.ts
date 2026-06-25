const INSTAGRAM_RE =
  /instagram\.com\/(?:reels?|p|tv)\/([A-Za-z0-9_-]+)/i;

const INSTAGRAM_OG_HEADERS = {
  'User-Agent': 'facebookexternalhit/1.1',
  Accept: 'text/html,application/xhtml+xml',
};

const INSTAGRAM_OEMBED_HEADERS = {
  'User-Agent': 'Mozilla/5.0',
  Accept: 'application/json',
};

export function parseInstagramShortcode(url: string): string | null {
  const trimmed = url.trim();
  if (!trimmed) return null;

  const match = trimmed.match(INSTAGRAM_RE);
  return match?.[1] ?? null;
}

export function isInstagramUrl(url: string): boolean {
  return parseInstagramShortcode(url) !== null;
}

export function instagramEmbedUrl(url: string): string {
  const shortcode = parseInstagramShortcode(url);
  if (!shortcode) return url;

  const path = /\/p\//i.test(url) ? 'p' : 'reel';
  return `https://www.instagram.com/${path}/${shortcode}/embed`;
}

export function instagramWatchUrl(url: string): string {
  const shortcode = parseInstagramShortcode(url);
  if (!shortcode) return url;

  if (/\/p\//i.test(url)) {
    return `https://www.instagram.com/p/${shortcode}/`;
  }

  return `https://www.instagram.com/reel/${shortcode}/`;
}

type InstagramPreview = {
  thumbnail_url?: string;
  thumbnail_width?: number;
  thumbnail_height?: number;
};

function decodeHtmlEntities(value: string): string {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function parseOpenGraphPreview(html: string): InstagramPreview | null {
  const thumbnail = html.match(
    /property="og:image" content="([^"]+)"/i,
  )?.[1];
  if (!thumbnail) return null;

  const width = Number(
    html.match(/property="og:image:width" content="([^"]+)"/i)?.[1],
  );
  const height = Number(
    html.match(/property="og:image:height" content="([^"]+)"/i)?.[1],
  );

  return {
    thumbnail_url: decodeHtmlEntities(thumbnail),
    thumbnail_width: Number.isFinite(width) ? width : undefined,
    thumbnail_height: Number.isFinite(height) ? height : undefined,
  };
}

async function fetchInstagramOEmbed(url: string): Promise<InstagramPreview | null> {
  try {
    const res = await fetch(
      `https://api.instagram.com/oembed?url=${encodeURIComponent(url)}&omitscript=true`,
      {
        headers: INSTAGRAM_OEMBED_HEADERS,
        next: { revalidate: 86_400 },
      },
    );
    if (!res.ok) return null;

    const data = (await res.json()) as InstagramPreview;
    if (!data.thumbnail_url) return null;
    return data;
  } catch {
    return null;
  }
}

async function fetchInstagramOpenGraph(
  url: string,
): Promise<InstagramPreview | null> {
  try {
    const res = await fetch(instagramWatchUrl(url), {
      headers: INSTAGRAM_OG_HEADERS,
      next: { revalidate: 86_400 },
    });
    if (!res.ok) return null;

    const html = await res.text();
    return parseOpenGraphPreview(html);
  } catch {
    return null;
  }
}

/** Thumbnail + dimensions for Motion grid cards (server-side). */
export async function fetchInstagramPreview(
  url: string,
): Promise<InstagramPreview | null> {
  const openGraph = await fetchInstagramOpenGraph(url);
  if (openGraph?.thumbnail_url) return openGraph;

  return fetchInstagramOEmbed(url);
}
