// Heart & feelings: guided journaling, emotion dialogue, needs (NVC), values, self-compassion (Neff), letters.
export default {
  de: {
    hub: { cards: { heart: { title: 'Herz & Gefühle', desc: 'Geführtes Schreiben, Bedürfnisse, Werte, Briefe.' } } },
    heart: {
      kicker: 'Herz & Gefühle',
      title: 'Hinschauen, nicht beschönigen',
      lead: 'Kein Spruch des Tages, sondern Übungen, die dir helfen, dich selbst genauer zu verstehen. Nimm dir die Zeit, die du hast. Wenn es zu viel wird: Pause machen ist erlaubt.',
      tabs: { journal: 'Journaling', emotion: 'Mit einem Gefühl sprechen', needs: 'Bedürfnisse', values: 'Werte', compassion: 'Selbstmitgefühl', letters: 'Briefe' },
      ui: { next: 'Weiter', back: 'Zurück', skip: 'Überspringen', save: 'In meinem Tagebuch speichern', saved: 'Gespeichert.', placeholder: 'Schreib, wie es kommt …', summary: 'Zusammenfassung', history: 'Frühere Einträge', noHistory: 'Noch nichts gespeichert.', delete: 'Löschen', step: 'Frage {n} von {total}', restart: 'Nochmal von vorn', pause: 'Wenn dich etwas überflutet: Atme, steh auf, trink etwas. Du kannst später weitermachen.' },
      journal: {
        intro: 'Drei Fragen, die vom Beschreiben über das Fühlen zum Verstehen führen. Wähle ein Thema.',
        themes: {
          arrive: { name: 'Ankommen', fields: [
            'Was ist heute passiert? Nur die Fakten, wie ein Kamerablick.',
            'Was habe ich dabei gespürt, im Körper und im Gefühl?',
            'Was davon möchte ich morgen nicht mit mir herumtragen?'] },
          weigh: { name: 'Etwas beschäftigt mich', fields: [
            'Worum geht es genau? Beschreib es so konkret wie möglich.',
            'Was ist der Teil, der am meisten wehtut oder am meisten ärgert?',
            'Was würde ich einem Menschen raten, den ich liebe und dem es genauso geht?'] },
          want: { name: 'Was ich wirklich will', fields: [
            'Wenn niemand etwas von mir erwarten würde: Was würde ich diese Woche tun?',
            'Welche Stimme sagt mir, dass ich das nicht darf? Wessen Stimme war das ursprünglich?',
            'Was wäre ein kleiner, realer Schritt in diese Richtung?'] },
          good: { name: 'Was mir gutgetan hat', fields: [
            'Welcher Moment der letzten Tage war gut? Was genau war daran gut?',
            'Was habe ich selbst dazu beigetragen?',
            'Wie kann ich mehr davon in meinen Alltag holen?'] }
        }
      },
      emotion: {
        intro: 'Ein Gefühl ist nicht dein Feind. Hier gibst du ihm Raum und eine Stimme, ähnlich wie bei der Stuhlarbeit in der Therapie, nur leichter. Wähle ein Gefühl, das gerade da ist.',
        pick: 'Welches Gefühl ist da?',
        emotions: {
          fear: { name: 'Angst', intro: 'Angst will dich meist vor etwas schützen. Manchmal übertreibt sie, aber sie meint es gut.' },
          anger: { name: 'Wut', intro: 'Wut zeigt oft, dass eine Grenze verletzt wurde oder dir etwas Wichtiges fehlt.' },
          sadness: { name: 'Traurigkeit', intro: 'Traurigkeit zeigt, woran dein Herz hängt. Sie will gehört werden, nicht repariert.' },
          shame: { name: 'Scham', intro: 'Scham sagt: „Ich bin falsch.“ Dahinter steckt meist der Wunsch dazuzugehören.' },
          loneliness: { name: 'Einsamkeit', intro: 'Einsamkeit ist ein Signal für Verbindung, kein Urteil über dich.' },
          joy: { name: 'Freude', intro: 'Freude verdient genauso Aufmerksamkeit wie schwere Gefühle.' }
        },
        fields: [
          'Wo im Körper sitzt dieses Gefühl? Welche Form, Farbe oder Temperatur hätte es?',
          'Schreib aus Sicht des Gefühls, in der Ich-Form: „Ich bin hier, weil …“',
          'Wovor oder wofür will es dich schützen?',
          'Was braucht es von dir?',
          'Antworte ihm als die Erwachsene, die du bist: „Ich höre dich. …“'
        ]
      },
      needs: {
        intro: 'Nach der Gewaltfreien Kommunikation (Rosenberg): Hinter jedem starken Gefühl steht ein Bedürfnis. Wenn du es benennen kannst, wird die Bitte klarer.',
        obs: { label: 'Was ist konkret passiert?', hint: 'Nur beobachten, ohne Bewertung. Was hättest du auf einer Kamera gesehen oder gehört?' },
        feel: { label: 'Wie fühlst du dich damit?', hint: 'Wähle Wörter, die dir passen.' },
        need: { label: 'Welches Bedürfnis steckt dahinter?', hint: 'Was war dir wichtig und kam zu kurz?' },
        req: { label: 'Worum kannst du bitten?', hint: 'Konkret, machbar, als Bitte und nicht als Forderung. An jemand anderen oder an dich selbst.' },
        feelings: ['enttäuscht', 'verletzt', 'wütend', 'überfordert', 'einsam', 'ängstlich', 'traurig', 'gestresst', 'verunsichert', 'erschöpft', 'genervt', 'beschämt'],
        needsList: ['Ruhe', 'Verbindung', 'Verständnis', 'Autonomie', 'Respekt', 'Sicherheit', 'Spiel & Freude', 'Sinn', 'Ehrlichkeit', 'Zugehörigkeit', 'Unterstützung', 'Raum für mich', 'Anerkennung', 'Nähe', 'Kreativität', 'Bewegung'],
        result: 'Wenn {obs}, fühle ich mich {feel}, weil mir {need} wichtig ist. Ich bitte um: {req}',
        build: 'Satz bilden'
      },
      values: {
        intro: 'Werte sind keine Regeln, sondern eine Richtung. Wähle bis zu sieben, die dich ansprechen, und dann drei, die sich gerade am wichtigsten anfühlen.',
        list: ['Ehrlichkeit', 'Freiheit', 'Verbundenheit', 'Kreativität', 'Neugier', 'Mut', 'Güte', 'Sicherheit', 'Wachstum', 'Gerechtigkeit', 'Humor', 'Natur', 'Gesundheit', 'Unabhängigkeit', 'Zugehörigkeit', 'Abenteuer', 'Ruhe', 'Schönheit', 'Lernen', 'Verlässlichkeit', 'Verspieltheit', 'Authentizität', 'Beitragen', 'Leidenschaft'],
        pickMany: 'Was spricht dich an? (bis zu 7)',
        pickTop: 'Und welche drei sind dir gerade am wichtigsten?',
        reflect: 'Zu „{value}“:',
        q: ['Wo lebe ich das schon?', 'Wo kommt es zu kurz?', 'Ein kleiner Schritt diese Woche:'],
        limit: 'Das sind schon sieben. Nimm eines ab, um ein anderes zu wählen.'
      },
      compassion: {
        intro: 'Nach Kristin Neff hat Selbstmitgefühl drei Teile: bemerken, dass es gerade schwer ist (Achtsamkeit), wissen, dass du damit nicht allein bist (gemeinsame Menschlichkeit), und dir selbst mit Freundlichkeit begegnen. Leg, wenn du magst, eine Hand aufs Herz.',
        fields: [
          'Beschreib kurz eine Situation, in der du gerade hart zu dir bist.',
          'Achtsamkeit: Benenne, was ist, ohne es zu beschönigen oder aufzublasen. („Das ist gerade ein schwerer Moment.“) Wie sagst du es in deinen Worten?',
          'Gemeinsame Menschlichkeit: Wer sonst kennt dieses Gefühl? Wie geht es anderen Menschen in ähnlichen Situationen?',
          'Freundlichkeit: Was würdest du einer guten Freundin in genau dieser Lage sagen?',
          'Welcher Satz davon soll heute für dich gelten? Schreib ihn so auf, dass du ihn dir selbst sagen kannst.'
        ]
      },
      letters: {
        intro: 'Briefe holen dich aus dem Kreisen heraus. Der Brief an dein früheres Ich ist eine Form der Zuwendung. Der Brief an dein zukünftiges Ich ist ein Gespräch über die Zeit hinweg.',
        past: { name: 'An mein früheres Ich', fields: [
          'Wie alt war dieses Ich? Welches Alter möchtest du besuchen?',
          'Was hat es damals durchgemacht? Beschreib die Situation.',
          'Was hätte es damals gebraucht zu hören?',
          'Was möchtest du ihm danken oder verzeihen?',
          'Unterschreib mit einem Satz, den es mitnehmen darf.'] },
        future: { name: 'An mein zukünftiges Ich', placeholder: 'Liebe Marie in einem Jahr …', hint: 'Fragen zur Anregung: Was hoffst du bis dahin losgelassen zu haben? Was möchtest du dir getraut haben? Was soll sie nicht vergessen? Dieser Brief ist derselbe wie in „Träume“.', saved: 'Gespeichert.' }
      }
    }
  },
  es: {
    hub: { cards: { heart: { title: 'Corazón y emociones', desc: 'Escritura guiada, necesidades, valores, cartas.' } } },
    heart: {
      kicker: 'Corazón y emociones',
      title: 'Mirar de frente, sin maquillar',
      lead: 'No es una frase del día, sino ejercicios para entenderte con más precisión. Tómate el tiempo que tengas. Si se vuelve demasiado: parar está permitido.',
      tabs: { journal: 'Diario guiado', emotion: 'Hablar con una emoción', needs: 'Necesidades', values: 'Valores', compassion: 'Autocompasión', letters: 'Cartas' },
      ui: { next: 'Siguiente', back: 'Atrás', skip: 'Saltar', save: 'Guardar en mi diario', saved: 'Guardado.', placeholder: 'Escribe lo que salga…', summary: 'Resumen', history: 'Entradas anteriores', noHistory: 'Todavía no hay nada guardado.', delete: 'Borrar', step: 'Pregunta {n} de {total}', restart: 'Empezar de nuevo', pause: 'Si algo te desborda: respira, levántate, bebe algo. Puedes seguir más tarde.' },
      journal: {
        intro: 'Tres preguntas que van de describir a sentir y de ahí a comprender. Elige un tema.',
        themes: {
          arrive: { name: 'Llegar', fields: [
            '¿Qué ha pasado hoy? Solo los hechos, como una cámara.',
            '¿Qué sentí con eso, en el cuerpo y en la emoción?',
            '¿Qué de todo esto no quiero cargar mañana?'] },
          weigh: { name: 'Algo me ocupa la cabeza', fields: [
            '¿De qué se trata exactamente? Descríbelo lo más concreto posible.',
            '¿Cuál es la parte que más duele o que más enfada?',
            '¿Qué le aconsejaría a alguien a quien quiero y que está igual?'] },
          want: { name: 'Lo que de verdad quiero', fields: [
            'Si nadie esperara nada de mí, ¿qué haría esta semana?',
            '¿Qué voz me dice que no puedo? ¿De quién era esa voz al principio?',
            '¿Cuál sería un paso pequeño y real en esa dirección?'] },
          good: { name: 'Lo que me ha hecho bien', fields: [
            '¿Qué momento de los últimos días fue bueno? ¿Qué fue exactamente lo bueno?',
            '¿Qué puse yo de mi parte?',
            '¿Cómo puedo traer más de eso a mi día a día?'] }
        }
      },
      emotion: {
        intro: 'Una emoción no es tu enemiga. Aquí le das espacio y voz, parecido al trabajo con sillas de la terapia, pero más ligero. Elige una emoción que esté presente.',
        pick: '¿Qué emoción está aquí?',
        emotions: {
          fear: { name: 'Miedo', intro: 'El miedo suele querer protegerte de algo. A veces exagera, pero lo hace con buena intención.' },
          anger: { name: 'Rabia', intro: 'La rabia suele indicar que se cruzó un límite o que te falta algo importante.' },
          sadness: { name: 'Tristeza', intro: 'La tristeza muestra a qué está apegado tu corazón. Quiere ser escuchada, no arreglada.' },
          shame: { name: 'Vergüenza', intro: 'La vergüenza dice: «Estoy mal». Detrás suele haber el deseo de pertenecer.' },
          loneliness: { name: 'Soledad', intro: 'La soledad es una señal de conexión, no un juicio sobre ti.' },
          joy: { name: 'Alegría', intro: 'La alegría merece tanta atención como las emociones difíciles.' }
        },
        fields: [
          '¿En qué parte del cuerpo vive esta emoción? ¿Qué forma, color o temperatura tendría?',
          'Escribe desde la emoción, en primera persona: «Estoy aquí porque…»',
          '¿De qué o para qué quiere protegerte?',
          '¿Qué necesita de ti?',
          'Respóndele como la adulta que eres: «Te escucho. …»'
        ]
      },
      needs: {
        intro: 'Según la Comunicación No Violenta (Rosenberg): detrás de cada emoción fuerte hay una necesidad. Si puedes nombrarla, la petición se aclara.',
        obs: { label: '¿Qué ha pasado concretamente?', hint: 'Solo observar, sin juzgar. ¿Qué habría captado una cámara?' },
        feel: { label: '¿Cómo te sientes con eso?', hint: 'Elige las palabras que te encajen.' },
        need: { label: '¿Qué necesidad hay detrás?', hint: '¿Qué era importante para ti y quedó corto?' },
        req: { label: '¿Qué puedes pedir?', hint: 'Algo concreto, posible, como petición y no como exigencia. A otra persona o a ti misma.' },
        feelings: ['decepcionada', 'herida', 'enfadada', 'desbordada', 'sola', 'asustada', 'triste', 'estresada', 'insegura', 'agotada', 'irritada', 'avergonzada'],
        needsList: ['Calma', 'Conexión', 'Comprensión', 'Autonomía', 'Respeto', 'Seguridad', 'Juego y alegría', 'Sentido', 'Honestidad', 'Pertenencia', 'Apoyo', 'Espacio para mí', 'Reconocimiento', 'Cercanía', 'Creatividad', 'Movimiento'],
        result: 'Cuando {obs}, me siento {feel}, porque para mí es importante: {need}. Te pido: {req}',
        build: 'Formar la frase'
      },
      values: {
        intro: 'Los valores no son reglas, sino una dirección. Elige hasta siete que te hablen y después tres que ahora te parezcan los más importantes.',
        list: ['Honestidad', 'Libertad', 'Conexión', 'Creatividad', 'Curiosidad', 'Valentía', 'Bondad', 'Seguridad', 'Crecimiento', 'Justicia', 'Humor', 'Naturaleza', 'Salud', 'Independencia', 'Pertenencia', 'Aventura', 'Calma', 'Belleza', 'Aprender', 'Fiabilidad', 'Juego', 'Autenticidad', 'Contribuir', 'Pasión'],
        pickMany: '¿Cuáles te hablan? (hasta 7)',
        pickTop: '¿Y cuáles tres son ahora los más importantes?',
        reflect: 'Sobre «{value}»:',
        q: ['¿Dónde lo vivo ya?', '¿Dónde se queda corto?', 'Un paso pequeño esta semana:'],
        limit: 'Ya son siete. Quita uno para elegir otro.'
      },
      compassion: {
        intro: 'Según Kristin Neff, la autocompasión tiene tres partes: notar que ahora es difícil (atención plena), saber que no estás sola en esto (humanidad compartida) y tratarte con amabilidad. Si quieres, pon una mano en el corazón.',
        fields: [
          'Describe brevemente una situación en la que ahora estás siendo dura contigo.',
          'Atención plena: Nombra lo que hay, sin maquillarlo ni exagerarlo. («Este es un momento difícil».) ¿Cómo lo dirías con tus palabras?',
          'Humanidad compartida: ¿Quién más conoce esta sensación? ¿Cómo les va a otras personas en situaciones parecidas?',
          'Amabilidad: ¿Qué le dirías a una buena amiga en esta misma situación?',
          '¿Cuál de esas frases quieres que valga hoy para ti? Escríbela de modo que puedas decírtela.'
        ]
      },
      letters: {
        intro: 'Las cartas te sacan del círculo de pensamientos. La carta a tu yo del pasado es una forma de cuidado. La carta a tu yo del futuro es una conversación a través del tiempo.',
        past: { name: 'A mi yo del pasado', fields: [
          '¿Qué edad tenía ese yo? ¿Qué edad quieres visitar?',
          '¿Qué estaba viviendo entonces? Describe la situación.',
          '¿Qué habría necesitado oír?',
          '¿Qué quieres agradecerle o perdonarle?',
          'Firma con una frase que pueda llevarse consigo.'] },
        future: { name: 'A mi yo del futuro', placeholder: 'Querida Marie dentro de un año…', hint: 'Preguntas para inspirarte: ¿Qué esperas haber soltado para entonces? ¿Qué te gustaría haberte atrevido a hacer? ¿Qué no debería olvidar? Esta carta es la misma que la de «Sueños».', saved: 'Guardado.' }
      }
    }
  },
  en: {
    hub: { cards: { heart: { title: 'Heart & feelings', desc: 'Guided writing, needs, values, letters.' } } },
    heart: {
      kicker: 'Heart & feelings',
      title: 'Look closely, without sugar-coating',
      lead: "Not a quote of the day, but exercises that help you understand yourself more precisely. Take whatever time you have. If it gets too much: pausing is allowed.",
      tabs: { journal: 'Journaling', emotion: 'Talk to a feeling', needs: 'Needs', values: 'Values', compassion: 'Self-compassion', letters: 'Letters' },
      ui: { next: 'Next', back: 'Back', skip: 'Skip', save: 'Save to my journal', saved: 'Saved.', placeholder: 'Write whatever comes…', summary: 'Summary', history: 'Earlier entries', noHistory: 'Nothing saved yet.', delete: 'Delete', step: 'Question {n} of {total}', restart: 'Start over', pause: "If something overwhelms you: breathe, stand up, drink something. You can continue later." },
      journal: {
        intro: 'Three questions that lead from describing to feeling to understanding. Choose a theme.',
        themes: {
          arrive: { name: 'Arriving', fields: [
            'What happened today? Just the facts, like a camera.',
            'What did I feel about it, in my body and emotionally?',
            "What of this do I not want to carry into tomorrow?"] },
          weigh: { name: 'Something is on my mind', fields: [
            "What is it about, exactly? Describe it as concretely as you can.",
            'Which part hurts or angers me the most?',
            'What would I advise someone I love who is going through the same?'] },
          want: { name: 'What I really want', fields: [
            'If nobody expected anything from me, what would I do this week?',
            'Which voice tells me I am not allowed? Whose voice was that originally?',
            'What would be a small, real step in that direction?'] },
          good: { name: 'What did me good', fields: [
            'Which moment of the last few days was good? What exactly was good about it?',
            'What did I contribute myself?',
            'How can I bring more of that into my everyday life?'] }
        }
      },
      emotion: {
        intro: "A feeling is not your enemy. Here you give it space and a voice, similar to chair work in therapy but lighter. Choose a feeling that is here right now.",
        pick: 'Which feeling is here?',
        emotions: {
          fear: { name: 'Fear', intro: 'Fear usually wants to protect you from something. Sometimes it exaggerates, but it means well.' },
          anger: { name: 'Anger', intro: 'Anger often shows that a boundary was crossed or that something important is missing.' },
          sadness: { name: 'Sadness', intro: 'Sadness shows what your heart is attached to. It wants to be heard, not fixed.' },
          shame: { name: 'Shame', intro: 'Shame says: "I am wrong." Behind it there is usually a wish to belong.' },
          loneliness: { name: 'Loneliness', intro: 'Loneliness is a signal for connection, not a verdict on you.' },
          joy: { name: 'Joy', intro: 'Joy deserves as much attention as the heavy feelings.' }
        },
        fields: [
          'Where in your body does this feeling live? What shape, colour or temperature would it have?',
          'Write from the feeling\'s point of view, in first person: "I am here because…"',
          'What does it want to protect you from, or for?',
          'What does it need from you?',
          'Answer it as the adult you are: "I hear you. …"'
        ]
      },
      needs: {
        intro: 'According to Nonviolent Communication (Rosenberg): behind every strong feeling there is a need. If you can name it, the request becomes clearer.',
        obs: { label: 'What happened, concretely?', hint: 'Only observe, without judging. What would a camera have seen or heard?' },
        feel: { label: 'How do you feel about it?', hint: 'Choose the words that fit.' },
        need: { label: 'Which need is behind that?', hint: 'What mattered to you and was missing?' },
        req: { label: 'What can you ask for?', hint: 'Concrete, doable, as a request and not a demand. From someone else or from yourself.' },
        feelings: ['disappointed', 'hurt', 'angry', 'overwhelmed', 'lonely', 'afraid', 'sad', 'stressed', 'insecure', 'exhausted', 'irritated', 'ashamed'],
        needsList: ['Calm', 'Connection', 'Understanding', 'Autonomy', 'Respect', 'Safety', 'Play & joy', 'Meaning', 'Honesty', 'Belonging', 'Support', 'Space for myself', 'Recognition', 'Closeness', 'Creativity', 'Movement'],
        result: 'When {obs}, I feel {feel}, because {need} matters to me. I ask for: {req}',
        build: 'Build the sentence'
      },
      values: {
        intro: 'Values are not rules, they are a direction. Choose up to seven that speak to you, then three that feel most important right now.',
        list: ['Honesty', 'Freedom', 'Connection', 'Creativity', 'Curiosity', 'Courage', 'Kindness', 'Security', 'Growth', 'Justice', 'Humour', 'Nature', 'Health', 'Independence', 'Belonging', 'Adventure', 'Calm', 'Beauty', 'Learning', 'Reliability', 'Playfulness', 'Authenticity', 'Contribution', 'Passion'],
        pickMany: 'Which ones speak to you? (up to 7)',
        pickTop: 'And which three matter most right now?',
        reflect: 'About "{value}":',
        q: ['Where am I already living this?', 'Where does it fall short?', 'One small step this week:'],
        limit: "That's already seven. Remove one to choose another."
      },
      compassion: {
        intro: 'According to Kristin Neff, self-compassion has three parts: noticing that it is hard right now (mindfulness), knowing you are not alone in this (common humanity), and meeting yourself with kindness. If you like, rest a hand on your heart.',
        fields: [
          'Briefly describe a situation in which you are being hard on yourself right now.',
          'Mindfulness: Name what is there, without sugar-coating or inflating it. ("This is a hard moment.") How would you say it in your own words?',
          'Common humanity: Who else knows this feeling? How is it for other people in similar situations?',
          'Kindness: What would you say to a good friend in exactly this situation?',
          'Which of those sentences should hold for you today? Write it so you can say it to yourself.'
        ]
      },
      letters: {
        intro: 'Letters get you out of circling thoughts. A letter to your past self is a form of care. A letter to your future self is a conversation across time.',
        past: { name: 'To my past self', fields: [
          'How old was that self? Which age do you want to visit?',
          'What was she going through then? Describe the situation.',
          'What would she have needed to hear?',
          'What do you want to thank or forgive her for?',
          'Sign off with a sentence she can take with her.'] },
        future: { name: 'To my future self', placeholder: 'Dear Marie a year from now…', hint: 'Prompts: What do you hope to have let go of by then? What do you want to have dared? What should she not forget? This is the same letter as in "Dreams".', saved: 'Saved.' }
      }
    }
  }
};
