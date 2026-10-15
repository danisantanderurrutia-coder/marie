import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Heart, 
  Droplets, 
  Moon, 
  Activity, 
  Check, 
  Plus, 
  Calendar, 
  Smile, 
  AlertCircle,
  Play,
  Pause,
  RotateCcw,
  Flower2,
  Wind,
  Shield,
  Feather
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { playSoftChime, playSoftTap } from '../utils/audio';

export default function SkinBodyTab({ soundEnabled, openModule }) {
  const { language, currentStrings } = useLanguage();
  const t = currentStrings?.skin || {};
  const tSom = currentStrings?.somatics || {};
  const tSub = tSom.tabs || {
    skin: language === 'de' ? 'Haut & Zyklus' : language === 'en' ? 'Skin & Cycle' : 'Piel & Ciclo',
    ayurveda: language === 'de' ? '🌿 Ayurveda & Vata' : language === 'en' ? '🌿 Ayurveda & Vata' : '🌿 Ayurveda & Vata',
    massage: language === 'de' ? '💆 Massage & Berührung' : language === 'en' ? '💆 Massage & Touch' : '💆 Masajes & Tacto',
    stoic: language === 'de' ? '🏛️ Körperweisheit' : language === 'en' ? '🏛️ Body Wisdom' : '🏛️ Sabiduría del Cuerpo'
  };

  const [activeSubTab, setActiveSubTab] = useState('skin'); // 'skin' | 'ayurveda' | 'massage' | 'stoic'

  // Skin & Cycle state
  const skinStates = t.states || [
    { id: 'calm', label: 'Calmada', emoji: '🌿', desc: 'Sin rojeces notorias, en paz' },
    { id: 'radiant', label: 'Radiante', emoji: '✨', desc: 'Luminosa, hidratada y fresca' },
    { id: 'sensitive', label: 'Sensible', emoji: '🌸', desc: 'Un poco reactiva o tirante' },
    { id: 'breakout', label: 'Brote activo', emoji: '❤️', desc: 'Inflamación o granitos pidiendo mimo' },
    { id: 'healing', label: 'Sanando', emoji: '🌱', desc: 'En proceso de regeneración' }
  ];

  const cyclePhases = t.cyclePhases || [
    { id: 'follicular', label: 'Folicular', sub: 'Piel más fresca y luminosa' },
    { id: 'ovulatory', label: 'Ovulación', sub: 'Pico de energía y brillo' },
    { id: 'luteal', label: 'Fase Lútea', sub: 'Mayor sensibilidad al sebo/poros' },
    { id: 'menstrual', label: 'Menstrual', sub: 'Pide hidratación y calma' }
  ];

  const bodyFeels = t.bodyFeels || [
    { id: 'light', label: 'Ligera & Ágil', emoji: '🕊️' },
    { id: 'strong', label: 'Con Fuerza', emoji: '⚡' },
    { id: 'tender', label: 'Cansada / Mimo', emoji: '🕯️' },
    { id: 'stiff', label: 'Pidiendo estirar', emoji: '🧘‍♀️' }
  ];

  const [skinState, setSkinState] = useState(() => {
    try {
      return localStorage.getItem('marie_skin_state') || 'calm';
    } catch (e) {
      return 'calm';
    }
  });

  const [cyclePhase, setCyclePhase] = useState(() => {
    try {
      return localStorage.getItem('marie_cycle_phase') || 'follicular';
    } catch (e) {
      return 'follicular';
    }
  });

  const [bodyEnergy, setBodyEnergy] = useState('light');
  const [waterCups, setWaterCups] = useState(4);
  const [skinNotes, setSkinNotes] = useState(() => {
    try {
      const saved = localStorage.getItem('marie_skin_log');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });
  const [currentNote, setCurrentNote] = useState('');
  const [savedRecently, setSavedRecently] = useState(false);

  // Massage timer state
  const [selectedProtocolId, setSelectedProtocolId] = useState('shoulders');
  const [timerSeconds, setTimerSeconds] = useState(20 * 60);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [timerCompleted, setTimerCompleted] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isTimerActive && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0 && isTimerActive) {
      setIsTimerActive(false);
      setTimerCompleted(true);
      if (soundEnabled) playSoftChime();
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timerSeconds, soundEnabled]);

  const handleSelectProtocol = (proto) => {
    playSoftTap();
    setSelectedProtocolId(proto.id);
    setTimerSeconds(proto.duration * 60);
    setIsTimerActive(false);
    setTimerCompleted(false);
  };

  const handleToggleTimer = () => {
    playSoftTap();
    setIsTimerActive((prev) => !prev);
    setTimerCompleted(false);
  };

  const handleResetTimer = () => {
    playSoftTap();
    setIsTimerActive(false);
    setTimerCompleted(false);
    const protocols = tSom.massage?.protocols || [];
    const curr = protocols.find((p) => p.id === selectedProtocolId);
    setTimerSeconds((curr?.duration || 20) * 60);
  };

  const formatTimerTime = (totalSec) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSelectSkin = (id) => {
    playSoftTap();
    setSkinState(id);
    try { localStorage.setItem('marie_skin_state', id); } catch (e) {}
  };

  const handleSelectCycle = (id) => {
    playSoftTap();
    setCyclePhase(id);
    try { localStorage.setItem('marie_cycle_phase', id); } catch (e) {}
  };

  const handleSaveSkinLog = () => {
    if (soundEnabled) playSoftChime();
    const currentStateObj = skinStates.find((s) => s.id === skinState);
    const currentFeelObj = bodyFeels.find((b) => b.id === bodyEnergy);

    const newEntry = {
      id: Date.now(),
      date: 'Hoy',
      state: currentStateObj?.label || skinState,
      note: currentNote.trim() || 'Check-in de piel consciente y amable.',
      body: currentFeelObj?.label || bodyEnergy
    };
    const updated = [newEntry, ...skinNotes];
    setSkinNotes(updated);
    try { localStorage.setItem('marie_skin_log', JSON.stringify(updated)); } catch (e) {}
    setCurrentNote('');
    setSavedRecently(true);
    setTimeout(() => setSavedRecently(false), 2400);
  };

  const currentSkinObj = skinStates.find((s) => s.id === skinState) || skinStates[0];
  const protocols = tSom.massage?.protocols || [];
  const currentProtocol = protocols.find((p) => p.id === selectedProtocolId) || protocols[0];

  return (
    <div className="tab-content animate-fade-in" style={{ paddingBottom: '80px' }}>
      {/* Sub-Navigation Bar */}
      <div 
        className="mx-segmented" 
        style={{ 
          marginBottom: 14, 
          display: 'flex', 
          overflowX: 'auto', 
          whiteSpace: 'nowrap',
          gap: 4
        }}
      >
        <button
          className={`mx-seg-btn ${activeSubTab === 'skin' ? 'active' : ''}`}
          onClick={() => { playSoftTap(); setActiveSubTab('skin'); }}
        >
          <span>{tSub.skin}</span>
        </button>
        <button
          className={`mx-seg-btn ${activeSubTab === 'ayurveda' ? 'active' : ''}`}
          onClick={() => { playSoftTap(); setActiveSubTab('ayurveda'); }}
        >
          <span>{tSub.ayurveda}</span>
        </button>
        <button
          className={`mx-seg-btn ${activeSubTab === 'massage' ? 'active' : ''}`}
          onClick={() => { playSoftTap(); setActiveSubTab('massage'); }}
        >
          <span>{tSub.massage}</span>
        </button>
        <button
          className={`mx-seg-btn ${activeSubTab === 'stoic' ? 'active' : ''}`}
          onClick={() => { playSoftTap(); setActiveSubTab('stoic'); }}
        >
          <span>{tSub.stoic}</span>
        </button>
      </div>

      {/* SUB-TAB 1: SKIN & CYCLE */}
      {activeSubTab === 'skin' && (
        <div className="mx-stack animate-fade-in" style={{ gap: 14 }}>
          {/* Compassionate Sanctuary Banner */}
          <div className="skin-hero-banner glass-panel">
            <div className="skin-banner-tag font-serif">
              <span>🌹 {t.tag || 'Cuidado Compasivo'}</span>
            </div>
            <h3 className="skin-banner-title font-serif">{t.heroTitle || 'Tu piel es un órgano vivo, no un adorno'}</h3>
            <p className="skin-banner-sub">
              {t.heroSub || 'Tener textura, rojez o acné no te quita un ápice de belleza ni magnetismo. Aquí observamos con ternura, nunca con castigo.'}
            </p>
          </div>

          {/* Today's Skin Feeling Selector */}
          <div className="skin-section-card glass-panel">
            <span className="section-mini-tag">{t.stateTitle || '¿Cómo se siente tu piel hoy?'}</span>
            <div className="skin-states-grid">
              {skinStates.map((state) => {
                const isSelected = skinState === state.id;
                return (
                  <button
                    key={state.id}
                    className={`skin-state-chip ${isSelected ? 'active' : ''}`}
                    onClick={() => handleSelectSkin(state.id)}
                  >
                    <span className="state-emoji">{state.emoji}</span>
                    <span className="state-label">{state.label}</span>
                  </button>
                );
              })}
            </div>
            <div className="skin-state-feedback">
              <p className="state-feedback-text font-serif">
                {skinState === 'breakout' ? (
                  <span className="breakout-message">
                    ❤️ <em>"{currentSkinObj.desc || 'Un brote es solo tu piel pidiéndote una pausa o descanso. Respira. Eres preciosa hoy también.'}"</em>
                  </span>
                ) : (
                  <span>"{currentSkinObj.desc}"</span>
                )}
              </p>
            </div>
          </div>

          {/* Cycle Phase & Physical Energy */}
          <div className="cycle-body-card glass-panel">
            <div className="cycle-row-header">
              <span className="section-mini-tag">{t.cycleTitle || 'Fase de tu ciclo (Hormonas & Piel)'}</span>
            </div>
            <div className="cycle-chips-grid">
              {cyclePhases.map((phase) => {
                const isSelected = cyclePhase === phase.id;
                return (
                  <button
                    key={phase.id}
                    className={`cycle-chip ${isSelected ? 'active' : ''}`}
                    onClick={() => handleSelectCycle(phase.id)}
                  >
                    <span className="cycle-name">{phase.label}</span>
                    <span className="cycle-sub">{phase.sub}</span>
                  </button>
                );
              })}
            </div>

            {/* Physical Wellbeing */}
            <div className="body-energy-subgroup">
              <span className="section-mini-tag">{t.bodyFeelsTitle || 'Energía física corporal'}</span>
              <div className="body-feels-row">
                {bodyFeels.map((feel) => {
                  const isSelected = bodyEnergy === feel.id;
                  return (
                    <button
                      key={feel.id}
                      className={`body-feel-pill ${isSelected ? 'active' : ''}`}
                      onClick={() => { playSoftTap(); setBodyEnergy(feel.id); }}
                    >
                      <span>{feel.emoji}</span>
                      <span>{feel.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Hydration Tracker without pressure */}
            <div className="water-gentle-tracker">
              <div className="water-header">
                <span className="water-label font-serif"><Droplets size={14} /> {t.waterTitle || 'Hidratación amable'}</span>
                <span className="water-count">{waterCups} vasos</span>
              </div>
              <div className="water-cups-row">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((cup) => (
                  <button
                    key={cup}
                    className={`water-drop-btn ${cup <= waterCups ? 'filled' : ''}`}
                    onClick={() => { playSoftTap(); setWaterCups(cup); }}
                  >
                    💧
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Skin & Body Journal Entry */}
          <div className="skin-journal-card glass-panel">
            <h4 className="skin-journal-title font-serif">{t.noteTitle || 'Nota de hoy para tu cuerpo'}</h4>
            <p className="skin-journal-sub">{t.notePlaceholder || '¿Qué sensaciones hubo hoy?'}</p>
            <textarea
              className="skin-note-input"
              placeholder={t.notePlaceholder || 'Ej: Hoy sentí la piel un poco seca en las mejillas...'}
              value={currentNote}
              onChange={(e) => setCurrentNote(e.target.value)}
              rows={3}
            />
            <div className="skin-journal-action">
              <span className="save-status">
                {savedRecently && <span className="saved-confirm"><Check size={14} /> {t.savedToast || 'Registrado con amor'}</span>}
              </span>
              <button className="save-skin-btn" onClick={handleSaveSkinLog}>
                {t.saveNoteBtn || 'Guardar en mi bitácora'}
              </button>
            </div>
          </div>

          {/* Historical Entries */}
          <div className="skin-history-list">
            <span className="section-mini-tag">{t.tag || 'Bitácora corporal'}</span>
            {skinNotes.map((entry) => (
              <div key={entry.id} className="skin-log-item glass-panel">
                <div className="skin-log-top">
                  <span className="skin-log-state">{entry.state} · {entry.body}</span>
                  <span className="skin-log-date">{entry.date}</span>
                </div>
                <p className="skin-log-note">{entry.note}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 2: AYURVEDA & VATA GROUNDING */}
      {activeSubTab === 'ayurveda' && (
        <div className="mx-stack animate-fade-in" style={{ gap: 14 }}>
          <div className="mx-card" style={{ background: 'linear-gradient(135deg, rgba(52, 211, 153, 0.12) 0%, rgba(14, 24, 20, 0.95) 100%)', border: '1px solid rgba(52, 211, 153, 0.3)' }}>
            <div className="mx-row" style={{ gap: 8, alignItems: 'center' }}>
              <span style={{ fontSize: '1.4rem' }}>🌿</span>
              <h3 className="mx-h3" style={{ margin: 0 }}>{tSom.ayurveda?.title}</h3>
            </div>
            <p className="mx-text" style={{ marginTop: 8, fontSize: '13px', lineHeight: 1.55 }}>
              {tSom.ayurveda?.lead}
            </p>
          </div>

          <div className="mx-card soft" style={{ borderLeft: '3px solid #34D399' }}>
            <h4 className="mx-h3" style={{ fontSize: '0.95rem', color: '#A7F3D0' }}>
              {tSom.ayurveda?.vataCardTitle}
            </h4>
            <p className="mx-text" style={{ marginTop: 6, fontSize: '13px', lineHeight: 1.5 }}>
              {tSom.ayurveda?.vataCardDesc}
            </p>
          </div>

          <div className="mx-stack" style={{ gap: 10 }}>
            <span className="mx-kicker" style={{ fontSize: '11px' }}>
              {tSom.ayurveda?.ritualsTitle}
            </span>
            {Array.isArray(tSom.ayurveda?.rituals) && tSom.ayurveda.rituals.map((r, i) => (
              <div key={i} className="mx-card" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="mx-row" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                  <strong style={{ fontSize: '13.5px', color: '#FFF' }}>{r.title}</strong>
                  <span className="mx-badge" style={{ background: 'rgba(52, 211, 153, 0.2)', color: '#A7F3D0', fontSize: '11px' }}>
                    {r.badge}
                  </span>
                </div>
                <p className="mx-text" style={{ marginTop: 6, fontSize: '12.8px', lineHeight: 1.5 }}>
                  {r.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 3: CONSCIOUS MASSAGE & TOUCH */}
      {activeSubTab === 'massage' && (
        <div className="mx-stack animate-fade-in" style={{ gap: 14 }}>
          <div className="mx-card" style={{ background: 'linear-gradient(135deg, rgba(216, 74, 88, 0.12) 0%, rgba(24, 16, 20, 0.95) 100%)', border: '1px solid rgba(216, 74, 88, 0.3)' }}>
            <div className="mx-row" style={{ gap: 8, alignItems: 'center' }}>
              <Heart size={20} style={{ color: '#D84A58' }} aria-hidden="true" />
              <div>
                <h3 className="mx-h3" style={{ margin: 0 }}>{tSom.massage?.title}</h3>
                <span className="mx-small" style={{ color: '#FADBD8' }}>{tSom.massage?.subtitle}</span>
              </div>
            </div>
            <p className="mx-text" style={{ marginTop: 8, fontSize: '13px', lineHeight: 1.5 }}>
              {tSom.massage?.lead}
            </p>
          </div>

          {/* Protocol Selector Chips */}
          <div style={{ display: 'flex', gap: 8 }}>
            {Array.isArray(protocols) && protocols.map((p) => {
              const isSelected = selectedProtocolId === p.id;
              return (
                <button
                  key={p.id}
                  className={`mx-chip ${isSelected ? 'active' : ''}`}
                  onClick={() => handleSelectProtocol(p)}
                  style={{
                    flex: 1,
                    padding: '8px 12px',
                    borderRadius: '12px',
                    fontSize: '12.5px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    background: isSelected ? 'rgba(216, 74, 88, 0.25)' : 'rgba(255,255,255,0.04)',
                    border: isSelected ? '1px solid #D84A58' : '1px solid rgba(255,255,255,0.08)',
                    color: isSelected ? '#FFF' : 'inherit'
                  }}
                >
                  {p.title}
                </button>
              );
            })}
          </div>

          {/* Interactive Protocol Display */}
          {currentProtocol && (
            <div className="mx-card soft" style={{ borderLeft: '3px solid #D84A58' }}>
              <h4 className="mx-h2" style={{ fontSize: '1.05rem', color: '#FFF' }}>
                {currentProtocol.title}
              </h4>
              <p className="mx-text" style={{ marginTop: 4, fontSize: '13px', lineHeight: 1.5, color: '#E8DAEF' }}>
                {currentProtocol.desc}
              </p>

              <div className="mx-stack" style={{ gap: 6, marginTop: 12 }}>
                {Array.isArray(currentProtocol.steps) && currentProtocol.steps.map((step, idx) => (
                  <p key={idx} className="mx-small" style={{ lineHeight: 1.45, color: '#D0C8B8' }}>
                    {step}
                  </p>
                ))}
              </div>

              {/* Massage Timer Container */}
              <div 
                style={{ 
                  marginTop: 16, 
                  padding: '14px', 
                  borderRadius: '14px', 
                  background: 'rgba(0,0,0,0.3)', 
                  border: '1px solid rgba(255,255,255,0.06)',
                  textAlign: 'center'
                }}
              >
                <span className="mx-kicker" style={{ fontSize: '11px' }}>
                  {tSom.massage?.timerLabel}
                </span>
                <div style={{ fontSize: '2.4rem', fontFamily: 'monospace', fontWeight: 700, color: '#FADBD8', margin: '4px 0 10px' }}>
                  {formatTimerTime(timerSeconds)}
                </div>

                <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
                  <button
                    className="mx-btn warm"
                    onClick={handleToggleTimer}
                    style={{ padding: '6px 18px', fontSize: '13px' }}
                  >
                    {isTimerActive ? (
                      <>
                        <Pause size={14} aria-hidden="true" /> {tSom.massage?.pauseTimer}
                      </>
                    ) : (
                      <>
                        <Play size={14} aria-hidden="true" /> {tSom.massage?.startTimer}
                      </>
                    )}
                  </button>
                  <button
                    className="mx-btn ghost"
                    onClick={handleResetTimer}
                    style={{ padding: '6px 14px', fontSize: '13px' }}
                  >
                    <RotateCcw size={14} aria-hidden="true" /> {tSom.massage?.resetTimer}
                  </button>
                </div>

                {isTimerActive && (
                  <span className="mx-small" style={{ display: 'block', marginTop: 8, color: '#A9DFBF' }}>
                    {tSom.massage?.timerRunning}
                  </span>
                )}
                {timerCompleted && (
                  <span className="mx-small" style={{ display: 'block', marginTop: 8, color: '#F5B7B1', fontWeight: 600 }}>
                    {tSom.massage?.timerDone}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* SUB-TAB 4: STOIC BODY WISDOM */}
      {activeSubTab === 'stoic' && (
        <div className="mx-stack animate-fade-in" style={{ gap: 14 }}>
          <div className="mx-card" style={{ background: 'linear-gradient(135deg, rgba(125, 163, 190, 0.12) 0%, rgba(14, 20, 26, 0.95) 100%)', border: '1px solid rgba(125, 163, 190, 0.3)' }}>
            <div className="mx-row" style={{ gap: 8, alignItems: 'center' }}>
              <Shield size={20} style={{ color: '#7DA3BE' }} aria-hidden="true" />
              <h3 className="mx-h3" style={{ margin: 0 }}>{tSom.stoic?.title}</h3>
            </div>
            <p className="mx-text" style={{ marginTop: 8, fontSize: '13px', lineHeight: 1.5 }}>
              {tSom.stoic?.lead}
            </p>
          </div>

          {/* In My Hands */}
          <div className="mx-card soft" style={{ borderLeft: '3px solid #7DA3BE' }}>
            <h4 className="mx-h3" style={{ fontSize: '0.95rem', color: '#D4E6F1' }}>
              {tSom.stoic?.inMyHandsTitle}
            </h4>
            <div className="mx-stack" style={{ gap: 8, marginTop: 8 }}>
              {Array.isArray(tSom.stoic?.inMyHands) && tSom.stoic.inMyHands.map((item, idx) => (
                <div key={idx} className="mx-row" style={{ alignItems: 'flex-start', gap: 6 }}>
                  <Check size={14} style={{ color: '#7DA3BE', flexShrink: 0, marginTop: 2 }} />
                  <span className="mx-text" style={{ fontSize: '13px' }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Not In My Hands */}
          <div className="mx-card soft" style={{ borderLeft: '3px solid #E05D44' }}>
            <h4 className="mx-h3" style={{ fontSize: '0.95rem', color: '#FADBD8' }}>
              {tSom.stoic?.notInMyHandsTitle}
            </h4>
            <div className="mx-stack" style={{ gap: 8, marginTop: 8 }}>
              {Array.isArray(tSom.stoic?.notInMyHands) && tSom.stoic.notInMyHands.map((item, idx) => (
                <div key={idx} className="mx-row" style={{ alignItems: 'flex-start', gap: 6 }}>
                  <Feather size={14} style={{ color: '#E05D44', flexShrink: 0, marginTop: 2 }} />
                  <span className="mx-text" style={{ fontSize: '13px' }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
