import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function Opening() {
  const t = useTranslations('opening');

  return (
    <section className="opening">
      <Image
        src="/images/hero-default.webp"
        alt=""
        fill
        priority
        className="opening-bg"
      />

      <div className="opening-line" />
      <div className="opening-line" />
      <div className="opening-line" />

      <span className="corner tl">45°25&apos;N 75°41&apos;W</span>
      <span className="corner tr">EST. 2024</span>
      <span className="corner br">ONTARIO, CA</span>

      <div className="opening-content">
        <div className="opening-pre">{t('tagline')}</div>
        <h1>
          {t('title_1')}<br />
          <span className="word-amber">{t('title_2')}</span><br />
          {t('title_3')}
        </h1>
        <p className="opening-sub">{t('subtitle')}</p>
      </div>
    </section>
  );
}
