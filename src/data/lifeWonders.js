// src/data/lifeWonders.js
// Las 26 Maravillas de la Vida / 26 Wunder des Lebens / 26 Life Wonders
// Hitos, experiencias trascendentes y serendipias extraordinarias para Marie

export const LIFE_WONDERS_CATEGORIES = {
  all: {
    id: "all",
    icon: "🎁",
    es: "Todas (26)",
    de: "Alle Wunder (26)",
    en: "All Wonders (26)"
  },
  maternity_bonds: {
    id: "maternity_bonds",
    icon: "👶",
    badge: "👶 Maternidad & Amor",
    badgeDe: "👶 Mutterschaft & Liebe",
    badgeEn: "👶 Maternity & Bonds",
    es: "Maternidad & Amor",
    de: "Mutterschaft & Liebe",
    en: "Maternity & Bonds",
    color: "#E07A5F"
  },
  material_sanctuaries: {
    id: "material_sanctuaries",
    icon: "💎",
    badge: "💎 Hitos Materiales",
    badgeDe: "💎 Materielle Meilensteine",
    badgeEn: "💎 Material Milestones",
    es: "Hitos Materiales",
    de: "Materielle Meilensteine",
    en: "Material Milestones",
    color: "#DDA15E"
  },
  travel_nature: {
    id: "travel_nature",
    icon: "🌍",
    badge: "🌍 Viajes & Asombro",
    badgeDe: "🌍 Reisen & Staunen",
    badgeEn: "🌍 Travel & Wonder",
    es: "Viajes & Asombro",
    de: "Reisen & Staunen",
    en: "Travel & Wonder",
    color: "#588157"
  },
  euphoric_news: {
    id: "euphoric_news",
    icon: "💌",
    badge: "💌 Noticias Eufóricas",
    badgeDe: "💌 Euphorische Wendepunkte",
    badgeEn: "💌 Euphoric News",
    es: "Noticias Eufóricas",
    de: "Euphorische Wendepunkte",
    en: "Euphoric News",
    color: "#B5838D"
  },
  serendipity_soul: {
    id: "serendipity_soul",
    icon: "✨",
    badge: "✨ Serendipias & Alma",
    badgeDe: "✨ Serendipität & Erkenntnis",
    badgeEn: "✨ Serendipity & Soul",
    es: "Serendipias & Alma",
    de: "Serendipität & Erkenntnis",
    en: "Serendipity & Soul",
    color: "#9A8C98"
  }
};

export const WONDER_CATEGORIES = Object.values(LIFE_WONDERS_CATEGORIES);

