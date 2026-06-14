import type { Metadata } from 'next';
import './site-fonts.css';
import './globals.css';
import './mobile.css';
import { Navbar } from '@/components/Navbar';
import { SiteStructuredData } from '@/components/StructuredData';
import { SmoothScroll } from '@/components/SmoothScroll';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { CRITICAL_FONT_PRELOADS } from '@/lib/criticalFonts';
import {
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  SITE_NAME,
  SITE_SHARE_DESCRIPTION,
  SITE_SHARE_TITLE,
  SITE_SHORT_DESCRIPTION,
  SITE_TITLE,
  SITE_URL,
} from '@/lib/site';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: SITE_KEYWORDS,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  applicationName: SITE_NAME,
  category: 'photography',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [{ url: '/icon', type: 'image/png', sizes: '32x32' }],
    apple: [{ url: '/apple-icon', type: 'image/png', sizes: '180x180' }],
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_SHARE_TITLE,
    description: SITE_SHARE_DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_SHARE_TITLE,
    description: SITE_SHARE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN">
      <head>
        {CRITICAL_FONT_PRELOADS.map((font) => (
          <link
            key={font.href}
            rel="preload"
            href={font.href}
            as="font"
            type={font.type}
            crossOrigin="anonymous"
          />
        ))}
      </head>
      <body>
        <SiteStructuredData />
        <SmoothScroll>
          <Navbar />
          <main>{children}</main>
        </SmoothScroll>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
