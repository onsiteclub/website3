'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import { useRouter, usePathname } from '@/i18n/routing';
import {
  SHOP_URL, TECH_URL, LEARN_URL, DASHBOARD_URL,
  SHOP_TEES_URL, SHOP_HOODIES_URL, SHOP_CAPS_URL, SHOP_STICKERS_URL,
  CALCULATOR_URL, CALCULATOR_IOS_URL, CALCULATOR_ANDROID_URL,
  TIMEKEEPER_URL, TIMEKEEPER_ANDROID_URL,
  CHECKLIST_URL,
} from '@/lib/constants';
import ContactModal from './ContactModal';
import StoreButton, { type StorePlatform } from './StoreButton';

const LOCALES = [
  { code: 'en', label: 'EN' },
  { code: 'fr', label: 'FR' },
  { code: 'es', label: 'ES' },
  { code: 'pt', label: 'PT' },
] as const;

interface DropdownItem {
  key: string;
  url: string;
}

const GEAR_ITEMS: DropdownItem[] = [
  { key: 'tees', url: SHOP_TEES_URL },
  { key: 'hoodies', url: SHOP_HOODIES_URL },
  { key: 'caps', url: SHOP_CAPS_URL },
  { key: 'stickers', url: SHOP_STICKERS_URL },
];

interface TechItem {
  key: string;
  url: string;
  platforms?: StorePlatform[];
}

const TECH_ITEMS: TechItem[] = [
  {
    key: 'calculator', url: CALCULATOR_URL,
    platforms: [
      { icon: 'ios', url: CALCULATOR_IOS_URL, label: 'App Store' },
      { icon: 'android', url: CALCULATOR_ANDROID_URL, label: 'Google Play' },
      { icon: 'web', url: CALCULATOR_URL, label: 'Web App' },
    ],
  },
  {
    key: 'timekeeper', url: TIMEKEEPER_URL,
    platforms: [
      { icon: 'android', url: TIMEKEEPER_ANDROID_URL, label: 'Google Play' },
      { icon: 'web', url: TIMEKEEPER_URL, label: 'Web App' },
    ],
  },
  { key: 'checklist', url: CHECKLIST_URL },
  { key: 'custom', url: TECH_URL },
];

function NavStoreIcon({ type }: { type: 'ios' | 'android' | 'web' }) {
  if (type === 'ios') return (
    <svg viewBox="0 0 384 512" className="nav-store-icon">
      <path fill="currentColor" d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-62.1 24-72.5-24 1.3-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
    </svg>
  );
  if (type === 'android') return (
    <svg viewBox="0 0 512 512" className="nav-store-icon">
      <path fill="currentColor" d="M17.6 9.48l1.84-3.18c.16-.31.04-.69-.26-.85-.29-.15-.65-.06-.83.22l-1.88 3.24a11.463 11.463 0 00-8.94 0L5.65 5.67c-.19-.29-.51-.38-.83-.22-.31.16-.43.54-.26.85L6.4 9.48A10.78 10.78 0 002 18h20a10.78 10.78 0 00-4.4-8.52zM7 15.25a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5zm10 0a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5z" />
    </svg>
  );
  return (
    <svg viewBox="0 0 24 24" className="nav-store-icon">
      <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
    </svg>
  );
}

const LEARN_ITEMS: DropdownItem[] = [
  { key: 'certifications', url: LEARN_URL },
  { key: 'courses', url: LEARN_URL },
];

