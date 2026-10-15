// Ideas -> Action. Tone: no guilt, no streaks, no "failed". Unfinished = resting.
export default {
  de: {
    hub: { cards: { ideas: { title: 'Ideen → Handeln', desc: 'Aus vielen Ideen kleine, machbare Schritte machen.' } } },
    ideas: {
      kicker: 'Ideen → Handeln',
      title: 'Ideen dürfen klein anfangen',
      lead: 'Halte fest, was dir einfällt. Dann such dir einen Schritt, der 5 bis 10 Minuten dauert. Mehr ist nicht nötig. Und was ruht, ist nicht gescheitert.',
      capture: { label: 'Neue Idee, schnell festgehalten', placeholder: 'Zum Beispiel: ein Heft mit Pflanzen-Zeichnungen …', add: 'Festhalten', typeLabel: 'Wofür ist das?' },
      types: { draw: 'Zeichnen', write: 'Schreiben', collage: 'Collage', music: 'Musik', other: 'Anderes' },
      stages: { seed: 'Ideen', moving: 'In Bewegung', celebrated: 'Gefeiert', resting: 'Ruht' },
      stageHint: {
        seed: 'Alles, was dir einfällt. Nichts davon ist Verpflichtung.',
        moving: 'Hier hat schon etwas begonnen.',
        celebrated: 'Hier darfst du stolz sein.',
        resting: 'Ideen dürfen ruhen. Sie laufen nicht weg, und du kannst jederzeit zurückkommen.'
      },
      empty: { seed: 'Noch keine Ideen. Die erste darf ganz klein sein.', moving: 'Wenn du einen Schritt gemacht hast, erscheint die Idee hier.', celebrated: 'Hier landet, was du ausprobiert und abgeschlossen hast.', resting: 'Nichts ruht gerade. Auch gut.' },
      steps: {
        title: 'Ein kleiner Schritt',
        pick: 'Wähle einen Mini-Schritt oder schreib deinen eigenen',
        custom: 'Eigener Schritt',
        customPlaceholder: 'Was wäre in 5 bis 10 Minuten machbar?',
        minutesLabel: 'Minuten',
        add: 'Schritt hinzufügen',
        done: 'Erledigt',
        undo: 'Rückgängig',
        timerStart: 'Timer starten ({min} Min.)',
        timerStop: 'Timer stoppen',
        timerEnd: 'Die Zeit ist um. Du darfst aufhören oder weitermachen.',
        none: 'Noch kein Schritt gewählt.',
        suggestions: {
          draw: [
            { text: 'Drei Linien, die zu der Idee passen, ohne Radiergummi', min: 5 },
            { text: 'Die Idee in drei winzigen Skizzen festhalten', min: 10 },
            { text: 'Drei Farben aussuchen und drei Kleckse aufs Papier setzen', min: 5 },
            { text: 'Ein Foto von etwas machen, das als Vorlage dienen könnte', min: 5 }
          ],
          write: [
            { text: 'Alles aufschreiben, was dir zur Idee einfällt, ohne zu korrigieren', min: 5 },
            { text: 'Nur den ersten Satz schreiben, mehr nicht', min: 5 },
            { text: 'Drei Dinge notieren, die die Idee braucht', min: 5 },
            { text: 'Die Idee in einem Absatz einer Freundin erklären', min: 10 }
          ],
          collage: [
            { text: 'Fünf Bilder oder Schnipsel sammeln, die zur Idee passen', min: 10 },
            { text: 'Drei Dinge auf dem Tisch zusammenlegen und fotografieren', min: 5 },
            { text: 'Aus einer Zeitschrift drei Farben herausreißen', min: 5 },
            { text: 'Zwei Schnipsel auf ein Blatt kleben, mehr nicht', min: 10 }
          ],
          music: [
            { text: 'Zehn Minuten summen oder herumspielen, ohne Ziel', min: 10 },
            { text: 'Eine Melodie als 30-Sekunden-Sprachmemo aufnehmen', min: 5 },
            { text: 'Eine Textzeile oder drei Akkorde aufschreiben', min: 5 },
            { text: 'Drei Lieder hören, die nach der Idee klingen, und notieren warum', min: 10 }
          ],
          other: [
            { text: 'Aufschreiben, was der allererste Schritt wäre', min: 5 },
            { text: 'Drei Dinge suchen, die du dafür brauchst', min: 5 },
            { text: 'Die Idee jemandem in zwei Sätzen erzählen', min: 5 },
            { text: 'Timer auf 10 Minuten und irgendwo anfangen', min: 10 }
          ]
        }
      },
      actions: { celebrate: 'Als gefeiert markieren', rest: 'Ruhen lassen', wake: 'Wieder aufnehmen', delete: 'Löschen', open: 'Öffnen', close: 'Schließen' },
      celebrate: ['Du hast angefangen. Das ist der schwierigste Teil.', 'Fünf Minuten sind mehr als null.', 'Ein Schritt weiter als gestern.', 'Das zählt.', 'Schön. Die Idee lebt jetzt ein bisschen mehr.'],
      challenge: {
        title: 'Kreativ-Impuls',
        lead: 'Ein kleiner Anstoß, wenn du nicht weißt, womit du anfangen sollst.',
        another: 'Anderer Impuls',
        toIdea: 'Als Idee festhalten',
        list: {
          draw: ['Zeichne deine linke Hand, ohne aufs Papier zu schauen.', 'Male etwas in nur drei Farben, das du heute gesehen hast.', 'Zeichne ein Gefühl als Landschaft.', 'Fülle eine Seite mit Kritzeln. Fehler gibt es nicht.', 'Zeichne den Gegenstand, der dir am nächsten liegt, in fünf Minuten.'],
          write: ['Schreib zehn Minuten lang einen Brief an einen Ort, an dem du gern wärst.', 'Beschreibe deinen Morgen, als wäre er eine Szene aus einem Roman.', 'Schreib einen Absatz, in dem jeder Satz mit „Ich erinnere mich“ beginnt.', 'Erfinde eine Figur aus drei Eigenschaften und lass sie einen Satz sagen.', 'Schreib ein Gedicht mit nur fünf Wörtern pro Zeile.'],
          collage: ['Mach eine Collage nur aus Dingen in einer Farbe.', 'Eine Collage zum Thema „So fühlt sich Ruhe an“.', 'Schneide Wörter aus und bilde einen neuen Satz.', 'Sammle auf einem Spaziergang drei Dinge und leg daraus ein Bild.', 'Klebe etwas zusammen, das du bewunderst, und etwas, das dich ausmacht.'],
          music: ['Wähle ein Lied und erfinde einen neuen Refrain.', 'Mach drei Minuten Musik nur mit Dingen aus der Küche.', 'Hör ein Lied mit geschlossenen Augen und male danach, was du gesehen hast.', 'Summe, wie sich dein Tag anhört.', 'Stell eine Playlist für ein Gefühl zusammen, das du gerade hast.']
        }
      },
      wins: { title: 'Kleine Erfolge', steps: '{n} Schritte diese Woche', celebrated: '{n} gefeierte Ideen insgesamt', none: 'Noch nichts gezählt. Das ändert sich mit dem ersten kleinen Schritt.', note: 'Hier wird nur gezählt, was du getan hast. Nie, was nicht.' }
    }
  },
  es: {
    hub: { cards: { ideas: { title: 'Ideas → Acción', desc: 'Convertir muchas ideas en pasos pequeños y posibles.' } } },
    ideas: {
      kicker: 'Ideas → Acción',
      title: 'Las ideas pueden empezar pequeñas',
      lead: 'Apunta lo que se te ocurra. Luego elige un paso de 5 a 10 minutos. No hace falta más. Y lo que descansa no ha fracasado.',
      capture: { label: 'Nueva idea, apuntada rápido', placeholder: 'Por ejemplo: un cuaderno de dibujos de plantas…', add: 'Apuntar', typeLabel: '¿Para qué es?' },
      types: { draw: 'Dibujo', write: 'Escritura', collage: 'Collage', music: 'Música', other: 'Otro' },
      stages: { seed: 'Ideas', moving: 'En marcha', celebrated: 'Celebradas', resting: 'En reposo' },
      stageHint: {
        seed: 'Todo lo que se te ocurra. Nada de esto es una obligación.',
        moving: 'Aquí ya empezó algo.',
        celebrated: 'Aquí puedes sentirte orgullosa.',
        resting: 'Las ideas pueden descansar. No se van y puedes volver cuando quieras.'
      },
      empty: { seed: 'Aún no hay ideas. La primera puede ser mínima.', moving: 'Cuando des un paso, la idea aparecerá aquí.', celebrated: 'Aquí llega lo que probaste y terminaste.', resting: 'Nada descansa ahora. También está bien.' },
      steps: {
        title: 'Un paso pequeño',
        pick: 'Elige un mini-paso o escribe el tuyo',
        custom: 'Paso propio',
        customPlaceholder: '¿Qué se podría hacer en 5 a 10 minutos?',
        minutesLabel: 'Minutos',
        add: 'Añadir paso',
        done: 'Hecho',
        undo: 'Deshacer',
        timerStart: 'Iniciar temporizador ({min} min)',
        timerStop: 'Parar temporizador',
        timerEnd: 'Se acabó el tiempo. Puedes parar o seguir.',
        none: 'Aún no has elegido ningún paso.',
        suggestions: {
          draw: [
            { text: 'Tres líneas que encajen con la idea, sin goma de borrar', min: 5 },
            { text: 'Capturar la idea en tres bocetos diminutos', min: 10 },
            { text: 'Elegir tres colores y hacer tres manchas en el papel', min: 5 },
            { text: 'Hacer una foto de algo que pueda servir de modelo', min: 5 }
          ],
          write: [
            { text: 'Escribir todo lo que se te ocurra sobre la idea, sin corregir', min: 5 },
            { text: 'Escribir solo la primera frase, nada más', min: 5 },
            { text: 'Anotar tres cosas que la idea necesita', min: 5 },
            { text: 'Explicar la idea en un párrafo a una amiga', min: 10 }
          ],
          collage: [
            { text: 'Reunir cinco imágenes o recortes que encajen con la idea', min: 10 },
            { text: 'Juntar tres cosas sobre la mesa y fotografiarlas', min: 5 },
            { text: 'Arrancar de una revista tres colores', min: 5 },
            { text: 'Pegar dos recortes en una hoja, nada más', min: 10 }
          ],
          music: [
            { text: 'Tararear o tocar diez minutos sin objetivo', min: 10 },
            { text: 'Grabar una melodía en una nota de voz de 30 segundos', min: 5 },
            { text: 'Escribir una línea de letra o tres acordes', min: 5 },
            { text: 'Escuchar tres canciones que suenen a la idea y anotar por qué', min: 10 }
          ],
          other: [
            { text: 'Escribir cuál sería el primerísimo paso', min: 5 },
            { text: 'Buscar tres cosas que necesitas para esto', min: 5 },
            { text: 'Contarle la idea a alguien en dos frases', min: 5 },
            { text: 'Temporizador de 10 minutos y empezar por cualquier lado', min: 10 }
          ]
        }
      },
      actions: { celebrate: 'Marcar como celebrada', rest: 'Dejar reposar', wake: 'Retomar', delete: 'Borrar', open: 'Abrir', close: 'Cerrar' },
      celebrate: ['Has empezado. Esa es la parte más difícil.', 'Cinco minutos son más que cero.', 'Un paso más que ayer.', 'Eso cuenta.', 'Qué bien. La idea está un poco más viva.'],
      challenge: {
        title: 'Impulso creativo',
        lead: 'Un empujoncito cuando no sabes por dónde empezar.',
        another: 'Otro impulso',
        toIdea: 'Guardar como idea',
        list: {
          draw: ['Dibuja tu mano izquierda sin mirar el papel.', 'Pinta con solo tres colores algo que hayas visto hoy.', 'Dibuja una emoción como un paisaje.', 'Llena una página de garabatos. Los errores no existen.', 'Dibuja en cinco minutos el objeto que tengas más cerca.'],
          write: ['Escribe diez minutos una carta a un lugar donde te gustaría estar.', 'Describe tu mañana como si fuera una escena de novela.', 'Escribe un párrafo en el que cada frase empiece con «Recuerdo».', 'Inventa un personaje con tres rasgos y haz que diga una frase.', 'Escribe un poema con solo cinco palabras por verso.'],
          collage: ['Haz un collage solo con cosas de un color.', 'Un collage sobre «así se siente la calma».', 'Recorta palabras y forma una frase nueva.', 'Recoge tres cosas en un paseo y haz con ellas una imagen.', 'Pega algo que admires junto a algo que te defina.'],
          music: ['Elige una canción e inventa un estribillo nuevo.', 'Haz tres minutos de música solo con cosas de la cocina.', 'Escucha una canción con los ojos cerrados y luego dibuja lo que viste.', 'Tararea cómo suena tu día.', 'Crea una playlist para una emoción que tengas ahora.']
        }
      },
      wins: { title: 'Pequeños logros', steps: '{n} pasos esta semana', celebrated: '{n} ideas celebradas en total', none: 'Todavía no se ha contado nada. Cambiará con el primer paso pequeño.', note: 'Aquí solo se cuenta lo que has hecho. Nunca lo que no.' }
    }
  },
  en: {
    hub: { cards: { ideas: { title: 'Ideas → Action', desc: 'Turn lots of ideas into small, doable steps.' } } },
    ideas: {
      kicker: 'Ideas → Action',
      title: 'Ideas are allowed to start small',
      lead: "Capture whatever comes to you. Then pick one step that takes 5 to 10 minutes. That's all it takes. And what rests hasn't failed.",
      capture: { label: 'New idea, captured quickly', placeholder: 'For example: a sketchbook of plant drawings…', add: 'Capture', typeLabel: 'What is it for?' },
      types: { draw: 'Drawing', write: 'Writing', collage: 'Collage', music: 'Music', other: 'Other' },
      stages: { seed: 'Ideas', moving: 'In motion', celebrated: 'Celebrated', resting: 'Resting' },
      stageHint: {
        seed: 'Everything that occurs to you. None of it is an obligation.',
        moving: 'Something has already begun here.',
        celebrated: 'You are allowed to be proud here.',
        resting: 'Ideas are allowed to rest. They are not going anywhere, and you can return any time.'
      },
      empty: { seed: 'No ideas yet. The first one can be tiny.', moving: 'Once you take a step, the idea shows up here.', celebrated: 'What you tried and finished lands here.', resting: 'Nothing is resting right now. Also fine.' },
      steps: {
        title: 'One small step',
        pick: 'Pick a mini-step or write your own',
        custom: 'Your own step',
        customPlaceholder: 'What could be done in 5 to 10 minutes?',
        minutesLabel: 'Minutes',
        add: 'Add step',
        done: 'Done',
        undo: 'Undo',
        timerStart: 'Start timer ({min} min)',
        timerStop: 'Stop timer',
        timerEnd: "Time's up. You may stop or keep going.",
        none: 'No step chosen yet.',
        suggestions: {
          draw: [
            { text: 'Three lines that fit the idea, no eraser', min: 5 },
            { text: 'Capture the idea in three tiny sketches', min: 10 },
            { text: 'Pick three colours and make three blobs on paper', min: 5 },
            { text: 'Take a photo of something that could serve as a reference', min: 5 }
          ],
          write: [
            { text: 'Write down everything that comes to mind about the idea, no correcting', min: 5 },
            { text: 'Write only the first sentence, nothing more', min: 5 },
            { text: 'Note three things the idea needs', min: 5 },
            { text: 'Explain the idea to a friend in one paragraph', min: 10 }
          ],
          collage: [
            { text: 'Gather five pictures or scraps that fit the idea', min: 10 },
            { text: 'Arrange three things on a table and photograph them', min: 5 },
            { text: 'Tear three colours out of a magazine', min: 5 },
            { text: 'Glue two scraps onto a sheet, nothing more', min: 10 }
          ],
          music: [
            { text: 'Hum or play around for ten minutes, no goal', min: 10 },
            { text: 'Record a melody as a 30-second voice memo', min: 5 },
            { text: 'Write one line of lyrics or three chords', min: 5 },
            { text: 'Listen to three songs that sound like the idea and note why', min: 10 }
          ],
          other: [
            { text: 'Write down what the very first step would be', min: 5 },
            { text: 'Find three things you would need for this', min: 5 },
            { text: 'Tell someone the idea in two sentences', min: 5 },
            { text: 'Set a 10-minute timer and start anywhere', min: 10 }
          ]
        }
      },
      actions: { celebrate: 'Mark as celebrated', rest: 'Let it rest', wake: 'Pick it up again', delete: 'Delete', open: 'Open', close: 'Close' },
      celebrate: ['You started. That is the hardest part.', 'Five minutes is more than zero.', 'One step further than yesterday.', 'That counts.', 'Lovely. The idea is a little more alive now.'],
      challenge: {
        title: 'Creative nudge',
        lead: "A small push when you don't know where to begin.",
        another: 'Another nudge',
        toIdea: 'Capture as idea',
        list: {
          draw: ['Draw your left hand without looking at the paper.', 'Paint something you saw today using only three colours.', 'Draw a feeling as a landscape.', 'Fill a page with scribbles. Mistakes do not exist.', 'Draw the object closest to you in five minutes.'],
          write: ["Write a ten-minute letter to a place you'd like to be.", 'Describe your morning as if it were a scene from a novel.', 'Write a paragraph where every sentence starts with "I remember".', 'Invent a character from three traits and let them say one sentence.', 'Write a poem with only five words per line.'],
          collage: ['Make a collage using only things of one colour.', 'A collage on "what calm feels like".', 'Cut out words and form a new sentence.', 'Collect three things on a walk and arrange them into a picture.', 'Glue together something you admire and something that is you.'],
          music: ['Pick a song and invent a new chorus.', 'Make three minutes of music using only things from the kitchen.', 'Listen to a song with your eyes closed, then paint what you saw.', 'Hum what your day sounds like.', 'Put together a playlist for a feeling you have right now.']
        }
      },
      wins: { title: 'Small wins', steps: '{n} steps this week', celebrated: '{n} celebrated ideas in total', none: "Nothing counted yet. That changes with the first small step.", note: 'Only what you did is counted here. Never what you did not.' }
    }
  }
};
