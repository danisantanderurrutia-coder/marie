import React, { useState, useEffect, useMemo } from 'react';
import { 
  Heart, 
  Sparkles, 
  Plus, 
  Trash2, 
  Edit3, 
  RotateCw, 
  Check, 
  Copy, 
  Star, 
  Globe, 
  Compass, 
  Flame, 
  Feather,
  X,
  BookOpen
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useLanguage } from '../context/LanguageContext';
import { INITIAL_SELF_LOVE_WORDS, SELF_LOVE_CATEGORIES } from '../data/selfLoveWords';
import { playSoftChime, playSoftTap } from '../utils/audio';

const STORAGE_KEY = 'marie_self_love_words';

export default function SelfLoveSection({ soundEnabled }) {
  const { language, currentStrings } = useLanguage();
  const t = currentStrings?.selfLove || {};

  // Words list state with localStorage
  const [words, setWords] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : INITIAL_SELF_LOVE_WORDS;
    } catch (e) {
      return INITIAL_SELF_LOVE_WORDS;
    }
  });

  // Filter state: 'all' | 'worth' | 'softness' | 'body' | 'freedom' | 'favorites'
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Daily Oracle index
  const [dailyIndex, setDailyIndex] = useState(0);

  // Global toggle for viewing German original on cards (when viewing in ES or EN)
  const [showGermanOriginal, setShowGermanOriginal] = useState(false);

  // Modal states: 'add' | 'edit' | null
  const [modalMode, setModalMode] = useState(null);
  const [editingItem, setEditingItem] = useState(null);

  // Form states
  const [formCategory, setFormCategory] = useState('worth');
  const [formBadge, setFormBadge] = useState('👑 Grenzen');
  const [formDeText, setFormDeText] = useState('');
  const [formDeMantra, setFormDeMantra] = useState('');
  const [formEsText, setFormEsText] = useState('');
  const [formEsMantra, setFormEsMantra] = useState('');
  const [formEnText, setFormEnText] = useState('');
  const [formEnMantra, setFormEnMantra] = useState('');

  // Toast / feedback states
  const [copiedMantraId, setCopiedMantraId] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  // Persist to localStorage whenever words change
  const persistWords = (newWords) => {
    setWords(newWords);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newWords));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
  };

  // Filtered list
  const filteredWords = useMemo(() => {
    if (selectedCategory === 'favorites') {
      return words.filter((w) => w.favorite);
    }
    if (selectedCategory === 'all') {
      return words;
    }
    return words.filter((w) => w.category === selectedCategory);
  }, [words, selectedCategory]);

  // Daily Oracle item
  const dailyWord = words[dailyIndex % words.length] || words[0];

  const handleShuffleDaily = () => {
    playSoftTap();
    if (soundEnabled) playSoftChime();
    setDailyIndex((prev) => (prev + 1) % words.length);
  };

  const handleToggleFavorite = (id) => {
    playSoftTap();
    const updated = words.map((w) => (w.id === id ? { ...w, favorite: !w.favorite } : w));
    persistWords(updated);
    if (soundEnabled) playSoftChime();
  };

  const handleCopyMantra = (mantraText, id) => {
    playSoftTap();
    navigator.clipboard.writeText(mantraText);
    setCopiedMantraId(id);
    setTimeout(() => setCopiedMantraId(null), 2200);
  };

  // Open modal for Adding
  const handleOpenAdd = () => {
    playSoftTap();
    setFormCategory('worth');
    setFormBadge('👑 Grenzen');
    setFormDeText('');
    setFormDeMantra('');
    setFormEsText('');
    setFormEsMantra('');
    setFormEnText('');
    setFormEnMantra('');
    setEditingItem(null);
    setModalMode('add');
  };

  // Open modal for Editing
  const handleOpenEdit = (item) => {
    playSoftTap();
    setEditingItem(item);
    setFormCategory(item.category || 'worth');
    setFormBadge(item.badge || '✨ Rose');
    setFormDeText(item.de?.text || '');
    setFormDeMantra(item.de?.mantra || '');
    setFormEsText(item.es?.text || '');
    setFormEsMantra(item.es?.mantra || '');
    setFormEnText(item.en?.text || '');
    setFormEnMantra(item.en?.mantra || '');
    setModalMode('edit');
  };

  // Submit Modal (Add or Edit)
  const handleSubmitModal = (e) => {
    e.preventDefault();
    if (!formDeText.trim() && !formEsText.trim() && !formEnText.trim()) return;
    if (soundEnabled) playSoftChime();

    // Fill cross-language fallbacks if user only types in one language
    const deText = formDeText.trim() || formEsText.trim() || formEnText.trim();
    const deMantra = formDeMantra.trim() || formEsMantra.trim() || formEnMantra.trim();
    const esText = formEsText.trim() || formDeText.trim() || formEnText.trim();
    const esMantra = formEsMantra.trim() || formDeMantra.trim() || formEnMantra.trim();
    const enText = formEnText.trim() || formDeText.trim() || formEsText.trim();
    const enMantra = formEnMantra.trim() || formDeMantra.trim() || formEsMantra.trim();

    if (modalMode === 'add') {
      const newEntry = {
        id: `slw-${Date.now()}`,
        category: formCategory,
        badge: formBadge.trim() || '✨ Rose',
        de: { text: deText, mantra: deMantra },
        es: { text: esText, mantra: esMantra },
        en: { text: enText, mantra: enMantra },
        favorite: false
      };
      persistWords([newEntry, ...words]);
      confetti({ particleCount: 35, spread: 60, origin: { y: 0.65 } });
    } else if (modalMode === 'edit' && editingItem) {
      const updated = words.map((w) => {
        if (w.id === editingItem.id) {
          return {
            ...w,
            category: formCategory,
            badge: formBadge.trim() || w.badge,
            de: { text: deText, mantra: deMantra },
            es: { text: esText, mantra: esMantra },
            en: { text: enText, mantra: enMantra }
          };
        }
        return w;
      });
      persistWords(updated);
    }

    setModalMode(null);
    setEditingItem(null);
  };

  // Delete Action
  const handleDeleteWord = (id) => {
    playSoftTap();
    const updated = words.filter((w) => w.id !== id);
    persistWords(updated);
    setDeleteConfirmId(null);
  };

  // Helper to get active text/mantra for card rendering
  const getCardContent = (word) => {
    // If showGermanOriginal is active, show German directly
    if (showGermanOriginal || language === 'de') {
      return {
        text: word.de?.text || word.es?.text || word.en?.text,
        mantra: word.de?.mantra || word.es?.mantra || word.en?.mantra,
        isDe: true
      };
    }
    if (language === 'en') {
      return {
        text: word.en?.text || word.de?.text,
        mantra: word.en?.mantra || word.de?.mantra,
        isDe: false
      };
    }
    // Default Spanish
    return {
      text: word.es?.text || word.de?.text,
      mantra: word.es?.mantra || word.de?.mantra,
      isDe: false
    };
  };

  const activeDaily = getCardContent(dailyWord);

  return (
    <div className="self-love-section animate-fade-in">
      {/* Hero Header */}
      <div className="self-love-hero-card glass-panel">
        <div className="self-love-hero-top">
          <span className="self-love-tag font-serif">🌹 {t.tag || 'Selbstwert & Grenzen'}</span>
          <div className="self-love-hero-actions">
            {language !== 'de' && (
              <button
                className={`german-toggle-pill ${showGermanOriginal ? 'active' : ''}`}
                onClick={() => {
                  playSoftTap();
                  setShowGermanOriginal(!showGermanOriginal);
                }}
                title={showGermanOriginal ? t.showTranslationToggle : t.showGermanToggle}
              >
                <Globe size={13} />
                <span>{showGermanOriginal ? 'DE Original ✓' : 'DE Original'}</span>
              </button>
            )}
            <button className="add-affirmation-pill-btn" onClick={handleOpenAdd}>
              <Plus size={14} />
              <span>{t.addNewWord || 'Escribir afirmación'}</span>
            </button>
          </div>
        </div>
        <h3 className="self-love-title font-serif">{t.title || 'Worte der Selbstliebe'}</h3>
        <p className="self-love-sub">
          {t.subtitle || 'Afirmaciones poéticas para honrar tu soberanía, descansar en tu verdad y recordar quién eres.'}
        </p>
      </div>

      {/* Daily Oracle Card */}
      {dailyWord && (
        <div className="daily-oracle-card glass-panel">
          <div className="oracle-glow-backdrop" />
          <div className="daily-oracle-header">
            <div className="daily-oracle-badge-group">
              <span className="oracle-kicker-pill">
                <Sparkles size={12} /> {t.dailyOracleTitle || 'Oráculo del Día para Marie'}
              </span>
              <span className="oracle-cat-pill">{dailyWord.badge}</span>
            </div>
            <div className="daily-oracle-top-btns">
              <button
                className="oracle-icon-btn shuffle-btn"
                onClick={handleShuffleDaily}
                title={t.shuffleOracle || 'Revelar otro'}
              >
                <RotateCw size={14} />
              </button>
              <button
                className={`oracle-icon-btn fav-btn ${dailyWord.favorite ? 'is-fav' : ''}`}
                onClick={() => handleToggleFavorite(dailyWord.id)}
                title="Favorito"
              >
                <Heart size={15} fill={dailyWord.favorite ? 'currentColor' : 'none'} />
              </button>
            </div>
          </div>

          <div className="daily-oracle-body">
            <p className="daily-oracle-text font-serif">“{activeDaily.text}”</p>
            {activeDaily.mantra && (
              <div className="daily-oracle-mantra-box">
                <div className="mantra-text-wrap">
                  <span className="mantra-label font-serif">Mantra:</span>
                  <span className="mantra-content font-serif">{activeDaily.mantra}</span>
                </div>
                <button
                  className="copy-mantra-btn"
                  onClick={() => handleCopyMantra(activeDaily.mantra, dailyWord.id)}
                  title={t.copyMantra || 'Copiar'}
                >
                  {copiedMantraId === dailyWord.id ? (
                    <Check size={14} className="copied-check" />
                  ) : (
                    <Copy size={14} />
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Subtext with German Original if viewing translation */}
          {!activeDaily.isDe && dailyWord.de?.text && (
            <div className="daily-oracle-de-sub">
              <span className="de-original-label">Wortlaut auf Deutsch:</span>
              <p className="de-original-quote font-serif">„{dailyWord.de.text}“</p>
            </div>
          )}
        </div>
      )}

      {/* Category Filter Bar */}
      <div className="self-love-filter-bar">
        <div className="filter-chips-scroll">
          <button
            className={`filter-chip ${selectedCategory === 'all' ? 'active' : ''}`}
            onClick={() => { playSoftTap(); setSelectedCategory('all'); }}
          >
            <span>✨ {t.filterAll || 'Todas'}</span>
            <span className="chip-count">({words.length})</span>
          </button>
          <button
            className={`filter-chip ${selectedCategory === 'favorites' ? 'active' : ''}`}
            onClick={() => { playSoftTap(); setSelectedCategory('favorites'); }}
          >
            <Heart size={13} fill={selectedCategory === 'favorites' ? 'currentColor' : 'none'} />
            <span>{t.filterFavorites || '⭐ Favoritas'}</span>
            <span className="chip-count">({words.filter((w) => w.favorite).length})</span>
          </button>
          <button
            className={`filter-chip ${selectedCategory === 'worth' ? 'active' : ''}`}
            onClick={() => { playSoftTap(); setSelectedCategory('worth'); }}
          >
            <span>👑 {t.categories?.worth || 'Selbstwert'}</span>
          </button>
          <button
            className={`filter-chip ${selectedCategory === 'softness' ? 'active' : ''}`}
            onClick={() => { playSoftTap(); setSelectedCategory('softness'); }}
          >
            <span>🌿 {t.categories?.softness || 'Sanftheit'}</span>
          </button>
          <button
            className={`filter-chip ${selectedCategory === 'body' ? 'active' : ''}`}
            onClick={() => { playSoftTap(); setSelectedCategory('body'); }}
          >
            <span>🌹 {t.categories?.body || 'Körperliebe'}</span>
          </button>
          <button
            className={`filter-chip ${selectedCategory === 'freedom' ? 'active' : ''}`}
            onClick={() => { playSoftTap(); setSelectedCategory('freedom'); }}
          >
            <span>🔥 {t.categories?.freedom || 'Souveränität'}</span>
          </button>
        </div>
      </div>

      {/* Words Grid / List */}
      <div className="self-love-grid">
        {filteredWords.length === 0 ? (
          <div className="empty-self-love-card glass-panel">
            <Sparkles size={24} className="empty-sparkle-icon" />
            <p className="empty-text font-serif">
              {selectedCategory === 'favorites'
                ? t.emptyFavorites || 'Aún no tienes afirmaciones marcadas como favoritas. Toca el corazón 🤍 en cualquiera de ellas.'
                : t.emptyList || 'No hay afirmaciones en esta categoría.'}
            </p>
          </div>
        ) : (
          filteredWords.map((item) => {
            const cardContent = getCardContent(item);
            return (
              <div key={item.id} className="self-love-card glass-panel">
                <div className="card-top-row">
                  <span className="card-badge-pill">{item.badge}</span>
                  <div className="card-action-btns">
                    <button
                      className={`card-action-btn fav-btn ${item.favorite ? 'is-fav' : ''}`}
                      onClick={() => handleToggleFavorite(item.id)}
                      title="Favorito"
                    >
                      <Heart size={14} fill={item.favorite ? 'currentColor' : 'none'} />
                    </button>
                    <button
                      className="card-action-btn edit-btn"
                      onClick={() => handleOpenEdit(item)}
                      title={t.edit || 'Editar'}
                    >
                      <Edit3 size={14} />
                    </button>
                    <button
                      className="card-action-btn delete-btn"
                      onClick={() => setDeleteConfirmId(item.id)}
                      title={t.delete || 'Eliminar'}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                {deleteConfirmId === item.id ? (
                  <div className="delete-confirm-box animate-fade-in">
                    <p className="delete-confirm-text">{t.confirmDelete || '¿Eliminar afirmación?'}</p>
                    <div className="delete-confirm-actions">
                      <button className="delete-yes-btn" onClick={() => handleDeleteWord(item.id)}>
                        {t.delete || 'Eliminar'}
                      </button>
                      <button className="delete-no-btn" onClick={() => setDeleteConfirmId(null)}>
                        {t.cancel || 'Cancelar'}
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="card-affirmation-text font-serif">“{cardContent.text}”</p>

                    {cardContent.mantra && (
                      <div className="card-mantra-pill">
                        <span className="card-mantra-label font-serif">Mantra:</span>
                        <span className="card-mantra-text font-serif">{cardContent.mantra}</span>
                        <button
                          className="mini-copy-btn"
                          onClick={() => handleCopyMantra(cardContent.mantra, item.id)}
                          title="Copiar mantra"
                        >
                          {copiedMantraId === item.id ? <Check size={12} /> : <Copy size={12} />}
                        </button>
                      </div>
                    )}

                    {!cardContent.isDe && item.de?.text && (
                      <div className="card-de-footnote">
                        <span className="de-label">DE:</span>
                        <span className="de-text font-serif">„{item.de.text}“</span>
                      </div>
                    )}
                  </>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Add / Edit Modal */}
      {modalMode && (
        <div className="self-love-modal-backdrop animate-fade-in" onClick={() => setModalMode(null)}>
          <div className="self-love-modal-content glass-panel" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-row">
              <h4 className="modal-title font-serif">
                {modalMode === 'add' ? t.modalAddTitle : t.modalEditTitle}
              </h4>
              <button className="modal-close-btn" onClick={() => setModalMode(null)}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmitModal} className="modal-form">
              <div className="form-group-row">
                <div className="form-field half">
                  <label className="field-label">{t.categoryLabel || 'Categoría'}</label>
                  <select
                    className="modal-select"
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                  >
                    <option value="worth">👑 {t.categories?.worth || 'Selbstwert & Grenzen'}</option>
                    <option value="softness">🌿 {t.categories?.softness || 'Sanftheit & Ruhe'}</option>
                    <option value="body">🌹 {t.categories?.body || 'Körperliebe & Tempel'}</option>
                    <option value="freedom">🔥 {t.categories?.freedom || 'Souveränität & Entfaltung'}</option>
                  </select>
                </div>

                <div className="form-field half">
                  <label className="field-label">{t.badgeLabel || 'Distintivo / Emoji'}</label>
                  <input
                    type="text"
                    className="modal-input"
                    placeholder="👑 Grenzen, 🌿 Ruhe, ✨ Kraft..."
                    value={formBadge}
                    onChange={(e) => setFormBadge(e.target.value)}
                  />
                </div>
              </div>

              {/* German (Original) */}
              <div className="language-fieldset de-fieldset">
                <span className="fieldset-badge">🇩🇪 Deutsch (Original)</span>
                <div className="form-field">
                  <label className="field-label">{t.germanTextLabel || 'Deutscher Text'}</label>
                  <textarea
                    className="modal-textarea"
                    rows={2}
                    placeholder="Mein Wert ist kein Verhandlungsgut..."
                    value={formDeText}
                    onChange={(e) => setFormDeText(e.target.value)}
                  />
                </div>
                <div className="form-field">
                  <label className="field-label">{t.germanMantraLabel || 'Deutsches Mantra'}</label>
                  <input
                    type="text"
                    className="modal-input"
                    placeholder="Ich bin genug, genau hier, genau jetzt."
                    value={formDeMantra}
                    onChange={(e) => setFormDeMantra(e.target.value)}
                  />
                </div>
              </div>

              {/* Spanish Translation */}
              <div className="language-fieldset es-fieldset">
                <span className="fieldset-badge">🇪🇸 Español</span>
                <div className="form-field">
                  <label className="field-label">{t.spanishTextLabel || 'Traducción al Español'}</label>
                  <textarea
                    className="modal-textarea"
                    rows={2}
                    placeholder="Mi valor no es negociable..."
                    value={formEsText}
                    onChange={(e) => setFormEsText(e.target.value)}
                  />
                </div>
                <div className="form-field">
                  <label className="field-label">{t.spanishMantraLabel || 'Mantra en Español'}</label>
                  <input
                    type="text"
                    className="modal-input"
                    placeholder="Soy suficiente, justo aquí, justo ahora."
                    value={formEsMantra}
                    onChange={(e) => setFormEsMantra(e.target.value)}
                  />
                </div>
              </div>

              {/* English Translation */}
              <div className="language-fieldset en-fieldset">
                <span className="fieldset-badge">🇬🇧 English</span>
                <div className="form-field">
                  <label className="field-label">{t.englishTextLabel || 'English Translation'}</label>
                  <textarea
                    className="modal-textarea"
                    rows={2}
                    placeholder="My worth is non-negotiable..."
                    value={formEnText}
                    onChange={(e) => setFormEnText(e.target.value)}
                  />
                </div>
                <div className="form-field">
                  <label className="field-label">{t.englishMantraLabel || 'English Mantra'}</label>
                  <input
                    type="text"
                    className="modal-input"
                    placeholder="I am enough, right here, right now."
                    value={formEnMantra}
                    onChange={(e) => setFormEnMantra(e.target.value)}
                  />
                </div>
              </div>

              <div className="modal-actions-row">
                <button
                  type="button"
                  className="modal-btn-cancel"
                  onClick={() => setModalMode(null)}
                >
                  {t.cancel || 'Cancelar'}
                </button>
                <button type="submit" className="modal-btn-submit">
                  {modalMode === 'add' ? t.submitAdd : t.submitEdit}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
