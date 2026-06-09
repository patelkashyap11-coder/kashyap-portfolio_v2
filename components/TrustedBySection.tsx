'use client';
import { motion } from 'framer-motion';
import type { Client } from '@/lib/getClients';

interface Props {
  clients: Client[];
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
          {clients.map((client) => (
            <div key={client.id} className="clients-logo-cell">
              {client.logo ? (
                <img
                  src={client.logo}
                  alt={client.name}
                  className="clients-logo-img"
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                <span className="clients-logo-text">{client.name}</span>
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
