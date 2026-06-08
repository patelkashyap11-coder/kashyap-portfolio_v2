'use client';
import { motion } from 'framer-motion';

const rise = (delay: number) => ({
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay, ease: [0.76, 0, 0.24, 1] as [number, number, number, number] },
  },
});

export function HeroSection() {
  return (
    <section className="hero-section relative flex flex-col overflow-x-hidden">
      <div className="hero-content flex flex-col justify-start">
        <div className="hero-headline-block">
          <div className="hero-headline-line">
            <motion.h1
              variants={rise(0.1)}
              initial="hidden"
              animate="show"
              className="hero-headline hero-headline-sans"
            >
              CREATING
            </motion.h1>
          </div>

          <div className="hero-headline-line">
            <motion.h1
              variants={rise(0.22)}
              initial="hidden"
              animate="show"
              className="hero-headline hero-headline-sans"
            >
              VISUAL STORIES
            </motion.h1>
          </div>

          <div className="hero-headline-line">
            <motion.h1
              variants={rise(0.34)}
              initial="hidden"
              animate="show"
              className="hero-headline hero-headline-sans"
            >
              THAT{' '}
              <span className="hero-headline-accent">LAST</span>
            </motion.h1>
          </div>
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
          We create{' '}
          <span className="hero-text-highlight">visual stories</span> that help
          brands stand out — from{' '}
          <span className="hero-text-highlight">fashion campaigns</span> and{' '}
          <span className="hero-text-highlight">restaurant content</span> to{' '}
          <span className="hero-text-highlight">jewellery</span>,{' '}
          <span className="hero-text-highlight">products</span> and{' '}
          <span className="hero-text-highlight">interiors</span>.
        </p>
      </motion.div>

      <motion.div
        className="hero-scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.05 }}
        aria-hidden
      >
        <span className="hero-scroll-indicator-line" />
      </motion.div>
    </section>
  );
}
