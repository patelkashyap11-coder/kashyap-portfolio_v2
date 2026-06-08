'use client';
import { motion } from 'framer-motion';

const rise = (delay: number) => ({
  hidden: { y: '105%' },
  show: {
    y: 0,
    transition: { duration: 1, delay, ease: [0.76, 0, 0.24, 1] as [number,number,number,number] },
  },
});

export function HeroSection() {
  return (
    <section
      className="hero-section relative flex flex-col overflow-x-hidden"
      style={{ background: '#F5F5F2', padding: '0 48px' }}
    >
      {/* ── Upper: hero type ── */}
      <div className="hero-content flex flex-col justify-start pb-8 md:pb-10">

        {/* eyebrow */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="t-label mb-6 md:mb-8"
          style={{ color: '#888888' }}
        >
          Photographer &amp; Filmmaker
        </motion.p>

        {/* headline lines */}
        <div style={{ overflow: 'hidden', marginBottom: '0.06em' }}>
          <motion.h1
            variants={rise(0.2)} initial="hidden" animate="show"
            className="t-display hero-headline"
            style={{ fontSize: 'clamp(4.5rem,10.5vw,12.5rem)', color: '#0A0A0A' }}
          >
            CREATIVE &amp;
          </motion.h1>
        </div>

        <div style={{ overflow: 'hidden', marginBottom: '0.06em' }}>
          <motion.h1
            variants={rise(0.33)} initial="hidden" animate="show"
            className="t-display hero-headline"
            style={{ fontSize: 'clamp(4.5rem,10.5vw,12.5rem)', color: '#0A0A0A' }}
          >
            VISUAL
          </motion.h1>
        </div>

        <div style={{ overflow: 'hidden' }}>
          <motion.h1
            variants={rise(0.46)} initial="hidden" animate="show"
            className="t-display hero-headline"
            style={{ fontSize: 'clamp(4.5rem,10.5vw,12.5rem)' }}
          >
            <span className="hero-highlight">CONTENT</span>
          </motion.h1>
        </div>
      </div>

      {/* ── Divider ── */}
      <div className="divider" />

      {/* ── Lower: intro paragraph ── */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.85, ease: 'easeOut' }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 py-10"
      >
        <p
          className="font-light leading-relaxed max-w-xl"
          style={{ fontSize: 'clamp(0.95rem,1.2vw,1.2rem)', color: '#555555' }}
        >
          We create visual stories that help brands stand out — from fashion
          campaigns and restaurant content to jewellery, products and interiors.
        </p>

        {/* Scroll cue */}
        <div className="hidden md:flex items-center gap-4" style={{ color: '#aaaaaa' }}>
          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
            className="w-px h-10"
            style={{ background: '#cccccc' }}
          />
          <span className="t-label" style={{ color: '#aaaaaa', writingMode: 'vertical-rl', letterSpacing: '0.18em' }}>
            scroll
          </span>
        </div>
      </motion.div>
    </section>
  );
}
