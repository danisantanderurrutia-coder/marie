import React, { useState } from 'react';
import { ModuleShell } from '../../components/ModuleShell';
import { useLanguage } from '../../context/LanguageContext';
import { useLog } from '../../utils/storage';
import { KEYS } from '../../utils/keys';
import { playSoftChime, playSoftTap } from '../../utils/audio';
import { Sparkles, Palette, Waves, CircleDot, Sun, CloudFog, Droplets } from 'lucide-react';
import './aura.css';

const PALETTE = {
  terracotta: { hex: '#C87D55', gradient: 'radial-gradient(circle, #DDA15E 0%, #C87D55 60%, #9B4A2D 100%)' },
  rose: { hex: '#D84A58', gradient: 'radial-gradient(circle, #FFAAA6 0%, #D84A58 55%, #7D1924 100%)' },
  sage: { hex: '#8A9A86', gradient: 'radial-gradient(circle, #B7C4B0 0%, #8A9A86 55%, #4C5D48 100%)' },
  sereneBlue: { hex: '#7DA3BE', gradient: 'radial-gradient(circle, #A5C4D4 0%, #7DA3BE 55%, #3B5A70 100%)' },
  amber: { hex: '#E5A93C', gradient: 'radial-gradient(circle, #FDE08B 0%, #E5A93C 60%, #A86D12 100%)' },
  amethyst: { hex: '#9E768F', gradient: 'radial-gradient(circle, #C8A9BE 0%, #9E768F 55%, #59354D 100%)' },
  pearlMist: { hex: '#B8C0C8', gradient: 'radial-gradient(circle, #EAECEF 0%, #B8C0C8 60%, #76818E 100%)' },
  charcoal: { hex: '#443D3B', gradient: 'radial-gradient(circle, #6C625E 0%, #443D3B 65%, #201D1C 100%)' }
};

const SHAPE_ICONS = {
  waves: Waves,
  pulse: CircleDot,
  radiant: Sun,
  mist: CloudFog,
  still: Droplets
};

export default function Aura({ onBack, soundEnabled }) {
  const { currentStrings, language } = useLanguage();
  const au = currentStrings.auraModule;
  const log = useLog(KEYS.aura);

  const [selectedColor, setSelectedColor] = useState('rose');
  const [selectedShape, setSelectedShape] = useState('waves');
  const [note, setNote] = useState('');
  const [saved, setSaved] = useState(false);

  const activeColorObj = PALETTE[selectedColor] || PALETTE.rose;

  const handleSave = () => {
    log.add({
      color: activeColorObj.hex,
      gradient: activeColorObj.gradient,
      colorKey: selectedColor,
      shape: selectedShape,
      note: note.trim()
    });
    if (soundEnabled) playSoftChime();
    setSaved(true);
    setNote('');
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <ModuleShell
      kicker={au.kicker}
      title={au.title}
      lead={au.lead}
      onBack={onBack}
      note={
        <div className="aura-metaphor-banner">
          <p className="mx-small">{au.metaphorNote}</p>
        </div>
      }
    >
      {/* Visual Animated Aura Halo Preview */}
      <div className="aura-preview-stage">
        <div
          className={`aura-orb-canvas shape-${selectedShape}`}
          style={{ background: activeColorObj.gradient }}
          role="img"
          aria-label={au.previewTitle}
        >
          <div className="aura-inner-glow" />
        </div>
        <div className="aura-preview-caption">
          <strong>{au.colors[selectedColor]?.name}</strong>
          <span>{au.colors[selectedColor]?.mood}</span>
        </div>
      </div>

      {/* 1. Palette Picker */}
      <div className="mx-card">
        <label className="mx-label">{au.paletteLabel}</label>
        <div className="aura-swatches-grid">
          {Object.keys(PALETTE).map((key) => {
            const c = PALETTE[key];
            const isSelected = selectedColor === key;
            const data = au.colors[key];
            return (
              <button
                key={key}
                type="button"
                className={`aura-swatch-card ${isSelected ? 'active' : ''}`}
                onClick={() => {
                  playSoftTap();
                  setSelectedColor(key);
                }}
              >
                <span className="swatch-circle" style={{ background: c.gradient }} />
                <div className="swatch-meta">
                  <strong>{data?.name || key}</strong>
                  <span className="swatch-mood">{data?.mood}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Shape / Movement Picker */}
      <div className="mx-card">
        <label className="mx-label">{au.shapeLabel}</label>
        <div className="aura-shapes-grid">
          {Object.keys(au.shapes).map((key) => {
            const s = au.shapes[key];
            const isSelected = selectedShape === key;
            const Icon = SHAPE_ICONS[key] || Sparkles;
            return (
              <button
                key={key}
                type="button"
                className={`aura-shape-pill ${isSelected ? 'active' : ''}`}
                onClick={() => {
                  playSoftTap();
                  setSelectedShape(key);
                }}
              >
                <Icon size={18} aria-hidden="true" />
                <div>
                  <strong>{s.name}</strong>
                  <span className="shape-desc">{s.desc}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Reflection note & Save */}
      <div className="mx-card">
        <label className="mx-field">
          <span className="mx-label">{au.noteLabel}</span>
          <input
            className="mx-input"
            value={note}
            placeholder={au.notePlaceholder}
            onChange={(e) => setNote(e.target.value)}
          />
        </label>

        <button
          className="mx-btn warm full"
          style={{ marginTop: 14 }}
          onClick={handleSave}
        >
          {au.saveBtn}
        </button>

        {saved && <p className="mx-toast" role="status" style={{ marginTop: 10 }}>{au.savedToast}</p>}
      </div>

      {/* History */}
      <h2 className="mx-h2">{au.historyTitle}</h2>
      {log.items.length === 0 ? (
        <p className="mx-small">{au.historyEmpty}</p>
      ) : (
        <div className="aura-history-stream">
          {log.items.map((item) => (
            <div key={item.id} className="aura-history-card mx-card soft">
              <span
                className="history-orb"
                style={{ background: item.gradient || item.color }}
                aria-hidden="true"
              />
              <div className="history-info">
                <div className="mx-row" style={{ justifyContent: 'space-between' }}>
                  <strong>{au.colors[item.colorKey]?.name || 'Aura'}</strong>
                  <span className="mx-small">
                    {new Date(item.at).toLocaleDateString(language, { day: 'numeric', month: 'short' })}
                  </span>
                </div>
                <span className="mx-small" style={{ color: 'var(--mx-muted)' }}>
                  {au.shapes[item.shape]?.name}
                </span>
                {item.note && <p className="mx-small history-note">"{item.note}"</p>}
              </div>
              <button
                className="mx-link-btn"
                onClick={() => log.remove(item.id)}
                aria-label={`${au.deleteBtn} ${item.id}`}
              >
                {au.deleteBtn}
              </button>
            </div>
          ))}
        </div>
      )}
    </ModuleShell>
  );
}
