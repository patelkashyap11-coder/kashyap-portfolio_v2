'use client';

import { createContext, useContext } from 'react';
import { getContentVersion, siteContent } from '@/lib/content';
import type { ContentVersionId, SiteContent } from '@/lib/content/types';

const ContentContext = createContext<SiteContent>(siteContent);

export function ContentProvider({
  version,
  children,
}: {
  version: ContentVersionId;
  children: React.ReactNode;
}) {
  return (
    <ContentContext.Provider value={getContentVersion(version)}>
      {children}
    </ContentContext.Provider>
  );
}

export function useSiteContent(): SiteContent {
  return useContext(ContentContext);
}
