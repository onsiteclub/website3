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
  const [showBadges, setShowBadges] = useState(false);
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
            <span className="calc-widget-title">OnSite Calculator</span>
            <div className="calc-widget-actions">
              <button
                className="calc-widget-badge-toggle"
                onClick={() => setShowBadges(!showBadges)}
                aria-label="Download app"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              </button>
              <button
                className="calc-widget-minimize"
                onClick={() => { setOpen(false); setShowBadges(false); }}
                aria-label="Minimize"
              >
                <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="3" y1="7" x2="11" y2="7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Download badges slide-down */}
          {showBadges && (
            <div className="calc-widget-badges">
              <p className="calc-widget-badges-text">{t('calculator_desc')}</p>
              <div className="store-badges store-badges--sm">
                {PLATFORMS.map((p) => (
                  <StoreButton key={p.icon} platform={p} />
                ))}
              </div>
            </div>
          )}

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
