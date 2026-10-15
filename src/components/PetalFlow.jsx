import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Sparkles, 
  Check, 
  ChevronRight, 
  Flame, 
  PersonStanding, 
  Hand, 
  Lightbulb, 
  Heart, 
  Compass, 
  Brain, 
  Wind, 
  Shield, 
  Droplets,
  BookOpen
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { playSoftTap, playSoftChime } from '../utils/audio';

export default function PetalFlow({ 
  petalId, 
  onBack, 
  openModule, 
  goToTab, 
  soundEnabled 
}) {
  const { language, t } = useLanguage();
  const petalData = t(`ikigai.petals.${petalId}`) || {};

  const [savedToast, setSavedToast] = useState(false);
  const [reflectionText, setReflectionText] = useState(() => {
    try {
      return localStorage.getItem(`marie_petal_express_${petalId}`) || '';
    } catch (e) {
      return '';
    }
  });

  const handleSaveReflection = () => {
    if (soundEnabled) playSoftChime();
    try {
      localStorage.setItem(`marie_petal_express_${petalId}`, reflectionText);
    } catch (e) {}
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2400);
  };

  const petalThemes = {
    fire: {
      color: '#D84A58',
      bgGlow: 'rgba(216, 74, 88, 0.12)',
      borderAccent: '#D84A58',
      tools: [
        {
          key: 'sanctuary',
          icon: Flame,
          title: t('ikigai.petals.fire.tools.sanctuary.title'),
          desc: t('ikigai.petals.fire.tools.sanctuary.desc'),
          action: () => goToTab('aura')
        },
        {
          key: 'aura',
          icon: Sparkles,
          title: t('ikigai.petals.fire.tools.aura.title'),
          desc: t('ikigai.petals.fire.tools.aura.desc'),
          action: () => openModule('aura')
        },
        {
          key: 'stress',
          icon: Wind,
          title: t('ikigai.petals.fire.tools.stress.title'),
          desc: t('ikigai.petals.fire.tools.stress.desc'),
          action: () => openModule('stress')
        }
      ]
    },
    body: {
      color: '#7DA3BE',
      bgGlow: 'rgba(125, 163, 190, 0.12)',
      borderAccent: '#7DA3BE',
      tools: [
        {
          key: 'checkin',
          icon: PersonStanding,
          title: t('ikigai.petals.body.tools.checkin.title'),
          desc: t('ikigai.petals.body.tools.checkin.desc'),
          action: () => openModule('checkin')
        },
        {
          key: 'bodymap',
          icon: Hand,
          title: t('ikigai.petals.body.tools.bodymap.title'),
          desc: t('ikigai.petals.body.tools.bodymap.desc'),
          action: () => openModule('bodymap')
        },
        {
          key: 'ayurveda',
          icon: Droplets,
          title: t('ikigai.petals.body.tools.ayurveda.title'),
          desc: t('ikigai.petals.body.tools.ayurveda.desc'),
          action: () => goToTab('skin')
        },
        {
          key: 'massage',
          icon: Heart,
          title: t('ikigai.petals.body.tools.massage.title'),
          desc: t('ikigai.petals.body.tools.massage.desc'),
          action: () => goToTab('skin')
        }
      ]
    },
    create: {
      color: '#6E8C6E',
      bgGlow: 'rgba(110, 140, 110, 0.12)',
      borderAccent: '#6E8C6E',
      tools: [
        {
          key: 'ideas',
          icon: Lightbulb,
          title: t('ikigai.petals.create.tools.ideas.title'),
          desc: t('ikigai.petals.create.tools.ideas.desc'),
          action: () => openModule('ideas')
        },
        {
          key: 'hobbies',
          icon: Sparkles,
          title: t('ikigai.petals.create.tools.hobbies.title'),
          desc: t('ikigai.petals.create.tools.hobbies.desc'),
          action: () => goToTab('hobbies')
        }
      ]
    },
    dreams: {
      color: '#9B59B6',
      bgGlow: 'rgba(155, 89, 182, 0.12)',
      borderAccent: '#9B59B6',
      tools: [
        {
          key: 'astral',
          icon: Compass,
          title: t('ikigai.petals.dreams.tools.astral.title'),
          desc: t('ikigai.petals.dreams.tools.astral.desc'),
          action: () => openModule('astral')
        },
        {
          key: 'vision',
          icon: Sparkles,
          title: t('ikigai.petals.dreams.tools.vision.title'),
          desc: t('ikigai.petals.dreams.tools.vision.desc'),
          action: () => goToTab('dreams')
        },
        {
          key: 'letters',
          icon: BookOpen,
          title: t('ikigai.petals.dreams.tools.letters.title'),
          desc: t('ikigai.petals.dreams.tools.letters.desc'),
          action: () => openModule('heart')
        }
      ]
    },
    me: {
      color: '#C5A081',
      bgGlow: 'rgba(197, 160, 129, 0.12)',
      borderAccent: '#C5A081',
      tools: [
        {
          key: 'heart',
          icon: Heart,
          title: t('ikigai.petals.me.tools.heart.title'),
          desc: t('ikigai.petals.me.tools.heart.desc'),
          action: () => openModule('heart')
        },
        {
          key: 'therapy',
          icon: Brain,
          title: t('ikigai.petals.me.tools.therapy.title'),
          desc: t('ikigai.petals.me.tools.therapy.desc'),
          action: () => openModule('therapy')
        },
        {
          key: 'stoic',
          icon: Shield,
          title: t('ikigai.petals.me.tools.stoic.title'),
          desc: t('ikigai.petals.me.tools.stoic.desc'),
          action: () => goToTab('skin')
        }
      ]
    }
  };

  const theme = petalThemes[petalId] || petalThemes.me;

  return (
    <div className="petal-flow-view animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Top Bar with Back Button */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button
          className="mx-back"
          onClick={() => { playSoftTap(); onBack(); }}
          style={{ cursor: 'pointer' }}
        >
          <ArrowLeft size={18} aria-hidden="true" /> {t('ikigai.backToFlower')}
        </button>
        <span 
          className="mx-badge" 
          style={{ background: theme.bgGlow, color: theme.color, border: `1px solid ${theme.color}40` }}
        >
          {petalData.tag}
        </span>
      </div>

      {/* Hero Header */}
      <div>
        <h2 className="mx-title" style={{ margin: '4px 0 2px' }}>
          {petalData.name}
        </h2>
        <p className="mx-small" style={{ color: theme.color, fontWeight: 600 }}>
          {petalData.subtitle}
        </p>
      </div>

      {/* Philosophy Manifesto Card */}
      <div 
        className="mx-card glow" 
        style={{ 
          background: `linear-gradient(135deg, ${theme.bgGlow} 0%, rgba(20, 16, 22, 0.95) 100%)`, 
          borderLeft: `4px solid ${theme.color}`,
          borderTop: `1px solid ${theme.color}30`,
          borderRight: `1px solid ${theme.color}20`,
          borderBottom: `1px solid ${theme.color}20`,
          padding: '16px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <Sparkles size={16} style={{ color: theme.color }} />
          <strong style={{ fontSize: '13px', color: '#FFF' }}>
            {language === 'de' ? 'Philosophie dieses Blattes' : language === 'en' ? 'Petal Philosophy' : 'Filosofía de este pétalo'}
          </strong>
        </div>
        <p className="mx-text font-serif" style={{ fontSize: '13.5px', lineHeight: 1.6, color: '#FAF7F2' }}>
          "{petalData.philosophy}"
        </p>
      </div>

      {/* Expressive Reflection Space */}
      <div className="mx-card soft" style={{ padding: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <span style={{ fontSize: '16px' }}>✍️</span>
          <h3 className="mx-h3" style={{ margin: 0, fontSize: '13.5px' }}>
            {t('ikigai.expressTitle')}
          </h3>
        </div>
        <p className="mx-small" style={{ color: '#D0C8B8', marginBottom: '10px', lineHeight: 1.45 }}>
          {petalData.prompt}
        </p>

        <textarea
          className="skin-note-input"
          value={reflectionText}
          onChange={(e) => setReflectionText(e.target.value)}
          rows={3}
          placeholder={language === 'de' ? 'Schreibe frei und ohne Zensur...' : language === 'en' ? 'Write freely without censorship...' : 'Escribe con libertad y sin juicio...'}
          style={{ width: '100%', marginBottom: '10px' }}
        />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>
            {savedToast && (
              <span className="mx-toast" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '12px' }}>
                <Check size={13} /> {t('ikigai.expressSavedToast')}
              </span>
            )}
          </span>
          <button
            type="button"
            className="mx-btn warm"
            onClick={handleSaveReflection}
            style={{ padding: '7px 16px', fontSize: '12.5px', background: theme.color }}
          >
            {t('ikigai.expressSave')}
          </button>
        </div>
      </div>

      {/* Independent Tools & Modules Stack */}
      <div className="mx-stack" style={{ gap: '10px', marginTop: '4px' }}>
        <span className="mx-kicker" style={{ fontSize: '11px' }}>
          {t('ikigai.toolsTitle')}
        </span>

        {theme.tools.map((tool) => {
          const ToolIcon = tool.icon;
          return (
            <button
              key={tool.key}
              type="button"
              className="hub-card"
              onClick={() => {
                if (soundEnabled) playSoftTap();
                tool.action();
              }}
              style={{
                cursor: 'pointer',
                textAlign: 'left',
                borderLeft: `3px solid ${theme.color}`
              }}
            >
              <span 
                className="hub-icon" 
                style={{ background: theme.bgGlow, color: theme.color }}
              >
                <ToolIcon size={20} aria-hidden="true" />
              </span>
              <span className="hub-text">
                <strong style={{ color: '#FFF' }}>{tool.title}</strong>
                <span>{tool.desc}</span>
              </span>
              <ChevronRight size={18} style={{ color: theme.color }} aria-hidden="true" />
            </button>
          );
        })}
      </div>
    </div>
  );
}
