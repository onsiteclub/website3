'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import StoreButton, { type StorePlatform } from './StoreButton';
import {
  CALCULATOR_URL,
  CALCULATOR_IOS_URL,
  CALCULATOR_ANDROID_URL,
  TIMEKEEPER_URL,
  TIMEKEEPER_ANDROID_URL,
} from '@/lib/constants';

const STORAGE_KEY = 'onsite_promo_dismissed';

interface Promo {
  key: string;
  platforms: StorePlatform[];
}

const PROMOS: Promo[] = [
  {
    key: 'calculator',
    platforms: [
      { icon: 'ios', url: CALCULATOR_IOS_URL, label: 'App Store' },
      { icon: 'android', url: CALCULATOR_ANDROID_URL, label: 'Google Play' },
      { icon: 'web', url: CALCULATOR_URL, label: 'Web App' },
    ],
  },
  {
    key: 'timekeeper',
    platforms: [
      { icon: 'android', url: TIMEKEEPER_ANDROID_URL, label: 'Google Play' },
      { icon: 'web', url: TIMEKEEPER_URL, label: 'Web App' },
    ],
  },
];

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
          <div className="store-badges store-badges--sm">
            {promo.platforms.map((p) => (
              <StoreButton key={p.icon} platform={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
