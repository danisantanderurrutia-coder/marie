import React, { useState, useMemo } from 'react';
import { 
  Sparkles, 
  Heart, 
  Star, 
  Compass, 
  CheckCircle2, 
  Clock, 
  Eye, 
  RotateCw, 
  ChevronDown, 
  ChevronUp, 
  Edit3, 
  Check, 
  Gift, 
  Bookmark, 
  Flame, 
  PartyPopper,
  Feather
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useLanguage } from '../context/LanguageContext';
import { INITIAL_LIFE_WONDERS, LIFE_WONDERS_CATEGORIES } from '../data/lifeWonders';
import { playSoftChime, playSoftTap, playUnlockChime } from '../utils/audio';

const STORAGE_KEY = 'marie_life_wonders';

export default function LifeWondersSection({ soundEnabled }) {
  const { language, currentStrings } = useLanguage();
  const t = currentStrings?.lifeWonders || {};

  // Wonders state with localStorage merge
  const [wonders, setWonders] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) return INITIAL_LIFE_WONDERS;
      const parsed = JSON.parse(saved);
      // Merge saved state with initial definition to retain texts while preserving user data
      return INITIAL_LIFE_WONDERS.map((wonder) => {
        const userState = parsed.find((p) => p.id === wonder.id);
        if (!userState) return wonder;
        return {
          ...wonder,
          status: userState.status || wonder.status || 'dream',
          personalNote: userState.personalNote !== undefined ? userState.personalNote : wonder.personalNote,
          date: userState.date || wonder.date || '',
          favorite: userState.favorite !== undefined ? userState.favorite : wonder.favorite
        };
      });
    } catch (e) {
      console.error('Error loading life wonders from localStorage', e);
      return INITIAL_LIFE_WONDERS;
    }
  });

  // Filter state: 'all' | 'maternity_bonds' | 'material_sanctuaries' | 'travel_nature' | 'euphoric_news' | 'serendipity_soul' | 'lived' | 'favorites'
  const [activeFilter, setActiveFilter] = useState('all');

  // Oracle state
  const [oracleIndex, setOracleIndex] = useState(() => Math.floor(Math.random() * INITIAL_LIFE_WONDERS.length));
  const [isOracleRevealed, setIsOracleRevealed] = useState(false);

  // Accordion for editing notes per card
  const [expandedNotesId, setExpandedNotesId] = useState(null);
  const [savedNotesToastId, setSavedNotesToastId] = useState(null);

  // Toast confirmation for lived celebration
  const [celebrationToast, setCelebrationToast] = useState(null);

  // Save changes to localStorage
  const persistWonders = (newWonders) => {
    setWonders(newWonders);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newWonders));
    } catch (e) {
      console.error('Failed to save life wonders', e);
    }
  };

  // Status cycling: 'dream' -> 'in_progress' -> 'lived' -> 'dream'
  const handleCycleStatus = (id, targetStatus = null) => {
    playSoftTap();
    const updated = wonders.map((w) => {
      if (w.id !== id) return w;
      let nextStatus = targetStatus;
      if (!nextStatus) {
        if (w.status === 'dream') nextStatus = 'in_progress';
        else if (w.status === 'in_progress') nextStatus = 'lived';
        else nextStatus = 'dream';
      }

      if (nextStatus === 'lived') {
        if (soundEnabled) playUnlockChime();
        confetti({
          particleCount: 70,
          spread: 75,
          origin: { y: 0.6 },
          colors: ['#D84A58', '#E07A5F', '#DDA15E', '#F8C3CA', '#FFE6AA']
        });
        setCelebrationToast(w.id);
        setTimeout(() => setCelebrationToast(null), 3000);
      } else if (soundEnabled) {
        playSoftChime();
      }

      return { ...w, status: nextStatus };
    });
    persistWonders(updated);
  };

  // Toggle favorite
  const handleToggleFavorite = (id) => {
    playSoftTap();
    const updated = wonders.map((w) => (w.id === id ? { ...w, favorite: !w.favorite } : w));
    persistWonders(updated);
  };

  // Update personal note
  const handleUpdateNote = (id, noteText) => {
    const updated = wonders.map((w) => (w.id === id ? { ...w, personalNote: noteText } : w));
    persistWonders(updated);
  };

  // Save note action with visual confirmation
  const handleSaveNoteAction = (id) => {
    if (soundEnabled) playSoftChime();
    setSavedNotesToastId(id);
    setTimeout(() => setSavedNotesToastId(null), 2200);
  };

  // Oracle revelation
  const handleRevealOracle = () => {
    playSoftTap();
    if (soundEnabled) playUnlockChime();
    setIsOracleRevealed(true);
    confetti({
      particleCount: 45,
      spread: 60,
      origin: { y: 0.45 },
      colors: ['#DDA15E', '#F8C3CA', '#E07A5F']
    });
  };

  const handleShuffleOracle = () => {
    playSoftTap();
    if (soundEnabled) playSoftChime();
    let nextIdx = Math.floor(Math.random() * wonders.length);
    if (nextIdx === oracleIndex) {
      nextIdx = (nextIdx + 1) % wonders.length;
    }
    setOracleIndex(nextIdx);
    setIsOracleRevealed(true);
  };

  // Statistics
  const stats = useMemo(() => {
    const lived = wonders.filter((w) => w.status === 'lived').length;
    const inProgress = wonders.filter((w) => w.status === 'in_progress').length;
    const dream = wonders.filter((w) => w.status === 'dream').length;
    const favorites = wonders.filter((w) => w.favorite).length;
    const percentage = Math.round((lived / wonders.length) * 100);
    return { lived, inProgress, dream, favorites, percentage, total: wonders.length };
  }, [wonders]);

  // Filtered list
  const filteredWonders = useMemo(() => {
    if (activeFilter === 'lived') {
      return wonders.filter((w) => w.status === 'lived');
    }
    if (activeFilter === 'favorites') {
      return wonders.filter((w) => w.favorite);
    }
    if (activeFilter === 'all') {
      return wonders;
    }
    return wonders.filter((w) => w.category === activeFilter);
  }, [wonders, activeFilter]);

  // Oracle item
  const oracleWonder = wonders[oracleIndex] || wonders[0];

  // Helper for localized content
  const getContent = (item) => {
    if (language === 'de') return item.de;
    if (language === 'en') return item.en;
    return item.es;
  };

  // Category title helper
  const getCategoryBadge = (catKey) => {
    const cat = LIFE_WONDERS_CATEGORIES[catKey];
    if (!cat) return '';
    if (language === 'de') return cat.badgeDe || cat.de;
    if (language === 'en') return cat.badgeEn || cat.en;
    return cat.badge || cat.es;
  };

  return (
    <div className="life-wonders-section animate-fade-in">
      {/* Hero Card */}
      <div className="life-wonders-hero-card glass-panel">
        <div className="wonders-hero-top">
          <div className="wonders-hero-kicker font-serif">
            <Gift size={15} className="wonders-hero-sparkle" />
            <span>{t.tag || 'Hitos Extraordinarios & Serendipias'}</span>
          </div>
          <span className="wonders-badge-pill font-serif">
            {stats.lived} / {stats.total} {t.statsCompleted || 'Vividas'}
          </span>
        </div>

        <h3 className="wonders-hero-title font-serif">
          {t.title || 'Descubrimientos & Sorpresas'}
        </h3>
        <p className="wonders-hero-sub">
          {t.subtitle || '26 maravillas sublimes de la vida que en general deberían suceder pero se postergan. Un mapa íntimo para sintonizar, anhelar y celebrar cada hito.'}
        </p>

        {/* Progress Bar & Stats Meter */}
        <div className="wonders-progress-wrapper">
          <div className="wonders-progress-bar-bg">
            <div 
              className="wonders-progress-bar-fill" 
              style={{ width: `${Math.max(stats.percentage, 4)}%` }}
            />
          </div>
          <div className="wonders-stats-strip">
            <div className="stat-pill lived" onClick={() => setActiveFilter('lived')}>
              <span className="dot dot-lived" />
              <span className="stat-count">{stats.lived}</span>
              <span className="stat-lbl">{t.statusLived || '¡Vivido! 🎉'}</span>
            </div>
            <div className="stat-pill in-progress">
              <span className="dot dot-in-progress" />
              <span className="stat-count">{stats.inProgress}</span>
              <span className="stat-lbl">{t.statusInProgress || 'En Camino'}</span>
            </div>
            <div className="stat-pill dream">
              <span className="dot dot-dream" />
              <span className="stat-count">{stats.dream}</span>
              <span className="stat-lbl">{t.statusDream || 'Por Vivir'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Oracle of Destiny & Surprise (Oráculo Rasca & Descubre) */}
      <div className="wonders-oracle-container glass-panel">
        <div className="oracle-header">
          <div className="oracle-kicker font-serif">
            <Sparkles size={14} />
            <span>{t.oracleTag || 'Oráculo del Destino'}</span>
          </div>
          <h4 className="oracle-title font-serif">{t.oracleTitle || 'Oráculo de la Sorpresa & el Destino'}</h4>
          <p className="oracle-subtitle">
            {t.oracleSubtitle || 'Toca el velo dorado para desvelar una maravilla que inspire tu día presente.'}
          </p>
        </div>

        <div className={`oracle-stage-card ${isOracleRevealed ? 'revealed' : 'veiled'}`}>
          {!isOracleRevealed ? (
            <div className="oracle-veil-overlay" onClick={handleRevealOracle}>
              <div className="oracle-veil-shimmer" />
              <div className="oracle-veil-seal">
                <span className="seal-letter font-serif">26</span>
              </div>
              <p className="veil-hint font-serif">{t.veilHint || 'Un hito sagrado te aguarda bajo el velo dorado...'}</p>
              <button 
                type="button" 
                className="reveal-wonder-btn font-serif"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRevealOracle();
                }}
              >
                <Sparkles size={15} />
                <span>{t.revealBtn || 'Revelar Sorpresa del Destino'}</span>
              </button>
            </div>
          ) : (
            <div className="oracle-revealed-content animate-fade-in">
              <div className="revealed-top-meta">
                <span className="oracle-wonder-num font-serif">Nº {oracleWonder.num}</span>
                <span className="oracle-cat-badge">
                  {getCategoryBadge(oracleWonder.category)}
                </span>
                <button 
                  className="oracle-fav-btn"
                  onClick={() => handleToggleFavorite(oracleWonder.id)}
                  title="Favorito"
                >
                  <Star 
                    size={15} 
                    fill={oracleWonder.favorite ? '#DDA15E' : 'none'} 
                    color={oracleWonder.favorite ? '#DDA15E' : '#B5A8A4'} 
                  />
                </button>
              </div>

              <h3 className="oracle-wonder-title font-serif">
                {getContent(oracleWonder).title}
              </h3>
              <p className="oracle-wonder-sub font-serif">
                “{getContent(oracleWonder).subtitle}”
              </p>
              <p className="oracle-wonder-desc">
                {getContent(oracleWonder).desc}
              </p>

              <div className="oracle-actions-row">
                <div className="oracle-status-selector">
                  <button 
                    className={`mini-status-chip dream ${oracleWonder.status === 'dream' ? 'active' : ''}`}
                    onClick={() => handleCycleStatus(oracleWonder.id, 'dream')}
                  >
                    ⚪ {t.statusDream || 'Por Vivir'}
                  </button>
                  <button 
                    className={`mini-status-chip in-progress ${oracleWonder.status === 'in_progress' ? 'active' : ''}`}
                    onClick={() => handleCycleStatus(oracleWonder.id, 'in_progress')}
                  >
                    ✨ {t.statusInProgress || 'En Camino'}
                  </button>
                  <button 
                    className={`mini-status-chip lived ${oracleWonder.status === 'lived' ? 'active' : ''}`}
                    onClick={() => handleCycleStatus(oracleWonder.id, 'lived')}
                  >
                    💖 {t.statusLived || '¡Vivido!'}
                  </button>
                </div>

                <div className="oracle-ctrl-btns">
                  <button 
                    className="oracle-shuffle-btn"
                    onClick={handleShuffleOracle}
                    title={t.shuffleBtn || 'Extraer otra sorpresa'}
                  >
                    <RotateCw size={14} />
                    <span>{t.shuffleBtn || 'Otra sorpresa'}</span>
                  </button>
                  <button 
                    className="oracle-hide-btn"
                    onClick={() => { playSoftTap(); setIsOracleRevealed(false); }}
                  >
                    <Eye size={14} />
                    <span>{t.hideVeilBtn || 'Cubrir'}</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Filter Bar */}
      <div className="wonders-filter-bar">
        <button
          className={`wonders-filter-chip ${activeFilter === 'all' ? 'active' : ''}`}
          onClick={() => { playSoftTap(); setActiveFilter('all'); }}
        >
          <span>🎁 {t.filterAll || 'Todas (26)'}</span>
        </button>

        <button
          className={`wonders-filter-chip ${activeFilter === 'maternity_bonds' ? 'active' : ''}`}
          onClick={() => { playSoftTap(); setActiveFilter('maternity_bonds'); }}
        >
          <span>{getCategoryBadge('maternity_bonds')}</span>
        </button>

        <button
          className={`wonders-filter-chip ${activeFilter === 'material_sanctuaries' ? 'active' : ''}`}
          onClick={() => { playSoftTap(); setActiveFilter('material_sanctuaries'); }}
        >
          <span>{getCategoryBadge('material_sanctuaries')}</span>
        </button>

        <button
          className={`wonders-filter-chip ${activeFilter === 'travel_nature' ? 'active' : ''}`}
          onClick={() => { playSoftTap(); setActiveFilter('travel_nature'); }}
        >
          <span>{getCategoryBadge('travel_nature')}</span>
        </button>

        <button
          className={`wonders-filter-chip ${activeFilter === 'euphoric_news' ? 'active' : ''}`}
          onClick={() => { playSoftTap(); setActiveFilter('euphoric_news'); }}
        >
          <span>{getCategoryBadge('euphoric_news')}</span>
        </button>

        <button
          className={`wonders-filter-chip ${activeFilter === 'serendipity_soul' ? 'active' : ''}`}
          onClick={() => { playSoftTap(); setActiveFilter('serendipity_soul'); }}
        >
          <span>{getCategoryBadge('serendipity_soul')}</span>
        </button>

        <button
          className={`wonders-filter-chip highlight-lived ${activeFilter === 'lived' ? 'active' : ''}`}
          onClick={() => { playSoftTap(); setActiveFilter('lived'); }}
        >
          <span>🎉 {t.filterLived || 'Ya Vividas'} ({stats.lived})</span>
        </button>

        <button
          className={`wonders-filter-chip highlight-fav ${activeFilter === 'favorites' ? 'active' : ''}`}
          onClick={() => { playSoftTap(); setActiveFilter('favorites'); }}
        >
          <span>⭐ {t.filterFavorites || 'Favoritas'} ({stats.favorites})</span>
        </button>
      </div>

      {/* Wonders Grid (26 Fine Art Luxury Cards) */}
      <div className="wonders-grid">
        {filteredWonders.length === 0 ? (
          <div className="empty-wonders-card glass-panel">
            <Sparkles size={26} className="empty-sparkle-icon" />
            <p className="empty-text font-serif">
              {t.emptyState || 'No se encontraron maravillas con este filtro.'}
            </p>
          </div>
        ) : (
          filteredWonders.map((wonder) => {
            const content = getContent(wonder);
            const isExpanded = expandedNotesId === wonder.id;
            const isLived = wonder.status === 'lived';
            const isInProgress = wonder.status === 'in_progress';

            return (
              <div 
                key={wonder.id} 
                className={`wonder-card glass-panel status-${wonder.status} ${celebrationToast === wonder.id ? 'pulse-celebration' : ''}`}
              >
                {/* Top Bar: Number, Category, Favorite */}
                <div className="wonder-card-top">
                  <div className="wonder-num-and-cat">
                    <span className="wonder-num-badge font-serif">{wonder.num}</span>
                    <span className="wonder-cat-tag">
                      {getCategoryBadge(wonder.category)}
                    </span>
                  </div>

                  <button 
                    className="wonder-fav-btn"
                    onClick={() => handleToggleFavorite(wonder.id)}
                    aria-label="Toggle Favorite"
                  >
                    <Star 
                      size={14} 
                      fill={wonder.favorite ? '#DDA15E' : 'none'} 
                      color={wonder.favorite ? '#DDA15E' : '#B5A8A4'} 
                    />
                  </button>
                </div>

                {/* Wonder Content */}
                <div className="wonder-card-body">
                  <h4 className="wonder-card-title font-serif">{content.title}</h4>
                  <p className="wonder-card-subtitle font-serif">“{content.subtitle}”</p>
                  <p className="wonder-card-desc">{content.desc}</p>
                </div>

                {/* Status Segmented Control */}
                <div className="wonder-status-bar">
                  <button 
                    className={`wonder-status-pill dream ${wonder.status === 'dream' ? 'active' : ''}`}
                    onClick={() => handleCycleStatus(wonder.id, 'dream')}
                    title={t.statusDream || 'Por Vivir'}
                  >
                    <span className="status-dot" />
                    <span>{t.statusDream || 'Por Vivir'}</span>
                  </button>

                  <button 
                    className={`wonder-status-pill in-progress ${wonder.status === 'in_progress' ? 'active' : ''}`}
                    onClick={() => handleCycleStatus(wonder.id, 'in_progress')}
                    title={t.statusInProgress || 'En Camino'}
                  >
                    <span className="status-dot" />
                    <span>{t.statusInProgress || 'En Camino'}</span>
                  </button>

                  <button 
                    className={`wonder-status-pill lived ${wonder.status === 'lived' ? 'active' : ''}`}
                    onClick={() => handleCycleStatus(wonder.id, 'lived')}
                    title={t.statusLived || '¡Vivido!'}
                  >
                    <span className="status-dot" />
                    <span>{t.statusLived || '¡Vivido! 🎉'}</span>
                  </button>
                </div>

                {/* Notes Accordion Toggle */}
                <div className="wonder-accordion-trigger-row">
                  <button 
                    className={`wonder-notes-toggle-btn ${isExpanded ? 'active' : ''}`}
                    onClick={() => {
                      playSoftTap();
                      setExpandedNotesId(isExpanded ? null : wonder.id);
                    }}
                  >
                    <Feather size={12} />
                    <span>
                      {wonder.personalNote ? (
                        <strong>{t.notesBtn || 'Nota Personal'} •</strong>
                      ) : (
                        t.notesBtn || 'Nota Personal & Recuerdo'
                      )}
                    </span>
                    {isExpanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                  </button>
                  {isLived && (
                    <span className="lived-celebration-stamp font-serif">
                      ✨ {t.statusLived || 'Vivido'}
                    </span>
                  )}
                </div>

                {/* Expandable Notes Drawer */}
                {isExpanded && (
                  <div className="wonder-notes-drawer animate-fade-in">
                    <textarea 
                      className="wonder-note-textarea font-serif"
                      rows={3}
                      placeholder={t.notesPlaceholder || '¿Cuándo ocurrió? ¿Cómo lo imaginas? ¿Con quién?'}
                      value={wonder.personalNote || ''}
                      onChange={(e) => handleUpdateNote(wonder.id, e.target.value)}
                    />
                    <div className="wonder-note-actions">
                      {savedNotesToastId === wonder.id && (
                        <span className="saved-note-confirm">
                          <Check size={12} /> {t.notesSaved || 'Guardada'}
                        </span>
                      )}
                      <button 
                        className="save-note-btn"
                        onClick={() => handleSaveNoteAction(wonder.id)}
                      >
                        <Check size={12} />
                        <span>{t.saveNotes || 'Guardar Nota'}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
