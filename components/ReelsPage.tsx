'use client';

import { useState, useCallback, useMemo, useLayoutEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  Play,
  ChevronDown,
} from 'lucide-react';
import type { MediaItem } from '@/components/GalleryPage';
import type { ReelsCollection } from '@/lib/getReels';
import { cloudinaryVideoUrl } from '@/lib/cloudinaryUrl';
import {
  protectedMediaSurfaceProps,
  protectedVideoProps,
} from '@/lib/mediaProtection';

interface Props {
  reels: ReelsCollection;
  homeHref?: string;
  locked?: boolean;
}

const EASE = [0.76, 0, 0.24, 1] as [number, number, number, number];

type ColumnEntry = { item: MediaItem; originalIndex: number };

function buildPinterestColumns(
  items: MediaItem[],
  columnCount: number,
  indexOffset: number,
): ColumnEntry[][] {
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

function getColumnCount(width: number, portrait: boolean): number {
  if (portrait) {
    if (width < 640) return 2;
    if (width < 1024) return 3;
    if (width < 1440) return 4;
    return 5;
  }

  if (width < 640) return 2;
  if (width < 1024) return 3;
  if (width < 1440) return 4;
  return 5;
}

function useColumnCount(portrait: boolean) {
  const [count, setCount] = useState(4);

  useLayoutEffect(() => {
    const update = () => setCount(getColumnCount(window.innerWidth, portrait));
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [portrait]);

  return count;
}

function ReelsGrid({
  items,
  indexOffset,
  portrait,
  onOpen,
}: {
  items: MediaItem[];
  indexOffset: number;
  portrait: boolean;
  onOpen: (index: number) => void;
}) {
  const columnCount = useColumnCount(portrait);
  const columns = useMemo(
    () => buildPinterestColumns(items, columnCount, indexOffset),
    [items, columnCount, indexOffset],
  );

  return (
    <div className="category-masonry-scroll">
      <div className="category-masonry">
        {columns.map((col, colIndex) => (
          <div key={colIndex} className="category-masonry-col">
            {col.map(({ item, originalIndex }) => (
              <div
                key={originalIndex}
                className="category-masonry-item group"
                onClick={() => onOpen(originalIndex)}
                {...protectedMediaSurfaceProps}
              >
                <video
                  src={cloudinaryVideoUrl(item.src, 'masonry')}
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
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function NavBtn({
  side,
  onClick,
}: {
  side: 'left' | 'right';
  onClick: (e: React.MouseEvent) => void;
}) {
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

export function ReelsPage({ reels, homeHref = '/', locked = false }: Props) {
  const allReels = useMemo(
    () => (locked ? [] : [...reels.vertical, ...reels.horizontal]),
    [locked, reels.vertical, reels.horizontal],
  );
  const heroVideo = allReels[0]?.src;

  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const open = useCallback((i: number) => setLightboxIdx(i), []);
  const close = useCallback(() => setLightboxIdx(null), []);
  const prev = useCallback(
    () =>
      setLightboxIdx((i) =>
        i !== null ? (i - 1 + allReels.length) % allReels.length : null,
      ),
    [allReels.length],
  );
  const next = useCallback(
    () =>
      setLightboxIdx((i) =>
        i !== null ? (i + 1) % allReels.length : null,
      ),
    [allReels.length],
  );

  const scrollToReels = () => {
    document.getElementById('reels-vertical')?.scrollIntoView({ behavior: 'smooth' });
  };

  const hasReels = allReels.length > 0;

  return (
    <div className="gallery-page reels-page">
      <section className="category-hero">
        <div className="category-hero-media" aria-hidden {...protectedMediaSurfaceProps}>
          {heroVideo ? (
            <video
              src={cloudinaryVideoUrl(heroVideo, 'hero')}
              autoPlay
              muted
              loop
              playsInline
              className="category-hero-video"
              {...protectedVideoProps}
            />
          ) : (
            <div className="reels-hero-fallback" aria-hidden />
          )}
          <div className="category-hero-overlay" />
        </div>

        <Link href={homeHref} className="category-hero-back t-label">
          <ArrowLeft size={12} /> Back
        </Link>

        <div className="category-hero-content">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="category-hero-label t-label"
          >
            Film & Motion
          </motion.p>

          <div className="category-hero-title-wrap">
            <motion.h1
              initial={{ y: '110%' }}
              animate={{ y: 0 }}
              transition={{ duration: 1, ease: EASE }}
              className="category-hero-title t-display"
            >
              REELS
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7, ease: EASE }}
            className="category-hero-description"
          >
            Films for the phone, the screen, and everything in between. Shot vertical or wide,
            whatever suits the story.
          </motion.p>
        </div>

        {hasReels && !locked && (
          <button
            type="button"
            onClick={scrollToReels}
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
        )}
      </section>

      {locked && (
        <div className="category-empty reels-locked">
          <div className="reels-locked-icon" aria-hidden />
          <p className="category-empty-title">Reels coming soon</p>
          <p className="category-empty-hint t-label">
            This section is on the way. Check back shortly.
          </p>
        </div>
      )}

      {!locked && !hasReels && (
        <div className="category-empty">
          <div className="category-empty-icon" />
          <p className="category-empty-title">Reels coming soon</p>
          <p className="category-empty-hint t-label">
            Upload vertical videos to Cloudinary folder reels/vertical and horizontal to
            reels/horizontal
          </p>
        </div>
      )}

      {!locked && reels.vertical.length > 0 && (
        <section id="reels-vertical" className="category-masonry-section">
          <div className="category-page-inner">
            <div className="category-section-header category-section-header--solo">
              <p className="t-label category-section-label">Vertical</p>
              <p className="t-label category-section-count">{reels.vertical.length}</p>
            </div>

            <ReelsGrid
              items={reels.vertical}
              indexOffset={0}
              portrait
              onOpen={open}
            />
          </div>
        </section>
      )}

      {!locked && reels.horizontal.length > 0 && (
        <section id="reels-horizontal" className="category-masonry-section">
          <div className="category-page-inner">
            <div className="category-section-header category-section-header--solo">
              <p className="t-label category-section-label">Horizontal</p>
              <p className="t-label category-section-count">{reels.horizontal.length}</p>
            </div>

            <ReelsGrid
              items={reels.horizontal}
              indexOffset={reels.vertical.length}
              portrait={false}
              onOpen={open}
            />
          </div>
        </section>
      )}

      <AnimatePresence>
        {lightboxIdx !== null && allReels[lightboxIdx] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="category-lightbox"
            onClick={close}
          >
            <p className="t-label category-lightbox-counter">
              {lightboxIdx + 1} / {allReels.length}
            </p>

            <button
              type="button"
              onClick={close}
              className="category-lightbox-close"
              aria-label="Close"
            >
              <X size={16} />
            </button>

            <NavBtn
              side="left"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
            />

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
              <video
                src={cloudinaryVideoUrl(allReels[lightboxIdx].src, 'lightbox')}
                controls
                autoPlay
                className="category-lightbox-asset"
                {...protectedVideoProps}
              />
            </motion.div>

            <NavBtn
              side="right"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
