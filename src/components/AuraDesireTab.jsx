import React, { useState } from 'react';
import { 
  Lock, 
  Unlock, 
  ShieldCheck, 
  Sparkles, 
  Heart, 
  Check, 
  Shuffle, 
  Feather, 
  KeyRound, 
  MessageCircleHeart,
  Moon,
  Sun,
  Zap,
  RotateCw
} from 'lucide-react';
import { playSoftChime, playUnlockChime, playSoftTap } from '../utils/audio';
import { INTIMACY_PROMPTS } from '../data/appData';
import { useLanguage } from '../context/LanguageContext';

const FIRE_LEVELS = [
  {
    level: 1,
    title: 'Calma Soberana',
    emoji: '🌸',
    color: '#7DA3BE',
    vibe: 'Rosa en reposo: observo el mundo desde mi trono sin prisa ni exigencias.',
    quote: 'La rosa no compite con la de al lado: simplemente florece cuando quiere.'
  },
  {
    level: 2,
    title: 'Magnetismo Implacable',
    emoji: '⚡',
    color: '#D84A58',
    vibe: 'Fuck Girl Mindset: Yo no persigo, yo atraigo. Mi energía es cara.',
    quote: 'No le debo una sonrisa ni una disculpa a nadie por elegir mi territorio sagrado.'
  },
  {
    level: 3,
    title: 'Fuego Rebelde',
    emoji: '🔥',
    color: '#E05D44',
    vibe: 'Audacia viva: hoy me como el mundo a besos y sin pedir permiso.',
    quote: 'Puedo ser dulce como el terciopelo y tener espinas que defienden mi deseo.'
  },
  {
    level: 4,
    title: 'Éxtasis & Deseo Sagrado',
    emoji: '🕯️',
    color: '#9B2C3B',
    vibe: 'Sensualidad pura: mi placer me pertenece por derecho divino indiscutible.',
    quote: 'El placer no es un regalo que recibo: es una hoguera que yo misma enciendo.'
  }
];

const FUCK_GIRL_MANTRAS = [
  {
    id: 1,
    mantra: 'No persigo. Yo atraigo. Lo que es para mí me busca y lo que no, le abro la puerta para que se vaya sin drama.',
    vibe: 'Magnetismo Puro',
    category: 'Poder'
  },
  {
    id: 2,
    mantra: 'No le debo una sonrisa, una explicación ni un "perdón" a nadie por priorizar mi paz y mi tiempo.',
    vibe: 'Límites Implacables',
    category: 'Límites'
  },
  {
    id: 3,
    mantra: 'Si a alguien le incomoda mi luz o mi carácter, que se compre una vida más interesante.',
    vibe: 'Sin Filtros',
    category: 'Autenticidad'
  },
  {
    id: 4,
    mantra: 'Soy el premio. Mi atención es un lujo que no le regalo a la mediocridad.',
    vibe: 'Autoestima Alta',
    category: 'Valor'
  },
  {
    id: 5,
    mantra: 'Puedo ser suave como una rosa silvestre y tener espinas que defienden mi territorio sin dudar jamás.',
    vibe: 'Rosa Silvestre',
    category: 'Fuego & Gracia'
  },
  {
    id: 6,
    mantra: 'Mi placer y mi cuerpo son mi reino indiscutible: gozo sin culpa, deseo sin vergüenza y amo con libertad.',
    vibe: 'Soberanía Erótica',
    category: 'Deseo'
  }
];

