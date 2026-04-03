/* ═══════════════════════════════════
   Typed data — products, URLs, constants
   ═══════════════════════════════════ */

export interface Product {
  name: string;
  price: string;
  image: string;
  alt: string;
  variant: 'main' | 'thumb';
}

export const PRODUCTS: Product[] = [
  {
    name: 'T-Shirt — The Jump',
    price: '$38',
    image: '/images/product-men.webp',
    alt: 'OnSite Club The Jump t-shirt with construction skyline graphic',
    variant: 'main',
  },
  {
    name: 'T-Shirt — Mascot',
    price: '$38',
    image: '/images/product-women.webp',
    alt: 'OnSite Club Mascot t-shirt with brand mascot graphic',
    variant: 'thumb',
  },
  {
    name: 'T-Shirt — Classic',
    price: '$45',
    image: '/images/product-members.webp',
    alt: 'OnSite Club Classic members-only branded t-shirt',
    variant: 'thumb',
  },
];

export const SHOP_URL = 'https://shop.onsiteclub.ca';
export const DASHBOARD_URL = 'https://dashboard.onsiteclub.ca';
export const CALCULATOR_URL = 'https://calculator.onsiteclub.ca';
export const CALCULATOR_IOS_URL = 'https://apps.apple.com/us/app/onsite-calculator/id6758554794';
export const CALCULATOR_ANDROID_URL = 'https://play.google.com/store/apps/details?id=ca.onsiteclub.calculator';
export const TIMEKEEPER_URL = 'https://timekeeperweb.onsiteclub.ca';
export const TIMEKEEPER_ANDROID_URL = 'https://play.google.com/store/apps/details?id=com.onsiteclub.timekeeper&pcampaignid=web_share';
export const CHECKLIST_URL = 'https://checklist.onsiteclub.ca/self';
export const FACEBOOK_URL = 'https://www.facebook.com/profile.php?id=61574383500621';
export const FACEBOOK_COMMUNITY_URL = 'https://www.facebook.com/groups/919479544305679';
export const INSTAGRAM_URL = 'https://www.instagram.com/onsite.club/';
export const LEARN_URL = 'https://learn.onsiteclub.ca';
export const TECH_URL = 'https://tech.onsiteclub.ca';
