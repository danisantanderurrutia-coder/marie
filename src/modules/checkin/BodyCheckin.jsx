import React, { useMemo, useState } from 'react';
import { ModuleShell } from '../../components/ModuleShell';
import { useLanguage } from '../../context/LanguageContext';
import { useLog } from '../../utils/storage';
import { KEYS } from '../../utils/keys';
import { playSoftChime, playSoftTap } from '../../utils/audio';
import './checkin.css';

const MOONS = ['🌑', '🌘', '🌗', '🌔', '🌕'];
const TOTAL = 5;

function dayOfYear() {
  const now = new Date();
  return Math.floor((now - new Date(now.getFullYear(), 0, 0)) / 86400000);
}

export default function BodyCheckin({ onBack, soundEnabled, openSupport }) {
  const { t, currentStrings, language } = useLanguage();
  const c = currentStrings.checkin;
  const log = useLog(KEYS.checkin);

  const [step, setStep] = useState(0);
  const [level, setLevel] = useState(null);
  const [words, setWords] = useState([]);
  const [offset, setOffset] = useState(dayOfYear());
  const [answers, setAnswers] = useState({});
  const [gestures, setGestures] = useState([]);
  const [saved, setSaved] = useState(false);

  // Three questions at a time; the rotation moves daily and on request
  const picked = useMemo(() => {
    const list = c.questions.list;
    return [0, 1, 2].map((i) => (offset * 3 + i) % list.length);
  }, [offset, c.questions.list]);

  const toggle = (arr, setArr, v) => setArr(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);
  const go = (n) => { playSoftTap(); setStep(n); window.scrollTo?.({ top: 0 }); };

  const lastTwoLow = log.items.slice(0, 2).length === 2 && log.items.slice(0, 2).every((e) => e.level <= 2) && level !== null && level <= 2;

  const save = () => {
    const qa = picked
      .map((idx) => ({ idx, q: c.questions.list[idx], a: (answers[idx] || '').trim() }))
      .filter((x) => x.a);
    // We store the question index + language-independent keys so history re-localises
    log.add({ level, words: words.map((w) => c.feelings.words.indexOf(w)), qa: qa.map(({ idx, a }) => ({ idx, a })), gestures: gestures.map((g) => c.close.gestures.indexOf(g)), lang: language });
    if (soundEnabled) playSoftChime();
    setSaved(true);
  };

  const reset = () => { setStep(0); setLevel(null); setWords([]); setAnswers({}); setGestures([]); setSaved(false); };

  const closeText = level === null ? '' : level <= 2 ? c.close.low : level === 3 ? c.close.mid : c.close.high;
  const stepLabel = t('checkin.step', { n: Math.min(step + 1, TOTAL), total: TOTAL });

  return (
    <ModuleShell kicker={c.kicker} title={c.title} lead={step === 0 ? c.lead : undefined} onBack={onBack}>
      {!saved && (
        <>
          <div className="mx-progress" aria-hidden="true">{Array.from({ length: TOTAL }).map((_, i) => <span key={i} className={i <= step ? 'on' : ''} />)}</div>
          <p className="mx-small" aria-live="polite">{stepLabel}</p>
        </>
      )}

      {!saved && step === 0 && (
        <div className="mx-card">
          <h2 className="mx-h2" style={{ marginTop: 0 }}>{c.arrive.title}</h2>
          <p className="mx-text">{c.arrive.text}</p>
          <button className="mx-btn warm full" style={{ marginTop: 14 }} onClick={() => go(1)}>{c.arrive.button}</button>
        </div>
      )}

      {!saved && step === 1 && (
        <div className="mx-card">
          <h2 className="mx-h2" style={{ marginTop: 0 }}>{c.scale.title}</h2>
          <p className="mx-small">{c.scale.hint}</p>
          <div className="mx-scale" role="group" aria-label={c.scale.title} style={{ marginTop: 12 }}>
            {c.scale.levels.map((label, i) => (
              <button key={label} aria-pressed={level === i + 1} onClick={() => { playSoftTap(); setLevel(i + 1); }}>
                <span className="dot" aria-hidden="true">{MOONS[i]}</span>{label}
              </button>
            ))}
          </div>
          <div className="mx-row" style={{ marginTop: 16, justifyContent: 'space-between' }}>
            <button className="mx-btn ghost" onClick={() => go(0)}>{c.back}</button>
            <button className="mx-btn" disabled={level === null} onClick={() => go(2)}>{c.next}</button>
          </div>
        </div>
      )}

      {!saved && step === 2 && (
        <div className="mx-card">
          <h2 className="mx-h2" style={{ marginTop: 0 }}>{c.feelings.title}</h2>
          <p className="mx-small">{c.feelings.hint}</p>
          <div className="mx-chips" style={{ marginTop: 12 }}>
            {c.feelings.words.map((w) => (
              <button key={w} className="mx-chip" aria-pressed={words.includes(w)} onClick={() => toggle(words, setWords, w)}>{w}</button>
            ))}
          </div>
          <div className="mx-row" style={{ marginTop: 16, justifyContent: 'space-between' }}>
            <button className="mx-btn ghost" onClick={() => go(1)}>{c.back}</button>
            <button className="mx-btn" onClick={() => go(3)}>{c.next}</button>
          </div>
        </div>
      )}

      {!saved && step === 3 && (
        <div className="mx-card">
          <h2 className="mx-h2" style={{ marginTop: 0 }}>{c.questions.title}</h2>
          <p className="mx-small">{c.questions.hint}</p>
          <div className="mx-stack" style={{ marginTop: 12 }}>
            {picked.map((idx) => (
              <label key={idx} className="mx-field">
                <span className="mx-label">{c.questions.list[idx]}</span>
                <textarea
                  className="mx-textarea"
                  value={answers[idx] || ''}
                  placeholder={c.questions.placeholder}
                  onChange={(e) => setAnswers({ ...answers, [idx]: e.target.value })}
                />
              </label>
            ))}
          </div>
          <button className="mx-link-btn" style={{ marginTop: 8 }} onClick={() => { setOffset(offset + 1); setAnswers({}); }}>{c.questions.other}</button>
          <div className="mx-row" style={{ marginTop: 12, justifyContent: 'space-between' }}>
            <button className="mx-btn ghost" onClick={() => go(2)}>{c.back}</button>
            <button className="mx-btn" onClick={() => go(4)}>{c.next}</button>
          </div>
        </div>
      )}

      {!saved && step === 4 && (
        <div className="mx-card tinted">
          <h2 className="mx-h2" style={{ marginTop: 0 }}>{c.close.title}</h2>
          <p className="mx-text">{closeText}</p>
          <p className="mx-label" style={{ marginTop: 14 }}>{c.close.gestureTitle}</p>
          <div className="mx-chips">
            {c.close.gestures.map((g) => (
              <button key={g} className="mx-chip" aria-pressed={gestures.includes(g)} onClick={() => toggle(gestures, setGestures, g)}>{g}</button>
            ))}
          </div>
          {lastTwoLow && (
            <div className="mx-disclaimer" style={{ marginTop: 14 }} role="note">
              <div>{c.close.repeatLow}<br />
                <button className="mx-link-btn" onClick={openSupport}>{t('safety.helpButton')}</button>
              </div>
            </div>
          )}
          <div className="mx-row" style={{ marginTop: 16, justifyContent: 'space-between' }}>
            <button className="mx-btn ghost" onClick={() => go(3)}>{c.back}</button>
            <button className="mx-btn warm" onClick={save}>{c.close.save}</button>
          </div>
        </div>
      )}

      {saved && (
        <div className="mx-card tinted" role="status">
          <p className="mx-toast">{c.close.saved}</p>
          <button className="mx-btn ghost" style={{ marginTop: 10 }} onClick={reset}>{c.again}</button>
        </div>
      )}

      <h2 className="mx-h2">{c.history.title}</h2>
      {log.items.length === 0 ? (
        <p className="mx-small">{c.history.empty}</p>
      ) : (
        <>
          <p className="mx-small">{c.history.note}</p>
          <div className="checkin-moons" role="img" aria-label={c.history.title}>
            {log.items.slice(0, 14).reverse().map((e) => (
              <span key={e.id} title={new Date(e.at).toLocaleDateString(language)} className="checkin-moon">{MOONS[e.level - 1]}</span>
            ))}
          </div>
          <ul className="checkin-list">
            {log.items.slice(0, 8).map((e) => (
              <li key={e.id} className="mx-card soft">
                <div className="mx-row" style={{ justifyContent: 'space-between' }}>
                  <strong>{MOONS[e.level - 1]} {c.scale.levels[e.level - 1]}</strong>
                  <span className="mx-small">{new Date(e.at).toLocaleDateString(language, { day: 'numeric', month: 'short' })}</span>
                </div>
                {e.words?.length > 0 && <p className="mx-small">{e.words.map((i) => c.feelings.words[i]).filter(Boolean).join(' · ')}</p>}
                {(e.qa || []).map((x) => (
                  <p key={x.idx} className="mx-small"><em>{c.questions.list[x.idx]}</em><br />{x.a}</p>
                ))}
                <button className="mx-link-btn" onClick={() => log.remove(e.id)}>{c.history.delete}</button>
              </li>
            ))}
          </ul>
        </>
      )}
    </ModuleShell>
  );
}
