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

/** Instagram reel/post links — mixed into the Motion reels grid with ImageKit uploads. */
export const MOTION_INSTAGRAM_REELS: string[] = [
  'https://www.instagram.com/reel/DPi0jQdEQ5w/?igsh=ZjB6M2N3d2dqdjll',
  'https://www.instagram.com/reel/DL7cq4oBCTf/?igsh=MTF6NWJyZmdrZzUwOQ==',
  'https://www.instagram.com/reel/DMUdVDlTi1a/?igsh=MW8ydXFsYm1ncWpqeA==',
  'https://www.instagram.com/reel/DPbZuRUiCZr/?igsh=MTBrand5MmVnbXk4eA==',
];
