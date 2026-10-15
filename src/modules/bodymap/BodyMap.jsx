import React, { useMemo, useState } from 'react';
import { ModuleShell } from '../../components/ModuleShell';
import BreathingCircle from '../../components/BreathingCircle';
import { useLanguage } from '../../context/LanguageContext';
import { useLog } from '../../utils/storage';
import { KEYS } from '../../utils/keys';
import { playSoftChime, playSoftTap } from '../../utils/audio';
import './bodymap.css';

const ZONE_IDS = ['head', 'throat', 'shoulders', 'chest', 'belly', 'hands', 'back', 'legs'];
const SENSATIONS = {
  tension: '#C0504D', warmth: '#E39A4B', emptiness: '#9AA5B1', calm: '#7DA3BE', tingling: '#B58BD6',
  heaviness: '#6F6A66', pressure: '#B5726B', lightness: '#9CC7A8', numbness: '#C9C5C0', nothing: '#D9CFC2'
};
const BASE_FILL = '#EFE6DA';

// Shapes are drawn once; each zone is a focusable group (keyboard + touch) with an equivalent button list below.
const SHAPES = {
  back: <rect x="60" y="98" width="80" height="124" rx="30" strokeDasharray="4 4" />,
  head: <circle cx="100" cy="40" r="27" />,
  throat: <rect x="90" y="66" width="20" height="20" rx="9" />,
  shoulders: <path d="M48 96 Q100 78 152 96 L152 110 Q100 94 48 110 Z" />,
  chest: <rect x="68" y="108" width="64" height="56" rx="22" />,
  belly: <rect x="72" y="166" width="56" height="52" rx="22" />,
  hands: <><circle cx="32" cy="244" r="16" /><circle cx="168" cy="244" r="16" /></>,
  legs: <><rect x="74" y="224" width="24" height="150" rx="12" /><rect x="102" y="224" width="24" height="150" rx="12" /><ellipse cx="82" cy="388" rx="18" ry="9" /><ellipse cx="118" cy="388" rx="18" ry="9" /></>
};

