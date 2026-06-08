'use client';
import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

interface Props {
  title: string;
  href: string;
  videoSrc?: string;
  imageSrc?: string;
  index: number;
}

const reveal = {
  hidden: { opacity: 0, x: -40 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.9,
      ease: [0.76, 0, 0.24, 1] as [number, number, number, number],
    },
  },
};

export function CategorySection({ title, href, videoSrc, imageSrc, index }: Props) {
  const ref = useRef<HTMLElement>(null);
  const isFirst = index === 0;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.06, 1, 1.06]);

  return (
    <section
      ref={ref}
      className="category-section relative overflow-hidden group"
      style={{
        zIndex: index + 1,
      }}
    >
      <motion.div style={{ scale, position: 'absolute', inset: 0 }}>
        {videoSrc ? (
          <video
            src={videoSrc}
            autoPlay
            muted
            loop
            playsInline
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              backgroundImage: imageSrc ? `url(${imageSrc})` : undefined,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundColor: `hsl(${index * 22},5%,8%)`,
            }}
          />
        )}
      </motion.div>

      <div className="category-overlay" />

      <div
        className={`category-content relative h-full flex flex-col justify-start items-start${isFirst ? ' category-content--first' : ''}`}
      >
        <motion.div
          className="category-stack flex flex-col items-start"
          variants={reveal}
          initial="hidden"
          animate={isFirst ? 'show' : undefined}
          whileInView={isFirst ? undefined : 'show'}
          viewport={{ once: true, amount: 0.15 }}
        >
          <h2 className="category-title t-display text-white">{title}</h2>

          <Link href={href} className="category-cta group/btn">
            <span>View Work</span>
            <span className="category-cta-icon flex items-center justify-center transition-all duration-300 group-hover/btn:border-[#C7E200] group-hover/btn:text-[#C7E200]">
              <ArrowUpRight size={8} className="category-cta-arrow" />
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
