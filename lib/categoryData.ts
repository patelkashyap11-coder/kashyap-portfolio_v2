import { getContentVersion, siteContent } from '@/lib/content';
import type { SiteContent } from '@/lib/content/types';

export interface FeaturedProjectMeta {
  name: string;
  client: string;
  year: string;
  description: string;
  /** Optional code fallback — prefer renaming in Cloudinary to "project 1", "project 2", "project 3" */
  image?: string;
}

export interface CategoryMeta {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  /** Fallback when no matching file exists in Cloudinary `homepage/` folder. */
  videoSrc: string;
  /** Fallback when no matching poster exists in Cloudinary `homepage/` folder. */
  imageSrc: string;
  featuredProjects: FeaturedProjectMeta[];
}

const baseCategories: CategoryMeta[] = [
  {
    slug: 'fashion',
    title: 'FASHION',
    subtitle: 'Fashion Photography',
    description:
      'Editorial campaigns, lookbooks and visual storytelling for brands.',
    videoSrc:
      'https://res.cloudinary.com/dvcymatjg/video/upload/v1780803366/fashion_fjqklk.mp4',
    imageSrc: '/homepage/fashion.jpg',
    featuredProjects: [
      {
        name: 'CRAFTED HERITAGE',
        client: 'Handicraft Campaign',
        year: '2025',
        description:
          'Celebrating the richness of Indian craftsmanship through imagery that honours tradition, artistry, and cultural storytelling.',
      },
      {
        name: 'MODERN SILHOUETTES',
        client: 'Fashion Lookbook',
        year: '2023',
        description:
          'Refined compositions designed to showcase contemporary fashion with clarity, elegance, and intention.',
      },
      {
        name: 'NATURAL NARRATIVES',
        client: 'Editorial Fashion Story',
        year: '2022',
        description:
          'An exploration of light, architecture, and movement, creating imagery that feels both timeless and contemporary.',
      },
    ],
  },
  {
    slug: 'food-hospitality',
    title: 'FOOD & HOSPITALITY',
    subtitle: 'Food & Hospitality Photography',
    description:
      'Restaurants, hotels and culinary experiences captured with refined visual storytelling.',
    videoSrc:
      'https://res.cloudinary.com/dvcymatjg/video/upload/v1780803361/food_ba669d.mp4',
    imageSrc: '/homepage/food.jpg',
    featuredProjects: [
      {
        name: 'Restaurant Feature',
        client: 'Fine Dining Group',
        year: '2024',
        description:
          'Atmospheric imagery celebrating cuisine, craft and the dining experience from kitchen to table.',
      },
      {
        name: 'Hotel Campaign',
        client: 'Boutique Hotel',
        year: '2023',
        description:
          'Lifestyle and architectural frames that convey warmth, luxury and the spirit of hospitality.',
      },
      {
        name: 'Culinary Editorial',
        client: 'Food Magazine',
        year: '2024',
        description:
          'Editorial food photography with dramatic lighting and composition for print and digital features.',
      },
    ],
  },
  {
    slug: 'jewellery',
    title: 'JEWELLERY',
    subtitle: 'Jewellery Photography',
    description:
      'Precision lighting and detail-led imagery where every sparkle tells a story.',
    videoSrc:
      'https://res.cloudinary.com/dvcymatjg/video/upload/v1780803368/jewellery_prcnbx.mp4',
    imageSrc: '/homepage/jewellery.jpg',
    featuredProjects: [
      {
        name: 'Fine Jewellery Collection',
        client: 'Heritage Jeweller',
        year: '2024',
        description:
          'Macro precision and controlled reflections that reveal craftsmanship in every stone and setting.',
      },
      {
        name: 'Campaign Imagery',
        client: 'Luxury Brand',
        year: '2023',
        description:
          'Hero product shots and lifestyle pairings designed for campaign, retail and e-commerce.',
      },
      {
        name: 'Editorial Spread',
        client: 'Fashion Publication',
        year: '2024',
        description:
          'Art-directed jewellery editorial blending portraiture with product detail for magazine features.',
      },
    ],
  },
  {
    slug: 'products',
    title: 'PRODUCTS',
    subtitle: 'Product Photography',
    description:
      'Clean, commercial product imagery designed for brands, campaigns and e-commerce.',
    videoSrc:
      'https://res.cloudinary.com/dvcymatjg/video/upload/v1780803363/products_pwdlyy.mp4',
    imageSrc: '/homepage/products.jpg',
    featuredProjects: [
      {
        name: 'Brand Campaign',
        client: 'Consumer Brand',
        year: '2024',
        description:
          'Studio and lifestyle product frames built for multi-channel campaign deployment.',
      },
      {
        name: 'E-Commerce Suite',
        client: 'Retail Partner',
        year: '2023',
        description:
          'Consistent, conversion-focused product imagery across catalogues and marketplaces.',
      },
      {
        name: 'Packaging & Detail',
        client: 'Design Studio',
        year: '2024',
        description:
          'Close-up detail and packaging shots that highlight material, finish and brand identity.',
      },
    ],
  },
  {
    slug: 'interiors',
    title: 'INTERIORS',
    subtitle: 'Interior Photography',
    description:
      'Architectural and interior imagery that highlights design, atmosphere and detail.',
    videoSrc:
      'https://res.cloudinary.com/dvcymatjg/video/upload/v1780803362/interiors_flgrmx.mp4',
    imageSrc: '/homepage/interiors.jpg',
    featuredProjects: [
      {
        name: 'Residential Project',
        client: 'Interior Designer',
        year: '2024',
        description:
          'Natural light and spatial composition that showcase material palettes and design intent.',
      },
      {
        name: 'Commercial Space',
        client: 'Architecture Firm',
        year: '2023',
        description:
          'Wide-angle architectural frames capturing flow, scale and the relationship between spaces.',
      },
      {
        name: 'Hospitality Interior',
        client: 'Hotel Group',
        year: '2024',
        description:
          'Atmospheric interior photography that conveys mood, luxury and the guest experience.',
      },
    ],
  },
];

export function getCategoriesWithContent(content: SiteContent): CategoryMeta[] {
  return baseCategories.map((category) => {
    const copy = content.categories[category.slug];
    if (!copy) return category;
    return {
      ...category,
      subtitle: copy.subtitle,
      description: copy.description,
    };
  });
}

export const categories: CategoryMeta[] = getCategoriesWithContent(siteContent);

export function getCategoryBySlug(slug: string, content: SiteContent = siteContent): CategoryMeta | undefined {
  return getCategoriesWithContent(content).find((c) => c.slug === slug);
}

export function getNextCategory(slug: string, content: SiteContent = siteContent): CategoryMeta {
  const list = getCategoriesWithContent(content);
  const index = list.findIndex((c) => c.slug === slug);
  if (index === -1) return list[0];
  return list[(index + 1) % list.length];
}

export function getPreviewCategories() {
  return getCategoriesWithContent(getContentVersion('timeless'));
}
