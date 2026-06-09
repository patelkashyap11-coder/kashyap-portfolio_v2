import {
  getCategoryStructuredData,
  getContactStructuredData,
  getSiteStructuredData,
} from '@/lib/seo';

type JsonLdProps = {
  data: Record<string, unknown> | null;
};

function JsonLd({ data }: JsonLdProps) {
  if (!data) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function SiteStructuredData() {
  return <JsonLd data={getSiteStructuredData()} />;
}

export function CategoryStructuredData({ slug }: { slug: string }) {
  return <JsonLd data={getCategoryStructuredData(slug)} />;
}

export function ContactStructuredData() {
  return <JsonLd data={getContactStructuredData()} />;
}
