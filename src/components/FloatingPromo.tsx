'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import StoreButton, { type StorePlatform } from './StoreButton';
import {
  CALCULATOR_URL,
  CALCULATOR_IOS_URL,
  CALCULATOR_ANDROID_URL,
} from '@/lib/constants';

const PLATFORMS: StorePlatform[] = [
  { icon: 'ios', url: CALCULATOR_IOS_URL, label: 'App Store' },
  { icon: 'android', url: CALCULATOR_ANDROID_URL, label: 'Google Play' },
];

export default function FloatingPromo() {
  const t = useTranslations('banner');
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);

  /* Show minimised FAB after 3s */
  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!ready) return null;

  return (
    <>
      {/* ── Minimised FAB ── */}
      {!open && (
        <button
          className="calc-fab"
          onClick={() => setOpen(true)}
          aria-label="Open Calculator"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="4" y="2" width="16" height="20" rx="2" />
            <line x1="8" y1="6" x2="16" y2="6" />
            <line x1="8" y1="10" x2="8" y2="10.01" />
            <line x1="12" y1="10" x2="12" y2="10.01" />
            <line x1="16" y1="10" x2="16" y2="10.01" />
            <line x1="8" y1="14" x2="8" y2="14.01" />
            <line x1="12" y1="14" x2="12" y2="14.01" />
            <line x1="16" y1="14" x2="16" y2="14.01" />
            <line x1="8" y1="18" x2="8" y2="18.01" />
            <line x1="12" y1="18" x2="16" y2="18" />
          </svg>
          <span className="calc-fab-label">{t('calculator_cta')}</span>
        </button>
      )}

      {/* ── Expanded calculator widget ── */}
      {open && (
        <div className="calc-widget">
          {/* Header bar */}
          <div className="calc-widget-header">
            <div className="calc-widget-stores">
              {PLATFORMS.map((p) => (
                <StoreButton key={p.icon} platform={p} />
              ))}
            </div>
            <button
              className="calc-widget-close"
              onClick={() => { setOpen(false); }}
              aria-label="Close"
            >
              <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M11 3L3 11M3 3l8 8" />
              </svg>
            </button>
          </div>

          {/* Iframe — the actual calculator */}
          <div className="calc-widget-iframe-wrap">
            <iframe
              src={CALCULATOR_URL}
              title="OnSite Calculator"
              className="calc-widget-iframe"
              allow="microphone"
            />
          </div>
        </div>
      )}
    </>
  );
}
