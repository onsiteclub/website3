'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { SHOP_URL, TECH_URL, LEARN_URL } from '@/lib/constants';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function FloorPlan() {
  const t = useTranslations('floorplan');
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section className="floorplan reveal" id="blueprint" ref={ref}>
      <div className="fp-label">— {t('label')} —</div>

      <div className="fp-grid">
        {/* GEAR room */}
        <a href={SHOP_URL} className="room room-gear" target="_blank" rel="noopener noreferrer">
          <Image src="/images/banner-shop.png" alt="" fill sizes="(max-width:900px) 100vw, 50vw" className="room-bg" />
          <div className="room-head">
            <div className="room-id">{t('room_gear_id')}</div>
            <div className="room-area">shop.onsiteclub.ca</div>
          </div>
          <div className="room-body">
            <h2>{t('room_gear_title')}</h2>
            <p className="room-desc">{t('room_gear_desc')}</p>
            <div className="room-enter">
              {t('enter')}
              <div className="room-enter-arrow" />
            </div>
          </div>
        </a>

        {/* TECH room — spans two rows */}
        <a href={TECH_URL} className="room room-tech" target="_blank" rel="noopener noreferrer">
          <Image src="/images/tool-calculator-woman.png" alt="" fill sizes="(max-width:900px) 100vw, 50vw" className="room-bg" />
          <div className="room-head">
            <div className="room-id">{t('room_tech_id')}</div>
            <div className="room-area">tech.onsiteclub.ca</div>
          </div>
          <div className="room-body">
            <h2>{t('room_tech_title')}</h2>
            <p className="room-desc">{t('room_tech_desc')}</p>
            <div className="room-enter">
              {t('enter')}
              <div className="room-enter-arrow" />
            </div>
            <div className="room-sub-cta">{t('room_tech_sub')} →</div>
          </div>
        </a>

        {/* LEARN room */}
        <a href={LEARN_URL} className="room room-learn" target="_blank" rel="noopener noreferrer">
          <Image src="/images/learn.png" alt="" fill sizes="(max-width:900px) 100vw, 50vw" className="room-bg" />
          <div className="room-head">
            <div className="room-id">{t('room_learn_id')}</div>
            <div className="room-area">learn.onsiteclub.ca</div>
          </div>
          <div className="room-body">
            <h2>{t('room_learn_title')}</h2>
            <p className="room-desc">{t('room_learn_desc')}</p>
            <div className="room-enter">
              {t('enter')}
              <div className="room-enter-arrow" />
            </div>
          </div>
        </a>
      </div>

      {/* Dimension line below grid */}
      <div className="fp-dim">
        <div className="fp-dim-line">
          <span className="dt">|</span>
          <span className="dl" />
          <span className="dt">{t('dim')}</span>
          <span className="dl" />
          <span className="dt">|</span>
        </div>
      </div>
    </section>
  );
}
