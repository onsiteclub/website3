import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import type { Metadata } from 'next';
import Link from 'next/link';

const LEGAL_SLUGS = [
  'calculator-privacy',
  'calculator-terms',
  'timekeeper-privacy',
  'timekeeper-terms',
] as const;

type LegalSlug = (typeof LEGAL_SLUGS)[number];

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    LEGAL_SLUGS.map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!LEGAL_SLUGS.includes(slug as LegalSlug)) return {};
  const t = await getTranslations({ locale, namespace: 'legal' });
  return { title: t(`${slug}.title`) };
}

export default async function LegalPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;

  if (!LEGAL_SLUGS.includes(slug as LegalSlug)) {
    notFound();
  }

  const t = await getTranslations('legal');
  const title = t(`${slug}.title`);
  const content = t.raw(`${slug}.content`) as string;
  const updated = t(`${slug}.updated`);

  return (
    <main className="privacy">
      <nav className="privacy-back">
        <Link href="/">&larr; {t('back')}</Link>
      </nav>
      <div className="privacy-inner">
        <p className="privacy-tag">LEGAL</p>
        <h1 className="privacy-h1">{title}</h1>
        <p className="privacy-updated">{updated}</p>
        <div
          className="privacy-content"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </main>
  );
}
