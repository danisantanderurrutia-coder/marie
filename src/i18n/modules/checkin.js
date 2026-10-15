// Body check-in: compassionate, no diet language, no "improve your body".
export default {
  de: {
    hub: { cards: { checkin: { title: 'Wie fühle ich mich in meinem Körper?', desc: 'Ein sanfter Check-in. Es geht um Gefühl, nicht um Aussehen.' } } },
    checkin: {
      kicker: 'Körper-Check-in',
      title: 'Wie wohnst du gerade in deinem Körper?',
      lead: 'Hier geht es nicht um Aussehen, Gewicht oder darum, etwas zu verbessern. Nur darum, wie es sich von innen anfühlt.',
      step: 'Schritt {n} von {total}',
      arrive: {
        title: 'Erst mal ankommen',
        text: 'Lass die Schultern sinken. Atme dreimal langsam aus, länger als du einatmest. Wenn du magst, leg eine Hand auf eine Stelle, die sich gerade neutral oder gut anfühlt.',
        button: 'Ich bin da'
      },
      scale: {
        title: 'Wie fühlt sich dein Körper gerade für dich an?',
        hint: 'Es gibt keine richtige Antwort. Wähle, was am ehesten stimmt.',
        levels: ['Fremd', 'Angespannt', 'Neutral', 'Freundlich', 'Zuhause']
      },
      feelings: {
        title: 'Welche Worte passen dazu?',
        hint: 'Du kannst mehrere wählen, oder keins.',
        words: ['müde', 'verletzlich', 'stark', 'taub', 'zärtlich', 'wütend', 'dankbar', 'scheu', 'lebendig', 'schwer', 'ruhig', 'unruhig', 'stolz', 'traurig']
      },
      questions: {
        title: 'Ein paar offene Fragen',
        hint: 'Beantworte, was du magst. Leer lassen ist völlig okay.',
        other: 'Andere Fragen',
        list: [
          'Was hat dein Körper heute für dich getan?',
          'Welcher Gedanke über deinen Körper war heute am lautesten? Würdest du ihn genau so einer Freundin sagen?',
          'Wann hast du dich heute in deinem Körper wohl gefühlt, auch wenn es nur kurz war?',
          'Was braucht dein Körper gerade, das nichts mit Aussehen zu tun hat?',
          'Gibt es eine Stelle, die du heute bewusst freundlich behandeln möchtest?',
          'Wenn dein Körper dir einen einzigen Satz sagen könnte, welcher wäre es?',
          'Wo hast du heute etwas festgehalten, und was würde loslassen helfen?',
          'Was weißt du über deinen Körper, das niemand sonst weiß?'
        ],
        placeholder: 'Schreib, wie es kommt …'
      },
      close: {
        title: 'Zum Abschluss',
        low: 'Es ist okay, dass es sich gerade nicht gut anfühlt. Ein Körpergefühl ist ein Wetter, kein Urteil über dich.',
        mid: 'Neutral ist ein guter Ort. Du musst deinen Körper nicht lieben, um freundlich mit ihm zu sein.',
        high: 'Schön, dass du dich gerade zuhause fühlst. Merk dir, wie sich das anfühlt.',
        gestureTitle: 'Möchtest du deinem Körper gerade etwas Kleines geben?',
        gestures: ['Wasser trinken', 'Dehnen', 'Wärme (Tee, Decke)', 'Hand aufs Herz', 'Kurz rausgehen', 'Nichts, einfach da sein'],
        save: 'Check-in speichern',
        saved: 'Gespeichert. Danke, dass du hingeschaut hast.',
        repeatLow: 'Dein Körper fühlt sich schon ein paar Mal hintereinander fremd oder angespannt an. Wenn das öfter so ist oder dich belastet, kann es helfen, mit jemandem darüber zu sprechen.'
      },
      history: { title: 'Dein Verlauf', empty: 'Noch keine Check-ins. Der erste darf gern unperfekt sein.', note: 'Schwankungen sind normal. Hier wird nichts bewertet.', delete: 'Eintrag löschen' },
      back: 'Zurück', next: 'Weiter', again: 'Neuer Check-in'
    }
  },
  es: {
    hub: { cards: { checkin: { title: '¿Cómo me siento en mi cuerpo?', desc: 'Un check-in suave. Se trata de sensación, no de apariencia.' } } },
    checkin: {
      kicker: 'Check-in corporal',
      title: '¿Cómo habitas tu cuerpo ahora mismo?',
      lead: 'Aquí no se trata de apariencia, peso ni de mejorar nada. Solo de cómo se siente desde dentro.',
      step: 'Paso {n} de {total}',
      arrive: {
        title: 'Primero, llegar',
        text: 'Deja caer los hombros. Exhala despacio tres veces, más largo de lo que inhalas. Si quieres, pon una mano en un lugar que ahora se sienta neutro o agradable.',
        button: 'Ya estoy aquí'
      },
      scale: {
        title: '¿Cómo se siente tu cuerpo para ti ahora?',
        hint: 'No hay respuesta correcta. Elige lo que más se acerque.',
        levels: ['Ajeno', 'Tenso', 'Neutro', 'Amable', 'En casa']
      },
      feelings: {
        title: '¿Qué palabras encajan?',
        hint: 'Puedes elegir varias, o ninguna.',
        words: ['cansada', 'vulnerable', 'fuerte', 'dormida', 'tierna', 'enfadada', 'agradecida', 'tímida', 'viva', 'pesada', 'tranquila', 'inquieta', 'orgullosa', 'triste']
      },
      questions: {
        title: 'Unas preguntas abiertas',
        hint: 'Responde lo que quieras. Dejarlas en blanco está perfectamente bien.',
        other: 'Otras preguntas',
        list: [
          '¿Qué ha hecho hoy tu cuerpo por ti?',
          '¿Qué pensamiento sobre tu cuerpo ha sido el más fuerte hoy? ¿Se lo dirías así a una amiga?',
          '¿Cuándo te sentiste a gusto en tu cuerpo hoy, aunque fuera un momento?',
          '¿Qué necesita ahora tu cuerpo que no tenga que ver con la apariencia?',
          '¿Hay algún lugar al que quieras tratar con amabilidad hoy?',
          'Si tu cuerpo pudiera decirte una sola frase, ¿cuál sería?',
          '¿Dónde has estado reteniendo algo hoy y qué ayudaría a soltarlo?',
          '¿Qué sabes de tu cuerpo que nadie más sabe?'
        ],
        placeholder: 'Escribe lo que salga…'
      },
      close: {
        title: 'Para cerrar',
        low: 'Está bien que ahora no se sienta bien. La sensación corporal es un clima, no un juicio sobre ti.',
        mid: 'Neutro es un buen lugar. No necesitas amar tu cuerpo para tratarlo con amabilidad.',
        high: 'Qué bien que te sientas en casa. Fíjate en cómo se siente.',
        gestureTitle: '¿Quieres darle algo pequeño a tu cuerpo ahora?',
        gestures: ['Beber agua', 'Estirarme', 'Calor (té, manta)', 'Mano en el corazón', 'Salir un momento', 'Nada, solo estar'],
        save: 'Guardar check-in',
        saved: 'Guardado. Gracias por mirar hacia dentro.',
        repeatLow: 'Tu cuerpo lleva varias veces seguidas sintiéndose ajeno o tenso. Si pasa a menudo o te pesa, hablarlo con alguien puede ayudar.'
      },
      history: { title: 'Tu evolución', empty: 'Aún no hay check-ins. El primero puede ser imperfecto.', note: 'Las oscilaciones son normales. Aquí nada se evalúa.', delete: 'Borrar registro' },
      back: 'Atrás', next: 'Siguiente', again: 'Nuevo check-in'
    }
  },
  en: {
    hub: { cards: { checkin: { title: 'How do I feel in my body?', desc: 'A gentle check-in. It is about sensation, not appearance.' } } },
    checkin: {
      kicker: 'Body check-in',
      title: 'How are you inhabiting your body right now?',
      lead: "This isn't about appearance, weight or improving anything. Only about how it feels from the inside.",
      step: 'Step {n} of {total}',
      arrive: {
        title: 'First, arrive',
        text: 'Let your shoulders drop. Breathe out slowly three times, longer than you breathe in. If you like, rest a hand on a spot that feels neutral or good right now.',
        button: "I'm here"
      },
      scale: {
        title: 'How does your body feel to you right now?',
        hint: 'There is no right answer. Pick what is closest.',
        levels: ['Foreign', 'Tense', 'Neutral', 'Friendly', 'At home']
      },
      feelings: {
        title: 'Which words fit?',
        hint: 'You can pick several, or none.',
        words: ['tired', 'vulnerable', 'strong', 'numb', 'tender', 'angry', 'grateful', 'shy', 'alive', 'heavy', 'calm', 'restless', 'proud', 'sad']
      },
      questions: {
        title: 'A few open questions',
        hint: 'Answer what you like. Leaving them blank is completely fine.',
        other: 'Other questions',
        list: [
          'What did your body do for you today?',
          'Which thought about your body was the loudest today? Would you say it exactly like that to a friend?',
          'When did you feel at ease in your body today, even briefly?',
          'What does your body need right now that has nothing to do with looks?',
          'Is there a spot you want to treat kindly today?',
          'If your body could say one sentence to you, what would it be?',
          'Where have you been holding on today, and what might help you let go?',
          'What do you know about your body that nobody else knows?'
        ],
        placeholder: 'Write whatever comes…'
      },
      close: {
        title: 'To close',
        low: "It's okay that it doesn't feel good right now. A body feeling is weather, not a verdict on you.",
        mid: "Neutral is a good place. You don't have to love your body to be kind to it.",
        high: 'Lovely that you feel at home right now. Notice what that feels like.',
        gestureTitle: 'Would you like to give your body something small right now?',
        gestures: ['Drink water', 'Stretch', 'Warmth (tea, blanket)', 'Hand on heart', 'Step outside briefly', 'Nothing, just be here'],
        save: 'Save check-in',
        saved: 'Saved. Thank you for looking inward.',
        repeatLow: "Your body has felt foreign or tense several times in a row. If that happens often or weighs on you, talking to someone can help."
      },
      history: { title: 'Your progress', empty: 'No check-ins yet. The first one is allowed to be imperfect.', note: 'Ups and downs are normal. Nothing is graded here.', delete: 'Delete entry' },
      back: 'Back', next: 'Next', again: 'New check-in'
    }
  }
};