export default function BodyMap({ onBack, soundEnabled }) {
  const { t, currentStrings, language } = useLanguage();
  const m = currentStrings.bodymap;
  const log = useLog(KEYS.bodymap);

  const [zone, setZone] = useState(null);
  const [sens, setSens] = useState([]);
  const [intensity, setIntensity] = useState(1);
  const [note, setNote] = useState('');
  const [range, setRange] = useState(7);
  const [saved, setSaved] = useState(false);

  const inRange = useMemo(() => {
    const since = Date.now() - range * 86400000;
    return log.items.filter((e) => new Date(e.at).getTime() >= since);
  }, [log.items, range]);

  // Per zone: dominant sensation + average intensity in the chosen window
  const heat = useMemo(() => {
    const out = {};
    ZONE_IDS.forEach((z) => {
      const es = inRange.filter((e) => e.zone === z);
      if (!es.length) return;
      const counts = {};
      es.forEach((e) => e.sens.forEach((s) => { counts[s] = (counts[s] || 0) + 1; }));
      const top = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
      const avg = es.reduce((a, e) => a + e.intensity, 0) / es.length;
      out[z] = { top: top ? top[0] : 'nothing', avg, n: es.length };
    });
    return out;
  }, [inRange]);

  const select = (z) => { playSoftTap(); setZone(z); setSens([]); setIntensity(1); setNote(''); setSaved(false); };
  const toggle = (s) => setSens(sens.includes(s) ? sens.filter((x) => x !== s) : [...sens, s]);
  const save = () => {
    log.add({ zone, sens: sens.length ? sens : ['nothing'], intensity, note: note.trim() });
    if (soundEnabled) playSoftChime();
    setSaved(true);
  };

  const zoneEntries = zone ? log.items.filter((e) => e.zone === zone) : [];
  const fmt = (iso) => new Date(iso).toLocaleDateString(language, { day: 'numeric', month: 'short' });

  return (
    <ModuleShell kicker={m.kicker} title={m.title} lead={m.lead} onBack={onBack}>
      <div className="bodymap-wrap">
        <svg viewBox="0 0 200 410" className="bodymap-svg" role="group" aria-label={m.title}>
          {/* arms (decorative) */}
          <path d="M54 104 Q38 170 34 230 M146 104 Q162 170 166 230" fill="none" stroke="#E2D6C6" strokeWidth="9" strokeLinecap="round" aria-hidden="true" />
          {ZONE_IDS.map((z) => {
            const h = heat[z];
            const fill = h ? SENSATIONS[h.top] : BASE_FILL;
            const opacity = h ? 0.35 + Math.min(h.avg, 4) / 4 * 0.6 : 1;
            return (
              <g
                key={z}
                className={`bodymap-zone ${zone === z ? 'selected' : ''}`}
                role="button"
                tabIndex={0}
                aria-label={m.zones[z].name}
                aria-pressed={zone === z}
                style={{ fill, fillOpacity: opacity }}
                onClick={() => select(z)}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); select(z); } }}
              >
                {SHAPES[z]}
              </g>
            );
          })}
        </svg>
        <div>
          <p className="mx-label">{m.listLabel}</p>
          <div className="mx-chips">
            {ZONE_IDS.map((z) => (
              <button key={z} className="mx-chip" aria-pressed={zone === z} onClick={() => select(z)}>{m.zones[z].name}</button>
            ))}
          </div>
        </div>
      </div>

      {zone && (
        <div className="mx-card tinted animate-fade-in" aria-live="polite">
          <h2 className="mx-h2" style={{ marginTop: 0 }}>{m.zones[zone].name}</h2>
          <p className="mx-label">{m.ask}<span className="mx-hint">{m.askHint}</span></p>
          <div className="mx-chips">
            {Object.keys(SENSATIONS).map((s) => (
              <button
                key={s}
                className="mx-chip bodymap-chip"
                aria-pressed={sens.includes(s)}
                onClick={() => toggle(s)}
                style={sens.includes(s) ? { background: SENSATIONS[s], borderColor: SENSATIONS[s], color: '#1F1B18' } : undefined}
              >
                <span className="bodymap-swatch" style={{ background: SENSATIONS[s] }} aria-hidden="true" /> {m.sensations[s]}
              </button>
            ))}
          </div>

          <label className="mx-field" style={{ marginTop: 14 }}>
            <span className="mx-label">{m.intensity}: <strong>{m.intensityLevels[intensity]}</strong></span>
            <input className="mx-range" type="range" min="0" max="4" step="1" value={intensity} onChange={(e) => setIntensity(Number(e.target.value))} aria-valuetext={m.intensityLevels[intensity]} />
          </label>

          <label className="mx-field" style={{ marginTop: 6 }}>
            <span className="mx-label">{m.note}</span>
            <textarea className="mx-textarea" value={note} onChange={(e) => setNote(e.target.value)} />
          </label>

          <h3 className="mx-h2" style={{ fontSize: 18 }}>{m.practiceTitle}</h3>
          <p className="mx-text">{m.zones[zone].practice}</p>
          <BreathingCircle inSec={4} outSec={6} cycles={3} labels={{ in: m.breathIn, out: m.breathOut }} startLabel={m.breathStart} stopLabel={m.breathStop} />

          <h3 className="mx-h2" style={{ fontSize: 18 }}>{m.reflectTitle}</h3>
          <p className="mx-text"><em>{m.zones[zone].question}</em></p>

          <div className="mx-row" style={{ marginTop: 14 }}>
            <button className="mx-btn warm" onClick={save}>{m.save}</button>
            <button className="mx-btn ghost" onClick={() => setZone(null)}>{m.close}</button>
            {saved && <span className="mx-toast" role="status">{m.saved}</span>}
          </div>

          <h3 className="mx-h2" style={{ fontSize: 18 }}>{t('bodymap.zoneHistory', { zone: m.zones[zone].name })}</h3>
          {zoneEntries.length === 0 ? <p className="mx-small">{m.noZoneHistory}</p> : (
            <>
              <svg viewBox="0 0 300 70" className="bodymap-spark" role="img" aria-label={m.zones[zone].name}>
                {zoneEntries.slice(0, 20).reverse().map((e, i, arr) => {
                  const x = arr.length === 1 ? 150 : 10 + (i * 280) / (arr.length - 1);
                  const y = 60 - e.intensity * 12;
                  return <circle key={e.id} cx={x} cy={y} r="7" fill={SENSATIONS[e.sens[0]]}><title>{`${fmt(e.at)} · ${e.sens.map((s) => m.sensations[s]).join(', ')}`}</title></circle>;
                })}
              </svg>
              <ul className="bodymap-list">
                {zoneEntries.slice(0, 5).map((e) => (
                  <li key={e.id}>
                    <span className="mx-small">{fmt(e.at)} · {e.sens.map((s) => m.sensations[s]).join(', ')} · {m.intensityLevels[e.intensity]}</span>
                    {e.note && <span className="mx-small" style={{ display: 'block' }}>{e.note}</span>}
                    <button className="mx-link-btn" onClick={() => log.remove(e.id)}>{m.remove}</button>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}

      <h2 className="mx-h2">{m.evolution}</h2>
      <div className="mx-chips" role="group" aria-label={m.evolution}>
        <button className="mx-chip" aria-pressed={range === 7} onClick={() => setRange(7)}>{m.range7}</button>
        <button className="mx-chip" aria-pressed={range === 30} onClick={() => setRange(30)}>{m.range30}</button>
      </div>
      {Object.keys(heat).length === 0 ? (
        <p className="mx-small">{m.empty}</p>
      ) : (
        <>
          <p className="mx-small">{m.legend}</p>
          <ul className="bodymap-list">
            {Object.entries(heat).sort((a, b) => b[1].n - a[1].n).map(([z, h]) => (
              <li key={z} className="mx-card soft">
                <span className="bodymap-swatch" style={{ background: SENSATIONS[h.top] }} aria-hidden="true" />
                <strong> {m.zones[z].name}</strong>
                <span className="mx-small"> · {t('bodymap.entries', { n: h.n })} · {m.mostCommon}: {m.sensations[h.top]}</span>
              </li>
            ))}
          </ul>
        </>
      )}
    </ModuleShell>
  );
}
