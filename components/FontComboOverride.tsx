'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { applyFontComboToDocument, readStoredFontCombo } from '@/lib/applyFontCombo';
import type { FontComboId } from '@/lib/fontCombos';

export function FontComboOverride() {
  const searchParams = useSearchParams();
  const queryCombo = searchParams.get('fontCombo') as FontComboId | 'current' | null;

  useEffect(() => {
    const combo = queryCombo || readStoredFontCombo() || 'current';
    applyFontComboToDocument(combo);
  }, [queryCombo]);

  return null;
}
