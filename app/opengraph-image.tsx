import { ImageResponse } from 'next/og';
import { getOgFonts, OG_FONT_LETS, OG_FONT_TALK } from '@/lib/ogFonts';
import {
  getShareCollageDataUrls,
  SHARE_OG_SUBTITLE,
} from '@/lib/shareCollage';
import { BRAND, SITE_TITLE } from '@/lib/site';

export const alt = SITE_TITLE;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const dynamic = 'force-dynamic';

const OG_WIDTH = size.width;
const OG_HEIGHT = size.height;

export default async function OpenGraphImage() {
  const [images, fonts] = await Promise.all([
    getShareCollageDataUrls(),
    getOgFonts(),
  ]);
  const letsFontFamily = fonts[0]?.name ?? OG_FONT_LETS;
  const talkFontFamily = fonts[1]?.name ?? OG_FONT_TALK;

  return new ImageResponse(
    (
      <div
        style={{
          position: 'relative',
          width: OG_WIDTH,
          height: OG_HEIGHT,
          display: 'flex',
          background: BRAND.dark,
        }}
      >
        <div
          style={{
            display: 'flex',
            width: OG_WIDTH,
            height: OG_HEIGHT,
          }}
        >
          {images.map((src, index) => (
            <div
              key={index}
              style={{
                flex: 1,
                display: 'flex',
                overflow: 'hidden',
                borderRight:
                  index < images.length - 1 ? '2px solid rgba(255,255,255,0.08)' : 'none',
              }}
            >
              <img
                src={src}
                alt=""
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                }}
              />
            </div>
          ))}
        </div>

        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: OG_WIDTH,
            height: OG_HEIGHT,
            display: 'flex',
            background: 'rgba(0, 0, 0, 0.6)',
          }}
        />

        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: OG_WIDTH,
            height: OG_HEIGHT,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: BRAND.cream,
            textAlign: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              justifyContent: 'center',
              lineHeight: 1,
              letterSpacing: '-0.02em',
              marginBottom: 18,
            }}
          >
            <span
              style={{
                display: 'flex',
                fontSize: 100,
                fontStyle: 'normal',
                fontWeight: 300,
                fontFamily: letsFontFamily,
              }}
            >
              Let&apos;s{' '}
            </span>
            <span
              style={{
                display: 'flex',
                fontSize: 100,
                fontStyle: 'italic',
                fontWeight: 500,
                fontFamily: talkFontFamily,
              }}
            >
              Talk
            </span>
          </div>

          <div
            style={{
              display: 'flex',
              fontSize: 18,
              fontWeight: 500,
              letterSpacing: '0.04em',
              lineHeight: 1.3,
              color: 'rgba(245, 245, 242, 0.92)',
              fontFamily: 'Inter, Helvetica, Arial, sans-serif',
              textTransform: 'lowercase',
            }}
          >
            {SHARE_OG_SUBTITLE}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts,
    },
  );
}
