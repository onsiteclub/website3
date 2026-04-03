import { useTranslations } from 'next-intl';

export default function Manifesto() {
  const t = useTranslations('manifesto');

  return (
    <section className="mani">
      <div className="mani-watermark">OS</div>
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
