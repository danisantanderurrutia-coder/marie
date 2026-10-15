export const DAILY_CARDS = [
  {
    id: 1,
    date: 'Hoy',
    archetype: 'Esencia & Deseo',
    spark: 'Si nadie estuviera mirando y no tuvieras que complacer las expectativas de nadie, ¿qué ropa te pondrías hoy?',
    subtext: 'Permítete sentir qué textura o color resuena con tu energía de esta mañana.',
    category: 'Estilo',
    color: '#D4A373'
  },
  {
    id: 2,
    date: 'Ayer',
    archetype: 'Placer Cotidiano',
    spark: '¿Cuándo fue la última vez que sentiste que el tiempo se detenía haciendo algo puramente por gozo?',
    subtext: 'No productividad, no trabajo. Solo puro disfrute sensorial.',
    category: 'Curiosidad',
    color: '#CCD5AE'
  },
  {
    id: 3,
    date: 'Reflexión',
    archetype: 'El Cuerpo Sabio',
    spark: 'Cierra los ojos 10 segundos. ¿Qué parte de tu cuerpo te está pidiendo un mimo, una caricia o simplemente descanso?',
    subtext: 'Tu cuerpo es tu primer hogar, no un proyecto a reparar.',
    category: 'Intimidad',
    color: '#E0A96D'
  },
  {
    id: 4,
    date: 'Fuego Interno',
    archetype: 'Sueños Ocultos',
    spark: '¿Qué cualidad admiras secretamente en otras mujeres y que en el fondo es un deseo tuyo por despertar?',
    subtext: 'La admiración casi siempre es una pista de tu propio potencial.',
    category: 'Visión',
    color: '#B5838D'
  }
];

export const STYLE_ARCHETYPES = [
  {
    id: 'old-money',
    name: 'Elegancia Clásica & Atemporal',
    tagline: 'Líneas limpias, tejidos nobles y discreta sofisticación.',
    palette: ['#F5EBE0', '#D5BDAF', '#7D6B5D', '#2B2B2B'],
    paletteNames: ['Lino Crudo', 'Camel Suave', 'Cacao', 'Negro Humo'],
    textures: 'Cashmere, lino natural, seda, joyería dorada sutil.',
    vibe: 'Te hace sentir en paz, segura de ti misma, impecable y serena.',
    challenge: 'Pruébate un total look monocromático en tonos neutros hoy.',
    icon: 'Sparkles'
  },
  {
    id: 'boho-luxe',
    name: 'Bohemia Poética & Romántica',
    tagline: 'Texturas fluidas, movimiento, alma libre y calidez terrosa.',
    palette: ['#DDA15E', '#BC6C25', '#606C38', '#FEFAE0'],
    paletteNames: ['Terracota', 'Ámbar', 'Verde Salvia', 'Mantequilla'],
    textures: 'Encaje suave, algodón bordado, cueros suaves, terciopelo.',
    vibe: 'Te hace sentir magnética, misteriosa, conectada con la naturaleza y artística.',
    challenge: 'Añade una prenda holgada con caída y una joya con historia.',
    icon: 'Feather'
  },
  {
    id: 'minimal-warm',
    name: 'Minimalismo Cálido & Escandinavo',
    tagline: 'Comodidad escultural, formas puras y bienestar táctil.',
    palette: ['#E9ECEF', '#CED4DA', '#6C757D', '#E29578'],
    paletteNames: ['Piedra Caliza', 'Niebla', 'Gris Ceniza', 'Tonalidad Barro'],
    textures: 'Punto grueso, cortes estructurados pero suaves, calzado cómodo sofisticado.',
    vibe: 'Ligereza mental, orden estético, frescura y libertad de movimiento.',
    challenge: 'Elimina un accesorio antes de salir. Deja que tu postura sea el accesorio principal.',
    icon: 'Layers'
  },
  {
    id: 'edgy-chic',
    name: 'Sensualidad Magnética & Nocturna',
    tagline: 'Contrastes fuertes, cuero, transparencias discretas y presencia firme.',
    palette: ['#1A1A1A', '#4A0E17', '#E5E5E5', '#A3B18A'],
    paletteNames: ['Azabache', 'Vino Tinto Intenso', 'Plata Pulida', 'Verde Olivo'],
    textures: 'Cuero suave, transparencias sugerentes, satén, botas con carácter.',
    vibe: 'Empoderada, seductora, dueña de tu espacio y con un magnetismo electrizante.',
    challenge: 'Atrévete hoy con un labial que normalmente reserves "solo para ocasiones especiales".',
    icon: 'Flame'
  }
];

