import { HeroSection } from '@/components/HeroSection';
import { CategorySection } from '@/components/CategorySection';
import { WhatWeDoSection } from '@/components/WhatWeDoSection';
import { TrustedBySection } from '@/components/TrustedBySection';
import { CTASection } from '@/components/CTASection';
import { getPreviewCategories } from '@/lib/categoryData';
import { getClients } from '@/lib/getClients';
import { getHomepageMediaMap } from '@/lib/getHomepageMedia';
import { cloudinaryVideoUrl } from '@/lib/cloudinaryUrl';
import { PREVIEW_TIMELESS_PATH } from '@/lib/content/preview';

export const dynamic = 'force-dynamic';

export default async function TimelessPreviewPage() {
  const [clients, homepageMedia] = await Promise.all([
    getClients(),
    getHomepageMediaMap(),
  ]);

  const categories = getPreviewCategories();
  const homepageCategories = categories.map((cat) => ({
    title: cat.slug === 'interiors' ? 'INTERIORS & SPACES' : cat.title,
    href: `${PREVIEW_TIMELESS_PATH}/${cat.slug}`,
    videoSrc: cloudinaryVideoUrl(homepageMedia[cat.slug]?.videoSrc ?? cat.videoSrc, 'hero'),
    imageSrc: homepageMedia[cat.slug]?.imageSrc ?? cat.imageSrc,
  }));

  return (
    <>
      <HeroSection />

      <div className="hero-category-spacer" aria-hidden />

      <div
        className="category-stack-wrapper"
        style={{ height: `${homepageCategories.length * 100}vh` }}
      >
        {homepageCategories.map((cat, i) => (
          <CategorySection key={cat.href} {...cat} index={i} />
        ))}
      </div>

      <div className="homepage-after-categories">
        <WhatWeDoSection />
        <TrustedBySection clients={clients} />
        <CTASection />
      </div>
    </>
  );
}
