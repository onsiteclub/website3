'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import {
  CALCULATOR_URL,
  TIMEKEEPER_URL,
  SHOP_URL,
  TECH_URL,
  LEARN_URL,
  CHECKLIST_URL,
} from '@/lib/constants';

const BANNERS = [
  { key: 'calc', href: CALCULATOR_URL, css: 'calc', image: '/images/calc1.jpeg' },
  { key: 'time', href: TIMEKEEPER_URL, css: 'time', image: '/images/time1.jpeg' },
  { key: 'tees', href: SHOP_URL, css: 'tees', image: '/images/product-men.webp' },
  { key: 'hoodies', href: SHOP_URL, css: 'hoodies', image: '/images/product-women.webp' },
  { key: 'custom', href: TECH_URL, css: 'custom', image: '/images/tool-calculator-woman.png' },
  { key: 'certs', href: LEARN_URL, css: 'certs', image: '/images/learn.png' },
  { key: 'caps', href: SHOP_URL, css: 'caps', image: '/images/product-members.webp' },
  { key: 'stickers', href: SHOP_URL, css: 'stickers', image: '/images/banner-shop.png' },
  { key: 'check', href: CHECKLIST_URL, css: 'check', image: '/images/tool-checklist.png' },
] as const;

function BannerCard({
  banner,
  t,
}: {
  banner: (typeof BANNERS)[number];
  t: ReturnType<typeof useTranslations<'carousel'>>;
}) {
  const tagKey = `${banner.key}_tag` as const;
  const titleKey = `${banner.key}_title` as const;
  const descKey = `${banner.key}_desc` as const;
  const ctaKey = `${banner.key}_cta` as const;

  return (
    <a href={banner.href} className={`cbanner ${banner.css}`} target="_blank" rel="noopener noreferrer">
      <div className="cbanner-bg" />
      <div className="cbanner-icon">
        <Image src={banner.image} alt="" fill sizes="130px" style={{ objectFit: 'cover' }} />
      </div>
      <div className="cbanner-content">
        <div className="cbanner-left">
          <div className="cbanner-tag">
            <span className="cbanner-tag-dot" />
            {t(tagKey)}
          </div>
          <h4>{t(titleKey)}</h4>
          <p className="cbanner-desc">{t(descKey)}</p>
        </div>
        <span className="cbanner-cta">{t(ctaKey)} →</span>
      </div>
    </a>
  );
}

export default function Carousel() {
  const t = useTranslations('carousel');

  return (
    <section className="carousel-section">
      <div className="carousel-label">— {t('label')} —</div>
      <div className="carousel-track-wrapper">
        <div className="carousel-track">
          {/* Original set */}
          {BANNERS.map((b) => (
            <BannerCard key={b.key} banner={b} t={t} />
          ))}
          {/* Duplicate for seamless loop */}
          {BANNERS.map((b) => (
            <BannerCard key={`dup-${b.key}`} banner={b} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
