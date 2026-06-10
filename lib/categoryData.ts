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
    subtitle: 'Editorial Fashion',
    description:
      'Editorial campaigns, lookbooks and visual storytelling crafted with clarity, elegance, and intention.',
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
    subtitle: 'Food & Hospitality',
    description:
      'Refined imagery celebrating cuisine, gathering, and atmosphere, from restaurant editorials to hospitality campaigns.',
    videoSrc:
      'https://res.cloudinary.com/dvcymatjg/video/upload/v1780803361/food_ba669d.mp4',
    imageSrc: '/homepage/food.jpg',
    featuredProjects: [
      {
        name: 'THE BEAUTY OF SIMPLICITY',
        client: 'Restaurant Editorial',
        year: '2026',
        description:
          'Refined imagery focused on balance, texture, and the quiet elegance of contemporary dining.',
      },
      {
        name: 'TABLESIDE STORIES',
        client: 'Hospitality Campaign',
        year: '2026',
        description:
          'Capturing moments of gathering, flavour, and atmosphere through carefully crafted visual narratives.',
      },
      {
        name: 'CRAFTED TO TASTE',
        client: 'Food Editorial',
        year: '2026',
        description:
          'A study of colour, composition, and culinary artistry designed to elevate every dish beyond the plate.',
      },
    ],
  },
  {
    slug: 'jewellery',
    title: 'JEWELLERY',
    subtitle: 'Fine Jewellery',
    description:
      'Celebrating craftsmanship, light, and timeless design through imagery inspired by heritage, portraiture, and luxury editorial.',
    videoSrc:
      'https://res.cloudinary.com/dvcymatjg/video/upload/v1780803368/jewellery_prcnbx.mp4',
    imageSrc: '/homepage/jewellery.jpg',
    featuredProjects: [
      {
        name: 'HEIRLOOM ELEGANCE',
        client: 'Jewellery Collection',
        year: '2024',
        description:
          'Celebrating intricate craftsmanship and timeless design through richly styled imagery inspired by heritage and tradition.',
      },
      {
        name: 'LUMINOUS CONTRAST',
        client: 'Luxury Campaign',
        year: '2022',
        description:
          'A dramatic exploration of light, shadow, and brilliance, crafted to highlight the artistry and presence of fine jewellery.',
      },
      {
        name: 'ADORNED PORTRAITS',
        client: 'Jewellery Editorial',
        year: '2023',
        description:
          'Refined portraiture that brings together beauty, craftsmanship, and storytelling to showcase every detail with elegance.',
      },
    ],
  },
  {
    slug: 'products',
    title: 'PRODUCTS',
    subtitle: 'Product & Brand',
    description:
      'Elevating products through refined compositions, natural light, and intentional storytelling across campaigns and editorials.',
    videoSrc:
      'https://res.cloudinary.com/dvcymatjg/video/upload/v1780803363/products_pwdlyy.mp4',
    imageSrc: '/homepage/products.jpg',
    featuredProjects: [
      {
        name: 'CRAFTED OBJECTS',
        client: 'Product Campaign',
        year: '2022',
        description:
          'Elevating everyday products through refined compositions, natural light, and intentional storytelling.',
      },
      {
        name: 'BOTANICAL NOTES',
        client: 'Fragrance Campaign',
        year: '2024',
        description:
          'An editorial approach to fragrance photography inspired by texture, florals, and sensory experience.',
      },
      {
        name: 'STATEMENT FRAMES',
        client: 'Eyewear Editorial',
        year: '2024',
        description:
          'Contemporary portraiture focused on form, character, and the timeless appeal of modern design.',
      },
    ],
  },
  {
    slug: 'interiors',
    title: 'INTERIORS',
    subtitle: 'Interiors & Spaces',
    description:
      'Imagery highlighting spatial harmony, materiality, and the quiet elegance of contemporary living.',
    videoSrc:
      'https://res.cloudinary.com/dvcymatjg/video/upload/v1780803362/interiors_flgrmx.mp4',
    imageSrc: '/homepage/interiors.jpg',
    featuredProjects: [
      {
        name: 'MODERN DWELLINGS',
        client: 'Residential Interior',
        year: '2025',
        description:
          'Refined imagery highlighting spatial harmony, materiality, and the quiet elegance of contemporary living.',
      },
      {
        name: 'PASTEL STORIES',
        client: 'Bakery Interior',
        year: '2024',
        description:
          'A celebration of colour, character, and thoughtful design, creating a space as delightful as the products it presents.',
      },
      {
        name: 'GATHERING SPACES',
        client: 'Hospitality Interior',
        year: '2024',
        description:
          'An architectural study of light, texture, and atmosphere crafted for modern hospitality brands.',
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
