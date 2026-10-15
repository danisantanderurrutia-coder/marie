import React, { useState } from 'react';
import { ModuleShell, SafetyNote } from '../../components/ModuleShell';
import GuidedForm from '../../components/GuidedForm';
import { useLanguage } from '../../context/LanguageContext';
import { useLog } from '../../utils/storage';
import { KEYS } from '../../utils/keys';
import { playSoftChime } from '../../utils/audio';
import './heart.css';

const TABS = ['journal', 'emotion', 'needs', 'values', 'compassion', 'letters'];

// The "future letter" is shared with the existing Dreams tab, which stores raw text under this key.
function useFutureLetter() {
  const [text, setText] = useState(() => { try { return localStorage.getItem(KEYS.futureLetter) || ''; } catch (e) { return ''; } });
  const update = (v) => { setText(v); try { localStorage.setItem(KEYS.futureLetter, v); } catch (e) {} };
  return [text, update];
}

function Chips({ options, value, onChange, multi = true, max }) {
  const toggle = (i) => {
    if (!multi) return onChange([i]);
    if (value.includes(i)) return onChange(value.filter((x) => x !== i));
    if (max && value.length >= max) return;
    return onChange([...value, i]);
  };
  return (
    <div className="mx-chips">
      {options.map((o, i) => <button key={o} type="button" className="mx-chip" aria-pressed={value.includes(i)} onClick={() => toggle(i)}>{o}</button>)}
    </div>
  );
}

