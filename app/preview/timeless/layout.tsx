import type { Metadata } from 'next';
import { ContentProvider } from '@/lib/content/ContentProvider';
import { getContentVersion } from '@/lib/content';
import { PreviewBanner } from '@/components/PreviewBanner';

const previewContent = getContentVersion('timeless');

export const metadata: Metadata = {
  title: `Preview: ${previewContent.label}`,
  description: previewContent.seo.homeDescription,
  robots: {
    index: false,
    follow: false,
  },
};

export default function TimelessPreviewLayout({ children }: { children: React.ReactNode }) {
  return (
    <ContentProvider version="timeless">
      <PreviewBanner />
      {children}
    </ContentProvider>
  );
}
