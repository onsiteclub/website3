'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect, useRef, FormEvent } from 'react';

interface ContactModalProps {
  open: boolean;
  onClose: () => void;
}

export default function ContactModal({ open, onClose }: ContactModalProps) {
  const t = useTranslations('contact');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) {
      setStatus('idle');
      return;
    }
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    const form = e.currentTarget;
    try {
      const res = await fetch('https://formspree.io/f/xcontact', {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  return (
    <div className="modal-backdrop" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal" ref={modalRef}>
        <button className="modal-close" onClick={onClose} aria-label="Close">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <div className="modal-header">
          <div className="modal-tag">— {t('title')} —</div>
          <a href="mailto:contact@onsiteclub.ca" className="modal-email">contact@onsiteclub.ca</a>
        </div>

        {status === 'success' ? (
          <div className="modal-success">
            <p>{t('success')}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="modal-form">
            <div className="modal-field">
              <label htmlFor="contact-name">{t('name_label')}</label>
              <input
                id="contact-name"
                name="name"
                type="text"
                placeholder={t('name_placeholder')}
                required
                autoComplete="name"
              />
            </div>

            <div className="modal-field">
              <label htmlFor="contact-email">{t('email_label')}</label>
              <input
                id="contact-email"
                name="email"
                type="email"
                placeholder={t('email_placeholder')}
                required
                autoComplete="email"
              />
            </div>

            <div className="modal-field">
              <label htmlFor="contact-message">{t('message_label')}</label>
              <textarea
                id="contact-message"
                name="message"
                placeholder={t('message_placeholder')}
                required
                rows={5}
              />
            </div>

            {status === 'error' && (
              <p className="modal-error">{t('error')}</p>
            )}

            <button type="submit" className="modal-submit" disabled={status === 'sending'}>
              {status === 'sending' ? t('sending') : t('submit')}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
