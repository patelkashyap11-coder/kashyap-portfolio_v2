'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X } from 'lucide-react';

const services = [
  {
    id: 1,
    title: 'Conception',
    capabilities: [
      {
        title: 'Research + concept',
        description:
          'We explore your world to uncover compelling narratives and shape an inspiring creative concept.',
      },
      {
        title: 'Storytelling + writing',
        description:
          'We turn your message into a powerful story that moves your audience.',
      },
      {
        title: 'Direction + storyboard',
        description:
          'We build a consistent visual universe and plan the narrative arc shot by shot.',
      },
      {
        title: 'Visual and narrative consultation',
        description:
          'We support you in refining your creative identity and visual storytelling, at every stage of the process.',
      },
    ],
  },
  {
    id: 2,
    title: 'Pré-production',
    capabilities: [
      {
        title: 'Location scouting',
        description:
          'We find the location that works best for the story and the associated visuals and production needs.',
      },
      {
        title: 'Casting',
        description:
          'We carefully curate the film, choosing the right voices, faces, and skills to convey your vision.',
      },
      {
        title: 'Styling',
        description:
          'We define look, wardrobe, and set details that reinforce the story and your brand.',
      },
      {
        title: 'Shoot package',
        description:
          'We lock in crew, schedule, gear, and deliverables so production runs smoothly on set.',
      },
    ],
  },
  {
    id: 3,
    title: 'Tournage',
    capabilities: [
      {
        title: 'Filming',
        description:
          'From corporate content to interviews and commercials — we film with a clear visual vision and a focus on production quality.',
      },
      {
        title: 'Photography',
        description:
          'From portraits to product photography — we create visual storytelling that elevates your brand and connects with your audience.',
      },
      {
        title: 'Motion design',
        description:
          'Clean, creative animations that add depth and energy to your film or campaign without overpowering your message.',
      },
    ],
  },
  {
    id: 4,
    title: 'Post production',
    capabilities: [
      {
        title: 'Editing',
        description:
          'We build a clear, engaging narrative that guides the viewer through your story.',
      },
      {
        title: 'Animation',
        description:
          'Motion that adds rhythm, emphasis and polish — never just decoration.',
      },
      {
        title: 'Mix, sound design',
        description:
          'We shape sound to heighten emotion and set the mood — fully tailored to your story.',
      },
      {
        title: 'Color grading',
        description:
          'Color grading that reinforces the atmosphere, identity and emotion of your visuals.',
      },
    ],
  },
];

export function WhatWeDoSection() {
  const [openId, setOpenId] = useState<number | null>(null);
  const toggle = (id: number) => setOpenId((prev) => (prev === id ? null : id));

  return (
    <section className="what-we-do">
      <div className="what-we-do-inner">
        <motion.p
          className="what-we-do-eyebrow"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        >
          WHAT I DO
        </motion.p>

        <div className="what-we-do-list">
          {services.map((service) => {
            const isOpen = openId === service.id;

            return (
              <div key={service.id} className="what-we-do-item">
                <button
                  type="button"
                  className={`what-we-do-trigger${isOpen ? ' is-open' : ''}`}
                  onClick={() => toggle(service.id)}
                  aria-expanded={isOpen}
                >
                  <span className="what-we-do-trigger-title">{service.title}</span>
                  <span className="what-we-do-icon" aria-hidden>
                    {isOpen ? (
                      <X size={24} strokeWidth={1.25} />
                    ) : (
                      <Plus size={24} strokeWidth={1.25} />
                    )}
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
                        height: {
                          duration: 0.55,
                          ease: [0.76, 0, 0.24, 1] as [number, number, number, number],
                        },
                        opacity: { duration: 0.3, ease: 'easeOut' },
                      }}
                    >
                      <div className="what-we-do-details">
                        {service.capabilities.map((capability) => (
                          <div key={capability.title} className="what-we-do-detail">
                            <h3 className="what-we-do-detail-title">{capability.title}</h3>
                            <p className="what-we-do-detail-text">{capability.description}</p>
                          </div>
                        ))}
                      </div>
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
