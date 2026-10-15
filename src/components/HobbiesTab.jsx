import React, { useState } from 'react';
import { 
  Compass, 
  Sparkles, 
  Clock, 
  RotateCw, 
  Plus, 
  Coffee, 
  Check, 
  Trash2, 
  Bookmark, 
  BookmarkCheck,
  Flame,
  Heart,
  Feather
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useLanguage } from '../context/LanguageContext';
import { playSoftChime, playSoftTap } from '../utils/audio';

// No pre-filled interests: the tracker starts empty so everything in it is really hers.
const INITIAL_TRACKED_INTERESTS = [];

export default function HobbiesTab({ soundEnabled }) {
  const { currentStrings } = useLanguage();
  const t = currentStrings?.hobbies || {};
  const sub = t.subtabs || {};
  const tracker = t.tracker || {};
  const r = t.roulette || {};
  const microHobbies = t.microHobbies || [];
  const soloDatesData = t.soloDates || {};

  const [selectedHobbyIndex, setSelectedHobbyIndex] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [activeSubView, setActiveSubView] = useState('tracker'); // 'tracker' | 'roulette' | 'dates'

  // Hobbies Tracker State
  const [trackedInterests, setTrackedInterests] = useState(() => {
    try {
      const saved = localStorage.getItem('marie_tracked_interests');
      return saved ? JSON.parse(saved) : INITIAL_TRACKED_INTERESTS;
    } catch (e) {
      return INITIAL_TRACKED_INTERESTS;
    }
  });

  const [newHobbyName, setNewHobbyName] = useState('');
  const [newHobbyCategory, setNewHobbyCategory] = useState(tracker.categories?.[0] || 'Creativo');
  const [newHobbyFeeling, setNewHobbyFeeling] = useState(tracker.feelings?.[0] || '🔥 Me encantó');
  const [newHobbyNotes, setNewHobbyNotes] = useState('');
  const [isAddingHobby, setIsAddingHobby] = useState(false);
  const [saveHobbyToast, setSaveHobbyToast] = useState(false);
  const [bookedDates, setBookedDates] = useState({});

  const hobbiesCount = microHobbies.length || 5;
  const currentHobby = microHobbies[selectedHobbyIndex % hobbiesCount] || microHobbies[0] || {};

  // Check if current hobby is already in tracked interests
  const isCurrentHobbySaved = trackedInterests.some(
    (item) => item.name?.toLowerCase() === currentHobby.title?.toLowerCase()
  );

  const handleSpinRoulette = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    playSoftTap();

    let counter = 0;
    const interval = setInterval(() => {
      setSelectedHobbyIndex((prev) => (prev + 1) % hobbiesCount);
      counter++;
      if (counter > 12) {
        clearInterval(interval);
        setIsSpinning(false);
        if (soundEnabled) playSoftChime();
        confetti({ particleCount: 25, spread: 45, origin: { y: 0.55 } });
      }
    }, 75);
  };

  const handleSaveHobbyDirectly = () => {
    if (!currentHobby.title || isCurrentHobbySaved) return;
    playSoftTap();
    if (soundEnabled) playSoftChime();

    const newEntry = {
      id: Date.now(),
      name: currentHobby.title,
      category: currentHobby.sensoryTag || 'Sensorial',
      feeling: '🔥 Me encantó',
      notes: currentHobby.description || ''
    };

    const updated = [newEntry, ...trackedInterests];
    setTrackedInterests(updated);
    try {
      localStorage.setItem('marie_tracked_interests', JSON.stringify(updated));
    } catch (e) {}

    setSaveHobbyToast(true);
    setTimeout(() => setSaveHobbyToast(false), 2400);
    confetti({ particleCount: 35, spread: 55, origin: { y: 0.65 } });
  };

  const handleAddInterest = () => {
    if (!newHobbyName.trim()) return;
    if (soundEnabled) playSoftChime();

    const newEntry = {
      id: Date.now(),
      name: newHobbyName.trim(),
      category: newHobbyCategory,
      feeling: newHobbyFeeling,
      notes: newHobbyNotes.trim()
    };

    const updated = [newEntry, ...trackedInterests];
    setTrackedInterests(updated);
    try {
      localStorage.setItem('marie_tracked_interests', JSON.stringify(updated));
    } catch (e) {}

    setNewHobbyName('');
    setNewHobbyNotes('');
    setIsAddingHobby(false);
    confetti({ particleCount: 30, spread: 60, origin: { y: 0.6 } });
  };

  const handleDeleteInterest = (id) => {
    playSoftTap();
    const updated = trackedInterests.filter((i) => i.id !== id);
    setTrackedInterests(updated);
    try {
      localStorage.setItem('marie_tracked_interests', JSON.stringify(updated));
    } catch (e) {}
  };

  const handleBookDate = (idx) => {
    playSoftTap();
    if (soundEnabled) playSoftChime();
    setBookedDates((prev) => ({ ...prev, [idx]: true }));
    confetti({ particleCount: 28, spread: 50, origin: { y: 0.7 } });
  };

  const trackerCategories = tracker.categories || ['Creativo', 'Corporal', 'Sensorial', 'Naturaleza', 'Música'];
  const trackerFeelings = tracker.feelings || ['🔥 Me encantó', '🌿 Me dio paz', '✨ Agradable', '❌ No es para mí'];
  const soloDatesList = soloDatesData.items || [];

  return (
    <div className="tab-content animate-fade-in">
      {/* Segmented Subtabs Bar */}
      <div className="segmented-subtabs-bar">
        <button 
          className={`segmented-subtab-pill ${activeSubView === 'tracker' ? 'active' : ''}`}
          onClick={() => { playSoftTap(); setActiveSubView('tracker'); }}
        >
          <Compass size={14} />
          <span>{sub.interests || 'Mis Intereses'}</span>
          <span className="pill-badge">{trackedInterests.length}</span>
        </button>
        <button 
          className={`segmented-subtab-pill ${activeSubView === 'roulette' ? 'active' : ''}`}
          onClick={() => { playSoftTap(); setActiveSubView('roulette'); }}
        >
          <RotateCw size={14} className={isSpinning ? 'spin-icon-anim' : ''} />
          <span>{sub.roulette || 'Ruleta de Ideas'}</span>
        </button>
        <button 
          className={`segmented-subtab-pill ${activeSubView === 'dates' ? 'active' : ''}`}
          onClick={() => { playSoftTap(); setActiveSubView('dates'); }}
        >
          <Coffee size={14} />
          <span>{sub.dates || 'Solo Dates'}</span>
        </button>
      </div>

      {activeSubView === 'tracker' ? (
        /* Hobbies & Interests Tracker Timeline */
        <div className="hobbies-tracker-view">
          <div className="tracker-hero-card glass-panel">
            <span className="tracker-tag font-serif">🌿 {tracker.tag || 'Pétalo Verde Salvia'}</span>
            <h3 className="tracker-title font-serif">{tracker.heroTitle || 'Tu mapa de curiosidades'}</h3>
            <p className="tracker-sub">
              {tracker.heroSub || 'No tienes que ser experta en nada. Probar algo y descubrir que no te gusta también es autoconocimiento.'}
            </p>
            <button 
              className="add-interest-pill-btn"
              onClick={() => { playSoftTap(); setIsAddingHobby(!isAddingHobby); }}
            >
              <Plus size={15} />
              <span>{isAddingHobby ? (tracker.closeBtn || 'Cerrar') : (tracker.addBtn || 'Añadir interés o hobby')}</span>
            </button>
          </div>

          {/* New Hobby Form */}
          {isAddingHobby && (
            <div className="new-interest-modal glass-panel animate-fade-in">
              <h4 className="new-int-title font-serif">{tracker.modalTitle || '¿Qué probaste o te dio curiosidad?'}</h4>
              <input
                type="text"
                className="new-int-input"
                placeholder={tracker.namePlaceholder || 'Ej: Cerámica, baile latino, arreglos florales, escribir...'}
                value={newHobbyName}
                onChange={(e) => setNewHobbyName(e.target.value)}
              />

              <div className="int-form-row">
                <span className="form-sub-label">{tracker.catLabel || 'Categoría:'}</span>
                <div className="cat-pills-row">
                  {trackerCategories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      className={`cat-pill ${newHobbyCategory === cat ? 'active' : ''}`}
                      onClick={() => setNewHobbyCategory(cat)}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="int-form-row">
                <span className="form-sub-label">{tracker.feelLabel || '¿Cómo te hizo sentir?'}</span>
                <div className="cat-pills-row">
                  {trackerFeelings.map((feel) => (
                    <button
                      key={feel}
                      type="button"
                      className={`cat-pill ${newHobbyFeeling === feel ? 'active' : ''}`}
                      onClick={() => setNewHobbyFeeling(feel)}
                    >
                      {feel}
                    </button>
                  ))}
                </div>
              </div>

              <textarea
                className="new-int-textarea"
                placeholder={tracker.notesPlaceholder || 'Notas libres: ¿Qué te gustó? ¿Lo repetirías?'}
                value={newHobbyNotes}
                onChange={(e) => setNewHobbyNotes(e.target.value)}
                rows={2}
              />

              <button 
                className="submit-interest-btn" 
                onClick={handleAddInterest}
                disabled={!newHobbyName.trim()}
              >
                {tracker.submitBtn || 'Guardar en mi mapa de pasiones'}
              </button>
            </div>
          )}

          {/* Interests Timeline Cards */}
          <div className="interests-timeline-list">
            {trackedInterests.length === 0 ? (
              <div className="empty-self-love-card glass-panel">
                <Sparkles size={24} className="empty-sparkle-icon" />
                <p className="empty-text font-serif">{tracker.emptyState || 'Aún no has guardado intereses.'}</p>
              </div>
            ) : (
              trackedInterests.map((item) => (
                <div key={item.id} className="interest-item-card glass-panel">
                  <div className="interest-card-top">
                    <div className="interest-meta">
                      <span className="int-cat-badge">{item.category}</span>
                      <span className="int-feel-badge">{item.feeling}</span>
                    </div>
                    <button 
                      className="delete-int-btn"
                      onClick={() => handleDeleteInterest(item.id)}
                      title="Eliminar"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                  <h4 className="interest-name font-serif">{item.name}</h4>
                  {item.notes && <p className="interest-notes">"{item.notes}"</p>}
                </div>
              ))
            )}
          </div>
        </div>
      ) : activeSubView === 'roulette' ? (
        /* Elevated Interactive Sensory Oracle */
        <div className="roulette-oracle-experience animate-fade-in">
          <div className="oracle-hero-card glass-panel">
            <div className="oracle-sphere-centerpiece">
              <div className={`oracle-ring-aura ${isSpinning ? 'spinning' : ''}`}>
                <div className="oracle-inner-core">
                  <Sparkles size={26} className="oracle-sparkle-pulse" />
                </div>
              </div>
            </div>

            <span className="oracle-tag font-serif">✨ {r.oracleTag || 'Oráculo Sensorial'}</span>
            <h3 className="oracle-hero-title font-serif">{currentHobby.title}</h3>
            <p className="oracle-prompt">
              {isSpinning 
                ? (r.spinningText || 'Sintonizando inspiración...') 
                : (r.prompt || '¿Deseas inspiración? Gira el oráculo para despertar un micro-experimento sensorial hoy.')}
            </p>

            <div className="oracle-controls-row">
              <button 
                className={`spin-oracle-btn ${isSpinning ? 'spinning' : ''}`}
                onClick={handleSpinRoulette}
                disabled={isSpinning}
              >
                <RotateCw size={16} className={isSpinning ? 'spin-icon-anim' : ''} />
                <span>{isSpinning ? (r.spinningText || 'Sintonizando...') : (r.spinBtn || 'Girar Oráculo Sensorial (15 min)')}</span>
              </button>

              <button
                className={`save-oracle-interest-btn ${isCurrentHobbySaved ? 'saved' : ''}`}
                onClick={handleSaveHobbyDirectly}
                disabled={isCurrentHobbySaved || isSpinning}
                title={isCurrentHobbySaved ? r.alreadySavedBtn : r.saveBtn}
              >
                {isCurrentHobbySaved ? (
                  <>
                    <BookmarkCheck size={16} />
                    <span>{r.savedBtn || 'Guardado'}</span>
                  </>
                ) : (
                  <>
                    <Bookmark size={16} />
                    <span>{r.saveBtn || 'Guardar en Mis Intereses'}</span>
                  </>
                )}
              </button>
            </div>

            {saveHobbyToast && (
              <div className="save-toast-pill animate-fade-in">
                <Check size={13} /> {r.toastSaved || '¡Añadido a tu mapa de curiosidades!'}
              </div>
            )}
          </div>

          {/* Fine Art Result Card */}
          <div className="fine-art-hobby-card glass-panel">
            <div className="fine-art-header">
              <div className="hobby-tags-row">
                <span className="hobby-tag-pill time">
                  <Clock size={12} /> {currentHobby.time}
                </span>
                <span className="hobby-tag-pill sensory">
                  {currentHobby.sensoryTag}
                </span>
                <span className="hobby-tag-pill diff">
                  {currentHobby.difficulty}
                </span>
              </div>
              <h3 className="fine-art-title font-serif">{currentHobby.title}</h3>
              <p className="fine-art-desc">{currentHobby.description}</p>
            </div>

            {/* Sensory Step by Step */}
            {currentHobby.steps && currentHobby.steps.length > 0 && (
              <div className="hobby-steps-box">
                <span className="steps-heading font-serif">{r.stepsLabel || 'Paso a paso sensorial:'}</span>
                <ol className="steps-list">
                  {currentHobby.steps.map((step, idx) => (
                    <li key={idx} className="step-item">
                      <span className="step-number font-serif">{idx + 1}</span>
                      <span className="step-content">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {/* Why It Nourishes Marie */}
            {currentHobby.whyYouWillLoveIt && (
              <div className="why-love-it-box">
                <span className="why-title font-serif">🌹 {r.whyLoveLabel || 'Por qué te nutre:'}</span>
                <p className="why-text">{currentHobby.whyYouWillLoveIt}</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Solo Dates View */
        <div className="solo-dates-container">
          <div className="dates-header-box glass-panel">
            <span className="tracker-tag font-serif">☕ {sub.dates || 'Solo Dates'}</span>
            <h3 className="dates-title font-serif">{soloDatesData.headerTitle || 'Citas de Autodescubrimiento'}</h3>
            <p className="dates-sub">
              {soloDatesData.headerSub || 'Llevarte a ti misma a una cita es la forma más pura de romance propio.'}
            </p>
          </div>

          <div className="dates-cards-list">
            {soloDatesList.map((dateItem, idx) => {
              const isBooked = bookedDates[idx];
              return (
                <div key={idx} className="solo-date-card glass-panel">
                  <div className="solo-date-top">
                    <span className="solo-date-badge font-serif">{dateItem.vibe}</span>
                    <span className="solo-date-budget">{dateItem.budget}</span>
                  </div>
                  <h4 className="solo-date-name font-serif">{dateItem.title}</h4>
                  <p className="solo-date-desc">{dateItem.desc}</p>
                  <div className="solo-date-action">
                    <button 
                      className={`plan-date-pill ${isBooked ? 'booked' : ''}`}
                      onClick={() => handleBookDate(idx)}
                      disabled={isBooked}
                    >
                      {isBooked ? (
                        <>
                          <Check size={14} />
                          <span>{soloDatesData.bookedText || 'Anotada en tu visión'}</span>
                        </>
                      ) : (
                        <span>{soloDatesData.planBtn || 'Agendar para este fin de semana'}</span>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
