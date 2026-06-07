'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const links = [
  { href: '/fashion',          label: 'Fashion' },
  { href: '/food-hospitality', label: 'Food & Hospitality' },
  { href: '/jewellery',        label: 'Jewellery' },
  { href: '/products',         label: 'Products' },
  { href: '/interiors',        label: 'Interiors' },
  { href: '/contact',          label: 'Contact' },
];

export function Navbar() {
  const [open, setOpen]       = useState(false);
  const [pinned, setPinned]   = useState(false);
  const pathname              = usePathname();

  // pages with dark (black) bg
  const isDark = ['/contact','/fashion','/food-hospitality','/jewellery','/products','/interiors']
    .some(p => pathname?.startsWith(p));

  useEffect(() => {
    const fn = () => setPinned(window.scrollY > 40);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const fg = isDark ? '#ffffff' : '#0A0A0A';
  const bg = pinned
    ? isDark ? 'rgba(10,10,10,0.88)' : 'rgba(245,245,242,0.88)'
    : 'transparent';

  return (
    <>
      {/* ── Bar ── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between transition-colors duration-500"
        style={{
          padding: '28px 48px',
          background: bg,
          backdropFilter: pinned ? 'blur(16px)' : 'none',
        }}
      >
        {/* Logo */}
        <Link href="/" className="logo-text z-50 relative" style={{ color: open ? '#fff' : fg }}>
          KASHYAP PATEL
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-10">
          {links.map(l => (
            <Link
              key={l.href}
              href={l.href}
              className="nav-ul t-label transition-opacity hover:opacity-100"
              style={{ color: fg, opacity: pathname === l.href ? 1 : 0.55 }}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden z-50 relative flex flex-col justify-center gap-[5px] w-6 h-6"
          onClick={() => setOpen(v => !v)}
          aria-label="Menu"
        >
          <span className="block h-px transition-all duration-300 origin-center"
            style={{
              background: open ? '#fff' : fg,
              transform: open ? 'translateY(6px) rotate(45deg)' : 'none',
              width: '100%',
            }} />
          <span className="block h-px transition-all duration-300"
            style={{
              background: open ? '#fff' : fg,
              opacity: open ? 0 : 1,
              width: '75%',
            }} />
          <span className="block h-px transition-all duration-300 origin-center"
            style={{
              background: open ? '#fff' : fg,
              transform: open ? 'translateY(-6px) rotate(-45deg)' : 'none',
              width: '100%',
            }} />
        </button>
      </nav>

      {/* ── Mobile overlay ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="fixed inset-0 z-40 flex flex-col justify-center px-12"
            style={{ background: '#0A0A0A' }}
          >
            <nav className="flex flex-col gap-1">
              {links.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 + 0.12, duration: 0.4, ease: 'easeOut' }}
                >
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block t-display text-white leading-none py-4 hover:text-[#C7E200] transition-colors"
                    style={{ fontSize: 'clamp(2.2rem,7vw,3.5rem)' }}
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-14 pt-8"
              style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}
            >
              <p className="t-label text-white/30 mb-1">patelkashyap11@gmail.com</p>
              <p className="t-label text-white/30">+91 97127 27007</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
