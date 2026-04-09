'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import StoreButton, { type StorePlatform } from './StoreButton';
import {
  CALCULATOR_URL,
  CALCULATOR_IOS_URL,
  CALCULATOR_ANDROID_URL,
} from '@/lib/constants';

const STORAGE_KEY = 'onsite_promo_dismissed';

const PLATFORMS: StorePlatform[] = [
  { icon: 'ios', url: CALCULATOR_IOS_URL, label: 'App Store' },
  { icon: 'android', url: CALCULATOR_ANDROID_URL, label: 'Google Play' },
  { icon: 'web', url: CALCULATOR_URL, label: 'Web App' },
];

export default function FloatingPromo() {
  const t = useTranslations('banner');
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dismissed = sessionStorage.getItem(STORAGE_KEY);
    if (dismissed) return;
    const timer = setTimeout(() => setVisible(true), 3000);
    return () => clearTimeout(timer);
  }, []);

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

  if (!visible) return null;

  return (
    <div ref={panelRef} className={`float-promo ${expanded ? 'float-promo-expanded' : ''}`}>
      {/* Full background image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="float-promo-bg"
        src="/images/tool-calculator-woman.png"
        alt=""
        aria-hidden="true"
      />

      <button className="float-promo-close" onClick={dismiss} aria-label="Close">
        <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M11 3L3 11M3 3l8 8" />
        </svg>
      </button>

      {!expanded ? (
        <div className="float-promo-collapsed" onClick={() => setExpanded(true)} role="button" tabIndex={0}>
          <div className="float-promo-badge">{t('calculator_badge')}</div>
          <div className="float-promo-title">{t('calculator_name')}</div>
          <div className="float-promo-cta">{t('calculator_cta')} &rarr;</div>
        </div>
      ) : (
        <div className="float-promo-panel">
          <div className="float-promo-panel-badge">{t('calculator_badge')}</div>
          <div className="float-promo-panel-name">{t('calculator_name')}</div>
          <div className="float-promo-panel-desc">{t('calculator_desc')}</div>
          <div className="store-badges store-badges--sm">
            {PLATFORMS.map((p) => (
              <StoreButton key={p.icon} platform={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
