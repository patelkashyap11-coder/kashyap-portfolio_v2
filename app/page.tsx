import type { CSSProperties } from 'react';
import { HeroSection } from '@/components/HeroSection';
import { CategorySection } from '@/components/CategorySection';
import { WhatWeDoSection } from '@/components/WhatWeDoSection';
import { TrustedBySection } from '@/components/TrustedBySection';
import { CTASection } from '@/components/CTASection';
import { categories } from '@/lib/categoryData';

const homepageCategories = categories.map((cat) => ({
  title: cat.slug === 'interiors' ? 'INTERIORS & SPACES' : cat.title,
  href: `/${cat.slug}`,
  videoSrc: cat.videoSrc,
  imageSrc: cat.imageSrc,
}));

type CategoryStackStyle = CSSProperties & {
  '--category-stack-height': string;
  '--category-stack-height-vh': string;
};

export default function HomePage() {
  const categoryStackHeight = `${homepageCategories.length * 100}`;
  const categoryStackStyle: CategoryStackStyle = {
    '--category-stack-height': `${categoryStackHeight}svh`,
    '--category-stack-height-vh': `${categoryStackHeight}vh`,
  };

  return (
    <>
      <HeroSection />

      <div className="hero-category-spacer" aria-hidden />

      {/* Bounded sticky stack — releases into normal flow after Interiors */}
      <div
        className="category-stack-wrapper"
        style={categoryStackStyle}
      >
        {homepageCategories.map((cat, i) => (
          <CategorySection
            key={cat.href}
            {...cat}
            index={i}
          />
        ))}
      </div>

      <div className="homepage-after-categories">
        <WhatWeDoSection />
        <TrustedBySection />
        <CTASection />
      </div>
    </>
  );
}
