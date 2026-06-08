import { HeroSection } from '@/components/HeroSection';
import { CategorySection } from '@/components/CategorySection';
import { WhatWeDoSection } from '@/components/WhatWeDoSection';
import { TrustedBySection } from '@/components/TrustedBySection';
import { CTASection } from '@/components/CTASection';

const categories = [
  {
    title: 'FASHION',
    href: '/fashion',
    videoSrc:
      'https://res.cloudinary.com/dvcymatjg/video/upload/v1780803366/fashion_fjqklk.mp4',
    imageSrc: '/homepage/fashion.jpg',
  },
  {
    title: 'FOOD & HOSPITALITY',
    href: '/food-hospitality',
    videoSrc:
      'https://res.cloudinary.com/dvcymatjg/video/upload/v1780803361/food_ba669d.mp4',
    imageSrc: '/homepage/food.jpg',
  },
  {
    title: 'JEWELLERY',
    href: '/jewellery',
    videoSrc:
      'https://res.cloudinary.com/dvcymatjg/video/upload/v1780803368/jewellery_prcnbx.mp4',
    imageSrc: '/homepage/jewellery.jpg',
  },
  {
    title: 'PRODUCTS',
    href: '/products',
    videoSrc:
      'https://res.cloudinary.com/dvcymatjg/video/upload/v1780803363/products_pwdlyy.mp4',
    imageSrc: '/homepage/products.jpg',
  },
  {
    title: 'INTERIORS & SPACES',
    href: '/interiors',
    videoSrc:
      'https://res.cloudinary.com/dvcymatjg/video/upload/v1780803362/interiors_flgrmx.mp4',
    imageSrc: '/homepage/interiors.jpg',
  },
];

export default function HomePage() {
  return (
    <>
      <HeroSection />

      <div className="hero-category-spacer" aria-hidden />

      {/* Bounded sticky stack — releases into normal flow after Interiors */}
      <div
        className="category-stack-wrapper"
        style={{ height: `${categories.length * 100}vh` }}
      >
        {categories.map((cat, i) => (
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