export default function Heart({ onBack, soundEnabled, openSupport }) {
  const { t, currentStrings, language } = useLanguage();
  const h = currentStrings.heart;
  const log = useLog(KEYS.heart);
  const [tab, setTab] = useState('journal');
  const [theme, setTheme] = useState(null);
  const [emotion, setEmotion] = useState(null);
  const [saved, setSaved] = useState(false);
  const [future, setFuture] = useFutureLetter();

  // needs
  const [obs, setObs] = useState('');
  const [feel, setFeel] = useState([]);
  const [need, setNeed] = useState([]);
  const [req, setReq] = useState('');
  const [sentence, setSentence] = useState('');

  // values
  const [vals, setVals] = useState([]);
  const [top, setTop] = useState([]);
  const [valAns, setValAns] = useState({});

  const chime = () => { if (soundEnabled) playSoftChime(); setSaved(true); setTimeout(() => setSaved(false), 2500); };
  const save = (entry) => { log.add(entry); chime(); };
  const switchTab = (k) => { setTab(k); setTheme(null); setEmotion(null); setSaved(false); };

  const buildSentence = () => {
    const f = feel.map((i) => h.needs.feelings[i]).join(', ');
    const n = need.map((i) => h.needs.needsList[i]).join(', ');
    setSentence(t('heart.needs.result', { obs: obs.trim(), feel: f, need: n, req: req.trim() }));
  };

  // Renders a stored entry in the current language
  const describe = (e) => {
    const ui = h.ui;
    switch (e.kind) {
      case 'journal': return { title: `${h.tabs.journal} · ${h.journal.themes[e.theme].name}`, pairs: h.journal.themes[e.theme].fields.map((q, i) => [q, e.answers[i]]) };
      case 'emotion': return { title: `${h.tabs.emotion} · ${h.emotion.emotions[e.emotion].name}`, pairs: h.emotion.fields.map((q, i) => [q, e.answers[i]]) };
      case 'compassion': return { title: h.tabs.compassion, pairs: h.compassion.fields.map((q, i) => [q, e.answers[i]]) };
      case 'letterPast': return { title: h.letters.past.name, pairs: h.letters.past.fields.map((q, i) => [q, e.answers[i]]) };
      case 'needs': return { title: h.tabs.needs, pairs: [[ui.summary, e.sentence]] };
      case 'values': return { title: h.tabs.values, pairs: e.top.flatMap((v) => [[t('heart.values.reflect', { value: h.values.list[v.idx] }), ''], ...h.values.q.map((q, i) => [q, v.answers[i]])]) };
      default: return { title: e.kind, pairs: [] };
    }
  };

  return (
    <ModuleShell kicker={h.kicker} title={h.title} lead={h.lead} onBack={onBack}>
      <div className="mx-chips" role="tablist" aria-label={h.title}>
        {TABS.map((k) => <button key={k} role="tab" aria-selected={tab === k} className="mx-chip" aria-pressed={tab === k} onClick={() => switchTab(k)}>{h.tabs[k]}</button>)}
      </div>

      {saved && <p className="mx-toast" role="status">{h.ui.saved}</p>}

      {tab === 'journal' && (
        <>
          <p className="mx-text">{h.journal.intro}</p>
          {!theme ? (
            <div className="hub-grid">{Object.keys(h.journal.themes).map((k) => (
              <button key={k} className="hub-card" onClick={() => setTheme(k)}><span className="hub-text"><strong>{h.journal.themes[k].name}</strong></span></button>
            ))}</div>
          ) : (
            <GuidedForm key={theme} fields={h.journal.themes[theme].fields} ui={h.ui} saveLabel={h.ui.save}
              onSave={(answers) => { save({ kind: 'journal', theme, answers }); setTheme(null); }} />
          )}
        </>
      )}

      {tab === 'emotion' && (
        <>
          <p className="mx-text">{h.emotion.intro}</p>
          {!emotion ? (
            <>
              <p className="mx-label">{h.emotion.pick}</p>
              <div className="mx-chips">{Object.keys(h.emotion.emotions).map((k) => (
                <button key={k} className="mx-chip" onClick={() => setEmotion(k)}>{h.emotion.emotions[k].name}</button>
              ))}</div>
            </>
          ) : (
            <>
              <div className="mx-card tinted"><strong>{h.emotion.emotions[emotion].name}</strong><p className="mx-text">{h.emotion.emotions[emotion].intro}</p></div>
              <GuidedForm key={emotion} fields={h.emotion.fields} ui={h.ui} saveLabel={h.ui.save}
                onSave={(answers) => { save({ kind: 'emotion', emotion, answers }); setEmotion(null); }} />
            </>
          )}
        </>
      )}

      {tab === 'needs' && (
        <div className="mx-card">
          <p className="mx-text">{h.needs.intro}</p>
          <label className="mx-field" style={{ marginTop: 12 }}>
            <span className="mx-label">{h.needs.obs.label}<span className="mx-hint">{h.needs.obs.hint}</span></span>
            <textarea className="mx-textarea" value={obs} onChange={(e) => setObs(e.target.value)} />
          </label>
          <p className="mx-label" style={{ marginTop: 12 }}>{h.needs.feel.label}<span className="mx-hint">{h.needs.feel.hint}</span></p>
          <Chips options={h.needs.feelings} value={feel} onChange={setFeel} />
          <p className="mx-label" style={{ marginTop: 12 }}>{h.needs.need.label}<span className="mx-hint">{h.needs.need.hint}</span></p>
          <Chips options={h.needs.needsList} value={need} onChange={setNeed} />
          <label className="mx-field" style={{ marginTop: 12 }}>
            <span className="mx-label">{h.needs.req.label}<span className="mx-hint">{h.needs.req.hint}</span></span>
            <textarea className="mx-textarea" value={req} onChange={(e) => setReq(e.target.value)} />
          </label>
          <button className="mx-btn full" style={{ marginTop: 12 }} disabled={!obs.trim() || !feel.length || !need.length} onClick={buildSentence}>{h.needs.build}</button>
          {sentence && (
            <div className="mx-card tinted" style={{ marginTop: 12 }}>
              <p className="mx-text"><strong>{sentence}</strong></p>
              <button className="mx-btn warm" onClick={() => { save({ kind: 'needs', sentence }); setObs(''); setFeel([]); setNeed([]); setReq(''); setSentence(''); }}>{h.ui.save}</button>
            </div>
          )}
        </div>
      )}

      {tab === 'values' && (
        <div className="mx-card">
          <p className="mx-text">{h.values.intro}</p>
          <p className="mx-label" style={{ marginTop: 10 }}>{h.values.pickMany}</p>
          <Chips options={h.values.list} value={vals} max={7} onChange={(v) => { setVals(v); setTop(top.filter((x) => v.includes(x))); }} />
          {vals.length >= 7 && <p className="mx-small">{h.values.limit}</p>}
          {vals.length >= 3 && (
            <>
              <p className="mx-label" style={{ marginTop: 14 }}>{h.values.pickTop}</p>
              <div className="mx-chips">
                {vals.map((i) => <button key={i} className="mx-chip" aria-pressed={top.includes(i)} onClick={() => setTop(top.includes(i) ? top.filter((x) => x !== i) : top.length < 3 ? [...top, i] : top)}>{h.values.list[i]}</button>)}
              </div>
            </>
          )}
          {top.length === 3 && top.map((i) => (
            <div key={i} className="mx-card soft" style={{ marginTop: 12 }}>
              <strong>{t('heart.values.reflect', { value: h.values.list[i] })}</strong>
              {h.values.q.map((q, qi) => (
                <label key={q} className="mx-field" style={{ marginTop: 8 }}>
                  <span className="mx-label">{q}</span>
                  <textarea className="mx-textarea" style={{ minHeight: 70 }} value={(valAns[i] || [])[qi] || ''} onChange={(e) => { const arr = [...(valAns[i] || ['', '', ''])]; arr[qi] = e.target.value; setValAns({ ...valAns, [i]: arr }); }} />
                </label>
              ))}
            </div>
          ))}
          {top.length === 3 && (
            <button className="mx-btn warm full" style={{ marginTop: 12 }} onClick={() => { save({ kind: 'values', top: top.map((i) => ({ idx: i, answers: valAns[i] || ['', '', ''] })) }); setVals([]); setTop([]); setValAns({}); }}>{h.ui.save}</button>
          )}
        </div>
      )}

      {tab === 'compassion' && (
        <>
          <p className="mx-text">{h.compassion.intro}</p>
          <GuidedForm fields={h.compassion.fields} ui={h.ui} saveLabel={h.ui.save} onSave={(answers) => save({ kind: 'compassion', answers })} />
        </>
      )}

      {tab === 'letters' && (
        <>
          <p className="mx-text">{h.letters.intro}</p>
          <h2 className="mx-h2">{h.letters.past.name}</h2>
          <GuidedForm fields={h.letters.past.fields} ui={h.ui} saveLabel={h.ui.save} onSave={(answers) => save({ kind: 'letterPast', answers })} />
          <h2 className="mx-h2">{h.letters.future.name}</h2>
          <div className="mx-card">
            <p className="mx-small">{h.letters.future.hint}</p>
            <textarea className="mx-textarea" style={{ minHeight: 180, marginTop: 8 }} value={future} onChange={(e) => setFuture(e.target.value)} placeholder={h.letters.future.placeholder} aria-label={h.letters.future.name} />
            <p className="mx-small">{t('common.onlyOnDevice')}</p>
          </div>
        </>
      )}

      <h2 className="mx-h2">{h.ui.history}</h2>
      {log.items.length === 0 ? <p className="mx-small">{h.ui.noHistory}</p> : (
        <ul className="heart-history">
          {log.items.slice(0, 10).map((e) => {
            const d = describe(e);
            return (
              <li key={e.id} className="mx-card soft">
                <details>
                  <summary><strong>{d.title}</strong> <span className="mx-small">· {new Date(e.at).toLocaleDateString(language, { day: 'numeric', month: 'short' })}</span></summary>
                  {d.pairs.map(([q, a], i) => <p key={i} className="mx-small" style={{ marginTop: 8 }}><em>{q}</em>{a && <><br />{a}</>}</p>)}
                  <button className="mx-link-btn" onClick={() => log.remove(e.id)}>{h.ui.delete}</button>
                </details>
              </li>
            );
          })}
        </ul>
      )}

      <SafetyNote onOpenSupport={openSupport} />
    </ModuleShell>
  );
}
