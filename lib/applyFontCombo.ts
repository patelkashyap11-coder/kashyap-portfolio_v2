import { FONT_COMBO_STORAGE_KEY, getFontCombo, type FontComboId } from '@/lib/fontCombos';

export function applyFontComboToDocument(comboId: FontComboId | 'current'): void {
  const combo = getFontCombo(comboId);
  if (!combo) return;

  const root = document.documentElement;

  if (combo.id === 'current') {
    root.removeAttribute('data-font-combo');
    root.style.removeProperty('--font-inter');
    root.style.removeProperty('--font-tight');
    root.style.removeProperty('--font-serif');
    return;
  }

  root.setAttribute('data-font-combo', combo.id);
  root.style.setProperty('--font-inter', combo.cssVars.inter);
  root.style.setProperty('--font-tight', combo.cssVars.tight);
  root.style.setProperty('--font-serif', combo.cssVars.serif);
}

export function persistFontCombo(comboId: FontComboId | 'current'): void {
  if (typeof window === 'undefined') return;

  if (comboId === 'current') {
    sessionStorage.removeItem(FONT_COMBO_STORAGE_KEY);
    return;
  }

  sessionStorage.setItem(FONT_COMBO_STORAGE_KEY, comboId);
}

export function readStoredFontCombo(): FontComboId | 'current' | null {
  if (typeof window === 'undefined') return null;
  return sessionStorage.getItem(FONT_COMBO_STORAGE_KEY) as FontComboId | 'current' | null;
}
