import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import Link from 'next/link';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'privacy' });
  return {
    title: t('page_title'),
  };
}

export default function PrivacyPage() {
  const t = useTranslations('privacy');

  const sections = [
    { title: t('s1_title'), body: t('s1_body') },
    { title: t('s2_title'), body: t('s2_body') },
    { title: t('s3_title'), body: t('s3_body') },
    { title: t('s4_title'), body: t('s4_body') },
    { title: t('s5_title'), body: t('s5_body') },
    { title: t('s6_title'), body: t('s6_body') },
    { title: t('s7_title'), body: t('s7_body') },
    { title: t('s8_title'), body: t('s8_body') },
    { title: t('s9_title'), body: t('s9_body') },
    { title: t('s10_title'), body: t('s10_body') },
  ];

  return (
    <main className="privacy">
      <nav className="privacy-back">
        <Link href="/">
          &larr; {t('back')}
        </Link>
      </nav>
      <div className="privacy-inner">
        <p className="privacy-tag">{t('tag')}</p>
        <h1 className="privacy-h1">{t('title')}</h1>
        <p className="privacy-updated">{t('last_updated')}</p>

        <div className="privacy-intro">
          <p>{t('intro')}</p>
        </div>

        {sections.map((s, i) => (
          <section key={i} className="privacy-section">
            <h2>{`${i + 1}. ${s.title}`}</h2>
            <p>{s.body}</p>
          </section>
        ))}

        <div className="privacy-contact">
          <h2>{t('contact_title')}</h2>
          <p>{t('contact_body')}</p>
          <a href="mailto:contact@onsiteclub.ca" className="privacy-email">
            contact@onsiteclub.ca
          </a>
        </div>
      </div>
    </main>
  );
}
