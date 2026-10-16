// src/i18n/modules/doombreaker.js
// "Scrolling?" — gentle circuit breaker for social media trance.
// DE (natural, warm, intimate 'du'), ES, EN.

export default {
  de: {
    hub: {
      cards: {
        doombreaker: {
          title: 'Scrolling?',
          desc: 'Sanft aus dem Feed auftauchen: Physiologischer Seufzer, sensorisches Spiel oder lebendige Präsenz.'
        }
      }
    },
    doombreaker: {
      kicker: 'Innehalten ohne Schuldgefühl',
      title: 'Scrolling?',
      subtitle: 'Der Feed hält dich fest? Keine Vorwürfe an dich selbst. Dein Nervensystem hat nur nach Entlastung gesucht. Wähle deinen Weg zurück zu dir:',
      tabs: {
        breathe: '1. Sanftes Auftauchen',
        play: '2. Spiel & Touch',
        alive: '3. Lebendig Spüren'
      },
      breathe: {
        step1Title: 'Der physiologische Seufzer',
        step1Desc: 'Zweimal nacheinander tief durch die Nase einatmen (erst tief, dann noch einen kurzen Atemzug obendrauf), danach langsam und weich durch den Mund ausatmen. Das aktiviert deinen Vagusnerv und senkt den Puls sofort.',
        inhale1: 'Tief einatmen (Nase)...',
        inhale2: 'Noch etwas mehr Luft nachziehen...',
        exhale: 'Lang und sanft ausatmen...',
        step2Title: 'Was hat dein Geist gerade gesucht?',
        step2Prompt: 'Endloses Scrollen ist keine Willensschwäche. Welches Bedürfnis lag darunter?',
        reasons: {
          tired: { label: 'Echte Erschöpfung', desc: 'Dein Kopf brauchte eine Pause, aber der Bildschirm schenkt keine echte Erholung.' },
          dopamine: { label: 'Langeweile & Dopamin', desc: 'Dein Gehirn sehnte sich nach einem leichten, mühelosen Funken Neugier.' },
          escape: { label: 'Flucht vor Überforderung', desc: 'Eine Aufgabe, ein Gedanke oder eine Erwartung fühlte sich zu schwer an.' },
          lonely: { label: 'Sehnsucht nach Verbindung', desc: 'Der stille Wunsch, Nähe zu spüren und mit der Welt verbunden zu sein.' }
        },
        validation: 'Es macht vollkommen Sinn. Sei ganz zärtlich mit dir. Dein Nervensystem wollte sich nur beschützen.',
        step3Title: 'Das 5-Minuten-Gegenmittel',
        alternatives: [
          { title: 'Warmer Becher', text: 'Geh in die Küche, trinke langsam ein Glas warmes Wasser oder koche Tee. Spüre die Wärme mit beiden Händen.' },
          { title: '20-20-20 Blick', text: 'Blicke für 20 Sekunden aus dem Fenster in die weiteste Ferne. Schenke deinen Augenmuskeln Weichheit.' },
          { title: 'Gedanken-Kritzeln', text: 'Nimm einen Stift und schreibe ein einziges Wort oder ein unordentliches Muster auf Papier.' },
          { title: 'Decken-Zuflucht', text: 'Lege das Handy beiseite. Schließe 3 Minuten die Augen und spüre dein Kissen oder den Boden unter dir.' }
        ]
      },
      play: {
        bubbleTitle: 'Spannungs-Blasen platzen lassen',
        bubblePrompt: 'Tippe auf die schwimmenden Gedankenblasen, um den Scroll-Reflex deiner Daumen zu unterbrechen:',
        bubbles: ['FOMO', 'Vergleich', 'Reizüberflutung', 'Endlos-Feed', 'Druck', 'Autopilot', 'Lärm'],
        poppedAll: 'Alle Blasen zerplatzt! Deine Hände und Gedanken sind wieder frei.',
        shakeTitle: '7 Sekunden Hand-Reset',
        shakeDesc: 'Schüttle deine Hände und Handgelenke kräftig aus, als würdest du Wassertropfen von den Fingerspitzen schleudern.',
        shakeButton: '7s Schütteln starten',
        shakeActive: 'Schütteln... loslassen... tief ausatmen!',
        shakeDone: 'Wunderbar gelöst. Deine Finger gehören wieder dir.',
        secretQuestTitle: '30-Sekunden Geheimmission',
        secretQuestPrompt: 'Eine kleine analoge Entdeckungsreise im Raum:',
        quests: [
          'Finde in deinem Zimmer 3 Dinge, die eine samtige oder weiche Oberfläche haben.',
          'Gehe ans Fenster und finde den am weitesten entfernten Baum oder Punkt am Himmel.',
          'Rieche an etwas Angenehmem: frischer Kaffee, deine Lieblingscreme, Bettwäsche oder Tee.',
          'Kreise deine Schultern 5 Mal sanft nach hinten und lass den Nacken ganz schwer sinken.'
        ],
        questNext: 'Andere Mission würfeln'
      },
      alive: {
        title: 'Nicht Therapie, sondern echtes Leben',
        subtitle: 'Spüre den Puls deiner Existenz in diesem Atemzug.',
        prompts: [
          {
            title: 'Die Temperatur deiner Lippen',
            text: 'Schließe für einen Atemzug die Augen. Spüre den zarten Punkt, an dem deine Ober- und Unterlippe aufeinandertreffen. Eine feine Wärme, die immer da ist.'
          },
          {
            title: 'Die 10-Sekunden-Schmetterlingsumarmung',
            text: 'Kreuze deine Arme über die Brust, lege deine Hände auf die Oberarme und drücke dich selbst sanft und fest. Atme in deine eigenen Hände.'
          },
          {
            title: 'Kaltes Wasser auf den Handgelenken',
            text: 'Lass für 10 Sekunden eiskaltes Wasser über die Innenseite deiner Handgelenke fließen. Fühle den klaren, elektrisierenden Kitzel der Frische.'
          },
          {
            title: 'Dein Lieblingslied ohne Bildschirm',
            text: 'Mache einen Song an, lege das Handy mit dem Display nach unten weg, und tanze oder liege einfach da, bis der Bass verklingt.'
          }
        ]
      },
      backToLifeBtn: 'Ich bin wieder da (Zurück im Hier & Jetzt)',
      recoveredToast: 'Willkommen zurück im echten Moment, Marie. Wie schön, dass du da bist.'
    }
  },
  es: {
    hub: {
      cards: {
        doombreaker: {
          title: '¿Scrolling?',
          desc: 'Salir suavemente de las redes: suspiro fisiológico, juego táctil o sentirte viva.'
        }
      }
    },
    doombreaker: {
      kicker: 'Pausar sin culpa',
      title: '¿Scrolling?',
      subtitle: '¿El feed te tiene atrapada? Cero reproches. Tu sistema nervioso solo buscaba alivio. Elige tu camino para volver a ti:',
      tabs: {
        breathe: '1. Resurgir Suave',
        play: '2. Juego & Móvil',
        alive: '3. Sentirte Viva'
      },
      breathe: {
        step1Title: 'El suspiro fisiológico',
        step1Desc: 'Inhala dos veces seguidas por la nariz (una profunda, otra corta encima) y exhala lento por la boca. Tu pulso baja de inmediato.',
        inhale1: 'Inhala por la nariz...',
        inhale2: 'Un poquito más...',
        exhale: 'Exhala largo y suave...',
        step2Title: '¿Qué estaba buscando tu mente?',
        step2Prompt: 'El scroll infinito no es falta de voluntad. ¿Qué necesidad había debajo?',
        reasons: {
          tired: { label: 'Cansancio real', desc: 'Necesitabas desconectar, pero la pantalla no nutre ni descansa.' },
          dopamine: { label: 'Aburrimiento & Dopamina', desc: 'Tu cerebro pedía un destello fácil de novedad.' },
          escape: { label: 'Escape de algo pesado', desc: 'Una tarea, pensamiento o exigencia resultaba abrumadora.' },
          lonely: { label: 'Soledad o anhelo', desc: 'Ganas de sentirte cerca del mundo y conectada.' }
        },
        validation: 'Tiene todo el sentido. No te juzgues. Tu mente solo intentaba darte un respiro.',
        step3Title: 'El micro-antídoto de 5 minutos',
        alternatives: [
          { title: 'Taza tibia', text: 'Ve a la cocina, bébete un vaso de agua o prepara un té. Siente el calor entre las palmas de las manos.' },
          { title: 'Regla 20-20-20', text: 'Mira por la ventana hacia el punto más lejano 20 segundos. Suaviza los ojos.' },
          { title: '1 garabato o palabra', text: 'Abre una libreta y escribe una sola palabra o dibuja algo desordenado.' },
          { title: 'Bajo la manta', text: 'Deja el móvil en una mesa. Cierra los ojos 3 minutos y siente la textura de la almohada.' }
        ]
      },
      play: {
        bubbleTitle: 'Explotar burbujas de tensión',
        bubblePrompt: 'Toca las burbujas flotantes para cortar el trance reflejo de los pulgares:',
        bubbles: ['FOMO', 'Comparación', 'Ruido', 'Feed infinito', 'Presión', 'Piloto automático', 'Sobrecarga'],
        poppedAll: '¡Todas las burbujas rotas! Tus dedos vuelven a ser tuyos.',
        shakeTitle: '7 segundos sacudiendo manos',
        shakeDesc: 'Sacude las manos y muñecas con energía como si quisieras soltar gotas de agua pegadas a los dedos.',
        shakeButton: 'Empezar 7s de sacudida',
        shakeActive: '¡Sacudiendo... soltando... respirando!',
        shakeDone: 'Tensión liberada con éxito.',
        secretQuestTitle: 'Misión secreta de 30 segundos',
        secretQuestPrompt: 'Misión aleatoria en tu habitación:',
        quests: [
          'Encuentra en la habitación 3 cosas con textura suave o aterciopelada.',
          'Acércate a la ventana y ubica el punto más lejano del cielo u horizonte.',
          'Huele algo agradable: café, tu crema favorita, ropa limpia o una infusión.',
          'Gira los hombros 5 veces hacia atrás y siente cómo cae el peso del cuello.'
        ],
        questNext: 'Cambiar de misión'
      },
      alive: {
        title: 'No terapia, sino estar viva',
        subtitle: 'Siente el pulso de tu existencia en este instante.',
        prompts: [
          {
            title: 'La temperatura de tus labios',
            text: 'Cierra los ojos un segundo. Siente el contacto sutil entre tu labio superior y el inferior. Una calidez suave que siempre está ahí.'
          },
          {
            title: 'Abrazo de mariposa de 10 segundos',
            text: 'Cruza los brazos sobre tu pecho, apoya las manos en tus hombros y date un abrazo firme y acogedor. Respira en tus propias manos.'
          },
          {
            title: 'Agua fría en las muñecas',
            text: 'Abre el grifo de agua fría 10 segundos sobre la cara interna de tus muñecas. Nota la sacudida limpia y fresca de estar viva.'
          },
          {
            title: 'Canción favorita a oscuras',
            text: 'Pon un tema que te erice la piel, voltea el móvil boca abajo en la mesa y solo escucha hasta que termine el primer coro.'
          }
        ]
      },
      backToLifeBtn: '¡Estoy de vuelta! (Aquí y ahora)',
      recoveredToast: 'Bienvenida de nuevo al mundo real, Marie. Qué bonito tenerte aquí.'
    }
  },
  en: {
    hub: {
      cards: {
        doombreaker: {
          title: 'Scrolling?',
          desc: 'Gently disengage from social media: physiological sigh, tactile play or feeling alive.'
        }
      }
    },
    doombreaker: {
      kicker: 'Pause without guilt',
      title: 'Scrolling?',
      subtitle: 'Caught in the endless feed? No self-blame. Your nervous system is just reaching for relief. Pick your path back to yourself:',
      tabs: {
        breathe: '1. Gentle Resurface',
        play: '2. Play & Touch',
        alive: '3. Feel Alive'
      },
      breathe: {
        step1Title: 'The physiological sigh',
        step1Desc: 'Take two quick deep inhales through your nose, then a slow, long exhale through your mouth. Your heart rate drops instantly.',
        inhale1: 'Inhale through nose...',
        inhale2: 'Top it off...',
        exhale: 'Slow, gentle exhale...',
        step2Title: 'What was your mind searching for?',
        step2Prompt: 'Doomscrolling is never a lack of willpower. What underlying need was asking for care?',
        reasons: {
          tired: { label: 'Real fatigue', desc: 'You needed genuine rest, but the screen does not restore you.' },
          dopamine: { label: 'Boredom & Dopamine', desc: 'Your brain craved a low-effort spark of novelty.' },
          escape: { label: 'Escaping overwhelm', desc: 'A task, emotion or expectation felt too heavy to face.' },
          lonely: { label: 'Loneliness & connection', desc: 'A quiet longing to feel close to other humans and the world.' }
        },
        validation: 'It makes complete sense. Do not judge yourself. Your brain was just trying to shield you.',
        step3Title: 'The 5-minute micro-antidote',
        alternatives: [
          { title: 'Warm mug', text: 'Head to the kitchen, slowly sip warm water or steep tea. Feel the warmth spreading through your hands.' },
          { title: '20-20-20 gaze', text: 'Look out the window into the farthest distance for 20 seconds. Let your eye muscles soften.' },
          { title: '1 messy scribble', text: 'Open a notebook and write one single word or make an unstructured doodle.' },
          { title: 'Blanket refuge', text: 'Leave your phone on a shelf. Close your eyes for 3 minutes and feel the pillow beneath you.' }
        ]
      },
      play: {
        bubbleTitle: 'Pop the tension bubbles',
        bubblePrompt: 'Tap each floating thought bubble to interrupt thumb auto-pilot:',
        bubbles: ['FOMO', 'Comparison', 'Noise', 'Endless feed', 'Pressure', 'Autopilot', 'Overstimulation'],
        poppedAll: 'All bubbles cleared! Your thumbs belong to you again.',
        shakeTitle: '7-second hand reset',
        shakeDesc: 'Vigorously shake your hands and wrists as if flicking cold water droplets off your fingertips.',
        shakeButton: 'Start 7s hand shake',
        shakeActive: 'Shaking... releasing... exhaling!',
        shakeDone: 'Tension beautifully released.',
        secretQuestTitle: '30-second secret quest',
        secretQuestPrompt: 'A spontaneous real-world micro-quest:',
        quests: [
          'Find 3 items in the room with a velvety or soft texture.',
          'Step to the window and spot the farthest visible tree or rooftop.',
          'Savor a pleasant scent: fresh coffee, favorite lotion or clean laundry.',
          'Roll your shoulders back 5 times and let your neck surrender its weight.'
        ],
        questNext: 'Roll another quest'
      },
      alive: {
        title: 'Not therapy, just being alive',
        subtitle: 'Feel the vibrant pulse of your existence in this very breath.',
        prompts: [
          {
            title: 'The warmth of your lips',
            text: 'Close your eyes for one breath. Feel the subtle contact where your upper and lower lip meet. A delicate warmth that is always here.'
          },
          {
            title: '10-second butterfly hug',
            text: 'Cross your arms over your chest, place your hands on your shoulders and give yourself a steady, reassuring hold.'
          },
          {
            title: 'Cold water on inner wrists',
            text: 'Run chilled tap water over the inside of your wrists for 10 seconds. Notice the clean, crisp sensation of being alive.'
          },
          {
            title: 'Favorite song with screen down',
            text: 'Put on a song that gives you goosebumps, place your phone face down on the table, and just listen until the chorus finishes.'
          }
        ]
      },
      backToLifeBtn: "I'm back (Here & now)",
      recoveredToast: 'Welcome back to the real moment, Marie. It is wonderful having you here.'
    }
  }
};
