// src/modules/doombreaker/DoomBreaker.jsx
// "scrolling?" — gentle circuit breaker for social media trance.
// 3 pathways: 1. Sanftes Auftauchen (Physiological sigh & compassion),
//             2. Spiel & Touch (Interactive bubble popping & hand reset),
//             3. Lebendig Spüren (Embodied alive moments, not clinical).

import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, 
  Wind, 
  Sparkles, 
  Smartphone, 
  Flame, 
  RotateCw, 
  Check, 
  Heart, 
  Coffee, 
  Compass, 
  Eye, 
  Zap,
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
    <div className="mx-screen animate-fade-in" style={{ paddingBottom: 40 }}>
      {/* Top Navigation */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <button className="mx-back" onClick={onBack} style={{ cursor: 'pointer' }}>
          <ArrowLeft size={18} aria-hidden="true" /> {t('common.back')}
        </button>
        <span 
          className="mx-badge"
          style={{ background: 'rgba(216, 74, 88, 0.14)', color: '#D84A58', border: '1px solid rgba(216, 74, 88, 0.3)' }}
        >
          {t('doombreaker.kicker')}
        </span>
      </div>

      <header style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Flame size={22} style={{ color: '#D84A58' }} />
          <h1 className="mx-title" style={{ margin: 0, textTransform: 'lowercase' }}>
            {t('doombreaker.title')}
          </h1>
        </div>
        <p className="mx-lead" style={{ marginTop: 6, fontSize: 14.5 }}>
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
          <div className="mx-card soft" style={{ borderLeft: '4px solid #D84A58', padding: '16px' }}>
            <h2 className="mx-h2" style={{ fontSize: 16, margin: '0 0 6px' }}>
              {t('doombreaker.breathe.step1Title')}
            </h2>
            <p className="mx-small" style={{ color: '#E0D8CB', marginBottom: 16 }}>
              {t('doombreaker.breathe.step1Desc')}
            </p>

            {/* Pulsing Breathing Circle */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '14px 0' }}>
              <div 
                style={{
                  width: '130px',
                  height: '130px',
                  borderRadius: '50%',
                  background: breathPhase === 3 
                    ? 'radial-gradient(circle, rgba(125, 163, 190, 0.45) 0%, rgba(28, 20, 28, 0.8) 70%)'
                    : 'radial-gradient(circle, rgba(216, 74, 88, 0.45) 0%, rgba(28, 20, 28, 0.8) 70%)',
                  border: '2px solid rgba(255, 255, 255, 0.25)',
                  boxShadow: '0 0 24px rgba(216, 74, 88, 0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  padding: 12,
                  transition: 'all 1.2s ease',
                  transform: breathPhase === 1 ? 'scale(1.15)' : breathPhase === 2 ? 'scale(1.28)' : breathPhase === 3 ? 'scale(0.92)' : 'scale(1)'
                }}
              >
                <span className="font-serif" style={{ fontSize: 13, color: '#FFF', fontWeight: 600 }}>
                  {!breathActive && (t('common.start') || 'Start')}
                  {breathPhase === 1 && t('doombreaker.breathe.inhale1')}
                  {breathPhase === 2 && t('doombreaker.breathe.inhale2')}
                  {breathPhase === 3 && t('doombreaker.breathe.exhale')}
                </span>
              </div>

              <div style={{ marginTop: 12 }}>
                {!breathActive ? (
                  <button className="mx-btn warm small" onClick={startBreathing}>
                    <Wind size={14} /> {t('doombreaker.breathe.step1Title')}
                  </button>
                ) : (
                  <button className="mx-btn ghost small" onClick={stopBreathing}>
                    {t('common.pause') || 'Pause'}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Step 2: Compassionate Curiosity */}
          <div className="mx-card soft" style={{ padding: '16px' }}>
            <h2 className="mx-h2" style={{ fontSize: 16, margin: '0 0 6px' }}>
              {t('doombreaker.breathe.step2Title')}
            </h2>
            <p className="mx-small" style={{ color: '#D0C8B8', marginBottom: 12 }}>
              {t('doombreaker.breathe.step2Prompt')}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {reasons.map((key) => {
                const isSelected = selectedReason === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => { playSoftTap(); setSelectedReason(key); }}
                    style={{
                      padding: '10px 12px',
                      borderRadius: 10,
                      textAlign: 'left',
                      background: isSelected ? 'rgba(216, 74, 88, 0.2)' : 'rgba(255, 255, 255, 0.03)',
                      border: isSelected ? '1px solid #D84A58' : '1px solid rgba(255, 255, 255, 0.08)',
                      color: isSelected ? '#FFF' : '#E0D8CB',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <strong style={{ fontSize: 13, display: 'block', color: isSelected ? '#FADBD8' : '#FFF' }}>
                      {t(`doombreaker.breathe.reasons.${key}.label`)}
                    </strong>
                    <span style={{ fontSize: 11, color: '#B0A89C', display: 'block', marginTop: 2 }}>
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
                  marginTop: 12,
                  padding: '10px 14px',
                  borderRadius: 10,
                  background: 'rgba(110, 140, 110, 0.15)',
                  border: '1px solid rgba(110, 140, 110, 0.3)',
                  color: '#D4E2D4',
                  fontSize: 12.5,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8
                }}
              >
                <Heart size={16} style={{ color: '#6E8C6E', flexShrink: 0 }} />
                <span>{t('doombreaker.breathe.validation')}</span>
              </div>
            )}
          </div>

          {/* Step 3: 4 Micro-Antidotes */}
          <div className="mx-card soft" style={{ padding: '16px' }}>
            <h2 className="mx-h2" style={{ fontSize: 16, margin: '0 0 10px' }}>
              {t('doombreaker.breathe.step3Title')}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {alternatives.map((alt, idx) => (
                <div 
                  key={idx}
                  style={{
                    padding: '10px 12px',
                    borderRadius: 10,
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid rgba(255, 255, 255, 0.06)'
                  }}
                >
                  <strong style={{ fontSize: 13, color: '#FADBD8', display: 'block' }}>
                    {alt.title}
                  </strong>
                  <p className="mx-small" style={{ margin: '4px 0 0', color: '#D0C8B8', fontSize: 12 }}>
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
          <div className="mx-card soft" style={{ borderLeft: '4px solid #6E8C6E', padding: '16px' }}>
            <h2 className="mx-h2" style={{ fontSize: 16, margin: '0 0 6px' }}>
              {t('doombreaker.play.bubbleTitle')}
            </h2>
            <p className="mx-small" style={{ color: '#D0C8B8', marginBottom: 14 }}>
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
                    padding: '8px 14px',
                    borderRadius: 20,
                    background: b.popped ? 'transparent' : 'rgba(216, 74, 88, 0.22)',
                    border: b.popped ? '1px dashed rgba(255, 255, 255, 0.15)' : '1px solid rgba(216, 74, 88, 0.45)',
                    color: b.popped ? '#7A7268' : '#FFF',
                    cursor: b.popped ? 'default' : 'pointer',
                    fontSize: 12.5,
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
              <p className="animate-fade-in" style={{ textAlign: 'center', color: '#6E8C6E', fontSize: 13, marginTop: 8, fontWeight: 600 }}>
                {t('doombreaker.play.poppedAll')}
              </p>
            )}
          </div>

          {/* 7 Seconds Hand Shake */}
          <div className="mx-card soft" style={{ padding: '16px' }}>
            <h2 className="mx-h2" style={{ fontSize: 16, margin: '0 0 6px' }}>
              {t('doombreaker.play.shakeTitle')}
            </h2>
            <p className="mx-small" style={{ color: '#D0C8B8', marginBottom: 12 }}>
              {t('doombreaker.play.shakeDesc')}
            </p>

            <div style={{ textAlign: 'center', margin: '10px 0' }}>
              {shakeSecondsLeft === null ? (
                <button className="mx-btn warm" onClick={startHandShake}>
                  <Activity size={16} /> {t('doombreaker.play.shakeButton')}
                </button>
              ) : shakeSecondsLeft > 0 ? (
                <div style={{ fontSize: 28, fontWeight: 700, color: '#D84A58', animation: 'pulse 0.5s infinite' }}>
                  {shakeSecondsLeft}s — {t('doombreaker.play.shakeActive')}
                </div>
              ) : (
                <div style={{ color: '#6E8C6E', fontWeight: 600, fontSize: 14 }}>
                  <Check size={18} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 4 }} />
                  {t('doombreaker.play.shakeDone')}
                </div>
              )}
            </div>
          </div>

          {/* Secret Real-World Quest */}
          <div className="mx-card soft" style={{ padding: '16px' }}>
            <h2 className="mx-h2" style={{ fontSize: 16, margin: '0 0 6px' }}>
              {t('doombreaker.play.secretQuestTitle')}
            </h2>
            <p className="mx-small" style={{ color: '#D0C8B8', marginBottom: 10 }}>
              {t('doombreaker.play.secretQuestPrompt')}
            </p>

            <div 
              style={{
                padding: '14px',
                borderRadius: 12,
                background: 'rgba(155, 89, 182, 0.1)',
                border: '1px solid rgba(155, 89, 182, 0.3)',
                fontSize: 14,
                color: '#FFF',
                fontStyle: 'italic',
                margin: '8px 0 12px'
              }}
            >
              “{quests[questIndex] || quests[0]}”
            </div>

            <button className="mx-btn ghost small" onClick={handleNextQuest}>
              <RotateCw size={14} /> {t('doombreaker.play.questNext')}
            </button>
          </div>
        </div>
      )}

      {/* PATHWAY 3: LEBENDIG SPÜREN (Embodied sensory presence) */}
      {activeTab === 'alive' && (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div className="mx-card soft" style={{ borderLeft: '4px solid #9B59B6', padding: '16px' }}>
            <h2 className="mx-h2" style={{ fontSize: 16, margin: '0 0 4px' }}>
              {t('doombreaker.alive.title')}
            </h2>
            <p className="mx-small" style={{ color: '#D0C8B8', marginBottom: 16 }}>
              {t('doombreaker.alive.subtitle')}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {alivePrompts.map((p, idx) => (
                <div 
                  key={idx}
                  style={{
                    padding: '12px 14px',
                    borderRadius: 12,
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.07)'
                  }}
                >
                  <strong style={{ fontSize: 13.5, color: '#FADBD8', display: 'block', marginBottom: 4 }}>
                    {p.title}
                  </strong>
                  <p className="mx-small" style={{ margin: 0, color: '#E0D8CB', fontSize: 12.5, lineHeight: 1.5 }}>
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
