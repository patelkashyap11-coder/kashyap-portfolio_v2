'use client';
import { motion } from 'framer-motion';

// ── Set hasLogos = true and populate this array once you have logo files ──
const hasLogos = false;

const clients: { name: string; logo: string | null }[] = [
  { name: 'Client One',   logo: null },
  { name: 'Client Two',   logo: null },
  { name: 'Client Three', logo: null },
  { name: 'Client Four',  logo: null },
  { name: 'Client Five',  logo: null },
  { name: 'Client Six',   logo: null },
];

export function TrustedBySection() {
  if (!hasLogos) return null;

  return (
    <section
      className="trusted-by-section"
      style={{ background: '#ffffff', padding: 'clamp(80px,10vw,120px) 48px' }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="t-label mb-16 text-center"
          style={{ color: '#888888' }}
        >
          Trusted By
        </motion.p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '40px 60px',
            alignItems: 'center',
          }}
        >
          {clients.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.5 }}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                height: 44, opacity: 0.45, filter: 'grayscale(1)',
                transition: 'opacity 0.3s, filter 0.3s',
                cursor: 'default',
              }}
              whileHover={{ opacity: 1, filter: 'grayscale(0)' }}
            >
              {c.logo ? (
                <img
                  src={c.logo} alt={c.name}
                  style={{ maxHeight: 36, maxWidth: 140, objectFit: 'contain' }}
                />
              ) : (
                <span
                  style={{
                    fontFamily: 'var(--font-tight)', fontWeight: 700,
                    fontSize: '0.8rem', letterSpacing: '0.12em',
                    textTransform: 'uppercase', color: '#0A0A0A',
                  }}
                >
                  {c.name}
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
