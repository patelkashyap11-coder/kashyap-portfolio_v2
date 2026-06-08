import Link from 'next/link';

export interface MobileCategory {
  title: string;
  subtitle: string;
  href: string;
  videoSrc?: string;
  imageSrc?: string;
  pillLabel: string;
}

interface Props {
  categories: MobileCategory[];
}

export function CategoryMobileShowcase({ categories }: Props) {
  return (
    <section className="category-mobile-showcase" aria-label="Work categories">
      <div className="category-mobile-stack">
        {categories.map((cat) => (
          <article key={cat.href} className="category-mobile-slide">
            <div className="category-mobile-media" aria-hidden>
              {cat.videoSrc ? (
                <video
                  src={cat.videoSrc}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="category-mobile-asset"
                />
              ) : (
                <div
                  className="category-mobile-asset category-mobile-image"
                  style={{
                    backgroundImage: cat.imageSrc ? `url(${cat.imageSrc})` : undefined,
                  }}
                />
              )}
              <div className="category-mobile-overlay" />
            </div>

            <div className="category-mobile-content">
              <h2 className="category-mobile-title">{cat.title}</h2>
              <p className="category-mobile-subtitle">{cat.subtitle}</p>
              <Link href={cat.href} className="category-pill">
                {cat.pillLabel}
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
