// src/i18n/modules/ikigai.js
// Ikigai Rose Architecture for SpaceTab ("Mein Raum"):
// 5 Petals (Body, Fire & Desire, Create, Dreams, Me) + Expressive Flows for Marie.

export default {
  de: {
    ikigai: {
      kicker: 'Die Blume deines Seins',
      title: 'Mein Raum · Ikigai-Rose',
      lead: 'Fünf Blütenblätter für deine fünf Lebensdimensionen. Wähle ein Blatt, um in seine Philosophie einzutauchen, dich auszudrücken und seine Werkzeuge zu nutzen.',
      viewModePill: {
        flower: '🌸 Blumenansicht',
        all: '📂 Alle Werkzeuge'
      },
      centerCore: {
        title: 'Marie · Der Kern',
        subtitle: 'Zentrum der Harmonie & Achtsamkeit',
        prompt: 'Tippe auf ein Blütenblatt, um seinen Ausdrucksraum zu öffnen.'
      },
      backToFlower: 'Zurück zur Blume',
      openModuleBtn: 'Bereich öffnen',
      expressTitle: 'Dein Ausdrucksraum heute',
      expressSave: 'Gedanken bewahren',
      expressSavedToast: 'Mit Liebe bewahrt ✨',
      toolsTitle: 'Werkzeuge & Vertiefungen dieses Blattes',
      petals: {
        body: {
          name: 'Körper & Somatik',
          subtitle: 'Spüren ohne Bewertung',
          tag: 'Somatik & Erdung',
          philosophy: 'Dein Körper ist ein lebendiger Organismus, kein Schauobjekt für fremde Blicke. Hier lauschst du seinen stillen Signalen, schenkst ihm Wärme und erforschst ohne Diät- oder Leistungsdruck, was er jetzt braucht.',
          prompt: 'Wie fühlt sich dein Körper in diesem Augenblick an? Wo bittet er um Weichheit, Wärme oder eine Pause?',
          tools: {
            checkin: { title: 'Körper-Check-in', desc: 'Sanfte 5-Stufen-Skala und offene Fragen zum Körpergefühl.' },
            bodymap: { title: 'Interaktive Körperkarte', desc: 'Berühre jede Körperzone, spüre Verspannungen nach und atme.' },
            doombreaker: { title: 'Scrolling?', desc: 'Aus dem Feed auftauchen: Physiologischer Seufzer oder sensorischer Reset.' },
            ayurveda: { title: 'Vata-Erdung & Dinacharya', desc: 'Warme Tees, Wechselatmung und Abendruhe gegen Stress.' },
            massage: { title: 'Massage & Achtsame Berührung', desc: 'Nacken- und Fuß-Entlastung mit Daniel oder für dich selbst.' }
          }
        },
        fire: {
          name: 'Feuer & Begehren',
          subtitle: 'Souveränität & heilige Grenzen',
          tag: 'Lust, Grenzen & Kraft',
          philosophy: 'Dein Begehren und deine Lust gehören dir allein. Du schuldest niemandem eine Entschuldigung für dein Feuer, dein Tempo oder deine Dornen. Wenn der Alltag dich überrollt, findest du hier dein Schutzfeuer und den Mut, für dich einzustehen.',
          prompt: 'Wo in deinem Leben möchtest du heute eine klare Grenze setzen oder deinem eigenen Feuer mehr Raum geben?',
          tools: {
            doombreaker: { title: 'Scrolling?', desc: 'Sanft aus dem Feed auftauchen: 3 Wege zurück zu dir.' },
            sanctuary: { title: 'Intimer Zufluchtsort (PIN 2211)', desc: 'Feuer-Level, Fuck-Girl-Mindset und geschützte Intimität.' },
            aura: { title: 'Emotionale Aura', desc: 'Farben, Formen und Barometer deines aktuellen Seelenzustands.' },
            stress: { title: 'Akut-Stress & SOS-Befreiung', desc: 'Respiración 4-6, 5-4-3-2-1 Grounding und Notfall-Ruhe.' }
          }
        },
        create: {
          name: 'Schöpferkraft & Handeln',
          subtitle: 'Ideen sanft zum Leben erwecken',
          tag: 'Ideen, Kunst & Tatkraft',
          philosophy: 'Ein Kopf voller Ideen (Jupiter in Zwillinge) ist eine Gabe, keine Last. Du musst nicht alles gleichzeitig verwirklichen: Ein einziger kleiner Schritt von 5 Minuten genügt. Deine Ideen dürfen unvollkommen sein – Hauptsache, sie dürfen atmen.',
          prompt: 'Welche kreative Idee flüstert dir heute zu, die du für nur 5 Minuten spielerisch ausprobieren möchtest?',
          tools: {
            ideas: { title: 'Ideen → Aktion', desc: '5-Minuten-Mikroschritte, Ideenspeicher und sanfte Feier kleiner Fortschritte.' },
            words: { title: 'Wortschatz der Seele', desc: 'Poetische Wörter und Ausdrücke, die das Herz berühren.' },
            zengarden: { title: 'Zen-Garten & Orakel', desc: 'Blüten im Wind, 3D-Orakelkarten und Seelen-Memory zum Verweilen.' },
            hobbies: { title: 'Atelier für Kunst, Collage & Musik', desc: 'Kreative Herausforderungen ohne Leistungsanspruch.' }
          }
        },
        dreams: {
          name: 'Seelenhorizont & Sterne',
          subtitle: 'Kosmische Verbundenheit & Zukunft',
          tag: 'Sterne, Visionen & Sinn',
          philosophy: 'Geboren an der magischen Cusp Skorpion-Schütze als Metalldrache (2000), im Einklang mit der Feuer-Ratte des Caballero Jaguar. Deine Träume sind der Leuchtturm, der dir in unruhigen Zeiten die Richtung weist.',
          prompt: 'Welcher leise Traum oder Zukunftswunsch gibt deiner Seele gerade Zuversicht und Weite?',
          tools: {
            astral: { title: 'Kosmisches Observatorium', desc: 'Maries Geburtshoroskop (22.11.2000) und Sinastrie mit Daniel.' },
            zengarden: { title: 'Zen-Garten & Orakel', desc: 'Kosmisches Orakel, schwebende Blüten und Verbundenheit.' },
            words: { title: 'Wortschatz der Seele', desc: 'Glosario estético de palabras poéticas en español y otros idiomas.' },
            vision: { title: 'Traum- & Lebenskompass', desc: 'Persönliche Sehnsüchte, Visionen und Seelenreisen festhalten.' },
            letters: { title: 'Briefe an Vergangenheit & Zukunft', desc: 'Worte an dein früheres und zukünftiges Ich schreiben.' }
          }
        },
        me: {
          name: 'Herz & Wahres Ich',
          subtitle: 'Ehrlichkeit & radikale Zärtlichkeit',
          tag: 'Tiefenpsychologie & Mitgefühl',
          philosophy: 'Hier musst du keine Rüstung tragen und keine Rolle spielen. Mit Ansätzen aus TCC, ACT, IFS und Kristin Neffs Selbstmitgefühl begegnest du deinen verletzlichen Anteilen mit Respekt und unendlicher Wärme.',
          prompt: 'Was braucht dein Herz in diesem Augenblick am meisten – und wie kannst du es dir selbst schenken?',
          tools: {
            diary: { title: 'Mein Tagebuch & Momente', desc: 'Tägliche Gedanken, ein Foto das zählte und dein persönlicher Kalender.' },
            heart: { title: 'Herz & Werte-Dialog', desc: 'Gefühlsdialog, gewaltfreie Bedürfnisse (GFK) und Selbstmitgefühl.' },
            therapy: { title: 'Therapeutische Werkzeuge', desc: 'Kognitive Neubewertung, ACT-Defusion und IFS-Anteile.' },
            stoic: { title: 'Die gütige Dichotomie der Kontrolle', desc: 'Was heute in meiner Hand liegt und was ich liebevoll loslasse.' }
          }
        }
      }
    }
  },
  es: {
    ikigai: {
      kicker: 'La Flor de tu Ser',
      title: 'Mi Espacio · Rosa Ikigai',
      lead: 'Cinco pétalos para tus cinco dimensiones vitales. Elige un pétalo para sumergirte en su filosofía, expresarte con libertad y usar sus herramientas.',
      viewModePill: {
        flower: '🌸 Vista de la Flor',
        all: '📂 Todas las Herramientas'
      },
      centerCore: {
        title: 'Marie · El Centro',
        subtitle: 'Núcleo de armonía & presencia',
        prompt: 'Toca un pétalo para abrir su espacio de expresión.'
      },
      backToFlower: 'Volver a la Flor',
      openModuleBtn: 'Abrir sección',
      expressTitle: 'Tu espacio de expresión hoy',
      expressSave: 'Guardar reflexión',
      expressSavedToast: 'Guardado con amor ✨',
      toolsTitle: 'Herramientas y caminos de este pétalo',
      petals: {
        body: {
          name: 'Cuerpo & Somática',
          subtitle: 'Sentir sin juicio',
          tag: 'Somática & Enraizamiento',
          philosophy: 'Tu cuerpo es un organismo vivo, no un adorno ni un objeto a juzgar. Aquí escuchas sus señales sutiles, le das calor y descubres lo que necesita ahora, sin presiones de dieta ni de rendimiento.',
          prompt: '¿Cómo se siente habitar tu cuerpo en este instante? ¿Qué zona te pide suavidad, calor o una pausa?',
          tools: {
            checkin: { title: 'Check-in Corporal Compasivo', desc: 'Escala emocional de 5 niveles y preguntas abiertas sin culpa.' },
            bodymap: { title: 'Mapa Corporal Interactivo', desc: 'Toca cada parte del cuerpo, registra sensaciones y respira.' },
            doombreaker: { title: '¿Scrolling?', desc: 'Salir suavemente de las redes: suspiro fisiológico o juego sensorial.' },
            ayurveda: { title: 'Equilibrio Vata & Dinacharya', desc: 'Infusiones tibias, respiración alterna y calma nocturna.' },
            massage: { title: 'Masajes & Tacto en Pareja', desc: 'Alivio de cuello y pies con Daniel o como autocuidado somático.' }
          }
        },
        fire: {
          name: 'Fuego & Deseo',
          subtitle: 'Soberanía & límites sagrados',
          tag: 'Placer, Límites & Poder',
          philosophy: 'Tu deseo y tu energía te pertenecen. No le debes disculpas a nadie por encender tu fuego, marcar tus tiempos o defender tu territorio con espinas nobles. Cuando el estrés te abrume, aquí encuentras tu escudo y tu poder personal.',
          prompt: '¿En qué área de tu vida necesitas hoy poner un límite firme o darle más espacio a tu propio fuego?',
          tools: {
            doombreaker: { title: '¿Scrolling?', desc: 'Salir del bucle de redes: 3 caminos amables de vuelta a ti.' },
            sanctuary: { title: 'Santuario Íntimo (PIN 2211)', desc: 'Niveles de fuego, Fuck-Girl mindset e intimidad segura.' },
            aura: { title: 'Aura Emocional', desc: 'Colores, formas y energía simbólica del día como barómetro poético.' },
            stress: { title: 'SOS Estrés & Descompresión', desc: 'Respiración 4-6, grounding 5-4-3-2-1 y registro de alternativas.' }
          }
        },
        create: {
          name: 'Creatividad & Acción',
          subtitle: 'Hacer respirar las ideas',
          tag: 'Ideas, Arte & Realización',
          philosophy: 'Una mente fértil con mil ideas (Júpiter en Géminis) es un tesoro, no una carga. No tienes que hacerlo todo hoy: basta un micro-paso de 5 a 10 minutos. Tus ideas tienen derecho a ser imperfectas: lo importante es que puedan respirar.',
          prompt: '¿Qué pequeña idea o curiosidad creativa te susurra hoy y te gustaría probar jugando solo 5 minutos?',
          tools: {
            ideas: { title: 'Ideas → Acción', desc: 'Captura rápida, micro-pasos de 5 minutos, temporizador y celebración.' },
            words: { title: 'Palabras del Alma', desc: 'Glosario de palabras hermosas en español y otros idiomas.' },
            zengarden: { title: 'Jardín Zen & Oráculo', desc: 'Pétalos al viento, cartas de oráculo en 3D y memory del alma.' },
            hobbies: { title: 'Atelier de Arte, Collage & Música', desc: 'Retos creativos y exploración lúdica sin juicio.' }
          }
        },
        dreams: {
          name: 'Horizontes del Alma & Estrellas',
          subtitle: 'Conexión cósmica & futuro',
          tag: 'Estrellas, Sueños & Trascendencia',
          philosophy: 'Nacida en la cúspide de Escorpio y Sagitario como Dragón de Metal (2000), en resonancia con la Rata de Fuego del Caballero Jaguar. Tus anhelos más profundos son la brújula que te orienta hacia adelante.',
          prompt: '¿Qué susurro del futuro o anhelo silencioso le devuelve la ilusión y la amplitud a tu alma hoy?',
          tools: {
            astral: { title: 'Observatorio Celeste', desc: 'Carta natal de Marie (22.11.2000) y sinastría con Daniel.' },
            zengarden: { title: 'Jardín Zen & Oráculo', desc: 'Oráculo cósmico, flores flotantes y complicidad mágica.' },
            words: { title: 'Palabras del Alma', desc: 'Tesoros lingüísticos y poéticos con significado profundo.' },
            vision: { title: 'Brújula de Sueños & Rumbo', desc: 'Explorar tus visiones de vida y proyectos que nacen del alma.' },
            letters: { title: 'Cartas al Pasado y al Futuro', desc: 'Escribir mensajes sanadores a tu yo de ayer y de mañana.' }
          }
        },
        me: {
          name: 'Corazón & Yo Real',
          subtitle: 'Honestidad & ternura radical',
          tag: 'Profundidad Psicológica & Autocompasión',
          philosophy: 'Aquí no necesitas llevar ninguna máscara. Con herramientas fundamentadas en TCC, ACT, IFS y autocompasión de Kristin Neff, miras tus emociones con respeto, amabilidad y validación profunda.',
          prompt: '¿Qué es lo que tu corazón más necesita en este momento y cómo puedes dártelo a ti misma con ternura?',
          tools: {
            diary: { title: 'Mi Diario & Momentos', desc: 'Reflexión diaria, una foto que importó y calendario personal.' },
            heart: { title: 'Diálogo con el Corazón & Valores', desc: 'Journaling guiado, necesidades CNV y valores personales.' },
            therapy: { title: 'Herramientas Psicoterapéuticas', desc: 'Reestructuración TCC, defusión ACT y diálogo con partes IFS.' },
            stoic: { title: 'Dicotomía del Control Amable', desc: 'Lo que hoy está en mis manos y lo que suelto con amor.' }
          }
        }
      }
    }
  },
  en: {
    ikigai: {
      kicker: 'The Blossom of Your Being',
      title: 'My Space · Ikigai Rose',
      lead: 'Five petals for your five vital dimensions. Choose a petal to immerse yourself in its philosophy, express yourself freely, and use its tools.',
      viewModePill: {
        flower: '🌸 Flower View',
        all: '📂 All Tools'
      },
      centerCore: {
        title: 'Marie · The Center',
        subtitle: 'Core of harmony & mindfulness',
        prompt: 'Tap any petal to open its expressive space.'
      },
      backToFlower: 'Back to Flower',
      openModuleBtn: 'Open section',
      expressTitle: 'Your expressive space today',
      expressSave: 'Save reflection',
      expressSavedToast: 'Saved with love ✨',
      toolsTitle: 'Tools and paths of this petal',
      petals: {
        body: {
          name: 'Body & Somatics',
          subtitle: 'Feeling without judgment',
          tag: 'Somatics & Grounding',
          philosophy: 'Your body is a living organism, not an ornament or an object to be evaluated. Here you listen to its quiet signals, offer it warmth, and discover what it needs now, free from diet or performance culture.',
          prompt: 'How does it feel to inhabit your body in this moment? Where is it asking for softness, warmth, or rest?',
          tools: {
            checkin: { title: 'Compassionate Body Check-in', desc: '5-step emotional scale and guilt-free open inquiries.' },
            bodymap: { title: 'Interactive Body Map', desc: 'Touch each area, register sensations, and breathe.' },
            doombreaker: { title: 'Scrolling?', desc: 'Gently disengage from the feed: physiological sigh or sensory reset.' },
            ayurveda: { title: 'Vata Balance & Dinacharya', desc: 'Warm infusions, alternate breathing, and evening calm.' },
            massage: { title: 'Partner Massage & Touch', desc: 'Shoulder and foot release with Daniel or as somatic self-care.' }
          }
        },
        fire: {
          name: 'Fire & Desire',
          subtitle: 'Sovereignty & sacred boundaries',
          tag: 'Desire, Boundaries & Power',
          philosophy: 'Your desire and energy belong solely to you. You owe no one an apology for igniting your fire, honoring your pace, or guarding your space with noble thorns. When stress overwhelms you, find your shield and strength here.',
          prompt: 'Where in your life do you need to set a firm boundary today or give your own fire more breathing room?',
          tools: {
            doombreaker: { title: 'Scrolling?', desc: 'Gently disengage: 3 warm pathways back to yourself.' },
            sanctuary: { title: 'Intimate Sanctuary (PIN 2211)', desc: 'Fire levels, Fuck-Girl mindset, and safe intimacy.' },
            aura: { title: 'Emotional Aura', desc: 'Colors, shapes, and symbolic energy as a poetic barometer.' },
            stress: { title: 'Acute Stress & SOS Release', desc: '4-6 breathing, 5-4-3-2-1 grounding, and alternative paths.' }
          }
        },
        create: {
          name: 'Creative Spark & Action',
          subtitle: 'Breathing life into ideas',
          tag: 'Ideas, Art & Creation',
          philosophy: 'A fertile mind filled with ideas (Jupiter in Gemini) is a gift, not a burden. You do not have to do everything today: a 5 to 10 minute micro-step is plenty. Your ideas are allowed to be imperfect – what matters is that they can breathe.',
          prompt: 'Which small creative idea is whispering to you today that you would like to explore for just 5 minutes?',
          tools: {
            ideas: { title: 'Ideas → Action', desc: 'Fast capture, 5-minute micro-steps, timer, and guilt-free celebration.' },
            words: { title: 'Soul Words & Lexicon', desc: 'Poetic words and expressions in Spanish and other languages.' },
            zengarden: { title: 'Zen Garden & Oracle', desc: 'Petals in the breeze, 3D oracle cards, and soul memory.' },
            hobbies: { title: 'Art, Collage & Music Studio', desc: 'Playful creative challenges without performance pressure.' }
          }
        },
        dreams: {
          name: 'Soul Horizon & Stars',
          subtitle: 'Cosmic connection & future',
          tag: 'Stars, Dreams & Purpose',
          philosophy: 'Born on the Scorpio-Sagittarius cusp as a Metal Dragon (2000), harmonizing with the Caballero Jaguar’s Fire Rat. Your deepest aspirations are the compass that gently guides you forward.',
          prompt: 'What quiet dream or future wish brings gentle hope and breadth to your soul today?',
          tools: {
            astral: { title: 'Celestial Observatory', desc: "Marie's natal chart (22 Nov 2000) and synastry with Daniel." },
            zengarden: { title: 'Zen Garden & Oracle', desc: 'Cosmic oracle, floating petals, and intimate complicity.' },
            words: { title: 'Soul Words & Lexicon', desc: 'Linguistic and poetic treasures with deep resonance.' },
            vision: { title: 'Dreams & Life Direction', desc: 'Capture your heartfelt visions and soulful life projects.' },
            letters: { title: 'Letters to Past & Future', desc: 'Write healing words to your younger and future selves.' }
          }
        },
        me: {
          name: 'Heart & True Self',
          subtitle: 'Honesty & radical tenderness',
          tag: 'Deep Psychology & Compassion',
          philosophy: 'You do not need to wear any mask here. Grounded in CBT, ACT, IFS, and Kristin Neff’s self-compassion, you meet your vulnerable emotions with respect, kindness, and deep validation.',
          prompt: 'What does your heart need most right now, and how can you offer it to yourself with tenderness?',
          tools: {
            diary: { title: 'My Journal & Moments', desc: 'Daily reflections, a meaningful photo, and personal calendar trail.' },
            heart: { title: 'Heart & Values Dialogue', desc: 'Guided journaling, NVC needs, and personal core values.' },
            therapy: { title: 'Psychotherapy Tools', desc: 'CBT reframing, ACT defusion, and IFS parts work.' },
            stoic: { title: 'Gentle Dichotomy of Control', desc: 'What is in my hands today and what I release with love.' }
          }
        }
      }
    }
  }
};
