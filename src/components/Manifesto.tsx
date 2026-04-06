'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function Manifesto() {
  const t = useTranslations('manifesto');
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section className="mani reveal" ref={ref}>
      <div className="mani-bg">
        <Image
          src="/images/worker.png"
          alt=""
          fill
          className="mani-bg-img"
        />
        <div className="mani-bg-fade" />
      </div>
      <div className="mani-inner">
        <div className="mani-mark" />
        <p className="mani-text">
          {t('text_1')} <strong>{t('text_strong_1')}</strong>{t('text_2')} <strong>{t('text_strong_2')}</strong>{t('text_3')}
        </p>
        <div className="mani-sign">
          <div className="mani-sign-line" />
          <span className="mani-sign-text">{t('sign')}</span>
        </div>
      </div>
    </section>
  );
}
