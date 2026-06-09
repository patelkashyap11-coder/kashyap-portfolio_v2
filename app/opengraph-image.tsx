import { ImageResponse } from 'next/og';
import {
  BRAND,
  SITE_LOCATION,
  SITE_NAME,
  SITE_SHORT_DESCRIPTION,
  SITE_TAGLINE,
  SITE_TITLE,
} from '@/lib/site';

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
          padding: '80px',
          background: BRAND.dark,
          color: BRAND.cream,
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              fontSize: 24,
              fontWeight: 700,
              letterSpacing: '0.32em',
              textTransform: 'uppercase',
              color: BRAND.accent,
              fontFamily: 'Inter, Helvetica, Arial, sans-serif',
              marginBottom: 48,
            }}
          >
            Portfolio
          </div>

          <div
            style={{
              fontSize: 96,
              fontWeight: 800,
              letterSpacing: '-0.04em',
              lineHeight: 0.92,
              textTransform: 'uppercase',
              fontFamily: 'Inter, Helvetica, Arial, sans-serif',
              marginBottom: 28,
            }}
          >
            {SITE_NAME}
          </div>

          <div
            style={{
              width: 120,
              height: 6,
              background: BRAND.accent,
              marginBottom: 28,
            }}
          />

          <div
            style={{
              fontSize: 38,
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'rgba(245, 245, 242, 0.88)',
              fontFamily: 'Inter, Helvetica, Arial, sans-serif',
              marginBottom: 36,
            }}
          >
            {SITE_TAGLINE}
          </div>

          <div
            style={{
              fontSize: 28,
              lineHeight: 1.45,
              maxWidth: 900,
              color: 'rgba(245, 245, 242, 0.62)',
              fontFamily: 'Inter, Helvetica, Arial, sans-serif',
            }}
          >
            {SITE_SHORT_DESCRIPTION}
          </div>
        </div>

        <div
          style={{
            fontSize: 22,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'rgba(245, 245, 242, 0.42)',
            fontFamily: 'Inter, Helvetica, Arial, sans-serif',
          }}
        >
          {`${SITE_LOCATION.city}, ${SITE_LOCATION.country}`}
        </div>
      </div>
    ),
    size,
  );
}
