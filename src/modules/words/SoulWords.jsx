// src/modules/words/SoulWords.jsx
// "Wortschatz der Seele / Palabras del Alma" — aesthetic treasury of evocative words.
// Local-only, private, exquisitely styled.

import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Sparkles, 
  Plus, 
  Heart, 
  Trash2, 
  BookOpen, 
  Check, 
  X,
  Compass
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { playSoftTap, playSoftChime } from '../../utils/audio';

const INITIAL_WORDS = [
  {
    id: 'sobremesa',
    word: 'Sobremesa',
    lang: 'Español',
    meaning: 'El arte de quedarse charlando alrededor de la mesa después de comer, sin mirar el reloj. El tiempo suspendido entre risas, vino y complicidad.',
    note: 'El tiempo que no se mide en minutos, sino en miradas compartidas.',
    favorite: true
  },
  {
    id: 'querencia',
    word: 'Querencia',
    lang: 'Español',
    meaning: 'El lugar o la persona donde el alma se siente segura, fuerte y en casa. El rincón al que siempre quieres volver para recobrar el aliento.',
    note: 'Donde no necesitas fingir nada.',
    favorite: true
  },
  {
    id: 'apapachar',
    word: 'Apapachar',
    lang: 'Español / Náhuatl',
    meaning: 'Acariciar o abrazar con el alma. Más que un contacto físico, es envolver a alguien con ternura pura.',
    note: 'Un abrazo que cura el cansancio invisible.',
    favorite: false
  },
  {
    id: 'saudade',
    word: 'Saudade',
    lang: 'Português',
    meaning: 'La presencia viva de una ausencia amada. Una nostalgia dulce que no duele con amargura, sino con gratitud por lo vivido.',
    note: 'Sentir cerca lo que está lejos en el mapa.',
    favorite: false
  },
  {
    id: 'geborgenheit',
    word: 'Geborgenheit',
    lang: 'Deutsch',
    meaning: 'Das unaussprechliche Gefühl von vollkommenem Schutz, innerer Wärme, Geborgen-Sein und tiefem Vertrauen.',
    note: 'Zuhause im eigenen Herzen und in den Armen des anderen.',
    favorite: true
  },
  {
    id: 'duende',
    word: 'Duende',
    lang: 'Español (Andalucía)',
    meaning: 'Ese misterioso hechizo que eriza la piel cuando el arte, la música o una mirada son absolutamente auténticos y desgarradores.',
    note: 'La chispa inexplicable que no se puede fabricar con la mente.',
    favorite: false
  },
  {
    id: 'meraki',
    word: 'Meraki',
    lang: 'Griego (Μεράκι)',
    meaning: 'Poner el alma, la creatividad y un pedacito de tu propio amor en cualquier cosa que hagas, por pequeña que sea.',
    note: 'Hacer las cosas con devoción silenciosa.',
    favorite: false
  }
];

