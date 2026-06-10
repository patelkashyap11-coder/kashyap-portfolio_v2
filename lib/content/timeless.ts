import type { SiteContent } from '@/lib/content/types';

/** New copy from Complete_Page_By_Page_Content_Sheet.xlsx */
export const timelessContent: SiteContent = {
  id: 'timeless',
  label: 'Timeless (content sheet)',
  hero: {
    lines: ['VISUALS', 'THAT FEEL', ''],
    accentLine: 2,
    accentWord: 'TIMELESS',
    subheadline:
      'Photography and visual content for fashion, hospitality, jewellery, products and interiors. Built to last longer than trends.',
  },
  howWeWork: {
    eyebrow: 'HOW I WORK',
    mode: 'static',
    intro:
      'Every project starts with understanding the brand, the audience and what deserves attention.',
    servicesIntro:
      'Creative direction, production and photography designed to make brands look as good as they deserve.',
  },
  homeCta: {
    lines: ['HAVE A PROJECT', 'IN MIND?', ''],
    accentLine: 2,
    accentText: "LET'S MAKE IT HAPPEN",
    linkLabel: 'Start a Project',
  },
  about: {
    title: 'ABOUT',
    intro:
      'I work with brands, designers, hospitality groups and businesses that value thoughtful visual communication.',
    paragraph1:
      'My approach combines creative direction, photography and production to create imagery that feels timeless rather than trend-driven.',
    paragraph2:
      'Every project starts with understanding what makes a brand unique and translating that into visuals that feel honest, refined and memorable.',
    closing:
      "Good photography is not just about how something looks. It's about how it is remembered.",
  },
  categories: {
    fashion: {
      subtitle: 'Editorial Fashion',
      description:
        'Editorial campaigns, lookbooks and visual storytelling crafted with clarity, elegance, and intention.',
    },
    'food-hospitality': {
      subtitle: 'Food & Hospitality',
      description:
        'Refined imagery celebrating cuisine, gathering, and atmosphere, from restaurant editorials to hospitality campaigns.',
    },
    jewellery: {
      subtitle: 'Fine Jewellery',
      description:
        'Celebrating craftsmanship, light, and timeless design through imagery inspired by heritage, portraiture, and luxury editorial.',
    },
    products: {
      subtitle: 'Product & Brand',
      description:
        'Elevating products through refined compositions, natural light, and intentional storytelling across campaigns and editorials.',
    },
    interiors: {
      subtitle: 'Interiors & Spaces',
      description:
        'Imagery highlighting spatial harmony, materiality, and the quiet elegance of contemporary living.',
    },
  },
  contact: {
    headline: 'Have a project in mind?',
    subheadline: "Let's make it happen.",
    accentWord: 'happen',
    body:
      "Whether you're launching a brand, planning a campaign or refreshing your visual identity, I'd love to hear about it.",
    ctaLabel: 'Start a Conversation',
  },
  footer: {
    statement: "Thoughtful photography and production for brands that care how they're seen.",
    ctaLabel: 'Start a Project',
  },
  seo: {
    homeTitle: 'Kashyap Patel | Creative Direction, Photography & Production',
    homeDescription:
      'Premium photography and creative production for fashion, hospitality, jewellery, products and interiors.',
    aboutTitle: 'About | Kashyap Patel',
    contactTitle: 'Contact | Kashyap Patel',
    fashionTitle: 'Fashion Photography | Kashyap Patel',
    foodTitle: 'Food & Hospitality Photography | Kashyap Patel',
    jewelleryTitle: 'Jewellery Photography | Kashyap Patel',
    productsTitle: 'Product Photography | Kashyap Patel',
    interiorsTitle: 'Interior Photography | Kashyap Patel',
  },
};
