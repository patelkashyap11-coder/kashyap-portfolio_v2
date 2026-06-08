'use client';
import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

interface Props {
  title: string;
  href: string;
  videoSrc?: string;
  imageSrc?: string;
  index: number;
}

export function CategorySection({ title, href, videoSrc, imageSrc, index }: Props) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.06, 1, 1.06]);

  return (
    <section ref={ref} className="category-section relative overflow-hidden group" style={{ height: '100vh' }}>

      {/* BG media with parallax scale */}
      <motion.div style={{ scale, position: 'absolute', inset: 0 }}>
        {videoSrc ? (
          <video
            src={videoSrc} autoPlay muted loop playsInline
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        ) : (
          <div
            style={{
              width: '100%', height: '100%',
              backgroundImage: imageSrc ? `url(${imageSrc})` : undefined,
              backgroundSize: 'cover', backgroundPosition: 'center',
              backgroundColor: `hsl(${index * 22},5%,8%)`,
            }}
          />
        )}
      </motion.div>

      {/* Gradient overlay — darker at top for title legibility */}
      <div
        style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0.05) 100%)',
          transition: 'opacity 0.6s ease',
        }}
      />

      {/* Content — top-left */}
      <div
        className="category-content relative h-full flex flex-col justify-start"
        style={{ padding: 'clamp(100px, 12vh, 140px) 48px 0' }}
      >
        <div className="category-stack flex flex-col items-start gap-4">
          <motion.h2
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
            className="category-title t-display text-white"
            style={{ fontSize: 'clamp(3rem,7vw,8rem)', lineHeight: 0.9 }}
          >
            {title}
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            <Link
              href={href}
              className="category-cta group/btn inline-flex items-center gap-2.5 text-white transition-colors duration-300 hover:text-[#C7E200]"
              style={{
                background: 'transparent',
                border: '1px solid #ffffff',
                borderRadius: '999px',
                padding: '12px 22px',
                fontSize: '11px',
                letterSpacing: '0.15em',
                fontWeight: 500,
                textTransform: 'uppercase',
              }}
            >
              View Work
              <span
                className="category-cta-icon flex items-center justify-center transition-all duration-300 group-hover/btn:border-[#C7E200] group-hover/btn:text-[#C7E200]"
                style={{
                  width: 28,
                  height: 28,
                  border: '1px solid rgba(255,255,255,0.85)',
                  borderRadius: '50%',
                  flexShrink: 0,
                }}
              >
                <ArrowUpRight size={12} className="category-cta-arrow" />
              </span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
