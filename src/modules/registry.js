// src/modules/registry.js
// One entry per guided module. Components are lazy-loaded so the first paint stays light.
// Titles/descriptions live in i18n under hub.cards.<id> (each feature ships its own i18n file).

import { lazy } from 'react';
// Icons are imported where modules are registered below.
// import { Wind } from 'lucide-react';

export const MODULES = [
  // { id: 'stress', icon: Wind, color: '#8E3B46', Component: lazy(() => import('./stress/Stress')) },
];

export function getModule(id) {
  return MODULES.find((m) => m.id === id);
}

export { lazy };
