import React, { useState, useEffect } from 'react';
import { 
  User, 
  Sparkles, 
  Heart, 
  Flame, 
  Compass, 
  Flower2, 
  Calendar, 
  Save, 
  Check, 
  TrendingUp, 
  Edit3, 
  RefreshCw, 
  ChevronDown, 
  ChevronUp,
  Clock
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { playSoftChime, playSoftTap } from '../utils/audio';

export default function ProfileTab({ soundEnabled }) {
  const { language, currentStrings } = useLanguage();
  const t = currentStrings?.profile || {};

  const dimensionsConfig = [
    {
      key: 'skinBody',
      label: language === 'de' ? 'Körper & Haut' : language === 'en' ? 'Skin & Body' : 'Piel & Cuerpo',
      emoji: '🌸',
      color: '#7DA3BE',
      descMin: language === 'de' ? 'Sensibel / Müde' : language === 'en' ? 'Sensitive / Tired' : 'Sensible / Cansada',
      descMax: language === 'de' ? 'Strahlend & Harmonisch' : language === 'en' ? 'Radiant & Balanced' : 'Radiante & En armonía'
    },
    {
      key: 'fireAura',
      label: language === 'de' ? 'Feuer & Souveränität' : language === 'en' ? 'Fire & Sovereignty' : 'Fuego & Soberanía',
      emoji: '⚡',
      color: '#D84A58',
      descMin: language === 'de' ? 'Wenig Energie' : language === 'en' ? 'Low energy' : 'Baja energía',
      descMax: language === 'de' ? 'Magnetisch & Kraftvoll' : language === 'en' ? 'Magnetic & Sovereign' : 'Magnética & Poderosa'
    },
    {
      key: 'peaceMind',
      label: language === 'de' ? 'Seelenruhe & Gelassenheit' : language === 'en' ? 'Peace of Mind' : 'Paz Mental & Cero Culpa',
      emoji: '🌿',
      color: '#6E8C6E',
      descMin: language === 'de' ? 'Mentaler Lärm' : language === 'en' ? 'Noise / Pressure' : 'Ruido / Autoexigencia',
      descMax: language === 'de' ? 'Seren & Entspannt' : language === 'en' ? 'Serene & Free' : 'Serena & A mi ritmo'
    },
    {
      key: 'curiosity',
      label: language === 'de' ? 'Neugier & Kreativität' : language === 'en' ? 'Curiosity & Play' : 'Curiosidad & Creatividad',
      emoji: '🎨',
      color: '#D97706',
      descMin: language === 'de' ? 'Routiniert' : language === 'en' ? 'Routine' : 'Rutinaria / Apagada',
      descMax: language === 'de' ? 'Inspiriert & Verspielt' : language === 'en' ? 'Inspired & Playful' : 'Inspirada & Curiosa'
    },
    {
      key: 'dreams',
      label: language === 'de' ? 'Seelenhorizont & Vision' : language === 'en' ? 'Soul Horizon & Vision' : 'Conexión con Sueños',
      emoji: '✨',
      color: '#8B8F94',
      descMin: language === 'de' ? 'Entfernt' : language === 'en' ? 'Disconnected' : 'Desconectada del rumbo',
      descMax: language === 'de' ? 'Klar & Zuversichtlich' : language === 'en' ? 'Vibrant & Clear' : 'Ilusionada & Clara'
    }
  ];

  const questionsList = t.questions || [
    '¿Qué necesitó hoy tu cuerpo y de qué manera pudiste escucharlo o cuidarlo?',
    '¿Qué pequeña victoria o instante de disfrute viviste hoy sin culpa alguna?',
    '¿Qué límite pusiste hoy para cuidar tu paz mental o tu espacio?',
    '¿En qué momento del día te sentiste más genuinamente tú misma?',
    'Si te miraras hoy con los ojos de quien más te ama y admira, ¿qué verías?',
    '¿Qué te gustaría soltar o dejar ir antes de cerrar este día?'
  ];

  // Personal Data & Editable Motto
  const [personalMotto, setPersonalMotto] = useState(() => {
    return localStorage.getItem('marie_personal_motto') || 
      'Suave como los pétalos de una rosa, libre como el viento y soberana con mis espinas.';
  });
  const [isEditingMotto, setIsEditingMotto] = useState(false);
  const [tempMotto, setTempMotto] = useState(personalMotto);

  // Daily multidimensional test state
  const [scores, setScores] = useState({
    skinBody: 4,
    fireAura: 4,
    peaceMind: 4,
    curiosity: 3,
    dreams: 4
  });

  const [questionIndex, setQuestionIndex] = useState(0);
  const [reflectionAnswer, setReflectionAnswer] = useState('');
  const [isSavedToday, setIsSavedToday] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState('test'); // 'test' | 'evolution'

  // Evolution history
  const [history, setHistory] = useState(() => {
    try {
      const saved = localStorage.getItem('marie_evolution_history');
      if (saved) return JSON.parse(saved);
      return [
        {
          id: 'test-2',
          date: 'Ayer',
          timestamp: Date.now() - 86400000,
          scores: { skinBody: 4, fireAura: 5, peaceMind: 3, curiosity: 4, dreams: 4 },
          average: 4.0,
          question: '¿Qué pequeña victoria viviste hoy sin culpa alguna?',
          answer: 'Me tomé 30 minutos enteros para leer y ponerme crema sin mirar el móvil ni sentir que debía estar trabajando.'
        },
        {
          id: 'test-1',
          date: '5 Sep',
          timestamp: Date.now() - 172800000,
          scores: { skinBody: 3, fireAura: 4, peaceMind: 4, curiosity: 3, dreams: 5 },
          average: 3.8,
          question: '¿En qué momento del día te sentiste más genuinamente tú misma?',
          answer: 'Eligiendo mi ropa con música alta en mi habitación, combinando el jersey suave con botas.'
        }
      ];
    } catch (e) {
      return [];
    }
  });

  const [expandedHistoryId, setExpandedHistoryId] = useState(null);

  const handleScoreChange = (dimKey, value) => {
    playSoftTap();
    setScores(prev => ({ ...prev, [dimKey]: value }));
  };

  const handleNextQuestion = () => {
    playSoftTap();
    setQuestionIndex((prev) => (prev + 1) % questionsList.length);
  };

  const handleSaveMotto = () => {
    if (soundEnabled) playSoftChime();
    setPersonalMotto(tempMotto);
    setIsEditingMotto(false);
    try {
      localStorage.setItem('marie_personal_motto', tempMotto);
    } catch (e) {}
  };

  const handleSaveDailyTest = () => {
    if (soundEnabled) playSoftChime();
    const dateLoc = language === 'de' ? 'de-DE' : language === 'en' ? 'en-US' : 'es-ES';
    const todayFormatted = new Intl.DateTimeFormat(dateLoc, { 
      day: 'numeric', 
      month: 'short' 
    }).format(new Date());

    const values = Object.values(scores);
    const avg = (values.reduce((a, b) => a + b, 0) / values.length).toFixed(1);

    const newEntry = {
      id: `test-${Date.now()}`,
      date: `Today (${todayFormatted})`,
      timestamp: Date.now(),
      scores: { ...scores },
      average: parseFloat(avg),
      question: questionsList[questionIndex % questionsList.length],
      answer: reflectionAnswer.trim() || 'Log saved with tender self-awareness.'
    };

    const updated = [newEntry, ...history.filter(h => !h.date.startsWith('Today') && !h.date.startsWith('Hoy'))];
    setHistory(updated);
    setIsSavedToday(true);

    try {
      localStorage.setItem('marie_evolution_history', JSON.stringify(updated));
    } catch (e) {}

    setTimeout(() => setIsSavedToday(false), 3000);
  };

  const totalDays = history.length;
  const overallAverage = history.length > 0
    ? (history.reduce((acc, h) => acc + h.average, 0) / history.length).toFixed(1)
    : '4.0';

  return (
    <div className="tab-content profile-tab-container animate-fade-in">
      {/* Marie's Identity Header Card */}
      <div className="profile-identity-card glass-panel">
        <div className="profile-avatar-row">
          <div className="profile-avatar-aura">
            <div className="profile-avatar-rose">
              <img src="/logo_04.png" alt="Marie Logo 04" className="profile-avatar-img" />
            </div>
            <span className="profile-online-glow"></span>
          </div>

          <div className="profile-info-stack">
            <div className="profile-name-badge">
              <h2 className="profile-name font-serif">Marie</h2>
              <span className="profile-role-tag">
                {language === 'de' ? 'Souverän & Frei' : language === 'en' ? 'Sovereign & Free' : 'Soberana & Libre'}
              </span>
            </div>
            <div className="profile-fav-flower">
              <Flower2 size={13} color="#D84A58" />
              <span>
                {language === 'de' ? 'Lieblingsblume:' : language === 'en' ? 'Fav Flower:' : 'Flor Predilecta:'}{' '}
                <strong>Wild Roses (Rosas Silvestres)</strong>
              </span>
            </div>
            <div className="profile-soul-palette">
              <span className="palette-label">
                {language === 'de' ? 'Seelenpalette:' : language === 'en' ? 'Soul Palette:' : 'Paleta del Alma:'}
              </span>
              <div className="palette-dots">
                <span className="palette-dot" style={{ background: '#D84A58' }} title="Rojo Silvestre" />
                <span className="palette-dot" style={{ background: '#7DA3BE' }} title="Azul Serena" />
                <span className="palette-dot" style={{ background: '#6E8C6E' }} title="Verde Salvia" />
                <span className="palette-dot" style={{ background: '#8B8F94' }} title="Gris Perlado" />
              </div>
            </div>
          </div>
        </div>

        {/* Motto / Current Intention with inline edit */}
        <div className="profile-motto-box">
          {isEditingMotto ? (
            <div className="motto-edit-group">
              <textarea
                className="motto-textarea"
                value={tempMotto}
                onChange={(e) => setTempMotto(e.target.value)}
                rows={2}
                placeholder="Escribe tu intención o lema personal..."
              />
              <div className="motto-actions">
                <button className="motto-btn save" onClick={handleSaveMotto}>
                  <Check size={14} /> {language === 'de' ? 'Speichern' : language === 'en' ? 'Save' : 'Guardar'}
                </button>
                <button className="motto-btn cancel" onClick={() => setIsEditingMotto(false)}>
                  {language === 'de' ? 'Abbrechen' : language === 'en' ? 'Cancel' : 'Cancelar'}
                </button>
              </div>
            </div>
          ) : (
            <div className="motto-display-row" onClick={() => { setIsEditingMotto(true); setTempMotto(personalMotto); }}>
              <p className="profile-motto font-serif">“{personalMotto}”</p>
              <button className="motto-edit-trigger" title="Editar lema">
                <Edit3 size={13} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Sub navigation bar */}
      <div className="profile-subnav">
        <button 
          className={`profile-nav-btn ${activeSubTab === 'test' ? 'active' : ''}`}
          onClick={() => { playSoftTap(); setActiveSubTab('test'); }}
        >
          <Sparkles size={14} />
          <span>{t.dimensionsTitle || 'Test Diario'}</span>
        </button>
        <button 
          className={`profile-nav-btn ${activeSubTab === 'evolution' ? 'active' : ''}`}
          onClick={() => { playSoftTap(); setActiveSubTab('evolution'); }}
        >
          <TrendingUp size={14} />
          <span>
            {language === 'de' ? 'Entwicklung' : language === 'en' ? 'Evolution' : 'Evolución'} ({totalDays})
          </span>
        </button>
      </div>

      {/* TEST DIARIO MULTIDIMENSIONAL */}
      {activeSubTab === 'test' && (
        <div className="profile-section-block animate-fade-in">
          <div className="section-header-row">
            <div>
              <h3 className="section-title font-serif">{t.heroTitle || 'Barómetro de Autodescubrimiento'}</h3>
              <p className="section-subtitle">{t.heroSub || '¿Cómo se siente Marie hoy en cada una de sus dimensiones?'}</p>
            </div>
            <div className="today-badge">
              <Calendar size={13} />
              <span>{language === 'de' ? 'Heute' : language === 'en' ? 'Today' : 'Hoy'}</span>
            </div>
          </div>

          {/* Dimension Sliders / Selectors */}
          <div className="dimension-cards-list">
            {dimensionsConfig.map((dim) => {
              const currentVal = scores[dim.key] || 3;
              return (
                <div key={dim.key} className="dimension-eval-card glass-panel">
                  <div className="dimension-card-head">
                    <div className="dim-title-group">
                      <span className="dim-emoji">{dim.emoji}</span>
                      <div>
                        <span className="dim-name font-serif">{dim.label}</span>
                        <span className="dim-desc-minmax">
                          {currentVal <= 2 ? dim.descMin : currentVal >= 4 ? dim.descMax : (language === 'de' ? 'Im Gleichgewicht' : language === 'en' ? 'In balance' : 'En equilibrio')}
                        </span>
                      </div>
                    </div>
                    <span 
                      className="dim-val-badge"
                      style={{ background: `${dim.color}20`, color: dim.color, border: `1px solid ${dim.color}50` }}
                    >
                      {currentVal} / 5
                    </span>
                  </div>

                  {/* 1 to 5 interactive steps */}
                  <div className="dim-steps-row">
                    {[1, 2, 3, 4, 5].map((val) => {
                      const isChosen = currentVal === val;
                      return (
                        <button
                          key={val}
                          className={`dim-step-btn ${isChosen ? 'chosen' : ''}`}
                          style={isChosen ? { background: dim.color, borderColor: dim.color, color: '#FFF' } : {}}
                          onClick={() => handleScoreChange(dim.key, val)}
                        >
                          {val}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Introspective Question of the Day */}
          <div className="deep-question-card glass-panel">
            <div className="question-header">
              <div className="q-badge">
                <Heart size={13} color="#D84A58" />
                <span>{t.questionsTitle || 'Pregunta para Conocerme Mejor'}</span>
              </div>
              <button className="q-shuffle-btn" onClick={handleNextQuestion} title="Otra pregunta">
                <RefreshCw size={13} />
                <span>{t.nextQuestionBtn || 'Cambiar'}</span>
              </button>
            </div>

            <p className="question-text font-serif">
              "{questionsList[questionIndex % questionsList.length]}"
            </p>

            <textarea
              className="question-response-area"
              value={reflectionAnswer}
              onChange={(e) => setReflectionAnswer(e.target.value)}
              placeholder={t.reflectionPlaceholder || 'Escribe lo que sientas aquí... Sin juicios ni prisas.'}
              rows={3}
            />
          </div>

          {/* Save Action */}
          <button 
            className={`save-daily-test-btn ${isSavedToday ? 'saved-success' : ''}`}
            onClick={handleSaveDailyTest}
          >
            {isSavedToday ? (
              <>
                <Check size={18} />
                <span>{t.savedToast || '¡Guardado en tu evolución personal!'}</span>
              </>
            ) : (
              <>
                <Save size={18} />
                <span>{t.saveBarometerBtn || 'Registrar día en mi Evolución'}</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* EVOLUCIÓN & HISTORIAL */}
      {activeSubTab === 'evolution' && (
        <div className="profile-section-block animate-fade-in">
          {/* Quick Metrics */}
          <div className="metrics-summary-grid">
            <div className="metric-pill glass-panel">
              <span className="metric-num font-serif">{totalDays}</span>
              <span className="metric-lbl">{language === 'de' ? 'Tage erfasst' : language === 'en' ? 'Days logged' : 'Días registrados'}</span>
            </div>
            <div className="metric-pill glass-panel">
              <span className="metric-num font-serif" style={{ color: '#D84A58' }}>{overallAverage}</span>
              <span className="metric-lbl">{language === 'de' ? 'Gesamtschnitt' : language === 'en' ? 'Overall Avg' : 'Promedio general'}</span>
            </div>
            <div className="metric-pill glass-panel">
              <span className="metric-num font-serif" style={{ color: '#6E8C6E' }}>100%</span>
              <span className="metric-lbl">{language === 'de' ? 'Ohne Druck' : language === 'en' ? 'Zero Guilt' : 'Cero presión'}</span>
            </div>
          </div>

          {/* Visual Mini Chart */}
          <div className="evolution-chart-card glass-panel">
            <h4 className="chart-title font-serif">
              {language === 'de' ? 'Wohlbefinden-Tendenz' : language === 'en' ? 'Recent Wellbeing Trend' : 'Tendencia de Bienestar Reciente'}
            </h4>
            <div className="mini-bars-row">
              {history.slice(0, 7).reverse().map((h, idx) => {
                const heightPercent = (h.average / 5) * 100;
                return (
                  <div key={h.id || idx} className="chart-col">
                    <span className="chart-val">{h.average}</span>
                    <div className="bar-track">
                      <div 
                        className="bar-fill" 
                        style={{ 
                          height: `${heightPercent}%`,
                          background: h.average >= 4 ? 'linear-gradient(to top, #D84A58, #E27B86)' : '#7DA3BE'
                        }} 
                      />
                    </div>
                    <span className="chart-date">{h.date.replace(/Today\s*\(|Hoy\s*\(|\)/g, '')}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* History Accordion List */}
          <div className="history-entries-container">
            <h4 className="history-title font-serif">
              {language === 'de' ? 'Vergangene Tagebuch-Einträge' : language === 'en' ? 'Past Journal Logs' : 'Diario de Registros Pasados'}
            </h4>
            {history.map((entry) => {
              const isExpanded = expandedHistoryId === entry.id;
              return (
                <div key={entry.id} className="history-entry-card glass-panel">
                  <div 
                    className="history-entry-header"
                    onClick={() => { playSoftTap(); setExpandedHistoryId(isExpanded ? null : entry.id); }}
                  >
                    <div className="entry-main-info">
                      <div className="entry-date-chip">
                        <Clock size={12} />
                        <span>{entry.date}</span>
                      </div>
                      <span className="entry-avg-badge" style={{ color: '#D84A58' }}>
                        ★ {entry.average} / 5
                      </span>
                    </div>

                    <div className="entry-mini-dots">
                      {dimensionsConfig.map(d => (
                        <span 
                          key={d.key} 
                          className="history-dim-dot" 
                          style={{ background: d.color }}
                          title={`${d.label}: ${entry.scores?.[d.key] || '-'}`}
                        />
                      ))}
                      {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="history-expanded-body animate-fade-in">
                      <div className="breakdown-grid">
                        {dimensionsConfig.map(d => (
                          <div key={d.key} className="breakdown-pill">
                            <span>{d.emoji} {d.label}</span>
                            <strong>{entry.scores?.[d.key] || '-'}/5</strong>
                          </div>
                        ))}
                      </div>

                      {entry.question && (
                        <div className="history-qa-box">
                          <p className="history-q font-serif">"{entry.question}"</p>
                          <p className="history-a">{entry.answer}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
