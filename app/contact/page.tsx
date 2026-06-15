'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { BrandLogo } from '@/components/BrandLogo';
import { useSiteContent } from '@/lib/content/ContentProvider';
import { getPreviewBase } from '@/lib/content/preview';
import { SITE_CONTACT, SITE_LOCATION } from '@/lib/site';

const socialLinks = [
  {
    label: 'Instagram',
    href: SITE_CONTACT.instagram,
    image: '/fashion/fashion-3.jpeg',
  },
  {
    label: 'WhatsApp',
    href: SITE_CONTACT.whatsapp,
    image: '/interiors/DSC02369-HDR.jpg',
  },
];

const rise = (delay: number) => ({
  hidden: { y: '110%' },
  show: {
    y: 0,
    transition: {
      duration: 0.85,
      delay,
      ease: [0.76, 0, 0.24, 1] as [number, number, number, number],
    },
  },
});

export default function ContactPage() {
  const pathname = usePathname();
  const previewBase = getPreviewBase(pathname);
  const { contact } = useSiteContent();
  const subheadlineParts = contact.subheadline.split(contact.accentWord);

  return (
    <div className="contact-page">
      <div className="contact-shell">
        <header className="contact-hero">
          <div className="contact-headline-line">
            <div className="contact-headline-mask">
              <motion.span
                variants={rise(0.05)}
                initial="hidden"
                animate="show"
                className="contact-headline t-display"
              >
                {contact.headline}
              </motion.span>
            </div>
          </div>
          <div className="contact-headline-line">
            <div className="contact-headline-mask">
              <motion.span
                variants={rise(0.16)}
                initial="hidden"
                animate="show"
                className="contact-headline contact-headline--sub t-display"
              >
                {subheadlineParts[0]}
                <span className="contact-headline-accent">{contact.accentWord}</span>
                {subheadlineParts[1] ?? ''}
              </motion.span>
            </div>
          </div>
          <div className="contact-divider" />
        </header>

        {contact.body ? (
          <motion.p
            className="contact-intro-text"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.24, duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            {contact.body}
          </motion.p>
        ) : null}

        <div className="contact-main">
          <div className="contact-info">
            <div className="contact-fields-row">
              <motion.div
                className="contact-field"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
              >
                <p className="contact-field-label">Email Address</p>
                <a
                  href={`mailto:${SITE_CONTACT.email}`}
                  className="contact-field-value contact-field-value--email"
                >
                  {SITE_CONTACT.email}
                </a>
              </motion.div>

              <motion.div
                className="contact-field"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
              >
                <p className="contact-field-label">Phone Number</p>
                <a href={`tel:${SITE_CONTACT.phone}`} className="contact-field-value">
                  {SITE_CONTACT.phoneDisplay}
                </a>
              </motion.div>
            </div>
          </div>

          <div className="contact-cards">
            {socialLinks.map(({ label, href, image }, i) => (
              <motion.div
                key={label}
                className="contact-card"
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 + 0.48, duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
              >
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-card-link"
                >
                  <Image
                    src={image}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 50vw, 20vw"
                    className="contact-card-image"
                    priority={i === 0}
                  />
                  <span className="contact-card-overlay" aria-hidden />
                  <span className="contact-card-footer">
                    <span className="contact-card-title">
                      <span className="contact-card-label">{label}</span>
                      <ArrowUpRight
                        className="contact-card-arrow"
                        size={11}
                        strokeWidth={2.25}
                        aria-hidden
                      />
                    </span>
                  </span>
                </a>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          className="contact-footer-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.75, duration: 0.6 }}
        >
          <p className="contact-address">
            {SITE_LOCATION.city}
            <span className="contact-address-sep" aria-hidden="true">
              |
            </span>
            {SITE_LOCATION.region}
            <span className="contact-address-sep" aria-hidden="true">
              |
            </span>
            {SITE_LOCATION.country}
          </p>
          <Link href={previewBase ?? '/'} className="contact-footer-logo" aria-label="Kashyap Patel home">
            <BrandLogo themeAdaptive />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
