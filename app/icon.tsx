import { ImageResponse } from 'next/og';
import { BrandMark } from '@/lib/brandMark';
import { getIconFonts } from '@/lib/iconFont';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default async function Icon() {
  const fonts = await getIconFonts();

  return new ImageResponse(<BrandMark letterSize={13} fontFamily="Aboreto" />, {
    ...size,
    fonts,
  });
}
