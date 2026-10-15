// src/i18n/modules/therapy.js
// Therapy-inspired psychological tools: CBT, ACT, Schema Therapy, IFS (light version).
// Grounded, respectful, clear non-substitute disclaimer and immediate professional help links.

export default {
  de: {
    hub: {
      cards: {
        therapy: {
          title: 'Therapeutische Werkzeuge',
          desc: 'TCC, ACT, Schematherapie und IFS – fundiert, alltagstauglich und sanft.'
        }
      }
    },
    therapy: {
      kicker: 'Therapeutisch inspiriert',
      title: 'Innere Klarheit & Werkzeuge',
      lead: 'Methoden aus erprobten Therapieschulen (KVT, ACT, Schematherapie, IFS), heruntergebrochen für deinen Alltag. Kein Ersatz für Therapie, aber ein verlässlicher Raum für Selbsterforschung.',
      disclaimerBox: {
        title: 'Wichtiger Hinweis & Selbstfürsorge',
        text: 'Diese Werkzeuge dienen der Selbstreflexion und Begleitung im Alltag. Sie stellen keine Diagnostik, Heilbehandlung oder Psychotherapie dar. Wenn du anhaltenden Leidensdruck verspürst oder dich überfordert fühlst, hole dir bitte professionelle Begleitung.',
        supportCta: 'Professionelle Hilfe in Deutschland finden'
      },
      tabs: {
        cbt: 'KVT (Gedanken)',
        act: 'ACT (Entschärfen)',
        schema: 'Schemamodi',
        ifs: 'Innere Anteile (IFS)'
      },
      cbt: {
        title: 'Kognitive Umstrukturierung (KVT)',
        subtitle: 'Automatische Gedanken überprüfen',
        intro: 'Gedanken sind Hypothesen, keine unumstößlichen Tatsachen. Wenn ein Gedanke dich quält, lohnt sich der neutrale Realitäts-Check.',
        step1Label: '1. Der quälende Gedanke',
        step1Placeholder: 'Z. B.: „Ich habe das vermasselt und alle halten mich für unfähig.“',
        step2Label: '2. Was spricht DAFÜR? (Nur belegbare Fakten)',
        step2Placeholder: 'Nur nackte Tatsachen, keine Annahmen oder Gefühle …',
        step3Label: '3. Was spricht DAGEGEN? (Fakten, die widersprechen)',
        step3Placeholder: 'Was habe ich gut gelöst? Welche Beweise sprechen gegen diese Katastrophe?',
        step4Label: '4. Ein ausgewogener, realistischer Blickwinkel',
        step4Placeholder: 'Z. B.: „Es war nicht perfekt, aber ich habe mein Bestes gegeben und kann daraus lernen.“',
        distortionsTitle: 'Häufige Denkfallen erkennen:',
        distortions: [
          { name: 'Schwarz-Weiß-Denken', desc: 'Nur Perfektion oder totales Versagen, kein Dazwischen.' },
          { name: 'Katastrophisieren', desc: 'Automatisch das schlimmste denkbare Szenario annehmen.' },
          { name: 'Gedankenlesen', desc: 'Glauben zu wissen, was andere schlecht über einen denken.' },
          { name: 'Gefühlslogik', desc: '„Ich fühle mich unfähig, also bin ich es auch.“' }
        ],
        saveBtn: 'Gedanken-Check speichern'
      },
      act: {
        title: 'Akzeptanz & Defusion (ACT)',
        subtitle: 'Dich von verstrickten Gedanken lösen',
        intro: 'In der Akzeptanz- und Commitment-Therapie versuchen wir nicht, Gedanken gewaltsam wegzudrängen. Wir schaffen Distanz, damit sie nicht mehr das Steuer deines Lebens übernehmen.',
        stickyThoughtLabel: 'Welcher Gedanke klebt gerade hartnäckig an dir?',
        stickyPlaceholder: 'Z. B.: „Ich bin nicht gut genug für diese Aufgabe.“',
        defusionExerciseTitle: 'Probiere diese 3 Defusions-Stufen:',
        stepA: 'Stufe 1 (Roh):',
        stepB: 'Stufe 2 (Beobachtung):',
        stepBTemplate: '„Ich bemerke den Gedanken, dass {thought}.“',
        stepC: 'Stufe 3 (Selbst als Kontext):',
        stepCTemplate: '„Ich bemerke, dass mein Verstand gerade die Geschichte erzählt, dass {thought}.“',
        willingnessTitle: 'Bereitschaft & Werte-Schritt',
        willingnessQ: 'Darf dieser Gedanke wie ein Gast da sein, während du trotzdem einen kleinen Schritt für etwas tust, das dir wichtig ist?',
        valueStepLabel: 'Mein werteorientierter Schritt heute (trotz des Gedankens):',
        valueStepPlaceholder: 'Z. B.: Ein Kapitel lesen, den Entwurf abschicken, spazieren gehen …',
        saveBtn: 'Defusion festhalten'
      },
      schema: {
        title: 'Schematherapie: Modi-Arbeit',
        subtitle: 'Welcher Anteil spricht gerade in dir?',
        intro: 'In der Schematherapie unterscheiden wir emotionale Zustände. Wenn wir den inneren Kritiker entlarven, kann die gesunde Erwachsene für das verletzliche Kind einstehen.',
        selectModeLabel: 'Welcher Modus steht gerade im Vordergrund?',
        modes: {
          vulnerableChild: {
            name: 'Verletzliches Kind',
            emoji: '🥺',
            desc: 'Fühlt sich klein, ängstlich, überfordert, allein gelassen oder unzulänglich.',
            needs: 'Braucht: Schutz, Trost, Verlässlichkeit und bedingungslose Annahme.'
          },
          punitiveCritic: {
            name: 'Strafender/Fordernder Kritiker',
            emoji: '⚖️',
            desc: 'Entwertet, treibt unbarmherzig an, erzeugt Schuld und Scham („Du musst mehr tun, reiß dich zusammen“).',
            needs: 'Braucht: Klare Grenzen vom Gesunden Erwachsenen („Stopp, so sprichst du nicht mit mir“).'
          },
          healthyAdult: {
            name: 'Gesunder Erwachsener',
            emoji: '🌿',
            desc: 'Sieht die Realität klar, setzt liebevolle Grenzen, tröstet das Kind und handelt nach eigenen Werten.',
            needs: 'Aufgabe: Den Kritiker in die Schranken weisen und das Kind beschützen.'
          }
        },
        dialoguePrompt: 'Was sagt der Gesunde Erwachsene heute liebevoll und bestimmt dazu?',
        dialoguePlaceholder: '„Ich sehe, dass du Angst hast, und das ist vollkommen verständlich. Ich bin jetzt da und passe auf dich auf. Und an den Kritiker: Wir machen das in unserem Tempo.“',
        saveBtn: 'Modus-Dialog speichern'
      },
      ifs: {
        title: 'Internal Family Systems (IFS light)',
        subtitle: 'Begegne deinen inneren Teilen mit dem Selbst',
        intro: 'Jeder Mensch besteht aus einer inneren Familie von Teilen. Keiner deiner Teile ist böse – selbst die anstrengenden (wie Perfektionismus oder Rückzug) versuchen dich vor altem Schmerz zu beschützen.',
        step1: '1. Den Teil lokalisieren',
        step1Help: 'Welcher Teil meldet sich (z. B. die Perfektionistin, die Vermeiderin, die Ängstliche)? Wo spürst du ihn im Körper?',
        partNamePlaceholder: 'Name des Teils (z. B. Die Perfektionistin)',
        partBodyPlaceholder: 'Körperempfindung (z. B. Druck im Nacken, Enge in der Brust)',
        step2: '2. Neugier statt Ablehnung',
        step2Help: 'Stelle dir vor, du begegnest diesem Teil mit Mitgefühl und ruhiger Neugier (dem 8C-Selbst: Calm, Curious, Compassionate).',
        step2Q: 'Frage ihn innerlich: „Wovor hast du Angst, was passieren würde, wenn du diesen Job nicht machst?“',
        partFearsPlaceholder: 'Seine Antwort: „Ich habe Angst, dass wir abgelehnt werden / die Kontrolle verlieren …“',
        step3: '3. Dank & Entlastung',
        step3Help: 'Bedanke dich bei dem Teil für seine gute Absicht und signalisiere ihm, dass du heute erwachsen bist.',
        partAppreciationPlaceholder: '„Danke, dass du mich beschützen willst. Du musst das nicht mehr alleine stemmen.“',
        saveBtn: 'Teile-Arbeit dokumentieren'
      },
      history: {
        title: 'Gespeicherte Reflexionen',
        empty: 'Noch keine therapeutischen Notizen gespeichert.',
        delete: 'Eintrag löschen'
      }
    }
  },
  es: {
    hub: {
      cards: {
        therapy: {
          title: 'Herramientas terapéuticas',
          desc: 'TCC, ACT, Terapia de Esquemas e IFS: fundamentadas, prácticas y compasivas.'
        }
      }
    },
    therapy: {
      kicker: 'Inspiración psicoterapéutica',
      title: 'Claridad interna y herramientas',
      lead: 'Métodos basados en modelos clínicos contrastados (TCC, ACT, Esquemas, IFS) adaptados a tu vida cotidiana. No sustituyen la terapia profesional, pero te ofrecen un espacio riguroso de autoexploración.',
      disclaimerBox: {
        title: 'Aviso importante y autocuidado',
        text: 'Estas herramientas están diseñadas para la autorreflexión y el apoyo cotidiano. No constituyen diagnóstico, intervención clínica ni psicoterapia. Si experimentas un sufrimiento prolongado o desbordamiento, busca acompañamiento profesional.',
        supportCta: 'Buscar apoyo profesional en Alemania'
      },
      tabs: {
        cbt: 'TCC (Pensamientos)',
        act: 'ACT (Defusión)',
        schema: 'Modos de Esquema',
        ifs: 'Partes internas (IFS)'
      },
      cbt: {
        title: 'Reestructuración cognitiva (TCC)',
        subtitle: 'Comprobar pensamientos automáticos',
        intro: 'Los pensamientos son hipótesis neuronales, no verdades irrefutables. Cuando un pensamiento te atormenta, conviene someterlo a una prueba de realidad neutral.',
        step1Label: '1. El pensamiento que te angustia',
        step1Placeholder: 'Ej.: «He metido la pata y todos pensarán que soy incompetente.»',
        step2Label: '2. ¿Qué pruebas objetivas hay A FAVOR? (Solo hechos comprobables)',
        step2Placeholder: 'Solo hechos neutros, sin suposiciones ni proyecciones emocionales…',
        step3Label: '3. ¿Qué pruebas hay EN CONTRA? (Hechos que lo contradicen)',
        step3Placeholder: '¿Qué cosas sí salieron bien? ¿Qué evidencias desmienten la catástrofe?',
        step4Label: '4. Perspectiva equilibrada y compasiva',
        step4Placeholder: 'Ej.: «No salió impecable, pero hice lo mejor que pude con los recursos que tenía y puedo aprender de ello.»',
        distortionsTitle: 'Distorsiones cognitivas habituales:',
        distortions: [
          { name: 'Pensamiento todo o nada', desc: 'O perfección absoluta o fracaso total, sin matices.' },
          { name: 'Catastrofismo', desc: 'Asumir automáticamente el peor escenario imaginable.' },
          { name: 'Lectura de pensamiento', desc: 'Creer saber lo que otros piensan mal de ti sin pruebas.' },
          { name: 'Razonamiento emocional', desc: '«Si me siento incapaz, es que lo soy.»' }
        ],
        saveBtn: 'Guardar examen de pensamiento'
      },
      act: {
        title: 'Aceptación y defusión (ACT)',
        subtitle: 'Tomar distancia de pensamientos pegajosos',
        intro: 'En la Terapia de Aceptación y Compromiso no intentamos eliminar los pensamientos por la fuerza. Cambiamos la relación con ellos para que dejen de gobernar tus actos.',
        stickyThoughtLabel: '¿Qué pensamiento está atascado en tu mente ahora mismo?',
        stickyPlaceholder: 'Ej.: «No valgo para esto, no seré capaz.»',
        defusionExerciseTitle: 'Prueba estos 3 niveles de defusión:',
        stepA: 'Nivel 1 (Crudo):',
        stepB: 'Nivel 2 (Observación):',
        stepBTemplate: '«Noto que estoy teniendo el pensamiento de que {thought}.»',
        stepC: 'Nivel 3 (El Yo como contexto):',
        stepCTemplate: '«Me doy cuenta de que mi mente me está contando la historia de que {thought}.»',
        willingnessTitle: 'Disposición y acción comprometida',
        willingnessQ: '¿Puede estar este pensamiento presente como un pasajero ruidoso mientras tú das un paso hacia lo que de verdad valoras?',
        valueStepLabel: 'Mi paso con sentido para hoy (incluso con ese pensamiento presente):',
        valueStepPlaceholder: 'Ej.: Leer un capítulo, enviar el correo pendiente, dar un paseo…',
        saveBtn: 'Guardar defusión'
      },
      schema: {
        title: 'Terapia de Esquemas: Trabajo con modos',
        subtitle: '¿Qué estado interno está tomando el micrófono?',
        intro: 'En la terapia de esquemas identificamos diferentes estados emocionales. Al desenmascarar al crítico interior, tu adulta sana puede acoger y proteger a tu niña vulnerable.',
        selectModeLabel: '¿Qué modo predomina en este momento?',
        modes: {
          vulnerableChild: {
            name: 'Niña vulnerable',
            emoji: '🥺',
            desc: 'Se siente pequeña, sola, desbordada, defectuosa o con miedo al rechazo.',
            needs: 'Necesita: Seguridad, consuelo, afecto incondicional y protección.'
          },
          punitiveCritic: {
            name: 'Crítico punitivo / exigente',
            emoji: '⚖️',
            desc: 'Juzga con dureza, exige perfección y castiga con culpa y vergüenza («tienes que esforzarte más»).',
            needs: 'Necesita: Límites firmes impuestos por la Adulta Sana («Basta, no te permito hablarme así»).'
          },
          healthyAdult: {
            name: 'Adulta sana',
            emoji: '🌿',
            desc: 'Ve la realidad con serenidad, protege a la niña, pone límites al crítico y guía según valores propios.',
            needs: 'Misión: Frenar al crítico y acoger a la niña vulnerable con ternura.'
          }
        },
        dialoguePrompt: '¿Qué le responde hoy tu Adulta Sana con firmeza y ternura?',
        dialoguePlaceholder: '«Veo que tienes miedo y es totalmente comprensible. Yo me hago cargo ahora y te protejo. Y al crítico: no te necesitamos juzgando; lo haremos a nuestro ritmo.»',
        saveBtn: 'Guardar diálogo de modos'
      },
      ifs: {
        title: 'Sistemas de la Familia Interna (IFS ligero)',
        subtitle: 'Mirar a tus partes desde el Self compasivo',
        intro: 'Todas las personas albergan una constelación de partes internas. Ninguna es intrínsecamente mala: incluso las más reactivas (la autoexigente, la evitativa) intentan evitar que sufras.',
        step1: '1. Localizar la parte',
        step1Help: '¿Qué parte pide atención (ej. la perfeccionista, la que quiere huir, la que desconfía)? ¿Dónde la sientes en el cuerpo?',
        partNamePlaceholder: 'Nombre de la parte (ej. La hipervigilante)',
        partBodyPlaceholder: 'Sensación corporal (ej. Tensión en hombros, nudo en la garganta)',
        step2: '2. Curiosidad sin rechazo',
        step2Help: 'Imagina que te acercas a ella desde tu Self tranquilo, compasivo y curioso (las 8 cualidades del Self de Schwartz).',
        step2Q: 'Pregúntale internamente: «¿Qué temes que ocurra si dejas de hacer este trabajo tan duro?»',
        partFearsPlaceholder: 'Su respuesta: «Temo que si bajo la guardia nos hagan daño / fracasemos…»',
        step3: '3. Agradecimiento y reparación',
        step3Help: 'Agradécele su esfuerzo por mantenerte a salvo y hazle saber que hoy eres una mujer adulta capaz de cuidarse.',
        partAppreciationPlaceholder: '«Gracias por intentar protegerme durante tantos años. Ya no tienes que llevar todo el peso sola.»',
        saveBtn: 'Guardar sesión de partes'
      },
      history: {
        title: 'Reflexiones registradas',
        empty: 'Aún no hay registros en este módulo.',
        delete: 'Eliminar registro'
      }
    }
  },
  en: {
    hub: {
      cards: {
        therapy: {
          title: 'Therapeutic tools',
          desc: 'CBT, ACT, Schema Therapy, and IFS – clinically grounded, gentle, practical.'
        }
      }
    },
    therapy: {
      kicker: 'Therapy-inspired',
      title: 'Inner clarity & tools',
      lead: 'Techniques distilled from evidence-based therapies (CBT, ACT, Schema Therapy, IFS) crafted for everyday life. Not a replacement for psychotherapy, but a safe space for inner exploration.',
      disclaimerBox: {
        title: 'Important notice & self-care',
        text: 'These exercises are designed for self-reflection and daily support. They do not constitute diagnosis, clinical intervention, or psychotherapy. If you experience persistent distress, please seek professional support.',
        supportCta: 'Find professional support in Germany'
      },
      tabs: {
        cbt: 'CBT (Thoughts)',
        act: 'ACT (Defusion)',
        schema: 'Schema Modes',
        ifs: 'Inner Parts (IFS)'
      },
      cbt: {
        title: 'Cognitive Restructuring (CBT)',
        subtitle: 'Reality-testing automatic thoughts',
        intro: 'Thoughts are neurological hypotheses, not absolute facts. When a thought creates distress, test it gently against reality.',
        step1Label: '1. The distressing thought',
        step1Placeholder: 'E.g.: "I made a mistake and now everyone thinks I am incompetent."',
        step2Label: '2. What concrete evidence supports it? (Objective facts only)',
        step2Placeholder: 'Only hard facts, no assumptions, projections, or emotional reasoning…',
        step3Label: '3. What evidence contradicts it? (Counter-facts)',
        step3Placeholder: 'What went well? What evidence disproves the catastrophe?',
        step4Label: '4. A balanced, compassionate reframe',
        step4Placeholder: 'E.g.: "It wasn\'t flawless, but I did my best with the energy I had, and I can learn from this."',
        distortionsTitle: 'Common cognitive distortions:',
        distortions: [
          { name: 'All-or-Nothing', desc: 'Seeing things in black and white: perfection or total failure.' },
          { name: 'Catastrophizing', desc: 'Automatically leaping to the worst imaginable outcome.' },
          { name: 'Mind Reading', desc: 'Assuming you know people are judging you without proof.' },
          { name: 'Emotional Reasoning', desc: '"I feel inadequate, therefore I must be inadequate."' }
        ],
        saveBtn: 'Save thought record'
      },
      act: {
        title: 'Acceptance & Defusion (ACT)',
        subtitle: 'Unsticking from sticky thoughts',
        intro: 'In Acceptance and Commitment Therapy, we do not fight thoughts. We create psychological distance so they no longer steer your choices.',
        stickyThoughtLabel: 'Which sticky thought is occupying your mind right now?',
        stickyPlaceholder: 'E.g.: "I am not good enough to handle this."',
        defusionExerciseTitle: 'Try these 3 levels of defusion:',
        stepA: 'Level 1 (Raw thought):',
        stepB: 'Level 2 (Observing):',
        stepBTemplate: '"I notice I am having the thought that {thought}."',
        stepC: 'Level 3 (Self-as-context):',
        stepCTemplate: '"I notice my mind is telling me the story that {thought}."',
        willingnessTitle: 'Willingness & committed action',
        willingnessQ: 'Can this thought be present like noisy chatter in the passenger seat, while you take a gentle step toward what truly matters to you?',
        valueStepLabel: 'My values-based step today (even with this thought around):',
        valueStepPlaceholder: 'E.g.: Read a chapter, send the email draft, go outside for fresh air…',
        saveBtn: 'Save defusion'
      },
      schema: {
        title: 'Schema Therapy: Mode Work',
        subtitle: 'Which internal voice has the floor right now?',
        intro: 'In Schema Therapy, we distinguish between emotional states. By spotting the internal critic, your Healthy Adult can step in and nurture your Vulnerable Child.',
        selectModeLabel: 'Which mode is dominating right now?',
        modes: {
          vulnerableChild: {
            name: 'Vulnerable Child',
            emoji: '🥺',
            desc: 'Feels small, helpless, overwhelmed, flawed, or terrified of abandonment.',
            needs: 'Needs: Reassurance, comfort, unconditional acceptance, and safety.'
          },
          punitiveCritic: {
            name: 'Punitive / Demanding Critic',
            emoji: '⚖️',
            desc: 'Harshly judges, demands perfection, and enforces guilt or shame ("You must do better").',
            needs: 'Needs: Firm boundaries from the Healthy Adult ("Stop, you may not speak to me like that").'
          },
          healthyAdult: {
            name: 'Healthy Adult',
            emoji: '🌿',
            desc: 'Perceives reality calmly, protects the child, sets boundaries with the critic, and acts on core values.',
            needs: 'Role: Calm the critic, comfort the child, and guide wise action.'
          }
        },
        dialoguePrompt: 'What does your Healthy Adult say today with calm firmness and compassion?',
        dialoguePlaceholder: '"I see you are frightened, and that is completely understandable. I am here now and I will take care of you. And to the critic: back off, we are doing this at our own pace."',
        saveBtn: 'Save mode dialogue'
      },
      ifs: {
        title: 'Internal Family Systems (IFS light)',
        subtitle: 'Meeting your inner parts from the Self',
        intro: 'Every person houses an internal family of parts. None of them are bad: even demanding or protective parts are trying to prevent pain.',
        step1: '1. Locate the part',
        step1Help: 'Which part is speaking (e.g. the perfectionist, the avoider, the protector)? Where do you feel it in your body?',
        partNamePlaceholder: 'Part name (e.g., The Overachiever)',
        partBodyPlaceholder: 'Body sensation (e.g., Tension in neck, tight chest)',
        step2: '2. Curiosity over judgment',
        step2Help: 'Approach this part from your core Self (Calm, Curious, Compassionate).',
        step2Q: 'Ask it gently inside: "What are you afraid would happen if you didn\'t do this job?"',
        partFearsPlaceholder: 'Its reply: "I fear we will be rejected or lose control…"',
        step3: '3. Appreciation & unburdening',
        step3Help: 'Thank the part for its protective intention and reassure it that you are an adult now.',
        partAppreciationPlaceholder: '"Thank you for trying to protect me for all these years. You don\'t have to carry this weight alone anymore."',
        saveBtn: 'Save parts check-in'
      },
      history: {
        title: 'Saved reflections',
        empty: 'No therapeutic notes recorded yet.',
        delete: 'Delete entry'
      }
    }
  }
};
