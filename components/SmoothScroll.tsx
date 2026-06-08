'use client';
import { useEffect } from 'react';

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouch =
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0;
    const isMobile = window.matchMedia('(max-width: 767px)').matches;

    if (prefersReducedMotion || isTouch || isMobile) return;

    let lenis: { raf: (time: number) => void; destroy: () => void } | null = null;

    const initLenis = async () => {
      const Lenis = (await import('lenis')).default;
      lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });

      const raf = (time: number) => {
        lenis?.raf(time);
        requestAnimationFrame(raf);
      };
      requestAnimationFrame(raf);
    };

    initLenis();

    return () => {
      lenis?.destroy();
    };
  }, []);

  return <>{children}</>;
}
