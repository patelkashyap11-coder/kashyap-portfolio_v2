'use client';
import { useState, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ArrowLeft, Play } from 'lucide-react';

export interface MediaItem {
  src: string;
  type: 'image' | 'video';
  alt?: string;
  /** Optional explicit intrinsic size — if omitted, natural size is used */
  width?: number;
  height?: number;
}

interface Props {
  title: string;
  subtitle: string;
  description: string;
  media: MediaItem[];
}

// Distribute items across N columns round-robin
function buildColumns<T>(items: T[], n: number): { item: T; originalIndex: number }[][] {
  const cols: { item: T; originalIndex: number }[][] = Array.from({ length: n }, () => []);
  items.forEach((item, i) => cols[i % n].push({ item, originalIndex: i }));
  return cols;
}

export function GalleryPage({ title, subtitle, description, media }: Props) {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const open  = useCallback((i: number) => setLightboxIdx(i), []);
  const close = useCallback(() => setLightboxIdx(null), []);
  const prev  = useCallback(() => setLightboxIdx(i => i !== null ? (i - 1 + media.length) % media.length : null), [media.length]);
  const next  = useCallback(() => setLightboxIdx(i => i !== null ? (i + 1) % media.length : null), [media.length]);

  // 3 columns on ≥md, 2 on mobile
  const cols3 = buildColumns(media, 3);
  const cols2 = buildColumns(media, 2);

  return (
    <div style={{ minHeight: '100vh', background: '#0A0A0A', color: '#fff' }}>

      {/* ── Header ── */}
      <div
        className="relative flex flex-col justify-end"
        style={{
          minHeight: '42vh',
          padding: '0 48px 48px',
          paddingTop: 120,
          background: 'linear-gradient(160deg,#111 0%,#0a0a0a 100%)',
        }}
      >
        <Link
          href="/"
          className="flex items-center gap-2 t-label mb-10 w-fit transition-colors hover:text-[#C7E200]"
          style={{ color: 'rgba(255,255,255,0.3)' }}
        >
          <ArrowLeft size={12} /> Back
        </Link>

        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
          className="t-label mb-5" style={{ color: 'rgba(255,255,255,0.3)' }}
        >
          {subtitle}
        </motion.p>

        <div style={{ overflow: 'hidden' }}>
          <motion.h1
            initial={{ y: '100%' }} animate={{ y: 0 }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
            className="t-display"
            style={{ fontSize: 'clamp(3rem,7vw,8rem)', lineHeight: 0.9, whiteSpace: 'pre-line' }}
          >
            {title}
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="font-light leading-relaxed mt-6"
          style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.38)', maxWidth: 440 }}
        >
          {description}
        </motion.p>
      </div>

      {/* ── Empty state ── */}
      {media.length === 0 && (
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', padding: '120px 24px', textAlign: 'center',
        }}>
          <div style={{
            width: 56, height: 56, border: '1px solid rgba(255,255,255,0.08)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 28,
          }}>
            <div style={{ width: 14, height: 14, background: 'rgba(255,255,255,0.06)' }} />
          </div>
          <p style={{ color: 'rgba(255,255,255,0.28)', fontSize: '0.9rem', marginBottom: 8 }}>
            Gallery coming soon
          </p>
          <p style={{ color: 'rgba(255,255,255,0.14)', fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            Add files to{' '}
            <code style={{ color: '#C7E200', opacity: 0.55 }}>
              public/{subtitle.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}/
            </code>
          </p>
        </div>
      )}

      {/* ── True CSS masonry gallery ── */}
      {media.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.7 }}
          style={{ padding: '20px 12px 80px' }}
        >
          {/* Desktop: 3 columns */}
          <div className="hidden md:flex gap-3 items-start">
            {cols3.map((col, ci) => (
              <div key={ci} className="flex flex-col gap-3" style={{ flex: 1, minWidth: 0 }}>
                {col.map(({ item, originalIndex }) => (
                  <GalleryItem
                    key={originalIndex}
                    item={item}
                    index={originalIndex}
                    totalDelay={originalIndex * 0.04}
                    onOpen={open}
                  />
                ))}
              </div>
            ))}
          </div>

          {/* Mobile: 2 columns */}
          <div className="flex md:hidden gap-2 items-start">
            {cols2.map((col, ci) => (
              <div key={ci} className="flex flex-col gap-2" style={{ flex: 1, minWidth: 0 }}>
                {col.map(({ item, originalIndex }) => (
                  <GalleryItem
                    key={originalIndex}
                    item={item}
                    index={originalIndex}
                    totalDelay={originalIndex * 0.04}
                    onOpen={open}
                  />
                ))}
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightboxIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'fixed', inset: 0, zIndex: 9999,
              background: 'rgba(0,0,0,0.97)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
            onClick={close}
          >
            {/* counter */}
            <p className="t-label absolute" style={{ top: 28, left: '50%', transform: 'translateX(-50%)', color: 'rgba(255,255,255,0.3)' }}>
              {lightboxIdx + 1} / {media.length}
            </p>

            {/* close */}
            <button
              onClick={close}
              style={{
                position: 'absolute', top: 20, right: 20,
                width: 40, height: 40, border: '1px solid rgba(255,255,255,0.12)',
                background: 'transparent', color: 'rgba(255,255,255,0.55)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'none', transition: 'color 0.2s, border-color 0.2s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = '#fff'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.55)'; }}
            >
              <X size={16} />
            </button>

            {/* prev */}
            <NavBtn side="left" onClick={(e) => { e.stopPropagation(); prev(); }} />

            {/* media */}
            <motion.div
              key={lightboxIdx}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.28 }}
              style={{ maxWidth: '90vw', maxHeight: '88vh', display: 'flex', alignItems: 'center' }}
              onClick={e => e.stopPropagation()}
            >
              {media[lightboxIdx].type === 'video' ? (
                <video
                  src={media[lightboxIdx].src} controls autoPlay
                  style={{ maxWidth: '90vw', maxHeight: '88vh', objectFit: 'contain', display: 'block' }}
                />
              ) : (
                <img
                  src={media[lightboxIdx].src}
                  alt={media[lightboxIdx].alt || title}
                  style={{ maxWidth: '90vw', maxHeight: '88vh', objectFit: 'contain', display: 'block' }}
                />
              )}
            </motion.div>

            {/* next */}
            <NavBtn side="right" onClick={(e) => { e.stopPropagation(); next(); }} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Gallery item — preserves natural image ratio, no forced height ── */
function GalleryItem({
  item, index, totalDelay, onOpen,
}: {
  item: MediaItem;
  index: number;
  totalDelay: number;
  onOpen: (i: number) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: totalDelay, duration: 0.55, ease: 'easeOut' }}
      onClick={() => onOpen(index)}
      style={{
        position: 'relative', cursor: 'none',
        overflow: 'hidden', display: 'block',
        background: '#111',
      }}
      className="group"
    >
      {item.type === 'video' ? (
        <>
          <video
            src={item.src} muted loop playsInline
            style={{
              display: 'block', width: '100%', height: 'auto',
              transition: 'transform 0.6s ease',
            }}
            className="group-hover:scale-[1.03]"
            onMouseEnter={e => (e.currentTarget as HTMLVideoElement).play()}
            onMouseLeave={e => (e.currentTarget as HTMLVideoElement).pause()}
          />
          {/* Play badge */}
          <div
            style={{
              position: 'absolute', inset: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'rgba(0,0,0,0.18)',
              transition: 'background 0.3s',
            }}
            className="group-hover:bg-transparent"
          >
            <div style={{
              width: 44, height: 44, borderRadius: '50%',
              background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(4px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Play size={15} style={{ color: '#fff', marginLeft: 2 }} />
            </div>
          </div>
        </>
      ) : (
        <img
          src={item.src}
          alt={item.alt || ''}
          loading="lazy"
          style={{
            display: 'block', width: '100%', height: 'auto',
            transition: 'transform 0.65s ease',
          }}
          className="group-hover:scale-[1.03]"
        />
      )}

      {/* Hover sheen */}
      <div
        style={{
          position: 'absolute', inset: 0,
          background: 'rgba(0,0,0,0)',
          transition: 'background 0.35s',
          pointerEvents: 'none',
        }}
        className="group-hover:bg-black/10"
      />
    </motion.div>
  );
}

/* ── Lightbox nav button ── */
function NavBtn({ side, onClick }: { side: 'left' | 'right'; onClick: (e: React.MouseEvent) => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        position: 'absolute',
        [side]: 16,
        top: '50%', transform: 'translateY(-50%)',
        width: 40, height: 40,
        border: '1px solid rgba(255,255,255,0.12)',
        background: 'transparent',
        color: 'rgba(255,255,255,0.55)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'none', transition: 'color 0.2s, border-color 0.2s',
      }}
      onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = '#fff'; (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.35)'; }}
      onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.55)'; (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.12)'; }}
    >
      {side === 'left' ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
    </button>
  );
}
