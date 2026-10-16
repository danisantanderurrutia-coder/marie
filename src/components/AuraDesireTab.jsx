import React, { useState } from 'react';
import { 
  Lock, 
  Unlock, 
  ShieldCheck, 
  Sparkles, 
  Heart, 
  Check, 
  Shuffle, 
  Feather, 
  KeyRound, 
  MessageCircleHeart,
  Moon,
  Sun,
  Zap,
  RotateCw
} from 'lucide-react';
import { playSoftChime, playUnlockChime, playSoftTap } from '../utils/audio';
import { useLanguage } from '../context/LanguageContext';
import { LOGO_04 } from '../utils/assets';

const FIRE_LEVELS = [
  {
    level: 1,
    title: {
      es: 'Calma Soberana',
      de: 'Souveräne Gelassenheit',
      en: 'Sovereign Calm'
    },
    emoji: '🌸',
    color: '#7DA3BE',
    vibe: {
      es: 'Rosa en reposo: observo el mundo desde mi trono sin prisa ni exigencias.',
      de: 'Rose in Ruhe: Ich beobachte die Welt von meinem Thron ohne Hast oder Forderungen.',
      en: 'Rose at rest: observing the world from my throne without rush or demands.'
    },
    quote: {
      es: 'La rosa no compite con la de al lado: simplemente florece cuando quiere.',
      de: 'Die Rose konkurriert nicht mit der Nachbarin: Sie blüht einfach, wenn sie will.',
      en: 'The rose doesn’t compete with the one next to it: it blooms whenever it desires.'
    }
  },
  {
    level: 2,
    title: {
      es: 'Magnetismo Implacable',
      de: 'Magnetische Macht',
      en: 'Magnetic Power'
    },
    emoji: '⚡',
    color: '#D84A58',
    vibe: {
      es: 'Fuck Girl Mindset: Yo no persigo, yo atraigo. Mi energía es cara.',
      de: 'Fuck Girl Mindset: Ich jage nicht hinterher, ich ziehe an. Meine Energie ist kostbar.',
      en: 'Fuck Girl Mindset: I do not chase, I attract. My energy is expensive.'
    },
    quote: {
      es: 'No le debo una sonrisa ni una disculpa a nadie por elegir mi territorio sagrado.',
      de: 'Ich schulde niemandem ein Lächeln oder eine Entschuldigung für meinen Schutzraum.',
      en: 'I owe no one a smile or an apology for guarding my sacred space.'
    }
  },
  {
    level: 3,
    title: {
      es: 'Fuego Rebelde',
      de: 'Rebellisches Feuer',
      en: 'Rebel Fire'
    },
    emoji: '🔥',
    color: '#E05D44',
    vibe: {
      es: 'Audacia viva: hoy me como el mundo a besos y sin pedir permiso.',
      de: 'Lebendige Kühnheit: Heute begegne ich der Welt stolz und ohne Erlaubnis.',
      en: 'Vibrant boldness: today I embrace the world with grace and zero permission needed.'
    },
    quote: {
      es: 'Puedo ser dulce como el terciopelo y tener espinas que defienden mi deseo.',
      de: 'Ich kann zart wie Samt sein und Dornen besitzen, die mein Begehren schützen.',
      en: 'I can be soft as velvet and hold sharp thorns that protect my pleasure.'
    }
  },
  {
    level: 4,
    title: {
      es: 'Éxtasis & Deseo Sagrado',
      de: 'Ekstase & Heiliges Begehren',
      en: 'Ecstasy & Sacred Desire'
    },
    emoji: '🕯️',
    color: '#9B2C3B',
    vibe: {
      es: 'Sensualidad pura: mi placer me pertenece por derecho divino indiscutible.',
      de: 'Reine Sinnlichkeit: Meine Lust gehört mir aus unantastbarem göttlichem Recht.',
      en: 'Pure sensuality: my pleasure belongs to me by indisputable divine right.'
    },
    quote: {
      es: 'El placer no es un regalo que recibo: es una hoguera que yo misma enciendo.',
      de: 'Lust ist kein Geschenk, auf das ich warte: Sie ist ein Feuer, das ich selbst entfache.',
      en: 'Pleasure is not a gift I wait for: it is a fire I ignite myself.'
    }
  }
];

const FUCK_GIRL_MANTRAS = {
  es: [
    {
      id: 1,
      mantra: 'No persigo. Yo atraigo. Lo que es para mí me busca y lo que no, le abro la puerta para que se vaya sin drama.',
      vibe: 'Magnetismo Puro',
      category: 'Poder'
    },
    {
      id: 2,
      mantra: 'No le debo una sonrisa, una explicación ni un "perdón" a nadie por priorizar mi paz y mi tiempo.',
      vibe: 'Límites Implacables',
      category: 'Límites'
    },
    {
      id: 3,
      mantra: 'Si a alguien le incomoda mi luz o mi carácter, que se compre una vida más interesante.',
      vibe: 'Sin Filtros',
      category: 'Autenticidad'
    },
    {
      id: 4,
      mantra: 'Soy el premio. Mi atención es un lujo que no le regalo a la mediocridad.',
      vibe: 'Autoestima Alta',
      category: 'Valor'
    },
    {
      id: 5,
      mantra: 'Puedo ser suave como una rosa silvestre y tener espinas que defienden mi territorio sin dudar jamás.',
      vibe: 'Rosa Silvestre',
      category: 'Fuego & Gracia'
    },
    {
      id: 6,
      mantra: 'Mi placer y mi cuerpo son mi reino indiscutible: gozo sin culpa, deseo sin vergüenza y amo con libertad.',
      vibe: 'Soberanía Erótica',
      category: 'Deseo'
    }
  ],
  de: [
    {
      id: 1,
      mantra: 'Ich jage nicht hinterher. Ich ziehe an. Was für mich bestimmt ist, findet mich – und was nicht, dem öffne ich die Tür ohne Drama.',
      vibe: 'Reiner Magnetismus',
      category: 'Macht'
    },
    {
      id: 2,
      mantra: 'Ich schulde niemandem ein Lächeln, eine Erklärung oder eine Entschuldigung dafür, dass mein Frieden und meine Zeit an erster Stelle stehen.',
      vibe: 'Klare Grenzen',
      category: 'Grenzen'
    },
    {
      id: 3,
      mantra: 'Wenn sich jemand an meinem Strahlen oder meinem Charakter stört, soll er sich ein interessanteres eigenes Leben zulegen.',
      vibe: 'Ohne Filter',
      category: 'Authentizität'
    },
    {
      id: 4,
      mantra: 'Ich bin der Hauptgewinn. Meine Aufmerksamkeit ist ein Luxus, den ich nicht an Mittelmäßigkeit verschenke.',
      vibe: 'Hoher Selbstwert',
      category: 'Wert'
    },
    {
      id: 5,
      mantra: 'Ich kann sanft sein wie eine wilde Heckenrose – und Dornen tragen, die mein Territorium ohne Zögern schützen.',
      vibe: 'Wilde Rose',
      category: 'Feuer & Anmut'
    },
    {
      id: 6,
      mantra: 'Meine Lust und mein Körper sind mein unantastbares Reich: Ich genieße ohne Schuld, begehre ohne Scham und liebe in voller Freiheit.',
      vibe: 'Erotische Souveränität',
      category: 'Lust'
    }
  ],
  en: [
    {
      id: 1,
      mantra: 'I do not chase. I attract. What belongs to me finds me, and what doesn’t, I open the door for it to leave without drama.',
      vibe: 'Pure Magnetism',
      category: 'Power'
    },
    {
      id: 2,
      mantra: 'I owe no one a smile, an explanation, or an apology for prioritizing my peace and my precious time.',
      vibe: 'Uncompromising Boundaries',
      category: 'Boundaries'
    },
    {
      id: 3,
      mantra: 'If anyone feels threatened or bothered by my radiance or character, they should get a more captivating life.',
      vibe: 'Unfiltered',
      category: 'Authenticity'
    },
    {
      id: 4,
      mantra: 'I am the prize. My attention is a luxury that I never give away to mediocrity.',
      vibe: 'High Self-Worth',
      category: 'Worth'
    },
    {
      id: 5,
      mantra: 'I can be gentle as a wild rose and wield sharp thorns that defend my territory without hesitation.',
      vibe: 'Wild Rose',
      category: 'Fire & Grace'
    },
    {
      id: 6,
      mantra: 'My pleasure and my body are my unquestionable realm: I relish without guilt, desire without shame, and love freely.',
      vibe: 'Erotic Sovereignty',
      category: 'Desire'
    }
  ]
};

