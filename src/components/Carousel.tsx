'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import {
  CALCULATOR_URL,
  TIMEKEEPER_URL,
  SHOP_URL,
  TECH_URL,
  LEARN_URL,
  CHECKLIST_URL,
} from '@/lib/constants';

const ITEMS = [
  { key: 'custom', href: TECH_URL,       css: 'custom', image: '/images/tool-calculator-woman.png' },
  { key: 'tees',   href: SHOP_URL,       css: 'tees',   image: '/images/product-men.webp' },
  { key: 'certs',  href: LEARN_URL,      css: 'certs',  image: '/images/learn.png' },
  { key: 'calc',   href: CALCULATOR_URL, css: 'calc',   image: '/images/calc1.jpeg' },
  { key: 'time',   href: TIMEKEEPER_URL, css: 'time',   image: '/images/time1.jpeg' },
  { key: 'check',  href: CHECKLIST_URL,  css: 'check',  image: '/images/tool-checklist.png' },
] as const;

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
