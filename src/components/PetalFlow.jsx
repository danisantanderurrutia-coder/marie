// src/components/PetalFlow.jsx
// Immersive expressive sanctuary for each of the 5 Ikigai Petals.
// Integrates dedicated tools, poetic philosophy, and reflective space.

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
  BookOpen,
  Zap,
  Calendar,
  PenTool
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
      bgGlow: 'rgba(216, 74, 88, 0.16)',
      borderAccent: '#D84A58',
      motto: '„Dein Feuer verbrennt dich nicht, wenn du lernst, mit ihm zu tanzen.“',
      tools: [
        {
          key: 'doombreaker',
          icon: Zap,
          title: t('ikigai.petals.fire.tools.doombreaker.title'),
          desc: t('ikigai.petals.fire.tools.doombreaker.desc'),
          action: () => openModule('doombreaker'),
          featured: true
        },
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
      bgGlow: 'rgba(125, 163, 190, 0.16)',
      borderAccent: '#7DA3BE',
      motto: '„Dein Körper ist kein Kunstwerk zur Bewertung, sondern dein treuester Gefährte.“',
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
          key: 'doombreaker',
          icon: Zap,
          title: t('ikigai.petals.body.tools.doombreaker.title'),
          desc: t('ikigai.petals.body.tools.doombreaker.desc'),
          action: () => openModule('doombreaker')
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
      bgGlow: 'rgba(110, 140, 110, 0.16)',
      borderAccent: '#6E8C6E',
      motto: '„Ein einziger kleiner Schritt von 5 Minuten genügt. Lass deine Ideen atmen.“',
      tools: [
        {
          key: 'ideas',
          icon: Lightbulb,
          title: t('ikigai.petals.create.tools.ideas.title'),
          desc: t('ikigai.petals.create.tools.ideas.desc'),
          action: () => openModule('ideas'),
          featured: true
        },
        {
          key: 'words',
          icon: BookOpen,
          title: t('ikigai.petals.create.tools.words.title'),
          desc: t('ikigai.petals.create.tools.words.desc'),
          action: () => openModule('words')
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
      bgGlow: 'rgba(155, 89, 182, 0.16)',
      borderAccent: '#9B59B6',
      motto: '„Wir sind aus demselben geheimnisvollen Stoff gewebt wie die Sterne über uns.“',
      tools: [
        {
          key: 'astral',
          icon: Compass,
          title: t('ikigai.petals.dreams.tools.astral.title'),
          desc: t('ikigai.petals.dreams.tools.astral.desc'),
          action: () => openModule('astral'),
          featured: true
        },
        {
          key: 'words',
          icon: BookOpen,
          title: t('ikigai.petals.dreams.tools.words.title'),
          desc: t('ikigai.petals.dreams.tools.words.desc'),
          action: () => openModule('words')
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
          icon: PenTool,
          title: t('ikigai.petals.dreams.tools.letters.title'),
          desc: t('ikigai.petals.dreams.tools.letters.desc'),
          action: () => openModule('heart')
        }
      ]
    },
    me: {
      color: '#C5A081',
      bgGlow: 'rgba(197, 160, 129, 0.16)',
      borderAccent: '#C5A081',
      motto: '„Dich selbst mit radikaler Zärtlichkeit anzunehmen ist die schönste Heimkehr.“',
      tools: [
        {
          key: 'diary',
          icon: Calendar,
          title: t('ikigai.petals.me.tools.diary.title'),
          desc: t('ikigai.petals.me.tools.diary.desc'),
          action: () => openModule('diary'),
          featured: true
        },
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

      {/* Atmospheric Hero Card */}
      <div 
        className="mx-card"
        style={{
          borderLeft: `4px solid ${theme.color}`,
          background: `linear-gradient(135deg, ${theme.bgGlow} 0%, rgba(20, 15, 22, 0.85) 100%)`,
          padding: '20px 18px',
          borderRadius: 14,
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <h2 className="mx-title" style={{ margin: '0 0 4px', fontSize: 24 }}>
          {petalData.name}
        </h2>
        <p className="mx-small" style={{ color: theme.color, fontWeight: 600, fontSize: 13, marginBottom: 12 }}>
          {petalData.subtitle}
        </p>

        <p className="mx-text" style={{ fontSize: 13.5, lineHeight: 1.6, color: '#EAE3D6', margin: 0 }}>
          {petalData.philosophy}
        </p>

        {theme.motto && (
          <p 
            className="font-serif" 
            style={{ 
              marginTop: 12, 
              paddingTop: 10, 
              borderTop: '1px solid rgba(255, 255, 255, 0.08)', 
              color: '#FADBD8', 
              fontSize: 12.5, 
              fontStyle: 'italic',
              margin: '12px 0 0'
            }}
          >
            {theme.motto}
          </p>
        )}
      </div>

      {/* Integrated Tools Section */}
      <div>
        <h3 className="mx-h2" style={{ fontSize: 16, margin: '10px 0 10px', color: '#FFF' }}>
          {t('ikigai.toolsTitle')}
        </h3>

        <div className="hub-grid" style={{ gap: 10 }}>
          {theme.tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <button
                key={tool.key}
                className="hub-card"
                onClick={() => { playSoftTap(); tool.action(); }}
                style={tool.featured ? { border: `1.5px solid ${theme.color}80`, background: `${theme.color}10` } : {}}
              >
                <span 
                  className="hub-icon" 
                  style={{ background: `${theme.color}20`, color: theme.color }}
                >
                  <Icon size={20} aria-hidden="true" />
                </span>
                <span className="hub-text">
                  <strong style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    {tool.title}
                    {tool.featured && (
                      <span style={{ fontSize: 9.5, color: theme.color, background: `${theme.color}25`, padding: '1px 6px', borderRadius: 8 }}>
                        ★ Fokus
                      </span>
                    )}
                  </strong>
                  <span>{tool.desc}</span>
                </span>
                <ChevronRight size={18} style={{ color: theme.color, opacity: 0.8 }} aria-hidden="true" />
              </button>
            );
          })}
        </div>
      </div>

      {/* Expressive Journaling / Inward Dialogue Card */}
      <div className="mx-card soft" style={{ marginTop: 8, padding: '18px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <Sparkles size={16} style={{ color: theme.color }} />
          <h3 className="mx-h2" style={{ margin: 0, fontSize: 15 }}>
            {t('ikigai.expressTitle')}
          </h3>
        </div>

        <p className="mx-small" style={{ color: '#D0C8B8', fontSize: 13, lineHeight: 1.5, marginBottom: 12 }}>
          {petalData.prompt}
        </p>

        <textarea
          className="mx-textarea"
          rows={4}
          placeholder="Schreibe frei von der Seele..."
          value={reflectionText}
          onChange={(e) => setReflectionText(e.target.value)}
          style={{ width: '100%', fontSize: 13.5, lineHeight: 1.6 }}
        />

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 10 }}>
          <button className="mx-btn warm small" onClick={handleSaveReflection}>
            <Check size={14} /> {t('ikigai.expressSave')}
          </button>
        </div>

        {savedToast && (
          <p className="mx-toast animate-fade-in" role="status" style={{ marginTop: 8 }}>
            {t('ikigai.expressSavedToast')}
          </p>
        )}
      </div>
    </div>
  );
}