const SENSORY_TOUCHPOINTS = [
  {
    id: 'nuca',
    label: { es: 'Nuca & Cuello', de: 'Nacken & Hals', en: 'Nape & Neck' },
    cx: '50%',
    cy: '24%',
    sensation: {
      es: 'Besos muy lentos, aliento tibio y caricias ascendentes con la yema de los dedos.',
      de: 'Sehr langsame Küsse, warmer Atem und aufsteigende Berührungen mit den Fingerspitzen.',
      en: 'Very slow kisses, warm breath, and upward caresses with gentle fingertips.'
    },
    trigger: {
      es: 'Despierta escalofríos inmediatos y baja todas las defensas.',
      de: 'Weckt augenblickliche Schauer und lässt alle Schutzmauern schmelzen.',
      en: 'Sparks immediate goosebumps and dissolves all defenses.'
    }
  },
  {
    id: 'clavicula',
    label: { es: 'Clavículas & Hombros', de: 'Schlüsselbeine & Schultern', en: 'Collarbones & Shoulders' },
    cx: '36%',
    cy: '33%',
    sensation: {
      es: 'Roce suave de labios sin prisa, manos tibias recorriendo los hombros.',
      de: 'Sanftes Streifen der Lippen ohne Eile, warme Hände, die die Schultern entlanggleiten.',
      en: 'Soft brush of lips without rush, warm hands tracing across shoulders.'
    },
    trigger: {
      es: 'Conexión suave y vulnerable que eriza la piel.',
      de: 'Zarte, verletzliche Verbindung, die die Haut elektrisiert.',
      en: 'Gentle, tender connection that makes the skin tingle.'
    }
  },
  {
    id: 'espalda',
    label: { es: 'Espalda Baja & Columna', de: 'Unterer Rücken & Wirbelsäule', en: 'Lower Back & Spine' },
    cx: '50%',
    cy: '52%',
    sensation: {
      es: 'Presión firme que recorre vértebra a vértebra, manos que sujetan con calma.',
      de: 'Fester Druck Wirbel für Wirbel, Hände, die ruhig und geborgen halten.',
      en: 'Firm, grounded pressure along every vertebra, hands holding with steady calm.'
    },
    trigger: {
      es: 'Suelta toda la tensión acumulada y despierta calor profundo.',
      de: 'Löst jegliche Anspannung und entfacht tiefe, wohlige Wärme.',
      en: 'Releases all accumulated tension and stirs deep inner warmth.'
    }
  },
  {
    id: 'caderas',
    label: { es: 'Cintura & Caderas', de: 'Taille & Hüften', en: 'Waist & Hips' },
    cx: '62%',
    cy: '62%',
    sensation: {
      es: 'Sujeción con seguridad, balanceo lento y caricias con los pulgares.',
      de: 'Sicherer Halt, langsames Wiegen und sanfte Streichungen mit den Daumen.',
      en: 'Grounded grip, slow swaying, and soothing caresses with thumbs.'
    },
    trigger: {
      es: 'Soberanía corporal, sensación de ser intensamente deseada.',
      de: 'Körperliche Souveränität, das Gefühl, vollkommen begehrt zu werden.',
      en: 'Bodily sovereignty, feeling intensely wanted and cherished.'
    }
  },
  {
    id: 'munecas',
    label: { es: 'Muñecas & Palmas', de: 'Handgelenke & Handflächen', en: 'Wrists & Palms' },
    cx: '25%',
    cy: '58%',
    sensation: {
      es: 'Dedos entrelazados con fuerza, besos en el interior de la muñeca donde late el pulso.',
      de: 'Innig verschränkte Finger, Küsse auf der Innenseite des Handgelenks am Pulsschlag.',
      en: 'Fingers deeply intertwined, kisses against the inside of the wrist where the pulse beats.'
    },
    trigger: {
      es: 'Intimidad eléctrica y cómplice.',
      de: 'Elektrisierende, vertraute Intimität.',
      en: 'Electric and complicit intimacy.'
    }
  },
  {
    id: 'labios',
    label: { es: 'Labios & Aliento', de: 'Lippen & Atem', en: 'Lips & Breath' },
    cx: '50%',
    cy: '17%',
    sensation: {
      es: 'Roce sin llegar a besar de inmediato, mirarse a los ojos de cerca, mordisco sutil.',
      de: 'Hauchzartes Berühren vor dem Kuss, tief in die Augen schauen, ein feiner Biss.',
      en: 'Hovering lips before kissing, looking deep into each other’s eyes, subtle gentle bite.'
    },
    trigger: {
      es: 'Tensión deliciosa y magnetismo puro.',
      de: 'Köstliche Spannung und reine magnetische Anziehung.',
      en: 'Delicious tension and pure magnetism.'
    }
  }
];

