import Nav from '@/components/Nav';
import Opening from '@/components/Opening';
import FloorPlan from '@/components/FloorPlan';
import Carousel from '@/components/Carousel';
import Manifesto from '@/components/Manifesto';
import Bottom from '@/components/Bottom';
import FloatingPromo from '@/components/FloatingPromo';

const SITE_URL = 'https://www.onsiteclub.ca';

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'OnSite Club',
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/images/logo-onsite-club-02.png`,
      },
      sameAs: [
        'https://www.instagram.com/onsite.club/',
        'https://www.facebook.com/groups/919479544305679',
      ],
      address: {
        '@type': 'PostalAddress',
        addressRegion: 'Ontario',
        addressCountry: 'CA',
      },
      contactPoint: {
        '@type': 'ContactPoint',
        email: 'contact@onsiteclub.ca',
        contactType: 'customer service',
        availableLanguage: ['English', 'French', 'Spanish', 'Portuguese'],
      },
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: 'OnSite Club',
      publisher: { '@id': `${SITE_URL}/#organization` },
      inLanguage: ['en', 'fr', 'es', 'pt'],
    },
    {
      '@type': 'SoftwareApplication',
      name: 'OnSite Calculator',
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'iOS, Android',
      url: 'https://calculator.onsiteclub.ca',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'CAD' },
      author: { '@id': `${SITE_URL}/#organization` },
    },
    {
      '@type': 'SoftwareApplication',
      name: 'OnSite Timekeeper',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Android, Web',
      url: 'https://timekeeperweb.onsiteclub.ca',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'CAD' },
      author: { '@id': `${SITE_URL}/#organization` },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is OnSite Club?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'OnSite Club is a construction lifestyle brand based in Ontario, Canada. We offer branded gear, free digital tools, and a community for construction workers.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is the OnSite Calculator free?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, OnSite Calculator is completely free on iOS and Android. It helps construction workers with material estimations, unit conversions, and job-site math.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is OnSite Timekeeper?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'OnSite Timekeeper is a free time-tracking app for construction workers. Track hours, breaks, and overtime across multiple job sites.',
          },
        },
        {
          '@type': 'Question',
          name: 'Where can I buy OnSite Club gear?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Visit shop.onsiteclub.ca to browse our collection of t-shirts, hoodies, caps, and accessories designed for construction professionals.',
          },
        },
        {
          '@type': 'Question',
          name: 'What languages does OnSite Club support?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'OnSite Club supports English, French, Spanish, and Portuguese to serve the diverse construction workforce in Canada and beyond.',
          },
        },
      ],
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Nav />
      <main>
        <Opening />
        <FloorPlan />
        <Carousel />
        <Manifesto />
        <Bottom />
      </main>
      <FloatingPromo />
    </>
  );
}
