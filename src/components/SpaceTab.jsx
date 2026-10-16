// src/components/SpaceTab.jsx
// "Mein Raum" / "Mi Espacio": Unified Ikigai Rose + Direct Tools Directory.
// Both views displayed simultaneously without segmented barrier, with petal badges.

import React, { useState, Suspense } from 'react';
import { 
  ChevronRight, 
  Download, 
  Trash2, 
  ShieldCheck, 
  LifeBuoy, 
  Sparkles, 
  LayoutGrid
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { MODULES, getModule } from '../modules/registry';
import { exportAllData, eraseAllData } from '../utils/storage';
import { playSoftTap } from '../utils/audio';
import { SafetyNote } from './ModuleShell';
import IkigaiFlower from './IkigaiFlower';
import PetalFlow from './PetalFlow';

export default function SpaceTab({ 
  soundEnabled, 
  activeModule, 
  intent, 
  openModule, 
  closeModule, 
  goToTab, 
  openSupport 
}) {
  const { t } = useLanguage();
  const [message, setMessage] = useState('');
  const [selectedPetalId, setSelectedPetalId] = useState(null); // 'body' | 'fire' | 'create' | 'dreams' | 'me'

  // If a full guided module is currently open (e.g. doombreaker, checkin, bodymap, ideas, heart, etc.)
  const current = activeModule ? getModule(activeModule) : null;
  if (current) {
    const Module = current.Component;
    return (
      <Suspense fallback={<div className="mx-screen"><p className="mx-small">…</p></div>}>
        <Module
          soundEnabled={soundEnabled}
          intent={intent}
          onBack={closeModule}
          openModule={openModule}
          openSupport={openSupport}
        />
      </Suspense>
    );
  }

  // If a petal expressive flow is currently open
  if (selectedPetalId) {
    return (
      <section className="mx-screen animate-fade-in" aria-labelledby="petal-flow-title">
        <PetalFlow
          petalId={selectedPetalId}
          onBack={() => setSelectedPetalId(null)}
          openModule={openModule}
          goToTab={goToTab}
          soundEnabled={soundEnabled}
        />
        <SafetyNote onOpenSupport={openSupport} />
      </section>
    );
  }

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(exportAllData(), null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `marie-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleErase = () => {
    if (window.confirm(t('privacy.eraseConfirm'))) {
      eraseAllData();
      setMessage(t('privacy.erased'));
      setTimeout(() => window.location.reload(), 900);
    }
  };

  const petalBadges = {
    fire: { name: t('ikigai.petals.fire.name'), color: '#D84A58', emoji: '🔥' },
    body: { name: t('ikigai.petals.body.name'), color: '#7DA3BE', emoji: '🌿' },
    create: { name: t('ikigai.petals.create.name'), color: '#6E8C6E', emoji: '💡' },
    dreams: { name: t('ikigai.petals.dreams.name'), color: '#9B59B6', emoji: '🌌' },
    me: { name: t('ikigai.petals.me.name'), color: '#C5A081', emoji: '🤍' }
  };

  return (
    <section className="mx-screen animate-fade-in" aria-labelledby="hub-title" style={{ paddingBottom: 40 }}>
      <div className="mx-kicker">{t('ikigai.kicker')}</div>
      <h1 id="hub-title" className="mx-title">{t('ikigai.title')}</h1>
      <p className="mx-lead">{t('ikigai.lead')}</p>

      {/* 1. THE IKIGAI ROSE (Visual Interactive Flower on Top) */}
      <div className="animate-fade-in" style={{ marginTop: 8 }}>
        <IkigaiFlower
          onSelectPetal={(id) => setSelectedPetalId(id)}
          soundEnabled={soundEnabled}
        />
      </div>

      {/* 2. DIRECT TOOLS DIRECTORY (All tools immediately underneath) */}
      <div style={{ marginTop: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
          <LayoutGrid size={15} style={{ color: '#D84A58' }} />
          <h2 className="mx-h2" style={{ margin: 0, fontSize: 16 }}>
            {t('hub.directTools') || 'Direkte Werkzeuge & Praktiken'}
          </h2>
        </div>

        <div className="hub-grid animate-fade-in" style={{ gap: 10 }}>
          {MODULES.map((m) => {
            const Icon = m.icon;
            const title = t(`hub.cards.${m.id}.title`) || m.id;
            const desc = t(`hub.cards.${m.id}.desc`) || '';
            return (
              <button
                key={m.id}
                className="hub-card"
                onClick={() => { playSoftTap(); openModule(m.id); }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '10px 12px',
                  borderRadius: 14,
                  cursor: 'pointer',
                  textAlign: 'left',
                  border: '1px solid rgba(197, 160, 129, 0.24)',
                  background: '#FFFFFF',
                  boxShadow: '0 2px 8px rgba(44, 30, 25, 0.035)',
                  transition: 'all 0.2s ease'
                }}
              >
                <span 
                  className="hub-icon" 
                  style={{ 
                    background: `${m.color}15`, 
                    color: m.color,
                    border: `1.2px solid ${m.color}35`,
                    width: 38,
                    height: 38,
                    borderRadius: 11,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <Icon size={18} aria-hidden="true" />
                </span>

                <span className="hub-text" style={{ flex: 1, minWidth: 0, padding: '0 10px' }}>
                  <strong style={{ fontSize: 13.5, color: '#241B19', display: 'block', fontWeight: 600 }}>
                    {title}
                  </strong>
                  <span style={{ fontSize: 11, color: '#5C4E48', display: 'block', margin: '1px 0 5px', lineHeight: 1.35 }}>
                    {desc}
                  </span>

                  {/* Petal Association Badges (Max 2 per tool) */}
                  <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                    {(m.petals || []).map((petalKey) => {
                      const p = petalBadges[petalKey];
                      if (!p) return null;
                      return (
                        <span
                          key={petalKey}
                          onClick={(e) => {
                            e.stopPropagation();
                            playSoftTap();
                            setSelectedPetalId(petalKey);
                          }}
                          title={`Zum Blütenblatt: ${p.name}`}
                          style={{
                            fontSize: '8.5px',
                            padding: '1px 5px',
                            borderRadius: '5px',
                            background: `${p.color}18`,
                            color: p.color,
                            border: `1px solid ${p.color}35`,
                            fontWeight: 600,
                            cursor: 'pointer'
                          }}
                        >
                          {p.emoji} {p.name}
                        </span>
                      );
                    })}
                  </div>
                </span>

                <ChevronRight size={16} style={{ color: m.color, opacity: 0.6 }} aria-hidden="true" />
              </button>
            );
          })}
        </div>
      </div>

      <SafetyNote onOpenSupport={openSupport} />

      {/* Privacy & Storage Control Card */}
      <div className="mx-card soft" style={{ marginTop: 22 }}>
        <div className="mx-row">
          <ShieldCheck size={20} aria-hidden="true" />
          <h2 className="mx-h2" style={{ margin: 0, fontSize: 15 }}>{t('privacy.dataTitle')}</h2>
        </div>
        <p className="mx-text" style={{ marginTop: 8, fontSize: 13 }}>{t('privacy.dataLead')}</p>
        <ul className="mx-small" style={{ paddingLeft: 18, marginTop: 8, fontSize: 12 }}>
          {(t('privacy.points') || []).map((p) => <li key={p}>{p}</li>)}
        </ul>
        <div className="mx-row" style={{ marginTop: 12 }}>
          <button className="mx-btn ghost small" onClick={handleExport}>
            <Download size={15} aria-hidden="true" /> {t('privacy.export')}
          </button>
          <button className="mx-btn ghost small" onClick={handleErase}>
            <Trash2 size={15} aria-hidden="true" /> {t('privacy.erase')}
          </button>
        </div>
        {message && <p className="mx-toast" role="status">{message}</p>}
      </div>

      <button className="mx-btn warm full" style={{ marginTop: 14 }} onClick={openSupport}>
        <LifeBuoy size={18} aria-hidden="true" /> {t('safety.helpButton')}
      </button>
    </section>
  );
}
