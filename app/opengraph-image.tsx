import { ImageResponse } from 'next/og';
import { BRAND, SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE, SITE_TITLE } from '@/lib/site';

export const alt = SITE_TITLE;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          background: BRAND.dark,
          color: BRAND.cream,
        }}
      >
        <div
          style={{
            fontSize: 28,
            fontWeight: 700,
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: BRAND.accent,
            fontFamily: 'Inter, Helvetica, Arial, sans-serif',
          }}
        >
          Portfolio
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div
            style={{
              fontSize: 92,
              fontWeight: 800,
              letterSpacing: '-0.04em',
              lineHeight: 0.92,
              textTransform: 'uppercase',
              fontFamily: 'Inter, Helvetica, Arial, sans-serif',
            }}
          >
            {SITE_NAME}
          </div>
          <div
            style={{
              width: 120,
              height: 6,
              background: BRAND.accent,
            }}
          />
          <div
            style={{
              fontSize: 34,
              lineHeight: 1.35,
              maxWidth: 760,
              color: 'rgba(245, 245, 242, 0.78)',
              fontFamily: 'Inter, Helvetica, Arial, sans-serif',
            }}
          >
            {SITE_TAGLINE}
          </div>
        </div>

        <div
          style={{
            fontSize: 24,
            lineHeight: 1.5,
            maxWidth: 820,
            color: 'rgba(245, 245, 242, 0.55)',
            fontFamily: 'Inter, Helvetica, Arial, sans-serif',
          }}
        >
          {SITE_DESCRIPTION}
        </div>
      </div>
    ),
    size,
  );
}
