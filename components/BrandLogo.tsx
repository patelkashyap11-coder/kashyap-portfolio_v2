import { BRAND_LOGO, SITE_NAME } from '@/lib/site';

type Props = {
  className?: string;
  /** White wordmark for dark or high-contrast backgrounds (e.g. navbar over hero). */
  inverted?: boolean;
  /** Swap wordmarks on homepage, gallery, and contact pages when the OS uses dark mode. */
  themeAdaptive?: boolean;
  priority?: boolean;
};

const imgProps = {
  width: BRAND_LOGO.width,
  height: BRAND_LOGO.height,
  alt: SITE_NAME,
  decoding: 'async' as const,
};

export function BrandLogo({
  className = '',
  inverted = false,
  themeAdaptive = false,
  priority = false,
}: Props) {
  const sharedClass = `brand-logo${className ? ` ${className}` : ''}`;
  const loading = priority ? 'eager' as const : 'lazy' as const;
  const fetchPriority = priority ? 'high' as const : 'auto' as const;

  if (themeAdaptive) {
    return (
      <>
        {/* eslint-disable-next-line @next/next/no-img-element -- static local brand asset */}
        <img
          {...imgProps}
          src={BRAND_LOGO.src}
          className={`${sharedClass} brand-logo--theme-adaptive brand-logo--on-light`}
          loading={loading}
          fetchPriority={fetchPriority}
        />
        {/* eslint-disable-next-line @next/next/no-img-element -- static local brand asset */}
        <img
          {...imgProps}
          src={BRAND_LOGO.srcLight}
          className={`${sharedClass} brand-logo--theme-adaptive brand-logo--on-dark`}
          loading={loading}
          fetchPriority={fetchPriority}
        />
      </>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element -- static local brand asset
    <img
      {...imgProps}
      src={inverted ? BRAND_LOGO.srcLight : BRAND_LOGO.src}
      className={sharedClass}
      loading={loading}
      fetchPriority={fetchPriority}
    />
  );
}