const SOLO_TAROT = {
  es: [
    {
      title: 'El Espejo Sagrado',
      text: 'Mírate hoy desnuda frente al espejo sin juzgar nada. Agradece a tus caderas por sostenerte y a tu piel por sentir.',
      ritual: 'Aplica tu crema favorita acariciando cada curva con la devoción que le tendrías a una diosa.'
    },
    {
      title: 'La Rebelión del Placer',
      text: 'Tu placer no necesita una ocasión especial ni aprobación externa. Date permiso de sentir rico hoy solo para ti.',
      ritual: 'Pon música envolvente, apaga las luces frías y enciende una vela antes de dormir.'
    },
    {
      title: 'La Espina Protectora',
      text: '¿A qué le has estado diciendo que "sí" cuando por dentro tu cuerpo grita un rotundo "no"?',
      ritual: 'Cancela hoy cualquier compromiso que drene tu energía sin dar explicaciones largas.'
    },
    {
      title: 'Seda & Fuego',
      text: 'Elige hoy tu ropa interior más exquisita, no para que nadie la vea, sino para que tú recuerdes quién eres a cada paso.',
      ritual: 'Siente el tacto de la tela sobre tu piel durante el día como un recordatorio secreto de tu poder.'
    }
  ],
  de: [
    {
      title: 'Der Heilige Spiegel',
      text: 'Betrachte dich heute nackt vor dem Spiegel ohne jedes Urteil. Danke deinen Hüften fürs Tragen und deiner Haut fürs Fühlen.',
      ritual: 'Trage deine Lieblingscreme auf und streichle jede Kurve mit der Andacht, die einer Göttin gebührt.'
    },
    {
      title: 'Die Rebellion der Lust',
      text: 'Deine Lust braucht keinen besonderen Anlass und keine fremde Erlaubnis. Schenke dir heute Sinnlichkeit ganz für dich.',
      ritual: 'Lege sanfte Musik auf, dimme das Licht und zünde vor dem Schlafen eine Kerze an.'
    },
    {
      title: 'Der Schützende Dorn',
      text: 'Wozu hast du "Ja" gesagt, obwohl dein Körper im Inneren ein klares, tiefes "Nein" flüstert?',
      ritual: 'Sage heute ohne langes Rechtfertigen eine Verpflichtung ab, die dir deine Energie raubt.'
    },
    {
      title: 'Seide & Feuer',
      text: 'Wähle heute deine schönste Wäsche – nicht damit sie jemand sieht, sondern damit du bei jedem Schritt spürst, wer du bist.',
      ritual: 'Spüre den feinen Stoff auf deiner Haut durch den Tag als geheime Erinnerung an deine Kraft.'
    }
  ],
  en: [
    {
      title: 'The Sacred Mirror',
      text: 'Look at yourself naked in the mirror today with zero judgment. Thank your hips for carrying you and your skin for feeling.',
      ritual: 'Apply your favorite cream, caressing every curve with the reverence you would offer a goddess.'
    },
    {
      title: 'Rebellion of Pleasure',
      text: 'Your pleasure needs no special occasion or external approval. Give yourself full permission to feel blissful today just for you.',
      ritual: 'Put on immersive music, turn off harsh lights, and light a candle before bed.'
    },
    {
      title: 'The Protective Thorn',
      text: 'What have you been saying "yes" to when deep down your body whispers an undeniable "no"?',
      ritual: 'Politely cancel any obligation today that drains your energy, without overexplaining.'
    },
    {
      title: 'Silk & Fire',
      text: 'Choose your most exquisite lingerie today, not for anyone to see, but so you remember who you are with every step.',
      ritual: 'Feel the touch of fabric against your skin throughout the day as a secret talisman of your power.'
    }
  ]
};

const COUPLE_TAROT = {
  es: [
    {
      title: 'El Control Cómplice',
      text: 'Si esta noche tuvieras el mando absoluto de nuestro tiempo y nuestros cuerpos, ¿cuál sería la primera orden?',
      dare: 'Dile a Daniel al oído una sola frase de lo que te gustaría que hiciera contigo hoy.'
    },
    {
      title: 'El Mapa del Susurro',
      text: '¿Cuál es esa caricia o rincón de tu piel que cuando lo toco te hace desconectar la mente y rendirte al cuerpo?',
      dare: 'Pídele a Daniel que te acaricie exactamente en ese punto durante 5 minutos en silencio.'
    },
    {
      title: 'La Fantasía Inconfesada',
      text: '¿Hay algún escenario, lugar insospechado o juego que te dé curiosidad probar juntos sin juicios?',
      dare: 'Escríbelo en una nota secreta o compártanlo con una copa de vino en la cama.'
    },
    {
      title: 'El Beso Prohibido',
      text: '¿Cuál ha sido el beso nuestro que más electricidad te ha hecho sentir en la piel?',
      dare: 'Recreadlo ahora mismo durante al menos 60 segundos sin prisas.'
    }
  ],
  de: [
    {
      title: 'Vertraute Verführung',
      text: 'Wenn du heute Nacht die absolute Regie über unsere Zeit und Körper hättest, was wäre dein erster Wunsch?',
      dare: 'Flüstere Daniel ins Ohr einen einzigen Satz darüber, was er heute Nacht mit dir tun soll.'
    },
    {
      title: 'Die Karte des Flüsterns',
      text: 'Welche Berührung oder Stelle an deiner Haut lässt deinen Verstand sofort stillstehen und dich fallenlassen?',
      dare: 'Bitte Daniel, genau diesen Punkt 5 Minuten lang in stiller Hingabe zu liebkosen.'
    },
    {
      title: 'Das Ungestillte Verlangen',
      text: 'Gibt es eine Kulisse, einen unerwarteten Ort oder ein Spiel, das dich neugierig macht, frei von jedem Urteil?',
      dare: 'Schreibe es auf einen geheimen Zettel oder teile es bei einem Glas Wein im Bett.'
    },
    {
      title: 'Der Verbotene Kuss',
      text: 'Welcher unserer Küsse hat bisher das stärkste Kribbeln unter deiner Haut entfacht?',
      dare: 'Erlebt ihn jetzt noch einmal gemeinsam für mindestens 60 Sekunden ohne jede Eile.'
    }
  ],
  en: [
    {
      title: 'Intimate Mastery',
      text: 'If tonight you had complete command of our time and bodies, what would be your very first order?',
      dare: 'Whisper a single sentence into Daniel’s ear describing what you want him to do with you today.'
    },
    {
      title: 'The Whisper Map',
      text: 'Which touch or place on your skin instantly quiets your mind and surrenders you completely to your body?',
      dare: 'Ask Daniel to caress exactly that spot for 5 minutes in tender silence.'
    },
    {
      title: 'The Secret Fantasy',
      text: 'Is there a scenario, unexpected setting, or playful dynamic you are curious to explore together without judgment?',
      dare: 'Write it down on a secret slip of paper or share it over a glass of wine in bed.'
    },
    {
      title: 'The Forbidden Kiss',
      text: 'Which kiss of ours sent the deepest spark of electricity coursing through your skin?',
      dare: 'Recreate it right now together for at least 60 seconds without rushing.'
    }
  ]
};

