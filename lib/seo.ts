import type { Metadata } from 'next';
import { getCategoryBySlug } from '@/lib/categoryData';
import {
  SITE_CONTACT,
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  SITE_LOCATION,
  SITE_NAME,
  SITE_SERVICES,
  SITE_SHORT_DESCRIPTION,
  SITE_TAGLINE,
  SITE_TITLE,
  SITE_URL,
} from '@/lib/site';

function absoluteUrl(path = ''): string {
  return `${SITE_URL}${path}`;
}

export function getHomeMetadata(): Metadata {
  return {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    keywords: SITE_KEYWORDS,
    alternates: {
      canonical: '/',
    },
    openGraph: {
      title: SITE_TITLE,
      description: SITE_DESCRIPTION,
      url: SITE_URL,
      type: 'website',
    },
    twitter: {
      title: SITE_TITLE,
      description: SITE_DESCRIPTION,
    },
  };
}

export function getCategoryMetadata(slug: string): Metadata {
  const category = getCategoryBySlug(slug);
  if (!category) {
    return { title: SITE_TITLE, description: SITE_DESCRIPTION };
  }

  const title = `${category.subtitle} Portfolio`;
  const description = `${category.description} Commercial ${category.subtitle.toLowerCase()} by Kashyap Patel in Ahmedabad, India.`;
  const path = `/${slug}`;

  return {
    title,
    description,
    keywords: [
      ...SITE_KEYWORDS,
      category.subtitle.toLowerCase(),
      `${category.subtitle.toLowerCase()} Ahmedabad`,
      `${category.subtitle.toLowerCase()} India`,
    ],
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url: absoluteUrl(path),
      type: 'website',
    },
    twitter: {
      title: `${title} | ${SITE_NAME}`,
      description,
    },
  };
}

export function getContactMetadata(): Metadata {
  const title = 'Contact';
  const description = `Contact Kashyap Patel for commercial photography, film and cinemagraph projects in ${SITE_LOCATION.city}, ${SITE_LOCATION.country}. Email ${SITE_CONTACT.email} or call ${SITE_CONTACT.phoneDisplay}.`;

  return {
    title,
    description,
    alternates: {
      canonical: '/contact',
    },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url: absoluteUrl('/contact'),
      type: 'website',
    },
    twitter: {
      title: `${title} | ${SITE_NAME}`,
      description,
    },
  };
}

export function getSiteStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_TITLE,
        description: SITE_DESCRIPTION,
        inLanguage: 'en-IN',
        publisher: { '@id': `${SITE_URL}/#person` },
      },
      {
        '@type': 'Person',
        '@id': `${SITE_URL}/#person`,
        name: 'Kashyap Patel',
        alternateName: SITE_NAME,
        url: SITE_URL,
        image: absoluteUrl('/opengraph-image'),
        jobTitle: 'Commercial Photographer & Filmmaker',
        description: SITE_DESCRIPTION,
        email: `mailto:${SITE_CONTACT.email}`,
        telephone: SITE_CONTACT.phone,
        address: {
          '@type': 'PostalAddress',
          addressLocality: SITE_LOCATION.city,
          addressRegion: SITE_LOCATION.region,
          addressCountry: SITE_LOCATION.countryCode,
        },
        sameAs: [SITE_CONTACT.instagram],
        knowsAbout: [...SITE_SERVICES],
      },
      {
        '@type': 'ProfessionalService',
        '@id': `${SITE_URL}/#service`,
        name: `${SITE_NAME} ${SITE_TAGLINE}`,
        url: SITE_URL,
        description: SITE_SHORT_DESCRIPTION,
        areaServed: {
          '@type': 'Country',
          name: SITE_LOCATION.country,
        },
        serviceType: [...SITE_SERVICES],
        provider: { '@id': `${SITE_URL}/#person` },
      },
    ],
  };
}

export function getCategoryStructuredData(slug: string) {
  const category = getCategoryBySlug(slug);
  if (!category) return null;

  const pageUrl = absoluteUrl(`/${slug}`);
  const pageName = `${category.subtitle} Portfolio | ${SITE_NAME}`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: pageName,
        description: category.description,
        isPartOf: { '@id': `${SITE_URL}/#website` },
        about: {
          '@type': 'Thing',
          name: category.subtitle,
        },
        inLanguage: 'en-IN',
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: SITE_URL,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: category.title,
            item: pageUrl,
          },
        ],
      },
      {
        '@type': 'CollectionPage',
        '@id': `${pageUrl}#collection`,
        url: pageUrl,
        name: pageName,
        description: category.description,
        isPartOf: { '@id': `${SITE_URL}/#website` },
        author: { '@id': `${SITE_URL}/#person` },
      },
    ],
  };
}

export function getContactStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ContactPage',
        '@id': `${SITE_URL}/contact#webpage`,
        url: absoluteUrl('/contact'),
        name: `Contact ${SITE_NAME}`,
        description: `Get in touch with Kashyap Patel for photography, film and cinemagraph projects.`,
        isPartOf: { '@id': `${SITE_URL}/#website` },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: SITE_URL,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Contact',
            item: absoluteUrl('/contact'),
          },
        ],
      },
    ],
  };
}