const SENSORY_TOUCHPOINTS = [
  {
    id: 'nuca',
    label: 'Nuca & Cuello',
    cx: '50%',
    cy: '24%',
    sensation: 'Besos muy lentos, aliento tibio y caricias ascendentes con la yema de los dedos.',
    trigger: 'Despierta escalofríos inmediatos y baja todas las defensas.'
  },
  {
    id: 'clavicula',
    label: 'Clavículas & Hombros',
    cx: '36%',
    cy: '33%',
    sensation: 'Roce suave de labios sin prisa, manos tibias recorriendo los hombros.',
    trigger: 'Conexión suave y vulnerable que eriza la piel.'
  },
  {
    id: 'espalda',
    label: 'Espalda Baja & Columna',
    cx: '50%',
    cy: '52%',
    sensation: 'Presión firme que recorre vértebra a vértebra, manos que sujetan con calma.',
    trigger: 'Suelta toda la tensión acumulada y despierta calor profundo.'
  },
  {
    id: 'caderas',
    label: 'Cintura & Caderas',
    cx: '62%',
    cy: '62%',
    sensation: 'Sujeción con seguridad, balanceo lento y caricias con los pulgares.',
    trigger: 'Soberanía corporal, sensación de ser intensamente deseada.'
  },
  {
    id: 'munecas',
    label: 'Muñecas & Palmas',
    cx: '25%',
    cy: '58%',
    sensation: 'Dedos entrelazados con fuerza, besos en el interior de la muñeca donde late el pulso.',
    trigger: 'Intimidad eléctrica y cómplice.'
  },
  {
    id: 'labios',
    label: 'Labios & Aliento',
    cx: '50%',
    cy: '17%',
    sensation: 'Roce sin llegar a besar de inmediato, mirarse a los ojos de cerca, mordisco sutil.',
    trigger: 'Tensión deliciosa y magnetismo puro.'
  }
];

const SOLO_TAROT = [
  {
    title: 'El Espejo Sagrado',
    text: 'Mírate hoy desnuda frente al espejo sin juzgar nada. Agradece a tus caderas por sostenerte y a tu piel por sentir.',
    ritual: 'Aplica tu crema favorita acariciando cada curva con la devoción que le tendrías a una diosa.'
  },
  {
    title: 'La Rebelión del Placer',
    text: 'Tu placer no necesita una ocasión especial ni aprobación externa. Date permiso de sentir rico hoy solo para ti.',
    ritual: 'Pon música envolvente, apaga las luces frías y enciende una vela antes de dormir.'
  },
  {
    title: 'La Espina Protectora',
    text: '¿A qué le has estado diciendo que "sí" cuando por dentro tu cuerpo grita un rotundo "no"?',
    ritual: 'Cancela hoy cualquier compromiso que drene tu energía sin dar explicaciones largas.'
  },
  {
    title: 'Seda & Fuego',
    text: 'Elige hoy tu ropa interior más exquisita, no para que nadie la vea, sino para que tú recuerdes quién eres a cada paso.',
    ritual: 'Siente el tacto de la tela sobre tu piel durante el día como un recordatorio secreto de tu poder.'
  }
];

const COUPLE_TAROT = [
  {
    title: 'El Control Cómplice',
    text: 'Si esta noche tuvieras el mando absoluto de nuestro tiempo y nuestros cuerpos, ¿cuál sería la primera orden?',
    dare: 'Dile a Daniel al oído una sola frase de lo que te gustaría que hiciera contigo hoy.'
  },
  {
    title: 'El Mapa del Susurro',
    text: '¿Cuál es esa caricia o rincón de tu piel que cuando lo toco te hace desconectar la mente y rendirte al cuerpo?',
    dare: 'Pídele a Daniel que te acaricie exactamente en ese punto durante 5 minutos en silencio.'
  },
  {
    title: 'La Fantasía Inconfesada',
    text: '¿Hay algún escenario, lugar insospechado o juego que te dé curiosidad probar juntos sin juicios?',
    dare: 'Escríbelo en una nota secreta o compártanlo con una copa de vino en la cama.'
  },
  {
    title: 'El Beso Prohibido',
    text: '¿Cuál ha sido el beso nuestro que más electricidad te ha hecho sentir en la piel?',
    dare: 'Recreadlo ahora mismo durante al menos 60 segundos sin prisas.'
  }
];