const THORNS_MANIFESTO = {
  es: [
    { num: '01', title: 'Mi valor no se negocia', desc: 'No le debo belleza perfecta, sonrisas forzadas ni explicaciones al mundo. Existir ya es sagrado.' },
    { num: '02', title: 'Un "no" es una frase completa', desc: '"No me apetece" o "no quiero" no requiere justificaciones elaboradas. Es suficiente.' },
    { num: '03', title: 'Soberanía de mi Ritmo', desc: 'Cero prisa: no compito con nadie. La rosa silvestre florece cuando sus raíces están listas.' },
    { num: '04', title: 'Placer sin Culpa', desc: 'Mi deseo es mío. Gozar y sentir rico es mi estado natural, no una concesión.' }
  ],
  de: [
    { num: '01', title: 'Mein Wert ist nicht verhandelbar', desc: 'Ich schulde der Welt keine makellose Perfektion, kein erzwungenes Lächeln und keine Erklärungen. Dasein ist heilig.' },
    { num: '02', title: 'Ein "Nein" ist ein ganzer Satz', desc: '"Ich möchte nicht" oder "mir ist nicht danach" bedarf keiner langen Rechtfertigung. Es genügt.' },
    { num: '03', title: 'Souveränität meines Rhythmus', desc: 'Keine Eile: Ich konkurriere mit niemandem. Die wilde Heckenrose blüht, wenn ihre Wurzeln bereit sind.' },
    { num: '04', title: 'Lust ohne Schuldgefühle', desc: 'Mein Begehren gehört mir. Wonne und Wohlgefühl sind mein natürlicher Zustand, kein Zugeständnis.' }
  ],
  en: [
    { num: '01', title: 'My worth is non-negotiable', desc: 'I owe the world no flawless perfection, forced smiles, or explanations. Simply existing is sacred.' },
    { num: '02', title: 'A "no" is a complete sentence', desc: '"I don’t want to" or "I don’t feel like it" requires no elaborate justification. It is enough.' },
    { num: '03', title: 'Sovereignty of My Rhythm', desc: 'Zero rush: I compete with no one. The wild rose blooms when its roots are grounded and ready.' },
    { num: '04', title: 'Pleasure Without Guilt', desc: 'My desire belongs to me. Reveling in sensual bliss is my birthright, never a concession.' }
  ]
};

const INTIMACY_PROMPTS_LOCALIZED = {
  es: [
    {
      id: 'desire-map',
      category: 'Mapeo del Deseo',
      options: [
        { id: 'opt_slow', label: 'Caricias lentas, casi imperceptibles con la yema de los dedos' },
        { id: 'opt_firm', label: 'Masaje firme con aceite tibio en espalda y hombros' },
        { id: 'opt_eyes', label: 'Contacto visual prolongado y respiración sincronizada' },
        { id: 'opt_temp', label: 'Juegos de temperatura (calor, frío, texturas de seda)' }
      ]
    },
    {
      id: 'sensual-awakening',
      category: 'Sensualidad Personal',
      options: [
        { id: 'opt_bath', label: 'Baño de inmersión con sales de lavanda, velas y sin móvil' },
        { id: 'opt_sheets', label: 'Dormir con sábanas recién lavadas y crema perfumada' },
        { id: 'opt_lingerie', label: 'Vestirme con lencería hermosa un día cualquiera solo para mí' },
        { id: 'opt_flowers', label: 'Comprar mi flor favorita y ponerla en mi mesilla de noche' }
      ]
    }
  ],
  de: [
    {
      id: 'desire-map',
      category: 'Landkarte der Lust',
      options: [
        { id: 'opt_slow', label: 'Sehr langsame Berührungen mit den Fingerspitzen' },
        { id: 'opt_firm', label: 'Feste Massage mit warmem Öl an Rücken und Schultern' },
        { id: 'opt_eyes', label: 'Tiefer Augenkontakt und synchroner Atem' },
        { id: 'opt_temp', label: 'Temperaturspiele (Wärme, Kühle, Seidenstoffe)' }
      ]
    },
    {
      id: 'sensual-awakening',
      category: 'Persönliche Sinnlichkeit',
      options: [
        { id: 'opt_bath', label: 'Entspannungsbad mit Lavendel, Kerzen und ohne Smartphone' },
        { id: 'opt_sheets', label: 'Schlafen in frisch bezogener Bettwäsche und mit Duftcreme' },
        { id: 'opt_lingerie', label: 'Schöne Wäsche tragen an einem ganz normalen Tag nur für mich' },
        { id: 'opt_flowers', label: 'Meine Lieblingsblumen kaufen und ans Bett stellen' }
      ]
    }
  ],
  en: [
    {
      id: 'desire-map',
      category: 'Desire Mapping',
      options: [
        { id: 'opt_slow', label: 'Very slow caresses with gentle fingertips' },
        { id: 'opt_firm', label: 'Firm massage with warm oil on back and shoulders' },
        { id: 'opt_eyes', label: 'Prolonged eye contact and synchronized breathing' },
        { id: 'opt_temp', label: 'Temperature play (warmth, cold, silk textures)' }
      ]
    },
    {
      id: 'sensual-awakening',
      category: 'Personal Sensuality',
      options: [
        { id: 'opt_bath', label: 'Soaking bath with lavender salts, candles, and no phone' },
        { id: 'opt_sheets', label: 'Sleeping in fresh sheets and delicately scented lotion' },
        { id: 'opt_lingerie', label: 'Wearing beautiful lingerie on an ordinary day just for myself' },
        { id: 'opt_flowers', label: 'Buying my favorite flowers for the bedside table' }
      ]
    }
  ]
};

