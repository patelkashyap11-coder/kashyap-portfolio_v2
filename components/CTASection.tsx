'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const rise = {
  hidden: { y: 32 },
  show: {
    y: 0,
    transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] as [number, number, number, number] },
  },
};

const footerLinks = [
  { href: 'https://instagram.com/ikashyap__', label: 'Instagram' },
  { href: 'https://wa.me/919712727007', label: 'WhatsApp' },
];

export function CTASection() {
  return (
    <section className="cta-section">
      <div className="cta-stage">
        <motion.div
          className="cta-headline-grid"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={container}
        >
          <motion.h2 variants={rise} className="cta-line cta-line--top">
            BRINGING
          </motion.h2>
          <motion.h2 variants={rise} className="cta-line cta-line--middle">
            STORIES
          </motion.h2>
          <motion.h2 variants={rise} className="cta-line cta-line--bottom">
            <span className="cta-line-accent">TO LIFE</span>
          </motion.h2>
        </motion.div>

        <motion.div
          initial={{ y: 16 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ delay: 0.35, duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          className="cta-contact-row"
        >
          <Link href="/contact" className="cta-contact-link">
            <span>Contact us</span>
            <span className="cta-contact-icon" aria-hidden>
              <ArrowRight size={22} strokeWidth={1.75} />
            </span>
          </Link>
        </motion.div>
      </div>

      <div className="cta-footer-bar">
        <div className="cta-footer-left">
          <p className="cta-footer-copy">© 2026 KASHYAP PATEL</p>
          <p className="cta-footer-tagline">Photographer &amp; Filmmaker</p>
        </div>
        <div className="cta-footer-right">
          {footerLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-footer-link"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
