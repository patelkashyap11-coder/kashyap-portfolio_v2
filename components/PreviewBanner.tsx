import Link from 'next/link';

export function PreviewBanner() {
  return (
    <div className="preview-banner" role="status">
      <p className="preview-banner-text">
        <strong>Content preview</strong> — this is not the live site. Reviewing the{' '}
        <em>timeless</em> copy.
      </p>
      <Link href="/" className="preview-banner-link">
        View live site
      </Link>
    </div>
  );
}
