'use client';
import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
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
  const [isMobile, setIsMobile] = useState(false);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
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

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const sync = () => setIsMobile(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    if (!videoSrc) return;

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShouldLoadVideo(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: priorityLoad ? '100% 0px' : '20% 0px',
        threshold: 0,
      },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [videoSrc, priorityLoad]);

  return (
    <section
      ref={ref}
      className="category-section relative overflow-hidden group"
      style={{ zIndex: index + 1 }}
    >
      <motion.div
        style={{ scale: isMobile ? 1 : scaleMotion, position: 'absolute', inset: 0 }}
        {...protectedMediaSurfaceProps}
      >
        {videoSrc ? (
          <video
            src={shouldLoadVideo ? videoSrc : undefined}
            poster={imageSrc}
            autoPlay
            muted
            loop
            playsInline
            preload={shouldLoadVideo ? (priorityLoad ? 'auto' : 'metadata') : 'none'}
            className="category-section-media"
            {...protectedVideoProps}
          />
        ) : (
          <div
            className="category-section-media category-section-image"
            style={{
              backgroundImage: imageSrc ? `url(${imageSrc})` : undefined,
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
            style={{ opacity: titleOpacity, x: titleX }}
          >
            {title}
          </motion.h2>
          <motion.div style={{ opacity: subtitleOpacity, x: subtitleX }}>
            <Link href={href} className="category-view-link">
              View Work →
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
