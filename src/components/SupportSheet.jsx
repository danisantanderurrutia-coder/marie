import React, { useEffect } from 'react';
import { LifeBuoy, Phone, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

// Bottom sheet with professional help resources (Germany). Always one tap away.
export default function SupportSheet({ open, onClose }) {
  const { t, currentStrings } = useLanguage();
  const s = currentStrings.safety;

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="mx-overlay" onClick={onClose}>
      <div
        className="mx-sheet"
        role="dialog"
        aria-modal="true"
        aria-labelledby="support-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-row" style={{ justifyContent: 'space-between' }}>
          <LifeBuoy size={26} color="#8E3B46" aria-hidden="true" />
          <button className="mx-back" onClick={onClose} aria-label={t('a11y.close')}>
            <X size={20} />
          </button>
        </div>
        <h2 id="support-title" className="mx-title" style={{ fontSize: 28 }}>{s.sheetTitle}</h2>
        <p className="mx-text">{s.sheetIntro}</p>

        {s.resources.map((r) => (
          <div key={r.id} className="mx-resource">
            <strong>{r.name}</strong>
            <a className="num" href={`tel:${r.tel}`} aria-label={`${s.call}: ${r.name} ${r.number}`}>
              <Phone size={16} aria-hidden="true" /> {r.number}
            </a>
            <p className="mx-small">{r.desc}</p>
          </div>
        ))}

        <div className="mx-resource">
          <strong>{s.therapistSearch.name}</strong>
          <p className="mx-small">{s.therapistSearch.desc}</p>
          <a className="mx-link-btn" href={s.therapistSearch.url} target="_blank" rel="noopener noreferrer">
            psych-info.de
          </a>
        </div>

        <p className="mx-small" style={{ marginTop: 14 }}><strong>{s.urgent}</strong></p>
        <p className="mx-small">{s.verify}</p>
      </div>
    </div>
  );
}
