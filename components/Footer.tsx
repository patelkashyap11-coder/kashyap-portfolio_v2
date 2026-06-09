'use client';
import Link from 'next/link';
import { SITE_TAGLINE } from '@/lib/site';

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <Link href="/" className="site-footer-logo logo-text">
          KASHYAP PATEL
        </Link>
        <p className="site-footer-tagline">
          {SITE_TAGLINE}
        </p>
      </div>
    </footer>
  );
}
