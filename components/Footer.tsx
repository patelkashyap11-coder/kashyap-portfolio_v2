'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const workLinks = [
  { href: '/fashion',          label: 'Fashion' },
  { href: '/food-hospitality', label: 'Food & Hospitality' },
  { href: '/jewellery',        label: 'Jewellery' },
  { href: '/products',         label: 'Products' },
  { href: '/interiors',        label: 'Interiors' },
];

export function Footer() {
  return (
    <footer style={{ background: '#0A0A0A', color: '#ffffff', padding: '100px 48px 52px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        {/* ── Top section: big headline + contact ── */}
        <div className="flex flex-col lg:flex-row lg:justify-between gap-16 lg:gap-24 mb-24">

          {/* Left: headline */}
          <div className="flex-1">
            <div style={{ overflow: 'hidden', marginBottom: '0.05em' }}>
              <motion.h2
                initial={{ y: '100%' }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
                className="t-display"
                style={{ fontSize: 'clamp(3.5rem,7vw,8.5rem)', color: '#ffffff' }}
              >
                LET'S
              </motion.h2>
            </div>
            <div style={{ overflow: 'hidden', marginBottom: '1.2rem' }}>
              <motion.h2
                initial={{ y: '100%' }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
                className="t-display"
                style={{ fontSize: 'clamp(3.5rem,7vw,8.5rem)', color: '#C7E200' }}
              >
                TALK
              </motion.h2>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.45, duration: 0.7 }}
              className="font-light leading-relaxed"
              style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.45)', maxWidth: 380 }}
            >
              Have a project, brand, restaurant, product or story worth telling?
            </motion.p>
          </div>

          {/* Right: contact details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="flex flex-col gap-5"
            style={{ flexShrink: 0, minWidth: 260 }}
          >
            <p className="t-label mb-3" style={{ color: 'rgba(255,255,255,0.3)' }}>
              Get in touch
            </p>

            <ContactLine href="mailto:patelkashyap11@gmail.com" label="patelkashyap11@gmail.com" />
            <ContactLine href="tel:+919712727007"              label="+91 97127 27007" />
            <ContactLine
              href="https://instagram.com/ikashyap__"
              label="Instagram"
              external
            />
            <ContactLine
              href="https://wa.me/919712727007"
              label="WhatsApp"
              external
            />

            <div style={{ marginTop: 8, paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
              <p className="t-label" style={{ color: 'rgba(255,255,255,0.25)' }}>
                Ahmedabad, India
              </p>
            </div>
          </motion.div>
        </div>

        {/* ── Divider ── */}
        <div style={{ height: 1, background: 'rgba(255,255,255,0.08)', marginBottom: 36 }} />

        {/* ── Bottom row ── */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          {/* Logo */}
          <Link href="/" className="logo-text" style={{ color: '#ffffff' }}>
            KASHYAP PATEL
          </Link>

          {/* Work links */}
          <div className="flex flex-wrap gap-x-8 gap-y-2">
            {workLinks.map(l => (
              <Link
                key={l.href}
                href={l.href}
                className="t-label hover:text-[#C7E200] transition-colors"
                style={{ color: 'rgba(255,255,255,0.3)' }}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Copyright */}
          <p className="t-label" style={{ color: 'rgba(255,255,255,0.2)' }}>
            © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}

function ContactLine({
  href, label, external,
}: {
  href: string; label: string; external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className="group flex items-center gap-2"
      style={{
        color: 'rgba(255,255,255,0.7)',
        fontFamily: 'var(--font-inter)',
        fontSize: '0.95rem',
        fontWeight: 400,
        transition: 'color 0.25s ease',
        textDecoration: 'none',
      }}
      onMouseEnter={e => (e.currentTarget.style.color = '#C7E200')}
      onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}
    >
      {label}
      {external && <ArrowUpRight size={12} style={{ opacity: 0.5 }} />}
    </a>
  );
}
