const YOUTUBE_ID_RE =
  /(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

export function parseYouTubeVideoId(url: string): string | null {
  const trimmed = url.trim();
  if (!trimmed) return null;

  const match = trimmed.match(YOUTUBE_ID_RE);
  return match?.[1] ?? null;
}

export function isYouTubeUrl(url: string): boolean {
  return parseYouTubeVideoId(url) !== null;
}

export function youtubeThumbnailUrl(
  videoIdOrUrl: string,
  quality: 'maxres' | 'hq' = 'maxres',
): string {
  const id = parseYouTubeVideoId(videoIdOrUrl) ?? videoIdOrUrl;
  const file = quality === 'maxres' ? 'maxresdefault.jpg' : 'hqdefault.jpg';
  return `https://img.youtube.com/vi/${id}/${file}`;
}

export function youtubeEmbedUrl(videoIdOrUrl: string, autoplay = false): string {
  const id = parseYouTubeVideoId(videoIdOrUrl) ?? videoIdOrUrl;
  const params = new URLSearchParams({
    autoplay: autoplay ? '1' : '0',
    rel: '0',
    modestbranding: '1',
    playsinline: '1',
  });

  try {
    const start = new URL(videoIdOrUrl).searchParams.get('t');
    if (start) {
      const seconds = start.endsWith('s') ? start.slice(0, -1) : start;
      if (/^\d+$/.test(seconds)) params.set('start', seconds);
    }
  } catch {
    // ignore invalid URLs
  }

  return `https://www.youtube-nocookie.com/embed/${id}?${params.toString()}`;
}

export function youtubeWatchUrl(videoIdOrUrl: string): string {
  const id = parseYouTubeVideoId(videoIdOrUrl) ?? videoIdOrUrl;
  return `https://www.youtube.com/watch?v=${id}`;
}
