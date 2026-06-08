'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export function CTASection() {
  return (
    <section
      className="cta-section relative overflow-hidden"
      style={{
        background: '#0A0A0A',
        minHeight: 'auto',
        padding: 'clamp(48px, 8vw, 64px) 48px 0',
      }}
    >
      <div
        className="cta-inner flex flex-col items-center text-center"
        style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', width: '100%' }}
      >
        {/* Massive headline */}
        <div style={{ overflow: 'hidden', marginBottom: '0.03em', width: '100%' }}>
          <motion.h2
            initial={{ y: '105%' }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
            className="t-display text-white"
            style={{ fontSize: 'clamp(3.5rem,11vw,13rem)', lineHeight: 0.9 }}
          >
            LET&apos;S CREATE
          </motion.h2>
        </div>
        <div style={{ overflow: 'hidden', marginBottom: '0.03em', width: '100%' }}>
          <motion.h2
            initial={{ y: '105%' }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1, delay: 0.08, ease: [0.76, 0, 0.24, 1] }}
            className="t-display text-white"
            style={{ fontSize: 'clamp(3.5rem,11vw,13rem)', lineHeight: 0.9 }}
          >
            SOMETHING
          </motion.h2>
        </div>
        <div className="cta-headline-last" style={{ overflow: 'hidden', marginBottom: 'clamp(0.75rem,2vw,1.25rem)', width: '100%' }}>
          <motion.h2
            initial={{ y: '105%' }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1, delay: 0.16, ease: [0.76, 0, 0.24, 1] }}
            className="t-display"
            style={{ fontSize: 'clamp(3.5rem,11vw,13rem)', lineHeight: 0.9 }}
          >
            <span style={{ color: '#C7E200' }}>UNFORGETTABLE</span>
          </motion.h2>
        </div>

        {/* Centered CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.45, duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          className="cta-actions flex flex-col items-center"
          style={{ padding: 'clamp(40px, 6vw, 56px) 0 clamp(40px, 6vw, 56px)' }}
        >
          <Link
            href="/contact"
            className="cta-btn group inline-flex items-center gap-2 text-white transition-all duration-300 hover:border-[#C7E200] hover:text-[#C7E200]"
            style={{
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.4)',
              borderRadius: '999px',
              padding: '10px 20px',
              fontFamily: 'var(--font-tight)',
              fontWeight: 500,
              fontSize: '11px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
            }}
          >
            Start a Project
            <span
              className="cta-btn-icon flex items-center justify-center transition-all duration-300 group-hover:border-[#C7E200]"
              style={{
                width: 24,
                height: 24,
                border: '1px solid rgba(255,255,255,0.35)',
                borderRadius: '50%',
                flexShrink: 0,
              }}
            >
              <ArrowUpRight size={11} className="group-hover:translate-x-px group-hover:-translate-y-px transition-transform" />
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
