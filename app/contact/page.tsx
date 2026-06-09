'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const socialLinks = [
  {
    label: 'Instagram',
    href: 'https://instagram.com/ikashyap__',
    image: '/fashion/fashion-3.jpeg',
  },
  {
    label: 'WhatsApp',
    href: 'https://wa.me/919712727007',
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
                Small idea or big project?
              </motion.span>
            </div>
          </div>
          <div className="contact-headline-line">
            <div className="contact-headline-mask">
              <motion.span
                variants={rise(0.16)}
                initial="hidden"
                animate="show"
                className="contact-headline t-display"
              >
                Let&apos;s <span className="contact-headline-accent">talk</span>!
              </motion.span>
            </div>
          </div>
          <div className="contact-divider" />
        </header>

        <div className="contact-main">
          <div className="contact-info">
            <motion.div
              className="contact-field"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            >
              <p className="contact-field-label">Email Address</p>
              <a href="mailto:patelkashyap11@gmail.com" className="contact-field-value contact-field-value--email">
                patelkashyap11@gmail.com
              </a>
            </motion.div>

            <motion.div
              className="contact-field"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            >
              <p className="contact-field-label">Phone Number</p>
              <a href="tel:+919712727007" className="contact-field-value">
                +91 97127 27007
              </a>
            </motion.div>
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
                    <span className="contact-card-label">{label}</span>
                    <span className="contact-card-arrow" aria-hidden>
                      ↗
                    </span>
                  </span>
                </a>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.address
          className="contact-address"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.75, duration: 0.6 }}
        >
          <span>Ahmedabad</span>
          <span className="contact-address-sep" aria-hidden="true">
            {' '}|{' '}
          </span>
          <span>Gujarat</span>
          <span className="contact-address-sep" aria-hidden="true">
            {' '}|{' '}
          </span>
          <span>India</span>
        </motion.address>
      </div>
    </div>
  );
}
