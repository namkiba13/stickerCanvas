export default {
  label: "Deutsch", htmlLang: "de", ogLocale: "de_DE",
  site: { title: "94 Tools — Kostenlose Online-Tools, sofort nutzbar", description: "Zahlen in vietnamesische Wörter umwandeln, Wörter und Zeichen zählen, Sticker aus Fotos erstellen. Kostenlos, ohne Konto, direkt im Browser verarbeitet.", tagline: "Praktische Helfer für jeden Tag, kostenlos." },
  ui: {
    skip: "Zum Hauptinhalt springen", menu: "Hauptmenü", language: "Sprache", home: "Startseite", allTools: "Alle Tools", tools: "Tools", blog: "Blog (Vietnamesisch)", about: "Über uns", aboutFooter: "Über uns · Datenschutz · Quellcode",
    heroTitle: (b) => `Schnell erledigt mit ${b}`, heroDesc: "Steigern Sie Ihre Produktivität mit 94 Tools – kostenlose Online-Werkzeuge, mit denen Sie Aufgaben im Handumdrehen erledigen! Zahlen in Wörter umwandeln, Wörter zählen, Sticker aus Fotos erstellen und mehr, alles direkt im Browser.",
    search: "Tools durchsuchen", searchPlaceholder: "Alle Tools durchsuchen", noResults: "Keine Ergebnisse", categories: "Tool-Kategorien",
    seeAll: (c) => `Alle ${c} ansehen`, tryTool: (t) => `${t} testen`, allOf: (c) => `Alle ${c}`, searchIn: (c) => `${c} durchsuchen`, back: "Zurück zur Startseite", categoryTitle: (c) => `Kostenlose Online-${c}`,
    seeExamples: "Beispiele ansehen", options: "Tool-Optionen", whatIs: (t) => `Was ist der ${t}?`, examples: (t) => `Beispiele: ${t}`, clickToTry: "Zum Ausprobieren klicken!", tryExample: "Beispiel ausprobieren", moreTools: "Weitere Tools für Sie",
    import: "Aus Datei importieren", clear: "Leeren", download: "Herunterladen", copy: "Kopieren",
  },
  quick: ["Betrag auf Vietnamesisch", "Wörter zählen", "Sticker erstellen", "Excel-Spalte umwandeln", "Zeichen zählen", "Hintergrund entfernen"],
  categories: [
    { name: "Zahlen-Tools", description: "Werkzeuge für Zahlen – Beträge in vietnamesische Wörter umwandeln und ganze Zahlenspalten aus Excel für Rechnungen, Quittungen, Verträge und mehr lesen." },
    { name: "Text-Tools", description: "Werkzeuge für Texte – Wörter, Zeichen mit und ohne Leerzeichen sowie Zeilen zählen, für Artikel, Hausaufgaben, Produktbeschreibungen und mehr." },
    { name: "Bild-Tools", description: "Werkzeuge für Bilder – Hintergrund entfernen, Umrisse und Text hinzufügen und PNG-Sticker direkt im Browser erstellen, ohne Installation." },
  ],
  tools: [
    {
      name: "Zahlen in vietnamesische Wörter", short: "Beträge auf Vietnamesisch ausschreiben", keywords: "zahl in worte vietnamesisch betrag dong rechnung excel ausschreiben",
      description: "Beträge auf Vietnamesisch ausschreiben. Ganze Excel-Spalte einfügen und alle Ergebnisse auf einmal kopieren.",
      title: "Zahlen in vietnamesische Wörter umwandeln", meta: "Kostenloser Konverter, der Zahlen in vietnamesischen Wörtern ausschreibt. Unterstützt Beträge in Đồng, negative Zahlen, Dezimalzahlen und mehrere Excel-Zeilen.",
      info: "Der Konverter für Zahlen in vietnamesische Wörter wandelt eine Zahl – etwa einen Betrag auf einer Rechnung, Quittung oder einem Vertrag – in die ausgeschriebene vietnamesische Form um. Geben Sie eine Zahl ein oder fügen Sie eine ganze Excel-Spalte ein, wählen Sie Trennzeichenformat und Einheit und kopieren oder laden Sie das Ergebnis herunter. Die Ausgabe ist immer Vietnamesisch.",
      prose: `<h2>So wandeln Sie Zahlen in vietnamesische Wörter um</h2><ol><li>Wählen Sie das vietnamesische oder internationale Format passend zu Ihren Daten.</li><li>Geben Sie eine Zahl ein oder fügen Sie eine Zahlenspalte aus Excel in das linke Feld ein.</li><li>Prüfen Sie das Ergebnis, klicken Sie darunter auf <strong>Kopieren</strong> und fügen Sie es in Tabelle oder Dokument ein.</li></ol><p>Beispiel: <code>1.250.000</code> im vietnamesischen Format lautet <strong>một triệu hai trăm năm mươi nghìn đồng</strong> (eine Million zweihundertfünfzigtausend Đồng). Wenn Sie nur die Zahl brauchen, wählen Sie „Keine Einheit“.</p><h2>Wie werden Punkt und Komma gelesen?</h2><p>Im vietnamesischen Format trennt der Punkt die Tausender und das Komma die Dezimalstellen: <code>1.234,5</code>. Das internationale Format vertauscht beide: <code>1,234.5</code>. Tausendergruppen müssen genau drei Ziffern haben; fehlerhafte Eingaben werden nicht erraten.</p><h2>Häufige Fragen</h2><details><summary>Werden große und negative Zahlen unterstützt?</summary><p>Ja. Die Eingabe bleibt eine Zeichenkette, daher gehen an der Ganzzahlgrenze von JavaScript keine Ziffern verloren. Negative Zahlen werden mit dem Präfix „âm“ gelesen.</p></details><details><summary>Wie wird der Dezimalteil gelesen?</summary><p>Der Dezimalteil folgt nach dem Wort „phẩy“, danach die gewählte Einheit. Das Tool rechnet keine Bruchteile in Untereinheiten um und rundet nicht.</p></details><details><summary>Kann ich es für Rechnungen verwenden?</summary><p>Sie können das Ergebnis in Dokumente kopieren. Prüfen Sie Betrag, Trennzeichen und Einheit vor der Verwendung anhand der Anforderungen des Belegs.</p></details>`,
    },
    {
      name: "Wort- & Zeichenzähler", short: "Wörter, Zeichen und Zeilen zählen", keywords: "wörter zählen zeichenzähler buchstaben zeilen textlänge",
      description: "Wörter, Zeichen und Zeilen schon beim Tippen prüfen. Unterstützt Umlaute, alle Sprachen und Emoji.",
      title: "Wörter zählen & Zeichen zählen — kostenlos online", meta: "Wörter, Zeichen mit und ohne Leerzeichen und Zeilen beim Tippen zählen. Funktioniert mit Umlauten und Emoji; Ihr Text verlässt den Browser nicht.",
      info: "Der Wort- & Zeichenzähler zeigt sofort, wie viele Wörter, Zeichen mit und ohne Leerzeichen und Zeilen Ihr Text hat. Praktisch beim Schreiben mit Wortlimit, für Produktbeschreibungen, SEO-Titel oder Social-Media-Beiträge.",
      prose: `<h2>Wie funktioniert der Wortzähler?</h2><p>Fügen Sie Ihren Text in das Feld <strong>Text</strong> ein. Die Zählung aktualisiert sich live, sodass Sie die Länge von Artikeln, Hausaufgaben, Produktbeschreibungen oder Beiträgen prüfen können.</p><h2>Klare Zählregeln</h2><ul><li><strong>Wörter (durch Leerzeichen getrennt):</strong> jede durch Leerzeichen, Tabulator oder Zeilenumbruch getrennte Gruppe mit mindestens einem Buchstaben oder einer Ziffer zählt als eins. „Hallo du schöne Welt“ ergibt 4.</li><li><strong>Zeichen:</strong> sichtbare Zeichen (Unicode-Grapheme), einschließlich Leerzeichen und Zeilenumbrüchen. Ein zusammengesetztes Familien-Emoji zählt als 1.</li><li><strong>Zeichen ohne Leerzeichen:</strong> ohne Leerzeichen, Tabulatoren und Zeilenumbrüche.</li><li><strong>Zeilen:</strong> nach Ihren Zeilenumbrüchen; automatischer Umbruch am Bildschirm zählt nicht. Ein leeres Feld hat 0 Zeilen.</li></ul><p>Wörter werden nach Leerraum gezählt, nicht linguistisch. Sprachen ohne Leerzeichen (etwa Chinesisch oder Japanisch) zählen daher jeden Textblock als ein Wort. Alleinstehende Satzzeichen oder Emoji sind keine Wörter.</p><h2>Häufige Fragen</h2><details><summary>Warum weicht die Zählung von Word oder sozialen Netzwerken ab?</summary><p>Plattformen trennen Wörter und zählen Emoji unterschiedlich. Nutzen Sie den Zähler der Zielplattform, wenn Sie ein bestimmtes Limit einhalten müssen.</p></details><details><summary>Wird mein Text auf einem Server gespeichert?</summary><p>Nein. Gezählt wird in Ihrem Browser, nichts wird hochgeladen. Das Feld wird nach dem Neuladen nicht gespeichert.</p></details>`,
    },
    {
      name: "Sticker aus Fotos erstellen", short: "Hintergrund entfernen, Umriss hinzufügen, PNG exportieren", keywords: "sticker erstellen hintergrund entfernen freistellen png umriss transparent",
      description: "Hintergrund entfernen, Umriss und Text hinzufügen und als PNG exportieren. Machen Sie Ihr Foto direkt im Browser zum Sticker.",
      title: "Sticker aus Fotos erstellen — Hintergrund entfernen", meta: "Kostenlos Sticker aus Fotos im Browser erstellen. Hintergrund entfernen, Umriss und Text hinzufügen und PNG mit dem Sticker-Canvas-Editor herunterladen.",
      info: "Der Sticker-Ersteller macht aus einem Foto einen Sticker: Hintergrund auf Ihrem Gerät entfernen, weißen Umriss hinzufügen, Text einfügen und als PNG herunterladen. Keine App, kein Konto; Ihr Foto wird zum Freistellen nicht auf einen Server hochgeladen.",
      prose: `<h2>So erstellen Sie einen Sticker aus einem Foto</h2><ol><li>Klicken Sie auf <strong>Sticker-Ersteller öffnen</strong> und laden Sie ein Foto hoch oder ziehen Sie es auf die Leinwand.</li><li>Wählen Sie das Foto auf der Leinwand aus und klicken Sie im Bearbeitungsfeld auf <strong>Remove background</strong>.</li><li>Passen Sie Umriss (Outline) und Größe an oder fügen Sie mit dem Textwerkzeug Text hinzu.</li><li>Mit der PNG-Schaltfläche des ausgewählten Bildes laden Sie nur den Sticker herunter; der Download im Leinwandmenü exportiert das gesamte Layout.</li></ol><h2>Freistellen direkt auf dem Gerät</h2><p>Das Bildmodell läuft in Ihrem Browser. Fotos werden an keine Freistellungs-API gesendet. Bei der ersten Nutzung werden die Verarbeitungsdateien geladen; der Browser kann sie zwischenspeichern.</p><p>Scharfe Fotos mit klar abgehobenem Motiv funktionieren am besten. Haare, transparente Objekte und unruhige Hintergründe können Ränder hinterlassen oder Details verlieren. Prüfen Sie das Ergebnis vor dem Download.</p><h2>Häufige Fragen</h2><details><summary>Hat das heruntergeladene PNG einen transparenten Hintergrund?</summary><p>Nach dem Freistellen erzeugt das Speichern des ausgewählten Bildes ein Sticker-PNG. Der Export der ganzen Leinwand enthält den Papierhintergrund und alle Layout-Elemente; beide Exporte unterscheiden sich.</p></details><details><summary>Funktioniert es auf dem Handy?</summary><p>Ja, die Oberfläche passt sich kleinen Bildschirmen an. Das Freistellen braucht Speicher und Rechenzeit; neuere Geräte bieten ein besseres Erlebnis.</p></details><details><summary>Werden WhatsApp- oder Zalo-Stickerpakete erstellt?</summary><p>Derzeit werden PNG-Bilder erstellt und heruntergeladen. Ob Sie sie als Stickerpaket importieren können, hängt von Ihrer Messenger-App ab.</p></details>`,
    },
  ],
  number: {
    label: "Zahlen in Wörter umwandeln", input: "Zahlen", result: "Ergebnis in vietnamesischen Wörtern", placeholder: "Eine Zahl pro Zeile, z. B. 1250000", resultPlaceholder: "Das Ergebnis erscheint hier…",
    help: "Bis zu 30.000 Zeichen, 300 Zeichen pro Zahl. Leerzeilen bleiben erhalten, damit Sie zurück in Excel einfügen können.", noscript: "Aktivieren Sie JavaScript, um Zahlen auf Ihrem Gerät umzuwandeln.",
    groups: [
      { title: "Zahlenformat", choices: [["Vietnamesisch: 1.234.567,89", "Punkt trennt Tausender, Komma vor Dezimalstellen."], ["International: 1,234,567.89", "Komma trennt Tausender, Punkt vor Dezimalstellen."]] },
      { title: "Einheit am Ende", choices: [["Đồng (VND)", "Fügt „đồng“ nach dem Ergebnis hinzu, für Geldbeträge."], ["Keine Einheit", "Liest nur die Zahl."]] },
    ],
    examples: [
      ["Rechnungsbetrag", "Betrag im vietnamesischen Format mit Punkt als Tausendertrennzeichen und der Einheit Đồng am Ende."],
      ["Spalte aus Excel einfügen", "Eine Zahl pro Zeile. Leerzeilen bleiben erhalten, damit die Ergebnisse beim Zurückkopieren zu den Zellen passen."],
      ["Internationale Dezimalzahl", "Komma zwischen Tausendern, Punkt vor Dezimalstellen. Nur die Zahl, ohne Einheit."],
    ],
  },
  counter: {
    label: "Textzähler", input: "Text", stats: "Statistik", placeholder: "Text hier eingeben oder einfügen…", help: "Bis zu 100.000 Zeichen. Die Zählregeln werden unten erklärt.", noscript: "Aktivieren Sie JavaScript, um Wörter und Zeichen zu zählen.",
    labels: { words: "Wörter (durch Leerzeichen getrennt)", characters: "Zeichen", withoutSpaces: "Zeichen ohne Leerzeichen", lines: "Zeilen" },
    examples: [
      ["Gruß mit Emoji", "Ein Emoji zählt als ein Zeichen, aber nicht als Wort.", "Hallo Welt! 👋\nKleine Tools machen den Alltag leichter."],
      ["Produktbeschreibung", "Länge der Beschreibung prüfen, bevor Sie sie auf einem Marktplatz einstellen.", "T-Shirt aus 100 % Baumwolle, lockere Passform, atmungsaktiv. Lieferung in 2–3 Tagen."],
      ["Artikeltitel", "SEO-Titel sollten kurz sein; zählen Sie Zeichen, damit sie in Suchergebnissen nicht abgeschnitten werden.", "So schreiben Sie Beträge auf Rechnungen korrekt in Worten"],
    ],
  },
  sticker: {
    label: "Sticker-Ersteller", input: "Eingabebild", result: "Ergebnis", open: "Sticker-Ersteller öffnen", editor: "Editor öffnen",
    drop: "Klicken, um ein Foto zu wählen, oder hierher ziehen. Es öffnet sich im Sticker-Ersteller.",
    note: "Beim ersten Freistellen wird ein Modell von etwa 46 MB geladen. Die Dauer hängt vom Gerät ab; der Editor ist auf Englisch.",
  },
  about: {
    title: "Über uns, Datenschutz & Quellcode", description: "Über 94 Tools, wie Ihre Daten im Browser verarbeitet werden und welche Open-Source-Projekte wir nutzen.",
    h1: "Kleine Tools. Open Source.", lead: "94 Tools bündelt einfache Helfer, mit denen Sie alltägliche Aufgaben direkt im Browser erledigen.",
    html: `<h2>Kostenlos, ohne Konto</h2><p>Alle aktuellen Tools sind kostenlos. Die Website basiert auf Open-Source-Projekten und Standardfunktionen des Browsers.</p><h2>Ihre Daten</h2><p>Texte, Zahlen und Bilder werden auf Ihrem Gerät verarbeitet und nicht zur Umwandlung an einen Server gesendet. Der Sticker-Editor speichert Ihre Arbeit im Browserspeicher, damit Sie sie wieder öffnen können. Löschen Sie auf gemeinsam genutzten Computern danach die Websitedaten in den Browsereinstellungen.</p><p>Der Server erhält weiterhin Anfragen für Seiten, JavaScript und das Modell, einschließlich technischer Informationen wie Ihrer IP-Adresse. Diese Version enthält keine Werbung und keine Analyse-Tools von Drittanbietern.</p><h2>Open Source und Lizenzen</h2>`,
    feedback: `<h2>Feedback und Fehlermeldungen</h2><p>Technische Probleme können Sie über <a href="https://github.com/namkiba13/stickerCanvas/issues">GitHub Issues</a> melden. Bitte verwenden Sie Beispielinhalte statt privater Beträge oder Fotos.</p>`,
  },
  credits: { source: "Quellcode der Website und von Sticker Canvas", fork: "Fork von", license: "Lizenz", counter: "Als Vorlage genutzt; der Zähler dieser Website folgt den auf der Tool-Seite beschriebenen Leerraum- und Unicode-Regeln.", ui: "Oberfläche nach dem Vorbild von", cards: "Als statisches HTML und CSS neu geschrieben; das Hintergrundbild der Startseite stammt von OmniTools. Artikelkarten inspiriert von", font: "Schrift", icons: "Icons über", model: "Das IS-Net-Modell zum Freistellen steht unter Apache-2.0. Der HEIC-Decoder enthält ISC/LGPLv3-Komponenten.", notices: "Hinweise zu Drittkomponenten", modelLicense: "Modelllizenz" },
  js: { line: "Zeile", format: "Zahl oder Trennzeichen passen nicht zum gewählten Format.", length: "Jede Zahl darf höchstens 300 Zeichen haben.", errors: "{n} Zeile(n) korrigieren. Prüfen Sie das Zahlenformat in den Tool-Optionen.", copied: "Kopiert.", selected: "Inhalt markiert. Drücken Sie Strg+C oder wählen Sie auf dem Handy „Kopieren“.", segmenter: "Bitte aktualisieren Sie Ihren Browser, um Unicode-Zeichen und Emoji genau zu zählen.", file: "vietnamesische-zahlwoerter.txt" },
};
