import React, { useState, useEffect } from 'react';
import { DAILY_CARDS } from '../data/appData';
import { Sparkles, Heart, Bookmark, Share2, Check, RefreshCw, Feather } from 'lucide-react';
import { playSoftChime, playSoftTap } from '../utils/audio';

export default function DailySparkTab({ soundEnabled }) {
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [reflectionText, setReflectionText] = useState('');
  const [savedNotes, setSavedNotes] = useState(() => {
    try {
      const saved = localStorage.getItem('marie_daily_reflections');
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });
  const [isSavedRecently, setIsSavedRecently] = useState(false);
  const [isBreatheModalOpen, setIsBreatheModalOpen] = useState(false);
  const [breathePhase, setBreathePhase] = useState('Inhala despacio...');

  const card = DAILY_CARDS[activeCardIndex];

  useEffect(() => {
    if (savedNotes[card.id]) {
      setReflectionText(savedNotes[card.id]);
    } else {
      setReflectionText('');
    }
  }, [activeCardIndex, savedNotes, card.id]);

  const handleSaveReflection = () => {
    if (soundEnabled) playSoftChime();
    const updated = {
      ...savedNotes,
      [card.id]: reflectionText
    };
    setSavedNotes(updated);
    try {
      localStorage.setItem('marie_daily_reflections', JSON.stringify(updated));
    } catch (e) {}

    setIsSavedRecently(true);
    setTimeout(() => setIsSavedRecently(false), 2400);
  };

  const handleNextCard = () => {
    playSoftTap();
    setActiveCardIndex((prev) => (prev + 1) % DAILY_CARDS.length);
  };

  return (
    <div className="tab-content animate-fade-in">
      {/* Intimate Card */}
      <div className="spark-card-wrapper">
        <div className="spark-card glass-panel" style={{ borderColor: `${card.color}40` }}>
          <div className="spark-card-top">
            <div className="spark-badge" style={{ backgroundColor: `${card.color}25`, color: card.color }}>
              <Sparkles size={13} />
              <span>{card.archetype}</span>
            </div>
            <span className="spark-date-label">{card.date}</span>
          </div>

          <div className="spark-card-body">
            <p className="spark-quote font-serif">"{card.spark}"</p>
            <p className="spark-subtext">{card.subtext}</p>
          </div>

          <div className="spark-card-footer">
            <button 
              className="secondary-text-btn"
              onClick={handleNextCard}
            >
              <RefreshCw size={13} />
              <span>Otra reflexión</span>
            </button>

            <button 
              className="breathe-trigger-btn"
              onClick={() => {
                playSoftTap();
                setIsBreatheModalOpen(true);
              }}
            >
              <Feather size={14} />
              <span>Pausa de 30s</span>
            </button>
          </div>
        </div>
      </div>

      {/* Intimate Journal Input */}
      <div className="reflection-box-card glass-panel">
        <div className="reflection-header">
          <span className="reflection-tag font-serif">Tu diario interior</span>
          <span className="reflection-privacy-badge">Privado & Cifrado</span>
        </div>

        <textarea
          className="reflection-input"
          placeholder="Escribe lo que sientes en el pecho hoy... Sin juzgarte, sin filtros."
          value={reflectionText}
          onChange={(e) => setReflectionText(e.target.value)}
          rows={4}
        />

        <div className="reflection-action-row">
          <span className="save-status-indicator">
            {isSavedRecently ? (
              <span className="saved-badge">
                <Check size={14} /> Guardado en tu santuario
              </span>
            ) : (
              reflectionText.trim() && <span className="dirty-indicator">Borrador no guardado</span>
            )}
          </span>

          <button 
            className="save-reflection-btn"
            onClick={handleSaveReflection}
            disabled={!reflectionText.trim()}
          >
            Guardar en mi diario
          </button>
        </div>
      </div>

      {/* Daily Affirmation banner */}
      <div className="gentle-banner">
        <div className="gentle-banner-icon">🕯️</div>
        <div className="gentle-banner-content">
          <h4 className="gentle-banner-title font-serif">Recordatorio sagrado</h4>
          <p className="gentle-banner-text">
            No tienes que convertirte en otra persona para tener estilo y poder. Solo estás recordando quién ya eres debajo del ruido.
          </p>
        </div>
      </div>

      {/* 30s Breathe Modal */}
      {isBreatheModalOpen && (
        <div className="modal-overlay" onClick={() => setIsBreatheModalOpen(false)}>
          <div className="breathe-modal glass-panel-dark" onClick={(e) => e.stopPropagation()}>
            <h3 className="breathe-title font-serif">Regresa a tu cuerpo</h3>
            <p className="breathe-sub">Baja los hombros. Suelta la mandíbula.</p>
            
            <div className="breathe-circle-container">
              <div className="breathe-circle pulse-breathe">
                <span className="breathe-circle-text font-serif">Respira</span>
              </div>
            </div>

            <button 
              className="close-breathe-btn"
              onClick={() => setIsBreatheModalOpen(false)}
            >
              Volver a la calma
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
