'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import {
  INSTAGRAM_URL,
  FACEBOOK_COMMUNITY_URL,
  SHOP_URL,
  TECH_URL,
  LEARN_URL,
  CALCULATOR_URL,
  CALCULATOR_IOS_URL,
  CALCULATOR_ANDROID_URL,
  TIMEKEEPER_URL,
  TIMEKEEPER_ANDROID_URL,
  DASHBOARD_URL,
} from '@/lib/constants';

function PlatformIcon({ type }: { type: 'ios' | 'android' | 'web' }) {
  if (type === 'ios')
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
      </svg>
    );
  if (type === 'android')
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
        <path d="M17.6 9.48l1.84-3.18c.16-.31.04-.69-.26-.85-.29-.15-.65-.06-.83.22l-1.88 3.24a11.463 11.463 0 00-8.94 0L5.65 5.67c-.19-.29-.51-.38-.83-.22-.31.16-.43.54-.26.85L6.4 9.48A10.78 10.78 0 002 18h20a10.78 10.78 0 00-4.4-8.52zM7 15.25a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5zm10 0a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5z" />
      </svg>
    );
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
    </svg>
  );
}

interface ToolPlatform {
  icon: 'ios' | 'android' | 'web';
  url: string;
  label: string;
}

const CALC_PLATFORMS: ToolPlatform[] = [
  { icon: 'ios', url: CALCULATOR_IOS_URL, label: 'App Store' },
  { icon: 'android', url: CALCULATOR_ANDROID_URL, label: 'Google Play' },
  { icon: 'web', url: CALCULATOR_URL, label: 'Web' },
];

const TK_PLATFORMS: ToolPlatform[] = [
  { icon: 'android', url: TIMEKEEPER_ANDROID_URL, label: 'Google Play' },
  { icon: 'web', url: TIMEKEEPER_URL, label: 'Web' },
];

export default function Bottom() {
  const t = useTranslations('bottom');
  const ref = useScrollReveal<HTMLDivElement>();
  const [openPlatform, setOpenPlatform] = useState<string | null>(null);

  function togglePlatform(name: string, e: React.MouseEvent) {
    e.preventDefault();
    setOpenPlatform(openPlatform === name ? null : name);
  }

  return (
    <div className="bottom reveal" id="contact" ref={ref}>
      {/* Social */}
      <div className="bottom-cell">
        <h3>{t('social_title')}</h3>
        <p>{t('social_desc')}</p>
        <div className="social-row">
          <a href={INSTAGRAM_URL} className="sc" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
          </a>
          <a href={FACEBOOK_COMMUNITY_URL} className="sc" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <svg viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
          </a>
          <a href="#" className="sc" aria-label="YouTube">
            <svg viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
          </a>
          <a href="#" className="sc" aria-label="LinkedIn">
            <svg viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          </a>
        </div>
      </div>

      {/* Contact */}
      <div className="bottom-cell">
        <h3>{t('contact_title')}</h3>
        <a href="mailto:contact@onsiteclub.ca" className="email-link">contact@onsiteclub.ca</a>
        <p>{t('contact_location')}</p>
      </div>

      {/* Navigate */}
      <div className="bottom-cell">
        <h3>{t('nav_title')}</h3>
        <div className="bottom-links">
          <a href={SHOP_URL}>{t('shop')}</a>
          <a href={TECH_URL}>{t('tech')}</a>
          <a href={LEARN_URL}>{t('learn')}</a>
          <div className="bottom-tool-wrap">
            <button className="bottom-tool-btn" onClick={(e) => togglePlatform('calc', e)}>
              {t('calculator')}
              <svg className={`bottom-tool-chevron${openPlatform === 'calc' ? ' open' : ''}`} viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2.5 4l2.5 2.5L7.5 4" /></svg>
            </button>
            {openPlatform === 'calc' && (
              <div className="bottom-platforms">
                {CALC_PLATFORMS.map((p) => (
                  <a key={p.icon} href={p.url} target="_blank" rel="noopener noreferrer" className="bottom-platform-link">
                    <PlatformIcon type={p.icon} />
                    <span>{p.label}</span>
                  </a>
                ))}
              </div>
            )}
          </div>
          <div className="bottom-tool-wrap">
            <button className="bottom-tool-btn" onClick={(e) => togglePlatform('tk', e)}>
              {t('timekeeper')}
              <svg className={`bottom-tool-chevron${openPlatform === 'tk' ? ' open' : ''}`} viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2.5 4l2.5 2.5L7.5 4" /></svg>
            </button>
            {openPlatform === 'tk' && (
              <div className="bottom-platforms">
                {TK_PLATFORMS.map((p) => (
                  <a key={p.icon} href={p.url} target="_blank" rel="noopener noreferrer" className="bottom-platform-link">
                    <PlatformIcon type={p.icon} />
                    <span>{p.label}</span>
                  </a>
                ))}
              </div>
            )}
          </div>
          <a href={DASHBOARD_URL}>{t('members')}</a>
        </div>
      </div>

      {/* Legal */}
      <div className="bottom-cell">
        <h3>{t('legal_title')}</h3>
        <div className="bottom-links">
          <Link href="/privacy">{t('privacy_policy')}</Link>
          <Link href="/legal/calculator-privacy">{t('calc_privacy')}</Link>
          <Link href="/legal/calculator-terms">{t('calc_terms')}</Link>
          <Link href="/legal/timekeeper-privacy">{t('tk_privacy')}</Link>
          <Link href="/legal/timekeeper-terms">{t('tk_terms')}</Link>
        </div>
        <p className="copy">{t('copyright')} <span>·</span></p>
      </div>
    </div>
  );
}
