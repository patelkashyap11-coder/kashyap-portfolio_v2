import { siteContent } from '@/lib/content';

export const SITE_URL = 'https://www.bykashyap.com';

export const SITE_NAME = 'KASHYAP PATEL';

export const SITE_TAGLINE = 'CINEMAGRAPH';

export const SITE_TITLE = siteContent.seo.homeTitle;

export const SITE_DESCRIPTION = siteContent.seo.homeDescription;

export const SITE_SHORT_DESCRIPTION = siteContent.seo.homeDescription;

/** Link preview title for WhatsApp, iMessage, and social shares. */
export const SITE_SHARE_TITLE = "Let's Talk";

/** Link preview subtitle for WhatsApp, iMessage, and social shares. */
export const SITE_SHARE_DESCRIPTION = 'to create visual stories';

export const SITE_KEYWORDS = [
  'Kashyap Patel',
  'Kashyap Patel photographer',
  'Kashyap Patel filmmaker',
  'cinemagraph',
  'cinemagraph photographer India',
  'commercial photographer Ahmedabad',
  'commercial filmmaker India',
  'fashion photographer Ahmedabad',
  'food photographer India',
  'jewellery photographer',
  'product photographer Ahmedabad',
  'interior photographer Gujarat',
  'brand photography India',
  'visual storyteller',
];

export const SITE_CONTACT = {
  email: 'letstalk@bykashyap.com',
  phone: '+919712727007',
  phoneDisplay: '+91 97127 27007',
  instagram: 'https://instagram.com/ikashyap__',
  whatsapp: 'https://wa.me/919712727007',
} as const;

export const SITE_LOCATION = {
  city: 'Ahmedabad',
  region: 'Gujarat',
  country: 'India',
  countryCode: 'IN',
} as const;

export const SITE_SERVICES = [
  'Fashion photography',
  'Food & hospitality photography',
  'Jewellery photography',
  'Product photography',
  'Interior photography',
  'Commercial film',
  'Cinemagraph production',
] as const;

export const BRAND = {
  dark: '#0A0A0A',
  accent: '#C7E200',
  cream: '#F5F5F2',
} as const;
