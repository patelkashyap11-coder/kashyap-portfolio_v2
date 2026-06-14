import { BRAND } from '@/lib/site';

type BrandMarkProps = {
  letterSize: number;
  fontFamily?: string;
};

export function BrandMark({
  letterSize,
  fontFamily = 'Aboreto',
}: BrandMarkProps) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: BRAND.dark,
      }}
    >
      <div
        style={{
          display: 'flex',
          fontSize: letterSize,
          fontWeight: 400,
          color: BRAND.accent,
          letterSpacing: -0.04,
          lineHeight: 1,
          fontFamily,
        }}
      >
        KP
      </div>
      <div
        style={{
          display: 'flex',
          marginTop: letterSize * 0.1,
          width: letterSize * 1.35,
          height: Math.max(2, letterSize * 0.08),
          background: BRAND.accent,
        }}
      />
    </div>
  );
}
