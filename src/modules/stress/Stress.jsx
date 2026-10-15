import React, { useMemo, useState } from 'react';
import { ModuleShell, SafetyNote } from '../../components/ModuleShell';
import BreathingCircle from '../../components/BreathingCircle';
import { useLanguage } from '../../context/LanguageContext';
import { useLog } from '../../utils/storage';
import { KEYS } from '../../utils/keys';
import { playSoftChime, playSoftTap } from '../../utils/audio';
import { Wind, Eye, CheckCircle2, ArrowRight, Clock, Activity, Sparkles } from 'lucide-react';
import './stress.css';

export default function Stress({ onBack, soundEnabled, intent, openSupport }) {
  const { currentStrings, language, t } = useLanguage();
  const st = currentStrings.stress;
  const log = useLog(KEYS.stress);

  const [activeTab, setActiveTab] = useState(intent?.sos ? 'sos' : 'log');
  const [sosTool, setSosTool] = useState('breath'); // 'breath' | 'grounding' | 'scan'

  // Log state
  const [situation, setSituation] = useState('');
  const [thought, setThought] = useState('');
  const [selectedEmotions, setSelectedEmotions] = useState([]);
  const [selectedSensations, setSelectedSensations] = useState([]);
  const [altReading, setAltReading] = useState('');
  const [friendAdvice, setFriendAdvice] = useState('');
  const [postponeAction, setPostponeAction] = useState('');
  const [saved, setSaved] = useState(false);

  const toggleArrayItem = (arr, setArr, item) => {
    if (arr.includes(item)) {
      setArr(arr.filter((x) => x !== item));
    } else {
      setArr([...arr, item]);
    }
  };

  const handleSaveLog = () => {
    if (!situation.trim() && !thought.trim()) return;
    const hour = new Date().getHours();
    log.add({
      situation: situation.trim(),
      thought: thought.trim(),
      emotions: selectedEmotions,
      sensations: selectedSensations,
      altReading: altReading.trim(),
      friendAdvice: friendAdvice.trim(),
      postponeAction: postponeAction.trim(),
      hour
    });
    if (soundEnabled) playSoftChime();
    setSaved(true);
    setSituation('');
    setThought('');
    setSelectedEmotions([]);
    setSelectedSensations([]);
    setAltReading('');
    setFriendAdvice('');
    setPostponeAction('');
    setTimeout(() => setSaved(false), 2500);
  };

  // Pattern statistics calculation
  const stats = useMemo(() => {
    const items = log.items;
    if (!items.length) return null;

    const timeBuckets = { morning: 0, afternoon: 0, evening: 0, night: 0 };
    const emotionCounts = {};
    const sensationCounts = {};

    items.forEach((item) => {
      const h = item.hour !== undefined ? item.hour : new Date(item.at).getHours();
      if (h >= 8 && h < 12) timeBuckets.morning++;
      else if (h >= 12 && h < 18) timeBuckets.afternoon++;
      else if (h >= 18 && h < 22) timeBuckets.evening++;
      else timeBuckets.night++;

      (item.emotions || []).forEach((e) => {
        emotionCounts[e] = (emotionCounts[e] || 0) + 1;
      });

      (item.sensations || []).forEach((s) => {
        sensationCounts[s] = (sensationCounts[s] || 0) + 1;
      });
    });

    const topEmotions = Object.entries(emotionCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4);

    const topSensations = Object.entries(sensationCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4);

    return {
      total: items.length,
      timeBuckets,
      topEmotions,
      topSensations
    };
  }, [log.items]);

  return (
    <ModuleShell
      kicker={st.kicker}
      title={st.title}
      lead={st.lead}
      onBack={onBack}
    >
      {/* Tab Selector */}
      <div className="mx-chips" role="tablist" aria-label={st.title}>
        <button
          role="tab"
          aria-selected={activeTab === 'sos'}
          className={`mx-chip ${activeTab === 'sos' ? 'sos-chip-active' : ''}`}
          aria-pressed={activeTab === 'sos'}
          onClick={() => {
            playSoftTap();
            setActiveTab('sos');
          }}
        >
          <Wind size={14} aria-hidden="true" /> {st.tabs.sos}
        </button>

        <button
          role="tab"
          aria-selected={activeTab === 'log'}
          className="mx-chip"
          aria-pressed={activeTab === 'log'}
          onClick={() => {
            playSoftTap();
            setActiveTab('log');
          }}
        >
          {st.tabs.log}
        </button>

        <button
          role="tab"
          aria-selected={activeTab === 'patterns'}
          className="mx-chip"
          aria-pressed={activeTab === 'patterns'}
          onClick={() => {
            playSoftTap();
            setActiveTab('patterns');
          }}
        >
          <Clock size={14} aria-hidden="true" /> {st.tabs.patterns} {stats ? `(${stats.total})` : ''}
        </button>
      </div>

      {saved && <p className="mx-toast" role="status">{st.log.savedToast}</p>}

      {/* 1. SOS TAB */}
      {activeTab === 'sos' && (
        <div className="mx-card tinted animate-fade-in">
          <div className="sos-header">
            <h2 className="mx-h2" style={{ marginTop: 0, color: 'var(--accent-wine)' }}>{st.sos.title}</h2>
            <p className="mx-small">{st.sos.subtitle}</p>
          </div>

          <div className="mx-chips" style={{ margin: '14px 0 10px' }}>
            <button
              className={`mx-chip ${sosTool === 'breath' ? 'active' : ''}`}
              onClick={() => setSosTool('breath')}
            >
              {st.sos.breathTab}
            </button>
            <button
              className={`mx-chip ${sosTool === 'grounding' ? 'active' : ''}`}
              onClick={() => setSosTool('grounding')}
            >
              {st.sos.groundingTab}
            </button>
            <button
              className={`mx-chip ${sosTool === 'scan' ? 'active' : ''}`}
              onClick={() => setSosTool('scan')}
            >
              {st.sos.scanTab}
            </button>
          </div>

          {/* SOS 1: Breathing */}
          {sosTool === 'breath' && (
            <div className="sos-panel animate-fade-in">
              <p className="mx-text">{st.sos.breathIntro}</p>
              <BreathingCircle
                inSec={4}
                outSec={6}
                cycles={4}
                labels={{ in: t('bodymap.breathIn'), out: t('bodymap.breathOut') }}
                startLabel={t('bodymap.breathStart')}
                stopLabel={t('bodymap.breathStop')}
                autoStart={true}
              />
            </div>
          )}

          {/* SOS 2: Grounding 5-4-3-2-1 */}
          {sosTool === 'grounding' && (
            <div className="sos-panel animate-fade-in">
              <p className="mx-text" style={{ marginBottom: 12 }}>{st.sos.groundingIntro}</p>
              <div className="grounding-stack">
                <div className="grounding-step"><span className="g-badge">5</span><span>{st.sos.grounding5}</span></div>
                <div className="grounding-step"><span className="g-badge">4</span><span>{st.sos.grounding4}</span></div>
                <div className="grounding-step"><span className="g-badge">3</span><span>{st.sos.grounding3}</span></div>
                <div className="grounding-step"><span className="g-badge">2</span><span>{st.sos.grounding2}</span></div>
                <div className="grounding-step"><span className="g-badge">1</span><span>{st.sos.grounding1}</span></div>
              </div>
            </div>
          )}

          {/* SOS 3: Physical decompression */}
          {sosTool === 'scan' && (
            <div className="sos-panel animate-fade-in">
              <p className="mx-text" style={{ marginBottom: 12 }}>{st.sos.scanIntro}</p>
              <ul className="scan-list">
                {st.sos.scanPoints.map((pt, i) => (
                  <li key={i} className="scan-item">
                    <CheckCircle2 size={16} color="var(--mx-ok)" aria-hidden="true" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div style={{ marginTop: 18, borderTop: '1px solid var(--border-gold)', paddingTop: 12 }}>
            <button
              className="mx-btn warm full"
              onClick={() => {
                playSoftTap();
                setActiveTab('log');
              }}
            >
              {st.sos.nextToReflect} <ArrowRight size={16} aria-hidden="true" />
            </button>
          </div>
        </div>
      )}

      {/* 2. LOG & REFLECTION TAB */}
      {activeTab === 'log' && (
        <div className="mx-card animate-fade-in">
          <h2 className="mx-h2" style={{ marginTop: 0 }}>{st.log.title}</h2>

          {/* Step 1: Situation */}
          <label className="mx-field" style={{ marginTop: 10 }}>
            <span className="mx-label">{st.log.step1}</span>
            <input
              className="mx-input"
              value={situation}
              placeholder={st.log.step1Placeholder}
              onChange={(e) => setSituation(e.target.value)}
            />
          </label>

          {/* Step 2: Thought */}
          <label className="mx-field" style={{ marginTop: 12 }}>
            <span className="mx-label">{st.log.step2}</span>
            <textarea
              className="mx-textarea"
              style={{ minHeight: 65 }}
              value={thought}
              placeholder={st.log.step2Placeholder}
              onChange={(e) => setThought(e.target.value)}
            />
          </label>

          {/* Step 3: Emotions */}
          <div style={{ marginTop: 12 }}>
            <span className="mx-label">{st.log.step3}</span>
            <div className="mx-chips" style={{ marginTop: 6 }}>
              {st.log.emotions.map((em) => (
                <button
                  key={em}
                  type="button"
                  className="mx-chip"
                  aria-pressed={selectedEmotions.includes(em)}
                  onClick={() => toggleArrayItem(selectedEmotions, setSelectedEmotions, em)}
                >
                  {em}
                </button>
              ))}
            </div>
          </div>

          {/* Step 4: Body Sensations */}
          <div style={{ marginTop: 12 }}>
            <span className="mx-label">{st.log.step4}</span>
            <div className="mx-chips" style={{ marginTop: 6 }}>
              {st.log.sensations.map((se) => (
                <button
                  key={se}
                  type="button"
                  className="mx-chip"
                  aria-pressed={selectedSensations.includes(se)}
                  onClick={() => toggleArrayItem(selectedSensations, setSelectedSensations, se)}
                >
                  {se}
                </button>
              ))}
            </div>
          </div>

          {/* Guided Reflection: Alternative Paths */}
          <div className="alternative-paths-box" style={{ marginTop: 18 }}>
            <span className="alt-title">{st.log.alternativeTitle}</span>

            <label className="mx-field" style={{ marginTop: 10 }}>
              <span className="mx-label">{st.log.alt1}</span>
              <textarea
                className="mx-textarea"
                style={{ minHeight: 65 }}
                value={altReading}
                placeholder={st.log.alt1Placeholder}
                onChange={(e) => setAltReading(e.target.value)}
              />
            </label>

            <label className="mx-field" style={{ marginTop: 10 }}>
              <span className="mx-label">{st.log.alt2}</span>
              <textarea
                className="mx-textarea"
                style={{ minHeight: 65 }}
                value={friendAdvice}
                placeholder={st.log.alt2Placeholder}
                onChange={(e) => setFriendAdvice(e.target.value)}
              />
            </label>

            <label className="mx-field" style={{ marginTop: 10 }}>
              <span className="mx-label">{st.log.alt3}</span>
              <input
                className="mx-input"
                value={postponeAction}
                placeholder={st.log.alt3Placeholder}
                onChange={(e) => setPostponeAction(e.target.value)}
              />
            </label>
          </div>

          <button
            className="mx-btn warm full"
            style={{ marginTop: 16 }}
            disabled={!situation.trim() && !thought.trim()}
            onClick={handleSaveLog}
          >
            {st.log.saveBtn}
          </button>
        </div>
      )}

      {/* 3. PATTERNS TAB */}
      {activeTab === 'patterns' && (
        <div className="mx-card animate-fade-in">
          <h2 className="mx-h2" style={{ marginTop: 0 }}>{st.patterns.title}</h2>
          <p className="mx-small">{st.patterns.subtitle}</p>

          {!stats ? (
            <p className="mx-text" style={{ marginTop: 14 }}>{st.patterns.empty}</p>
          ) : (
            <>
              {/* Recurring hours analysis */}
              <div className="pattern-stat-block" style={{ marginTop: 14 }}>
                <strong>{st.patterns.timePatternTitle}</strong>
                <div className="time-buckets-grid">
                  <div className="time-bucket-card">
                    <span className="tb-count">{stats.timeBuckets.morning}</span>
                    <span className="tb-label">{st.patterns.timeMorning}</span>
                  </div>
                  <div className="time-bucket-card">
                    <span className="tb-count">{stats.timeBuckets.afternoon}</span>
                    <span className="tb-label">{st.patterns.timeAfternoon}</span>
                  </div>
                  <div className="time-bucket-card">
                    <span className="tb-count">{stats.timeBuckets.evening}</span>
                    <span className="tb-label">{st.patterns.timeEvening}</span>
                  </div>
                  <div className="time-bucket-card">
                    <span className="tb-count">{stats.timeBuckets.night}</span>
                    <span className="tb-label">{st.patterns.timeNight}</span>
                  </div>
                </div>
              </div>

              {/* Recurring emotions & sensations */}
              {stats.topEmotions.length > 0 && (
                <div className="pattern-stat-block" style={{ marginTop: 14 }}>
                  <strong>{st.patterns.topEmotionsTitle}</strong>
                  <div className="mx-chips" style={{ marginTop: 6 }}>
                    {stats.topEmotions.map(([em, cnt]) => (
                      <span key={em} className="mx-chip active">
                        {em} ({cnt})
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {stats.topSensations.length > 0 && (
                <div className="pattern-stat-block" style={{ marginTop: 14 }}>
                  <strong>{st.patterns.topSensationsTitle}</strong>
                  <div className="mx-chips" style={{ marginTop: 6 }}>
                    {stats.topSensations.map(([se, cnt]) => (
                      <span key={se} className="mx-chip active" style={{ background: '#7DA3BE', borderColor: '#7DA3BE' }}>
                        {se} ({cnt})
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Recent moments list */}
              <h3 className="mx-h2" style={{ fontSize: 18, marginTop: 20 }}>{st.patterns.recentTitle}</h3>
              <ul className="stress-history-list">
                {log.items.slice(0, 8).map((item) => (
                  <li key={item.id} className="mx-card soft">
                    <div className="mx-row" style={{ justifyContent: 'space-between' }}>
                      <strong>{item.situation || 'Momento de estrés'}</strong>
                      <span className="mx-small">
                        {new Date(item.at).toLocaleDateString(language, { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>

                    {item.thought && <p className="mx-small" style={{ marginTop: 4 }}><strong>Pensamiento:</strong> "{item.thought}"</p>}
                    
                    {item.emotions?.length > 0 && (
                      <p className="mx-small" style={{ color: 'var(--accent-wine)', marginTop: 2 }}>
                        {item.emotions.join(' · ')}
                      </p>
                    )}

                    {item.altReading && (
                      <p className="mx-small" style={{ fontStyle: 'italic', marginTop: 4 }}>
                        ↳ <strong>Alternativa:</strong> {item.altReading}
                      </p>
                    )}

                    <button
                      className="mx-link-btn"
                      onClick={() => log.remove(item.id)}
                    >
                      {st.patterns.delete}
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}

      <SafetyNote onOpenSupport={openSupport} />
    </ModuleShell>
  );
}
