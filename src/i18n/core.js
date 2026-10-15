// src/i18n/core.js
// Shared strings: navigation, common actions, safety & privacy.
// Written natively in each language (not translated word for word).
// German uses the intimate "du".

export const core = {
  de: {
    language: { label: 'Sprache', choose: 'Sprache wählen', names: { de: 'Deutsch', es: 'Español', en: 'English' } },
    a11y: { skip: 'Zum Inhalt springen', mainNav: 'Hauptnavigation', back: 'Zurück', close: 'Schließen' },
    common: {
      back: 'Zurück', save: 'Speichern', saved: 'Gespeichert', cancel: 'Abbrechen', delete: 'Löschen',
      next: 'Weiter', previous: 'Zurück', done: 'Fertig', close: 'Schließen', optional: 'optional',
      add: 'Hinzufügen', edit: 'Bearbeiten', today: 'Heute', yesterday: 'Gestern', skip: 'Überspringen',
      noEntries: 'Noch nichts hier. Das ist völlig in Ordnung.', history: 'Verlauf', entries: 'Einträge',
      onlyOnDevice: 'Bleibt nur auf diesem Gerät.', writeHere: 'Schreib hier, wie es kommt …',
      minutes: 'Min.', seconds: 'Sek.', start: 'Starten', stop: 'Stopp', again: 'Nochmal'
    },
    tabs: {
      rose: { label: 'Heute', desc: 'Ankommen und sehen, was jetzt dran ist', tag: 'Start' },
      space: { label: 'Mein Raum', desc: 'Alle Werkzeuge an einem Ort', tag: 'Werkzeuge' },
      skin: { label: 'Körper', desc: 'Haut, Zyklus und Ruhe', tag: 'Körper' },
      hobbies: { label: 'Kreativ', desc: 'Neugier, Spiel und Dinge, die dir Freude machen', tag: 'Spiel' },
      dreams: { label: 'Träume', desc: 'Wünsche, Briefe und das, was kommen darf', tag: 'Zukunft' },
      profile: { label: 'Ich', desc: 'Werte, Verlauf und das, was dir wichtig ist', tag: 'Ich' },
      aura: { label: 'Feuer & Lust', desc: 'Selbstbestimmung, Begehren und Grenzen', tag: 'Begehren' }
    },
    safety: {
      disclaimerShort: 'Marie ist ein Raum zum Nachdenken und Ausprobieren. Es ist keine Therapie und ersetzt keine.',
      disclaimerLong: 'Die Übungen hier sind von Methoden aus der Psychologie inspiriert, aber sie sind keine Diagnose und keine Behandlung. Wenn dich etwas über längere Zeit belastet, ist es ein Zeichen von Selbstfürsorge, dir Unterstützung zu holen, kein Zeichen von Schwäche.',
      helpButton: 'Professionelle Unterstützung finden',
      helpShort: 'Hilfe & Anlaufstellen',
      sheetTitle: 'Du musst das nicht allein tragen',
      sheetIntro: 'Wenn es dir gerade sehr schlecht geht, ruf bitte jemanden an. Die Telefonseelsorge ist kostenlos, anonym und immer erreichbar.',
      urgent: 'Bei akuter Gefahr für dich oder andere: 112.',
      resources: [
        { id: 'tel', name: 'Telefonseelsorge', number: '0800 111 0 111', tel: '08001110111', desc: 'Kostenlos, anonym, rund um die Uhr. Auch 0800 111 0 222 und 116 123. Online-Beratung per Chat oder Mail: telefonseelsorge.de' },
        { id: '116117', name: 'Terminservicestelle', number: '116 117', tel: '116117', desc: 'Hilft dir, einen Termin für eine psychotherapeutische Sprechstunde zu finden. Kostenlos, mit Krankenkassenkarte.' },
        { id: 'gewalt', name: 'Hilfetelefon Gewalt gegen Frauen', number: '116 016', tel: '116016', desc: 'Vertraulich und kostenlos, 24 Stunden, in vielen Sprachen.' },
        { id: 'emergency', name: 'Notruf', number: '112', tel: '112', desc: 'Bei akuter Gefahr.' }
      ],
      therapistSearch: { name: 'Psychotherapeut:in finden', desc: 'Die Psychotherapeutensuche der Kammern: psych-info.de', url: 'https://www.psych-info.de' },
      verify: 'Stand der Angaben: 2026. Bitte prüfe Nummern im Zweifel noch einmal.',
      call: 'Anrufen'
    },
    privacy: {
      dataTitle: 'Deine Daten',
      dataLead: 'Alles, was du hier schreibst, bleibt in diesem Browser auf diesem Gerät. Es gibt kein Konto, keinen Server und kein Tracking.',
      points: [
        'Nichts wird ohne dein Zutun gesendet.',
        'Die Daten sind nicht verschlüsselt: Wer dein entsperrtes Gerät benutzt, könnte sie lesen. Nutze eine Bildschirmsperre.',
        'Wenn du Browserdaten löschst, sind deine Einträge weg. Exportiere sie, wenn sie dir wichtig sind.'
      ],
      export: 'Meine Daten exportieren',
      erase: 'Alles löschen',
      eraseConfirm: 'Wirklich alles löschen? Das lässt sich nicht rückgängig machen.',
      erased: 'Alles gelöscht.'
    }
  },

  es: {
    language: { label: 'Idioma', choose: 'Elegir idioma', names: { de: 'Deutsch', es: 'Español', en: 'English' } },
    a11y: { skip: 'Saltar al contenido', mainNav: 'Navegación principal', back: 'Volver', close: 'Cerrar' },
    common: {
      back: 'Volver', save: 'Guardar', saved: 'Guardado', cancel: 'Cancelar', delete: 'Borrar',
      next: 'Siguiente', previous: 'Anterior', done: 'Listo', close: 'Cerrar', optional: 'opcional',
      add: 'Añadir', edit: 'Editar', today: 'Hoy', yesterday: 'Ayer', skip: 'Saltar',
      noEntries: 'Todavía no hay nada aquí. Está perfectamente bien.', history: 'Historial', entries: 'Registros',
      onlyOnDevice: 'Se queda solo en este dispositivo.', writeHere: 'Escribe aquí lo que salga…',
      minutes: 'min', seconds: 's', start: 'Empezar', stop: 'Parar', again: 'Otra vez'
    },
    tabs: {
      rose: { label: 'Hoy', desc: 'Llegar y ver qué toca ahora', tag: 'Inicio' },
      space: { label: 'Mi espacio', desc: 'Todas las herramientas en un sitio', tag: 'Herramientas' },
      skin: { label: 'Cuerpo', desc: 'Piel, ciclo y descanso', tag: 'Cuerpo' },
      hobbies: { label: 'Crear', desc: 'Curiosidad, juego y cosas que te dan alegría', tag: 'Juego' },
      dreams: { label: 'Sueños', desc: 'Deseos, cartas y lo que quiere venir', tag: 'Futuro' },
      profile: { label: 'Yo', desc: 'Valores, evolución y lo que te importa', tag: 'Yo' },
      aura: { label: 'Fuego & Deseo', desc: 'Autonomía, deseo y límites', tag: 'Deseo' }
    },
    safety: {
      disclaimerShort: 'Marie es un espacio para pensar y probar cosas. No es terapia ni la sustituye.',
      disclaimerLong: 'Los ejercicios se inspiran en métodos de la psicología, pero no son un diagnóstico ni un tratamiento. Si algo te pesa durante mucho tiempo, buscar apoyo es una forma de cuidarte, no una debilidad.',
      helpButton: 'Buscar apoyo profesional',
      helpShort: 'Ayuda y recursos',
      sheetTitle: 'No tienes que cargar con esto sola',
      sheetIntro: 'Si ahora mismo lo estás pasando muy mal, por favor llama a alguien. La Telefonseelsorge es gratuita, anónima y siempre disponible (en alemán).',
      urgent: 'Ante un peligro inmediato para ti o para otras personas: 112.',
      resources: [
        { id: 'tel', name: 'Telefonseelsorge', number: '0800 111 0 111', tel: '08001110111', desc: 'Gratuita, anónima, 24 h. También 0800 111 0 222 y 116 123. Chat y correo: telefonseelsorge.de' },
        { id: '116117', name: 'Terminservicestelle', number: '116 117', tel: '116117', desc: 'Te ayuda a conseguir cita en una consulta de psicoterapia. Gratuita, con la tarjeta del seguro médico.' },
        { id: 'gewalt', name: 'Hilfetelefon Gewalt gegen Frauen', number: '116 016', tel: '116016', desc: 'Confidencial y gratuita, 24 h, en muchos idiomas.' },
        { id: 'emergency', name: 'Emergencias', number: '112', tel: '112', desc: 'Ante un peligro inmediato.' }
      ],
      therapistSearch: { name: 'Encontrar psicoterapeuta', desc: 'Buscador de las cámaras de psicoterapeutas: psych-info.de', url: 'https://www.psych-info.de' },
      verify: 'Datos de 2026. Ante la duda, comprueba los números.',
      call: 'Llamar'
    },
    privacy: {
      dataTitle: 'Tus datos',
      dataLead: 'Todo lo que escribes aquí se queda en este navegador, en este dispositivo. No hay cuenta, ni servidor, ni seguimiento.',
      points: [
        'No se envía nada sin que tú lo decidas.',
        'Los datos no están cifrados: quien use tu dispositivo desbloqueado podría leerlos. Usa bloqueo de pantalla.',
        'Si borras los datos del navegador, tus registros desaparecen. Expórtalos si te importan.'
      ],
      export: 'Exportar mis datos',
      erase: 'Borrar todo',
      eraseConfirm: '¿Borrar absolutamente todo? No se puede deshacer.',
      erased: 'Todo borrado.'
    }
  },

  en: {
    language: { label: 'Language', choose: 'Choose language', names: { de: 'Deutsch', es: 'Español', en: 'English' } },
    a11y: { skip: 'Skip to content', mainNav: 'Main navigation', back: 'Back', close: 'Close' },
    common: {
      back: 'Back', save: 'Save', saved: 'Saved', cancel: 'Cancel', delete: 'Delete',
      next: 'Next', previous: 'Previous', done: 'Done', close: 'Close', optional: 'optional',
      add: 'Add', edit: 'Edit', today: 'Today', yesterday: 'Yesterday', skip: 'Skip',
      noEntries: "Nothing here yet. That's perfectly fine.", history: 'History', entries: 'Entries',
      onlyOnDevice: 'Stays on this device only.', writeHere: 'Write whatever comes…',
      minutes: 'min', seconds: 'sec', start: 'Start', stop: 'Stop', again: 'Again'
    },
    tabs: {
      rose: { label: 'Today', desc: "Arrive and see what's up now", tag: 'Home' },
      space: { label: 'My space', desc: 'All your tools in one place', tag: 'Tools' },
      skin: { label: 'Body', desc: 'Skin, cycle and rest', tag: 'Body' },
      hobbies: { label: 'Create', desc: 'Curiosity, play and things that bring you joy', tag: 'Play' },
      dreams: { label: 'Dreams', desc: 'Wishes, letters and what wants to come', tag: 'Future' },
      profile: { label: 'Me', desc: 'Values, progress and what matters to you', tag: 'Me' },
      aura: { label: 'Fire & Desire', desc: 'Self-determination, desire and boundaries', tag: 'Desire' }
    },
    safety: {
      disclaimerShort: "Marie is a space to reflect and try things out. It isn't therapy and doesn't replace it.",
      disclaimerLong: "The exercises are inspired by methods from psychology, but they are not a diagnosis or a treatment. If something weighs on you for a long time, getting support is a way of taking care of yourself, not a weakness.",
      helpButton: 'Find professional support',
      helpShort: 'Help & resources',
      sheetTitle: "You don't have to carry this alone",
      sheetIntro: "If you're really struggling right now, please call someone. Telefonseelsorge is free, anonymous and always available (in German).",
      urgent: 'If you or someone else is in immediate danger: 112.',
      resources: [
        { id: 'tel', name: 'Telefonseelsorge', number: '0800 111 0 111', tel: '08001110111', desc: 'Free, anonymous, 24/7. Also 0800 111 0 222 and 116 123. Chat and email: telefonseelsorge.de' },
        { id: '116117', name: 'Terminservicestelle', number: '116 117', tel: '116117', desc: 'Helps you get an appointment for a psychotherapy consultation. Free, with your health insurance card.' },
        { id: 'gewalt', name: 'Hilfetelefon Gewalt gegen Frauen', number: '116 016', tel: '116016', desc: 'Confidential and free, 24 hours, many languages.' },
        { id: 'emergency', name: 'Emergency', number: '112', tel: '112', desc: 'For immediate danger.' }
      ],
      therapistSearch: { name: 'Find a psychotherapist', desc: "The chambers' psychotherapist search: psych-info.de", url: 'https://www.psych-info.de' },
      verify: 'Information as of 2026. If in doubt, double-check the numbers.',
      call: 'Call'
    },
    privacy: {
      dataTitle: 'Your data',
      dataLead: 'Everything you write here stays in this browser on this device. There is no account, no server and no tracking.',
      points: [
        'Nothing is sent anywhere unless you decide so.',
        "The data isn't encrypted: anyone using your unlocked device could read it. Use a screen lock.",
        'If you clear browser data, your entries are gone. Export them if they matter to you.'
      ],
      export: 'Export my data',
      erase: 'Delete everything',
      eraseConfirm: 'Really delete everything? This cannot be undone.',
      erased: 'Everything deleted.'
    }
  }
};
