'use client';
import { motion } from 'framer-motion';
import { useSiteContent } from '@/lib/content/ContentProvider';

const rise = (delay: number) => ({
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay, ease: [0.76, 0, 0.24, 1] as [number, number, number, number] },
  },
});

export function HeroSection() {
  const { hero } = useSiteContent();

  return (
    <section className="hero-section relative flex flex-col overflow-x-hidden">
      <div className="hero-content flex flex-col justify-start">
        <div className="hero-headline-block">
          {hero.lines.map((line, index) => {
            if (!line && index !== hero.accentLine) return null;

            const delay = 0.1 + index * 0.12;

            return (
              <div key={`${line}-${index}`} className="hero-headline-line">
                <motion.h1
                  variants={rise(delay)}
                  initial="hidden"
                  animate="show"
                  className="hero-headline hero-headline-sans"
                >
                  {index === hero.accentLine ? (
                    <>
                      {line ? `${line} ` : null}
                      <span className="hero-headline-accent">{hero.accentWord}</span>
                    </>
                  ) : (
                    line
                  )}
                </motion.h1>
              </div>
            );
          })}
        </div>
      </div>

      <div className="hero-divider divider" />

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7, ease: 'easeOut' }}
        className="hero-intro"
      >
        <p className="hero-intro-text">
          {hero.subheadlineSegments
            ? hero.subheadlineSegments.map((segment, index) =>
                segment.highlight ? (
                  <span key={index} className="hero-text-highlight">
                    {segment.text}
                  </span>
                ) : (
                  <span key={index}>{segment.text}</span>
                ),
              )
            : hero.subheadline}
        </p>
      </motion.div>

      <motion.div
        className="hero-scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.05 }}
        aria-hidden
      >
        <span className="hero-scroll-line" />
      </motion.div>
    </section>
  );
}
