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

      {/* Gradient overlay */}
      <div
        style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0.05) 100%)',
          transition: 'opacity 0.6s ease',
        }}
      />

      {/* Content */}
      <div
        className="category-content relative h-full flex flex-col justify-end"
        style={{ padding: '0 48px 48px' }}
      >
        {/* Title + CTA on same row */}
        <div className="category-row flex items-end justify-between gap-6 flex-wrap">
          <motion.h2
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
            className="t-display text-white"
            style={{ fontSize: 'clamp(3rem,7vw,8rem)', lineHeight: 0.9 }}
          >
            {title}
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link
              href={href}
              className="category-cta group/btn flex items-center gap-3 text-white transition-colors duration-300 hover:text-[#C7E200]"
              style={{ fontSize: '0.8rem', letterSpacing: '0.18em', fontWeight: 500, textTransform: 'uppercase' }}
            >
              View Work
              <span
                className="category-cta-icon flex items-center justify-center transition-all duration-300 group-hover/btn:bg-[#C7E200] group-hover/btn:text-black"
                style={{
                  width: 36, height: 36,
                  border: '1px solid rgba(255,255,255,0.35)',
                  borderRadius: '50%',
                }}
              >
                <ArrowUpRight size={14} className="category-cta-arrow" />
              </span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
