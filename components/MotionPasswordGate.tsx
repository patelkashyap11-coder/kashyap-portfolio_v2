'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Lock } from 'lucide-react';

const EASE = [0.76, 0, 0.24, 1] as [number, number, number, number];

interface Props {
  homeHref?: string;
}

export function MotionPasswordGate({ homeHref = '/' }: Props) {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

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
    <div className="gallery-page motion-gate-page">
      <section className="motion-gate">
        <Link href={homeHref} className="category-hero-back">
          <ArrowLeft size={16} strokeWidth={1.75} aria-hidden />
          <span>Back</span>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="motion-gate-card"
        >
          <div className="motion-gate-icon" aria-hidden>
            <Lock size={22} strokeWidth={1.5} />
          </div>

          <p className="t-label motion-gate-label">Private preview</p>
          <h1 className="motion-gate-title t-display">MOTION</h1>
          <p className="motion-gate-copy">
            This section is password protected. Enter the access code to view films and reels.
          </p>

          <form className="motion-gate-form" onSubmit={handleSubmit}>
            <label className="motion-gate-field">
              <span className="t-label">Password</span>
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

            {error ? <p className="motion-gate-error">{error}</p> : null}

            <button type="submit" className="motion-gate-submit" disabled={submitting}>
              {submitting ? 'Checking…' : 'Unlock Motion'}
            </button>
          </form>
        </motion.div>
      </section>
    </div>
  );
}
