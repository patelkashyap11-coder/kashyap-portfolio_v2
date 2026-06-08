'use client';
import { motion } from 'framer-motion';

const clientCategories = [
  {
    label: 'FASHION',
    clients: [
      { name: 'Maison Noir', logo: null },
      { name: 'Velvet Line', logo: null },
      { name: 'Atelier 11', logo: null },
    ],
  },
  {
    label: 'FOOD & HOSPITALITY',
    clients: [
      { name: 'Ember Kitchen', logo: null },
      { name: 'The Copper Room', logo: null },
      { name: 'Saffron House', logo: null },
    ],
  },
  {
    label: 'JEWELLERY',
    clients: [
      { name: 'Orion Fine', logo: null },
      { name: 'Lustre Co.', logo: null },
    ],
  },
  {
    label: 'INTERIORS',
    clients: [
      { name: 'Form Studio', logo: null },
      { name: 'Arc Space', logo: null },
    ],
  },
  {
    label: 'COMMERCIAL',
    clients: [
      { name: 'North & Co.', logo: null },
      { name: 'Studio K', logo: null },
      { name: 'Axis Brands', logo: null },
    ],
  },
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

        <div className="clients-categories">
          {clientCategories.map((category, ci) => (
            <motion.div
              key={category.label}
              className="clients-category"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: ci * 0.06, ease: [0.76, 0, 0.24, 1] }}
            >
              <p className="clients-category-label">{category.label}</p>
              <div className="clients-grid">
                {category.clients.map((client) => (
                  <div key={client.name} className="clients-logo-cell">
                    {client.logo ? (
                      <img src={client.logo} alt={client.name} className="clients-logo-img" />
                    ) : (
                      <span className="clients-logo-text">{client.name}</span>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
