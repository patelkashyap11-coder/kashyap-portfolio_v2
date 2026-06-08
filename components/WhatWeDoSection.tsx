'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const services = [
  {
    id: 1,
    title: 'Fashion Photography',
    capabilities: [
      'Campaign Production',
      'Editorial Shoots',
      'Lookbooks',
      'E-commerce Content',
      'Creative Direction',
    ],
  },
  {
    id: 2,
    title: 'Restaurant Content',
    capabilities: [
      'Food Photography',
      'Social Content',
      'Menu Shoots',
      'Brand Storytelling',
      'Commercial Reels',
    ],
  },
  {
    id: 3,
    title: 'Jewellery Photography',
    capabilities: [
      'Macro Product Shots',
      'Campaign Imagery',
      'Lifestyle Styling',
      'Catalogue Production',
      'Creative Direction',
    ],
  },
  {
    id: 4,
    title: 'Product Photography',
    capabilities: [
      'E-commerce Imagery',
      'Studio Product Shots',
      'Styled Flatlays',
      'Lifestyle Context',
      'Catalogue Production',
    ],
  },
  {
    id: 5,
    title: 'Interior Photography',
    capabilities: [
      'Architectural Shots',
      'Hospitality Spaces',
      'Residential Interiors',
      'Twilight Exteriors',
      'Spatial Storytelling',
    ],
  },
  {
    id: 6,
    title: 'Commercial Films',
    capabilities: [
      'Brand Films',
      'Social Reels',
      'Campaign Videos',
      'Product Films',
      'Full Production',
    ],
  },
];

export function WhatWeDoSection() {
  const [openId, setOpenId] = useState<number | null>(null);
  const toggle = (id: number) => setOpenId(prev => (prev === id ? null : id));

  return (
    <section className="what-we-do">
      <div className="what-we-do-inner">
        <motion.div
          className="what-we-do-header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <h2 className="what-we-do-title t-display">WHAT I DO</h2>
        </motion.div>

        <div className="what-we-do-list">
          {services.map((s) => {
            const isOpen = openId === s.id;

            return (
              <div key={s.id} className={`what-we-do-item${isOpen ? ' is-open' : ''}`}>
                <button
                  type="button"
                  className="what-we-do-trigger"
                  onClick={() => toggle(s.id)}
                  aria-expanded={isOpen}
                >
                  <span className="what-we-do-trigger-title">{s.title}</span>
                  <span className={`what-we-do-icon${isOpen ? ' is-open' : ''}`} aria-hidden>
                    {isOpen ? '×' : '+'}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="panel"
                      className="what-we-do-panel"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        height: { duration: 0.38, ease: [0.76, 0, 0.24, 1] },
                        opacity: { duration: 0.22, ease: 'easeOut' },
                      }}
                    >
                      <ul className="what-we-do-capabilities">
                        {s.capabilities.map((cap) => (
                          <li key={cap}>{cap}</li>
                        ))}
                      </ul>
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
