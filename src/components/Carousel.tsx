'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import StoreButton, { type StorePlatform } from './StoreButton';
import {
  CALCULATOR_URL,
  CALCULATOR_IOS_URL,
  CALCULATOR_ANDROID_URL,
  TIMEKEEPER_URL,
  TIMEKEEPER_IOS_URL,
  TIMEKEEPER_ANDROID_URL,
  SHOP_URL,
  TECH_URL,
  LEARN_URL,
  CHECKLIST_URL,
} from '@/lib/constants';

const CALC_PLATFORMS: StorePlatform[] = [
  { icon: 'ios', url: CALCULATOR_IOS_URL, label: 'App Store' },
  { icon: 'android', url: CALCULATOR_ANDROID_URL, label: 'Google Play' },
  { icon: 'web', url: CALCULATOR_URL, label: 'Web App' },
];

const TK_PLATFORMS: StorePlatform[] = [
  { icon: 'ios', url: TIMEKEEPER_IOS_URL, label: 'App Store' },
  { icon: 'android', url: TIMEKEEPER_ANDROID_URL, label: 'Google Play' },
  { icon: 'web', url: TIMEKEEPER_URL, label: 'Web App' },
];

const CHECK_PLATFORMS: StorePlatform[] = [
  { icon: 'web', url: CHECKLIST_URL, label: 'Web App' },
];

const PLATFORM_MAP: Record<string, StorePlatform[]> = {
  calc: CALC_PLATFORMS,
  time: TK_PLATFORMS,
  check: CHECK_PLATFORMS,
};

const ITEMS = [
  { key: 'calc',   href: CALCULATOR_URL, css: 'calc',   image: '/images/calc1.jpeg' },
  { key: 'time',   href: TIMEKEEPER_URL, css: 'time',   image: '/images/time1.jpeg' },
  { key: 'check',  href: CHECKLIST_URL,  css: 'check',  image: '/images/tool-checklist.png' },
  { key: 'custom', href: TECH_URL,       css: 'custom', image: '/images/tool-calculator-woman.png' },
  { key: 'tees',   href: SHOP_URL,       css: 'tees',   image: '/images/product-men.webp' },
  { key: 'certs',  href: LEARN_URL,      css: 'certs',  image: '/images/learn.png' },
] as const;

const HAS_PLATFORMS = new Set(['calc', 'time', 'check']);

export default function Carousel() {
  const t = useTranslations('carousel');
  const ref = useScrollReveal<HTMLElement>();

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
              >
                <div className="bento-card-bg" />
                <div className="bento-card-img">
                  <Image src={item.image} alt="" fill sizes="(max-width: 900px) 100vw, 400px" style={{ objectFit: 'cover' }} />
                </div>
                <div className="bento-card-content bento-card-content--stacked">
                  <div>
                    <div className="bento-card-tag">
                      <span className="bento-card-dot" />
                      {t(tagKey)}
                    </div>
                    <h4>{t(titleKey)}</h4>
                    <p className="bento-card-desc">{t(descKey)}</p>
                  </div>
                  <div className="store-badges">
                    {platforms.map((p) => (
                      <StoreButton key={p.icon} platform={p} />
                    ))}
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
