export type FontComboId =
  | 'current'
  | 'local-current'
  | 'editorial'
  | 'modern'
  | 'luxury';

export interface FontCombo {
  id: FontComboId;
  name: string;
  tagline: string;
  display: string;
  serif: string;
  body: string;
  recommended?: boolean;
  usesGoogleFonts?: boolean;
  cssVars: {
    inter: string;
    tight: string;
    serif: string;
  };
}

export const fontCombos: FontCombo[] = [
  {
    id: 'current',
    name: 'Current',
    tagline: 'Google Fonts, live site today',
    display: 'Inter Tight',
    serif: 'Cormorant Garamond',
    body: 'Inter',
    usesGoogleFonts: true,
    cssVars: {
      inter: "'Inter', sans-serif",
      tight: "'Inter Tight', sans-serif",
      serif: "'Cormorant Garamond', serif",
    },
  },
  {
    id: 'editorial',
    name: 'Editorial Fashion',
    tagline: 'Backup pairing: condensed headlines + high-fashion serif',
    display: 'Antonio',
    serif: 'Antic Didone',
    body: 'Outfit',
    cssVars: {
      inter: "'Outfit', sans-serif",
      tight: "'Antonio', sans-serif",
      serif: "'Antic Didone', serif",
    },
  },
  {
    id: 'modern',
    name: 'Modern Studio',
    tagline: 'Geometric display + editorial contrast',
    display: 'Space Grotesk',
    serif: 'Playfair Display',
    body: 'Manrope',
    cssVars: {
      inter: "'Manrope', sans-serif",
      tight: "'Space Grotesk', sans-serif",
      serif: "'Playfair Display', serif",
    },
  },
  {
    id: 'luxury',
    name: 'Luxury Minimal',
    tagline: 'Active on site: refined caps + soft readable body',
    display: 'Aboreto',
    serif: 'Bodoni Moda',
    body: 'Proza Libre',
    cssVars: {
      inter: "'Proza Libre', sans-serif",
      tight: "'Aboreto', sans-serif",
      serif: "'Bodoni Moda', serif",
    },
  },
  {
    id: 'local-current',
    name: 'Current (Self-hosted)',
    tagline: 'Same pairing, loaded from your /fonts folder',
    display: 'Inter Tight',
    serif: 'Cormorant Garamond',
    body: 'Inter',
    cssVars: {
      inter: "'Inter', sans-serif",
      tight: "'Inter Tight', sans-serif",
      serif: "'Cormorant Garamond', serif",
    },
  },
];

export function getFontCombo(id: string | null | undefined): FontCombo | undefined {
  return fontCombos.find((combo) => combo.id === id);
}

export const FONT_COMBO_STORAGE_KEY = 'kashyap-font-combo';
