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
  const [openId, setOpenId] = useState<number | null>(null);
  const [dotVisible, setDotVisible] = useState<number | null>(null);

  const toggle = (id: number) => {
    if (openId === id) {
      setOpenId(null);
      setDotVisible(null);
    } else {
      setOpenId(id);
      setDotVisible(id);
      // fade dot after 900 ms
      setTimeout(() => setDotVisible(null), 900);
    }
  };

  return (
    <section style={{ background: '#F5F5F2', padding: '120px 48px 140px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-20">
          <div>
            <p className="t-label mb-5" style={{ color: '#888888' }}>Services</p>
            <h2
              className="t-display"
              style={{ fontSize: 'clamp(3.5rem,6vw,7rem)', color: '#0A0A0A' }}
            >
              WHAT I DO
            </h2>
          </div>
          <p
            className="font-light leading-relaxed max-w-sm"
            style={{ fontSize: '1rem', color: '#777777' }}
          >
            A full-service visual production studio specialising in premium brand content.
          </p>
        </div>

        {/* Accordion */}
        <div>
          {services.map((s) => {
            const isOpen = openId === s.id;
            return (
              <div key={s.id} className="acc-row">
                <button
                  onClick={() => toggle(s.id)}
                  className="w-full flex items-center justify-between text-left group"
                  style={{ padding: '28px 0' }}
                >
                  <div className="flex items-center gap-8">
                    {/* Animated dot — only visible briefly on open */}
                    <span
                      style={{
                        display: 'inline-block',
                        width: 8, height: 8,
                        borderRadius: '50%',
                        background: '#C7E200',
                        flexShrink: 0,
                        transition: 'opacity 0.4s ease',
                        opacity: dotVisible === s.id ? 1 : 0,
                      }}
                    />
                    <h3
                      style={{
                        fontFamily: 'var(--font-tight)',
                        fontWeight: 600,
                        fontSize: 'clamp(1.25rem,2vw,1.75rem)',
                        letterSpacing: '-0.02em',
                        color: isOpen ? '#0A0A0A' : 'rgba(10,10,10,0.5)',
                        transition: 'color 0.3s ease',
                      }}
                    >
                      {s.title}
                    </h3>
                  </div>

                  {/* +/- icon */}
                  <span
                    style={{
                      width: 32, height: 32, borderRadius: '50%',
                      border: `1px solid ${isOpen ? '#0A0A0A' : 'rgba(10,10,10,0.2)'}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0,
                      transition: 'border-color 0.3s ease, background 0.3s ease',
                      background: isOpen ? '#0A0A0A' : 'transparent',
                      fontSize: '1.1rem', lineHeight: 1,
                      color: isOpen ? '#fff' : '#0A0A0A',
                      fontWeight: 300,
                    }}
                  >
                    {isOpen ? '−' : '+'}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="body"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.42, ease: [0.76, 0, 0.24, 1] }}
                      style={{ overflow: 'hidden' }}
                    >
                      <p
                        className="font-light leading-relaxed"
                        style={{
                          fontSize: 'clamp(0.95rem,1.1vw,1.1rem)',
                          color: '#666666',
                          maxWidth: 680,
                          paddingBottom: 32,
                          paddingLeft: 48,
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
