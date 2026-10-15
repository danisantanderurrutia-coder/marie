import React from 'react';
import { ArrowLeft, Info } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

// Common frame for every guided module: back button, title, optional safety note.
export function ModuleShell({ kicker, title, lead, onBack, children, note }) {
  const { t } = useLanguage();
  return (
    <section className="mx-screen animate-fade-in" aria-labelledby="module-title">
      <div className="mx-topbar">
        {onBack && (
          <button className="mx-back" onClick={onBack}>
            <ArrowLeft size={18} aria-hidden="true" /> {t('common.back')}
          </button>
        )}
      </div>
      {kicker && <div className="mx-kicker">{kicker}</div>}
      <h1 id="module-title" className="mx-title">{title}</h1>
      {lead && <p className="mx-lead">{lead}</p>}
      {note}
      <div className="mx-stack" style={{ marginTop: 18 }}>{children}</div>
    </section>
  );
}

// Short, always-visible reminder that Marie is not therapy + a one-tap path to real help.
export function SafetyNote({ onOpenSupport, long = false }) {
  const { t } = useLanguage();
  return (
    <div className="mx-disclaimer" role="note" style={{ marginTop: 14 }}>
      <Info size={18} aria-hidden="true" style={{ flexShrink: 0, marginTop: 2 }} />
      <div>
        <div>{long ? t('safety.disclaimerLong') : t('safety.disclaimerShort')}</div>
        {onOpenSupport && (
          <button className="mx-link-btn" onClick={onOpenSupport} style={{ marginTop: 6 }}>
            {t('safety.helpButton')}
          </button>
        )}
      </div>
    </div>
  );
}
