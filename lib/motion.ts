/**
 * Motion page media — paste full YouTube watch or youtu.be links below.
 * Hero uses the video thumbnail; grid items open the embed in the lightbox.
 */
export const MOTION_HERO_YOUTUBE_URL =
  process.env.NEXT_PUBLIC_MOTION_HERO_YOUTUBE_URL?.trim() ?? '';

/** YouTube links for the Youtube gallery section (after Motion reels). */
export const MOTION_YOUTUBE_VIDEOS: string[] = [
  'https://www.youtube.com/watch?v=4_cmu6Xhrb8',
  'https://www.youtube.com/watch?v=lorz3wMFe84&t=54s',
  'https://www.youtube.com/watch?v=epdj08bRIrI',
];
