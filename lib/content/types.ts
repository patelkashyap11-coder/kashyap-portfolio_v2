export type ContentVersionId = 'timeless' | 'visual-stories';

export interface ServiceCapability {
  title: string;
  description: string;
}

export interface ServicePhase {
  id: number;
  title: string;
  capabilities: ServiceCapability[];
}

export interface CategoryCopy {
  subtitle: string;
  description: string;
}

export interface SiteContent {
  id: ContentVersionId;
  label: string;
  hero: {
    lines: [string, string, string];
    accentLine: 2;
    accentWord: string;
    subheadline: string;
    /** Optional spans with lime half-highlight (visual-stories style) */
    subheadlineSegments?: Array<{ text: string; highlight?: boolean }>;
  };
  howWeWork: {
    eyebrow: string;
    mode: 'accordion' | 'static';
    intro?: string;
    servicesIntro?: string;
    services?: ServicePhase[];
  };
  homeCta: {
    lines: [string, string, string];
    accentLine: 2;
    accentText: string;
    linkLabel: string;
  };
  about?: {
    title: string;
    intro: string;
    paragraph1: string;
    paragraph2: string;
    closing: string;
  };
  categories: Record<string, CategoryCopy>;
  contact: {
    headline: string;
    subheadline: string;
    accentWord: string;
    body: string;
    ctaLabel: string;
  };
  footer: {
    statement: string;
    ctaLabel: string;
  };
  seo: {
    homeTitle: string;
    homeDescription: string;
    aboutTitle: string;
    contactTitle: string;
    fashionTitle: string;
    foodTitle: string;
    jewelleryTitle: string;
    productsTitle: string;
    interiorsTitle: string;
  };
}