export default function SoulWords({ onBack, soundEnabled }) {
  const { t } = useLanguage();
  const [filter, setFilter] = useState('all'); // 'all' | 'spanish' | 'others' | 'favs'
  const [showModal, setShowModal] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Load words from localStorage or initialize
  const [words, setWords] = useState(() => {
    try {
      const saved = localStorage.getItem('marie_soul_words');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return INITIAL_WORDS;
  });

  // Modal form states
  const [newWord, setNewWord] = useState('');
  const [newLang, setNewLang] = useState('Español');
  const [newMeaning, setNewMeaning] = useState('');
  const [newNote, setNewNote] = useState('');

  const saveWordsToStorage = (updated) => {
    setWords(updated);
    try {
      localStorage.setItem('marie_soul_words', JSON.stringify(updated));
    } catch (e) {}
  };

  const handleToggleFavorite = (id) => {
    if (soundEnabled) playSoftTap();
    const updated = words.map(w => w.id === id ? { ...w, favorite: !w.favorite } : w);
    saveWordsToStorage(updated);
  };

  const handleDeleteWord = (id) => {
    if (window.confirm(t('words.deleteConfirm'))) {
      if (soundEnabled) playSoftTap();
      const updated = words.filter(w => w.id !== id);
      saveWordsToStorage(updated);
    }
  };

  const handleAddWord = (e) => {
    e.preventDefault();
    if (!newWord.trim()) return;

    if (soundEnabled) playSoftChime();

    const created = {
      id: `word_${Date.now()}`,
      word: newWord.trim(),
      lang: newLang.trim() || 'Español',
      meaning: newMeaning.trim(),
      note: newNote.trim(),
      favorite: true,
      custom: true
    };

    const updated = [created, ...words];
    saveWordsToStorage(updated);

    setNewWord('');
    setNewMeaning('');
    setNewNote('');
    setShowModal(false);

    setToastMessage(t('words.savedToast'));
    setTimeout(() => setToastMessage(''), 2400);
  };

  // Filter words
  const filteredWords = words.filter(w => {
    if (filter === 'spanish') return w.lang.toLowerCase().includes('español');
    if (filter === 'others') return !w.lang.toLowerCase().includes('español');
    if (filter === 'favs') return w.favorite;
    return true;
  });

  return (
    <div className="mx-screen animate-fade-in" style={{ paddingBottom: 40 }}>
      {/* Top Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <button className="mx-back" onClick={onBack} style={{ cursor: 'pointer' }}>
          <ArrowLeft size={18} aria-hidden="true" /> {t('common.back')}
        </button>
        <span 
          className="mx-badge"
          style={{ background: 'rgba(155, 89, 182, 0.15)', color: '#9B59B6', border: '1px solid rgba(155, 89, 182, 0.3)' }}
        >
          {t('words.kicker')}
        </span>
      </div>

      <header style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 className="mx-title" style={{ margin: 0 }}>
            {t('words.title')}
          </h1>
          <button 
            className="mx-btn warm small"
            onClick={() => { playSoftTap(); setShowModal(true); }}
            style={{ borderRadius: 16, padding: '6px 12px' }}
          >
            <Plus size={14} /> <span>{t('words.addNewBtn')}</span>
          </button>
        </div>
        <p className="mx-lead" style={{ marginTop: 4, fontSize: 14 }}>
          {t('words.lead')}
        </p>
      </header>

      {/* Filter Chips */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 16, overflowX: 'auto', paddingBottom: 4 }}>
        {[
          { id: 'all', label: t('words.filterAll') },
          { id: 'spanish', label: t('words.filterSpanish') },
          { id: 'others', label: t('words.filterOthers') },
          { id: 'favs', label: '♥ Favoritas' }
        ].map(f => (
          <button
            key={f.id}
            type="button"
            className={`mx-badge ${filter === f.id ? 'active' : ''}`}
            onClick={() => { playSoftTap(); setFilter(f.id); }}
            style={{
              cursor: 'pointer',
              background: filter === f.id ? 'rgba(216, 74, 88, 0.25)' : 'rgba(255, 255, 255, 0.04)',
              color: filter === f.id ? '#FFF' : '#C0B8AA',
              border: filter === f.id ? '1px solid #D84A58' : '1px solid rgba(255, 255, 255, 0.08)',
              padding: '5px 12px',
              borderRadius: 14,
              fontSize: 12
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Word Cards List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {filteredWords.map((item) => (
          <div 
            key={item.id}
            className="mx-card soft animate-fade-in"
            style={{
              padding: '18px 18px',
              borderLeft: '3px solid #9B59B6',
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(155, 89, 182, 0.05) 100%)',
              position: 'relative'
            }}
          >
            {/* Top Row: Word & Language Badge */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                <h2 
                  className="font-serif" 
                  style={{ 
                    fontSize: 22, 
                    margin: 0, 
                    color: '#FFF', 
                    letterSpacing: '0.02em',
                    fontWeight: 700 
                  }}
                >
                  {item.word}
                </h2>
                <span 
                  style={{ 
                    fontSize: 10.5, 
                    color: '#C5A081', 
                    background: 'rgba(197, 160, 129, 0.15)', 
                    padding: '2px 8px', 
                    borderRadius: 10,
                    fontWeight: 600
                  }}
                >
                  {item.lang}
                </span>
              </div>

              {/* Action Icons */}
              <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                <button
                  type="button"
                  onClick={() => handleToggleFavorite(item.id)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    color: item.favorite ? '#D84A58' : 'rgba(255, 255, 255, 0.25)',
                    padding: 4
                  }}
                >
                  <Heart size={16} fill={item.favorite ? '#D84A58' : 'none'} />
                </button>
                {item.custom && (
                  <button
                    type="button"
                    onClick={() => handleDeleteWord(item.id)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      color: 'rgba(255, 255, 255, 0.25)',
                      padding: 4
                    }}
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            </div>

            {/* Meaning */}
            <p 
              className="font-serif"
              style={{ 
                margin: '8px 0 0', 
                color: '#EAE2D5', 
                fontSize: 14, 
                lineHeight: 1.55,
                fontStyle: 'normal'
              }}
            >
              {item.meaning}
            </p>

            {/* Personal Note */}
            {item.note && (
              <div 
                style={{ 
                  marginTop: 10, 
                  paddingTop: 8, 
                  borderTop: '1px solid rgba(255, 255, 255, 0.07)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 6,
                  color: '#C0B8AA',
                  fontSize: 12,
                  fontStyle: 'italic'
                }}
              >
                <Sparkles size={12} style={{ color: '#D84A58', flexShrink: 0 }} />
                <span>{item.note}</span>
              </div>
            )}
          </div>
        ))}

        {filteredWords.length === 0 && (
          <p className="mx-small" style={{ textAlign: 'center', color: '#90887A', margin: '30px 0' }}>
            {t('words.emptyState')}
          </p>
        )}
      </div>

      {/* Add Word Modal */}
      {showModal && (
        <div 
          className="animate-fade-in"
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(8px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 16
          }}
        >
          <div 
            className="mx-card"
            style={{
              maxWidth: 420,
              width: '100%',
              background: '#1C161E',
              border: '1px solid rgba(197, 160, 129, 0.3)',
              borderRadius: 16,
              padding: 20
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <h2 className="mx-h2" style={{ margin: 0, fontSize: 16 }}>
                {t('words.modalTitle')}
              </h2>
              <button 
                type="button" 
                onClick={() => setShowModal(false)}
                style={{ background: 'transparent', border: 'none', color: '#FFF', cursor: 'pointer' }}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddWord} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div>
                <label className="mx-small" style={{ color: '#C0B8AA', display: 'block', marginBottom: 4 }}>
                  {t('words.wordLabel')}
                </label>
                <input
                  type="text"
                  required
                  placeholder={t('words.wordPlaceholder')}
                  value={newWord}
                  onChange={(e) => setNewWord(e.target.value)}
                  className="mx-input"
                  style={{ width: '100%' }}
                />
              </div>

              <div>
                <label className="mx-small" style={{ color: '#C0B8AA', display: 'block', marginBottom: 4 }}>
                  {t('words.langLabel')}
                </label>
                <input
                  type="text"
                  placeholder={t('words.langPlaceholder')}
                  value={newLang}
                  onChange={(e) => setNewLang(e.target.value)}
                  className="mx-input"
                  style={{ width: '100%' }}
                />
              </div>

              <div>
                <label className="mx-small" style={{ color: '#C0B8AA', display: 'block', marginBottom: 4 }}>
                  {t('words.meaningLabel')}
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder={t('words.meaningPlaceholder')}
                  value={newMeaning}
                  onChange={(e) => setNewMeaning(e.target.value)}
                  className="mx-textarea"
                  style={{ width: '100%', fontSize: 13 }}
                />
              </div>

              <div>
                <label className="mx-small" style={{ color: '#C0B8AA', display: 'block', marginBottom: 4 }}>
                  {t('words.noteLabel')}
                </label>
                <input
                  type="text"
                  placeholder={t('words.notePlaceholder')}
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  className="mx-input"
                  style={{ width: '100%' }}
                />
              </div>

              <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                <button type="button" className="mx-btn ghost full" onClick={() => setShowModal(false)}>
                  {t('common.cancel') || 'Abbrechen'}
                </button>
                <button type="submit" className="mx-btn warm full">
                  <Check size={16} /> {t('words.saveWordBtn')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {toastMessage && (
        <p className="mx-toast animate-fade-in" role="status" style={{ marginTop: 12 }}>
          {toastMessage}
        </p>
      )}
    </div>
  );
}
