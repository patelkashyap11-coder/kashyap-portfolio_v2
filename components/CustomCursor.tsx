'use client';
import { useEffect, useRef, useState } from 'react';
import './custom-cursor.css';

function shouldShowCursor() {
  if (typeof window === 'undefined') return false;
  const isTouch =
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0;
  const isNarrow = window.matchMedia('(max-width: 767px)').matches;
  return !isTouch && !isNarrow;
}

export function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const update = () => setActive(shouldShowCursor());
    update();

    const mq = window.matchMedia('(max-width: 767px)');
    mq.addEventListener('change', update);
    window.addEventListener('resize', update);

    return () => {
      mq.removeEventListener('change', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle('has-custom-cursor', active);
    return () => document.body.classList.remove('has-custom-cursor');
  }, [active]);

  useEffect(() => {
    if (!active) return;

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
  }, [active]);

  if (!active) return null;

  return (
    <>
      <div ref={dotRef}  className="cursor-dot"  />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}