export const MICRO_HOBBIES = [
  {
    id: 'botanical-watercolor',
    title: 'Acuarela Botánica Intuitiva',
    time: '15 min',
    difficulty: 'Fácil & Libre',
    sensoryTag: 'Visual & Calma',
    description: 'Pinta las hojas de una planta que tengas cerca solo dejando fluir el agua y dos tonos de verde. Sin buscar perfección.',
    steps: ['Toma una hoja de papel grueso y un pincel mojado', 'Pon una gota de pintura y observa cómo se expande con el agua', 'Respira despacio mientras el pigmento se asienta'],
    whyYouWillLoveIt: 'Desconecta el hemisferio analítico y te devuelve al tacto sensorial.'
  },
  {
    id: 'candle-tea-ritual',
    title: 'Cata Ciega de Infusión Floral',
    time: '10 min',
    difficulty: 'Sensorial Puro',
    sensoryTag: 'Gusto & Olfato',
    description: 'Prepara un té o infusión (manzanilla, jazmín o menta). Bebe los primeros tres sorbos con los ojos completamente cerrados.',
    steps: ['Siente el vapor tibio en tus párpados', 'Identifica 3 notas aromáticas antes de tragar', 'Observa cómo reacciona tu pecho al calor'],
    whyYouWillLoveIt: 'Una pausa sagrada que le devuelve el ritmo a tu sistema nervioso.'
  },
  {
    id: 'collage-poetry',
    title: 'Poesía Blackout & Collage',
    time: '20 min',
    difficulty: 'Lúdico & Creativo',
    sensoryTag: 'Expresión Libre',
    description: 'Toma una página de una revista vieja o libro usado. Tacha todas las palabras con un rotulador excepto 7 que te llamen la atención.',
    steps: ['Escanea la página sin leerla de corrido', 'Encierra en un círculo palabras que te suenen bonitas', 'Crea tu mini poema secreto'],
    whyYouWillLoveIt: 'Descubres qué mensajes guarda tu subconsciente hoy.'
  },
  {
    id: 'clay-sculpt',
    title: 'Modelado en Barro o Arcilla',
    time: '25 min',
    difficulty: 'Táctil',
    sensoryTag: 'Tierra & Enraizamiento',
    description: 'Crea un pequeño platillo joyero o una forma abstracta que quepa en la palma de tu mano.',
    steps: ['Amasa la pasta sintiendo su temperatura', 'Dale forma curva con las yemas de tus pulgares', 'Graba con un palillo una inicial o símbolo que te inspire'],
    whyYouWillLoveIt: 'Estar en contacto con la materia física despeja cualquier nube mental.'
  },
  {
    id: 'somatic-stretching',
    title: 'Movimiento Somático en Penumbra',
    time: '12 min',
    difficulty: 'Fluido',
    sensoryTag: 'Corporal & Sensual',
    description: 'Con solo una vela encendida y tu música favorita a bajo volumen, estira tu cuerpo como lo haría una gata al despertar.',
    steps: ['Sin posturas rígidas de yoga; solo lo que te pida la espalda', 'Suelta la mandíbula y el cuello', 'Disfruta la sensación de habitar tu propia piel'],
    whyYouWillLoveIt: 'Reconecta inmediatamente con tu sensualidad innata y tu fluidez.'
  }
];

export const INTIMACY_PROMPTS = [
  {
    id: 'desire-map',
    category: 'Mapeo del Deseo',
    prompt: '¿Qué tipo de caricias despiertan más tu curiosidad últimamente?',
    options: [
      'Caricias lentas, casi imperceptibles con la yema de los dedos',
      'Masaje firme con aceite tibio en espalda y hombros',
      'Contacto visual prolongado y respiración sincronizada',
      'Juegos de temperatura (calor, frío, texturas de seda)'
    ],
    note: 'El placer empieza en la anticipación y la seguridad emocional.'
  },
  {
    id: 'sensual-awakening',
    category: 'Sensualidad Personal',
    prompt: 'Un ritual de autocuidado que te gustaría regalarte este fin de semana:',
    options: [
      'Baño de inmersión con sales de lavanda, velas y sin móvil',
      'Dormir con sábanas recién lavadas y crema perfumada',
      'Vestirme con lencería hermosa un día cualquiera solo para mí',
      'Comprar mi flor favorita y ponerla en mi mesilla de noche'
    ],
    note: 'Tu sensualidad te pertenece primero a ti.'
  },
  {
    id: 'open-communication',
    category: 'Espacio Compartido',
    prompt: '¿Hay alguna fantasía o curiosidad sutil que aún no hayas verbalizado pero te dé cosquillas imaginar?',
    subtext: 'Puedes escribirlo aquí con total privacidad. Tú decides si algún día quieres leerlo en voz alta o guardarlo como tu joya secreta.',
    isJournal: true
  }
];

export const SOLO_DATES = [
  {
    title: 'Tarde de librería & Café Secreto',
    desc: 'Ve sola a una librería con encanto. Elige un libro solo por la textura de su portada y léete los primeros dos capítulos con tu bebida favorita.',
    budget: 'Bajo',
    vibe: 'Poético'
  },
  {
    title: 'Visita Solitaria a un Museo o Galería',
    desc: 'Ponte tus auriculares con una playlist de piano suave. Camina despacio sin prisa por verlo todo; quédate 15 minutos ante un solo cuadro.',
    budget: 'Medio',
    vibe: 'Inspirador'
  },
  {
    title: 'Noche de Cine en Cama & Delicatessen',
    desc: 'Compra esa fruta o chocolate que casi nunca compras. Apaga luces, ponte tu bata más suave y mira una película que solo a ti te apetezca.',
    budget: 'Bajo',
    vibe: 'Placentero'
  }
];
