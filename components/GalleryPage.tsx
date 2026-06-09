'use client';
import { useState, useCallback, useMemo, useLayoutEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ArrowLeft, Play, ChevronDown, ArrowUpRight } from 'lucide-react';
import type { FeaturedProjectMeta } from '@/lib/categoryData';
import { cloudinaryPreset, cloudinaryUrl } from '@/lib/cloudinaryUrl';
import {
  protectedImageProps,
  protectedMediaSurfaceProps,
  protectedVideoProps,
} from '@/lib/mediaProtection';

interface NextCategory {
  title: string;
  subtitle: string;
  href: string;
}

export interface MediaItem {
  src: string;
  type: 'image' | 'video';
  alt?: string;
  width?: number;
  height?: number;
  publicId?: string;
}

interface Props {
  title: string;
  subtitle: string;
  description: string;
  featuredMedia: MediaItem[];
  galleryMedia: MediaItem[];
  heroVideo?: string;
  heroImage?: string;
  featuredProjects?: FeaturedProjectMeta[];
  nextCategory?: NextCategory;
}

const EASE = [0.76, 0, 0.24, 1] as [number, number, number, number];

type ColumnEntry = { item: MediaItem; originalIndex: number };

/** Pinterest-style: place each pin in the shortest column */
function buildPinterestColumns(items: MediaItem[], columnCount: number, indexOffset: number): ColumnEntry[][] {
  const cols: ColumnEntry[][] = Array.from({ length: columnCount }, () => []);
  const heights = Array(columnCount).fill(0);

  items.forEach((item, i) => {
    const aspect = item.width && item.height ? item.height / item.width : 1.25;
    const gapShare = 0.12;

    let shortest = 0;
    for (let c = 1; c < columnCount; c++) {
      if (heights[c] < heights[shortest]) shortest = c;
    }

    cols[shortest].push({ item, originalIndex: indexOffset + i });
    heights[shortest] += aspect + gapShare;
  });

  return cols;
}

function isPortraitMedia(item: MediaItem): boolean {
  if (item.width && item.height) return item.height > item.width;
  return true;
}

function getPinterestColumnCount(width: number): number {
  if (width < 640) return 2;
  if (width < 1024) return 3;
  if (width < 1440) return 4;
  return 5;
}

