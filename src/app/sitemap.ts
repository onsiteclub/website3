import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';

const SITE_URL = 'https://www.onsiteclub.ca';

function localeAlternates(path: string) {
  return {
    languages: {
      ...Object.fromEntries(
        routing.locales.map((locale) => [
          locale,
          locale === routing.defaultLocale
            ? `${SITE_URL}${path}`
            : `${SITE_URL}/${locale}${path}`,
        ])
      ),
      'x-default': `${SITE_URL}${path}`,
    },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
      alternates: localeAlternates(''),
    },
  ];
}
