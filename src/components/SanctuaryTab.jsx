import React, { useState } from 'react';
import { Lock, Unlock, ShieldCheck, Eye, EyeOff, Sparkles, Heart, Flame, Feather, KeyRound, Check } from 'lucide-react';
import { INTIMACY_PROMPTS } from '../data/appData';
import { playSoftChime, playUnlockChime, playSoftTap } from '../utils/audio';

const COUPLE_CARDS = [
  '¿Cuál ha sido un beso o caricia nuestra que todavía recuerdes con una descarga eléctrica?',
  'Si una noche tuvieras el control total de nuestro tiempo y placer, ¿cómo empezarías?',
  '¿Qué detalle que hago te hace sentir irresistiblemente deseada?',
  '¿Hay algún lugar o momento inesperado donde te haya dado curiosidad que estemos juntos?',
  '¿Cómo te gusta más que te toque cuando estás cansada vs cuando estás llena de fuego?'
];

export default function SanctuaryTab({ soundEnabled }) {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [showPinPad, setShowPinPad] = useState(false);
  const [selectedDesires, setSelectedDesires] = useState(() => {
    try {
      const saved = localStorage.getItem('marie_selected_desires');
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });
  const [intimateJournalText, setIntimateJournalText] = useState(() => {
    try {
      return localStorage.getItem('marie_secret_journal') || '';
    } catch (e) {
      return '';
    }
  });
  const [isJournalSaved, setIsJournalSaved] = useState(false);
  const [activeSubSection, setActiveSubSection] = useState('desires'); // 'desires' | 'journal' | 'couple'
  const [coupleCardIndex, setCoupleCardIndex] = useState(0);

  const handleSimulateFaceID = () => {
    playSoftTap();
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setIsUnlocked(true);
      if (soundEnabled) playUnlockChime();
    }, 1200);
  };

  const handlePinSubmit = (digit) => {
    playSoftTap();
    const newPin = pinInput + digit;
    setPinInput(newPin);
    if (newPin.length === 4) {
      // Allow any 4-digit pin or standard '1111'
      setTimeout(() => {
        setIsUnlocked(true);
        if (soundEnabled) playUnlockChime();
        setPinInput('');
        setShowPinPad(false);
      }, 300);
    }
  };

  const handleLockAgain = () => {
    playSoftTap();
    setIsUnlocked(false);
    setShowPinPad(false);
    setPinInput('');
  };

  const handleToggleDesire = (id, option) => {
    playSoftTap();
    const current = selectedDesires[id] || [];
    const exists = current.includes(option);
    const updatedList = exists 
      ? current.filter(o => o !== option)
      : [...current, option];

    const updated = {
      ...selectedDesires,
      [id]: updatedList
    };
    setSelectedDesires(updated);
    try {
      localStorage.setItem('marie_selected_desires', JSON.stringify(updated));
    } catch (e) {}
  };

  const handleSaveIntimateJournal = () => {
    if (soundEnabled) playSoftChime();
    try {
      localStorage.setItem('marie_secret_journal', intimateJournalText);
    } catch (e) {}
    setIsJournalSaved(true);
    setTimeout(() => setIsJournalSaved(false), 2500);
  };

  return (
    <div className="tab-content sanctuary-container animate-fade-in">
      {!isUnlocked ? (
        /* LOCKED STATE */
        <div className="vault-locked-card glass-panel-dark">
          <div className="vault-icon-circle">
            <Lock size={28} className="vault-lock-icon" />
          </div>

          <h3 className="vault-title font-serif">Tu Santuario Íntimo</h3>
          <p className="vault-desc">
            Un espacio sagrado para explorar tu sensualidad, deseos y fantasías sin juicios. Protegido bajo llave.
          </p>

          <div className="biometric-trigger-area">
            <button 
              className={`faceid-scan-btn ${isScanning ? 'scanning' : ''}`}
              onClick={handleSimulateFaceID}
              disabled={isScanning}
            >
              <div className="faceid-reticle">
                <div className="reticle-corner top-left"></div>
                <div className="reticle-corner top-right"></div>
                <div className="reticle-corner bottom-left"></div>
                <div className="reticle-corner bottom-right"></div>
                {isScanning ? (
                  <div className="scanning-bar"></div>
                ) : (
                  <Sparkles size={24} className="faceid-sparkle" />
                )}
              </div>
              <span className="faceid-label">
                {isScanning ? 'Verificando FaceID...' : 'Desbloquear con FaceID'}
              </span>
            </button>

            <button 
              className="text-link-btn"
              onClick={() => setShowPinPad(!showPinPad)}
            >
              <KeyRound size={14} /> Usar código de acceso (PIN)
            </button>
          </div>

          {showPinPad && (
            <div className="pin-pad-container animate-fade-in">
              <div className="pin-dots-row">
                {[0, 1, 2, 3].map((idx) => (
                  <div 
                    key={idx} 
                    className={`pin-dot ${pinInput.length > idx ? 'filled' : ''}`}
                  />
                ))}
              </div>
              <div className="pin-keypad-grid">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 'C', 0, '←'].map((key) => (
                  <button
                    key={key}
                    className="pin-key-btn"
                    onClick={() => {
                      if (key === 'C') setPinInput('');
                      else if (key === '←') setPinInput(p => p.slice(0, -1));
                      else handlePinSubmit(key);
                    }}
                  >
                    {key}
                  </button>
                ))}
              </div>
              <span className="pin-hint">Puedes pulsar cualquier 4 dígitos (ej: 1111)</span>
            </div>
          )}
        </div>
      ) : (
        /* UNLOCKED STATE */
        <div className="vault-unlocked-content animate-fade-in">
          <div className="sanctuary-top-bar glass-panel-dark">
            <div className="sanctuary-status">
              <ShieldCheck size={16} className="unlocked-shield-icon" />
              <span className="sanctuary-badge font-serif">Santuario Abierto</span>
            </div>
            <button className="lock-now-btn" onClick={handleLockAgain}>
              <Lock size={14} /> Bloquear
            </button>
          </div>

          {/* Sub Navigation */}
          <div className="sanctuary-tabs-row">
            <button 
              className={`sanc-tab-btn ${activeSubSection === 'desires' ? 'active' : ''}`}
              onClick={() => { playSoftTap(); setActiveSubSection('desires'); }}
            >
              <Flame size={13} /> Deseos & Tacto
            </button>
            <button 
              className={`sanc-tab-btn ${activeSubSection === 'journal' ? 'active' : ''}`}
              onClick={() => { playSoftTap(); setActiveSubSection('journal'); }}
            >
              <Feather size={13} /> Diario Secreto
            </button>
            <button 
              className={`sanc-tab-btn ${activeSubSection === 'couple' ? 'active' : ''}`}
              onClick={() => { playSoftTap(); setActiveSubSection('couple'); }}
            >
              <Heart size={13} /> Conexión en Pareja
            </button>
          </div>

          {activeSubSection === 'desires' && (
            <div className="desires-view animate-fade-in">
              <p className="desires-intro">
                Toca las sensaciones que te despiertan curiosidad hoy. No tienes que justificar ninguna.
              </p>
              
              {INTIMACY_PROMPTS.filter(p => !p.isJournal).map((item) => (
                <div key={item.id} className="desire-category-card glass-panel-dark">
                  <span className="desire-category-title font-serif">{item.category}</span>
                  <p className="desire-prompt-text">{item.prompt}</p>

                  <div className="desire-options-list">
                    {item.options.map((opt, oIdx) => {
                      const isSelected = (selectedDesires[item.id] || []).includes(opt);
                      return (
                        <button
                          key={oIdx}
                          className={`desire-option-pill ${isSelected ? 'selected' : ''}`}
                          onClick={() => handleToggleDesire(item.id, opt)}
                        >
                          <span className="option-check">
                            {isSelected ? <Check size={12} /> : '+'}
                          </span>
                          <span className="option-label">{opt}</span>
                        </button>
                      );
                    })}
                  </div>
                  <span className="desire-note font-serif">"{item.note}"</span>
                </div>
              ))}
            </div>
          )}

          {activeSubSection === 'journal' && (
            <div className="intimate-journal-view animate-fade-in">
              <div className="secret-journal-card glass-panel-dark">
                <div className="journal-card-top">
                  <h4 className="journal-title font-serif">Tus pensamientos más íntimos</h4>
                  <span className="encrypted-tag">Solo tú puedes ver esto</span>
                </div>
                <p className="journal-sub">
                  Fantasías que te dan vergüenza admitir, curiosidades sobre tu cuerpo o cosas que aún no sabes cómo pedir.
                </p>

                <textarea
                  className="secret-textarea"
                  placeholder="Aquí no hay filtros ni expectativas..."
                  value={intimateJournalText}
                  onChange={(e) => setIntimateJournalText(e.target.value)}
                  rows={7}
                />

                <div className="journal-action-row">
                  <span className="save-status">
                    {isJournalSaved ? (
                      <span className="saved-confirm"><Check size={14} /> Cifrado & guardado</span>
                    ) : ''}
                  </span>
                  <button 
                    className="save-vault-btn"
                    onClick={handleSaveIntimateJournal}
                    disabled={!intimateJournalText.trim()}
                  >
                    Guardar en bóveda
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeSubSection === 'couple' && (
            <div className="couple-view animate-fade-in">
              <div className="couple-intro-card glass-panel-dark">
                <span className="couple-tag font-serif">Puente Íntimo</span>
                <h4 className="couple-title font-serif">Preguntas de fuego & complicidad</h4>
                <p className="couple-desc">
                  Cartas para jugar juntos cuando ambos tengan tiempo y ganas de mirarse a los ojos.
                </p>

                <div className="couple-card-display">
                  <p className="couple-question font-serif">
                    "{COUPLE_CARDS[coupleCardIndex]}"
                  </p>
                </div>

                <div className="couple-card-controls">
                  <button 
                    className="next-card-btn"
                    onClick={() => {
                      playSoftTap();
                      setCoupleCardIndex((prev) => (prev + 1) % COUPLE_CARDS.length);
                    }}
                  >
                    Siguiente carta de complicidad
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
