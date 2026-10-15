// src/modules/registry.js
// One entry per guided module. Components are lazy-loaded so the first paint stays light.
// Titles/descriptions live in i18n under hub.cards.<id> (each feature ships its own i18n file).

import { lazy } from 'react';
// Icons are imported where modules are registered below.
import { PersonStanding, Hand, Lightbulb, Heart, Brain } from 'lucide-react';

export const MODULES = [
  { id: 'checkin', icon: PersonStanding, color: '#C87D55', Component: lazy(() => import('./checkin/BodyCheckin')) },
  { id: 'bodymap', icon: Hand, color: '#B5726B', Component: lazy(() => import('./bodymap/BodyMap')) },
  { id: 'ideas', icon: Lightbulb, color: '#6E8C6E', Component: lazy(() => import('./ideas/Ideas')) },
  { id: 'heart', icon: Heart, color: '#B23A48', Component: lazy(() => import('./heart/Heart')) },
  { id: 'therapy', icon: Brain, color: '#7DA3BE', Component: lazy(() => import('./therapy/Therapy')) },
  // { id: 'stress', icon: Wind, color: '#8E3B46', Component: lazy(() => import('./stress/Stress')) },
];

export function getModule(id) {
  return MODULES.find((m) => m.id === id);
}

export { lazy };
