// src/i18n/modules/somatics.js
// Ayurveda, Dinacharya, Conscious Massage & Stoic Exploration for Marie.
// Sourced from Caballero Jaguar and adapted specifically for Marie's nervous system and stress relief.

export default {
  de: {
    somatics: {
      tabs: {
        skin: 'Haut & Zyklus',
        ayurveda: '🌿 Ayurveda & Vata',
        massage: '💆 Massage & Berührung',
        stoic: '🏛️ Körperweisheit'
      },
      ayurveda: {
        title: 'Vata-Balance: Erdung für nervöse Tage',
        lead: 'Im Ayurveda entspricht dein Stressempfinden (kreisende Gedanken, kalte Hände oder Füße, Anspannung im Nacken) einer Erhöhung von Vata (Luft & Äther). Wenn der Wind im Kopf zu stark weht, braucht dein Körper Wärme, Schwere und Rhythmus.',
        vataCardTitle: '🌿 Warum Vata-Balance deine Rettung ist',
        vataCardDesc: 'Du musst deinen Geist nicht mit Gewalt beruhigen. Wenn du deinem physischen Körper Wärme und Geborgenheit schenkst, folgt dein Geist von ganz allein.',
        ritualsTitle: '3 tägliche Erdungs-Rituale',
        rituals: [
          {
            title: '1. Warmer Schluck für die Mitte (Agni)',
            desc: 'Morgens oder bei Stress: ein Glas warmes Wasser mit einer dünnen Scheibe frischem Ingwer oder Kamille. Weckt sanft die Verdauung und verankert die Energie im Bauchraum.',
            badge: 'Wärme'
          },
          {
            title: '2. Nadi Shodhana (Wechselatmung)',
            desc: '3 bis 5 Minuten abwechselnd durch das linke und rechte Nasenloch atmen. Gleicht die Gehirnhälften aus und senkt die Herzfrequenz messbar.',
            badge: 'Nervensystem'
          },
          {
            title: '3. Sanftes Abhyanga vor dem Schlafen',
            desc: 'Ein paar Tropfen warmes Sesam- oder Mandelöl auf Fußsohlen und Schläfen sanft einmassieren. Zieht die rastlose Energie aus dem Kopf zurück in die Erde.',
            badge: 'Schlaf'
          }
        ]
      },
      massage: {
        title: 'Rituale der achtsamen Berührung',
        subtitle: 'Gemeinsam mit Daniel (Caballero Jaguar) oder als Selbstzuwendung',
        lead: 'Berührung schüttet Oxytocin aus und signalisiert deinen Faszien: Du bist in Sicherheit. Du darfst um eine Massage bitten – es ist kein Gefallen, sondern eine Brücke der Nähe.',
        protocols: [
          {
            id: 'shoulders',
            title: 'Trapez & Nacken-Befreiung (20 Min)',
            desc: 'Perfekt nach langen Stunden vor dem Bildschirm oder wenn die Last der Gedanken auf den Schultern drückt.',
            steps: [
              '1. 4-5 Tropfen warmes Lavendel- oder Mandelöl zwischen den Handflächen anwärmen.',
              '2. Sanfte, lange Streichungen von der Mitte des Rückens nach oben zu den Schultern.',
              '3. Behutsames Kneten des oberen Trapezmuskels mit den Daumen bei langsamer Ausatmung.',
              '4. Sanfter Halt am Hinterkopf für 60 Sekunden in vollkommener Stille.'
            ],
            duration: 20
          },
          {
            id: 'feet',
            title: 'Fuß-Erdung & Tiefschlaf (15 Min)',
            desc: 'Bringt die aufgestaute Kopfenergie zurück in die Füße und bereitet ein tiefes, friedvolles Einschlafen vor.',
            steps: [
              '1. Die Füße in warme Socken hüllen oder ein kurzes warmes Fußbad nehmen.',
              '2. Sanfte kreisende Bewegungen mit den Daumen auf der Fußsohle (Solarplexus-Punkt).',
              '3. Jeden Zeh sanft strecken und lockern.',
              '4. Beide Hände wärmend auf die Fußrücken legen und 5 tiefe Atemzüge gemeinsam teilen.'
            ],
            duration: 15
          }
        ],
        timerLabel: 'Massage-Timer',
        startTimer: 'Timer starten',
        pauseTimer: 'Pause',
        resetTimer: 'Zurücksetzen',
        timerRunning: 'Läuft sanft...',
        timerDone: '✨ Massage vollendet. Danke deinem Körper.'
      },
      stoic: {
        title: 'Die gütige Dichotomie der Kontrolle',
        lead: 'Aus den Schriften von Epiktet und Seneca, übersetzt in sanfte Selbstfürsorge für Marie:',
        inMyHandsTitle: '🌱 Was heute in meiner Hand liegt',
        inMyHands: [
          'Mein nächster langsamer Atemzug.',
          'Die Freundlichkeit, mit der ich zu mir selbst spreche.',
          'Heute eine Pause zu machen, wenn mein Körper danach ruft.',
          'Eine Idee in 5 Minuten anzufangen, ohne Perfektion zu verlangen.'
        ],
        notInMyHandsTitle: '🕊️ Was ich heute loslassen darf',
        notInMyHands: [
          'Die Erwartungen und das Tempo anderer Menschen.',
          'Das Verlangen, die Zukunft schon heute gelöst zu haben.',
          'Schuldgefühle dafür, dass ich mich ausruhe.',
          'Die Illusion, alles gleichzeitig schaffen zu müssen.'
        ]
      }
    }
  },
  es: {
    somatics: {
      tabs: {
        skin: 'Piel & Ciclo',
        ayurveda: '🌿 Ayurveda & Vata',
        massage: '💆 Masajes & Tacto',
        stoic: '🏛️ Sabiduría del Cuerpo'
      },
      ayurveda: {
        title: 'Equilibrio Vata: Enraizamiento para días de estrés',
        lead: 'En el Ayurveda, tu patrón de estrés (mente que gira sin parar, manos o pies fríos, tensión en trapecios) corresponde a un exceso de Vata (Aire & Éter). Cuando el viento sopla demasiado fuerte en la cabeza, el cuerpo necesita calor, peso y ritmo apacible.',
        vataCardTitle: '🌿 Por qué calmar a Vata es tu medicina',
        vataCardDesc: 'No intentes forzar a tu mente a callarse. Dale calor y calma a tu cuerpo físico y tu mente la seguirá naturalmente.',
        ritualsTitle: '3 Rituales diarios de enraizamiento',
        rituals: [
          {
            title: '1. Infusión tibia para el centro digestivo (Agni)',
            desc: 'Al despertar o en momentos de sobrecarga: agua tibia con una rodaja fina de jengibre fresco o manzanilla. Enciende el calor interior y ancla la energía en el abdomen.',
            badge: 'Calor'
          },
          {
            title: '2. Nadi Shodhana (Respiración alterna)',
            desc: 'De 3 a 5 minutos inhalando y exhalando alternadamente por cada fosa nasal. Calma el sistema nervioso simpático y desacelera el ritmo cardíaco.',
            badge: 'Sistema Nervioso'
          },
          {
            title: '3. Abhyanga suave antes de dormir',
            desc: 'Masajear unas gotas de aceite tibio de almendras o sésamo en la planta de los pies y en las sienes. Desciende la energía de la cabeza a la tierra.',
            badge: 'Sueño'
          }
        ]
      },
      massage: {
        title: 'Rituales de Tacto Consciente en Pareja',
        subtitle: 'Junto a Daniel (Caballero Jaguar) o como auto-masaje somático',
        lead: 'El tacto afectivo libera oxitocina e informa a tus fascias que estás a salvo. Pedirle un masaje a Daniel es un puente de intimidad, nunca una carga ni un favor pesado.',
        protocols: [
          {
            id: 'shoulders',
            title: 'Alivio de Trapecios & Cuello (20 Min)',
            desc: 'Ideal tras jornadas largas frente a la pantalla o cuando la mente acumula tensión en los hombros.',
            steps: [
              '1. Calentar 4-5 gotas de aceite de almendras o lavanda entre las palmas.',
              '2. Pases largos y lentos (Effleurage) desde la columna hacia los hombros.',
              '3. Amasamiento suave sobre las bandas tensas del trapecio al ritmo de la respiración.',
              '4. Sostén cálido en la base del cuello durante 60 segundos en silencio.'
            ],
            duration: 20
          },
          {
            id: 'feet',
            title: 'Enraizamiento de Pies & Sueño Profundo (15 Min)',
            desc: 'Drena el sobrepensamiento mental hacia la tierra e induce un descanso reparador.',
            steps: [
              '1. Abrigarse los pies o sumergirlos brevemente en agua tibia.',
              '2. Círculos suaves con los pulgares en el arco de la planta del pie (zona del plexo solar).',
              '3. Descomprimir y masajear con ternura cada dedo del pie.',
              '4. Sostener ambos pies con las palmas y compartir 5 respiraciones profundas.'
            ],
            duration: 15
          }
        ],
        timerLabel: 'Temporizador de Masaje',
        startTimer: 'Iniciar timer',
        pauseTimer: 'Pausa',
        resetTimer: 'Reiniciar',
        timerRunning: 'Tiempo de mimo en curso...',
        timerDone: '✨ Masaje completado. Agradece a tu cuerpo.'
      },
      stoic: {
        title: 'La Dicotomía del Control Amable',
        lead: 'De las enseñanzas estoicas de Epicteto y Séneca, transformadas en autocompasión para Marie:',
        inMyHandsTitle: '🌱 Lo que está en mis manos hoy',
        inMyHands: [
          'Mi próxima respiración lenta y consciente.',
          'La voz amable con la que elijo hablarme hoy.',
          'Pausar cuando mi cuerpo me pida reposo.',
          'Dedicarle 5 minutos a una idea sin exigir que sea perfecta.'
        ],
        notInMyHandsTitle: '🕊️ Lo que suelto con amor hoy',
        notInMyHands: [
          'Las prisas y expectativas de los demás.',
          'La necesidad de resolver el futuro antes de tiempo.',
          'La culpa aprendida por descansar.',
          'La exigencia de atender todas mis ideas al mismo tiempo.'
        ]
      }
    }
  },
  en: {
    somatics: {
      tabs: {
        skin: 'Skin & Cycle',
        ayurveda: '🌿 Ayurveda & Vata',
        massage: '💆 Massage & Touch',
        stoic: '🏛️ Body Wisdom'
      },
      ayurveda: {
        title: 'Vata Balance: Grounding for Nervous Days',
        lead: 'In Ayurveda, your stress profile (racing loops, cold hands or feet, shoulder tension) points to an elevation of Vata (Air & Ether). When the wind blows too fast in the mind, your body asks for warmth, weight, and grounding rhythm.',
        vataCardTitle: '🌿 Why Vata Grounding is Your Medicine',
        vataCardDesc: 'Do not try to force your racing thoughts into silence. Offer warmth and gentleness to your physical body, and your mind will naturally settle.',
        ritualsTitle: '3 Daily Grounding Rituals',
        rituals: [
          {
            title: '1. Warm Digestive Sip (Agni)',
            desc: 'In the morning or under stress: warm water with a slice of fresh ginger or chamomile. Gently kindles inner warmth and anchors energy in the core.',
            badge: 'Warmth'
          },
          {
            title: '2. Nadi Shodhana (Alternate Nostril Breath)',
            desc: '3 to 5 minutes breathing alternately through each nostril. Balances brain hemispheres and calms the sympathetic nervous system.',
            badge: 'Nervous System'
          },
          {
            title: '3. Gentle Evening Abhyanga',
            desc: 'Massage a few warm drops of sesame or almond oil onto the soles of the feet and temples. Gently pulls restless energy back down to earth.',
            badge: 'Rest'
          }
        ]
      },
      massage: {
        title: 'Conscious Partner Touch & Massage',
        subtitle: 'Together with Daniel (Caballero Jaguar) or as somatic self-care',
        lead: 'Affectionate touch releases oxytocin and reminds your fascia that you are safe. Asking Daniel for a massage is an act of shared intimacy, never a burden.',
        protocols: [
          {
            id: 'shoulders',
            title: 'Trapezius & Neck Relief (20 Min)',
            desc: 'Perfect after long screen sessions or when mental weight gathers in your shoulders.',
            steps: [
              '1. Warm 4-5 drops of lavender or almond oil between palms.',
              '2. Long, slow strokes (effleurage) from mid-back up toward the shoulders.',
              '3. Gentle kneading over tight trapezius bands synchronized with exhales.',
              '4. Warm still hold at the base of the skull for 60 seconds in silence.'
            ],
            duration: 20
          },
          {
            id: 'feet',
            title: 'Foot Grounding & Deep Sleep (15 Min)',
            desc: 'Drains overthinking down into the earth and prepares you for restorative sleep.',
            steps: [
              '1. Slip into warm socks or take a brief warm foot bath.',
              '2. Gentle thumb circles over the arch of the foot (solar plexus reflex).',
              '3. Tenderly stretch and massage each toe.',
              '4. Cup both feet with warm hands and breathe together for 5 deep cycles.'
            ],
            duration: 15
          }
        ],
        timerLabel: 'Massage Timer',
        startTimer: 'Start Timer',
        pauseTimer: 'Pause',
        resetTimer: 'Reset',
        timerRunning: 'Tender time in progress...',
        timerDone: '✨ Massage complete. Thank your body.'
      },
      stoic: {
        title: 'The Gentle Dichotomy of Control',
        lead: 'Ancient Stoic wisdom from Epictetus and Seneca, adapted into compassionate self-care for Marie:',
        inMyHandsTitle: '🌱 What is in my hands today',
        inMyHands: [
          'My next slow and conscious breath.',
          'The gentle tone I choose to speak to myself with.',
          'Pausing whenever my body calls for rest.',
          'Spending 5 minutes on an idea without demanding perfection.'
        ],
        notInMyHandsTitle: '🕊️ What I release with love today',
        notInMyHands: [
          "Other people's rush and expectations.",
          'The urge to solve the future before its time.',
          'Learned guilt for resting.',
          'The pressure to execute every single idea at once.'
        ]
      }
    }
  }
};
