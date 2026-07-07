'use client';
import { useRef, useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MediaImage } from '@/components/MediaImage';
import { protectedMediaSurfaceProps, protectedVideoProps } from '@/lib/mediaProtection';
import { MEDIA_IMAGE_SIZES } from '@/lib/imagekitUrl';

interface Props {
  title: string;
  href: string;
  slug: string;
  videoSrc?: string;
  mobileVideoSrc?: string;
  imageSrc?: string;
  index: number;
  /** Parent enables video once the user scrolls to this section (or one ahead). */
  videoLoadEnabled?: boolean;
}

export function CategorySection({
  title,
  href,
  slug,
  videoSrc,
  mobileVideoSrc,
  imageSrc,
  index,
  videoLoadEnabled = false,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMobile, setIsMobile] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(max-width: 767px)').matches,
  );
  const [videoReady, setVideoReady] = useState(false);
  const shouldLoadVideo = videoLoadEnabled;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const { scrollYProgress: titleProgress } = useScroll({
    target: ref,
    offset: ['start end', 'start 0.2'],
  });
  const scaleMotion = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 1]);
  const titleOpacity = useTransform(titleProgress, [0, 0.75], [0, 1]);
  const titleX = useTransform(titleProgress, [0, 0.75], [-32, 0]);
  const subtitleOpacity = useTransform(titleProgress, [0.12, 0.82], [0, 1]);
  const subtitleX = useTransform(titleProgress, [0.12, 0.82], [-32, 0]);

  const playbackSrc = useMemo(() => {
    if (!shouldLoadVideo || !videoSrc) return undefined;
    return isMobile ? (mobileVideoSrc ?? videoSrc) : videoSrc;
  }, [shouldLoadVideo, videoSrc, mobileVideoSrc, isMobile]);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const sync = () => setIsMobile(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    setVideoReady(false);
  }, [playbackSrc]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !playbackSrc) return;

    const markReady = () => setVideoReady(true);
    const tryPlay = () => {
      void video.play().catch(() => {});
    };

    video.addEventListener('loadeddata', markReady);
    video.addEventListener('canplay', markReady);
    video.addEventListener('playing', markReady);
    tryPlay();

    return () => {
      video.removeEventListener('loadeddata', markReady);
      video.removeEventListener('canplay', markReady);
      video.removeEventListener('playing', markReady);
    };
  }, [playbackSrc]);

  return (
    <section
      ref={ref}
      className="category-section overflow-hidden group"
      data-category={slug}
      style={{ zIndex: index + 1 }}
    >
      <motion.div
        style={isMobile ? { position: 'absolute', inset: 0 } : { scale: scaleMotion, position: 'absolute', inset: 0 }}
        {...protectedMediaSurfaceProps}
      >
        {videoSrc ? (
          <>
            {imageSrc ? (
              <MediaImage
                src={imageSrc}
                alt=""
                fill
                sizes={MEDIA_IMAGE_SIZES.categoryPoster}
                className="category-section-media category-section-image category-section-poster"
                aria-hidden
              />
            ) : null}
            {shouldLoadVideo && playbackSrc ? (
              <video
                ref={videoRef}
                key={playbackSrc}
                src={playbackSrc}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className={`category-section-media category-section-video${videoReady ? ' category-section-video--ready' : ''}`}
                {...protectedVideoProps}
              />
            ) : null}
          </>
        ) : imageSrc ? (
          <MediaImage
            src={imageSrc}
            alt=""
            fill
            sizes={MEDIA_IMAGE_SIZES.categoryPoster}
            className="category-section-media category-section-image"
            {...protectedMediaSurfaceProps}
          />
        ) : (
          <div
            className="category-section-media category-section-image"
            style={{ backgroundColor: `hsl(${index * 22},5%,8%)` }}
            {...protectedMediaSurfaceProps}
          />
        )}
      </motion.div>

      <div className="category-content">
        <div className="category-content-inner">
          <motion.h2
            className="category-title"
            style={
              isMobile
                ? undefined
                : { opacity: titleOpacity, x: titleX }
            }
          >
            {title}
          </motion.h2>
          <motion.div style={isMobile ? undefined : { opacity: subtitleOpacity, x: subtitleX }}>
            <Link href={href} className="category-view-link">
              View Work →
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
