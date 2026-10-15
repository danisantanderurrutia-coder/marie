import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { playSoftTap } from '../utils/audio';

// One question per screen: less overwhelming than a long form, every answer optional.
// fields: array of strings (question) or { label, hint }.
export default function GuidedForm({ fields, onSave, saveLabel, ui, skipAllowed = true }) {
  const { t } = useLanguage();
  const [i, setI] = useState(0);
  const [answers, setAnswers] = useState(() => fields.map(() => ''));
  const last = i === fields.length - 1;
  const f = typeof fields[i] === 'string' ? { label: fields[i] } : fields[i];

  const go = (n) => { playSoftTap(); setI(n); };

  return (
    <div className="mx-card">
      <div className="mx-progress" aria-hidden="true">{fields.map((_, k) => <span key={k} className={k <= i ? 'on' : ''} />)}</div>
      <p className="mx-small" aria-live="polite">{t('heart.ui.step', { n: i + 1, total: fields.length })}</p>
      <label className="mx-field" style={{ marginTop: 8 }}>
        <span className="mx-label">{f.label}{f.hint && <span className="mx-hint">{f.hint}</span>}</span>
        <textarea
          className="mx-textarea"
          style={{ minHeight: 130 }}
          value={answers[i]}
          placeholder={ui.placeholder}
          onChange={(e) => setAnswers(answers.map((a, k) => (k === i ? e.target.value : a)))}
        />
      </label>
      <div className="mx-row" style={{ marginTop: 14, justifyContent: 'space-between' }}>
        <button className="mx-btn ghost" disabled={i === 0} onClick={() => go(i - 1)}>{ui.back}</button>
        {!last ? (
          <div className="mx-row">
            {skipAllowed && <button className="mx-link-btn" onClick={() => go(i + 1)}>{ui.skip}</button>}
            <button className="mx-btn" onClick={() => go(i + 1)}>{ui.next}</button>
          </div>
        ) : (
          <button className="mx-btn warm" onClick={() => onSave(answers)} disabled={!answers.some((a) => a.trim())}>{saveLabel}</button>
        )}
      </div>
      <p className="mx-small" style={{ marginTop: 10 }}>{ui.pause}</p>
    </div>
  );
}
