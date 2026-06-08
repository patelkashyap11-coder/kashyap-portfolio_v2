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

export default function HomePage() {
  return (
    <>
      <HeroSection />

      <div className="hero-category-spacer" aria-hidden />

      <div
        className="category-stack-wrapper"
        style={{ height: `${homepageCategories.length * 100}vh` }}
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
