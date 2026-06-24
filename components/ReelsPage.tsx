'use client';

import { useState, useCallback, useMemo, useLayoutEffect, useRef } from 'react';
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
import { cloudinaryVideoUrl, cloudinaryVideoPosterUrl } from '@/lib/cloudinaryUrl';
import {
  isYouTubeUrl,
  youtubeEmbedUrl,
  youtubeThumbnailUrl,
} from '@/lib/youtube';
import {
  protectedMediaSurfaceProps,
  protectedVideoProps,
} from '@/lib/mediaProtection';
import { GalleryFooter } from '@/components/GalleryFooter';

interface Props {
  reels: ReelsCollection;
  homeHref?: string;
  locked?: boolean;
  /** YouTube watch / youtu.be link — hero shows the video thumbnail. */
  heroYouTubeUrl?: string;
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
  if (!portrait) {
    return 1;
  }

  if (width < 640) return 2;
  if (width < 1024) return 3;
  if (width < 1440) return 4;
  return 5;
}

function mediaAspectRatio(item: MediaItem): string | undefined {
  if (item.width && item.height) return `${item.width} / ${item.height}`;
  return undefined;
}

function useColumnCount(portrait: boolean) {
  const [count, setCount] = useState(() => {
    if (typeof window === 'undefined') return portrait ? 2 : 1;
    return getColumnCount(window.innerWidth, portrait);
  });

  useLayoutEffect(() => {
    const update = () => setCount(getColumnCount(window.innerWidth, portrait));
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [portrait]);

  return count;
}

function useHoverPreviewEnabled() {
  const [enabled, setEnabled] = useState(false);

  useLayoutEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    const update = () => setEnabled(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return enabled;
}

function ReelGridItem({
  item,
  originalIndex,
  portrait,
  onOpen,
  hoverPreviewEnabled,
}: {
  item: MediaItem;
  originalIndex: number;
  portrait: boolean;
  onOpen: (index: number) => void;
  hoverPreviewEnabled: boolean;
}) {
  const itemRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const aspectRatio = mediaAspectRatio(item) ?? (portrait ? '9 / 16' : '16 / 9');
  const isYouTube = isYouTubeUrl(item.src);
  const posterSrc = isYouTube
    ? youtubeThumbnailUrl(item.src)
    : cloudinaryVideoPosterUrl(item.src, 'masonry');
  const itemStyle = { aspectRatio };

  const playPreview = useCallback(() => {
    if (!hoverPreviewEnabled) return;
    const video = videoRef.current;
    if (!video) return;

    setIsPlaying(true);
    void video.play().catch(() => setIsPlaying(false));
  }, [hoverPreviewEnabled]);

  const pausePreview = useCallback(() => {
    if (!hoverPreviewEnabled) return;
    const video = videoRef.current;
    if (!video) return;

    video.pause();
    setIsPlaying(false);
  }, [hoverPreviewEnabled]);

  useLayoutEffect(() => {
    if (hoverPreviewEnabled || isYouTube) return;

    const itemEl = itemRef.current;
    const video = videoRef.current;
    if (!itemEl || !video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void video.play().catch(() => setIsPlaying(false));
        } else {
          video.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.55 },
    );

    observer.observe(itemEl);
    return () => observer.disconnect();
  }, [hoverPreviewEnabled, isYouTube]);

  const openLightbox = useCallback(() => {
    onOpen(originalIndex);
  }, [onOpen, originalIndex]);

  const handleTouchStart = useCallback((event: React.TouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0];
    if (!touch) return;
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  }, []);

  const handleTouchEnd = useCallback(
    (event: React.TouchEvent<HTMLDivElement>) => {
      const touch = event.changedTouches[0];
      const start = touchStartRef.current;
      touchStartRef.current = null;
      if (!touch || !start) return;

      const moved =
        Math.abs(touch.clientX - start.x) > 12 ||
        Math.abs(touch.clientY - start.y) > 12;
      if (!moved) openLightbox();
    },
    [openLightbox],
  );

  return (
    <div
      ref={itemRef}
      className={`category-masonry-item group reels-masonry-item${portrait ? '' : ' category-masonry-item--landscape reels-landscape-item'}`}
      style={itemStyle}
      onClick={hoverPreviewEnabled || isYouTube ? openLightbox : undefined}
      onTouchStart={hoverPreviewEnabled || isYouTube ? undefined : handleTouchStart}
      onTouchEnd={hoverPreviewEnabled || isYouTube ? undefined : handleTouchEnd}
      onPointerEnter={hoverPreviewEnabled && !isYouTube ? playPreview : undefined}
      onPointerLeave={hoverPreviewEnabled && !isYouTube ? pausePreview : undefined}
      {...protectedMediaSurfaceProps}
    >
      {isYouTube ? (
        <div
          className="category-masonry-asset category-masonry-asset--youtube"
          style={{ backgroundImage: `url(${posterSrc})` }}
          aria-hidden
        />
      ) : (
        <video
          ref={videoRef}
          src={cloudinaryVideoUrl(item.src, 'masonry')}
          poster={posterSrc}
          muted
          loop
          playsInline
          preload={hoverPreviewEnabled ? 'metadata' : 'auto'}
          className="category-masonry-asset"
          onPlaying={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          {...protectedVideoProps}
        />
      )}
      {(hoverPreviewEnabled || isYouTube) && !isPlaying && (
        <div className="category-masonry-play" aria-hidden>
          <Play size={14} style={{ marginLeft: 2 }} />
        </div>
      )}
    </div>
  );
}

function ReelsGrid({
  items,
  indexOffset,
  portrait,
  onOpen,
  landscapeLayout = 'grid',
}: {
  items: MediaItem[];
  indexOffset: number;
  portrait: boolean;
  onOpen: (index: number) => void;
  landscapeLayout?: 'grid' | 'stack';
}) {
  const columnCount = useColumnCount(portrait);
  const hoverPreviewEnabled = useHoverPreviewEnabled();
  const columns = useMemo(
    () =>
      portrait
        ? buildPinterestColumns(items, columnCount, indexOffset)
        : [],
    [items, columnCount, indexOffset, portrait],
  );

  if (!portrait) {
    return (
      <div className="reels-grid--landscape">
        <div
          className={
            landscapeLayout === 'stack'
              ? 'reels-landscape-list reels-landscape-list--stack'
              : 'reels-landscape-list'
          }
        >
          {items.map((item, i) => (
            <ReelGridItem
              key={item.publicId ?? `${item.src}-${i}`}
              item={item}
              originalIndex={indexOffset + i}
              portrait={false}
              onOpen={onOpen}
              hoverPreviewEnabled={hoverPreviewEnabled}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="category-masonry-scroll">
      <div className="category-masonry">
        {columns
          .filter((col) => col.length > 0)
          .map((col, colIndex) => (
            <div key={colIndex} className="category-masonry-col">
              {col.map(({ item, originalIndex }) => (
                <ReelGridItem
                  key={originalIndex}
                  item={item}
                  originalIndex={originalIndex}
                  portrait={portrait}
                  onOpen={onOpen}
                  hoverPreviewEnabled={hoverPreviewEnabled}
                />
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

export function ReelsPage({
  reels,
  homeHref = '/',
  locked = false,
  heroYouTubeUrl,
}: Props) {
  const heroThumbnailSrc = heroYouTubeUrl
    ? youtubeThumbnailUrl(heroYouTubeUrl)
    : undefined;
  const youtubeReels = reels.youtube ?? [];
  const allReels = useMemo(
    () =>
      locked
        ? []
        : [...reels.horizontal, ...reels.vertical, ...youtubeReels],
    [locked, reels.horizontal, reels.vertical, youtubeReels],
  );

  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const [heroTitleRevealed, setHeroTitleRevealed] = useState(false);

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
    const targetId =
      reels.horizontal.length > 0 ? 'reels-horizontal' : 'reels-vertical';
    document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
  };

  const hasReels = allReels.length > 0;
  const hasHeroMedia = Boolean(heroThumbnailSrc);

  return (
    <div className="gallery-page reels-page">
      <section className="category-hero">
        <div className="category-hero-media" aria-hidden {...protectedMediaSurfaceProps}>
          {heroThumbnailSrc ? (
            <div
              className="category-hero-image"
              style={{ backgroundImage: `url(${heroThumbnailSrc})` }}
              {...protectedMediaSurfaceProps}
            />
          ) : (
            <div className="reels-hero-fallback" aria-hidden />
          )}
          <div className="category-hero-overlay" />
        </div>

        <Link href={homeHref} className="category-hero-back">
          <ArrowLeft size={16} strokeWidth={1.75} aria-hidden />
          <span>Back</span>
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

          <div
            className={`category-hero-title-wrap${heroTitleRevealed ? ' category-hero-title-wrap--revealed' : ''}`}
          >
            <motion.h1
              initial={{ y: '110%' }}
              animate={{ y: 0 }}
              transition={{ duration: 1, ease: EASE }}
              onAnimationComplete={() => setHeroTitleRevealed(true)}
              className="category-hero-title t-display"
            >
              MOTION
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
          <p className="category-empty-title">Motion coming soon</p>
          <p className="category-empty-hint t-label">
            This section is on the way. Check back shortly.
          </p>
        </div>
      )}

      {!locked && !hasReels && !hasHeroMedia && (
        <div className="category-empty">
          <div className="category-empty-icon" />
          <p className="category-empty-title">Motion coming soon</p>
          <p className="category-empty-hint t-label">
            Upload videos to the Cloudinary reels folder (or reels/vertical and
            reels/horizontal)
          </p>
        </div>
      )}

      {!locked && reels.horizontal.length > 0 && (
        <section id="reels-horizontal" className="category-masonry-section">
          <div className="category-page-inner">
            <div className="reels-section-header">
              <div className="reels-section-heading">
                <h2 className="reels-section-title t-display">Films / Podcast</h2>
              </div>
            </div>

            <ReelsGrid
              items={reels.horizontal}
              indexOffset={0}
              portrait={false}
              onOpen={open}
            />
          </div>
        </section>
      )}

      {!locked && reels.vertical.length > 0 && (
        <section id="reels-vertical" className="category-masonry-section">
          <div className="category-page-inner">
            <div className="reels-section-header">
              <div className="reels-section-heading">
                <h2 className="reels-section-title t-display">Motion</h2>
              </div>
            </div>

            <ReelsGrid
              items={reels.vertical}
              indexOffset={reels.horizontal.length}
              portrait
              onOpen={open}
            />
          </div>
        </section>
      )}

      {!locked && youtubeReels.length > 0 && (
        <section id="reels-youtube" className="category-masonry-section">
          <div className="category-page-inner">
            <div className="reels-section-header">
              <div className="reels-section-heading">
                <h2 className="reels-section-title t-display">Youtube</h2>
              </div>
            </div>

            <ReelsGrid
              items={youtubeReels}
              indexOffset={reels.horizontal.length + reels.vertical.length}
              portrait={false}
              landscapeLayout="stack"
              onOpen={open}
            />
          </div>
        </section>
      )}

      <GalleryFooter />

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
              className={`category-lightbox-media${isYouTubeUrl(allReels[lightboxIdx].src) ? ' category-lightbox-media--youtube' : ''}`}
              onClick={(e) => e.stopPropagation()}
              {...protectedMediaSurfaceProps}
            >
              {isYouTubeUrl(allReels[lightboxIdx].src) ? (
                <iframe
                  src={youtubeEmbedUrl(allReels[lightboxIdx].src, true)}
                  title="YouTube video"
                  className="category-lightbox-youtube"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : (
                <video
                  src={cloudinaryVideoUrl(allReels[lightboxIdx].src, 'lightbox')}
                  controls
                  autoPlay
                  className="category-lightbox-asset"
                  {...protectedVideoProps}
                />
              )}
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
