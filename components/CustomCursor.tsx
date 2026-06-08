'use client';
import { useEffect, useRef } from 'react';
import './custom-cursor.css';

export function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot  = dotRef.current!;
    const ring = ringRef.current!;
    let mx = -100, my = -100;
    let dx = -100, dy = -100, rx = -100, ry = -100;
    let raf = 0;

    const DOT_LERP  = 0.88;
    const RING_LERP = 0.38;

    const setPos = (el: HTMLElement, x: number, y: number) => {
      el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
    };

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };

    const tick = () => {
      dx += (mx - dx) * DOT_LERP;
      dy += (my - dy) * DOT_LERP;
      rx += (mx - rx) * RING_LERP;
      ry += (my - ry) * RING_LERP;
      setPos(dot, dx, dy);
      setPos(ring, rx, ry);
      raf = requestAnimationFrame(tick);
    };

    document.addEventListener('mousemove', onMove);
    raf = requestAnimationFrame(tick);

    const enter = (e: Event) => {
      if ((e.currentTarget as Element).closest('.what-we-do')) return;
      dot.classList.add('is-hover');
      ring.classList.add('is-hover');
    };
    const leave = (e: Event) => {
      if ((e.currentTarget as Element).closest('.what-we-do')) return;
      dot.classList.remove('is-hover');
      ring.classList.remove('is-hover');
    };

    const bind = () => {
      document.querySelectorAll('a,button,[data-hover]').forEach(el => {
        el.addEventListener('mouseenter', enter);
        el.addEventListener('mouseleave', leave);
      });
    };
    bind();
    const obs = new MutationObserver(bind);
    obs.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
      obs.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={dotRef}  className="cursor-dot"  />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}
