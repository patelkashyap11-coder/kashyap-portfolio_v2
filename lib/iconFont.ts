import fs from 'fs/promises';
import path from 'path';

const ABORETO = 'Aboreto-Regular.ttf';

export async function getIconFonts() {
  const data = await fs.readFile(path.join(process.cwd(), 'public', 'fonts', ABORETO));

  return [
    {
      name: 'Aboreto',
      data,
      weight: 400 as const,
      style: 'normal' as const,
    },
  ];
}
