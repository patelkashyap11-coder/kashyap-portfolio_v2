'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export function CTASection() {
  return (
    <section
      style={{ background: '#F5F5F2', padding: '140px 48px 160px' }}
      className="cta-section relative overflow-hidden"
    >
      {/* faint accent wash */}
      <div
        style={{
          position: 'absolute', top: 0, right: 0,
          width: '40%', height: '100%',
          background: 'radial-gradient(ellipse at 80% 50%, rgba(199,226,0,0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative' }}>
        <p className="t-label mb-10" style={{ color: '#888888' }}>Ready to start?</p>

        {/* Large headline */}
        <div style={{ overflow: 'hidden', marginBottom: '0.04em' }}>
          <motion.h2
            initial={{ y: '105%' }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
            className="t-display"
            style={{ fontSize: 'clamp(4rem,9vw,11rem)', color: '#0A0A0A' }}
          >
            TALK OVER
          </motion.h2>
        </div>
        <div className="cta-headline-last" style={{ overflow: 'hidden', marginBottom: '0.6em' }}>
          <motion.h2
            initial={{ y: '105%' }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
            className="t-display"
            style={{ fontSize: 'clamp(4rem,9vw,11rem)' }}
          >
            <span style={{ color: '#C7E200' }}>COFFEE</span>
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="cta-actions flex flex-col sm:flex-row items-start sm:items-center gap-5"
        >
          <Link
            href="/contact"
            className="group flex items-center gap-4"
            style={{
              background: '#0A0A0A', color: '#F5F5F2',
              padding: '18px 36px',
              fontFamily: 'var(--font-tight)',
              fontWeight: 600,
              fontSize: '0.8rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              transition: 'background 0.3s, color 0.3s',
            }}
          >
            Contact Me
            <ArrowUpRight size={15} className="group-hover:translate-x-px group-hover:-translate-y-px transition-transform" />
          </Link>

          <a
            href="https://wa.me/919712727007"
            target="_blank"
            rel="noopener noreferrer"
            className="t-label hover:text-[#0A0A0A] transition-colors"
            style={{ color: '#aaaaaa' }}
          >
            WhatsApp instead →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
