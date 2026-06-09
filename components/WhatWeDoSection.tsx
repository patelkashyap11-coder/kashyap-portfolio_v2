'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X } from 'lucide-react';
import { useSiteContent } from '@/lib/content/ContentProvider';

export function WhatWeDoSection() {
  const siteContent = useSiteContent();
  const { howWeWork } = siteContent;
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
          {howWeWork.eyebrow}
        </motion.p>

        {howWeWork.mode === 'static' ? (
          <motion.div
            className="what-we-do-static"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.76, 0, 0.24, 1] }}
          >
            {howWeWork.intro ? <p className="what-we-do-static-text">{howWeWork.intro}</p> : null}
            {howWeWork.servicesIntro ? (
              <p className="what-we-do-static-text">{howWeWork.servicesIntro}</p>
            ) : null}
            {siteContent.about ? (
              <>
                <p className="what-we-do-static-text">{siteContent.about.paragraph1}</p>
                <p className="what-we-do-static-text">{siteContent.about.paragraph2}</p>
                <p className="what-we-do-static-quote">{siteContent.about.closing}</p>
              </>
            ) : null}
          </motion.div>
        ) : (
          <div className="what-we-do-list">
            {howWeWork.services?.map((service) => {
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
        )}
      </div>
    </section>
  );
}
