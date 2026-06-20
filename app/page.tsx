import { HeroSection } from '@/components/HeroSection';
import { CategoryStack } from '@/components/CategoryStack';
import { WhatWeDoSection } from '@/components/WhatWeDoSection';
import { TrustedBySection } from '@/components/TrustedBySection';
import { CTASection } from '@/components/CTASection';
import { categories } from '@/lib/categoryData';
import { getClients } from '@/lib/getClients';
import { getHomepageMediaMap } from '@/lib/getHomepageMedia';
import { cloudinaryVideoUrl } from '@/lib/cloudinaryUrl';
import { getHomeMetadata } from '@/lib/seo';

export const metadata = getHomeMetadata();
export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const [clients, homepageMedia] = await Promise.all([
    getClients(),
    getHomepageMediaMap(),
  ]);

  const homepageCategories = categories.map((cat) => ({
    title: cat.slug === 'interiors' ? 'INTERIORS & SPACES' : cat.title,
    href: `/${cat.slug}`,
    slug: cat.slug,
    videoSrc: cloudinaryVideoUrl(
      homepageMedia[cat.slug]?.videoSrc ?? cat.videoSrc,
      cat.slug === 'fashion' ? 'hero-hd' : 'hero',
    ),
    imageSrc: homepageMedia[cat.slug]?.imageSrc ?? cat.imageSrc,
  }));

  return (
    <div className="homepage">
      <HeroSection />

      <div className="hero-category-spacer" aria-hidden />

      <CategoryStack categories={homepageCategories} />

      <div className="homepage-after-categories">
        <WhatWeDoSection />
        <TrustedBySection clients={clients} />
        <CTASection />
      </div>
    </div>
  );
}