export default function AuraDesireTab({ soundEnabled }) {
  const { language, currentStrings } = useLanguage();
  const auraT = currentStrings?.aura || {};

  const [atmosphereMode, setAtmosphereMode] = useState('velvet'); // 'velvet' | 'daylight'
  const [activeTabSection, setActiveTabSection] = useState('fire'); // 'fire' | 'constellation' | 'tarot' | 'sanctuary'
  const [currentFireLevel, setCurrentFireLevel] = useState(2);
  const [mantraIndex, setMantraIndex] = useState(0);
  const [selectedTouchpoint, setSelectedTouchpoint] = useState(SENSORY_TOUCHPOINTS[0]);
  const [tarotMode, setTarotMode] = useState('couple'); // 'solo' | 'couple'
  const [soloCardIndex, setSoloCardIndex] = useState(0);
  const [coupleCardIndex, setCoupleCardIndex] = useState(0);
  const [isCardFlipped, setIsCardFlipped] = useState(false);

  // Sanctuary lock & journal
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [showPinPad, setShowPinPad] = useState(false);
  const [selectedDesires, setSelectedDesires] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('marie_selected_desires')) || {};
    } catch (e) {
      return {};
    }
  });
  const [secretJournal, setSecretJournal] = useState(() => {
    return localStorage.getItem('marie_secret_journal') || '';
  });
  const [isJournalSaved, setIsJournalSaved] = useState(false);

  // Fav mantras
  const [favMantras, setFavMantras] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('marie_fav_mantras')) || [1];
    } catch (e) {
      return [1];
    }
  });

  const localizedLevels = auraT.levels || FIRE_LEVELS;
  const currentLevelData = localizedLevels[currentFireLevel - 1] || localizedLevels[0];
  const fire = {
    ...FIRE_LEVELS[currentFireLevel - 1],
    title: currentLevelData?.title || FIRE_LEVELS[currentFireLevel - 1].title,
    quote: currentLevelData?.quote || FIRE_LEVELS[currentFireLevel - 1].quote,
    vibe: currentLevelData?.vibe || FIRE_LEVELS[currentFireLevel - 1].vibe
  };
  const currentMantra = FUCK_GIRL_MANTRAS[mantraIndex];
  const isFav = favMantras.includes(currentMantra.id);

  const toggleAtmosphere = () => {
    playSoftTap();
    setAtmosphereMode(prev => prev === 'velvet' ? 'daylight' : 'velvet');
  };

  const handleNextMantra = () => {
    playSoftTap();
    setMantraIndex(prev => (prev + 1) % FUCK_GIRL_MANTRAS.length);
  };

  const handleToggleFav = () => {
    if (soundEnabled) playSoftChime();
    const updated = isFav 
      ? favMantras.filter(id => id !== currentMantra.id)
      : [...favMantras, currentMantra.id];
    setFavMantras(updated);
    try {
      localStorage.setItem('marie_fav_mantras', JSON.stringify(updated));
    } catch (e) {}
  };

  const handleSimulateFaceID = () => {
    playSoftTap();
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setIsUnlocked(true);
      if (soundEnabled) playUnlockChime();
    }, 1100);
  };

  const [pinError, setPinError] = useState(false);
  const SANCTUARY_PIN = '2211';

  const handlePinSubmit = (digit) => {
    playSoftTap();
    setPinError(false);
    const newPin = pinInput + digit;
    setPinInput(newPin);
    if (newPin.length === 4) {
      if (newPin === SANCTUARY_PIN) {
        setTimeout(() => {
          setIsUnlocked(true);
          if (soundEnabled) playUnlockChime();
          setPinInput('');
          setShowPinPad(false);
        }, 250);
      } else {
        setPinError(true);
        setTimeout(() => {
          setPinInput('');
          setPinError(false);
        }, 800);
      }
    }
  };

  const handleSaveJournal = () => {
    if (soundEnabled) playSoftChime();
    localStorage.setItem('marie_secret_journal', secretJournal);
    setIsJournalSaved(true);
    setTimeout(() => setIsJournalSaved(false), 2500);
  };

  const currentTarot = tarotMode === 'solo' 
    ? SOLO_TAROT[soloCardIndex] 
    : COUPLE_TAROT[coupleCardIndex];

  const handleNextTarot = () => {
    playSoftTap();
    setIsCardFlipped(false);
    setTimeout(() => {
      if (tarotMode === 'solo') {
        setSoloCardIndex(prev => (prev + 1) % SOLO_TAROT.length);
      } else {
        setCoupleCardIndex(prev => (prev + 1) % COUPLE_TAROT.length);
      }
    }, 150);
  };

  return (
    <div className={`tab-content aura-desire-master ${atmosphereMode}`}>
      {/* Atmosphere Header & Mode Controls */}
      <div className="aura-atmosphere-bar glass-panel">
        <div className="atmosphere-title-group">
          <div className="flame-halo" style={{ background: fire.color }}>
            <span className="flame-icon">{fire.emoji}</span>
          </div>
          <div>
            <h3 className="aura-headline font-serif">{auraT.tag || (language === 'de' ? 'Aura & Strahlkraft' : language === 'en' ? 'Aura & Radiance' : 'Aura & Deseo')}</h3>
            <span className="aura-subheadline">{fire.title}</span>
          </div>
        </div>

        <button 
          className="atmosphere-toggle-btn"
          onClick={toggleAtmosphere}
          title={atmosphereMode === 'velvet' ? (language === 'de' ? 'Tageslicht' : language === 'en' ? 'Daylight' : 'Luz de Día') : (language === 'de' ? 'Samt-Dämmerung' : language === 'en' ? 'Velvet Dusk' : 'Penumbra')}
        >
          {atmosphereMode === 'velvet' ? (
            <>
              <Moon size={14} color="#F8C3CA" />
              <span>{language === 'de' ? 'Samt-Dämmerung' : language === 'en' ? 'Velvet Dusk' : 'Penumbra Íntima'}</span>
            </>
          ) : (
            <>
              <Sun size={14} color="#D97706" />
              <span>{language === 'de' ? 'Sonnenlicht' : language === 'en' ? 'Daylight' : 'Luz Solar'}</span>
            </>
          )}
        </button>
      </div>

      {/* Interactive Fire / Energy Dial (4 States) */}
      <div className="fire-dial-card glass-panel">
        <div className="dial-header">
          <span className="dial-tag">{auraT.fireTitle || (language === 'de' ? 'Souveränitäts-Thermometer' : language === 'en' ? 'Sovereignty Dial' : 'Termómetro de Soberanía')}</span>
          <span className="dial-current-name font-serif" style={{ color: fire.color }}>
            {fire.emoji} {fire.title}
          </span>
        </div>

        <div className="fire-slider-track">
          {FIRE_LEVELS.map((f) => {
            const isSelected = currentFireLevel === f.level;
            return (
              <button
                key={f.level}
                className={`fire-level-node ${isSelected ? 'selected' : ''}`}
                style={isSelected ? { borderColor: f.color, color: f.color, background: `${f.color}25` } : {}}
                onClick={() => { playSoftTap(); setCurrentFireLevel(f.level); }}
              >
                <span className="node-emoji">{f.emoji}</span>
                <span className="node-num">0{f.level}</span>
              </button>
            );
          })}
        </div>

        <p className="fire-vibe-quote font-serif">
          “{fire.quote}”
        </p>
      </div>

      {/* Sub-navigation Pills */}
      <div className="aura-nav-pills glass-panel">
        <button 
          className={`aura-pill-btn ${activeTabSection === 'fire' ? 'active' : ''}`}
          onClick={() => { playSoftTap(); setActiveTabSection('fire'); }}
        >
          <Zap size={14} />
          <span>{language === 'de' ? 'Feuer & Mindset' : language === 'en' ? 'Fire & Mindset' : 'Fuego & Mindset'}</span>
        </button>
        <button 
          className={`aura-pill-btn ${activeTabSection === 'constellation' ? 'active' : ''}`}
          onClick={() => { playSoftTap(); setActiveTabSection('constellation'); }}
        >
          <Sparkles size={14} />
          <span>{language === 'de' ? 'Berührungspunkte' : language === 'en' ? 'Tactile Constellation' : 'Constelación Táctil'}</span>
        </button>
        <button 
          className={`aura-pill-btn ${activeTabSection === 'tarot' ? 'active' : ''}`}
          onClick={() => { playSoftTap(); setActiveTabSection('tarot'); }}
        >
          <MessageCircleHeart size={14} />
          <span>{language === 'de' ? 'Tarot der Lust' : language === 'en' ? 'Pleasure Tarot' : 'Tarot del Placer'}</span>
        </button>
        <button 
          className={`aura-pill-btn ${activeTabSection === 'sanctuary' ? 'active' : ''}`}
          onClick={() => { playSoftTap(); setActiveTabSection('sanctuary'); }}
        >
          <Lock size={13} />
          <span>{auraT.sanctuaryTitle || (language === 'de' ? 'Geheim-Refugium' : language === 'en' ? 'Sanctuary' : 'Santuario')}</span>
        </button>
      </div>

      {/* SECTION 1: FUEGO & FUCK GIRL MINDSET */}
      {activeTabSection === 'fire' && (
        <div className="aura-section-view animate-fade-in">
          {/* Card del Mantra Interactivo de Autoafirmación */}
          <div className="fuck-girl-hero-card glass-panel">
            <div className="hero-badge-row">
              <span className="hero-category-tag">{currentMantra.category}</span>
              <span className="hero-vibe-tag">{currentMantra.vibe}</span>
            </div>

            <p className="hero-mantra-quote font-serif">
              “{currentMantra.mantra}”
            </p>

            <div className="hero-card-actions">
              <button 
                className={`hero-fav-btn ${isFav ? 'active' : ''}`}
                onClick={handleToggleFav}
              >
                <Heart size={16} fill={isFav ? '#D84A58' : 'none'} color={isFav ? '#D84A58' : 'currentColor'} />
                <span>{isFav ? 'En mi corazón' : 'Hacerlo mío'}</span>
              </button>

              <button className="hero-shuffle-btn" onClick={handleNextMantra}>
                <Shuffle size={14} />
                <span>Siguiente ({mantraIndex + 1}/{FUCK_GIRL_MANTRAS.length})</span>
              </button>
            </div>
          </div>

          {/* Manifiesto Táctil de las Espinas */}
          <div className="thorns-manifesto-grid">
            <div className="thorn-principle-card glass-panel">
              <div className="thorn-number">01</div>
              <h4 className="thorn-title font-serif">Mi valor no se negocia</h4>
              <p className="thorn-desc">
                No le debo belleza perfecta, sonrisas forzadas ni explicaciones al mundo. Existir ya es sagrado.
              </p>
            </div>
            <div className="thorn-principle-card glass-panel">
              <div className="thorn-number">02</div>
              <h4 className="thorn-title font-serif">Un "no" es una frase completa</h4>
              <p className="thorn-desc">
                "No me apetece" o "no quiero" no requiere justificaciones elaboradas. Es suficiente.
              </p>
            </div>
            <div className="thorn-principle-card glass-panel">
              <div className="thorn-number">03</div>
              <h4 className="thorn-title font-serif">Soberanía de mi Ritmo</h4>
              <p className="thorn-desc">
                Cero prisa: no compito con nadie. La rosa silvestre florece cuando sus raíces están listas.
              </p>
            </div>
            <div className="thorn-principle-card glass-panel">
              <div className="thorn-number">04</div>
              <h4 className="thorn-title font-serif">Placer sin Culpa</h4>
              <p className="thorn-desc">
                Mi deseo es mío. Gozar y sentir rico es mi estado natural, no una concesión.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: CONSTELACIÓN TÁCTIL (MAPEO CORPORAL SENSORIAL) */}
      {activeTabSection === 'constellation' && (
        <div className="aura-section-view animate-fade-in">
          <div className="constellation-intro">
            <h4 className="constellation-title font-serif">Constelación Sensorial del Cuerpo</h4>
            <p className="constellation-desc">
              Toca cada punto de la silueta para descubrir qué caricias y ritmos despiertan tu fuego o te funden de placer.
            </p>
          </div>

          <div className="constellation-canvas-card glass-panel">
            {/* Visual Silhouette with Interactive Touch Nodes */}
            <div className="body-silhouette-wrapper">
              {/* Artistic SVG Silhouette */}
              <svg viewBox="0 0 200 320" className="body-silhouette-svg">
                <defs>
                  <radialGradient id="silhouetteGlow" cx="50%" cy="40%" r="60%">
                    <stop offset="0%" stopColor="#D84A58" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#D84A58" stopOpacity="0" />
                  </radialGradient>
                </defs>
                <ellipse cx="100" cy="160" rx="70" ry="130" fill="url(#silhouetteGlow)" />
                {/* Silhouette curves */}
                <path 
                  d="M 100 45 C 112 45, 118 55, 118 68 C 118 80, 112 88, 107 92 C 125 98, 142 108, 148 135 C 152 155, 140 175, 134 195 C 128 215, 136 240, 132 270 C 130 285, 125 295, 115 295 C 105 295, 102 270, 100 245 C 98 270, 95 295, 85 295 C 75 295, 70 285, 68 270 C 64 240, 72 215, 66 195 C 60 175, 48 155, 52 135 C 58 108, 75 98, 93 92 C 88 88, 82 80, 82 68 C 82 55, 88 45, 100 45 Z" 
                  fill="rgba(255, 255, 255, 0.4)"
                  stroke="rgba(216, 74, 88, 0.4)"
                  strokeWidth="1.5"
                />
              </svg>

              {/* Touchpoint interactive buttons positioned on body */}
              {SENSORY_TOUCHPOINTS.map((tp) => {
                const isActive = selectedTouchpoint.id === tp.id;
                return (
                  <button
                    key={tp.id}
                    className={`touchpoint-node ${isActive ? 'active' : ''}`}
                    style={{ left: tp.cx, top: tp.cy }}
                    onClick={() => { playSoftTap(); setSelectedTouchpoint(tp); }}
                  >
                    <span className="node-glow-ring"></span>
                    <span className="node-center-dot"></span>
                    <span className="node-tooltip">{tp.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Selected Touchpoint Sensory Card */}
            <div className="touchpoint-detail-card glass-panel">
              <div className="tp-header">
                <span className="tp-badge">Punto Sagrado</span>
                <h5 className="tp-name font-serif">{selectedTouchpoint.label}</h5>
              </div>
              <div className="tp-sensory-row">
                <span className="tp-lead font-serif">La Caricia Ideal:</span>
                <p className="tp-body">{selectedTouchpoint.sensation}</p>
              </div>
              <div className="tp-trigger-box">
                <Sparkles size={13} color="#D84A58" />
                <span>{selectedTouchpoint.trigger}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: TAROT DEL PLACER (A SOLAS & EN PAREJA) */}
      {activeTabSection === 'tarot' && (
        <div className="aura-section-view animate-fade-in">
          {/* Tarot Mode Switcher */}
          <div className="tarot-mode-selector glass-panel">
            <button 
              className={`tarot-mode-btn ${tarotMode === 'solo' ? 'active' : ''}`}
              onClick={() => { playSoftTap(); setTarotMode('solo'); setIsCardFlipped(false); }}
            >
              <Heart size={14} />
              <span>Para mí a Solas</span>
            </button>
            <button 
              className={`tarot-mode-btn ${tarotMode === 'couple' ? 'active' : ''}`}
              onClick={() => { playSoftTap(); setTarotMode('couple'); setIsCardFlipped(false); }}
            >
              <MessageCircleHeart size={14} />
              <span>Cómplices (Marie & Daniel)</span>
            </button>
          </div>

          {/* Luxury Tarot Card with Flip Animation */}
          <div className="tarot-display-container">
            <div 
              className={`luxury-tarot-card ${isCardFlipped ? 'flipped' : ''}`}
              onClick={() => { playSoftTap(); setIsCardFlipped(!isCardFlipped); }}
            >
              <div className="tarot-front glass-panel">
                <div className="tarot-gold-border">
                  <div className="tarot-corner-mark top-left">✦</div>
                  <div className="tarot-corner-mark top-right">✦</div>
                  <div className="tarot-corner-mark btm-left">✦</div>
                  <div className="tarot-corner-mark btm-right">✦</div>

                  <div className="tarot-top-meta">
                    <span className="tarot-tag-pill">{tarotMode === 'solo' ? 'ÍNTIMO' : 'CÓMPLICES'}</span>
                    <span className="tarot-number">
                      {tarotMode === 'solo' ? `${soloCardIndex + 1} / 4` : `${coupleCardIndex + 1} / 4`}
                    </span>
                  </div>

                  <div className="tarot-rose-icon-wrap">
                    <img src="/logo_04.png" alt="Rose Tarot" className="tarot-rose-emblem" />
                  </div>

                  <h4 className="tarot-card-title font-serif">{currentTarot.title}</h4>

                  <p className="tarot-card-text font-serif">
                    “{currentTarot.text}”
                  </p>

                  <div className="tarot-flip-hint">
                    <RotateCw size={13} />
                    <span>Toca para ver el ritual / juego cómplice</span>
                  </div>
                </div>
              </div>

              {/* Tarot Back (Ritual / Dare) */}
              <div className="tarot-back glass-panel">
                <div className="tarot-gold-border">
                  <span className="tarot-back-label">
                    {tarotMode === 'solo' ? 'RITUAL PARA TI' : 'JUEGO PARA LOS DOS'}
                  </span>
                  <p className="tarot-back-content font-serif">
                    {tarotMode === 'solo' ? currentTarot.ritual : currentTarot.dare}
                  </p>
                  <div className="tarot-flip-hint">
                    <RotateCw size={13} />
                    <span>Toca para volver a la carta</span>
                  </div>
                </div>
              </div>
            </div>

            <button className="next-tarot-btn" onClick={handleNextTarot}>
              <Shuffle size={15} />
              <span>Siguiente Carta de Placer</span>
            </button>
          </div>
        </div>
      )}

      {/* SECTION 4: SANTUARIO ÍNTIMO (PROTEGIDO CON FACEID) */}
      {activeTabSection === 'sanctuary' && (
        <div className="aura-section-view animate-fade-in">
          {!isUnlocked ? (
            /* LOCKED STATE */
            <div className="sanctuary-locked-vault glass-panel">
              <div className="vault-lock-orb">
                <Lock size={32} color="#D84A58" />
              </div>
              <h3 className="vault-title font-serif">Santuario Secreto de Marie</h3>
              <p className="vault-subtitle">
                Espacio íntimo protegido por biometría. Tus deseos, fantasías y mapa de placer solo los ves tú.
              </p>

              <div className="vault-actions-group">
                <button 
                  className={`vault-faceid-btn ${isScanning ? 'scanning' : ''}`}
                  onClick={handleSimulateFaceID}
                  disabled={isScanning}
                >
                  <ShieldCheck size={18} />
                  <span>{isScanning ? 'Verificando con amor...' : 'Desbloquear con FaceID'}</span>
                </button>

                <button 
                  className="vault-pin-btn"
                  onClick={() => setShowPinPad(!showPinPad)}
                >
                  <KeyRound size={14} />
                  <span>{showPinPad ? 'Ocultar código PIN' : 'Usar código secreto (1111)'}</span>
                </button>
              </div>

              {showPinPad && (
                <div className={`vault-pin-pad animate-fade-in ${pinError ? 'pin-error-shake' : ''}`}>
                  <div className="pin-indicators">
                    {[0, 1, 2, 3].map((i) => (
                      <span key={i} className={`pin-dot ${pinInput.length > i ? 'filled' : ''} ${pinError ? 'error' : ''}`} />
                    ))}
                  </div>
                  {pinError && (
                    <span className="pin-error-hint" style={{ fontSize: '11px', color: '#D84A58', textAlign: 'center', display: 'block', marginTop: '4px' }}>
                      {language === 'de' ? 'Falsche PIN (Hinweis: 2211)' : language === 'en' ? 'Incorrect PIN (Hint: 2211)' : 'PIN incorrecto (Pista: 2211)'}
                    </span>
                  )}
                  <div className="pin-key-grid">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 'C', 0, '✓'].map((keyVal) => (
                      <button
                        key={keyVal}
                        className="pin-key-btn"
                        onClick={() => {
                          if (keyVal === 'C') {
                            setPinInput('');
                            setPinError(false);
                          } else if (keyVal === '✓') {
                            if (pinInput === SANCTUARY_PIN) {
                              setIsUnlocked(true);
                              if (soundEnabled) playUnlockChime();
                              setPinInput('');
                              setShowPinPad(false);
                            } else {
                              setPinError(true);
                              setTimeout(() => {
                                setPinInput('');
                                setPinError(false);
                              }, 800);
                            }
                          } else handlePinSubmit(keyVal.toString());
                        }}
                      >
                        {keyVal}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* UNLOCKED VAULT */
            <div className="sanctuary-unlocked-vault animate-fade-in">
              <div className="vault-topbar">
                <div className="vault-status-indicator">
                  <Unlock size={14} color="#6E8C6E" />
                  <span>Santuario Abierto</span>
                </div>
                <button className="vault-lock-btn" onClick={() => setIsUnlocked(false)}>
                  <Lock size={13} />
                  <span>Cerrar</span>
                </button>
              </div>

              {/* Mapeo de Deseos Íntimos */}
              <div className="vault-desires-grid">
                {INTIMACY_PROMPTS.map((prompt) => {
                  const activeOptions = selectedDesires[prompt.id] || [];
                  return (
                    <div key={prompt.id} className="vault-prompt-card glass-panel">
                      <div className="vault-prompt-head">
                        <span className="prompt-cat font-serif">{prompt.category}</span>
                        <span className="prompt-count">{activeOptions.length} elegidos</span>
                      </div>
                      <div className="prompt-tags-wrap">
                        {prompt.options.map((opt) => {
                          const isSel = activeOptions.includes(opt);
                          return (
                            <button
                              key={opt}
                              className={`prompt-opt-pill ${isSel ? 'selected' : ''}`}
                              onClick={() => {
                                playSoftTap();
                                const current = selectedDesires[prompt.id] || [];
                                const updated = current.includes(opt)
                                  ? current.filter(o => o !== opt)
                                  : [...current, opt];
                                const full = { ...selectedDesires, [prompt.id]: updated };
                                setSelectedDesires(full);
                                localStorage.setItem('marie_selected_desires', JSON.stringify(full));
                              }}
                            >
                              {isSel && <Check size={12} />}
                              <span>{opt}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Diario Confidencial */}
              <div className="vault-journal-box glass-panel">
                <div className="journal-header">
                  <div className="j-title">
                    <Feather size={14} color="#D84A58" />
                    <span className="font-serif">Diario Íntimo Confidencial</span>
                  </div>
                  <span className="j-badge">Encriptado local</span>
                </div>
                <textarea
                  className="vault-textarea"
                  value={secretJournal}
                  onChange={(e) => setSecretJournal(e.target.value)}
                  placeholder="Fantasías, sensaciones nuevas, dudas o recuerdos cómplices... Este espacio es inviolable."
                  rows={4}
                />
                <button 
                  className={`vault-save-btn ${isJournalSaved ? 'saved' : ''}`}
                  onClick={handleSaveJournal}
                >
                  {isJournalSaved ? (
                    <>
                      <Check size={15} />
                      <span>¡Guardado bajo llave en tu dispositivo!</span>
                    </>
                  ) : (
                    <>
                      <Lock size={14} />
                      <span>Guardar notas confidenciales</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
