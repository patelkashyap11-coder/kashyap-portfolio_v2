'use client';
import { motion } from 'framer-motion';
import { MediaImage } from '@/components/MediaImage';
import type { Client } from '@/lib/getClients';
import { MEDIA_IMAGE_SIZES } from '@/lib/imagekitUrl';

interface Props {
  clients: Client[];
}

const INVERT_LOGO_NUMBERS = new Set([2, 4, 6]);

function logoNumberFromClientId(id: string): number | null {
  const basename = id.split('/').pop() ?? id;
  const match = basename.match(/^(\d+)/);
  return match ? Number.parseInt(match[1], 10) : null;
}

/** White/light logos uploaded for dark backgrounds — darken on light theme panels. */
function isWhiteLogo(id: string): boolean {
  const basename = (id.split('/').pop() ?? id).toLowerCase();
  return /white|_light|logo-light|light-logo/.test(basename);
}

function logoClassName(clientId: string): string {
  if (isWhiteLogo(clientId)) {
    return 'clients-logo-img clients-logo-img--white-mark';
  }

  const logoNumber = logoNumberFromClientId(clientId);
  if (logoNumber !== null && INVERT_LOGO_NUMBERS.has(logoNumber)) {
    return 'clients-logo-img clients-logo-img--invert-dark';
  }

  return 'clients-logo-img clients-logo-img--keep-original';
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
                  <MediaImage
                    src={client.logo}
                    alt={client.name}
                    width={400}
                    height={160}
                    sizes={MEDIA_IMAGE_SIZES.logo}
                    className={logoClassName(client.id)}
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
