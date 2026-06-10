import type { SiteContent } from '@/lib/content/types';

/** Previous live copy — restore by telling the agent: deploy visual-stories */
export const visualStoriesContent: SiteContent = {
  id: 'visual-stories',
  label: 'Visual Stories (original)',
  hero: {
    lines: ['CREATING', 'VISUAL STORIES', 'THAT'],
    accentLine: 2,
    accentWord: 'LAST',
    subheadline:
      'We create visual stories that help brands stand out, from fashion campaigns and restaurant content to jewellery, products and interiors.',
    subheadlineSegments: [
      { text: 'We create ' },
      { text: 'visual stories', highlight: true },
      { text: ' that help brands stand out, from ' },
      { text: 'fashion campaigns', highlight: true },
      { text: ' and ' },
      { text: 'restaurant content', highlight: true },
      { text: ' to ' },
      { text: 'jewellery', highlight: true },
      { text: ', ' },
      { text: 'products', highlight: true },
      { text: ' and ' },
      { text: 'interiors', highlight: true },
      { text: '.' },
    ],
  },
  howWeWork: {
    eyebrow: 'WHAT I DO',
    mode: 'accordion',
    services: [
      {
        id: 1,
        title: 'Conception',
        capabilities: [
          {
            title: 'Research + concept',
            description:
              'We explore your world to uncover compelling narratives and shape an inspiring creative concept.',
          },
          {
            title: 'Storytelling + writing',
            description:
              'We turn your message into a powerful story that moves your audience.',
          },
          {
            title: 'Direction + storyboard',
            description:
              'We build a consistent visual universe and plan the narrative arc shot by shot.',
          },
          {
            title: 'Visual and narrative consultation',
            description:
              'We support you in refining your creative identity and visual storytelling, at every stage of the process.',
          },
        ],
      },
      {
        id: 2,
        title: 'Pré-production',
        capabilities: [
          {
            title: 'Location scouting',
            description:
              'We find the location that works best for the story and the associated visuals and production needs.',
          },
          {
            title: 'Casting',
            description:
              'We carefully curate the film, choosing the right voices, faces, and skills to convey your vision.',
          },
          {
            title: 'Styling',
            description:
              'We define look, wardrobe, and set details that reinforce the story and your brand.',
          },
          {
            title: 'Shoot package',
            description:
              'We lock in crew, schedule, gear, and deliverables so production runs smoothly on set.',
          },
        ],
      },
      {
        id: 3,
        title: 'Post production',
        capabilities: [
          {
            title: 'Editing',
            description:
              'We build a clear, engaging narrative that guides the viewer through your story.',
          },
          {
            title: 'Animation',
            description:
              'Motion that adds rhythm, emphasis and polish, never just decoration.',
          },
          {
            title: 'Mix, sound design',
            description:
              'We shape sound to heighten emotion and set the mood, fully tailored to your story.',
          },
          {
            title: 'Color grading',
            description:
              'Color grading that reinforces the atmosphere, identity and emotion of your visuals.',
          },
        ],
      },
    ],
  },
  homeCta: {
    lines: ['BRINGING', 'STORIES', 'TO'],
    accentLine: 2,
    accentText: 'LIFE',
    linkLabel: 'Contact us',
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
    headline: 'Small idea or big project?',
    subheadline: "Let's talk!",
    accentWord: 'talk',
    body: '',
    ctaLabel: 'Contact us',
  },
  footer: {
    statement: 'CINEMAGRAPH',
    ctaLabel: 'Contact us',
  },
  seo: {
    homeTitle: 'KASHYAP PATEL | CINEMAGRAPH',
    homeDescription:
      'Kashyap Patel is a commercial photographer and filmmaker in Ahmedabad, India, creating cinemagraphs and visual stories for fashion, food, jewellery, product and interior brands.',
    aboutTitle: 'About | KASHYAP PATEL',
    contactTitle: 'Contact | KASHYAP PATEL',
    fashionTitle: 'Fashion Photography Portfolio',
    foodTitle: 'Food & Hospitality Photography Portfolio',
    jewelleryTitle: 'Jewellery Photography Portfolio',
    productsTitle: 'Product Photography Portfolio',
    interiorsTitle: 'Interior Photography Portfolio',
  },
};
