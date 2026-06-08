'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export function CTASection() {
  return (
    <section
      style={{ background: '#0A0A0A', padding: 'clamp(120px,18vw,220px) 48px clamp(140px,20vw,240px)' }}
      className="cta-section relative overflow-hidden"
    >
      <div
        className="cta-inner flex flex-col items-center text-center"
        style={{ maxWidth: 1200, margin: '0 auto', position: 'relative' }}
      >
        {/* Massive headline */}
        <div style={{ overflow: 'hidden', marginBottom: '0.04em', width: '100%' }}>
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
        <div style={{ overflow: 'hidden', marginBottom: '0.04em', width: '100%' }}>
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
        <div className="cta-headline-last" style={{ overflow: 'hidden', marginBottom: 'clamp(2.5rem,6vw,4.5rem)', width: '100%' }}>
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

        {/* Large centered CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.45, duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          className="cta-actions flex flex-col items-center"
        >
          <Link
            href="/contact"
            className="cta-btn group inline-flex items-center gap-4 text-white transition-all duration-300 hover:border-[#C7E200] hover:text-[#C7E200]"
            style={{
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.85)',
              borderRadius: '9999px',
              padding: 'clamp(18px,2.5vw,24px) clamp(40px,6vw,72px)',
              fontFamily: 'var(--font-tight)',
              fontWeight: 600,
              fontSize: 'clamp(0.75rem,1.2vw,0.9rem)',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
            }}
          >
            Start a Project
            <span
              className="flex items-center justify-center transition-all duration-300 group-hover:border-[#C7E200]"
              style={{
                width: 36,
                height: 36,
                border: '1px solid rgba(255,255,255,0.6)',
                borderRadius: '50%',
              }}
            >
              <ArrowUpRight size={15} className="group-hover:translate-x-px group-hover:-translate-y-px transition-transform" />
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
