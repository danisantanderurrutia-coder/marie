import React, { useMemo } from 'react';
import { Sparkles, Wind, LayoutGrid, ChevronRight, Lock, EyeOff, LifeBuoy } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import LanguageSwitch from './LanguageSwitch';
import { readJSON, dayKey } from '../utils/storage';
import { KEYS } from '../utils/keys';
import { playSoftTap } from '../utils/audio';
import { LOGO_04 } from '../utils/assets';
import './Landing.css';

function partOfDay(hour) {
  if (hour >= 5 && hour < 11) return 'morning';
  if (hour >= 11 && hour < 17) return 'day';
  if (hour >= 17 && hour < 23) return 'evening';
  return 'night';
}

// Picks up to three gentle, non-pushy suggestions based on what she has (not) done today.
function pickSuggestions() {
  const out = [];
  const aura = readJSON(KEYS.aura, []);
  const stress = readJSON(KEYS.stress, []);
  const ideas = readJSON(KEYS.ideas, []);
  const today = dayKey();

  if (!aura.some((a) => dayKey(a.at) === today)) out.push('aura');
  const threeDays = Date.now() - 3 * 86400000;
  if (stress.filter((s) => new Date(s.at).getTime() > threeDays).length >= 2) out.push('stress');
  if (ideas.some((i) => i.stage === 'moving' && i.steps && i.steps.some((s) => !s.done))) out.push('ideas');

  const rotation = ['checkin', 'bodymap', 'heart'];
  const startIdx = new Date().getDate() % rotation.length;
  for (let i = 0; i < rotation.length && out.length < 3; i++) out.push(rotation[(startIdx + i) % rotation.length]);
  if (!ideas.length && out.length < 3) out.push('ideas0');
  return out.slice(0, 3);
}

export default function Landing({ openModule, goToTab, openSupport }) {
  const { t } = useLanguage();
  const hour = new Date().getHours();
  const suggestions = useMemo(pickSuggestions, []);
  const recent = useMemo(() => readJSON(KEYS.aura, []).slice(0, 7).reverse(), []);
  const trustIcons = [Lock, EyeOff, LifeBuoy];

  const go = (id, intent) => { playSoftTap(); openModule(id, intent); };

  return (
    <div className="landing mx-screen animate-fade-in">
      <div className="landing-top">
        <img src={LOGO_04} alt="" className="landing-logo" width="44" height="44" />
        <LanguageSwitch variant="full" showIcon />
      </div>

      <header className="landing-hero">
        <h1 className="mx-title landing-title">{t(`landing.greet.${partOfDay(hour)}`)}</h1>
        <p className="mx-lead">{t('landing.value')}</p>
      </header>

      <div className="landing-ctas">
        <button className="mx-btn warm full landing-primary" onClick={() => go('aura')}>
          <Sparkles size={18} aria-hidden="true" /> {t('landing.ctaPrimary')}
        </button>
        <p className="mx-small landing-hint">{t('landing.ctaPrimaryHint')}</p>
        <div className="landing-secondary">
          <button className="mx-btn ghost" onClick={() => go('stress', { sos: true })}>
            <Wind size={17} aria-hidden="true" /> {t('landing.ctaStress')}
          </button>
          <button className="mx-btn ghost" onClick={() => { playSoftTap(); goToTab('space'); }}>
            <LayoutGrid size={17} aria-hidden="true" /> {t('landing.ctaSpace')}
          </button>
        </div>
      </div>

      <section aria-labelledby="foryou-title" className="landing-section">
        <h2 id="foryou-title" className="mx-h2">{t('landing.forYou')}</h2>
        <p className="mx-small">{t('landing.forYouLead')}</p>
        <div className="hub-grid" style={{ marginTop: 10 }}>
          {suggestions.map((id) => (
            <button key={id} className="hub-card" onClick={() => go(id === 'ideas0' ? 'ideas' : id)}>
              <span className="hub-text">
                <strong>{t(`landing.suggestions.${id}.title`)}</strong>
                <span>{t(`landing.suggestions.${id}.desc`)}</span>
              </span>
              <ChevronRight size={18} aria-hidden="true" />
            </button>
          ))}
        </div>
      </section>

      <section aria-labelledby="recent-title" className="landing-section">
        <h2 id="recent-title" className="mx-h2">{t('landing.recent')}</h2>
        {recent.length ? (
          <div className="landing-strip" role="img" aria-label={t('landing.recent')}>
            {recent.map((a) => (
              <span key={a.id} className="landing-orb" style={{ background: a.gradient || a.color }} title={new Date(a.at).toLocaleDateString()} />
            ))}
          </div>
        ) : (
          <p className="mx-small">{t('landing.recentEmpty')}</p>
        )}
      </section>

      <ul className="landing-trust">
        {(t('landing.trust') || []).map((line, i) => {
          const Icon = trustIcons[i] || Lock;
          return (
            <li key={line}>
              <Icon size={15} aria-hidden="true" />
              {i === 2 ? <button className="mx-link-btn" onClick={openSupport}>{line}</button> : <span>{line}</span>}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
