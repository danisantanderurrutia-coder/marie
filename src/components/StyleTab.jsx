import React, { useState } from 'react';
import { STYLE_ARCHETYPES } from '../data/appData';
import { Sparkles, Shirt, Palette, Shuffle, Check, Heart, Plus, Trash2 } from 'lucide-react';
import { playSoftChime, playSoftTap } from '../utils/audio';

const WARDROBE_CHALLENGES = [
  'Viste hoy un total look monocromático en tonos claros o tierra.',
  'Combina dos prendas que nunca antes hayas usado juntas.',
  'Usa una prenda que guardas "solo para ocasiones especiales" en un día normal.',
  'Elige tu ropa empezando por los zapatos y construye hacia arriba.',
  'Ponte una joya o pañuelo que tenga una textura que ames tocar.',
  'Ponte tu fragancia favorita antes de vestirte, como si fuera una segunda piel.'
];

export default function StyleTab({ soundEnabled }) {
  const [selectedArchetypeId, setSelectedArchetypeId] = useState(STYLE_ARCHETYPES[0].id);
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [lookbookNotes, setLookbookNotes] = useState(() => {
    try {
      const saved = localStorage.getItem('marie_lookbook_notes');
      return saved ? JSON.parse(saved) : [
        { id: 1, text: 'Pantalón lino crudo + top de seda negro + aros dorados finos. Me sentí super magnética.', date: '3 Sep' },
        { id: 2, text: 'Quiero probar un labial cereza suave con ropa en tonos arena.', date: '1 Sep' }
      ];
    } catch (e) {
      return [];
    }
  });
  const [newNoteInput, setNewNoteInput] = useState('');
  const [activeTab, setActiveTab] = useState('archetypes'); // 'archetypes' | 'lookbook'

  const currentArchetype = STYLE_ARCHETYPES.find((a) => a.id === selectedArchetypeId) || STYLE_ARCHETYPES[0];

  const handleShuffleChallenge = () => {
    playSoftTap();
    setCurrentChallengeIndex((prev) => (prev + 1) % WARDROBE_CHALLENGES.length);
  };

  const handleAddLookbookNote = () => {
    if (!newNoteInput.trim()) return;
    if (soundEnabled) playSoftChime();
    const newNote = {
      id: Date.now(),
      text: newNoteInput.trim(),
      date: 'Hoy'
    };
    const updated = [newNote, ...lookbookNotes];
    setLookbookNotes(updated);
    setNewNoteInput('');
    try {
      localStorage.setItem('marie_lookbook_notes', JSON.stringify(updated));
    } catch (e) {}
  };

  const handleDeleteNote = (id) => {
    playSoftTap();
    const updated = lookbookNotes.filter(n => n.id !== id);
    setLookbookNotes(updated);
    try {
      localStorage.setItem('marie_lookbook_notes', JSON.stringify(updated));
    } catch (e) {}
  };

  return (
    <div className="tab-content animate-fade-in">
      {/* Sub tabs */}
      <div className="subtabs-bar">
        <button 
          className={`subtab-btn ${activeTab === 'archetypes' ? 'active' : ''}`}
          onClick={() => { playSoftTap(); setActiveTab('archetypes'); }}
        >
          <Palette size={14} />
          <span>Arquetipos & Color</span>
        </button>
        <button 
          className={`subtab-btn ${activeTab === 'lookbook' ? 'active' : ''}`}
          onClick={() => { playSoftTap(); setActiveTab('lookbook'); }}
        >
          <Heart size={14} />
          <span>Mi Lookbook ({lookbookNotes.length})</span>
        </button>
      </div>

      {activeTab === 'archetypes' ? (
        <>
          {/* Daily Wardrobe Challenge Card */}
          <div className="challenge-card glass-panel">
            <div className="challenge-top">
              <span className="challenge-badge">
                <Shirt size={13} /> Reto de Armario de Hoy
              </span>
              <button className="shuffle-btn" onClick={handleShuffleChallenge} title="Cambiar reto">
                <Shuffle size={14} />
              </button>
            </div>
            <p className="challenge-text font-serif">
              "{WARDROBE_CHALLENGES[currentChallengeIndex]}"
            </p>
            <span className="challenge-tip">Pruébalo frente al espejo con curiosidad y cero juicio.</span>
          </div>

          {/* Archetype Selector Chips */}
          <div className="section-title-group">
            <h3 className="section-title font-serif">Explora tu Arquetipo de Estilo</h3>
            <p className="section-desc">Toca cada uno para ver su paleta, sensaciones y texturas.</p>
          </div>

          <div className="archetype-chips-row screen-scroll">
            {STYLE_ARCHETYPES.map((arch) => (
              <button
                key={arch.id}
                className={`archetype-chip ${selectedArchetypeId === arch.id ? 'selected' : ''}`}
                onClick={() => {
                  playSoftTap();
                  setSelectedArchetypeId(arch.id);
                }}
              >
                {arch.name.split('&')[0].trim()}
              </button>
            ))}
          </div>

          {/* Detailed Archetype View */}
          <div className="archetype-detail-card glass-panel">
            <div className="archetype-detail-header">
              <h4 className="archetype-name font-serif">{currentArchetype.name}</h4>
              <p className="archetype-tagline">{currentArchetype.tagline}</p>
            </div>

            {/* Color Swatches */}
            <div className="palette-section">
              <span className="palette-title">Tus colores de poder:</span>
              <div className="palette-grid">
                {currentArchetype.palette.map((colorHex, idx) => (
                  <div key={colorHex} className="swatch-item">
                    <div 
                      className="swatch-color" 
                      style={{ backgroundColor: colorHex }} 
                      title={currentArchetype.paletteNames[idx]}
                    />
                    <span className="swatch-label">{currentArchetype.paletteNames[idx]}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sensations & Textures */}
            <div className="archetype-specs-list">
              <div className="spec-row">
                <span className="spec-name">Texturas clave:</span>
                <span className="spec-val">{currentArchetype.textures}</span>
              </div>
              <div className="spec-row">
                <span className="spec-name">Cómo te hace sentir:</span>
                <span className="spec-val">{currentArchetype.vibe}</span>
              </div>
            </div>

            <div className="archetype-challenge-box">
              <span className="challenge-box-tag">Micro-experimento de hoy:</span>
              <p className="challenge-box-text">"{currentArchetype.challenge}"</p>
            </div>
          </div>
        </>
      ) : (
        /* Lookbook view */
        <div className="lookbook-view">
          <div className="lookbook-input-card glass-panel">
            <h4 className="lookbook-input-title font-serif">Anota un look o sensación</h4>
            <p className="lookbook-input-desc">¿Qué te pusiste que te hizo sentir segura, libre o sexy?</p>
            <textarea
              className="lookbook-textarea"
              placeholder="Ej: El blazer oversized con top blanco me hizo sentir que soy dueña de mi tiempo..."
              value={newNoteInput}
              onChange={(e) => setNewNoteInput(e.target.value)}
              rows={3}
            />
            <button 
              className="add-look-btn"
              onClick={handleAddLookbookNote}
              disabled={!newNoteInput.trim()}
            >
              <Plus size={15} /> Guardar en mi álbum
            </button>
          </div>

          <div className="lookbook-feed">
            {lookbookNotes.length === 0 ? (
              <p className="empty-lookbook">Aún no tienes notas guardadas. ¡Anota tu primera sensación arriba!</p>
            ) : (
              lookbookNotes.map((item) => (
                <div key={item.id} className="look-entry-card glass-panel">
                  <div className="look-entry-top">
                    <span className="look-date-tag">{item.date}</span>
                    <button 
                      className="delete-note-btn" 
                      onClick={() => handleDeleteNote(item.id)}
                      title="Eliminar"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                  <p className="look-entry-body">{item.text}</p>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
