// src/modules/registry.js
// One entry per guided module. Components are lazy-loaded so the first paint stays light.
// Titles/descriptions live in i18n under hub.cards.<id> (each feature ships its own i18n file).

import { lazy } from 'react';
import { 
  PersonStanding, 
  Hand, 
  Lightbulb, 
  Heart, 
  Brain, 
  Sparkles, 
  Wind, 
  Compass, 
  Flame, 
  Calendar, 
  BookOpen,
  Flower2 
} from 'lucide-react';

export const MODULES = [
  { 
    id: 'doombreaker', 
    icon: Flame, 
    color: '#D84A58', 
    petals: ['fire', 'body'],
    Component: lazy(() => import('./doombreaker/DoomBreaker')) 
  },
  { 
    id: 'checkin', 
    icon: PersonStanding, 
    color: '#C87D55', 
    petals: ['body', 'me'],
    Component: lazy(() => import('./checkin/BodyCheckin')) 
  },
  { 
    id: 'bodymap', 
    icon: Hand, 
    color: '#B5726B', 
    petals: ['body', 'fire'],
    Component: lazy(() => import('./bodymap/BodyMap')) 
  },
  { 
    id: 'ideas', 
    icon: Lightbulb, 
    color: '#6E8C6E', 
    petals: ['create', 'dreams'],
    Component: lazy(() => import('./ideas/Ideas')) 
  },
  { 
    id: 'heart', 
    icon: Heart, 
    color: '#B23A48', 
    petals: ['me', 'dreams'],
    Component: lazy(() => import('./heart/Heart')) 
  },
  { 
    id: 'diary', 
    icon: Calendar, 
    color: '#C5A081', 
    petals: ['me'],
    Component: lazy(() => import('./diary/IntimateDiary')) 
  },
  { 
    id: 'therapy', 
    icon: Brain, 
    color: '#7DA3BE', 
    petals: ['me', 'fire'],
    Component: lazy(() => import('./therapy/Therapy')) 
  },
  { 
    id: 'aura', 
    icon: Sparkles, 
    color: '#D84A58', 
    petals: ['fire', 'me'],
    Component: lazy(() => import('./aura/Aura')) 
  },
  { 
    id: 'stress', 
    icon: Wind, 
    color: '#8E3B46', 
    petals: ['fire', 'body'],
    Component: lazy(() => import('./stress/Stress')) 
  },
  { 
    id: 'astral', 
    icon: Compass, 
    color: '#9B59B6', 
    petals: ['dreams', 'me'],
    Component: lazy(() => import('./astral/AstralMap')) 
  },
  { 
    id: 'words', 
    icon: BookOpen, 
    color: '#9B59B6', 
    petals: ['dreams', 'create'],
    Component: lazy(() => import('./words/SoulWords')) 
  },
  { 
    id: 'zengarden', 
    icon: Flower2, 
    color: '#D84A58', 
    petals: ['create', 'dreams'],
    Component: lazy(() => import('./game/ZenGarden')) 
  }
];

export function getModule(id) {
  return MODULES.find((m) => m.id === id);
}

export { lazy };
