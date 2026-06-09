import type { Metadata } from 'next';
import { ContactStructuredData } from '@/components/StructuredData';
import { getContactMetadata } from '@/lib/seo';

export const metadata: Metadata = getContactMetadata();

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ContactStructuredData />
      {children}
    </>
  );
}
