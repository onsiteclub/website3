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

interface PlatformLink {
  label: string;
  url: string;
}

interface TechItem {
  key: string;
  url: string;
  platforms?: PlatformLink[];
}

const TECH_ITEMS: TechItem[] = [
  {
    key: 'calculator', url: CALCULATOR_URL,
    platforms: [
      { label: 'App Store', url: CALCULATOR_IOS_URL },
      { label: 'Google Play', url: CALCULATOR_ANDROID_URL },
      { label: 'Web', url: CALCULATOR_URL },
    ],
  },
  {
    key: 'timekeeper', url: TIMEKEEPER_URL,
    platforms: [
      { label: 'Google Play', url: TIMEKEEPER_ANDROID_URL },
      { label: 'Web', url: TIMEKEEPER_URL },
    ],
  },
  { key: 'checklist', url: CHECKLIST_URL },
  { key: 'custom', url: TECH_URL },
];

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
                    <div className="nav-dd-platforms">
                      {item.platforms.map(p => (
                        <a key={p.label} href={p.url} onClick={closeAll} target="_blank" rel="noopener noreferrer">
                          {p.label}
                        </a>
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
