import { getFontCombo, type FontComboId } from '@/lib/fontCombos';

/** Fonts currently live on the site */
export const ACTIVE_FONT_COMBO_ID: FontComboId = 'luxury';

/** Saved alternate pairing — swap via site-fonts-editorial-backup.css */
export const BACKUP_FONT_COMBO_ID: FontComboId = 'editorial';

export const activeFontCombo = getFontCombo(ACTIVE_FONT_COMBO_ID)!;
export const backupFontCombo = getFontCombo(BACKUP_FONT_COMBO_ID)!;
