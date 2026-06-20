'use client';
import { useRef, useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { heroPosterUrl } from '@/lib/posterUrl';
import {
  cloudinaryVideoPosterUrl,
  cloudinaryVideoUrl,
} from '@/lib/cloudinaryUrl';
import { protectedMediaSurfaceProps, protectedVideoProps } from '@/lib/mediaProtection';

interface Props {
  title: string;
  href: string;
  videoSrc?: string;
  imageSrc?: string;
  index: number;
  /** Parent enables video once the user scrolls to this section (or one ahead). */
  videoLoadEnabled?: boolean;
}

export function CategorySection({
  title,
  href,
  videoSrc,
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
  const scaleMotion = useTransform(scrollYProgress, [0, 0.5, 1], [1.06, 1, 1.06]);
  const titleOpacity = useTransform(titleProgress, [0, 0.75], [0, 1]);
  const titleX = useTransform(titleProgress, [0, 0.75], [-32, 0]);
  const subtitleOpacity = useTransform(titleProgress, [0.12, 0.82], [0, 1]);
  const subtitleX = useTransform(titleProgress, [0.12, 0.82], [-32, 0]);

  const videoPreset = isMobile ? 'hero-mobile' : 'hero';

  const posterSrc = useMemo(() => {
    if (videoSrc) {
      return cloudinaryVideoPosterUrl(videoSrc, videoPreset);
    }
    return heroPosterUrl(imageSrc);
  }, [videoSrc, imageSrc, videoPreset]);

  const playbackSrc = useMemo(() => {
    if (!shouldLoadVideo || !videoSrc) return undefined;
    return cloudinaryVideoUrl(videoSrc, videoPreset);
  }, [shouldLoadVideo, videoSrc, videoPreset]);

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
    if (!posterSrc) return;
    const img = new window.Image();
    img.src = posterSrc;
  }, [posterSrc]);

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
      style={{ zIndex: index + 1 }}
    >
      <motion.div
        style={isMobile ? { position: 'absolute', inset: 0 } : { scale: scaleMotion, position: 'absolute', inset: 0 }}
        {...protectedMediaSurfaceProps}
      >
        {videoSrc ? (
          <>
            {posterSrc ? (
              <div
                className="category-section-media category-section-image category-section-poster"
                style={{ backgroundImage: `url(${posterSrc})` }}
                aria-hidden
                {...protectedMediaSurfaceProps}
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
                preload="auto"
                className={`category-section-media category-section-video${videoReady ? ' category-section-video--ready' : ''}`}
                {...protectedVideoProps}
              />
            ) : null}
          </>
        ) : (
          <div
            className="category-section-media category-section-image"
            style={{
              backgroundImage: posterSrc ? `url(${posterSrc})` : undefined,
              backgroundColor: `hsl(${index * 22},5%,8%)`,
            }}
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
