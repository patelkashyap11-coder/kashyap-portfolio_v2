import fs from 'fs/promises';
import path from 'path';

const FONTS_DIR = path.join(process.cwd(), 'public', 'fonts');

const NOVEMBER_CANDIDATES = [
  'NovemberBanglaTraditional-Light.otf',
  'NovemberBanglaTraditional-Light.ttf',
  'NovemberBanglaTraditionalLight.otf',
  'NovemberBanglaTraditionalLight.ttf',
  'NovemberBangla-Light.otf',
  'NovemberBangla-Light.ttf',
  'November Bangla Traditional Light.otf',
  'November Bangla Traditional Light.ttf',
] as const;

const HELVETICA_MEDIUM_ITALIC = 'HelveticaNeue-MediumItalic.ttf';
const HELVETICA_LIGHT_FALLBACK = 'HelveticaNeue-Light.ttf';

export const OG_FONT_LETS = 'November Bangla Traditional';
export const OG_FONT_TALK = 'Helvetica Neue';

async function readFontFile(filename: string): Promise<Buffer | null> {
  try {
    return await fs.readFile(path.join(FONTS_DIR, filename));
  } catch {
    return null;
  }
}

async function discoverNovemberFilename(): Promise<string | null> {
  for (const filename of NOVEMBER_CANDIDATES) {
    try {
      await fs.access(path.join(FONTS_DIR, filename));
      return filename;
    } catch {
      // try next candidate
    }
  }

  const entries = await fs.readdir(FONTS_DIR);
  const matches = entries.filter(
    (entry) =>
      /\.(otf|ttf)$/i.test(entry) &&
      /november/i.test(entry) &&
      /light/i.test(entry),
  );

  if (matches.length === 0) {
    return null;
  }

  return (
    matches.find((entry) => /traditional/i.test(entry)) ??
    matches.find((entry) => /bangla/i.test(entry)) ??
    matches[0]
  );
}

async function loadLetsFont(): Promise<{
  data: Buffer;
  name: string;
  weight: 300;
  style: 'normal';
}> {
  const discovered = await discoverNovemberFilename();
  if (discovered) {
    const data = await readFontFile(discovered);
    if (data) {
      return { data, name: OG_FONT_LETS, weight: 300, style: 'normal' };
    }
  }

  const fallback = await readFontFile(HELVETICA_LIGHT_FALLBACK);
  if (!fallback) {
    throw new Error(
      `Missing OG fonts: add November Bangla Traditional Light to public/fonts/ or include ${HELVETICA_LIGHT_FALLBACK}.`,
    );
  }

  console.warn(
    `[ogFonts] November Bangla Traditional Light not found in public/fonts/ — using ${HELVETICA_LIGHT_FALLBACK} for "Let's".`,
  );

  return {
    data: fallback,
    name: OG_FONT_TALK,
    weight: 300,
    style: 'normal',
  };
}

export async function getOgFonts() {
  const [lets, helveticaData] = await Promise.all([
    loadLetsFont(),
    readFontFile(HELVETICA_MEDIUM_ITALIC),
  ]);

  if (!helveticaData) {
    throw new Error(`Missing public/fonts/${HELVETICA_MEDIUM_ITALIC}`);
  }

  return [
    {
      name: lets.name,
      data: lets.data,
      style: lets.style,
      weight: lets.weight,
    },
    {
      name: OG_FONT_TALK,
      data: helveticaData,
      style: 'italic' as const,
      weight: 500 as const,
    },
  ];
}
