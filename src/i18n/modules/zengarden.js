// src/i18n/modules/zengarden.js
// "Zen-Garten & Rosen-Orakel" — tactile, playful, aesthetic mini-games for Marie.
// DE, ES, EN.

export default {
  de: {
    hub: {
      cards: {
        zengarden: {
          title: 'Zen-Garten & Rosen-Orakel',
          desc: 'Berühre den Wind: Schwebende Rosenblüten, 3D-Orakelkarten und Seelen-Memory.'
        }
      }
    },
    zengarden: {
      kicker: 'Spielerische Oase',
      title: 'Zen-Garten & Orakel',
      lead: 'Ein Raum zum spielerischen Verweilen. Berühre die Brise, ziehe eine geheimnisvolle Orakelkarte oder finde die Symbole eurer Seelen.',
      tabs: {
        petals: '1. Blüten im Wind',
        oracle: '2. Rosen-Orakel (3D)',
        memory: '3. Seelen-Memory'
      },
      petalsMode: {
        prompt: 'Tippe oder ziehe deinen Finger über den Bildschirm, um Rosenblüten im Wind aufblühen zu lassen:',
        bloomedCount: 'Aufgeblühte Blüten',
        clearBtn: 'Garten sanft leeren',
        breezeHint: 'Jede Berührung erzeugt einen sanften Klang.'
      },
      oracleMode: {
        prompt: 'Wähle eine der drei Karten und tippe darauf, um ihre geheime Botschaft zu enthüllen:',
        flipHint: 'Tippe zum Umdrehen',
        shuffleBtn: 'Orakel neu mischen',
        cards: [
          {
            title: 'Die Glut im Verborgenen',
            text: 'Welcher kleine Wunsch flüstert in dir, den du noch niemandem laut erzählt hast?',
            complice: 'Frage für Daniel heute Abend: Was war dein erster Gedanke, als du mich heute gesehen hast?'
          },
          {
            title: 'Souveräne Sanftheit',
            text: 'Du musst heute niemanden beeindrucken. Du darfst einfach nur existieren und deine eigene Wärme spüren.',
            complice: 'Micro-Ritual: Schenke dir selbst 3 ruhige Atemzüge, bevor du auf die nächste Nachricht antwortest.'
          },
          {
            title: 'Kosmische Fügung',
            text: 'Der Drache und die Ratte: Ihr seid nicht zufällig zur selben Zeit auf dieser Erde.',
            complice: 'Liebes-Geste: Lege deine Hand für 10 Sekunden wortlos auf Daniels Brustbein.'
          },
          {
            title: 'Der Duft des Augenblicks',
            text: 'Was hat deine Sinne in den letzten 24 Stunden überrascht? Eine Farbe, ein Geschmack, ein Lichtstrahl?',
            complice: 'Frage an Daniel: Wenn unser Zusammensein ein Musikstück wäre, welches Instrument wärst du?'
          },
          {
            title: 'Erlaubnis zur Unvollkommenheit',
            text: 'Deine Dornen sind kein Makel. Sie schützen das Zarteste in dir mit Würde.',
            complice: 'Sanftes Innehalten: Lass die Zunge vom Gaumen sinken und spüre die Weite im Mund.'
          }
        ]
      },
      memoryMode: {
        prompt: 'Finde die 4 Paare eurer Seelensymbole:',
        moves: 'Versuche',
        wonTitle: 'Wundervoll gefunden!',
        wonDesc: 'Alle Paare vereint. Du hast ein feines Gespür für Harmonie.',
        playAgain: 'Noch einmal spielen',
        symbols: {
          rose: 'Wilde Rose',
          dragon: 'Metalldrache',
          rat: 'Feuerratte',
          moon: 'Waage-Mondin'
        }
      }
    }
  },
  es: {
    hub: {
      cards: {
        zengarden: {
          title: 'Jardín Zen & Oráculo',
          desc: 'Toca la brisa: pétalos flotantes, cartas 3D del oráculo y memory de símbolos.'
        }
      }
    },
    zengarden: {
      kicker: 'Oasis de juego',
      title: 'Jardín Zen & Oráculo',
      lead: 'Un rincón lúdico y sensorial. Toca la brisa, saca una carta mágica del oráculo o empareja los símbolos sagrados de su historia.',
      tabs: {
        petals: '1. Pétalos al Viento',
        oracle: '2. Oráculo de la Rosa (3D)',
        memory: '3. Memory de Símbolos'
      },
      petalsMode: {
        prompt: 'Toca o desliza el dedo por la pantalla para hacer florecer pétalos de rosa flotando en la brisa:',
        bloomedCount: 'Pétalos florecidos',
        clearBtn: 'Despejar jardín',
        breezeHint: 'Cada toque despierta un acorde musical suave.'
      },
      oracleMode: {
        prompt: 'Elige una de las tres cartas y tócala para voltearla en 3D y revelar su secreto:',
        flipHint: 'Toca para voltear',
        shuffleBtn: 'Barajar de nuevo',
        cards: [
          {
            title: 'El Fuego Silencioso',
            text: '¿Qué pequeño deseo susurra dentro de ti que aún no te has atrevido a decir en voz alta?',
            complice: 'Pregunta cómplice para Daniel hoy: ¿Qué fue lo primero que pensaste al verme hoy?'
          },
          {
            title: 'Suavidad Soberana',
            text: 'Hoy no tienes que impresionar a nadie. Tienes permiso absoluto para descansar en tu propia calidez.',
            complice: 'Micro-mimo: Respira 3 veces con una mano en el corazón antes de contestar tu próximo mensaje.'
          },
          {
            title: 'Resonancia Cósmica',
            text: 'El Dragón de Metal y la Rata de Fuego: no es coincidencia que compartan este tiempo en la tierra.',
            complice: 'Gesto de complicidad: Apoya tu mano 10 segundos en silencio sobre el pecho de Daniel.'
          },
          {
            title: 'El Sabor del Instante',
            text: '¿Qué detalle sensorial te conmovió en las últimas 24 horas? Una luz, un aroma, un roce suave.',
            complice: 'Pregunta a Daniel: Si nuestra complicidad fuera una melodía, ¿qué instrumento serías tú?'
          },
          {
            title: 'Espinas Nobles',
            text: 'Tus límites no son un defecto; son las espinas nobles que cuidan lo más tierno de tu ser.',
            complice: 'Descompresión: Suelta la mandíbula y siente cómo cae el peso del día.'
          }
        ]
      },
      memoryMode: {
        prompt: 'Encuentra las 4 parejas de sus símbolos sagrados:',
        moves: 'Intentos',
        wonTitle: '¡Armonía perfecta!',
        wonDesc: 'Has reunido todos los símbolos. Tu intuición y delicadeza son infinitas.',
        playAgain: 'Jugar otra vez',
        symbols: {
          rose: 'Rosa Silvestre',
          dragon: 'Dragón de Metal',
          rat: 'Rata de Fuego',
          moon: 'Luna en Libra'
        }
      }
    }
  },
  en: {
    hub: {
      cards: {
        zengarden: {
          title: 'Zen Garden & Rose Oracle',
          desc: 'Touch the breeze: floating rose petals, 3D flip oracle cards, and soul memory.'
        }
      }
    },
    zengarden: {
      kicker: 'Playful Oasis',
      title: 'Zen Garden & Oracle',
      lead: 'A sensory haven to playfully unwind. Touch the breeze, draw a 3D oracle card, or match sacred celestial symbols.',
      tabs: {
        petals: '1. Petals on Breeze',
        oracle: '2. Rose Oracle (3D)',
        memory: '3. Soul Memory'
      },
      petalsMode: {
        prompt: 'Tap or drag your finger across the screen to bloom floating rose petals on the breeze:',
        bloomedCount: 'Petals bloomed',
        clearBtn: 'Clear garden',
        breezeHint: 'Each tap evokes a soothing musical chime.'
      },
      oracleMode: {
        prompt: 'Pick one of the three cards and tap to flip it in 3D and reveal its heartfelt message:',
        flipHint: 'Tap to flip',
        shuffleBtn: 'Shuffle oracle',
        cards: [
          {
            title: 'The Hidden Ember',
            text: 'Which quiet desire is whispering in you that you have not yet spoken aloud?',
            complice: 'Question for Daniel tonight: What was the first thought in your mind when you looked at me today?'
          },
          {
            title: 'Sovereign Gentleness',
            text: 'You have nothing to prove today. You are fully allowed to simply exist and inhabit your warmth.',
            complice: 'Micro-ritual: Take 3 unhurried breaths with one hand on your chest before replying to the next message.'
          },
          {
            title: 'Cosmic Affinity',
            text: 'The Metal Dragon and the Fire Rat: it is no accident you walk this earth together.',
            complice: 'Affectionate gesture: Rest your palm silently on Daniel’s chest for 10 seconds.'
          },
          {
            title: 'Sensory Wonder',
            text: 'What sensory detail surprised you in the last 24 hours? A beam of light, a scent, a soft texture.',
            complice: 'Playful inquiry: If our love were a song, which instrument would you play?'
          },
          {
            title: 'Noble Thorns',
            text: 'Your boundaries are not a flaw; they are the noble thorns safeguarding your most tender essence.',
            complice: 'Somatic ease: Drop your tongue from the roof of your mouth and let tension dissolve.'
          }
        ]
      },
      memoryMode: {
        prompt: 'Match the 4 pairs of your sacred symbols:',
        moves: 'Moves',
        wonTitle: 'Harmonious Match!',
        wonDesc: 'All sacred pairs united. You have an exquisite sense of connection.',
        playAgain: 'Play again',
        symbols: {
          rose: 'Wild Rose',
          dragon: 'Metal Dragon',
          rat: 'Fire Rat',
          moon: 'Libra Moon'
        }
      }
    }
  }
};
