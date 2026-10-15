import React, { useState } from 'react';
import { Flame, Shield, Sparkles, Heart, Check, Shuffle, RefreshCw, Feather } from 'lucide-react';
import { playSoftChime, playSoftTap } from '../utils/audio';

const FUCK_GIRL_MANTRAS = [
  {
    mantra: 'No persigo. Yo atraigo. Lo que es para mí me busca y lo que no, le abro la puerta para que se vaya.',
    vibe: 'Magnetismo Puro',
    category: 'Poder'
  },
  {
    mantra: 'No le debo una sonrisa, una explicación ni un "perdón" a nadie por elegir mi paz mental.',
    vibe: 'Límites Implacables',
    category: 'Límites'
  },
  {
    mantra: 'Si les incomoda mi presencia o mi verdad, que se compren una vida más interesante.',
    vibe: 'Sin Filtros',
    category: 'Autenticidad'
  },
  {
    mantra: 'Soy el premio. Mi atención es cara y no se la regalo a cualquiera.',
    vibe: 'Autoestima Alta',
    category: 'Valor'
  },
  {
    mantra: 'Puedo ser suave como una rosa silvestre y tener espinas que defienden mi territorio sin dudar.',
    vibe: 'Rosa Silvestre',
    category: 'Fuego & Gracia'
  }
];

const ANTI_PRESSURE_PRINCIPLES = [
  {
    title: 'Mi valor no depende de mi productividad',
    desc: 'Existir ya es suficiente. No tengo que estar logrando cosas las 24 horas para merecer respirar.'
  },
  {
    title: 'No le debo belleza perfecta al mundo',
    desc: 'Tener ojeras, acné o un chándal no me hace menos diosa. Mi cuerpo no es un proyecto de decoración.'
  },
  {
    title: 'Un "no" es una frase completa',
    desc: 'No tengo que inventar excusas elaboradas. "No me apetece" es razón sagrada y suficiente.'
  },
  {
    title: 'Cero prisa, voy a mi propio ritmo',
    desc: 'No compito con nadie en Instagram ni en la vida real. La flor no compite con la de al lado: solo florece.'
  }
];

const STYLE_LOOKS = [
  {
    name: 'Rosa Silvestre Rebelde',
    colorKey: 'Rojo Carmesí + Gris Perlado',
    pieces: 'Labial rojo frambuesa suave, trench gris claro o blazer oversized, top de lino y botas con carácter.',
    attitude: 'Imparable, segura de sus pasos, magnética sin esforzarse.'
  },
  {
    name: 'Serena pero Letal',
    colorKey: 'Azul Pastel + Negro Humo',
    pieces: 'Jersey azul pastel súper suave con pantalón sastre negro y gafas de sol oscuras.',
    attitude: 'Misteriosa, en control total, con una calma que intimida a los inseguros.'
  },
  {
    name: 'Jardín Salvaje',
    colorKey: 'Verde Salvia + Cuero Suave',
    pieces: 'Vestido fluido verde salvia combinado con chaqueta de cuero y joyería de oro delicada.',
    attitude: 'Femenina, indomable, conectada con su cuerpo.'
  }
];

