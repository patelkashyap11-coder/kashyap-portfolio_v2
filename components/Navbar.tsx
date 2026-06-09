'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { getPreviewBase, isPreviewHome, withPreviewBase } from '@/lib/content/preview';

const links = [
  { href: '/fashion', label: 'Fashion', shortLabel: 'Fashion' },
  { href: '/food-hospitality', label: 'Food & Hospitality', shortLabel: 'Food' },
  { href: '/jewellery', label: 'Jewellery', shortLabel: 'Jewellery' },
  { href: '/products', label: 'Products', shortLabel: 'Products' },
  { href: '/interiors', label: 'Interiors', shortLabel: 'Interiors' },
  { href: '/contact', label: 'Contact', shortLabel: 'Contact' },
];

export function Navbar() {
  const [open, setOpen]       = useState(false);
  const [pinned, setPinned]   = useState(false);
  const [visible, setVisible] = useState(true);
  const [prefersDark, setPrefersDark] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [overHomeCategoryStack, setOverHomeCategoryStack] = useState(false);
  const [overHomeAfterCategories, setOverHomeAfterCategories] = useState(false);
  const [overHomeCta, setOverHomeCta] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const lastScrollY           = useRef(0);
  const pathname = usePathname();
  const previewBase = getPreviewBase(pathname);
  const navLinks = links.map((link) => ({
    ...link,
    href: withPreviewBase(previewBase, link.href),
  }));

  const isHomepage = isPreviewHome(pathname, previewBase);
  const isDark = navLinks.some(
    (link) => pathname === link.href || pathname?.startsWith(`${link.href}/`),
  );

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const sync = () => setIsMobile(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    if (!isHomepage) {
      setOverHomeCategoryStack(false);
      setOverHomeAfterCategories(false);
      setOverHomeCta(false);
      return;
    }

    const syncHomeNavZones = () => {
      const navBottom = 88;
      const stack = document.querySelector('.category-stack-wrapper');
      const after = document.querySelector('.homepage-after-categories');
      const cta = document.querySelector('.cta-section');

      if (stack) {
        const rect = stack.getBoundingClientRect();
        setOverHomeCategoryStack(rect.top < navBottom && rect.bottom > navBottom);
      } else {
        setOverHomeCategoryStack(false);
      }

      if (after) {
        const rect = after.getBoundingClientRect();
        setOverHomeAfterCategories(rect.top < navBottom && rect.bottom > navBottom);
      } else {
        setOverHomeAfterCategories(false);
      }

      if (cta) {
        const rect = cta.getBoundingClientRect();
        setOverHomeCta(rect.top < navBottom && rect.bottom > navBottom);
      } else {
        setOverHomeCta(false);
      }
    };

    syncHomeNavZones();
    window.addEventListener('scroll', syncHomeNavZones, { passive: true });
    window.addEventListener('resize', syncHomeNavZones);
    return () => {
      window.removeEventListener('scroll', syncHomeNavZones);
      window.removeEventListener('resize', syncHomeNavZones);
    };
  }, [isHomepage, pathname]);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const sync = () => setPrefersDark(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    const fn = () => {
      const y = window.scrollY;
      setScrollY(y);
      setPinned(y > 40);

      if (y <= 40) {
        setVisible(true);
      } else if (y > lastScrollY.current + 4) {
        setVisible(false);
      } else if (y < lastScrollY.current - 4) {
        setVisible(true);
      }

      lastScrollY.current = y;
    };
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const onDarkHero = isDark && !pinned;
  const onHomeCategoryStack = isHomepage && !open && overHomeCategoryStack;
  const onHomeCta = isHomepage && !open && overHomeCta;
  const onHomeHero =
    isHomepage && !open && !overHomeCategoryStack && !overHomeAfterCategories && !overHomeCta;
  const onHomeLightPanel = isHomepage && !open && overHomeAfterCategories && !overHomeCta;
  const hideHomeNavBackground =
    isHomepage && (onHomeCategoryStack || overHomeAfterCategories);
  const useLightNavText =
    onDarkHero ||
    onHomeCategoryStack ||
    onHomeCta ||
    (prefersDark && (onHomeHero || onHomeLightPanel));
  const navFg = open ? '#0A0A0A' : useLightNavText ? '#ffffff' : '#0A0A0A';
  const showNavBackground =
    pinned &&
    !open &&
    !isMobile &&
    !hideHomeNavBackground;
  const useDarkNavBackground =
    (isDark && prefersDark) || (isHomepage && prefersDark && (onHomeHero || onHomeLightPanel));
  const bg = showNavBackground
    ? useDarkNavBackground
      ? 'rgba(10,10,10,0.88)'
      : 'rgba(245,245,242,0.92)'
    : 'transparent';
  const useLightToggle = !open && navFg === '#ffffff';

  return (
    <header
      className={`site-nav-shell fixed top-0 left-0 right-0 z-50${open ? ' site-nav-shell--open' : ''}${pinned ? ' site-nav-shell--pinned' : ''}`}
      style={{
        transform: visible ? 'translateY(0)' : 'translateY(calc(-100% - 8px))',
        transition: 'transform 0.45s cubic-bezier(0.76, 0, 0.24, 1)',
      }}
    >
      <AnimatePresence>
        {open && (
          <motion.div
            key="site-nav-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="site-nav-overlay md:hidden"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      <div className={`site-nav-panel${open ? ' site-nav-panel--open' : ''}`}>
        {open && <div className="site-nav-panel-bg md:hidden" aria-hidden="true" />}

        <div className="site-nav-panel-inner">
          <nav
            className={`site-nav flex items-center justify-between gap-3${open ? ' site-nav--menu-open' : ''}`}
            style={{
              background: open ? 'transparent' : bg,
              backdropFilter: showNavBackground ? 'blur(16px)' : 'none',
              transition: 'background 0.5s ease, backdrop-filter 0.5s ease',
            }}
          >
          <Link
            href={previewBase ?? '/'}
            className="logo-text site-nav-logo z-50 relative shrink-0"
            style={{ color: navFg }}
          >
            KASHYAP PATEL
          </Link>

          <div className="site-nav-links hidden md:flex items-center min-w-0 flex-1 justify-end">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`nav-ul t-label transition-opacity hover:opacity-100 whitespace-nowrap${pathname === l.href ? ' nav-ul--active' : ''}`}
                style={{ color: navFg, opacity: pathname === l.href ? 1 : 0.55 }}
              >
                <span className="site-nav-label-short">{l.shortLabel}</span>
                <span className="site-nav-label-full">{l.label}</span>
              </Link>
            ))}
          </div>

          <button
            type="button"
            className={`site-nav-toggle md:hidden z-50 relative flex shrink-0 flex-col items-center justify-center gap-[5px] w-11 h-11${open ? ' site-nav-toggle--open' : useLightToggle ? ' site-nav-toggle--light' : ' site-nav-toggle--dark'}`}
            onClick={() => setOpen(v => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            <span className="site-nav-toggle-line" />
            <span className="site-nav-toggle-line site-nav-toggle-line--middle" />
            <span className="site-nav-toggle-line" />
          </button>
          </nav>

          <AnimatePresence>
            {open && (
              <motion.nav
                key="site-nav-mobile-menu"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="site-nav-mobile-menu md:hidden flex flex-col"
              >
                {navLinks.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className={`site-nav-mobile-link${pathname === l.href ? ' site-nav-mobile-link--active' : ''}`}
                  >
                    {l.label}
                  </Link>
                ))}
              </motion.nav>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
