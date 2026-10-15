import React, { useState } from 'react';
import { Sparkles, Send, Plus, Trash2, Mail, Check, Heart, Compass, Gift } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useLanguage } from '../context/LanguageContext';
import { playSoftChime, playSoftTap } from '../utils/audio';
import SelfLoveSection from './SelfLoveSection';
import LifeWondersSection from './LifeWondersSection';

const INITIAL_DREAMS = [
  { id: 1, title: 'Viaje a la Costa Amalfitana con un vestido de lino', category: 'Aventura', tagColor: '#DDA15E' },
  { id: 2, title: 'Un rincón de lectura en casa bañado por el sol con mi butaca favorita', category: 'Hogar', tagColor: '#CCD5AE' },
  { id: 3, title: 'Aprender a bailar tango o danza contemporánea con soltura', category: 'Cuerpo', tagColor: '#B5838D' },
  { id: 4, title: 'Sentirme completamente en paz y dueña de mi tiempo', category: 'Espíritu', tagColor: '#8A9A86' }
];

export default function DreamsTab({ soundEnabled }) {
  const { currentStrings } = useLanguage();
  const t = currentStrings?.dreams || {};
  const sub = t.subtabs || {};
  const b = t.board || {};
  const letCopy = t.letter || {};

  const [activeSubTab, setActiveSubTab] = useState('board'); // 'board' | 'letter' | 'selfLove'

  const [dreams, setDreams] = useState(() => {
    try {
      const saved = localStorage.getItem('marie_dreams_list');
      return saved ? JSON.parse(saved) : INITIAL_DREAMS;
    } catch (e) {
      return INITIAL_DREAMS;
    }
  });
  const [newDreamTitle, setNewDreamTitle] = useState('');
  const [newDreamCategory, setNewDreamCategory] = useState(b.categories?.[0] || 'Aventura');
  const [isAddingDream, setIsAddingDream] = useState(false);

  // Future Letter State
  const [futureLetter, setFutureLetter] = useState(() => {
    try {
      return localStorage.getItem('marie_future_letter') || '';
    } catch (e) {
      return '';
    }
  });
  const [isLetterSaved, setIsLetterSaved] = useState(false);

  const handleAddDream = () => {
    if (!newDreamTitle.trim()) return;
    if (soundEnabled) playSoftChime();
    const newDream = {
      id: Date.now(),
      title: newDreamTitle.trim(),
      category: newDreamCategory,
      tagColor: '#C87D55'
    };
    const updated = [newDream, ...dreams];
    setDreams(updated);
    try {
      localStorage.setItem('marie_dreams_list', JSON.stringify(updated));
    } catch (e) {}

    setNewDreamTitle('');
    setIsAddingDream(false);
    confetti({ particleCount: 30, spread: 60, origin: { y: 0.7 } });
  };

  const handleDeleteDream = (id) => {
    playSoftTap();
    const updated = dreams.filter(d => d.id !== id);
    setDreams(updated);
    try {
      localStorage.setItem('marie_dreams_list', JSON.stringify(updated));
    } catch (e) {}
  };

  const handleSaveLetter = () => {
    if (soundEnabled) playSoftChime();
    try {
      localStorage.setItem('marie_future_letter', futureLetter);
    } catch (e) {}
    setIsLetterSaved(true);
    setTimeout(() => setIsLetterSaved(false), 2500);
    confetti({ particleCount: 35, spread: 55, origin: { y: 0.6 } });
  };

  const boardCategories = b.categories || ['Aventura', 'Hogar', 'Cuerpo', 'Espíritu', 'Arte'];

  return (
    <div className="tab-content animate-fade-in">
      {/* Elevated Segmented Subtabs Bar */}
      <div className="segmented-subtabs-bar">
        <button 
          className={`segmented-subtab-pill ${activeSubTab === 'board' ? 'active' : ''}`}
          onClick={() => { playSoftTap(); setActiveSubTab('board'); }}
        >
          <Sparkles size={14} />
          <span>{sub.board || 'Vision Board'}</span>
          <span className="pill-badge">{dreams.length}</span>
        </button>
        <button 
          className={`segmented-subtab-pill ${activeSubTab === 'letter' ? 'active' : ''}`}
          onClick={() => { playSoftTap(); setActiveSubTab('letter'); }}
        >
          <Mail size={14} />
          <span>{sub.futureLetter || 'Carta a mi Futuro'}</span>
        </button>
        <button 
          className={`segmented-subtab-pill highlight-self-love ${activeSubTab === 'selfLove' ? 'active' : ''}`}
          onClick={() => { playSoftTap(); setActiveSubTab('selfLove'); }}
        >
          <Heart size={14} fill={activeSubTab === 'selfLove' ? 'currentColor' : 'none'} />
          <span>{sub.selfLoveWords || 'Worte der Selbstliebe'}</span>
        </button>
        <button 
          className={`segmented-subtab-pill highlight-wonders ${activeSubTab === 'wonders' ? 'active' : ''}`}
          onClick={() => { playSoftTap(); setActiveSubTab('wonders'); }}
        >
          <Gift size={14} />
          <span>{sub.wonders || 'Descubrimientos & Sorpresas'}</span>
          <span className="pill-badge wonders-badge">26</span>
        </button>
      </div>

      {activeSubTab === 'board' ? (
        <>
          <div className="dreams-hero-card glass-panel">
            <span className="tracker-tag font-serif">✨ {sub.board || 'Vision Board'}</span>
            <h3 className="dreams-hero-title font-serif">{b.heroTitle || 'Tu Mapa de Deseos Vivos'}</h3>
            <p className="dreams-hero-sub">
              {b.heroSub || 'Soñar no cuesta nada y expande lo que es posible para ti. Coloca aquí todo lo que te haga brillar los ojos.'}
            </p>
            <button 
              className="add-dream-pill-btn"
              onClick={() => { playSoftTap(); setIsAddingDream(!isAddingDream); }}
            >
              <Plus size={15} />
              <span>{isAddingDream ? (b.closeBtn || 'Cerrar creador') : (b.addBtn || 'Plantar un nuevo deseo')}</span>
            </button>
          </div>

          {/* New Dream Form */}
          {isAddingDream && (
            <div className="new-dream-modal glass-panel animate-fade-in">
              <h4 className="new-dream-title font-serif">{b.modalTitle || '¿Qué sueña tu corazón hoy?'}</h4>
              <input
                type="text"
                className="new-dream-input"
                placeholder={b.inputPlaceholder || 'Ej: Viaje a la Costa Amalfitana con un vestido de lino...'}
                value={newDreamTitle}
                onChange={(e) => setNewDreamTitle(e.target.value)}
              />
              <div className="category-select-row">
                {boardCategories.map((cat) => (
                  <button
                    key={cat}
                    className={`cat-chip ${newDreamCategory === cat ? 'active' : ''}`}
                    onClick={() => setNewDreamCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              <button 
                className="submit-dream-btn" 
                onClick={handleAddDream}
                disabled={!newDreamTitle.trim()}
              >
                {b.submitBtn || 'Añadir a mi constelación'}
              </button>
            </div>
          )}

          {/* Dreams Grid */}
          <div className="dreams-grid">
            {dreams.length === 0 ? (
              <div className="empty-self-love-card glass-panel">
                <Sparkles size={24} className="empty-sparkle-icon" />
                <p className="empty-text font-serif">
                  {b.emptyState || 'Tu vision board está esperando su primer anhelo.'}
                </p>
              </div>
            ) : (
              dreams.map((dream) => (
                <div key={dream.id} className="dream-card glass-panel">
                  <div className="dream-card-top">
                    <span className="dream-cat-badge" style={{ backgroundColor: `${dream.tagColor}25`, color: dream.tagColor }}>
                      {dream.category}
                    </span>
                    <button 
                      className="delete-dream-btn" 
                      onClick={() => handleDeleteDream(dream.id)}
                      title="Eliminar"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                  <p className="dream-card-title font-serif">{dream.title}</p>
                  <div className="dream-card-footer">
                    <span className="dream-sparkle-dot">✨</span>
                    <span className="dream-status-text">{b.statusText || 'En camino a florecer'}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      ) : activeSubTab === 'letter' ? (
        /* Future Letter View */
        <div className="future-letter-view">
          <div className="letter-header-card glass-panel">
            <span className="letter-tag font-serif">{letCopy.tag || 'Cápsula de Amor Propio'}</span>
            <h3 className="letter-title font-serif">{letCopy.title || 'Una carta a ti misma dentro de 6 meses'}</h3>
            <p className="letter-sub">
              {letCopy.sub || '¿Qué esperas haber soltado? ¿Qué deseas haberte atrevido a experimentar?'}
            </p>
          </div>

          <div className="letter-paper-card glass-panel">
            <div className="letter-wax-seal">
              <span>M</span>
            </div>
            <textarea
              className="letter-textarea font-serif"
              placeholder={letCopy.placeholder || 'Querida Marie del futuro:\n\nHoy te escribo desde este momento de mi vida para recordarte que...'}
              value={futureLetter}
              onChange={(e) => setFutureLetter(e.target.value)}
              rows={9}
            />

            <div className="letter-action-row">
              <span className="save-status">
                {isLetterSaved && (
                  <span className="saved-confirm">
                    <Check size={14} /> {letCopy.sealedConfirm || 'Sellada en tu cápsula'}
                  </span>
                )}
              </span>

              <button 
                className="seal-letter-btn"
                onClick={handleSaveLetter}
                disabled={!futureLetter.trim()}
              >
                <Send size={14} /> {letCopy.sealBtn || 'Sellar con cera digital'}
              </button>
            </div>
          </div>
        </div>
      ) : activeSubTab === 'selfLove' ? (
        /* Words of Self-Love Section */
        <SelfLoveSection soundEnabled={soundEnabled} />
      ) : (
        /* Discoveries & Wonders Section (26 Maravillas) */
        <LifeWondersSection soundEnabled={soundEnabled} />
      )}
    </div>
  );
}