function usePinterestColumnCount() {
  const [count, setCount] = useState(4);

  useLayoutEffect(() => {
    const update = () => setCount(getPinterestColumnCount(window.innerWidth));
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return count;
}

export function GalleryPage({
  title,
  subtitle,
  description,
  featuredMedia,
  galleryMedia,
  heroVideo,
  heroImage,
  featuredProjects = [],
  nextCategory,
}: Props) {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const media = useMemo(
    () => [...featuredMedia, ...galleryMedia],
    [featuredMedia, galleryMedia],
  );

  const open = useCallback((i: number) => setLightboxIdx(i), []);
  const close = useCallback(() => setLightboxIdx(null), []);
  const prev = useCallback(
    () => setLightboxIdx((i) => (i !== null ? (i - 1 + media.length) % media.length : null)),
    [media.length],
  );
  const next = useCallback(
    () => setLightboxIdx((i) => (i !== null ? (i + 1) % media.length : null)),
    [media.length],
  );

  const featuredCount = featuredMedia.length;
  const featuredItems = featuredMedia;
  const galleryItems = galleryMedia;
  const heroFallbackImage = heroImage || featuredMedia[0]?.src || galleryMedia[0]?.src;
  const heroFallbackImageSrc = heroFallbackImage
    ? cloudinaryPreset(heroFallbackImage, 'hero')
    : undefined;
  const columnCount = usePinterestColumnCount();
  const masonryColumns = useMemo(
    () => buildPinterestColumns(galleryItems, columnCount, featuredCount),
    [galleryItems, columnCount, featuredCount],
  );

  const heroTitle = title.replace(/ & /g, ' &\n');
  const heroTitleLong = title.length > 12;

  const scrollToFeatured = () => {
    document.getElementById('category-featured')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="gallery-page">
      {/* ── Section 1: Hero ── */}
      <section className="category-hero">
        <div className="category-hero-media" aria-hidden {...protectedMediaSurfaceProps}>
          {heroVideo ? (
            <video
              src={heroVideo}
              autoPlay
              muted
              loop
              playsInline
              className="category-hero-video"
              {...protectedVideoProps}
            />
          ) : heroFallbackImageSrc ? (
            <div
              className="category-hero-image"
              style={{ backgroundImage: `url(${heroFallbackImageSrc})` }}
              {...protectedMediaSurfaceProps}
            />
          ) : null}
          <div className="category-hero-overlay" />
        </div>

        <Link href="/" className="category-hero-back t-label">
          <ArrowLeft size={12} /> Back
        </Link>

        <div className="category-hero-content">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="category-hero-label t-label"
          >
            {subtitle}
          </motion.p>

          <div className="category-hero-title-wrap">
            <motion.h1
              initial={{ y: '110%' }}
              animate={{ y: 0 }}
              transition={{ duration: 1, ease: EASE }}
              className={`category-hero-title t-display${heroTitleLong ? ' category-hero-title--long' : ''}`}
            >
              {heroTitle}
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7, ease: EASE }}
            className="category-hero-description"
          >
            {description}
          </motion.p>
        </div>

        <button
          type="button"
          onClick={scrollToFeatured}
          className="category-hero-scroll"
          aria-label="Scroll to explore"
        >
          <span className="t-label">Scroll to explore</span>
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="category-hero-scroll-icon"
          >
            <ChevronDown size={18} strokeWidth={1.5} />
          </motion.span>
        </button>
      </section>

      {/* ── Section 2: Featured Work ── */}
      {featuredCount > 0 && (
        <section id="category-featured" className="category-featured">
          <div className="category-page-inner">
            <div className="category-section-header category-section-header--solo">
              <p className="t-label category-section-label">Featured Work</p>
            </div>

            <div className="category-featured-list">
            {featuredItems.map((item, i) => {
              const meta = featuredProjects[i];
              const isReversed = i % 2 === 1;

              return (
                <motion.article
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.85, ease: EASE }}
                  className="category-featured-item"
                >
                  <div className={`category-featured-index${isReversed ? ' category-featured-index--reverse' : ''}`}>
                    <p className="t-label category-featured-number">
                      {String(i + 1).padStart(2, '0')}
                    </p>
                    <span className="category-featured-index-line" aria-hidden />
                  </div>

                  <div
                    className={`category-featured-body${isReversed ? ' category-featured-body--reverse' : ''}${i < 3 && isPortraitMedia(item) ? ' category-featured-body--portrait' : ''}`}
                  >
                    <div className="category-featured-media">
                      <FeaturedMedia item={item} title={title} onOpen={() => open(i)} />
                    </div>

                    {meta && (
                      <div className="category-featured-copy">
                        <h2 className="category-featured-name">{meta.name}</h2>
                        <div className="category-featured-meta">
                          <span>{meta.client}</span>
                          <span className="category-featured-meta-dot" aria-hidden />
                          <span>{meta.year}</span>
                        </div>
                        <p className="category-featured-description">{meta.description}</p>
                      </div>
                    )}
                  </div>
                </motion.article>
              );
            })}
            </div>
          </div>
        </section>
      )}

      {/* ── Empty state ── */}
      {media.length === 0 && (
        <div className="category-empty">
          <div className="category-empty-icon" />
          <p className="category-empty-title">Gallery coming soon</p>
          <p className="category-empty-hint t-label">
            Content loading from Cloudinary
          </p>
        </div>
      )}

      {/* ── Section 3: Visual Gallery ── */}
      {galleryItems.length > 0 && (
        <section className="category-masonry-section">
          <div className="category-page-inner">
            <div className="category-section-header category-section-header--solo">
              <p className="t-label category-section-label">Visual Gallery</p>
            </div>

            <div className="category-masonry-scroll">
            <div className="category-masonry">
              {masonryColumns.map((col, colIndex) => (
                <div key={colIndex} className="category-masonry-col">
                  {col.map(({ item, originalIndex }) => (
                    <MasonryItem
                      key={originalIndex}
                      item={item}
                      index={originalIndex}
                      onOpen={open}
                      title={title}
                    />
                  ))}
                </div>
              ))}
            </div>
            </div>
          </div>
        </section>
      )}

      {nextCategory && (
        <section className="category-next">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="category-next-inner"
          >
            <p className="t-label category-next-label">Next</p>
            <Link href={nextCategory.href} className="category-next-link group">
              <span className="category-next-title">{nextCategory.title}</span>
              <ArrowUpRight
                size={15}
                strokeWidth={1.25}
                className="category-next-arrow"
                aria-hidden
              />
            </Link>
          </motion.div>
        </section>
      )}

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightboxIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="category-lightbox"
            onClick={close}
          >
            <p className="t-label category-lightbox-counter">
              {lightboxIdx + 1} / {media.length}
            </p>

            <button type="button" onClick={close} className="category-lightbox-close" aria-label="Close">
              <X size={16} />
            </button>

            <NavBtn side="left" onClick={(e) => { e.stopPropagation(); prev(); }} />

            <motion.div
              key={lightboxIdx}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.28 }}
              className="category-lightbox-media"
              onClick={(e) => e.stopPropagation()}
              {...protectedMediaSurfaceProps}
            >
              {media[lightboxIdx].type === 'video' ? (
                <video
                  src={cloudinaryUrl(media[lightboxIdx].src, { width: 1920 })}
                  controls
                  autoPlay
                  className="category-lightbox-asset"
                  {...protectedVideoProps}
                />
              ) : (
                <img
                  src={cloudinaryPreset(media[lightboxIdx].src, 'lightbox')}
                  alt={media[lightboxIdx].alt || title}
                  className="category-lightbox-asset"
                  {...protectedImageProps}
                />
              )}
            </motion.div>

            <NavBtn side="right" onClick={(e) => { e.stopPropagation(); next(); }} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Featured media block ── */
