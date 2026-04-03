'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { SHOP_URL, TECH_URL, LEARN_URL, DASHBOARD_URL } from '@/lib/constants';

export default function Nav() {
  const t = useTranslations('nav');

  return (
    <nav className="nav">
      <a href="/" className="nav-logo">
        <Image
          src="/images/logo-onsite-club-02.png"
          alt="OnSite Club"
          width={28}
          height={28}
          className="nav-logo-img"
        />
        <span className="nav-logo-text">
          OnSite<span>club</span>
        </span>
      </a>
      <div className="nav-r">
        <a href={SHOP_URL}>{t('gear')}</a>
        <a href={TECH_URL}>{t('technology')}</a>
        <a href={LEARN_URL}>{t('learn')}</a>
        <a href="#contact">{t('contact')}</a>
        <a href={DASHBOARD_URL} className="nav-btn">{t('members')}</a>
      </div>
    </nav>
  );
}
