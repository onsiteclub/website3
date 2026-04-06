'use client';

import { useState, useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

const STORAGE_KEY = 'onsite_cookie_consent';

type ConsentState = {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
};

const DEFAULT_CONSENT: ConsentState = {
  essential: true,
  analytics: false,
  marketing: false,
};

export default function CookieConsent() {
  const t = useTranslations('cookies');
  const [visible, setVisible] = useState(false);
  const [showPrefs, setShowPrefs] = useState(false);
  const [consent, setConsent] = useState<ConsentState>(DEFAULT_CONSENT);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      setVisible(true);
    }
  }, []);

  const saveConsent = useCallback((state: ConsentState) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    setVisible(false);
    setShowPrefs(false);
  }, []);

  const handleAcceptAll = () => {
    saveConsent({ essential: true, analytics: true, marketing: true });
  };

  const handleRejectAll = () => {
    saveConsent({ essential: true, analytics: false, marketing: false });
  };

  const handleSavePrefs = () => {
    saveConsent(consent);
  };

  if (!visible) return null;

  return (
    <div className="cookie-banner">
      {!showPrefs ? (
        <>
          <div className="cookie-content">
            <h3 className="cookie-title">{t('title')}</h3>
            <p className="cookie-desc">
              {t('description')}{' '}
              <Link href="/privacy" className="cookie-link">{t('privacy_link')}</Link>.
            </p>
          </div>
          <div className="cookie-actions">
            <button className="cookie-btn cookie-btn-reject" onClick={handleRejectAll}>
              {t('reject')}
            </button>
            <button className="cookie-btn cookie-btn-prefs" onClick={() => setShowPrefs(true)}>
              {t('manage')}
            </button>
            <button className="cookie-btn cookie-btn-accept" onClick={handleAcceptAll}>
              {t('accept')}
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="cookie-content">
            <h3 className="cookie-title">{t('prefs_title')}</h3>
            <p className="cookie-desc">{t('prefs_desc')}</p>
          </div>
          <div className="cookie-categories">
            <div className="cookie-cat">
              <div className="cookie-cat-info">
                <span className="cookie-cat-name">{t('cat_essential')}</span>
                <span className="cookie-cat-desc">{t('cat_essential_desc')}</span>
              </div>
              <span className="cookie-cat-always">{t('always_on')}</span>
            </div>
            <div className="cookie-cat">
              <div className="cookie-cat-info">
                <span className="cookie-cat-name">{t('cat_analytics')}</span>
                <span className="cookie-cat-desc">{t('cat_analytics_desc')}</span>
              </div>
              <label className="cookie-toggle">
                <input
                  type="checkbox"
                  checked={consent.analytics}
                  onChange={(e) => setConsent({ ...consent, analytics: e.target.checked })}
                />
                <span className="cookie-toggle-slider" />
              </label>
            </div>
            <div className="cookie-cat">
              <div className="cookie-cat-info">
                <span className="cookie-cat-name">{t('cat_marketing')}</span>
                <span className="cookie-cat-desc">{t('cat_marketing_desc')}</span>
              </div>
              <label className="cookie-toggle">
                <input
                  type="checkbox"
                  checked={consent.marketing}
                  onChange={(e) => setConsent({ ...consent, marketing: e.target.checked })}
                />
                <span className="cookie-toggle-slider" />
              </label>
            </div>
          </div>
          <div className="cookie-actions">
            <button className="cookie-btn cookie-btn-reject" onClick={handleRejectAll}>
              {t('reject')}
            </button>
            <button className="cookie-btn cookie-btn-accept" onClick={handleSavePrefs}>
              {t('save')}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
