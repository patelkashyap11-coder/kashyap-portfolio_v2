'use client';

import { useState } from 'react';
import Link from 'next/link';
import { fontCombos, type FontCombo, type FontComboId } from '@/lib/fontCombos';
import { ACTIVE_FONT_COMBO_ID, BACKUP_FONT_COMBO_ID } from '@/lib/siteFonts';
import './font-preview.css';

function comboBadge(id: FontComboId) {
  if (id === ACTIVE_FONT_COMBO_ID) return 'Active on site';
  if (id === BACKUP_FONT_COMBO_ID) return 'Backup';
  return null;
}

function Specimen({ combo }: { combo: FontCombo }) {
  const vars = {
    '--spec-inter': combo.cssVars.inter,
    '--spec-tight': combo.cssVars.tight,
    '--spec-serif': combo.cssVars.serif,
  } as React.CSSProperties;

  return (
    <article className="font-specimen" style={vars}>
      <div className="font-specimen-head">
        <div>
          <h2 className="font-specimen-name">{combo.name}</h2>
          <p className="font-specimen-tagline">{combo.tagline}</p>
        </div>
        {comboBadge(combo.id) ? (
          <span
            className={`font-specimen-badge${
              combo.id === BACKUP_FONT_COMBO_ID ? ' font-specimen-badge--backup' : ''
            }`}
          >
            {comboBadge(combo.id)}
          </span>
        ) : null}
      </div>

      <p className="font-specimen-meta">
        Display: {combo.display} · Accent: {combo.serif} · Body: {combo.body}
      </p>

      <div className="font-specimen-block font-specimen-block--hero">
        <p className="font-specimen-hero-sans">CREATING</p>
        <p className="font-specimen-hero-sans">VISUAL STORIES</p>
        <p className="font-specimen-hero-sans">
          THAT <span className="font-specimen-hero-accent">LAST</span>
        </p>
      </div>

      <p className="font-specimen-body">
        We create visual stories that help brands stand out, from fashion campaigns and
        restaurant content to jewellery, products and interiors.
      </p>

      <div className="font-specimen-row">
        <span className="font-specimen-label">Fashion</span>
        <span className="font-specimen-label">Contact</span>
        <span className="font-specimen-logo">KASHYAP PATEL</span>
      </div>

      <div className="font-specimen-block font-specimen-block--dark">
        <p className="font-specimen-cta">BRINGING STORIES</p>
        <p className="font-specimen-cta">
          <span className="font-specimen-cta-accent">TO LIFE</span>
        </p>
      </div>
    </article>
  );
}

export default function FontPreviewPage() {
  const [activeId, setActiveId] = useState<FontComboId>(ACTIVE_FONT_COMBO_ID);

  return (
    <div className="font-preview-page">
      <header className="font-preview-header">
        <div>
          <p className="font-preview-eyebrow">Typography Lab</p>
          <h1 className="font-preview-title">Font combinations</h1>
          <p className="font-preview-intro">
            Compare pairings from your local <code>public/fonts/</code> folder. Your live site
            stays unchanged. Tell me which one you want when you&apos;re ready.
          </p>
        </div>
        <Link href="/" className="font-preview-back">
          Back to site
        </Link>
      </header>

      <div className="font-preview-tabs" role="tablist" aria-label="Font combinations">
        {fontCombos.map((combo) => (
          <button
            key={combo.id}
            type="button"
            role="tab"
            aria-selected={activeId === combo.id}
            className={`font-preview-tab${activeId === combo.id ? ' is-active' : ''}`}
            onClick={() => setActiveId(combo.id)}
          >
            {combo.name}
          </button>
        ))}
      </div>

      <div className="font-preview-grid">
        {fontCombos.map((combo) => (
          <div
            key={combo.id}
            className={`font-preview-card-wrap${activeId === combo.id ? ' is-active' : ''}`}
            onClick={() => setActiveId(combo.id)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                setActiveId(combo.id);
              }
            }}
            role="button"
            tabIndex={0}
            aria-pressed={activeId === combo.id}
          >
            <Specimen combo={combo} />
          </div>
        ))}
      </div>
    </div>
  );
}
