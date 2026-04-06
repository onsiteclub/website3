'use client';

import { useState, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import {
  CALCULATOR_URL,
  CALCULATOR_IOS_URL,
  CALCULATOR_ANDROID_URL,
  TIMEKEEPER_URL,
  TIMEKEEPER_ANDROID_URL,
  SHOP_URL,
  TECH_URL,
  LEARN_URL,
  CHECKLIST_URL,
} from '@/lib/constants';

interface Platform {
  icon: 'ios' | 'android' | 'web';
  url: string;
  label: string;
}

const CALC_PLATFORMS: Platform[] = [
  { icon: 'ios', url: CALCULATOR_IOS_URL, label: 'App Store' },
  { icon: 'android', url: CALCULATOR_ANDROID_URL, label: 'Google Play' },
  { icon: 'web', url: CALCULATOR_URL, label: 'Web' },
];

const TK_PLATFORMS: Platform[] = [
  { icon: 'android', url: TIMEKEEPER_ANDROID_URL, label: 'Google Play' },
  { icon: 'web', url: TIMEKEEPER_URL, label: 'Web' },
];

const PLATFORM_MAP: Record<string, Platform[]> = {
  calc: CALC_PLATFORMS,
  time: TK_PLATFORMS,
};

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

const ITEMS = [
  { key: 'custom', href: TECH_URL,       css: 'custom', image: '/images/tool-calculator-woman.png' },
  { key: 'tees',   href: SHOP_URL,       css: 'tees',   image: '/images/product-men.webp' },
  { key: 'certs',  href: LEARN_URL,      css: 'certs',  image: '/images/learn.png' },
  { key: 'calc',   href: CALCULATOR_URL, css: 'calc',   image: '/images/calc1.jpeg' },
  { key: 'time',   href: TIMEKEEPER_URL, css: 'time',   image: '/images/time1.jpeg' },
  { key: 'check',  href: CHECKLIST_URL,  css: 'check',  image: '/images/tool-checklist.png' },
] as const;

const HAS_PLATFORMS = new Set(['calc', 'time']);

export default function Carousel() {
  const t = useTranslations('carousel');
  const ref = useScrollReveal<HTMLElement>();
  const [openPopover, setOpenPopover] = useState<string | null>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  // Close on click outside
  useEffect(() => {
    if (!openPopover) return;
    function handleClick(e: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setOpenPopover(null);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [openPopover]);

  return (
    <section className="bento-section reveal" ref={ref}>
      <div className="bento-label">— {t('label')} —</div>
      <div className="bento-grid">
        {ITEMS.map((item) => {
          const tagKey = `${item.key}_tag` as const;
          const titleKey = `${item.key}_title` as const;
          const descKey = `${item.key}_desc` as const;
          const ctaKey = `${item.key}_cta` as const;
          const hasPlatforms = HAS_PLATFORMS.has(item.key);
          const platforms = PLATFORM_MAP[item.key];

          if (hasPlatforms) {
            return (
              <div
                key={item.key}
                className={`bento-card ${item.css}`}
                ref={openPopover === item.key ? popoverRef : undefined}
              >
                <div className="bento-card-bg" />
                <div className="bento-card-img">
                  <Image src={item.image} alt="" fill sizes="(max-width: 900px) 100vw, 400px" style={{ objectFit: 'cover' }} />
                </div>
                <div className="bento-card-content">
                  <div>
                    <div className="bento-card-tag">
                      <span className="bento-card-dot" />
                      {t(tagKey)}
                    </div>
                    <h4>{t(titleKey)}</h4>
                    <p className="bento-card-desc">{t(descKey)}</p>
                  </div>
                  <div className="bento-cta-wrap">
                    <button
                      className="bento-card-cta"
                      onClick={() => setOpenPopover(openPopover === item.key ? null : item.key)}
                    >
                      {t(ctaKey)} →
                    </button>
                    {openPopover === item.key && platforms && (
                      <div className="bento-popover">
                        {platforms.map((p) => (
                          <a
                            key={p.icon}
                            href={p.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bento-popover-link"
                          >
                            <PlatformIcon type={p.icon} />
                            <span>{p.label}</span>
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          }

          return (
            <a
              key={item.key}
              href={item.href}
              className={`bento-card ${item.css}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="bento-card-bg" />
              <div className="bento-card-img">
                <Image src={item.image} alt="" fill sizes="(max-width: 900px) 100vw, 400px" style={{ objectFit: 'cover' }} />
              </div>
              <div className="bento-card-content">
                <div>
                  <div className="bento-card-tag">
                    <span className="bento-card-dot" />
                    {t(tagKey)}
                  </div>
                  <h4>{t(titleKey)}</h4>
                  <p className="bento-card-desc">{t(descKey)}</p>
                </div>
                <span className="bento-card-cta">{t(ctaKey)} →</span>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
