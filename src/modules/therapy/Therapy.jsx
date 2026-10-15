import React, { useState } from 'react';
import { ModuleShell, SafetyNote } from '../../components/ModuleShell';
import { useLanguage } from '../../context/LanguageContext';
import { useLog } from '../../utils/storage';
import { KEYS } from '../../utils/keys';
import { playSoftChime, playSoftTap } from '../../utils/audio';
import { Brain, ShieldAlert, Sparkles, HeartHandshake, Eye, ArrowRight } from 'lucide-react';
import './therapy.css';

const TABS = ['cbt', 'act', 'schema', 'ifs'];

export default function Therapy({ onBack, soundEnabled, openSupport }) {
  const { currentStrings, language, t } = useLanguage();
  const th = currentStrings.therapy;
  const log = useLog(KEYS.therapy);

  const [activeTab, setActiveTab] = useState('cbt');
  const [savedMsg, setSavedMsg] = useState(false);

  // CBT State
  const [cbtThought, setCbtThought] = useState('');
  const [cbtEvidenceFor, setCbtEvidenceFor] = useState('');
  const [cbtEvidenceAgainst, setCbtEvidenceAgainst] = useState('');
  const [cbtReframe, setCbtReframe] = useState('');

  // ACT State
  const [actThought, setActThought] = useState('');
  const [actValueStep, setActValueStep] = useState('');

  // Schema Therapy State
  const [schemaMode, setSchemaMode] = useState('vulnerableChild');
  const [schemaDialogue, setSchemaDialogue] = useState('');

  // IFS State
  const [ifsPartName, setIfsPartName] = useState('');
  const [ifsPartBody, setIfsPartBody] = useState('');
  const [ifsPartFears, setIfsPartFears] = useState('');
  const [ifsPartAppreciation, setIfsPartAppreciation] = useState('');

  const triggerSaved = () => {
    if (soundEnabled) playSoftChime();
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 2500);
  };

  const saveCbt = () => {
    if (!cbtThought.trim()) return;
    log.add({
      type: 'cbt',
      thought: cbtThought.trim(),
      evidenceFor: cbtEvidenceFor.trim(),
      evidenceAgainst: cbtEvidenceAgainst.trim(),
      reframe: cbtReframe.trim()
    });
    setCbtThought('');
    setCbtEvidenceFor('');
    setCbtEvidenceAgainst('');
    setCbtReframe('');
    triggerSaved();
  };

  const saveAct = () => {
    if (!actThought.trim()) return;
    log.add({
      type: 'act',
      thought: actThought.trim(),
      valueStep: actValueStep.trim()
    });
    setActThought('');
    setActValueStep('');
    triggerSaved();
  };

  const saveSchema = () => {
    if (!schemaDialogue.trim()) return;
    log.add({
      type: 'schema',
      mode: schemaMode,
      dialogue: schemaDialogue.trim()
    });
    setSchemaDialogue('');
    triggerSaved();
  };

  const saveIfs = () => {
    if (!ifsPartName.trim()) return;
    log.add({
      type: 'ifs',
      partName: ifsPartName.trim(),
      partBody: ifsPartBody.trim(),
      fears: ifsPartFears.trim(),
      appreciation: ifsPartAppreciation.trim()
    });
    setIfsPartName('');
    setIfsPartBody('');
    setIfsPartFears('');
    setIfsPartAppreciation('');
    triggerSaved();
  };

  return (
    <ModuleShell
      kicker={th.kicker}
      title={th.title}
      lead={th.lead}
      onBack={onBack}
      note={
        <div className="therapy-disclaimer-banner">
          <div className="disclaimer-header">
            <ShieldAlert size={18} color="#8E3B46" aria-hidden="true" />
            <strong>{th.disclaimerBox.title}</strong>
          </div>
          <p className="mx-small" style={{ margin: '4px 0 8px' }}>
            {th.disclaimerBox.text}
          </p>
          <button className="mx-link-btn" onClick={openSupport}>
            {th.disclaimerBox.supportCta}
          </button>
        </div>
      }
    >
      {/* Subtab selection */}
      <div className="mx-chips" role="tablist" aria-label={th.title}>
        {TABS.map((k) => (
          <button
            key={k}
            role="tab"
            aria-selected={activeTab === k}
            className="mx-chip"
            aria-pressed={activeTab === k}
            onClick={() => {
              playSoftTap();
              setActiveTab(k);
            }}
          >
            {th.tabs[k]}
          </button>
        ))}
      </div>

      {savedMsg && <p className="mx-toast" role="status">{t('common.saved')}</p>}

      {/* 1. CBT Tab */}
      {activeTab === 'cbt' && (
        <div className="mx-card animate-fade-in">
          <h2 className="mx-h2" style={{ marginTop: 0 }}>{th.cbt.title}</h2>
          <p className="mx-small">{th.cbt.intro}</p>

          <div className="cbt-distortions-box">
            <span className="distortions-label">{th.cbt.distortionsTitle}</span>
            <div className="distortions-grid">
              {th.cbt.distortions.map((d) => (
                <div key={d.name} className="distortion-pill">
                  <strong>{d.name}</strong>
                  <span>{d.desc}</span>
                </div>
              ))}
            </div>
          </div>

          <label className="mx-field" style={{ marginTop: 14 }}>
            <span className="mx-label">{th.cbt.step1Label}</span>
            <textarea
              className="mx-textarea"
              style={{ minHeight: 70 }}
              value={cbtThought}
              placeholder={th.cbt.step1Placeholder}
              onChange={(e) => setCbtThought(e.target.value)}
            />
          </label>

          <label className="mx-field" style={{ marginTop: 12 }}>
            <span className="mx-label">{th.cbt.step2Label}</span>
            <textarea
              className="mx-textarea"
              style={{ minHeight: 70 }}
              value={cbtEvidenceFor}
              placeholder={th.cbt.step2Placeholder}
              onChange={(e) => setCbtEvidenceFor(e.target.value)}
            />
          </label>

          <label className="mx-field" style={{ marginTop: 12 }}>
            <span className="mx-label">{th.cbt.step3Label}</span>
            <textarea
              className="mx-textarea"
              style={{ minHeight: 70 }}
              value={cbtEvidenceAgainst}
              placeholder={th.cbt.step3Placeholder}
              onChange={(e) => setCbtEvidenceAgainst(e.target.value)}
            />
          </label>

          <label className="mx-field" style={{ marginTop: 12 }}>
            <span className="mx-label">{th.cbt.step4Label}</span>
            <textarea
              className="mx-textarea"
              style={{ minHeight: 80 }}
              value={cbtReframe}
              placeholder={th.cbt.step4Placeholder}
              onChange={(e) => setCbtReframe(e.target.value)}
            />
          </label>

          <button
            className="mx-btn warm full"
            style={{ marginTop: 14 }}
            disabled={!cbtThought.trim()}
            onClick={saveCbt}
          >
            {th.cbt.saveBtn}
          </button>
        </div>
      )}

      {/* 2. ACT Tab */}
      {activeTab === 'act' && (
        <div className="mx-card animate-fade-in">
          <h2 className="mx-h2" style={{ marginTop: 0 }}>{th.act.title}</h2>
          <p className="mx-small">{th.act.intro}</p>

          <label className="mx-field" style={{ marginTop: 12 }}>
            <span className="mx-label">{th.act.stickyThoughtLabel}</span>
            <input
              className="mx-input"
              value={actThought}
              placeholder={th.act.stickyPlaceholder}
              onChange={(e) => setActThought(e.target.value)}
            />
          </label>

          {actThought.trim() && (
            <div className="defusion-steps-card">
              <span className="defusion-kicker">{th.act.defusionExerciseTitle}</span>
              
              <div className="defusion-item raw">
                <span className="defusion-tag">{th.act.stepA}</span>
                <p>"{actThought}"</p>
              </div>

              <div className="defusion-item notice">
                <span className="defusion-tag">{th.act.stepB}</span>
                <p>{th.act.stepBTemplate.replace('{thought}', actThought)}</p>
              </div>

              <div className="defusion-item context">
                <span className="defusion-tag">{th.act.stepC}</span>
                <p>{th.act.stepCTemplate.replace('{thought}', actThought)}</p>
              </div>
            </div>
          )}

          <div className="willingness-box" style={{ marginTop: 14 }}>
            <span className="mx-label">{th.act.willingnessTitle}</span>
            <p className="mx-small">{th.act.willingnessQ}</p>
            <input
              className="mx-input"
              style={{ marginTop: 8 }}
              value={actValueStep}
              placeholder={th.act.valueStepPlaceholder}
              onChange={(e) => setActValueStep(e.target.value)}
            />
          </div>

          <button
            className="mx-btn warm full"
            style={{ marginTop: 14 }}
            disabled={!actThought.trim()}
            onClick={saveAct}
          >
            {th.act.saveBtn}
          </button>
        </div>
      )}

      {/* 3. Schema Therapy Tab */}
      {activeTab === 'schema' && (
        <div className="mx-card animate-fade-in">
          <h2 className="mx-h2" style={{ marginTop: 0 }}>{th.schema.title}</h2>
          <p className="mx-small">{th.schema.intro}</p>

          <span className="mx-label" style={{ marginTop: 12 }}>
            {th.schema.selectModeLabel}
          </span>
          <div className="schema-modes-selector">
            {Object.keys(th.schema.modes).map((key) => {
              const m = th.schema.modes[key];
              const isSelected = schemaMode === key;
              return (
                <button
                  key={key}
                  type="button"
                  className={`schema-mode-card ${isSelected ? 'active' : ''}`}
                  onClick={() => {
                    playSoftTap();
                    setSchemaMode(key);
                  }}
                >
                  <span className="mode-emoji">{m.emoji}</span>
                  <div className="mode-info">
                    <strong>{m.name}</strong>
                    <span className="mode-desc">{m.desc}</span>
                    <span className="mode-needs">{m.needs}</span>
                  </div>
                </button>
              );
            })}
          </div>

          <label className="mx-field" style={{ marginTop: 14 }}>
            <span className="mx-label">{th.schema.dialoguePrompt}</span>
            <textarea
              className="mx-textarea"
              style={{ minHeight: 90 }}
              value={schemaDialogue}
              placeholder={th.schema.dialoguePlaceholder}
              onChange={(e) => setSchemaDialogue(e.target.value)}
            />
          </label>

          <button
            className="mx-btn warm full"
            style={{ marginTop: 14 }}
            disabled={!schemaDialogue.trim()}
            onClick={saveSchema}
          >
            {th.schema.saveBtn}
          </button>
        </div>
      )}

      {/* 4. IFS Tab */}
      {activeTab === 'ifs' && (
        <div className="mx-card animate-fade-in">
          <h2 className="mx-h2" style={{ marginTop: 0 }}>{th.ifs.title}</h2>
          <p className="mx-small">{th.ifs.intro}</p>

          <div className="ifs-step-block">
            <strong>{th.ifs.step1}</strong>
            <p className="mx-small">{th.ifs.step1Help}</p>
            <input
              className="mx-input"
              style={{ marginTop: 6 }}
              value={ifsPartName}
              placeholder={th.ifs.partNamePlaceholder}
              onChange={(e) => setIfsPartName(e.target.value)}
            />
            <input
              className="mx-input"
              style={{ marginTop: 6 }}
              value={ifsPartBody}
              placeholder={th.ifs.partBodyPlaceholder}
              onChange={(e) => setIfsPartBody(e.target.value)}
            />
          </div>

          <div className="ifs-step-block" style={{ marginTop: 12 }}>
            <strong>{th.ifs.step2}</strong>
            <p className="mx-small">{th.ifs.step2Help}</p>
            <textarea
              className="mx-textarea"
              style={{ minHeight: 70, marginTop: 6 }}
              value={ifsPartFears}
              placeholder={th.ifs.partFearsPlaceholder}
              onChange={(e) => setIfsPartFears(e.target.value)}
            />
          </div>

          <div className="ifs-step-block" style={{ marginTop: 12 }}>
            <strong>{th.ifs.step3}</strong>
            <p className="mx-small">{th.ifs.step3Help}</p>
            <textarea
              className="mx-textarea"
              style={{ minHeight: 70, marginTop: 6 }}
              value={ifsPartAppreciation}
              placeholder={th.ifs.partAppreciationPlaceholder}
              onChange={(e) => setIfsPartAppreciation(e.target.value)}
            />
          </div>

          <button
            className="mx-btn warm full"
            style={{ marginTop: 14 }}
            disabled={!ifsPartName.trim()}
            onClick={saveIfs}
          >
            {th.ifs.saveBtn}
          </button>
        </div>
      )}

      {/* History */}
      <h2 className="mx-h2">{th.history.title}</h2>
      {log.items.length === 0 ? (
        <p className="mx-small">{th.history.empty}</p>
      ) : (
        <ul className="therapy-history-list">
          {log.items.slice(0, 10).map((item) => (
            <li key={item.id} className="mx-card soft">
              <div className="mx-row" style={{ justifyContent: 'space-between' }}>
                <span className="type-badge">
                  {item.type.toUpperCase()}
                </span>
                <span className="mx-small">
                  {new Date(item.at).toLocaleDateString(language, { day: 'numeric', month: 'short' })}
                </span>
              </div>

              {item.type === 'cbt' && (
                <div style={{ marginTop: 6 }}>
                  <p className="mx-small"><strong>Gedanke:</strong> "{item.thought}"</p>
                  {item.reframe && <p className="mx-small"><strong>Perspektive:</strong> {item.reframe}</p>}
                </div>
              )}

              {item.type === 'act' && (
                <div style={{ marginTop: 6 }}>
                  <p className="mx-small"><strong>Gedanke:</strong> "{item.thought}"</p>
                  {item.valueStep && <p className="mx-small"><strong>Werte-Schritt:</strong> {item.valueStep}</p>}
                </div>
              )}

              {item.type === 'schema' && (
                <div style={{ marginTop: 6 }}>
                  <p className="mx-small"><strong>Modus:</strong> {th.schema.modes[item.mode]?.name || item.mode}</p>
                  <p className="mx-small">"{item.dialogue}"</p>
                </div>
              )}

              {item.type === 'ifs' && (
                <div style={{ marginTop: 6 }}>
                  <p className="mx-small"><strong>Teil:</strong> {item.partName} {item.partBody ? `(${item.partBody})` : ''}</p>
                  {item.appreciation && <p className="mx-small">"{item.appreciation}"</p>}
                </div>
              )}

              <button className="mx-link-btn" onClick={() => log.remove(item.id)}>
                {th.history.delete}
              </button>
            </li>
          ))}
        </ul>
      )}

      <SafetyNote onOpenSupport={openSupport} long={true} />
    </ModuleShell>
  );
}
