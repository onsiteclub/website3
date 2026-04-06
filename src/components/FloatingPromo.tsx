'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import {
  CALCULATOR_URL,
  CALCULATOR_IOS_URL,
  CALCULATOR_ANDROID_URL,
  TIMEKEEPER_URL,
  TIMEKEEPER_ANDROID_URL,
} from '@/lib/constants';

const STORAGE_KEY = 'onsite_promo_dismissed';

interface Platform {
  label: string;
  url: string;
  icon: 'ios' | 'android' | 'web';
}

interface Promo {
  key: string;
  platforms: Platform[];
}

const PROMOS: Promo[] = [
  {
    key: 'calculator',
    platforms: [
      { label: 'btn_ios', url: CALCULATOR_IOS_URL, icon: 'ios' },
      { label: 'btn_android', url: CALCULATOR_ANDROID_URL, icon: 'android' },
      { label: 'btn_web', url: CALCULATOR_URL, icon: 'web' },
    ],
  },
  {
    key: 'timekeeper',
    platforms: [
      { label: 'btn_android', url: TIMEKEEPER_ANDROID_URL, icon: 'android' },
      { label: 'btn_web', url: TIMEKEEPER_URL, icon: 'web' },
    ],
  },
];

function PlatformIcon({ type }: { type: 'ios' | 'android' | 'web' }) {
  if (type === 'ios')
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
      </svg>
    );
  if (type === 'android')
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
        <path d="M17.6 9.48l1.84-3.18c.16-.31.04-.69-.26-.85-.29-.15-.65-.06-.83.22l-1.88 3.24a11.463 11.463 0 00-8.94 0L5.65 5.67c-.19-.29-.51-.38-.83-.22-.31.16-.43.54-.26.85L6.4 9.48A10.78 10.78 0 002 18h20a10.78 10.78 0 00-4.4-8.52zM7 15.25a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5zm10 0a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5z" />
      </svg>
    );
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
    </svg>
  );
}

export default function FloatingPromo() {
  const t = useTranslations('banner');
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [promoIndex, setPromoIndex] = useState(0);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dismissed = sessionStorage.getItem(STORAGE_KEY);
    if (dismissed) return;

    setPromoIndex(Math.floor(Math.random() * PROMOS.length));

    const timer = setTimeout(() => setVisible(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  // Close expanded panel on click outside
  useEffect(() => {
    if (!expanded) return;
    function handleClick(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setExpanded(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [expanded]);

  // Close on ESC
  useEffect(() => {
    if (!expanded) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setExpanded(false);
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [expanded]);

  function dismiss(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    setVisible(false);
    setExpanded(false);
    sessionStorage.setItem(STORAGE_KEY, '1');
  }

  function handleCardClick() {
    setExpanded(true);
  }

  if (!visible) return null;

  const promo = PROMOS[promoIndex];

  return (
    <div ref={panelRef} className={`float-promo ${expanded ? 'float-promo-expanded' : ''}`}>
      <button className="float-promo-close" onClick={dismiss} aria-label="Close">
        <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M11 3L3 11M3 3l8 8" />
        </svg>
      </button>

      {!expanded ? (
        /* ── Collapsed card ── */
        <div className="float-promo-collapsed" onClick={handleCardClick} role="button" tabIndex={0}>
          <div className="float-promo-img">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/tool-calculator-woman.png" alt="OnSite Calculator" />
          </div>
          <div className="float-promo-badge">{t(`${promo.key}_badge`)}</div>
          <div className="float-promo-title">{t(`${promo.key}_name`)}</div>
          <div className="float-promo-cta">{t(`${promo.key}_cta`)} &rarr;</div>
        </div>
      ) : (
        /* ── Expanded panel ── */
        <div className="float-promo-panel">
          <div className="float-promo-panel-badge">{t(`${promo.key}_badge`)}</div>
          <div className="float-promo-panel-name">{t(`${promo.key}_name`)}</div>
          <div className="float-promo-panel-desc">{t(`${promo.key}_desc`)}</div>
          <div className="float-promo-platforms">
            {promo.platforms.map((p) => (
              <a
                key={p.icon}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="float-promo-platform"
              >
                <PlatformIcon type={p.icon} />
                <span>{t(p.label)}</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