export const INITIAL_LIFE_WONDERS = [
  // A. Trascendencia, Vínculos & Maternidad (5)
  {
    id: "wonder-1",
    num: "01",
    category: "maternity_bonds",
    es: {
      title: "El milagro de ser madre (hijo o hija)",
      subtitle: "El peso sagrado del amor infinito",
      desc: "Sostener por primera vez contra el pecho a un ser de tu propia carne y sangre, sintiendo el peso infinito del amor incondicional y comprendiendo el misterio de la vida."
    },
    de: {
      title: "Das Wunder, Mutter zu werden (Sohn oder Tochter)",
      subtitle: "Die heilige Last unendlicher Liebe",
      desc: "Zum ersten Mal ein Wesen aus eigenem Fleisch und Blut an die Brust drücken, das unendliche Gewicht bedingungsloser Liebe spüren und das Mysterium des Lebens begreifen."
    },
    en: {
      title: "The Miracle of Motherhood (Son or Daughter)",
      subtitle: "The sacred weight of unconditional love",
      desc: "Holding for the first time against your chest a being of your own flesh and blood, feeling the infinite weight of unconditional love and awakening to the sacred mystery of life."
    },
    status: "dream", // 'dream' | 'in_progress' | 'lived'
    personalNote: "",
    favorite: true
  },
  {
    id: "wonder-2",
    num: "02",
    category: "maternity_bonds",
    es: {
      title: "Reconocer a tu alma gemela en silencio",
      subtitle: "Mirarse antes del tiempo",
      desc: "Cruzar la mirada con alguien y saber, sin palabras ni dudas, que ambos se reconocieron desde antes del tiempo. Una certeza tranquila que aquieta todo el cuerpo."
    },
    de: {
      title: "Deine Seelenverwandtschaft im Schweigen erkennen",
      subtitle: "Ein Wiedersehen vor aller Zeit",
      desc: "Den Blick mit jemandem kreuzen und ohne Worte oder Zweifel wissen, dass ihr euch schon vor aller Zeit erkannt habt. Eine stille Gewissheit, die dein ganzes Sein beruhigt."
    },
    en: {
      title: "Recognizing Your Soulmate in Silence",
      subtitle: "Remembering before time began",
      desc: "Crossing eyes with someone and knowing, without words or hesitation, that you recognized each other long before time began. A quiet certainty that settles your entire being."
    },
    status: "dream",
    personalNote: "",
    favorite: false
  },
  {
    id: "wonder-3",
    num: "03",
    category: "maternity_bonds",
    es: {
      title: "El perdón total hacia tus raíces",
      subtitle: "Mirar con ternura y soltar el peso",
      desc: "Mirar a tus padres no como figuras de autoridad, sino como seres humanos vulnerables que hicieron lo que pudieron, liberándolos de todo rencor y sintiéndote soberanamente libre."
    },
    de: {
      title: "Vollständige Versöhnung mit deinen Wurzeln",
      subtitle: "Mit Sanftmut blicken und Lasten lösen",
      desc: "Deine Eltern nicht mehr als unfehlbare Autoritäten sehen, sondern als verletzliche Menschen, die taten, was sie konnten. Sie von jedem Groll befreien und dich vollkommen frei fühlen."
    },
    en: {
      title: "Total Forgiveness Toward Your Roots",
      subtitle: "Seeing with tenderness and letting go",
      desc: "Looking at your parents not as authority figures, but as vulnerable human beings who did the best they could, releasing every resentment and stepping into true sovereign freedom."
    },
    status: "dream",
    personalNote: "",
    favorite: false
  },
  {
    id: "wonder-4",
    num: "04",
    category: "maternity_bonds",
    es: {
      title: "Una amistad de más de tres décadas intacta",
      subtitle: "La risa que desafía al tiempo",
      desc: "Sentarte a los 50 o 60 años con una amiga del alma y reír de las mismas tonterías que a los quince, sabiendo que la distancia y los años jamás pudieron tocar el pacto sagrado."
    },
    de: {
      title: "Eine über drei Jahrzehnte intakte Seelenfreundschaft",
      subtitle: "Lachen, das der Zeit trotzt",
      desc: "Mit 50 oder 60 Jahren mit deiner Herzensfreundin beisammensitzen und über dieselben Albernheiten lachen wie mit fünfzehn, im Wissen, dass die Zeit euren heiligen Bund niemals berühren konnte."
    },
    en: {
      title: "A Friendship Intact for Over Three Decades",
      subtitle: "Laughter that defies time",
      desc: "Sitting in your 50s or 60s with a soul friend and laughing at the exact same silly jokes as when you were fifteen, knowing time and distance could never erode your sacred pact."
    },
    status: "dream",
    personalNote: "",
    favorite: false
  },
  {
    id: "wonder-5",
    num: "05",
    category: "maternity_bonds",
    es: {
      title: "Ver a alguien que amas cumplir su mayor sueño",
      subtitle: "Tu apoyo silencioso hecho victoria",
      desc: "La dicha pura de aplaudir en primera fila sin una sola pizca de envidia, sabiendo que tu fe y tu mano discreta fueron el viento que impulsó sus alas hacia el cielo."
    },
    de: {
      title: "Jemanden, den du liebst, seinen größten Traum erfüllen sehen",
      subtitle: "Deine stille Kraft wird zum Triumph",
      desc: "Das pure Glück, in der ersten Reihe ohne einen Hauch von Neid zu applaudieren, im Wissen, dass dein unerschütterlicher Glaube der Wind war, der seine Flügel trug."
    },
    en: {
      title: "Watching Someone You Love Achieve Their Greatest Dream",
      subtitle: "Your silent devotion crowned with joy",
      desc: "The pure joy of applauding from the front row with not a trace of envy, knowing your unwavering faith and discreet hand were the wind beneath their soaring wings."
    },
    status: "dream",
    personalNote: "",
    favorite: false
  },

  // B. Hitos Materiales & Espacios Sagrados (5)
  {
    id: "wonder-6",
    num: "06",
    category: "material_sanctuaries",
    es: {
      title: "Las llaves de tu hogar soñado bañado de luz",
      subtitle: "Pisar descalza tu propio reino",
      desc: "Entrar descalza por primera vez a una casa o apartamento propio, con ventanales hacia el verde o el mar, sabiendo que cada rincón fue creado por tu propio esfuerzo, elegancia y gusto."
    },
    de: {
      title: "Die Schlüssel zu deinem lichtdurchfluteten Traumzuhause",
      subtitle: "Barfuß dein eigenes Reich betreten",
      desc: "Zum ersten Mal barfuß ein eigenes Haus oder Apartment betreten, mit bodentiefen Fenstern zum Meer oder ins Grüne, im Wissen, dass jeder Winkel deiner eigenen Eleganz und Schöpferkraft entsprungen ist."
    },
    en: {
      title: "The Keys to Your Sunlit Dream Home",
      subtitle: "Walking barefoot into your sovereign haven",
      desc: "Stepping barefoot for the first time into your own house or apartment, with sun-drenched windows opening onto greenery or ocean, knowing every inch was crafted by your own perseverance and taste."
    },
    status: "dream",
    personalNote: "",
    favorite: true
  },
  {
    id: "wonder-7",
    num: "07",
    category: "material_sanctuaries",
    es: {
      title: "Adquirir una joya o reliquia con historia propia",
      subtitle: "Soberanía tallada en oro o piedras",
      desc: "Colocarte una pieza de alta joyería (o un reloj atemporal) comprada 100% por ti para celebrar tu soberanía, destinada a contar tu historia y pasar de generación en generación."
    },
    de: {
      title: "Ein Schmuckstück oder Erbstück mit eigener Geschichte erwerben",
      subtitle: "In Gold und Steine gefasste Souveränität",
      desc: "Ein Haute-Joaillerie-Schmuckstück oder eine zeitlose Uhr anlegen, zu 100 % von dir selbst erworben, um deine Unabhängigkeit zu feiern und als legendäres Erbstück weitergegeben zu werden."
    },
    en: {
      title: "Acquiring a Fine Heirloom Jewel of Your Own Making",
      subtitle: "Sovereignty cast in timeless gold",
      desc: "Clasping on a fine jewelry piece or heirloom timepiece bought 100% by yourself to celebrate your independence, destined to narrate your legacy across generations."
    },
    status: "dream",
    personalNote: "",
    favorite: false
  },
  {
    id: "wonder-8",
    num: "08",
    category: "material_sanctuaries",
    es: {
      title: "Tu propio estudio, taller o biblioteca privada",
      subtitle: "El santuario de tu mente",
      desc: "Un santuario físico cerrado con tu butaca de terciopelo, estantes hasta el techo y silencio absoluto para crear, escribir, leer o simplemente respirar sin interrupciones."
    },
    de: {
      title: "Dein eigenes privates Atelier oder Bibliothek",
      subtitle: "Das stille Refugium deiner Gedanken",
      desc: "Ein geschlossenes, physisches Heiligtum mit Samtsessel, raumhohen Bücherwänden und vollkommener Stille, um ungestört zu kreieren, zu schreiben oder einfach tief durchzuatmen."
    },
    en: {
      title: "Your Own Private Studio, Atelier or Library",
      subtitle: "The intimate sanctuary of your mind",
      desc: "A closed personal sanctuary with your plush velvet chair, floor-to-ceiling bookshelves, and absolute quiet to create, write, read, or simply breathe undisturbed."
    },
    status: "dream",
    personalNote: "",
    favorite: false
  },
  {
    id: "wonder-9",
    num: "09",
    category: "material_sanctuaries",
    es: {
      title: "Conducir un coche descapotable clásico junto al mar",
      subtitle: "Sal, sol y libertad sin rumbo",
      desc: "Sentir el sol de media tarde y el aire salino en la piel mientras manejas por una carretera costera sin destino fijo ni prisa alguna, con tu música favorita sonando al viento."
    },
    de: {
      title: "Ein klassisches Cabriolet am Meer entlangfahren",
      subtitle: "Salz, Sonne und ziellose Freiheit",
      desc: "Die warme Nachmittagssonne und die salzige Brise auf deiner Haut spüren, während du ohne Eile an einer Panoramaküstenstraße entlanggleitest und deine Lieblingsmusik im Fahrtwind weht."
    },
    en: {
      title: "Driving a Classic Convertible Along the Coastline",
      subtitle: "Salt spray, golden sun, and unhurried freedom",
      desc: "Feeling the late afternoon sun and crisp sea salt on your skin as you glide along a coastal cliff road with nowhere you need to be, soundtracked only by your heart and favorite melodies."
    },
    status: "dream",
    personalNote: "",
    favorite: false
  },
  {
    id: "wonder-10",
    num: "10",
    category: "material_sanctuaries",
    es: {
      title: "Tener una bodega o despensa gourmet de ensueño",
      subtitle: "El arte de agasajar con exquisitez",
      desc: "Abrir las puertas de una alacena o cava con vinos selectos, vajilla de porcelana fina y delicias artesanales listas para improvisar veladas mágicas y cenas inolvidables."
    },
    de: {
      title: "Eine Gourmet-Speisekammer oder Weinkeller der Träume",
      subtitle: "Die Kunst erlesener Gastfreundschaft",
      desc: "Die Schranktüren zu feinsten Jahrgangsweinen, zartem Porzellan und handwerklichen Köstlichkeiten öffnen, jederzeit bereit für spontane Festmähler und magische Abende."
    },
    en: {
      title: "Curating a Dream Wine Cellar or Gourmet Pantry",
      subtitle: "The art of effortless, exquisite hospitality",
      desc: "Opening the doors to an artisanal cellar and pantry stocked with rare wines, delicate porcelain, and gourmet provisions, ready at a moment's notice for magical gatherings."
    },
    status: "dream",
    personalNote: "",
    favorite: false
  },

  // C. Viajes Trascendentes & Maravillas Naturales (6)
  {
    id: "wonder-11",
    num: "11",
    category: "travel_nature",
    es: {
      title: "Bañarse de noche en un mar de bioluminiscencia",
      subtitle: "Nadar entre constelaciones marinas",
      desc: "Nadar en aguas cálidas y oscuras donde cada movimiento de tus manos enciende una estela azul eléctrica bajo un cielo cuajado de estrellas. Sentirte una criatura de pura luz."
    },
    de: {
      title: "Nachts in einem biolumineszierenden Meer schwimmen",
      subtitle: "Eintauchen in flüssige Sternbilder",
      desc: "In samtig dunklem Wasser schwimmen, wo jede Berührung deiner Hände einen elektrisch-blauen Lichtschweif entfacht, während über dir die Milchstraße funkelt."
    },
    en: {
      title: "Bathing at Night in a Bioluminescent Ocean",
      subtitle: "Swimming among liquid constellations",
      desc: "Gliding into warm, midnight waters where every sweep of your hand sparks an electric-blue shimmer beneath a sky blanketed with glittering stars. Pure starlight made tangible."
    },
    status: "dream",
    personalNote: "",
    favorite: true
  },
  {
    id: "wonder-12",
    num: "12",
    category: "travel_nature",
    es: {
      title: "El silencio ensordecedor de una cumbre nevada o desierto",
      subtitle: "Escuchar el latido de la Tierra",
      desc: "Estar en un lugar tan vasto, puro y solitario que puedes escuchar con claridad el latido de tu propio corazón y la respiración majestuosa y antigua del planeta."
    },
    de: {
      title: "Die ohrenbetäubende Stille eines schneebedeckten Gipfels",
      subtitle: "Den Herzschlag der Erde belauschen",
      desc: "An einem so unberührten, weiten und einsamen Ort verweilen, dass du das Pochen deines eigenen Herzens und den erhabenen, uralten Atem unseres Planeten vernehmen kannst."
    },
    en: {
      title: "The Deafening Silence of a Snow Peak or Desert",
      subtitle: "Listening to the heartbeat of the Earth",
      desc: "Standing in a space so vast, solitary, and pristine that you can hear the clear rhythmic pulse of your own heart and the ancient, serene breath of the planet."
    },
    status: "dream",
    personalNote: "",
    favorite: false
  },
  {
    id: "wonder-13",
    num: "13",
    category: "travel_nature",
    es: {
      title: "Vivir una temporada en una ciudad extranjera como una local",
      subtitle: "Despertar en París, Kioto o Florencia",
      desc: "Alquilar un piso durante varios meses, comprar flores y pan en la esquina, memorizar los callejones adoquinados y perderte con deleite en los matices de un idioma ajeno."
    },
    de: {
      title: "Eine Zeit lang in einer fremden Stadt wie eine Einheimische leben",
      subtitle: "Erwachen in Paris, Kyoto oder Florenz",
      desc: "Für Monate ein charmantes Apartment mieten, morgens frisches Brot und Blumen an der Ecke kaufen, gepflasterte Gassen erkunden und dich im Rhythmus einer neuen Sprache verlieren."
    },
    en: {
      title: "Living for a Season in a Foreign City as a Local",
      subtitle: "Awakening in Paris, Kyoto, or Florence",
      desc: "Settling into a light-filled flat for a few months, buying flowers and warm bread around the corner, befriending quiet alleyways, and dissolving into the romance of another tongue."
    },
    status: "dream",
    personalNote: "",
    favorite: false
  },
  {
    id: "wonder-14",
    num: "14",
    category: "travel_nature",
    es: {
      title: "Ver auroras boreales danzando en el cielo ártico",
      subtitle: "Cortinas de esmeralda y violeta",
      desc: "Presenciar velos de luz verde y magenta ondulando silenciosamente sobre tu cabeza en la noche polar, sintiendo que el cosmos te susurra una historia milenaria."
    },
    de: {
      title: "Nordlichter am arktischen Himmel tanzen sehen",
      subtitle: "Smaragd- und Magentafarbenes Himmelsgewebe",
      desc: "Schleier aus smaragdgrünem und violettem Licht lautlos über dir tanzen sehen, während die eisige Polarnacht den Eindruck erweckt, als lausche man dem Ursprung der Welt."
    },
    en: {
      title: "Watching the Northern Lights Dance Across the Arctic Sky",
      subtitle: "Emerald and violet veils in the polar night",
      desc: "Watching ribbons of vibrant emerald and violet aurora drift silently overhead in the crisp Arctic air, feeling directly cradled by the cosmic mysteries of the universe."
    },
    status: "dream",
    personalNote: "",
    favorite: false
  },
  {
    id: "wonder-15",
    num: "15",
    category: "travel_nature",
    es: {
      title: "Un viaje espontáneo sin maleta ni plan",
      subtitle: "El destino que elige tu mirada",
      desc: "Llegar a la estación o al aeropuerto sin billete reservado, mirar el tablero de salidas, elegir la ciudad cuyo nombre te haga vibrar y subirte a bordo en menos de una hora."
    },
    de: {
      title: "Eine spontane Reise ohne Koffer oder Plan",
      subtitle: "Wohin der Blick im Flugplan fällt",
      desc: "Ohne Ticket am Bahnhof oder Flughafen eintreffen, auf die Abfahrtstafel blicken, das Ziel wählen, das dein Herz höher schlagen lässt, und einfach einsteigen."
    },
    en: {
      title: "A Spontaneous Journey with No Luggage or Plan",
      subtitle: "Boarding wherever your intuition points",
      desc: "Arriving at the station or airport with empty pockets and no itinerary, scanning the departure boards, picking the destination that ignites your curiosity, and stepping aboard."
    },
    status: "dream",
    personalNote: "",
    favorite: false
  },
  {
    id: "wonder-16",
    num: "16",
    category: "travel_nature",
    es: {
      title: "Navegar en un velero en medio del océano abierto",
      subtitle: "Viento puro y delfines al atardecer",
      desc: "Sentir la potencia del viento henchir las velas sin ruido de motores, con la proa cortando olas cobrizas mientras una familia de delfines salta en el horizonte dorado."
    },
    de: {
      title: "Auf einem Segelboot mitten auf dem offenen Ozean gleiten",
      subtitle: "Reiner Wind und Delfine im Abendrot",
      desc: "Die ungebändigte Kraft des Windes spüren, wie sie die Segel füllt – ganz ohne Motorlärm –, während Delfine im goldenen Schein der sinkenden Sonne neben dem Bug auftauchen."
    },
    en: {
      title: "Sailing on Open Ocean Under Pure Wind Power",
      subtitle: "Silent sails and dolphins leaping at dusk",
      desc: "Feeling the silent rush of wind filling the sails with no engine hum, cutting through deep blue swells while dolphins arc gracefully across a glowing golden horizon."
    },
    status: "dream",
    personalNote: "",
    favorite: false
  },

  // D. Noticias Eufóricas & Giros del Destino (5)
  {
    id: "wonder-17",
    num: "17",
    category: "euphoric_news",
    es: {
      title: "La llamada: 'El proyecto / puesto / sueño es tuyo'",
      subtitle: "El teléfono que cambia tu destino",
      desc: "Descolgar el teléfono tras meses de esfuerzo e incertidumbre y escuchar la voz firme al otro lado premiando tu genio con las palabras exactas que siempre soñaste."
    },
    de: {
      title: "Der ersehnte Anruf: 'Das Projekt / der Traum gehört dir'",
      subtitle: "Die Stimme, die dein Leben wendet",
      desc: "Nach Monaten hingebungsvoller Vorbereitung abheben und die Worte hören, die deine Brillanz belohnen und eine völlig neue Ära des Erfolgs für dich einläuten."
    },
    en: {
      title: "The Call: 'The Project / Role / Dream is Yours'",
      subtitle: "The voice that crowns your devotion",
      desc: "Answering the phone after months of quiet discipline and tension to hear the resounding confirmation that crowns your craft and opens the grandest door of your career."
    },
    status: "dream",
    personalNote: "",
    favorite: true
  },
  {
    id: "wonder-18",
    num: "18",
    category: "euphoric_news",
    es: {
      title: "Un veredicto de salud radiante / Milagro médico",
      subtitle: "El alma vuelve a respirar en paz",
      desc: "Escuchar al médico pronunciar: 'Todo está limpio, perfecto y sano'. Sentir una lágrima tibia rodar por tu mejilla y un alivio celular que te devuelve la vida entera."
    },
    de: {
      title: "Ein strahlender Gesundheitsbefund / Medizinisches Wunder",
      subtitle: "Die Seele atmet wieder frei auf",
      desc: "Vom Arzt die erlösenden Worte hören: „Alles ist vollkommen rein, gesund und unversehrt.“ Spüren, wie eine Welle zellulärer Erleichterung deinen gesamten Körper durchströmt."
    },
    en: {
      title: "A Radiant Health Verdict / Medical Miracle",
      subtitle: "Your whole soul exhales in peace",
      desc: "Hearing the doctor declare: 'Everything is clear, sound, and completely healthy.' Feeling a warm tear of pure relief and a physical sense of rebirth in every single cell."
    },
    status: "dream",
    personalNote: "",
    favorite: false
  },
  {
    id: "wonder-19",
    num: "19",
    category: "euphoric_news",
    es: {
      title: "Paz financiera absoluta y libertad de tiempo",
      subtitle: "El dinero como instrumento de soberanía",
      desc: "El día en que abres tus cuentas y comprendes con serena certeza que el dinero nunca más será una angustia, sino un puente generoso hacia tu total libertad creativa y vital."
    },
    de: {
      title: "Vollkommener finanzieller Frieden & Zeitsouveränität",
      subtitle: "Wohlstand als Schlüssel der Unabhängigkeit",
      desc: "Der Tag, an dem du deine Konten öffnest und mit erhabener Ruhe begreifst: Geld ist nie wieder eine Sorge, sondern ein treues Werkzeug für deine absolute Zeitfreiheit."
    },
    en: {
      title: "Absolute Financial Peace & Sovereign Time",
      subtitle: "Wealth as the instrument of total freedom",
      desc: "The day you look at your balance sheet and realize with calm, unshakeable confidence that money is no longer a worry, but a noble guardian of your time, choices, and dreams."
    },
    status: "dream",
    personalNote: "",
    favorite: false
  },
  {
    id: "wonder-20",
    num: "20",
    category: "euphoric_news",
    es: {
      title: "Un mensaje inesperado: 'Cambiaste mi vida para siempre'",
      subtitle: "La huella invisible de tu bondad",
      desc: "Leer las palabras sinceras de alguien diciéndote: 'Sin ti y sin tu ejemplo en aquel momento, hoy no sería la persona que soy'. Descubrir el alcance sagrado de tu paso por el mundo."
    },
    de: {
      title: "Ein unerwarteter Brief: 'Du hast mein Leben verwandelt'",
      subtitle: "Die unsichtbare Spur deiner Güte",
      desc: "Einen zutiefst aufrichtigen Brief erhalten mit den Worten: „Ohne dich und dein Vorbild wäre ich heute nicht die Frau, die ich bin.“ Die erhabene Wirkung deines Seins begreifen."
    },
    en: {
      title: "An Unexpected Letter: 'You Changed My Life Forever'",
      subtitle: "The luminous imprint of your presence",
      desc: "Reading heartfelt words from someone saying: 'Without you and your grace during that chapter, I would never be who I am today.' Experiencing the sacred ripples of your kindness."
    },
    status: "dream",
    personalNote: "",
    favorite: false
  },
  {
    id: "wonder-21",
    num: "21",
    category: "euphoric_news",
    es: {
      title: "Aparecer en una obra o publicación que admirabas de niña",
      subtitle: "Tu nombre grabado donde soñabas",
      desc: "Verte retratada, citada o celebrada en una revista, libro o galería de arte que leías con devoción en tu infancia, sabiendo que la niña que fuiste sonríe maravillada."
    },
    de: {
      title: "In einem Werk verewigt sein, das du als Mädchen verehrtest",
      subtitle: "Dein Name dort, wo deine Kindheitsträume wohnten",
      desc: "Dich porträtiert, zitiert oder gewürdigt sehen in einer Publikation oder Kunstausstellung, die du als kleines Mädchen ehrfürchtig bestaunt hast. Ein Triumph für dein inneres Kind."
    },
    en: {
      title: "Featured in an Artwork or Publication You Revered as a Girl",
      subtitle: "Your name enshrined where your childhood dreamt",
      desc: "Seeing your essence celebrated in the prestigious journal, gallery, or literary work you gazed at in awe as a young girl, knowing your inner child is beaming with pride."
    },
    status: "dream",
    personalNote: "",
    favorite: false
  },

  // E. Serendipias, Aventuras & Revelaciones del Alma (5)
  {
    id: "wonder-22",
    num: "22",
    category: "serendipity_soul",
    es: {
      title: "Cena bajo farolillos con desconocidos que se vuelven íntimos",
      subtitle: "Vino, risas y almas desnudas hasta el alba",
      desc: "Terminar compartiendo vino, risas y secretos hasta las cuatro de la madrugada en un jardín escondido con personas que acabas de conocer, sintiendo que son familia de otra vida."
    },
    de: {
      title: "Ein Fest unter Lampions mit Fremden, die zu Vertrauten werden",
      subtitle: "Wein, Lachen und Seelen bis zum Morgengrauen",
      desc: "In einem verwunschenen Innenhof bis vier Uhr morgens Wein und tiefste Geheimnisse mit Menschen teilen, die du vor Stunden noch nicht kanntest, und spüren, wie die Seelen verschmelzen."
    },
    en: {
      title: "Dinner Under Fairy Lights with Strangers Who Become Kin",
      subtitle: "Wine, laughter, and open hearts until dawn",
      desc: "Finding yourself in a secret lantern-lit garden sharing fine vintage, unguarded laughter, and confessions until 4 AM with souls met that evening, feeling instantly like ancient kin."
    },
    status: "dream",
    personalNote: "",
    favorite: false
  },
  {
    id: "wonder-23",
    num: "23",
    category: "serendipity_soul",
    es: {
      title: "El instante de lucidez: libre de la aprobación ajena",
      subtitle: "La ligereza sublime de ser tú misma",
      desc: "Caminar por una avenida concurrida y sentir una repentina oleada física de paz absoluta al comprender que el juicio de los demás ya no tiene el más mínimo poder sobre ti."
    },
    de: {
      title: "Der Moment klarer Befreiung von jeglicher Bestätigung",
      subtitle: "Die erhabene Leichtigkeit reiner Selbsttreue",
      desc: "Über einen belebten Boulevard spazieren und eine plötzliche, tiefe Welle der Erleichterung spüren: Die Meinungen anderer haben jede Macht über deinen Seelenfrieden verloren."
    },
    en: {
      title: "The Lucid Flash: Total Freedom from Outside Approval",
      subtitle: "The weightless ecstasy of unconditional selfhood",
      desc: "Walking down a vibrant boulevard and being struck by a physical wave of golden tranquility, realizing with crystal clarity that no one else's opinion has any hold on your heart."
    },
    status: "dream",
    personalNote: "",
    favorite: true
  },
  {
    id: "wonder-24",
    num: "24",
    category: "serendipity_soul",
    es: {
      title: "Encontrar un objeto valioso o una nota de tu yo del pasado",
      subtitle: "La sincronicidad del tiempo",
      desc: "Abrir un libro antiguo y hallar una flor prensada, una joya perdida o una carta escrita por ti hace una década que profetizaba con asombrosa precisión la mujer magnífica que hoy eres."
    },
    de: {
      title: "Einen verlorenen Schatz oder eine Notiz deines alten Ichs finden",
      subtitle: "Magische Synchronizität der Zeit",
      desc: "Ein vergessenes Buch aufschlagen und eine gepresste Blüte oder einen Brief deines jugendlichen Ichs finden, der mit frappierender Weisheit die wundervolle Frau vorhersah, die du heute bist."
    },
    en: {
      title: "Finding a Lost Keepsake or a Note From Your Past Self",
      subtitle: "The magical synchronicity of time",
      desc: "Opening a forgotten volume to discover a pressed bloom, a missing treasure, or a diary entry from ten years ago predicting with uncanny precision the magnificent woman you have become."
    },
    status: "dream",
    personalNote: "",
    favorite: false
  },
  {
    id: "wonder-25",
    num: "25",
    category: "serendipity_soul",
    es: {
      title: "Bailar bajo un aguacero de verano con tu vestido más elegante",
      subtitle: "Empapada de dicha salvaje",
      desc: "Estar vestida de seda o gala, descalzarte sobre el asfalto tibio y reírte a carcajadas bajo una lluvia torrencial de verano mientras todo el mundo huye a buscar refugio."
    },
    de: {
      title: "Im elegantesten Kleid durch einen Sommerregen tanzen",
      subtitle: "Vollkommen durchnässt von wilder Lebensfreude",
      desc: "Im feinsten Seidenkleid barfuß auf den warmen Pflastersteinen tanzen und laut lachen, während ein warmer Wolkenbruch niedergeht und alle anderen panisch Schutz suchen."
    },
    en: {
      title: "Dancing in a Warm Summer Downpour in Your Finest Dress",
      subtitle: "Drenched in wild, untamed ecstasy",
      desc: "Dressed in silk or couture, kicking off your heels on warm stone, and laughing uncontrollably under a summer storm while everyone else scrambles for shelter."
    },
    status: "dream",
    personalNote: "",
    favorite: false
  },
  {
    id: "wonder-26",
    num: "26",
    category: "serendipity_soul",
    es: {
      title: "Despertar sabiendo que amas profundamente la vida que creaste",
      subtitle: "Gratitud infinita al abrir los ojos",
      desc: "Abrir los ojos en sábanas limpias de lino, contemplar la luz que entra por la ventana y susurrar con el corazón colmado de dicha: 'No cambiaría mi vida por ninguna otra'."
    },
    de: {
      title: "Erwachen mit der Gewissheit: Ich liebe mein erschaffenes Leben",
      subtitle: "Unendliche Dankbarkeit beim ersten Augenaufschlag",
      desc: "Die Augen in frischer Leinenbettwäsche aufschlagen, das sanfte Morgenlicht betrachten und mit überströmendem Herzen seufzen: „Ich würde mein Leben mit keinem anderen tauschen.“"
    },
    en: {
      title: "Waking to the Deep Certainty of Loving the Life You Built",
      subtitle: "Infinite gratitude at first dawn",
      desc: "Opening your eyes between crisp linen sheets, watching the morning light spill across the floor, and whispering with a peaceful heart: 'I would not trade my life for any other.'"
    },
    status: "dream",
    personalNote: "",
    favorite: true
  }
];
