'use client';
import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';

interface Props {
  title: string;
  href: string;
  videoSrc?: string;
  imageSrc?: string;
  index: number;
}

export function CategorySection({ title, href, videoSrc, imageSrc, index }: Props) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.06, 1, 1.06]);

  return (
    <section
      ref={ref}
      className="category-section relative overflow-hidden group"
      style={{ zIndex: index + 1 }}
    >
      <motion.div style={{ scale, position: 'absolute', inset: 0 }}>
        {videoSrc ? (
          <video
            src={videoSrc}
            autoPlay
            muted
            loop
            playsInline
            className="category-section-media"
          />
        ) : (
          <div
            className="category-section-media category-section-image"
            style={{
              backgroundImage: imageSrc ? `url(${imageSrc})` : undefined,
              backgroundColor: `hsl(${index * 22},5%,8%)`,
            }}
          />
        )}
      </motion.div>

      <div className="category-overlay" />

      <div className="category-content">
        <div className="category-content-inner">
          <h2 className="category-title">{title}</h2>
          <Link href={href} className="category-view-link">
            View Work →
          </Link>
        </div>
      </div>
    </section>
  );
}
