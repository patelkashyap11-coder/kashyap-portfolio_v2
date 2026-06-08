'use client';
import { useEffect } from 'react';

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    let lenis: { raf: (time: number) => void; destroy: () => void } | null = null;
    let frameId: number | null = null;
    let cancelled = false;
    const desktopQuery = window.matchMedia('(min-width: 1025px)');
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const stopLenis = () => {
      if (frameId !== null) {
        cancelAnimationFrame(frameId);
        frameId = null;
      }

      lenis?.destroy();
      lenis = null;
    };

    const shouldUseLenis = () => desktopQuery.matches && !motionQuery.matches;

    const initLenis = async () => {
      if (!shouldUseLenis() || lenis) return;

      const Lenis = (await import('lenis')).default;
      if (cancelled || !shouldUseLenis() || lenis) return;

      lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });

      const raf = (time: number) => {
        lenis?.raf(time);
        frameId = requestAnimationFrame(raf);
      };

      frameId = requestAnimationFrame(raf);
    };

    const syncLenis = () => {
      if (shouldUseLenis()) {
        void initLenis();
      } else {
        stopLenis();
      }
    };

    syncLenis();
    desktopQuery.addEventListener('change', syncLenis);
    motionQuery.addEventListener('change', syncLenis);

    return () => {
      cancelled = true;
      desktopQuery.removeEventListener('change', syncLenis);
      motionQuery.removeEventListener('change', syncLenis);
      stopLenis();
    };
  }, []);

  return <>{children}</>;
}
