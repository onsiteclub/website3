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
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dismissed = sessionStorage.getItem(STORAGE_KEY);
    if (dismissed) return;
    const timer = setTimeout(() => setVisible(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!visible) return;
    function handleClick(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        dismiss();
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  useEffect(() => {
    if (!visible) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') dismiss();
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  function dismiss() {
    setVisible(false);
    sessionStorage.setItem(STORAGE_KEY, '1');
  }

  if (!visible) return null;

  return (
    <div ref={panelRef} className="float-promo">
      {/* Background image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="float-promo-bg"
        src="/images/calc1.jpeg"
        alt=""
        aria-hidden="true"
      />
      {/* Dark overlay for contrast */}
      <div className="float-promo-overlay" />

      {/* Close */}
      <button
        className="float-promo-close"
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); dismiss(); }}
        aria-label="Close"
      >
        <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M11 3L3 11M3 3l8 8" />
        </svg>
      </button>

      {/* Content */}
      <div className="float-promo-body">
        <span className="float-promo-badge">{t('calculator_badge')}</span>
        <h3 className="float-promo-title">{t('calculator_name')}</h3>
        <p className="float-promo-desc">{t('calculator_desc')}</p>
        <div className="float-promo-actions">
          {PLATFORMS.map((p) => (
            <StoreButton key={p.icon} platform={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
