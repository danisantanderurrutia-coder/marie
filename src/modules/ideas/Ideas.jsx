import React, { useEffect, useMemo, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import { ModuleShell } from '../../components/ModuleShell';
import { useLanguage } from '../../context/LanguageContext';
import { useLog } from '../../utils/storage';
import { KEYS } from '../../utils/keys';
import { playSoftChime, playSoftTap } from '../../utils/audio';
import './ideas.css';

const TYPES = ['draw', 'write', 'collage', 'music', 'other'];
const STAGES = ['seed', 'moving', 'celebrated', 'resting'];
const pick = (arr, avoid) => {
  if (arr.length < 2) return 0;
  let i = Math.floor(Math.random() * arr.length);
  if (i === avoid) i = (i + 1) % arr.length;
  return i;
};

function StepTimer({ minutes, labels }) {
  const [left, setLeft] = useState(null);
  const ref = useRef(null);
  useEffect(() => () => clearInterval(ref.current), []);
  const start = () => {
    setLeft(minutes * 60);
    clearInterval(ref.current);
    ref.current = setInterval(() => setLeft((s) => { if (s <= 1) { clearInterval(ref.current); return 0; } return s - 1; }), 1000);
  };
  const stop = () => { clearInterval(ref.current); setLeft(null); };
  const fmt = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
  return (
    <div className="mx-row">
      {left === null || left === 0 ? (
        <button className="mx-btn ghost" onClick={start}>{labels.start.replace('{min}', minutes)}</button>
      ) : (
        <button className="mx-btn ghost" onClick={stop}>{labels.stop} · {fmt(left)}</button>
      )}
      {left === 0 && <span className="mx-toast" role="status">{labels.end}</span>}
    </div>
  );
}

export default function Ideas({ onBack, soundEnabled }) {
  const { t, currentStrings, language } = useLanguage();
  const d = currentStrings.ideas;
  const log = useLog(KEYS.ideas);

  const [text, setText] = useState('');
  const [type, setType] = useState('other');
  const [stage, setStage] = useState('seed');
  const [openId, setOpenId] = useState(null);
  const [custom, setCustom] = useState('');
  const [customMin, setCustomMin] = useState(5);
  const [cheer, setCheer] = useState('');
  const [chType, setChType] = useState('draw');
  const [chIdx, setChIdx] = useState(() => Math.floor(Math.random() * 5));

  const byStage = useMemo(() => STAGES.reduce((a, s) => ({ ...a, [s]: log.items.filter((i) => i.stage === s) }), {}), [log.items]);

  const weekAgo = Date.now() - 7 * 86400000;
  const stepsThisWeek = log.items.reduce((n, i) => n + (i.steps || []).filter((s) => s.done && new Date(s.doneAt).getTime() > weekAgo).length, 0);

  const celebrate = (big = false) => {
    setCheer(d.celebrate[Math.floor(Math.random() * d.celebrate.length)]);
    if (soundEnabled) playSoftChime();
    confetti({ particleCount: big ? 70 : 24, spread: big ? 80 : 50, origin: { y: 0.75 }, disableForReducedMotion: true });
  };

  const addIdea = (e, preset) => {
    e?.preventDefault();
    const title = (preset ?? text).trim();
    if (!title) return;
    log.add({ title, type, stage: 'seed', steps: [] });
    setText('');
    setStage('seed');
    playSoftTap();
  };

  const addStep = (idea, stepText, min) => {
    if (!stepText.trim()) return;
    const step = { id: `${Date.now()}`, text: stepText.trim(), min, done: false };
    log.update(idea.id, { steps: [...(idea.steps || []), step] });
    setCustom('');
  };

  const toggleStep = (idea, step) => {
    const done = !step.done;
    const steps = idea.steps.map((s) => (s.id === step.id ? { ...s, done, doneAt: done ? new Date().toISOString() : undefined } : s));
    log.update(idea.id, { steps, stage: done && idea.stage === 'seed' ? 'moving' : idea.stage });
    if (done) celebrate(false);
  };

  const move = (idea, to) => {
    log.update(idea.id, { stage: to });
    if (to === 'celebrated') celebrate(true);
    setOpenId(null);
  };

  const challengeList = d.challenge.list[chType];

  return (
    <ModuleShell kicker={d.kicker} title={d.title} lead={d.lead} onBack={onBack}>
      <form className="mx-card" onSubmit={addIdea}>
        <label className="mx-field">
          <span className="mx-label">{d.capture.label}</span>
          <input className="mx-input" value={text} onChange={(e) => setText(e.target.value)} placeholder={d.capture.placeholder} />
        </label>
        <p className="mx-label" style={{ marginTop: 10 }}>{d.capture.typeLabel}</p>
        <div className="mx-chips">
          {TYPES.map((tp) => <button type="button" key={tp} className="mx-chip" aria-pressed={type === tp} onClick={() => setType(tp)}>{d.types[tp]}</button>)}
        </div>
        <button type="submit" className="mx-btn warm full" style={{ marginTop: 12 }} disabled={!text.trim()}>{d.capture.add}</button>
      </form>

      {cheer && <p className="ideas-cheer" role="status">{cheer}</p>}

      <div className="mx-card soft">
        <strong>{d.wins.title}</strong>
        {stepsThisWeek || byStage.celebrated.length ? (
          <p className="mx-text">{t('ideas.wins.steps', { n: stepsThisWeek })} · {t('ideas.wins.celebrated', { n: byStage.celebrated.length })}</p>
        ) : <p className="mx-small">{d.wins.none}</p>}
        <p className="mx-small">{d.wins.note}</p>
      </div>

      <div className="mx-chips" role="tablist" aria-label={d.title}>
        {STAGES.map((s) => (
          <button key={s} role="tab" aria-selected={stage === s} className="mx-chip" aria-pressed={stage === s} onClick={() => { setStage(s); setOpenId(null); }}>
            {d.stages[s]} ({byStage[s].length})
          </button>
        ))}
      </div>
      <p className="mx-small">{d.stageHint[stage]}</p>

      {byStage[stage].length === 0 && <p className="mx-text ideas-empty">{d.empty[stage]}</p>}

      <ul className="ideas-list">
        {byStage[stage].map((idea) => {
          const isOpen = openId === idea.id;
          const doneCount = (idea.steps || []).filter((s) => s.done).length;
          const openStep = (idea.steps || []).find((s) => !s.done);
          return (
            <li key={idea.id} className="mx-card">
              <div className="mx-row" style={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <strong>{idea.title}</strong>
                  <div className="mx-small">{d.types[idea.type]} · {new Date(idea.at).toLocaleDateString(language, { day: 'numeric', month: 'short' })}{doneCount ? ` · ✓ ${doneCount}` : ''}</div>
                </div>
                <button className="mx-btn ghost" aria-expanded={isOpen} onClick={() => setOpenId(isOpen ? null : idea.id)}>{isOpen ? d.actions.close : d.actions.open}</button>
              </div>

              {isOpen && (
                <div className="ideas-detail">
                  <h3 className="mx-h2" style={{ fontSize: 18 }}>{d.steps.title}</h3>
                  {(idea.steps || []).length === 0 && <p className="mx-small">{d.steps.none}</p>}
                  <ul className="ideas-steps">
                    {(idea.steps || []).map((s) => (
                      <li key={s.id}>
                        <button className={`ideas-check ${s.done ? 'done' : ''}`} aria-pressed={s.done} onClick={() => toggleStep(idea, s)} aria-label={`${s.done ? d.steps.undo : d.steps.done}: ${s.text}`}>{s.done ? '✓' : ''}</button>
                        <span className={s.done ? 'ideas-done-text' : ''}>{s.text} <span className="mx-small">({s.min} {t('common.minutes')})</span></span>
                      </li>
                    ))}
                  </ul>
                  {openStep && <StepTimer minutes={openStep.min} labels={{ start: d.steps.timerStart, stop: d.steps.timerStop, end: d.steps.timerEnd }} />}

                  <p className="mx-label" style={{ marginTop: 12 }}>{d.steps.pick}</p>
                  <div className="mx-chips">
                    {d.steps.suggestions[idea.type].map((s) => (
                      <button key={s.text} className="mx-chip ideas-suggestion" onClick={() => addStep(idea, s.text, s.min)}>+ {s.text} ({s.min})</button>
                    ))}
                  </div>
                  <div className="mx-row" style={{ marginTop: 10 }}>
                    <input className="mx-input" style={{ flex: 1, minWidth: 160 }} value={custom} onChange={(e) => setCustom(e.target.value)} placeholder={d.steps.customPlaceholder} aria-label={d.steps.custom} />
                    <select className="mx-input" style={{ width: 'auto' }} value={customMin} onChange={(e) => setCustomMin(Number(e.target.value))} aria-label={d.steps.minutesLabel}>
                      {[5, 10].map((m) => <option key={m} value={m}>{m} {t('common.minutes')}</option>)}
                    </select>
                    <button className="mx-btn ghost" onClick={() => addStep(idea, custom, customMin)} disabled={!custom.trim()}>{d.steps.add}</button>
                  </div>

                  <div className="mx-row" style={{ marginTop: 14 }}>
                    {idea.stage !== 'celebrated' && <button className="mx-btn warm" onClick={() => move(idea, 'celebrated')}>{d.actions.celebrate}</button>}
                    {idea.stage !== 'resting' && idea.stage !== 'celebrated' && <button className="mx-btn ghost" onClick={() => move(idea, 'resting')}>{d.actions.rest}</button>}
                    {(idea.stage === 'resting' || idea.stage === 'celebrated') && <button className="mx-btn ghost" onClick={() => move(idea, doneCount ? 'moving' : 'seed')}>{d.actions.wake}</button>}
                    <button className="mx-link-btn" onClick={() => log.remove(idea.id)}>{d.actions.delete}</button>
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </ul>

      <div className="mx-card tinted">
        <h2 className="mx-h2" style={{ marginTop: 0 }}>{d.challenge.title}</h2>
        <p className="mx-small">{d.challenge.lead}</p>
        <div className="mx-chips" style={{ margin: '10px 0' }}>
          {['draw', 'write', 'collage', 'music'].map((tp) => <button key={tp} className="mx-chip" aria-pressed={chType === tp} onClick={() => { setChType(tp); setChIdx(pick(d.challenge.list[tp], -1)); }}>{d.types[tp]}</button>)}
        </div>
        <p className="mx-text" aria-live="polite"><strong>{challengeList[chIdx % challengeList.length]}</strong></p>
        <div className="mx-row" style={{ marginTop: 10 }}>
          <button className="mx-btn ghost" onClick={() => setChIdx(pick(challengeList, chIdx))}>{d.challenge.another}</button>
          <button className="mx-btn ghost" onClick={() => { log.add({ title: challengeList[chIdx % challengeList.length], type: chType, stage: 'seed', steps: [] }); setStage('seed'); }}>{d.challenge.toIdea}</button>
        </div>
      </div>
    </ModuleShell>
  );
}
