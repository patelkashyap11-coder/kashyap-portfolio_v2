'use client';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react';
import { ArrowUpRight } from 'lucide-react';

const contacts = [
  {
    Icon: Mail,
    label: 'Email',
    value: 'patelkashyap11@gmail.com',
    href: 'mailto:patelkashyap11@gmail.com',
    note: 'Best for project briefs',
    external: false,
  },
  {
    Icon: Phone,
    label: 'Phone',
    value: '+91 97127 27007',
    href: 'tel:+919712727007',
    note: 'Mon–Sat, 10am–7pm IST',
    external: false,
  },
  {
    Icon: MessageCircle,
    label: 'Instagram',
    value: '@ikashyap__',
    href: 'https://instagram.com/ikashyap__',
    note: 'DMs welcome',
    external: true,
  },
  {
    Icon: MessageCircle,
    label: 'WhatsApp',
    value: 'Chat on WhatsApp',
    href: 'https://wa.me/919712727007',
    note: 'Quick questions',
    external: true,
  },
];

const rise = (delay: number) => ({
  hidden: { y: '100%' },
  show: { y: 0, transition: { duration: 0.9, delay, ease: [0.76, 0, 0.24, 1] as [number,number,number,number] } },
});

export default function ContactPage() {
  return (
    <div className="contact-page" style={{ minHeight: '100vh', background: '#000000', color: '#fff', padding: '0 48px' }}>
      {/* faint accent blob */}
      <div style={{
        position: 'fixed', top: 0, right: 0, width: '45%', height: '100vh',
        background: 'radial-gradient(ellipse at 90% 20%, rgba(199,226,0,0.04) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', paddingTop: 160, paddingBottom: 100 }}>

        {/* ── Headline ── */}
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
          className="t-label mb-12" style={{ color: 'rgba(255,255,255,0.28)' }}
        >
          Get in touch
        </motion.p>

        <div style={{ overflow: 'hidden', marginBottom: '0.05em' }}>
          <motion.h1 variants={rise(0.1)} initial="hidden" animate="show"
            className="t-display" style={{ fontSize: 'clamp(3rem,7vw,8.5rem)', color: '#fff' }}>
            SMALL IDEA OR
          </motion.h1>
        </div>
        <div style={{ overflow: 'hidden', marginBottom: '0.05em' }}>
          <motion.h1 variants={rise(0.22)} initial="hidden" animate="show"
            className="t-display" style={{ fontSize: 'clamp(3rem,7vw,8.5rem)', color: '#fff' }}>
            BIG PROJECT?
          </motion.h1>
        </div>
        <div style={{ overflow: 'hidden', marginBottom: 80 }}>
          <motion.h1 variants={rise(0.34)} initial="hidden" animate="show"
            className="t-display" style={{ fontSize: 'clamp(3rem,7vw,8.5rem)', color: '#C7E200' }}>
            LET&apos;S TALK!
          </motion.h1>
        </div>

        {/* ── Contact cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {contacts.map(({ Icon, label, value, href, note, external }, i) => (
            <motion.a
              key={label}
              href={href}
              target={external ? '_blank' : undefined}
              rel={external ? 'noopener noreferrer' : undefined}
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 + 0.6, duration: 0.6 }}
              style={{
                display: 'block',
                border: '1px solid rgba(255,255,255,0.08)',
                padding: '32px 28px',
                textDecoration: 'none',
                transition: 'border-color 0.3s ease, background 0.3s ease',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(199,226,0,0.35)';
                (e.currentTarget as HTMLElement).style.background = 'rgba(199,226,0,0.03)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)';
                (e.currentTarget as HTMLElement).style.background = 'transparent';
              }}
              className="group"
            >
              <div style={{
                width: 36, height: 36, border: '1px solid rgba(255,255,255,0.08)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 28, transition: 'border-color 0.3s',
              }}>
                <Icon size={14} style={{ color: 'rgba(255,255,255,0.35)' }} />
              </div>

              <p className="t-label mb-2" style={{ color: 'rgba(255,255,255,0.28)' }}>{label}</p>
              <p style={{
                fontSize: '0.9rem', fontWeight: 500, color: '#fff',
                lineHeight: 1.3, marginBottom: 18,
              }}>
                {value}
                {external && <ArrowUpRight size={11} style={{ display: 'inline', marginLeft: 4, opacity: 0.4 }} />}
              </p>

              <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', marginBottom: 12 }} />
              <p style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.06em' }}>{note}</p>
            </motion.a>
          ))}
        </div>

        {/* ── Bottom strip ── */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 mt-16 pt-10"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          <div className="flex items-center gap-3">
            <MapPin size={12} style={{ color: 'rgba(255,255,255,0.2)' }} />
            <p className="t-label" style={{ color: 'rgba(255,255,255,0.2)' }}>Ahmedabad, Gujarat, India</p>
          </div>
          <div className="flex items-center gap-3">
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#C7E200', animation: 'pulse 2s infinite' }} />
            <p className="t-label" style={{ color: 'rgba(255,255,255,0.2)' }}>Available for new projects</p>
          </div>
          <p className="t-label" style={{ color: 'rgba(255,255,255,0.12)' }}>Reply within 24 h</p>
        </motion.div>
      </div>
    </div>
  );
}
