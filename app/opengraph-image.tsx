import { ImageResponse } from 'next/og';
import {
  getShareCollageDataUrls,
  SHARE_COLLAGE_CENTER_INDEX,
  SHARE_OG_CTA,
  SHARE_OG_SUBTITLE,
} from '@/lib/shareCollage';
import { BRAND, SITE_NAME, SITE_TAGLINE, SITE_TITLE } from '@/lib/site';

export const alt = SITE_TITLE;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpenGraphImage() {
  const images = await getShareCollageDataUrls();

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          background: BRAND.dark,
        }}
      >
        {images.map((src, index) => {
          const isCenter = index === SHARE_COLLAGE_CENTER_INDEX;

          return (
            <div
              key={index}
              style={{
                flex: 1,
                position: 'relative',
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

              {isCenter ? (
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(10, 10, 10, 0.52)',
                    color: BRAND.cream,
                    textAlign: 'center',
                    padding: '24px 12px',
                  }}
                >
                  <div
                    style={{
                      fontSize: 16,
                      fontWeight: 700,
                      letterSpacing: '0.16em',
                      textTransform: 'uppercase',
                      color: BRAND.accent,
                      fontFamily: 'Inter, Helvetica, Arial, sans-serif',
                      marginBottom: 10,
                    }}
                  >
                    {SITE_TAGLINE}
                  </div>

                  <div
                    style={{
                      fontSize: 24,
                      fontWeight: 800,
                      letterSpacing: '-0.02em',
                      lineHeight: 0.95,
                      textTransform: 'uppercase',
                      fontFamily: 'Inter, Helvetica, Arial, sans-serif',
                      marginBottom: 16,
                    }}
                  >
                    {SITE_NAME}
                  </div>

                  <div
                    style={{
                      fontSize: 30,
                      fontWeight: 800,
                      letterSpacing: '-0.02em',
                      lineHeight: 1,
                      fontFamily: 'Inter, Helvetica, Arial, sans-serif',
                      marginBottom: 10,
                    }}
                  >
                    {SHARE_OG_CTA}
                  </div>

                  <div
                    style={{
                      fontSize: 15,
                      fontWeight: 500,
                      letterSpacing: '0.04em',
                      lineHeight: 1.3,
                      color: 'rgba(245, 245, 242, 0.88)',
                      fontFamily: 'Inter, Helvetica, Arial, sans-serif',
                      textTransform: 'lowercase',
                    }}
                  >
                    {SHARE_OG_SUBTITLE}
                  </div>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    ),
    size,
  );
}