export default function AuraDesireTab({ soundEnabled }) {
  const { language, currentStrings } = useLanguage();
  const auraT = currentStrings?.aura || {};
  const langKey = language === 'de' ? 'de' : language === 'en' ? 'en' : 'es';

  const [atmosphereMode, setAtmosphereMode] = useState('velvet'); // 'velvet' | 'daylight'
  const [activeTabSection, setActiveTabSection] = useState('fire'); // 'fire' | 'constellation' | 'tarot' | 'sanctuary'
  const [currentFireLevel, setCurrentFireLevel] = useState(2);
  const [mantraIndex, setMantraIndex] = useState(0);
  const [selectedTouchpointId, setSelectedTouchpointId] = useState('nuca');
  const [tarotMode, setTarotMode] = useState('couple'); // 'solo' | 'couple'
  const [soloCardIndex, setSoloCardIndex] = useState(0);
  const [coupleCardIndex, setCoupleCardIndex] = useState(0);
  const [isCardFlipped, setIsCardFlipped] = useState(false);

  // Sanctuary lock & journal (app is already unlocked via AppLock gate)
  const [isUnlocked, setIsUnlocked] = useState(true);
  const [isScanning, setIsScanning] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [showPinPad, setShowPinPad] = useState(false);
  const [selectedDesires, setSelectedDesires] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('marie_selected_desires')) || {};
    } catch (e) {
      return {};
    }
  });
  const [secretJournal, setSecretJournal] = useState(() => {
    return localStorage.getItem('marie_secret_journal') || '';
  });
  const [isJournalSaved, setIsJournalSaved] = useState(false);

  // Fav mantras
  const [favMantras, setFavMantras] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('marie_fav_mantras')) || [1];
    } catch (e) {
      return [1];
    }
  });

  const fireRaw = FIRE_LEVELS[currentFireLevel - 1] || FIRE_LEVELS[0];
  const fire = {
    ...fireRaw,
    title: auraT.levels?.[currentFireLevel - 1]?.title || fireRaw.title[langKey] || fireRaw.title.es,
    quote: auraT.levels?.[currentFireLevel - 1]?.quote || fireRaw.quote[langKey] || fireRaw.quote.es,
    vibe: auraT.levels?.[currentFireLevel - 1]?.vibe || fireRaw.vibe[langKey] || fireRaw.vibe.es
  };

  const mantrasList = FUCK_GIRL_MANTRAS[langKey] || FUCK_GIRL_MANTRAS.es;
  const currentMantra = mantrasList[mantraIndex % mantrasList.length];
  const isFav = favMantras.includes(currentMantra.id);

  const rawTouchpoint = SENSORY_TOUCHPOINTS.find(tp => tp.id === selectedTouchpointId) || SENSORY_TOUCHPOINTS[0];
  const selectedTouchpoint = {
    id: rawTouchpoint.id,
    cx: rawTouchpoint.cx,
    cy: rawTouchpoint.cy,
    label: rawTouchpoint.label[langKey] || rawTouchpoint.label.es,
    sensation: rawTouchpoint.sensation[langKey] || rawTouchpoint.sensation.es,
    trigger: rawTouchpoint.trigger[langKey] || rawTouchpoint.trigger.es
  };

  const soloTarotList = SOLO_TAROT[langKey] || SOLO_TAROT.es;
  const coupleTarotList = COUPLE_TAROT[langKey] || COUPLE_TAROT.es;
  const currentTarot = tarotMode === 'solo' 
    ? soloTarotList[soloCardIndex % soloTarotList.length] 
    : coupleTarotList[coupleCardIndex % coupleTarotList.length];

  const manifestoList = THORNS_MANIFESTO[langKey] || THORNS_MANIFESTO.es;
  const intimacyPrompts = INTIMACY_PROMPTS_LOCALIZED[langKey] || INTIMACY_PROMPTS_LOCALIZED.es;

  const toggleAtmosphere = () => {
    playSoftTap();
    setAtmosphereMode(prev => prev === 'velvet' ? 'daylight' : 'velvet');
  };

  const handleNextMantra = () => {
    playSoftTap();
    setMantraIndex(prev => (prev + 1) % mantrasList.length);
  };

  const handleToggleFav = () => {
    if (soundEnabled) playSoftChime();
    const updated = isFav 
      ? favMantras.filter(id => id !== currentMantra.id)
      : [...favMantras, currentMantra.id];
    setFavMantras(updated);
    try {
      localStorage.setItem('marie_fav_mantras', JSON.stringify(updated));
    } catch (e) {}
  };

  const handleSimulateFaceID = () => {
    playSoftTap();
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setIsUnlocked(true);
      if (soundEnabled) playUnlockChime();
    }, 1100);
  };

  const [pinError, setPinError] = useState(false);
  const SANCTUARY_PIN = '2211';

  const handlePinSubmit = (digit) => {
    playSoftTap();
    setPinError(false);
    const newPin = pinInput + digit;
    setPinInput(newPin);
    if (newPin.length === 4) {
      if (newPin === SANCTUARY_PIN) {
        setTimeout(() => {
          setIsUnlocked(true);
          if (soundEnabled) playUnlockChime();
          setPinInput('');
          setShowPinPad(false);
        }, 250);
      } else {
        setPinError(true);
        setTimeout(() => {
          setPinInput('');
          setPinError(false);
        }, 800);
      }
    }
  };

  const handleSaveJournal = () => {
    if (soundEnabled) playSoftChime();
    localStorage.setItem('marie_secret_journal', secretJournal);
    setIsJournalSaved(true);
    setTimeout(() => setIsJournalSaved(false), 2500);
  };

  const handleNextTarot = () => {
    playSoftTap();
    setIsCardFlipped(false);
    setTimeout(() => {
      if (tarotMode === 'solo') {
        setSoloCardIndex(prev => (prev + 1) % soloTarotList.length);
      } else {
        setCoupleCardIndex(prev => (prev + 1) % coupleTarotList.length);
      }
    }, 150);
  };

  return (
    <div className={`tab-content aura-desire-master ${atmosphereMode}`}>
      {/* Atmosphere Header & Mode Controls */}
      <div className="aura-atmosphere-bar glass-panel">
        <div className="atmosphere-title-group">
          <div className="flame-halo" style={{ background: fire.color }}>
            <span className="flame-icon">{fire.emoji}</span>
          </div>
          <div>
            <h3 className="aura-headline font-serif">{auraT.tag || (language === 'de' ? 'Aura & Strahlkraft' : language === 'en' ? 'Aura & Radiance' : 'Aura & Deseo')}</h3>
            <span className="aura-subheadline">{fire.title}</span>
          </div>
        </div>

        <button 
          className="atmosphere-toggle-btn"
          onClick={toggleAtmosphere}
          title={atmosphereMode === 'velvet' ? (language === 'de' ? 'Tageslicht' : language === 'en' ? 'Daylight' : 'Luz de Día') : (language === 'de' ? 'Samt-Dämmerung' : language === 'en' ? 'Velvet Dusk' : 'Penumbra')}
        >
          {atmosphereMode === 'velvet' ? (
            <>
              <Moon size={14} color="#F8C3CA" />
              <span>{language === 'de' ? 'Samt-Dämmerung' : language === 'en' ? 'Velvet Dusk' : 'Penumbra Íntima'}</span>
            </>
          ) : (
            <>
              <Sun size={14} color="#D97706" />
              <span>{language === 'de' ? 'Sonnenlicht' : language === 'en' ? 'Daylight' : 'Luz Solar'}</span>
            </>
          )}
        </button>
      </div>

      {/* Interactive Fire / Energy Dial (4 States) */}
      <div className="fire-dial-card glass-panel">
        <div className="dial-header">
          <span className="dial-tag">{auraT.fireTitle || (language === 'de' ? 'Souveränitäts-Thermometer' : language === 'en' ? 'Sovereignty Dial' : 'Termómetro de Soberanía')}</span>
          <span className="dial-current-name font-serif" style={{ color: fire.color }}>
            {fire.emoji} {fire.title}
          </span>
        </div>

        <div className="fire-slider-track">
          {FIRE_LEVELS.map((f) => {
            const isSelected = currentFireLevel === f.level;
            return (
              <button
                key={f.level}
                className={`fire-level-node ${isSelected ? 'selected' : ''}`}
                style={isSelected ? { borderColor: f.color, color: f.color, background: `${f.color}25` } : {}}
                onClick={() => { playSoftTap(); setCurrentFireLevel(f.level); }}
              >
                <span className="node-emoji">{f.emoji}</span>
                <span className="node-num">0{f.level}</span>
              </button>
            );
          })}
        </div>

        <p className="fire-vibe-quote font-serif">
          “{fire.quote}”
        </p>
      </div>

      {/* Sub-navigation Pills */}
      <div className="aura-nav-pills glass-panel">
        <button 
          className={`aura-pill-btn ${activeTabSection === 'fire' ? 'active' : ''}`}
          onClick={() => { playSoftTap(); setActiveTabSection('fire'); }}
        >
          <Zap size={14} />
          <span>{language === 'de' ? 'Feuer & Mindset' : language === 'en' ? 'Fire & Mindset' : 'Fuego & Mindset'}</span>
        </button>
        <button 
          className={`aura-pill-btn ${activeTabSection === 'constellation' ? 'active' : ''}`}
          onClick={() => { playSoftTap(); setActiveTabSection('constellation'); }}
        >
          <Sparkles size={14} />
          <span>{language === 'de' ? 'Berührungspunkte' : language === 'en' ? 'Tactile Constellation' : 'Constelación Táctil'}</span>
        </button>
        <button 
          className={`aura-pill-btn ${activeTabSection === 'tarot' ? 'active' : ''}`}
          onClick={() => { playSoftTap(); setActiveTabSection('tarot'); }}
        >
          <MessageCircleHeart size={14} />
          <span>{language === 'de' ? 'Tarot der Lust' : language === 'en' ? 'Pleasure Tarot' : 'Tarot del Placer'}</span>
        </button>
        <button 
          className={`aura-pill-btn ${activeTabSection === 'sanctuary' ? 'active' : ''}`}
          onClick={() => { playSoftTap(); setActiveTabSection('sanctuary'); }}
        >
          <Lock size={13} />
          <span>{auraT.sanctuaryTitle || (language === 'de' ? 'Geheim-Refugium' : language === 'en' ? 'Sanctuary' : 'Santuario')}</span>
        </button>
      </div>

      {/* SECTION 1: FUEGO & FUCK GIRL MINDSET */}
      {activeTabSection === 'fire' && (
        <div className="aura-section-view animate-fade-in">
          {/* Card del Mantra Interactivo de Autoafirmación */}
          <div className="fuck-girl-hero-card glass-panel">
            <div className="hero-badge-row">
              <span className="hero-category-tag">{currentMantra.category}</span>
              <span className="hero-vibe-tag">{currentMantra.vibe}</span>
            </div>

            <p className="hero-mantra-quote font-serif">
              “{currentMantra.mantra}”
            </p>

            <div className="hero-card-actions">
              <button 
                className={`hero-fav-btn ${isFav ? 'active' : ''}`}
                onClick={handleToggleFav}
              >
                <Heart size={16} fill={isFav ? '#D84A58' : 'none'} color={isFav ? '#D84A58' : 'currentColor'} />
                <span>
                  {isFav 
                    ? (language === 'de' ? 'Im Herzen bewahrt' : language === 'en' ? 'Held in Heart' : 'En mi corazón')
                    : (language === 'de' ? 'Zu meinen Mantras' : language === 'en' ? 'Make it mine' : 'Hacerlo mío')
                  }
                </span>
              </button>

              <button className="hero-shuffle-btn" onClick={handleNextMantra}>
                <Shuffle size={14} />
                <span>
                  {language === 'de' ? 'Nächstes' : language === 'en' ? 'Next' : 'Siguiente'} ({(mantraIndex % mantrasList.length) + 1}/{mantrasList.length})
                </span>
              </button>
            </div>
          </div>

          {/* Manifiesto Táctil de las Espinas */}
          <div className="thorns-manifesto-grid">
            {manifestoList.map((m) => (
              <div key={m.num} className="thorn-principle-card glass-panel">
                <div className="thorn-number">{m.num}</div>
                <h4 className="thorn-title font-serif">{m.title}</h4>
                <p className="thorn-desc">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 2: CONSTELACIÓN TÁCTIL (MAPEO CORPORAL SENSORIAL) */}
      {activeTabSection === 'constellation' && (
        <div className="aura-section-view animate-fade-in">
          <div className="constellation-intro">
            <h4 className="constellation-title font-serif">
              {language === 'de' ? 'Sinnliche Körper-Konstellation' : language === 'en' ? 'Sensory Body Constellation' : 'Constelación Sensorial del Cuerpo'}
            </h4>
            <p className="constellation-desc">
              {language === 'de' 
                ? 'Tippe auf die Punkte der Silhouette, um zu entdecken, welche Rhythmen und Berührungen dein Feuer entfachen.' 
                : language === 'en' 
                ? 'Touch each point on the silhouette to discover what caresses and rhythms ignite your fire.' 
                : 'Toca cada punto de la silueta para descubrir qué caricias y ritmos despiertan tu fuego o te funden de placer.'}
            </p>
          </div>

          <div className="constellation-canvas-card glass-panel">
            {/* Visual Silhouette with Interactive Touch Nodes */}
            <div className="body-silhouette-wrapper">
              {/* Artistic SVG Silhouette */}
              <svg viewBox="0 0 200 320" className="body-silhouette-svg">
                <defs>
                  <radialGradient id="silhouetteGlow" cx="50%" cy="40%" r="60%">
                    <stop offset="0%" stopColor="#D84A58" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#D84A58" stopOpacity="0" />
                  </radialGradient>
                </defs>
                <ellipse cx="100" cy="160" rx="70" ry="130" fill="url(#silhouetteGlow)" />
                {/* Silhouette curves */}
                <path 
                  d="M 100 45 C 112 45, 118 55, 118 68 C 118 80, 112 88, 107 92 C 125 98, 142 108, 148 135 C 152 155, 140 175, 134 195 C 128 215, 136 240, 132 270 C 130 285, 125 295, 115 295 C 105 295, 102 270, 100 245 C 98 270, 95 295, 85 295 C 75 295, 70 285, 68 270 C 64 240, 72 215, 66 195 C 60 175, 48 155, 52 135 C 58 108, 75 98, 93 92 C 88 88, 82 80, 82 68 C 82 55, 88 45, 100 45 Z" 
                  fill="rgba(255, 255, 255, 0.4)"
                  stroke="rgba(216, 74, 88, 0.4)"
                  strokeWidth="1.5"
                />
              </svg>

              {/* Touchpoint interactive buttons positioned on body */}
              {SENSORY_TOUCHPOINTS.map((tp) => {
                const isActive = selectedTouchpoint.id === tp.id;
                const tpLabel = tp.label[langKey] || tp.label.es;
                return (
                  <button
                    key={tp.id}
                    className={`touchpoint-node ${isActive ? 'active' : ''}`}
                    style={{ left: tp.cx, top: tp.cy }}
                    onClick={() => { playSoftTap(); setSelectedTouchpointId(tp.id); }}
                  >
                    <span className="node-glow-ring"></span>
                    <span className="node-center-dot"></span>
                    <span className="node-tooltip">{tpLabel}</span>
                  </button>
                );
              })}
            </div>

            {/* Selected Touchpoint Sensory Card */}
            <div className="touchpoint-detail-card glass-panel">
              <div className="tp-header">
                <span className="tp-badge">
                  {language === 'de' ? 'Heiliger Punkt' : language === 'en' ? 'Sacred Touchpoint' : 'Punto Sagrado'}
                </span>
                <h5 className="tp-name font-serif">{selectedTouchpoint.label}</h5>
              </div>
              <div className="tp-sensory-row">
                <span className="tp-lead font-serif">
                  {language === 'de' ? 'Die ideale Berührung:' : language === 'en' ? 'The Ideal Touch:' : 'La Caricia Ideal:'}
                </span>
                <p className="tp-body">{selectedTouchpoint.sensation}</p>
              </div>
              <div className="tp-trigger-box">
                <Sparkles size={13} color="#D84A58" />
                <span>{selectedTouchpoint.trigger}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: TAROT DEL PLACER (A SOLAS & EN PAREJA) */}
      {activeTabSection === 'tarot' && (
        <div className="aura-section-view animate-fade-in">
          {/* Tarot Mode Switcher */}
          <div className="tarot-mode-selector glass-panel">
            <button 
              className={`tarot-mode-btn ${tarotMode === 'solo' ? 'active' : ''}`}
              onClick={() => { playSoftTap(); setTarotMode('solo'); setIsCardFlipped(false); }}
            >
              <Heart size={14} />
              <span>{language === 'de' ? 'Für mich allein' : language === 'en' ? 'Solo Reflection' : 'Para mí a Solas'}</span>
            </button>
            <button 
              className={`tarot-mode-btn ${tarotMode === 'couple' ? 'active' : ''}`}
              onClick={() => { playSoftTap(); setTarotMode('couple'); setIsCardFlipped(false); }}
            >
              <MessageCircleHeart size={14} />
              <span>{language === 'de' ? 'Zu zweit (Marie & Daniel)' : language === 'en' ? 'Partners (Marie & Daniel)' : 'Cómplices (Marie & Daniel)'}</span>
            </button>
          </div>

          {/* Luxury Tarot Card with Flip Animation */}
          <div className="tarot-display-container">
            <div 
              className={`luxury-tarot-card ${isCardFlipped ? 'flipped' : ''}`}
              onClick={() => { playSoftTap(); setIsCardFlipped(!isCardFlipped); }}
            >
              <div className="tarot-front glass-panel">
                <div className="tarot-gold-border">
                  <div className="tarot-corner-mark top-left">✦</div>
                  <div className="tarot-corner-mark top-right">✦</div>
                  <div className="tarot-corner-mark btm-left">✦</div>
                  <div className="tarot-corner-mark btm-right">✦</div>

                  <div className="tarot-top-meta">
                    <span className="tarot-tag-pill">
                      {tarotMode === 'solo' 
                        ? (language === 'de' ? 'INTIM' : language === 'en' ? 'SOLO' : 'ÍNTIMO')
                        : (language === 'de' ? 'KOMPLIZEN' : language === 'en' ? 'PARTNERS' : 'CÓMPLICES')}
                    </span>
                    <span className="tarot-number">
                      {tarotMode === 'solo' ? `${(soloCardIndex % soloTarotList.length) + 1} / ${soloTarotList.length}` : `${(coupleCardIndex % coupleTarotList.length) + 1} / ${coupleTarotList.length}`}
                    </span>
                  </div>

                  <div className="tarot-rose-icon-wrap">
                    <img src={LOGO_04} alt="Rose Tarot" className="tarot-rose-emblem" />
                  </div>

                  <h4 className="tarot-card-title font-serif">{currentTarot.title}</h4>

                  <p className="tarot-card-text font-serif">
                    “{currentTarot.text}”
                  </p>

                  <div className="tarot-flip-hint">
                    <RotateCw size={13} />
                    <span>
                      {language === 'de' ? 'Tippen für Ritual / Komplizen-Spiel' : language === 'en' ? 'Tap to reveal ritual / game' : 'Toca para ver el ritual / juego cómplice'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Tarot Back (Ritual / Dare) */}
              <div className="tarot-back glass-panel">
                <div className="tarot-gold-border">
                  <span className="tarot-back-label">
                    {tarotMode === 'solo' 
                      ? (language === 'de' ? 'RITUAL FÜR DICH' : language === 'en' ? 'RITUAL FOR YOU' : 'RITUAL PARA TI')
                      : (language === 'de' ? 'SPIEL FÜR BEIDE' : language === 'en' ? 'GAME FOR BOTH' : 'JUEGO PARA LOS DOS')}
                  </span>
                  <p className="tarot-back-content font-serif">
                    {tarotMode === 'solo' ? currentTarot.ritual : currentTarot.dare}
                  </p>
                  <div className="tarot-flip-hint">
                    <RotateCw size={13} />
                    <span>
                      {language === 'de' ? 'Tippen, um die Karte umzudrehen' : language === 'en' ? 'Tap to flip back' : 'Toca para volver a la carta'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <button className="next-tarot-btn" onClick={handleNextTarot}>
              <Shuffle size={15} />
              <span>
                {language === 'de' ? 'Nächste Orakel-Karte' : language === 'en' ? 'Next Pleasure Card' : 'Siguiente Carta de Placer'}
              </span>
            </button>
          </div>
        </div>
      )}

      {/* SECTION 4: SANTUARIO ÍNTIMO (PROTEGIDO CON FACEID) */}
      {activeTabSection === 'sanctuary' && (
        <div className="aura-section-view animate-fade-in">
          {!isUnlocked ? (
            /* LOCKED STATE */
            <div className="sanctuary-locked-vault glass-panel">
              <div className="vault-lock-orb">
                <Lock size={32} color="#D84A58" />
              </div>
              <h3 className="vault-title font-serif">
                {language === 'de' ? 'Maries geheimes Refugium' : language === 'en' ? 'Marie’s Secret Sanctuary' : 'Santuario Secreto de Marie'}
              </h3>
              <p className="vault-subtitle">
                {language === 'de' 
                  ? 'Intimer, biometrisch geschützter Raum. Deine Wünsche, Fantasien und Sinnlichkeit gehören nur dir.' 
                  : language === 'en' 
                  ? 'Intimate sanctuary protected by biometrics. Your desires, fantasies, and pleasure belong only to you.' 
                  : 'Espacio íntimo protegido por biometría. Tus deseos, fantasías y mapa de placer solo los ves tú.'}
              </p>

              <div className="vault-actions-group">
                <button 
                  className={`vault-faceid-btn ${isScanning ? 'scanning' : ''}`}
                  onClick={handleSimulateFaceID}
                  disabled={isScanning}
                >
                  <ShieldCheck size={18} />
                  <span>
                    {isScanning 
                      ? (language === 'de' ? 'Liebevoll prüfen...' : language === 'en' ? 'Verifying with love...' : 'Verificando con amor...')
                      : (language === 'de' ? 'Mit FaceID entsperren' : language === 'en' ? 'Unlock with FaceID' : 'Desbloquear con FaceID')}
                  </span>
                </button>

                <button 
                  className="vault-pin-btn"
                  onClick={() => setShowPinPad(!showPinPad)}
                >
                  <KeyRound size={14} />
                  <span>
                    {showPinPad 
                      ? (language === 'de' ? 'PIN verbergen' : language === 'en' ? 'Hide PIN pad' : 'Ocultar código PIN')
                      : (language === 'de' ? 'Geheimcode nutzen (2211)' : language === 'en' ? 'Use secret PIN (2211)' : 'Usar código secreto (2211)')}
                  </span>
                </button>
              </div>

              {showPinPad && (
                <div className={`vault-pin-pad animate-fade-in ${pinError ? 'pin-error-shake' : ''}`}>
                  <div className="pin-indicators">
                    {[0, 1, 2, 3].map((i) => (
                      <span key={i} className={`pin-dot ${pinInput.length > i ? 'filled' : ''} ${pinError ? 'error' : ''}`} />
                    ))}
                  </div>
                  {pinError && (
                    <span className="pin-error-hint" style={{ fontSize: '11px', color: '#D84A58', textAlign: 'center', display: 'block', marginTop: '4px' }}>
                      {language === 'de' ? 'Falsche PIN (Hinweis: 2211)' : language === 'en' ? 'Incorrect PIN (Hint: 2211)' : 'PIN incorrecto (Pista: 2211)'}
                    </span>
                  )}
                  <div className="pin-key-grid">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 'C', 0, '✓'].map((keyVal) => (
                      <button
                        key={keyVal}
                        className="pin-key-btn"
                        onClick={() => {
                          if (keyVal === 'C') {
                            setPinInput('');
                            setPinError(false);
                          } else if (keyVal === '✓') {
                            if (pinInput === SANCTUARY_PIN) {
                              setIsUnlocked(true);
                              if (soundEnabled) playUnlockChime();
                              setPinInput('');
                              setShowPinPad(false);
                            } else {
                              setPinError(true);
                              setTimeout(() => {
                                setPinInput('');
                                setPinError(false);
                              }, 800);
                            }
                          } else handlePinSubmit(keyVal.toString());
                        }}
                      >
                        {keyVal}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* UNLOCKED VAULT */
            <div className="sanctuary-unlocked-vault animate-fade-in">
              <div className="vault-topbar">
                <div className="vault-status-indicator">
                  <Unlock size={14} color="#6E8C6E" />
                  <span>{language === 'de' ? 'Refugium geöffnet' : language === 'en' ? 'Sanctuary Open' : 'Santuario Abierto'}</span>
                </div>
                <button className="vault-lock-btn" onClick={() => setIsUnlocked(false)}>
                  <Lock size={13} />
                  <span>{language === 'de' ? 'Sperren' : language === 'en' ? 'Lock' : 'Cerrar'}</span>
                </button>
              </div>

              {/* Mapeo de Deseos Íntimos */}
              <div className="vault-desires-grid">
                {intimacyPrompts.map((prompt) => {
                  const activeOptions = selectedDesires[prompt.id] || [];
                  const activeCount = prompt.options.filter(opt => 
                    activeOptions.includes(opt.id) || activeOptions.includes(opt.label)
                  ).length;

                  return (
                    <div key={prompt.id} className="vault-prompt-card glass-panel">
                      <div className="vault-prompt-head">
                        <span className="prompt-cat font-serif">{prompt.category}</span>
                        <span className="prompt-count">
                          {language === 'de' ? `${activeCount} gewählt` : language === 'en' ? `${activeCount} chosen` : `${activeCount} elegidos`}
                        </span>
                      </div>
                      <div className="prompt-tags-wrap">
                        {prompt.options.map((opt) => {
                          const isSel = activeOptions.includes(opt.id) || activeOptions.includes(opt.label);
                          return (
                            <button
                              key={opt.id}
                              className={`prompt-opt-pill ${isSel ? 'selected' : ''}`}
                              onClick={() => {
                                playSoftTap();
                                const current = selectedDesires[prompt.id] || [];
                                const updated = isSel
                                  ? current.filter(o => o !== opt.id && o !== opt.label)
                                  : [...current.filter(o => o !== opt.label), opt.id];
                                const full = { ...selectedDesires, [prompt.id]: updated };
                                setSelectedDesires(full);
                                localStorage.setItem('marie_selected_desires', JSON.stringify(full));
                              }}
                            >
                              {isSel && <Check size={12} />}
                              <span>{opt.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Diario Confidencial */}
              <div className="vault-journal-box glass-panel">
                <div className="journal-header">
                  <div className="j-title">
                    <Feather size={14} color="#D84A58" />
                    <span className="font-serif">
                      {language === 'de' ? 'Vertrauliches Tagebuch' : language === 'en' ? 'Confidential Diary' : 'Diario Íntimo Confidencial'}
                    </span>
                  </div>
                  <span className="j-badge">
                    {language === 'de' ? 'Lokal verschlüsselt' : language === 'en' ? 'Locally Encrypted' : 'Encriptado local'}
                  </span>
                </div>
                <textarea
                  className="vault-textarea"
                  value={secretJournal}
                  onChange={(e) => setSecretJournal(e.target.value)}
                  placeholder={
                    language === 'de'
                      ? 'Fantasien, neue Empfindungen oder vertraute Erinnerungen... Dieser Raum ist unantastbar.'
                      : language === 'en'
                      ? 'Fantasies, new sensations, or intimate memories... This space is inviolable.'
                      : 'Fantasías, sensaciones nuevas, dudas o recuerdos cómplices... Este espacio es inviolable.'
                  }
                  rows={4}
                />
                <button 
                  className={`vault-save-btn ${isJournalSaved ? 'saved' : ''}`}
                  onClick={handleSaveJournal}
                >
                  {isJournalSaved ? (
                    <>
                      <Check size={15} />
                      <span>
                        {language === 'de' ? 'Sicher auf deinem Gerät gespeichert!' : language === 'en' ? 'Safely saved on your device!' : '¡Guardado bajo llave en tu dispositivo!'}
                      </span>
                    </>
                  ) : (
                    <>
                      <Lock size={14} />
                      <span>
                        {language === 'de' ? 'Vertrauliche Notizen speichern' : language === 'en' ? 'Save confidential notes' : 'Guardar notas confidenciales'}
                      </span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
