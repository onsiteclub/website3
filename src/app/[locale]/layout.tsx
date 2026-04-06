import type { Metadata } from 'next';
import { Outfit, JetBrains_Mono } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import CookieConsent from '@/components/CookieConsent';
import '../globals.css';

const SITE_URL = 'https://www.onsiteclub.ca';

const OG_LOCALE_MAP: Record<string, string> = {
  en: 'en_CA',
  fr: 'fr_CA',
  es: 'es_419',
  pt: 'pt_BR',
};

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-mono',
  display: 'swap',
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });

  const title = t('title');
  const description = t('description');
  const canonicalUrl = locale === routing.defaultLocale ? SITE_URL : `${SITE_URL}/${locale}`;

  return {
    title: {
      template: '%s | OnSite Club',
      default: title,
    },
    description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        ...Object.fromEntries(
          routing.locales.map((l) => [
            l,
            l === routing.defaultLocale ? SITE_URL : `${SITE_URL}/${l}`,
          ])
        ),
        'x-default': SITE_URL,
      },
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'OnSite Club',
      locale: OG_LOCALE_MAP[locale] || 'en_CA',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className={`${outfit.variable} ${jetbrainsMono.variable}`}>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
          <CookieConsent />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