export default function Nav() {
  const t = useTranslations('nav');
  const td = useTranslations('nav_dropdown');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [mobileDD, setMobileDD] = useState<string | null>(null);

  function switchLocale(code: string) {
    router.replace(pathname, { locale: code });
    closeAll();
  }

  function handleTrigger(name: string, e: React.MouseEvent) {
    if (window.innerWidth <= 900) {
      e.preventDefault();
      setMobileDD(mobileDD === name ? null : name);
    }
  }

  function closeAll() {
    setOpen(false);
    setMobileDD(null);
  }

  const chevron = (
    <svg className="nav-chevron" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 5l3 3 3-3" />
    </svg>
  );

  return (
    <>
      <nav className="nav">
        <a href="/" className="nav-logo">
          <Image
            src="/images/logo-white-02.png"
            alt="OnSite Club"
            width={140}
            height={47}
            className="nav-logo-img"
          />
        </a>
        <button
          className="nav-toggle"
          aria-label="Toggle menu"
          onClick={() => { setOpen(!open); setMobileDD(null); }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M3 12h18M3 6h18M3 18h18" />
            )}
          </svg>
        </button>
        <div className={`nav-r${open ? ' open' : ''}`}>
          {/* Gear dropdown */}
          <div className="nav-dropdown">
            <a
              href={SHOP_URL}
              onClick={(e) => handleTrigger('gear', e)}
              className="nav-dropdown-trigger"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('gear')}{chevron}
            </a>
            <div className={`nav-dropdown-menu${mobileDD === 'gear' ? ' mobile-open' : ''}`}>
              <a href={SHOP_URL} className="nav-dd-all" onClick={closeAll} target="_blank" rel="noopener noreferrer">
                {t('gear')} &rarr;
              </a>
              {GEAR_ITEMS.map(item => (
                <a key={item.key} href={item.url} onClick={closeAll} target="_blank" rel="noopener noreferrer">
                  {td(item.key)}
                </a>
              ))}
            </div>
          </div>

          {/* Technology dropdown */}
          <div className="nav-dropdown">
            <a
              href={TECH_URL}
              onClick={(e) => handleTrigger('tech', e)}
              className="nav-dropdown-trigger"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('technology')}{chevron}
            </a>
            <div className={`nav-dropdown-menu${mobileDD === 'tech' ? ' mobile-open' : ''}`}>
              <a href={TECH_URL} className="nav-dd-all" onClick={closeAll} target="_blank" rel="noopener noreferrer">
                {t('technology')} &rarr;
              </a>
              {TECH_ITEMS.map(item =>
                item.platforms ? (
                  <div key={item.key} className="nav-dd-group">
                    <span className="nav-dd-group-label">{td(item.key)}</span>
                    <div className="nav-dd-platforms" onClick={closeAll}>
                      {item.platforms.map(p => (
                        <StoreButton key={p.icon} platform={p} />
                      ))}
                    </div>
                  </div>
                ) : (
                  <a key={item.key} href={item.url} onClick={closeAll} target="_blank" rel="noopener noreferrer">
                    {td(item.key)}
                  </a>
                )
              )}
            </div>
          </div>

          {/* Learn dropdown */}
          <div className="nav-dropdown">
            <a
              href={LEARN_URL}
              onClick={(e) => handleTrigger('learn', e)}
              className="nav-dropdown-trigger"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('learn')}{chevron}
            </a>
            <div className={`nav-dropdown-menu${mobileDD === 'learn' ? ' mobile-open' : ''}`}>
              <a href={LEARN_URL} className="nav-dd-all" onClick={closeAll} target="_blank" rel="noopener noreferrer">
                {t('learn')} &rarr;
              </a>
              {LEARN_ITEMS.map(item => (
                <a key={item.key} href={item.url} onClick={closeAll} target="_blank" rel="noopener noreferrer">
                  {td(item.key)}
                </a>
              ))}
            </div>
          </div>

          <button
            className="nav-contact-btn"
            onClick={() => { closeAll(); setContactOpen(true); }}
          >
            {t('contact')}
          </button>
          {/* Language selector */}
          <div className="nav-dropdown nav-lang">
            <button
              onClick={(e) => handleTrigger('lang', e)}
              className="nav-dropdown-trigger nav-lang-trigger"
            >
              <svg className="nav-lang-globe" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2">
                <circle cx="8" cy="8" r="6.5" />
                <path d="M1.5 8h13M8 1.5c-2 2.5-2 9.5 0 13M8 1.5c2 2.5 2 9.5 0 13" />
              </svg>
              {locale.toUpperCase()}
              {chevron}
            </button>
            <div className={`nav-dropdown-menu nav-lang-menu${mobileDD === 'lang' ? ' mobile-open' : ''}`}>
              {LOCALES.map(l => (
                <button
                  key={l.code}
                  className={`nav-lang-option${l.code === locale ? ' active' : ''}`}
                  onClick={() => switchLocale(l.code)}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>

          <a href={DASHBOARD_URL} className="nav-btn" onClick={closeAll}>{t('members')}</a>
        </div>
      </nav>
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
}
