import { HeroSection }      from '@/components/HeroSection';
import { CategorySection }  from '@/components/CategorySection';
import { WhatWeDoSection }  from '@/components/WhatWeDoSection';
import { TrustedBySection } from '@/components/TrustedBySection';
import { CTASection }       from '@/components/CTASection';
import { Footer }           from '@/components/Footer';

const categories = [
  { title: 'FASHION',              href: '/fashion',          videoSrc: '/homepage/fashion.mp4',   imageSrc: '/homepage/fashion.jpg' },
  { title: 'FOOD & HOSPITALITY',  href: '/food-hospitality', videoSrc: '/homepage/food.mp4',      imageSrc: '/homepage/food.jpg' },
  { title: 'JEWELLERY',           href: '/jewellery',        videoSrc: '/homepage/jewellery.mp4', imageSrc: '/homepage/jewellery.jpg' },
  { title: 'PRODUCTS',            href: '/products',         videoSrc: '/homepage/products.mp4',  imageSrc: '/homepage/products.jpg' },
  { title: 'INTERIORS & SPACES',  href: '/interiors',        videoSrc: '/homepage/interiors.mp4', imageSrc: '/homepage/interiors.jpg' },
];

export default function HomePage() {
  return (
    <>
      <HeroSection />
      {categories.map((cat, i) => (
        <CategorySection key={cat.href} {...cat} index={i} />
      ))}
      <WhatWeDoSection />
      <TrustedBySection />
      <CTASection />
      <Footer />
    </>
  );
}
