'use client';
import { motion } from 'framer-motion';
import type { Client } from '@/lib/getClients';

interface Props {
  clients: Client[];
}

const DARK_INVERT_LOGO_NUMBERS = new Set([2, 4, 5, 6]);
const DARK_ORIGINAL_LOGO_NUMBERS = new Set([1, 3, 7, 8]);

function logoNumberFromClientId(id: string): number | null {
  const basename = id.split('/').pop() ?? id;
  const match = basename.match(/^(\d+)/);
  return match ? Number.parseInt(match[1], 10) : null;
}

export function TrustedBySection({ clients }: Props) {
  const count = clients.length;

  return (
    <section className="clients-section">
      <div className="clients-inner">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="clients-heading t-display"
        >
          TRUSTED <span className="clients-heading-accent">BY</span>
        </motion.h2>

        <motion.div
          className="clients-grid"
          data-logo-count={count}
          style={{ '--client-count': count } as React.CSSProperties}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        >
          {clients.map((client) => {
            const logoNumber = logoNumberFromClientId(client.id);
            const invertOnDark =
              logoNumber !== null && DARK_INVERT_LOGO_NUMBERS.has(logoNumber);
            const keepOriginalOnDark =
              logoNumber !== null && DARK_ORIGINAL_LOGO_NUMBERS.has(logoNumber);

            return (
              <div key={client.id} className="clients-logo-cell">
                {client.logo ? (
                  <img
                    src={client.logo}
                    alt={client.name}
                    className={
                      invertOnDark
                        ? 'clients-logo-img clients-logo-img--invert-dark'
                        : keepOriginalOnDark
                          ? 'clients-logo-img clients-logo-img--keep-original'
                          : 'clients-logo-img'
                    }
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <span className="clients-logo-text">{client.name}</span>
                )}
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
