'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

const EASE = [0.76, 0, 0.24, 1] as [number, number, number, number];

interface Props {
  homeHref?: string;
}

export function MotionPasswordGate({ homeHref = '/' }: Props) {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [titleRevealed, setTitleRevealed] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const response = await fetch('/api/motion/unlock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as { error?: string } | null;
        setError(data?.error ?? 'Incorrect password.');
        return;
      }

      router.refresh();
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="gallery-page reels-page">
      <section className="category-hero motion-gate-hero">
        <div className="category-hero-media" aria-hidden>
          <div className="reels-hero-fallback" />
          <div className="category-hero-overlay" />
        </div>

        <Link href={homeHref} className="category-hero-back">
          <ArrowLeft size={16} strokeWidth={1.75} aria-hidden />
          <span>Back</span>
        </Link>

        <div className="category-hero-content motion-gate-content">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="category-hero-label t-label"
          >
            Film &amp; Motion
          </motion.p>

          <div
            className={`category-hero-title-wrap${titleRevealed ? ' category-hero-title-wrap--revealed' : ''}`}
          >
            <motion.h1
              initial={{ y: '110%' }}
              animate={{ y: 0 }}
              transition={{ duration: 1, ease: EASE }}
              onAnimationComplete={() => setTitleRevealed(true)}
              className="category-hero-title t-display"
            >
              MOTION
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7, ease: EASE }}
            className="category-hero-description"
          >
            This section is private. Enter the access password to view films and reels.
          </motion.p>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7, ease: EASE }}
            className="motion-gate-form"
            onSubmit={handleSubmit}
          >
            <label className="motion-gate-field">
              <span className="motion-gate-field-label t-label">Password</span>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="current-password"
                className="motion-gate-input"
                placeholder="Enter password"
                required
              />
            </label>

            <button type="submit" className="motion-gate-submit" disabled={submitting}>
              {submitting ? 'Checking…' : 'Unlock'}
            </button>

            {error ? <p className="motion-gate-error">{error}</p> : null}
          </motion.form>
        </div>
      </section>
    </div>
  );
}
