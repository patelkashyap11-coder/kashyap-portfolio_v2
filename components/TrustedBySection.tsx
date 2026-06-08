'use client';
import { motion } from 'framer-motion';

const clients = [
  { name: 'Maison Noir', logo: null },
  { name: 'Velvet Line', logo: null },
  { name: 'Atelier 11', logo: null },
  { name: 'Ember Kitchen', logo: null },
  { name: 'The Copper Room', logo: null },
  { name: 'Saffron House', logo: null },
  { name: 'Orion Fine', logo: null },
  { name: 'Lustre Co.', logo: null },
  { name: 'Form Studio', logo: null },
  { name: 'Arc Space', logo: null },
  { name: 'North & Co.', logo: null },
  { name: 'Studio K', logo: null },
  { name: 'Axis Brands', logo: null },
];

export function TrustedBySection() {
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
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        >
          {clients.map((client) => (
            <div key={client.name} className="clients-logo-cell">
              {client.logo ? (
                <img src={client.logo} alt={client.name} className="clients-logo-img" />
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
