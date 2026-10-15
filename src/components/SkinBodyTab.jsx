import React, { useState } from 'react';
import { Sparkles, Heart, Droplets, Moon, Activity, Check, Plus, Calendar, Smile, AlertCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { playSoftChime, playSoftTap } from '../utils/audio';

export default function SkinBodyTab({ soundEnabled }) {
  const { currentStrings } = useLanguage();
  const t = currentStrings?.skin || {};

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
      return saved ? JSON.parse(saved) : [
        { id: 1, date: '5 Sep', state: 'Sensible', note: 'Usé la crema suave y dormí 8h. La inflamación bajó mucho.', body: 'Ligera' }
      ];
    } catch (e) {
      return [];
    }
  });
  const [currentNote, setCurrentNote] = useState('');
  const [savedRecently, setSavedRecently] = useState(false);

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

  return (
    <div className="tab-content animate-fade-in">
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
  );
}
