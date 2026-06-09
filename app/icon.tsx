import { ImageResponse } from 'next/og';
import { BrandMark } from '@/lib/brandMark';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(<BrandMark letterSize={14} />, size);
}
