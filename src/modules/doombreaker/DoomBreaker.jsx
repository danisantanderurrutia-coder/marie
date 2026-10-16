// src/modules/doombreaker/DoomBreaker.jsx
// "Scrolling?" — gentle circuit breaker for social media trance.
// High-contrast, rich warm editorial palette for flawless legibility.

import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Wind, 
  Sparkles, 
  Flame, 
  RotateCw, 
  Check, 
  Heart, 
  Activity
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { playSoftTap, playSoftChime } from '../../utils/audio';

export default function DoomBreaker({ onBack, soundEnabled }) {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('breathe'); // 'breathe' | 'play' | 'alive'

  // Breath state for Phase 1
  const [breathPhase, setBreathPhase] = useState(0); // 0: ready, 1: inhale1, 2: inhale2, 3: exhale
  const [breathActive, setBreathActive] = useState(false);

  // Selected reason in Phase 1 Step 2
  const [selectedReason, setSelectedReason] = useState(null);

  // Bubbles state for Phase 2
  const [bubbles, setBubbles] = useState(() => {
    const list = t('doombreaker.play.bubbles') || ['FOMO', 'Vergleich', 'Noise', 'Endlos-Feed', 'Druck', 'Autopilot', 'Reizüberflutung'];
    return list.map((word, i) => ({ id: i, word, popped: false }));
  });

  // Shake timer state for Phase 2
  const [shakeSecondsLeft, setShakeSecondsLeft] = useState(null);

  // Quest index for Phase 2
  const quests = t('doombreaker.play.quests') || [];
  const [questIndex, setQuestIndex] = useState(0);

  // Celebration state
  const [toastMessage, setToastMessage] = useState('');

  // Physiological sigh rhythm loop
  useEffect(() => {
    let timer;
    if (breathActive) {
      if (breathPhase === 1) {
        timer = setTimeout(() => setBreathPhase(2), 2200); // short top-off inhale
      } else if (breathPhase === 2) {
        timer = setTimeout(() => setBreathPhase(3), 1400); // long exhale
      } else if (breathPhase === 3) {
        timer = setTimeout(() => setBreathPhase(1), 5000); // back to inhale
      }
    }
    return () => clearTimeout(timer);
  }, [breathActive, breathPhase]);

  // Shake countdown timer
  useEffect(() => {
    let timer;
    if (shakeSecondsLeft !== null && shakeSecondsLeft > 0) {
      timer = setTimeout(() => {
        setShakeSecondsLeft(s => s - 1);
      }, 1000);
    } else if (shakeSecondsLeft === 0) {
      if (soundEnabled) playSoftChime();
    }
    return () => clearTimeout(timer);
  }, [shakeSecondsLeft, soundEnabled]);

  const startBreathing = () => {
    if (soundEnabled) playSoftTap();
    setBreathActive(true);
    setBreathPhase(1);
  };

  const stopBreathing = () => {
    setBreathActive(false);
    setBreathPhase(0);
  };

  const handlePopBubble = (id) => {
    if (soundEnabled) playSoftTap();
    setBubbles(prev => prev.map(b => b.id === id ? { ...b, popped: true } : b));
  };

  const startHandShake = () => {
    if (soundEnabled) playSoftTap();
    setShakeSecondsLeft(7);
  };

  const handleNextQuest = () => {
    if (soundEnabled) playSoftTap();
    setQuestIndex((prev) => (prev + 1) % quests.length);
  };

  const handleCelebration = () => {
    if (soundEnabled) playSoftChime();
    try {
      const count = parseInt(localStorage.getItem('marie_doombreaker_count') || '0', 10) + 1;
      localStorage.setItem('marie_doombreaker_count', count.toString());
    } catch (e) {}

    setToastMessage(t('doombreaker.recoveredToast'));
    setTimeout(() => {
      setToastMessage('');
      if (onBack) onBack();
    }, 2400);
  };

  const reasons = ['tired', 'dopamine', 'escape', 'lonely'];
  const alternatives = t('doombreaker.breathe.alternatives') || [];
  const alivePrompts = t('doombreaker.alive.prompts') || [];

  return (
    <div className="mx-screen animate-fade-in" style={{ paddingBottom: 40, color: '#241B19' }}>
      {/* Top Navigation */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
        <button className="mx-back" onClick={onBack} style={{ cursor: 'pointer', color: '#5C4E48' }}>
          <ArrowLeft size={18} aria-hidden="true" /> {t('common.back')}
        </button>
        <span 
          className="mx-badge"
          style={{ 
            background: 'rgba(216, 74, 88, 0.12)', 
            color: '#B82838', 
            border: '1px solid rgba(216, 74, 88, 0.35)',
            fontWeight: 600
          }}
        >
          {t('doombreaker.kicker')}
        </span>
      </div>

      <header style={{ marginBottom: 18 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Flame size={24} style={{ color: '#D84A58' }} />
          <h1 className="mx-title" style={{ margin: 0, color: '#241B19', fontSize: 22 }}>
            {t('doombreaker.title')}
          </h1>
        </div>
        <p className="mx-lead" style={{ marginTop: 6, fontSize: 14.5, color: '#5C4E48', lineHeight: 1.5 }}>
          {t('doombreaker.subtitle')}
        </p>
      </header>

      {/* 3 Pathway Tabs */}
      <div className="mx-segmented" style={{ marginBottom: 20 }}>
        <button
          className={`mx-seg-btn ${activeTab === 'breathe' ? 'active' : ''}`}
          onClick={() => { playSoftTap(); setActiveTab('breathe'); }}
        >
          <span>{t('doombreaker.tabs.breathe')}</span>
        </button>
        <button
          className={`mx-seg-btn ${activeTab === 'play' ? 'active' : ''}`}
          onClick={() => { playSoftTap(); setActiveTab('play'); }}
        >
          <span>{t('doombreaker.tabs.play')}</span>
        </button>
        <button
          className={`mx-seg-btn ${activeTab === 'alive' ? 'active' : ''}`}
          onClick={() => { playSoftTap(); setActiveTab('alive'); }}
        >
          <span>{t('doombreaker.tabs.alive')}</span>
        </button>
      </div>

      {/* PATHWAY 1: SANFTES AUFTAUCHEN (Physiological Sigh & Compassion) */}
      {activeTab === 'breathe' && (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Step 1: Physiological Sigh */}
          <div 
            className="mx-card" 
            style={{ 
              background: '#FFFFFF',
              border: '1px solid rgba(197, 160, 129, 0.25)',
              borderLeft: '4px solid #D84A58', 
              padding: '18px',
              borderRadius: 16,
              boxShadow: '0 4px 14px rgba(44, 30, 25, 0.05)'
            }}
          >
            <h2 className="mx-h2" style={{ fontSize: 16, margin: '0 0 6px', color: '#241B19' }}>
              {t('doombreaker.breathe.step1Title')}
            </h2>
            <p className="mx-small" style={{ color: '#5C4E48', marginBottom: 16, lineHeight: 1.5 }}>
              {t('doombreaker.breathe.step1Desc')}
            </p>

            {/* Pulsing Breathing Circle */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '14px 0' }}>
              <div 
                style={{
                  width: '136px',
                  height: '136px',
                  borderRadius: '50%',
                  background: breathPhase === 3 
                    ? 'radial-gradient(circle, rgba(125, 163, 190, 0.25) 0%, rgba(125, 163, 190, 0.08) 70%)'
                    : 'radial-gradient(circle, rgba(216, 74, 88, 0.25) 0%, rgba(216, 74, 88, 0.08) 70%)',
                  border: `2.5px solid ${breathPhase === 3 ? '#7DA3BE' : '#D84A58'}`,
                  boxShadow: '0 0 24px rgba(216, 74, 88, 0.18)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  padding: 12,
                  transition: 'all 1.2s ease',
                  transform: breathPhase === 1 ? 'scale(1.15)' : breathPhase === 2 ? 'scale(1.26)' : breathPhase === 3 ? 'scale(0.92)' : 'scale(1)'
                }}
              >
                <span className="font-serif" style={{ fontSize: 13.5, color: '#241B19', fontWeight: 650 }}>
                  {!breathActive && (t('common.start') || 'Start')}
                  {breathPhase === 1 && t('doombreaker.breathe.inhale1')}
                  {breathPhase === 2 && t('doombreaker.breathe.inhale2')}
                  {breathPhase === 3 && t('doombreaker.breathe.exhale')}
                </span>
              </div>

              <div style={{ marginTop: 14 }}>
                {!breathActive ? (
                  <button className="mx-btn warm small" onClick={startBreathing}>
                    <Wind size={15} /> {t('doombreaker.breathe.step1Title')}
                  </button>
                ) : (
                  <button className="mx-btn ghost small" onClick={stopBreathing} style={{ color: '#241B19', borderColor: '#C5A081' }}>
                    {t('common.pause') || 'Pause'}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Step 2: Compassionate Curiosity */}
          <div 
            className="mx-card" 
            style={{ 
              background: '#FFFFFF',
              border: '1px solid rgba(197, 160, 129, 0.25)',
              padding: '18px',
              borderRadius: 16,
              boxShadow: '0 4px 14px rgba(44, 30, 25, 0.05)'
            }}
          >
            <h2 className="mx-h2" style={{ fontSize: 16, margin: '0 0 6px', color: '#241B19' }}>
              {t('doombreaker.breathe.step2Title')}
            </h2>
            <p className="mx-small" style={{ color: '#5C4E48', marginBottom: 14, lineHeight: 1.5 }}>
              {t('doombreaker.breathe.step2Prompt')}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {reasons.map((key) => {
                const isSelected = selectedReason === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => { playSoftTap(); setSelectedReason(key); }}
                    style={{
                      padding: '12px 14px',
                      borderRadius: 12,
                      textAlign: 'left',
                      background: isSelected ? 'rgba(216, 74, 88, 0.12)' : '#FAF8F5',
                      border: isSelected ? '1.5px solid #D84A58' : '1px solid rgba(197, 160, 129, 0.28)',
                      color: '#241B19',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <strong style={{ fontSize: 13.5, display: 'block', color: isSelected ? '#B82838' : '#241B19' }}>
                      {t(`doombreaker.breathe.reasons.${key}.label`)}
                    </strong>
                    <span style={{ fontSize: 11.5, color: '#6A5C56', display: 'block', marginTop: 4, lineHeight: 1.35 }}>
                      {t(`doombreaker.breathe.reasons.${key}.desc`)}
                    </span>
                  </button>
                );
              })}
            </div>

            {selectedReason && (
              <div 
                className="animate-fade-in"
                style={{
                  marginTop: 14,
                  padding: '12px 14px',
                  borderRadius: 12,
                  background: 'rgba(110, 140, 110, 0.12)',
                  border: '1.5px solid rgba(110, 140, 110, 0.4)',
                  color: '#244524',
                  fontSize: 13,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  lineHeight: 1.45
                }}
              >
                <Heart size={18} style={{ color: '#4A7C4A', flexShrink: 0 }} />
                <span>{t('doombreaker.breathe.validation')}</span>
              </div>
            )}
          </div>

          {/* Step 3: 4 Micro-Antidotes */}
          <div 
            className="mx-card" 
            style={{ 
              background: '#FFFFFF',
              border: '1px solid rgba(197, 160, 129, 0.25)',
              padding: '18px',
              borderRadius: 16,
              boxShadow: '0 4px 14px rgba(44, 30, 25, 0.05)'
            }}
          >
            <h2 className="mx-h2" style={{ fontSize: 16, margin: '0 0 10px', color: '#241B19' }}>
              {t('doombreaker.breathe.step3Title')}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {alternatives.map((alt, idx) => (
                <div 
                  key={idx}
                  style={{
                    padding: '12px 14px',
                    borderRadius: 12,
                    background: '#FAF8F5',
                    border: '1px solid rgba(197, 160, 129, 0.22)'
                  }}
                >
                  <strong style={{ fontSize: 13.5, color: '#B82838', display: 'block' }}>
                    {alt.title}
                  </strong>
                  <p className="mx-small" style={{ margin: '4px 0 0', color: '#4A3D38', fontSize: 12.5, lineHeight: 1.5 }}>
                    {alt.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* PATHWAY 2: SPIEL & TOUCH (Popping Bubbles & Hand Shake) */}
      {activeTab === 'play' && (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Bubble Popping Game */}
          <div 
            className="mx-card" 
            style={{ 
              background: '#FFFFFF',
              borderLeft: '4px solid #6E8C6E', 
              border: '1px solid rgba(197, 160, 129, 0.25)',
              padding: '18px',
              borderRadius: 16,
              boxShadow: '0 4px 14px rgba(44, 30, 25, 0.05)'
            }}
          >
            <h2 className="mx-h2" style={{ fontSize: 16, margin: '0 0 6px', color: '#241B19' }}>
              {t('doombreaker.play.bubbleTitle')}
            </h2>
            <p className="mx-small" style={{ color: '#5C4E48', marginBottom: 14 }}>
              {t('doombreaker.play.bubblePrompt')}
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', minHeight: 90, padding: '10px 0' }}>
              {bubbles.map((b) => (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => handlePopBubble(b.id)}
                  disabled={b.popped}
                  style={{
                    padding: '9px 15px',
                    borderRadius: 20,
                    background: b.popped ? 'transparent' : 'rgba(216, 74, 88, 0.1)',
                    border: b.popped ? '1px dashed #D0C8C0' : '1.5px solid rgba(216, 74, 88, 0.45)',
                    color: b.popped ? '#A09890' : '#241B19',
                    cursor: b.popped ? 'default' : 'pointer',
                    fontSize: 13,
                    fontWeight: 600,
                    textDecoration: b.popped ? 'line-through' : 'none',
                    transform: b.popped ? 'scale(0.92)' : 'scale(1)',
                    transition: 'all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                  }}
                >
                  {b.popped ? '✨' : b.word}
                </button>
              ))}
            </div>

            {bubbles.every(b => b.popped) && (
              <p className="animate-fade-in" style={{ textAlign: 'center', color: '#2D6A4F', fontSize: 13.5, marginTop: 10, fontWeight: 700 }}>
                {t('doombreaker.play.poppedAll')}
              </p>
            )}
          </div>

          {/* 7 Seconds Hand Shake */}
          <div 
            className="mx-card" 
            style={{ 
              background: '#FFFFFF',
              border: '1px solid rgba(197, 160, 129, 0.25)',
              padding: '18px',
              borderRadius: 16,
              boxShadow: '0 4px 14px rgba(44, 30, 25, 0.05)'
            }}
          >
            <h2 className="mx-h2" style={{ fontSize: 16, margin: '0 0 6px', color: '#241B19' }}>
              {t('doombreaker.play.shakeTitle')}
            </h2>
            <p className="mx-small" style={{ color: '#5C4E48', marginBottom: 14 }}>
              {t('doombreaker.play.shakeDesc')}
            </p>

            <div style={{ textAlign: 'center', margin: '12px 0' }}>
              {shakeSecondsLeft === null ? (
                <button className="mx-btn warm" onClick={startHandShake}>
                  <Activity size={16} /> {t('doombreaker.play.shakeButton')}
                </button>
              ) : shakeSecondsLeft > 0 ? (
                <div style={{ fontSize: 28, fontWeight: 700, color: '#B82838', animation: 'pulse 0.5s infinite' }}>
                  {shakeSecondsLeft}s — {t('doombreaker.play.shakeActive')}
                </div>
              ) : (
                <div style={{ color: '#2D6A4F', fontWeight: 700, fontSize: 14.5 }}>
                  <Check size={18} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 4 }} />
                  {t('doombreaker.play.shakeDone')}
                </div>
              )}
            </div>
          </div>

          {/* Secret Real-World Quest */}
          <div 
            className="mx-card" 
            style={{ 
              background: '#FFFFFF',
              border: '1px solid rgba(197, 160, 129, 0.25)',
              padding: '18px',
              borderRadius: 16,
              boxShadow: '0 4px 14px rgba(44, 30, 25, 0.05)'
            }}
          >
            <h2 className="mx-h2" style={{ fontSize: 16, margin: '0 0 6px', color: '#241B19' }}>
              {t('doombreaker.play.secretQuestTitle')}
            </h2>
            <p className="mx-small" style={{ color: '#5C4E48', marginBottom: 10 }}>
              {t('doombreaker.play.secretQuestPrompt')}
            </p>

            <div 
              style={{
                padding: '14px 16px',
                borderRadius: 12,
                background: 'rgba(155, 89, 182, 0.1)',
                border: '1px solid rgba(155, 89, 182, 0.3)',
                fontSize: 14,
                color: '#341D40',
                fontStyle: 'italic',
                margin: '10px 0 14px',
                lineHeight: 1.5
              }}
            >
              “{quests[questIndex] || quests[0]}”
            </div>

            <button className="mx-btn ghost small" onClick={handleNextQuest} style={{ color: '#241B19', borderColor: '#C5A081' }}>
              <RotateCw size={14} /> {t('doombreaker.play.questNext')}
            </button>
          </div>
        </div>
      )}

      {/* PATHWAY 3: LEBENDIG SPÜREN (Embodied sensory presence) */}
      {activeTab === 'alive' && (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div 
            className="mx-card" 
            style={{ 
              background: '#FFFFFF',
              borderLeft: '4px solid #9B59B6', 
              border: '1px solid rgba(197, 160, 129, 0.25)',
              padding: '18px',
              borderRadius: 16,
              boxShadow: '0 4px 14px rgba(44, 30, 25, 0.05)'
            }}
          >
            <h2 className="mx-h2" style={{ fontSize: 16, margin: '0 0 4px', color: '#241B19' }}>
              {t('doombreaker.alive.title')}
            </h2>
            <p className="mx-small" style={{ color: '#5C4E48', marginBottom: 16 }}>
              {t('doombreaker.alive.subtitle')}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {alivePrompts.map((p, idx) => (
                <div 
                  key={idx}
                  style={{
                    padding: '14px 16px',
                    borderRadius: 12,
                    background: '#FAF8F5',
                    border: '1px solid rgba(155, 89, 182, 0.2)'
                  }}
                >
                  <strong style={{ fontSize: 14, color: '#6A2D8A', display: 'block', marginBottom: 4 }}>
                    {p.title}
                  </strong>
                  <p className="mx-small" style={{ margin: 0, color: '#2C2230', fontSize: 13, lineHeight: 1.55 }}>
                    {p.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Grounding Celebration Button */}
      <div style={{ marginTop: 24, textAlign: 'center' }}>
        <button 
          className="mx-btn warm full"
          style={{ padding: '14px 20px', fontSize: 15, fontWeight: 700 }}
          onClick={handleCelebration}
        >
          <Sparkles size={18} aria-hidden="true" />
          <span>{t('doombreaker.backToLifeBtn')}</span>
        </button>

        {toastMessage && (
          <p className="mx-toast animate-fade-in" role="status" style={{ marginTop: 12 }}>
            {toastMessage}
          </p>
        )}
      </div>
    </div>
  );
}
