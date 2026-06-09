import { BRAND } from '@/lib/site';

type BrandMarkProps = {
  letterSize: number;
  showUnderline?: boolean;
};

export function BrandMark({ letterSize, showUnderline = true }: BrandMarkProps) {
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
          fontSize: letterSize,
          fontWeight: 800,
          color: BRAND.accent,
          letterSpacing: '-0.06em',
          lineHeight: 1,
          fontFamily: 'Inter, Helvetica, Arial, sans-serif',
        }}
      >
        KP
      </div>
      {showUnderline ? (
        <div
          style={{
            marginTop: letterSize * 0.12,
            width: letterSize * 1.35,
            height: Math.max(2, letterSize * 0.08),
            background: BRAND.accent,
          }}
        />
      ) : null}
    </div>
  );
}