function FeaturedMedia({
  item,
  title,
  onOpen,
}: {
  item: MediaItem;
  title: string;
  onOpen: () => void;
}) {
  return (
    <button type="button" onClick={onOpen} className="category-featured-media-btn group" {...protectedMediaSurfaceProps}>
      {item.type === 'video' ? (
        <>
          <video
            src={cloudinaryUrl(item.src, { width: 1280 })}
            muted
            loop
            playsInline
            className="category-featured-asset group-hover:scale-[1.02]"
            onMouseEnter={(e) => (e.currentTarget as HTMLVideoElement).play()}
            onMouseLeave={(e) => (e.currentTarget as HTMLVideoElement).pause()}
            {...protectedVideoProps}
          />
          <div className="category-featured-play">
            <Play size={18} style={{ marginLeft: 2 }} />
          </div>
        </>
      ) : (
        <img
          src={cloudinaryPreset(item.src, 'featured')}
          alt={item.alt || title}
          loading="lazy"
          className="category-featured-asset group-hover:scale-[1.02]"
          {...protectedImageProps}
        />
      )}
    </button>
  );
}

/* ── Masonry item ── */
function MasonryItem({
  item,
  index,
  onOpen,
  title,
}: {
  item: MediaItem;
  index: number;
  onOpen: (i: number) => void;
  title: string;
}) {
  return (
    <div
      className="category-masonry-item group"
      onClick={() => onOpen(index)}
      {...protectedMediaSurfaceProps}
    >
      {item.type === 'video' ? (
        <>
          <video
            src={cloudinaryUrl(item.src, { width: 800 })}
            muted
            loop
            playsInline
            className="category-masonry-asset"
            onMouseEnter={(e) => (e.currentTarget as HTMLVideoElement).play()}
            onMouseLeave={(e) => (e.currentTarget as HTMLVideoElement).pause()}
            {...protectedVideoProps}
          />
          <div className="category-masonry-play">
            <Play size={14} style={{ marginLeft: 2 }} />
          </div>
        </>
      ) : (
        <img
          src={cloudinaryPreset(item.src, 'masonry')}
          alt={item.alt || ''}
          loading="lazy"
          decoding="async"
          width={item.width}
          height={item.height}
          sizes="(max-width: 639px) calc((100vw - 42px) / 2), (max-width: 1199px) calc((100vw - 80px) / 3), calc((100vw - 160px) / 5)"
          className="category-masonry-asset"
          {...protectedImageProps}
        />
      )}
    </div>
  );
}

/* ── Lightbox nav button ── */
function NavBtn({ side, onClick }: { side: 'left' | 'right'; onClick: (e: React.MouseEvent) => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`category-lightbox-nav category-lightbox-nav--${side}`}
      aria-label={side === 'left' ? 'Previous' : 'Next'}
    >
      {side === 'left' ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
    </button>
  );
}
