'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useSiteContent } from '@/lib/content/ContentProvider';
import { getPreviewBase, withPreviewBase } from '@/lib/content/preview';
import { SITE_CONTACT } from '@/lib/site';

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const rise = {
  hidden: { y: 32 },
  show: {
    y: 0,
    transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] as [number, number, number, number] },
  },
};

const footerLinks = [
  { href: SITE_CONTACT.instagram, label: 'Instagram' },
  { href: SITE_CONTACT.whatsapp, label: 'WhatsApp' },
];

export function CTASection() {
  const pathname = usePathname();
  const previewBase = getPreviewBase(pathname);
  const contactHref = withPreviewBase(previewBase, '/contact');
  const { homeCta, footer } = useSiteContent();

  return (
    <section className="cta-section">
      <div className="cta-stage">
        <motion.div
          className="cta-headline-grid"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={container}
        >
          {homeCta.lines.map((line, index) => {
            if (!line && index !== homeCta.accentLine) return null;

            const anchorClass =
              index === 0
                ? 'cta-line-anchor--top'
                : index === 1
                  ? 'cta-line-anchor--middle'
                  : 'cta-line-anchor--bottom';

            return (
              <div key={`${line}-${index}`} className={`cta-line-anchor ${anchorClass}`}>
                <motion.h2 variants={rise} className="cta-line">
                  {index === homeCta.accentLine ? (
                    <span className="cta-line-accent">{homeCta.accentText}</span>
                  ) : (
                    line
                  )}
                </motion.h2>
              </div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ y: 16 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ delay: 0.35, duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          className="cta-contact-row"
        >
          <Link href={contactHref} className="cta-contact-link">
            <span>{homeCta.linkLabel}</span>
            <span className="cta-contact-icon" aria-hidden>
              <ArrowRight size={18} strokeWidth={1.75} />
            </span>
          </Link>
        </motion.div>
      </div>

      <div className="cta-footer-bar">
        <div className="cta-footer-left">
          <p className="cta-footer-copy">© 2026 KASHYAP PATEL</p>
          <p className="cta-footer-tagline">{footer.statement}</p>
        </div>
        <div className="cta-footer-right">
          <Link href={contactHref} className="cta-footer-link">
            {footer.ctaLabel}
          </Link>
          {footerLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-footer-link"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
