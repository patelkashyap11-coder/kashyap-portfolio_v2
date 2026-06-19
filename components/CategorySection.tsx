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
  /** Prefetch video earlier — used for the first category panel (fashion). */
  priorityLoad?: boolean;
}

export function CategorySection({
  title,
  href,
  videoSrc,
  imageSrc,
  index,
  priorityLoad = false,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(max-width: 767px)').matches,
  );
  const [shouldLoadVideo, setShouldLoadVideo] = useState(
    () =>
      priorityLoad ||
      (typeof window !== 'undefined' &&
        window.matchMedia('(max-width: 767px)').matches),
  );
  const [videoReady, setVideoReady] = useState(false);
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
  const posterPreset = isMobile ? 'hero-mobile' : 'hero';

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
    if (!videoSrc) return;
    if (priorityLoad) {
      setShouldLoadVideo(true);
    }

    const node = ref.current;
    if (!node) return;

    const rootMargin = isMobile
      ? priorityLoad
        ? '120% 0px'
        : '80% 0px'
      : priorityLoad
        ? '100% 0px'
        : '30% 0px';

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShouldLoadVideo(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold: 0 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [videoSrc, priorityLoad, isMobile]);

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
            {posterSrc && !isMobile ? (
              <div
                className="category-section-media category-section-image"
                style={{ backgroundImage: `url(${posterSrc})` }}
                aria-hidden
                {...protectedMediaSurfaceProps}
              />
            ) : null}
            <video
              src={playbackSrc}
              poster={posterSrc}
              autoPlay
              muted
              loop
              playsInline
              preload={
                shouldLoadVideo
                  ? isMobile || priorityLoad
                    ? 'auto'
                    : 'metadata'
                  : 'none'
              }
              className={`category-section-media category-section-video${videoReady || isMobile ? ' category-section-video--ready' : ''}`}
              onLoadedData={() => setVideoReady(true)}
              onCanPlay={() => setVideoReady(true)}
              {...protectedVideoProps}
            />
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
