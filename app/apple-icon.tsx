import { ImageResponse } from 'next/og';
import { BrandMark } from '@/lib/brandMark';
import { getIconFonts } from '@/lib/iconFont';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default async function AppleIcon() {
  const fonts = await getIconFonts();

  return new ImageResponse(<BrandMark letterSize={68} fontFamily="Aboreto" />, {
    ...size,
    fonts,
  });
}
