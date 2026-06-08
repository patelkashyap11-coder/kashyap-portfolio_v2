'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const services = [
  {
    id: 1,
    title: 'Fashion Photography',
    desc: 'Editorial and campaign shoots that capture the essence of fashion — lookbooks, brand campaigns, e-commerce and lifestyle imagery. We work with stylists, MUAs and art directors to craft visuals that sell.',
  },
  {
    id: 2,
    title: 'Restaurant Content',
    desc: 'Mouthwatering food photography and atmospheric restaurant imagery that drives bookings. Menu shoots, social content, PR visuals and full brand identity shoots for hospitality brands.',
  },
  {
    id: 3,
    title: 'Jewellery Photography',
    desc: 'Precision lighting and styling for jewellery — from fine macro shots to lifestyle campaign imagery. Every piece deserves to shine at its absolute best.',
  },
  {
    id: 4,
    title: 'Product Photography',
    desc: 'Clean, compelling product imagery for e-commerce, catalogues and campaigns. White-background studio work, styled flatlay compositions and lifestyle context shots.',
  },
  {
    id: 5,
    title: 'Interior Photography',
    desc: 'Architectural and interior photography that tells the story of a space — for hotels, restaurants, residences and commercial interiors. Natural light mastery and twilight exteriors.',
  },
  {
    id: 6,
    title: 'Commercial Films',
    desc: 'Short-form commercial videos for social media, brand films, reels and digital campaigns. From concept to final cut, we handle the full production pipeline.',
  },
  {
    id: 7,
    title: 'Creative Direction',
    desc: 'End-to-end creative direction for brand identity shoots — campaign concepts, moodboarding, location scouting, talent casting and full shoot production management.',
  },
];

export function WhatWeDoSection() {
  const [openId, setOpenId]   = useState<number | null>(null);
  const [hoverId, setHoverId] = useState<number | null>(null);

  const toggle = (id: number) => setOpenId(prev => (prev === id ? null : id));

  return (
    <section
      className="what-we-do"
      style={{
        background: '#ffffff',
        padding: '120px 0 140px',
        borderTop: '1px solid #d9d9d9',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 48px' }}>

        {/* ── Section header ── */}
        <div style={{ marginBottom: 72 }}>
          <p
            style={{
              fontFamily: 'var(--font-tight)',
              fontWeight: 500,
              fontSize: '0.6875rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase' as const,
              color: '#999999',
              marginBottom: 20,
            }}
          >
            Services
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-tight)',
              fontWeight: 800,
              fontSize: 'clamp(4.5rem,8vw,10rem)',
              letterSpacing: '-0.045em',
              lineHeight: 0.88,
              textTransform: 'uppercase' as const,
              color: '#0A0A0A',
            }}
          >
            WHAT I DO
          </h2>
        </div>

        {/* ── Accordion list ── */}
        <div style={{ borderTop: '1px solid #d9d9d9' }}>
          {services.map((s) => {
            const isOpen  = openId  === s.id;
            const isHover = hoverId === s.id;
            const active  = isOpen || isHover;

            return (
              <div key={s.id} style={{ borderBottom: '1px solid #d9d9d9' }}>
                {/* Row */}
                <button
                  onClick={() => toggle(s.id)}
                  onMouseEnter={() => setHoverId(s.id)}
                  onMouseLeave={() => setHoverId(null)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '34px 24px',
                    background: active ? '#C7E200' : 'transparent',
                    margin: '0',
                    boxSizing: 'border-box' as const,
                    transition: 'background 0.25s ease',
                    border: 'none',
                    textAlign: 'left' as const,
                    // widen to container edge when active
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-tight)',
                      fontWeight: 700,
                      fontSize: 'clamp(1.5rem,2.4vw,2.2rem)',
                      letterSpacing: '-0.025em',
                      color: '#0A0A0A',
                      lineHeight: 1,
                    }}
                  >
                    {s.title}
                  </span>

                  {/* + rotates 45° to become × */}
                  <span
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 36,
                      height: 36,
                      flexShrink: 0,
                      border: `1.5px solid ${active ? '#0A0A0A' : '#d9d9d9'}`,
                      borderRadius: '50%',
                      fontSize: '1.3rem',
                      fontWeight: 300,
                      lineHeight: 1,
                      color: '#0A0A0A',
                      transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s cubic-bezier(0.76,0,0.24,1), border-color 0.25s ease',
                      userSelect: 'none' as const,
                    }}
                  >
                    +
                  </span>
                </button>

                {/* Expandable body */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="body"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        height:  { duration: 0.32, ease: [0.76, 0, 0.24, 1] as [number,number,number,number] },
                        opacity: { duration: 0.22, ease: 'easeOut' },
                      }}
                      style={{ overflow: 'hidden', background: '#ffffff' }}
                    >
                      <p
                        style={{
                          fontFamily: 'var(--font-inter)',
                          fontWeight: 600,
                          fontSize: 'clamp(1.15rem,1.4vw,1.35rem)',
                          lineHeight: 1.75,
                          color: '#222222',
                          maxWidth: 850,
                          padding: '28px 0 40px',
                        }}
                      >
                        {s.desc}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
