'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
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
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const updateActiveFromScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track || track.children.length === 0) return;

    const slideWidth = track.clientWidth;
    if (slideWidth <= 0) return;

    const index = Math.round(track.scrollLeft / slideWidth);
    setActiveIndex(Math.min(Math.max(index, 0), categories.length - 1));
  }, [categories.length]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    updateActiveFromScroll();
    track.addEventListener('scroll', updateActiveFromScroll, { passive: true });
    window.addEventListener('resize', updateActiveFromScroll);

    return () => {
      track.removeEventListener('scroll', updateActiveFromScroll);
      window.removeEventListener('resize', updateActiveFromScroll);
    };
  }, [updateActiveFromScroll]);

  const scrollToIndex = (index: number) => {
    const track = trackRef.current;
    const slide = track?.children[index] as HTMLElement | undefined;
    if (!slide) return;

    slide.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
    setActiveIndex(index);
  };

  return (
    <section className="category-mobile-showcase" aria-label="Work categories">
      <div ref={trackRef} className="category-mobile-track">
        {categories.map((cat, index) => (
          <article
            key={cat.href}
            className="category-mobile-slide"
            aria-hidden={index !== activeIndex}
          >
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

              <div className="category-pill-scroll" role="tablist" aria-label="Browse categories">
                {categories.map((pill, pillIndex) => (
                  <button
                    key={pill.href}
                    type="button"
                    role="tab"
                    aria-selected={pillIndex === activeIndex}
                    className={`category-pill${pillIndex === activeIndex ? ' is-active' : ''}`}
                    onClick={() => scrollToIndex(pillIndex)}
                  >
                    {pill.pillLabel}
                  </button>
                ))}
              </div>

              <Link href={cat.href} className="category-mobile-cta">
                View Work
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
