'use client';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <Link href="/" className="site-footer-logo logo-text">
          KASHYAP PATEL
        </Link>
        <p className="site-footer-tagline">
          Photographer &amp; Filmmaker
        </p>
      </div>
    </footer>
  );
}