export default function MindsetTab({ soundEnabled }) {
  const [mantraIndex, setMantraIndex] = useState(0);
  const [activeSubTab, setActiveSubTab] = useState('mantras'); // 'mantras' | 'principles' | 'looks'
  const [favoriteMantras, setFavoriteMantras] = useState(() => {
    try {
      const saved = localStorage.getItem('marie_fav_mantras');
      return saved ? JSON.parse(saved) : [0];
    } catch (e) {
      return [0];
    }
  });

  const currentMantra = FUCK_GIRL_MANTRAS[mantraIndex];
  const isFavorite = favoriteMantras.includes(mantraIndex);

  const handleNextMantra = () => {
    playSoftTap();
    setMantraIndex((prev) => (prev + 1) % FUCK_GIRL_MANTRAS.length);
  };

  const handleToggleFavorite = () => {
    if (soundEnabled) playSoftChime();
    const updated = isFavorite 
      ? favoriteMantras.filter(i => i !== mantraIndex)
      : [...favoriteMantras, mantraIndex];
    setFavoriteMantras(updated);
    try {
      localStorage.setItem('marie_fav_mantras', JSON.stringify(updated));
    } catch (e) {}
  };

  return (
    <div className="tab-content animate-fade-in">
      {/* Sub Tabs */}
      <div className="subtabs-bar">
        <button 
          className={`subtab-btn ${activeSubTab === 'mantras' ? 'active' : ''}`}
          onClick={() => { playSoftTap(); setActiveSubTab('mantras'); }}
        >
          <Flame size={14} />
          <span>Fuck Girl Mindset</span>
        </button>
        <button 
          className={`subtab-btn ${activeSubTab === 'principles' ? 'active' : ''}`}
          onClick={() => { playSoftTap(); setActiveSubTab('principles'); }}
        >
          <Shield size={14} />
          <span>Cero Presión</span>
        </button>
        <button 
          className={`subtab-btn ${activeSubTab === 'looks' ? 'active' : ''}`}
          onClick={() => { playSoftTap(); setActiveSubTab('looks'); }}
        >
          <Sparkles size={14} />
          <span>Looks con Actitud</span>
        </button>
      </div>

      {activeSubTab === 'mantras' && (
        <div className="mantras-view animate-fade-in">
          {/* Main Hero Card for Unapologetic Power */}
          <div className="mantra-hero-card glass-panel-dark">
            <div className="mantra-top-row">
              <span className="mantra-category-tag font-serif">⚡ {currentMantra.vibe}</span>
              <button 
                className={`fav-mantra-btn ${isFavorite ? 'favorited' : ''}`}
                onClick={handleToggleFavorite}
                title="Guardar en favoritos"
              >
                <Heart size={16} fill={isFavorite ? '#D84A58' : 'none'} color={isFavorite ? '#D84A58' : '#FFF'} />
              </button>
            </div>

            <p className="mantra-quote font-serif">
              "{currentMantra.mantra}"
            </p>

            <div className="mantra-bottom-row">
              <span className="mantra-reminder">
                Léelo en voz alta. Siéntelo en la boca del estómago.
              </span>
              <button className="next-mantra-btn" onClick={handleNextMantra}>
                <RefreshCw size={13} /> Siguiente chispa
              </button>
            </div>
          </div>

          {/* Quick Action Pillars */}
          <div className="mindset-pillars-grid">
            <div className="pillar-card glass-panel">
              <span className="pillar-icon">👑</span>
              <h4 className="pillar-title font-serif">Dueña de tu energía</h4>
              <p className="pillar-text">No regales tu tiempo a conversaciones que te aburren o te drenan.</p>
            </div>
            <div className="pillar-card glass-panel">
              <span className="pillar-icon">🥀</span>
              <h4 className="pillar-title font-serif">Espinas necesarias</h4>
              <p className="pillar-text">Ser dulce no significa ser dócil. Las rosas silvestres crecen libres y saben defenderse.</p>
            </div>
          </div>
        </div>
      )}

      {activeSubTab === 'principles' && (
        <div className="principles-view animate-fade-in">
          <div className="principles-intro-card glass-panel">
            <span className="principles-tag font-serif">🕊️ Principios Sagrados</span>
            <h3 className="principles-title font-serif">Paz mental antes que rendimiento</h3>
            <p className="principles-sub">
              El poder real no grita ni vive estresado. El poder real descansa en su propia calma.
            </p>
          </div>

          <div className="principles-list">
            {ANTI_PRESSURE_PRINCIPLES.map((principle, idx) => (
              <div key={idx} className="principle-item-card glass-panel">
                <div className="principle-number font-serif">0{idx + 1}</div>
                <div className="principle-body">
                  <h4 className="principle-heading font-serif">{principle.title}</h4>
                  <p className="principle-desc">{principle.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeSubTab === 'looks' && (
        <div className="looks-attitude-view animate-fade-in">
          <div className="looks-header-card glass-panel">
            <span className="looks-tag font-serif">🌹 Tu Paleta Personal</span>
            <h3 className="looks-title font-serif">Azul Pastel, Salvia, Gris & Rojo Silvestre</h3>
            <p className="looks-sub">
              Cómo mezclar tus colores favoritos para que tu outfit hable antes de que tú abras la boca.
            </p>
          </div>

          <div className="looks-stack">
            {STYLE_LOOKS.map((look, idx) => (
              <div key={idx} className="style-look-card glass-panel">
                <div className="look-card-top">
                  <h4 className="look-name font-serif">{look.name}</h4>
                  <span className="look-palette-tag">{look.colorKey}</span>
                </div>
                <p className="look-pieces"><strong>Prendas:</strong> {look.pieces}</p>
                <div className="look-attitude-pill">
                  <span className="att-label">Vibe:</span>
                  <span className="att-val">{look.attitude}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
