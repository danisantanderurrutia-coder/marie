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
import { LOGO_04 } from '../utils/assets';

export default function ProfileTab({ soundEnabled, openModule }) {
  const { language, currentStrings } = useLanguage();
  const t = currentStrings?.profile || {};

  // Alternating mottos by moment in German, Spanish and English
  const TIME_MOTTOS = {
    morning: [
      {
        de: 'Heute muss ich nichts beweisen. Ich beginne in meinem eigenen Rhythmus.',
        es: 'Hoy no tengo nada que demostrar. Empiezo a mi propio ritmo.',
        en: 'Today I have nothing to prove. I begin at my own rhythm.'
      },
      {
        de: 'Klarer Geist, weiches Herz. Ein bewusster Atemzug nach dem anderen.',
        es: 'Mente clara, corazón suave. Una respiración consciente a la vez.',
        en: 'Clear mind, soft heart. One conscious breath at a time.'
      },
      {
        de: 'Ich bin nicht für die Eile der Welt verantwortlich, sondern für meinen eigenen Frieden.',
        es: 'No soy responsable de la prisa del mundo, sino de mi propia paz.',
        en: 'I am not responsible for the rush of the world, only for my own peace.'
      }
    ],
    afternoon: [
      {
        de: 'Meine Ideen dürfen unvollkommen sein – Hauptsache, sie dürfen atmen.',
        es: 'Mis ideas tienen derecho a ser imperfectas: lo importante es que puedan respirar.',
        en: 'My ideas are allowed to be imperfect – what matters is that they can breathe.'
      },
      {
        de: 'Ich bin nicht hier, um Erwartungen zu erfüllen, sondern um echt zu sein.',
        es: 'No estoy aquí para cumplir expectativas ajenas, sino para ser real.',
        en: 'I am not here to fulfill expectations, but to be authentic.'
      },
      {
        de: 'Ein einziger kleiner Schritt heute genügt. Das Große wächst im Stillen.',
        es: 'Un solo paso pequeño hoy es suficiente. Lo grande crece en el silencio.',
        en: 'A single small step today is enough. Big things grow in stillness.'
      }
    ],
    evening: [
      {
        de: 'Ich darf die Rüstung ablegen. Was heute getan wurde, ist genug.',
        es: 'Puedo soltar la armadura. Lo que hice hoy ya es suficiente.',
        en: 'I can take off the armor. What was done today is enough.'
      },
      {
        de: 'Weich wie Rosenblätter, frei wie der Wind – und mit Dornen, wenn ich sie brauche.',
        es: 'Suave como los pétalos de una rosa, libre como el viento y con espinas cuando las necesito.',
        en: 'Soft as rose petals, free as the wind – and with thorns when I need them.'
      },
      {
        de: 'Mein Wert hängt nicht von meiner Produktivität ab. Jetzt darf ich einfach sein.',
        es: 'Mi valor no depende de mi productividad. Ahora me permito simplemente ser.',
        en: 'My worth does not depend on productivity. Now I allow myself to just be.'
      }
    ],
    night: [
      {
        de: 'Mein Körper darf zur Ruhe kommen. Die Welt wartet bis morgen.',
        es: 'Mi cuerpo tiene permiso de descansar. El mundo espera hasta mañana.',
        en: 'My body is allowed to rest. The world can wait until tomorrow.'
      },
      {
        de: 'Im tiefen Loslassen finde ich meine wahre Kraft wieder.',
        es: 'En el soltar profundo reencuentro mi verdadera fuerza.',
        en: 'In deep letting go, I rediscover my true strength.'
      },
      {
        de: 'Ich schließe die Augen in dem Wissen, dass ich geliebt und geborgen bin.',
        es: 'Cierro los ojos sabiendo que soy amada y estoy a salvo.',
        en: 'I close my eyes knowing that I am loved and safe.'
      }
    ]
  };

  const MOMENT_LABELS = {
    morning: { de: '🌅 Morgengruß', es: '🌅 Claridad matutina', en: '🌅 Morning clarity' },
    afternoon: { de: '☀️ Nachmittags-Fokus', es: '☀️ Enfoque de tarde', en: '☀️ Afternoon flow' },
    evening: { de: '🌆 Abendruhe', es: '🌆 Calma de atardecer', en: '🌆 Evening softness' },
    night: { de: '🌙 Nachtfrieden', es: '🌙 Paz nocturna', en: '🌙 Night stillness' }
  };

  const getAutoMoment = () => {
    const h = new Date().getHours();
    if (h >= 5 && h < 12) return 'morning';
    if (h >= 12 && h < 18) return 'afternoon';
    if (h >= 18 && h < 22) return 'evening';
    return 'night';
  };

  const [currentMoment, setCurrentMoment] = useState(getAutoMoment);
  const [mottoIndex, setMottoIndex] = useState(0);
  const [mottoLang, setMottoLang] = useState(language);
  const [mottoMode, setMottoMode] = useState(() => {
    return localStorage.getItem('marie_motto_mode') || 'moment';
  });

  // Personal Data & Editable Motto
  const [personalMotto, setPersonalMotto] = useState(() => {
    return localStorage.getItem('marie_personal_motto') || '';
  });
  const [isEditingMotto, setIsEditingMotto] = useState(false);

  const momentPool = TIME_MOTTOS[currentMoment] || TIME_MOTTOS.morning;
  const currentMottoObj = momentPool[mottoIndex % momentPool.length] || momentPool[0];
  const rotatingMotto = (currentMottoObj && (currentMottoObj[mottoLang] || currentMottoObj[language] || currentMottoObj.de)) || '';

  const displayMotto = (mottoMode === 'custom' && personalMotto) ? personalMotto : rotatingMotto;
  const [tempMotto, setTempMotto] = useState(displayMotto);

  // Sync mottoLang if global language changes and user hasn't explicitly toggled
  useEffect(() => {
    setMottoLang(language);
  }, [language]);

  const handleNextMotto = (e) => {
    e?.stopPropagation?.();
    if (soundEnabled) playSoftTap();
    setMottoIndex((prev) => (prev + 1) % momentPool.length);
  };

  const handleCycleMoment = (e) => {
    e?.stopPropagation?.();
    if (soundEnabled) playSoftTap();
    const moments = ['morning', 'afternoon', 'evening', 'night'];
    const nextIdx = (moments.indexOf(currentMoment) + 1) % moments.length;
    setCurrentMoment(moments[nextIdx]);
    setMottoIndex(0);
  };

  const handleToggleMottoLang = (e) => {
    e?.stopPropagation?.();
    if (soundEnabled) playSoftTap();
    setMottoLang((prev) => (prev === 'de' ? 'es' : prev === 'es' ? 'en' : 'de'));
  };

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
      return []; // no invented history: the timeline fills with her own days
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
              <img src={LOGO_04} alt="Marie Logo 04" className="profile-avatar-img" />
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

        {/* Motto / Current Intention with moments, shuffle and language toggle */}
        <div className="profile-motto-box">
          {/* Motto Controls Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8, flexWrap: 'wrap', gap: 6 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <button
                type="button"
                className="mx-chip"
                onClick={handleCycleMoment}
                title={language === 'de' ? 'Tageszeit wechseln' : language === 'en' ? 'Change time moment' : 'Cambiar momento del día'}
                style={{ fontSize: '11px', padding: '3px 8px', background: 'rgba(216, 74, 88, 0.15)', color: '#FADBD8', border: '1px solid rgba(216, 74, 88, 0.3)', cursor: 'pointer' }}
              >
                {MOMENT_LABELS[currentMoment]?.[language] || MOMENT_LABELS[currentMoment]?.de}
              </button>
              {personalMotto && (
                <button
                  type="button"
                  className="mx-chip"
                  onClick={() => {
                    const nextMode = mottoMode === 'moment' ? 'custom' : 'moment';
                    setMottoMode(nextMode);
                    try { localStorage.setItem('marie_motto_mode', nextMode); } catch (e) {}
                  }}
                  style={{ fontSize: '11px', padding: '3px 8px', background: mottoMode === 'custom' ? 'rgba(125, 163, 190, 0.25)' : 'rgba(255,255,255,0.06)', cursor: 'pointer' }}
                >
                  {mottoMode === 'custom' 
                    ? (language === 'de' ? '★ Mein Leuchtturm' : language === 'en' ? '★ My Custom Motto' : '★ Mi lema propio')
                    : (language === 'de' ? 'Inspiration' : language === 'en' ? 'Inspiration' : 'Inspiración')}
                </button>
              )}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <button
                type="button"
                className="mx-chip"
                onClick={handleToggleMottoLang}
                title={language === 'de' ? 'Sprache des Spruchs wechseln' : language === 'en' ? 'Toggle motto language' : 'Alternar idioma del lema'}
                style={{ fontSize: '10.5px', padding: '3px 7px', background: 'rgba(255,255,255,0.08)', cursor: 'pointer' }}
              >
                {mottoLang === 'de' ? '🇩🇪 DE' : mottoLang === 'es' ? '🇪🇸 ES' : '🇬🇧 EN'}
              </button>
              <button
                type="button"
                className="motto-edit-trigger"
                onClick={handleNextMotto}
                title={language === 'de' ? 'Nächster Spruch' : language === 'en' ? 'Next motto' : 'Siguiente frase'}
                style={{ cursor: 'pointer' }}
              >
                <RefreshCw size={13} />
              </button>
              <button
                type="button"
                className="motto-edit-trigger"
                onClick={() => { setIsEditingMotto(true); setTempMotto(displayMotto); }}
                title={language === 'de' ? 'Eigenes Motto bearbeiten' : language === 'en' ? 'Edit custom motto' : 'Editar lema propio'}
                style={{ cursor: 'pointer' }}
              >
                <Edit3 size={13} />
              </button>
            </div>
          </div>

          {isEditingMotto ? (
            <div className="motto-edit-group">
              <textarea
                className="motto-textarea"
                value={tempMotto}
                onChange={(e) => setTempMotto(e.target.value)}
                rows={2}
                placeholder={language === 'de' ? 'Schreibe deinen persönlichen Leuchtturm...' : language === 'en' ? 'Write your personal intention...' : 'Escribe tu intención o lema personal...'}
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
            <div className="motto-display-row" onClick={handleNextMotto} style={{ cursor: 'pointer' }}>
              <p className="profile-motto font-serif">“{displayMotto}”</p>
            </div>
          )}
        </div>

        {/* Cosmic Natal & Synastry Card for Marie */}
        <div 
          className="mx-card" 
          style={{ 
            marginTop: 12, 
            background: 'linear-gradient(135deg, rgba(155, 89, 182, 0.12) 0%, rgba(20, 16, 28, 0.95) 100%)', 
            border: '1px solid rgba(155, 89, 182, 0.3)',
            borderRadius: '16px',
            padding: '14px'
          }}
        >
          <div className="mx-row" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Sparkles size={16} style={{ color: '#BB8FCE' }} aria-hidden="true" />
              <strong style={{ fontSize: '13px', color: '#F5EEF8' }}>
                {language === 'de' ? 'Kosmisches Observatorium' : language === 'en' ? 'Celestial Observatory' : 'Observatorio Celeste'}
              </strong>
            </div>
            <span className="mx-badge" style={{ background: 'rgba(155, 89, 182, 0.25)', color: '#E8DAEF', fontSize: '11px' }}>
              🐉 22.11.2000
            </span>
          </div>

          <p className="mx-small" style={{ marginTop: 6, color: '#D2B4DE', lineHeight: 1.45 }}>
            {language === 'de' 
              ? 'Metalldrache · Skorpion-Schütze-Cusp · Mond in Waage · Venus in Steinbock · Sinastrie mit Caballero Jaguar (Daniel · 23.03.1996).'
              : language === 'en'
              ? 'Metal Dragon · Scorpio-Sagittarius Cusp · Moon in Libra · Venus in Capricorn · Synastry with Caballero Jaguar (Daniel · 23 March 1996).'
              : 'Dragón de Metal · Cúspide Escorpio-Sagitario · Luna en Libra · Venus en Capricornio · Sinastría con Caballero Jaguar (Daniel · 23 Mar 1996).'}
          </p>

          <button
            type="button"
            className="mx-btn warm full"
            onClick={() => {
              if (soundEnabled) playSoftTap();
              if (openModule) openModule('astral');
            }}
            style={{ marginTop: 10, padding: '8px 14px', fontSize: '12.5px', background: 'linear-gradient(135deg, #9B59B6 0%, #8E44AD 100%)' }}
          >
            <Compass size={14} aria-hidden="true" />
            <span>
              {language === 'de' ? 'Sternenkarte & Sinastrie erkunden ➔' : language === 'en' ? 'Explore Chart & Synastry ➔' : 'Ver Carta Astral & Sinastría ➔'}
            </span>
          </button>
        </div>

        {/* Intimate Diary & Moments Card for Marie */}
        <div 
          className="mx-card" 
          style={{ 
            marginTop: 12, 
            background: 'linear-gradient(135deg, rgba(197, 160, 129, 0.12) 0%, rgba(28, 22, 26, 0.95) 100%)', 
            border: '1px solid rgba(197, 160, 129, 0.35)',
            borderRadius: '16px',
            padding: '14px'
          }}
        >
          <div className="mx-row" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Calendar size={16} style={{ color: '#C5A081' }} aria-hidden="true" />
              <strong style={{ fontSize: '13px', color: '#FDFEFE' }}>
                {language === 'de' ? 'Mein Tagebuch & Momente' : language === 'en' ? 'My Journal & Moments' : 'Mi Diario & Momentos'}
              </strong>
            </div>
            <span className="mx-badge" style={{ background: 'rgba(197, 160, 129, 0.25)', color: '#FADBD8', fontSize: '11px' }}>
              📷 {language === 'de' ? 'Foto & Gedanken' : language === 'en' ? 'Photo & Thoughts' : 'Foto & Notas'}
            </span>
          </div>

          <p className="mx-small" style={{ marginTop: 6, color: '#D0C8B8', lineHeight: 1.45 }}>
            {language === 'de' 
              ? 'Ein sicherer Ort für deine Tage. Halte deine Gedanken fest, lade ein Foto des Tages hoch und verfolge deine persönliche Chronik im Kalender.'
              : language === 'en'
              ? 'A private sanctuary for your days. Write freely, attach a meaningful photo of the day, and follow your personal calendar trail.'
              : 'Un refugio privado para tus días. Escribe lo que sientes, sube una foto significativa del día y sigue tu calendario personal.'}
          </p>

          <button
            type="button"
            className="mx-btn warm small full"
            onClick={() => {
              playSoftTap();
              if (openModule) openModule('diary');
            }}
            style={{ marginTop: 10, padding: '8px 14px', fontSize: '12.5px', background: 'linear-gradient(135deg, #C5A081 0%, #B58D6E 100%)' }}
          >
            <Heart size={14} aria-hidden="true" />
            <span>
              {language === 'de' ? 'Tagebuch öffnen ➔' : language === 'en' ? 'Open Journal ➔' : 'Abrir mi Diario ➔'}
            </span>
          </button>
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
