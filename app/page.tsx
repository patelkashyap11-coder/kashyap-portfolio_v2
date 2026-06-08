import { HeroSection } from '@/components/HeroSection';
import { CategorySection } from '@/components/CategorySection';
import { CategoryMobileShowcase } from '@/components/CategoryMobileShowcase';
import { WhatWeDoSection } from '@/components/WhatWeDoSection';
import { TrustedBySection } from '@/components/TrustedBySection';
import { CTASection } from '@/components/CTASection';
import { categories } from '@/lib/categoryData';

const homepageCategories = categories.map((cat) => ({
  title: cat.slug === 'interiors' ? 'INTERIORS & SPACES' : cat.title,
  subtitle: cat.subtitle,
  href: `/${cat.slug}`,
  videoSrc: cat.videoSrc,
  imageSrc: cat.imageSrc,
  pillLabel:
    cat.slug === 'food-hospitality'
      ? 'FOOD'
      : cat.slug === 'interiors'
        ? 'INTERIORS'
        : cat.title,
}));

export default function HomePage() {
  return (
    <>
      <HeroSection />

      <div className="hero-category-spacer" aria-hidden />

      <CategoryMobileShowcase categories={homepageCategories} />

      {/* Desktop sticky stack */}
      <div
        className="category-stack-wrapper category-stack-wrapper--desktop"
        style={{ height: `${homepageCategories.length * 100}vh` }}
      >
        {homepageCategories.map((cat, i) => (
          <CategorySection
            key={cat.href}
            title={cat.title}
            href={cat.href}
            videoSrc={cat.videoSrc}
            imageSrc={cat.imageSrc}
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
