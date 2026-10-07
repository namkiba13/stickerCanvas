export default {
  label: "Nederlands", htmlLang: "nl", ogLocale: "nl_NL",
  site: { title: "94 Tools — Gratis online tools, direct te gebruiken", description: "Zet getallen om naar Vietnamese woorden, tel woorden en tekens, maak stickers van foto’s. Gratis, zonder account en verwerkt in je browser.", tagline: "Handige hulpjes voor elke dag, gratis." },
  ui: {
    skip: "Naar de hoofdinhoud", menu: "Hoofdmenu", language: "Taal", home: "Home", allTools: "Alle tools", tools: "Tools", blog: "Blog (Vietnamees)", about: "Over ons", aboutFooter: "Over ons · Privacy · Broncode",
    heroTitle: (b) => `Snel klaar met ${b}`, heroDesc: "Verhoog je productiviteit met 94 Tools – gratis online tools om je taken in een handomdraai af te ronden! Getallen omzetten naar woorden, woorden tellen, stickers maken van foto’s en meer, allemaal in je browser.",
    search: "Tools zoeken", searchPlaceholder: "Zoek in alle tools", noResults: "Geen resultaten", categories: "Toolcategorieën",
    seeAll: (c) => `Bekijk alle ${c.toLowerCase()}`, tryTool: (t) => `Probeer ${t}`, allOf: (c) => `Alle ${c.toLowerCase()}`, searchIn: (c) => `Zoek in ${c.toLowerCase()}`, back: "Terug naar home", categoryTitle: (c) => `Gratis online ${c.toLowerCase()}`,
    seeExamples: "Bekijk voorbeelden", options: "Toolopties", whatIs: (t) => `Wat is ${t}?`, examples: (t) => `Voorbeelden: ${t}`, clickToTry: "Klik om te proberen!", tryExample: "Probeer voorbeeld", moreTools: "Meer tools voor jou",
    import: "Importeren uit bestand", clear: "Wissen", download: "Downloaden", copy: "Kopiëren",
  },
  quick: ["Bedrag in Vietnamese woorden", "Woorden tellen", "Sticker maken", "Excel-kolom omzetten", "Tekens tellen", "Achtergrond verwijderen"],
  categories: [
    { name: "Getaltools", description: "Tools voor getallen – zet bedragen om naar Vietnamese woorden en lees hele kolommen getallen uit Excel voor facturen, bonnen, contracten en meer." },
    { name: "Teksttools", description: "Tools voor tekst – tel woorden, tekens met en zonder spaties en regels voor artikelen, huiswerk, productbeschrijvingen en meer." },
    { name: "Afbeeldingstools", description: "Tools voor afbeeldingen – verwijder de achtergrond, voeg een rand en tekst toe en maak PNG-stickers in je browser, zonder installatie." },
  ],
  tools: [
    {
      name: "Getallen naar Vietnamese woorden", short: "Bedragen in Vietnamese woorden uitschrijven", keywords: "getal naar woorden vietnamees bedrag dong factuur excel uitschrijven",
      description: "Schrijf bedragen uit in het Vietnamees. Plak een hele Excel-kolom en kopieer alle resultaten in één keer.",
      title: "Getallen naar Vietnamese woorden — Excel-kolommen", meta: "Gratis converter die getallen uitschrijft in Vietnamese woorden. Ondersteunt bedragen in đồng, negatieve getallen, decimalen en meerdere Excel-regels.",
      info: "De converter van getallen naar Vietnamese woorden zet een getal – zoals een bedrag op een factuur, bon of contract – om in de uitgeschreven Vietnamese vorm. Voer één getal in of plak een hele kolom uit Excel, kies het scheidingstekenformaat en de eenheid, en kopieer of download het resultaat. De uitvoer is altijd Vietnamees.",
      prose: `<h2>Zo zet je getallen om naar Vietnamese woorden</h2><ol><li>Kies het Vietnamese of internationale formaat dat bij je gegevens past.</li><li>Typ een getal of plak een kolom getallen uit Excel in het linkervak.</li><li>Controleer het resultaat, klik eronder op <strong>Kopiëren</strong> en plak het in je spreadsheet of document.</li></ol><p>Bijvoorbeeld: <code>1.250.000</code> in Vietnamees formaat wordt <strong>một triệu hai trăm năm mươi nghìn đồng</strong> (één miljoen tweehonderdvijftigduizend đồng). Kies „Geen eenheid” om alleen het getal te lezen.</p><h2>Hoe worden punt en komma gelezen?</h2><p>In Vietnamees formaat scheidt de punt de duizendtallen en geeft de komma de decimalen aan: <code>1.234,5</code>. Het internationale formaat draait dat om: <code>1,234.5</code>. Groepen van duizendtallen moeten precies drie cijfers hebben; de tool raadt nooit naar onjuiste invoer.</p><h2>Veelgestelde vragen</h2><details><summary>Worden grote en negatieve getallen ondersteund?</summary><p>Ja. De invoer blijft een tekenreeks, zodat er geen cijfers verloren gaan bij de integer-limiet van JavaScript. Negatieve getallen worden gelezen met het voorvoegsel „âm”.</p></details><details><summary>Hoe wordt het decimale deel gelezen?</summary><p>Het decimale deel wordt gelezen na het woord „phẩy”, gevolgd door de gekozen eenheid. De tool rekent breuken niet om en rondt bedragen niet af.</p></details><details><summary>Kan ik het gebruiken voor facturen?</summary><p>Je kunt het resultaat naar je documenten kopiëren. Controleer altijd het bedrag, de scheidingstekens en de eenheid volgens de eisen van het document.</p></details>`,
    },
    {
      name: "Woorden- en tekenteller", short: "Tel woorden, tekens en regels", keywords: "woorden tellen tekenteller letters regels tekstlengte",
      description: "Bekijk woorden, tekens en regels terwijl je typt. Werkt met accenten, alle talen en emoji.",
      title: "Gratis online woordenteller en tekenteller", meta: "Tel woorden, tekens met en zonder spaties en regels terwijl je typt. Werkt met accenten en emoji; je tekst verlaat je browser niet.",
      info: "De woorden- en tekenteller laat direct zien hoeveel woorden, tekens met en zonder spaties en regels je tekst heeft. Handig bij schrijven met een woordlimiet, productbeschrijvingen, SEO-titels of berichten voor sociale media.",
      prose: `<h2>Hoe werkt de woordenteller?</h2><p>Plak je tekst in het vak <strong>Tekst</strong>. De tellingen worden live bijgewerkt, zodat je de lengte van artikelen, huiswerk, productbeschrijvingen of berichten kunt controleren.</p><h2>Duidelijke telregels</h2><ul><li><strong>Woorden gescheiden door spaties:</strong> elke groep gescheiden door spaties, tabs of regeleinden met minstens één letter of cijfer telt als één. „Hallo grote mooie wereld” telt 4.</li><li><strong>Tekens:</strong> zichtbare tekens (Unicode-grafemen), inclusief spaties en regeleinden. Een samengestelde gezin-emoji telt als 1.</li><li><strong>Tekens zonder spaties:</strong> zonder spaties, tabs en regeleinden.</li><li><strong>Regels:</strong> volgens de regeleinden die je typt; automatische terugloop op het scherm telt niet. Een leeg vak heeft 0 regels.</li></ul><p>Woorden worden geteld op witruimte, niet met taalkundige analyse; talen zonder spaties (zoals Chinees of Japans) tellen daardoor elk tekstblok als één woord. Losse leestekens of emoji zijn geen woorden.</p><h2>Veelgestelde vragen</h2><details><summary>Waarom wijkt de telling af van Word of een sociaal netwerk?</summary><p>Platforms splitsen woorden en tellen emoji op hun eigen manier. Gebruik de teller van het doelplatform als je een vaste limiet moet halen.</p></details><details><summary>Wordt mijn tekst op een server opgeslagen?</summary><p>Nee. Het tellen gebeurt in je browser en er wordt niets geüpload. Het vak wordt niet bewaard na het herladen van de pagina.</p></details>`,
    },
    {
      name: "Stickers maken van foto’s", short: "Achtergrond verwijderen, rand toevoegen, PNG exporteren", keywords: "sticker maken achtergrond verwijderen png rand uitknippen transparant",
      description: "Verwijder de achtergrond, voeg een rand en tekst toe en exporteer als PNG. Maak van je foto een sticker in je browser.",
      title: "Stickers maken van foto’s — Achtergrond verwijderen", meta: "Maak gratis stickers van foto’s in je browser. Verwijder de achtergrond, voeg randen en tekst toe en download PNG met de Sticker Canvas-editor.",
      info: "De stickermaker maakt van een foto een sticker: verwijder de achtergrond op je apparaat, voeg een witte rand toe, zet er tekst bij en download een PNG-bestand. Geen app of account nodig; je foto wordt niet naar een server geüpload om de achtergrond te verwijderen.",
      prose: `<h2>Zo maak je een sticker van een foto</h2><ol><li>Klik op <strong>Stickermaker openen</strong> en gebruik de uploadknop of sleep een foto naar het canvas.</li><li>Selecteer de foto op het canvas en kies <strong>Remove background</strong> in het bewerkingspaneel.</li><li>Pas de rand (Outline) en grootte aan of voeg tekst toe met het tekstgereedschap.</li><li>Met de PNG-knop van de geselecteerde afbeelding download je alleen de sticker; de download in het canvasmenu exporteert de hele lay-out.</li></ol><h2>Achtergrond verwijderen op je apparaat</h2><p>Het beeldmodel draait in je browser. Foto’s worden niet naar een API voor achtergrondverwijdering gestuurd. Bij het eerste gebruik worden de verwerkingsbestanden gedownload; je browser kan ze in de cache bewaren.</p><p>Scherpe foto’s met een onderwerp dat duidelijk loskomt van de achtergrond werken het best. Haar, transparante voorwerpen en drukke achtergronden kunnen randen achterlaten of details verliezen. Controleer het resultaat voor je downloadt.</p><h2>Veelgestelde vragen</h2><details><summary>Heeft de gedownloade PNG een transparante achtergrond?</summary><p>Na het verwijderen van de achtergrond maakt het opslaan van de geselecteerde afbeelding een sticker-PNG. Het exporteren van het hele canvas bevat de papieren achtergrond en alle elementen; beide exports verschillen.</p></details><details><summary>Werkt het op mijn telefoon?</summary><p>Ja, de interface past zich aan kleine schermen aan. Achtergrondverwijdering vraagt geheugen en tijd; nieuwere apparaten geven een betere ervaring.</p></details><details><summary>Maakt het WhatsApp- of Zalo-stickerpakketten?</summary><p>Het maakt en downloadt momenteel PNG-afbeeldingen. Of je ze als stickerpakket kunt importeren, hangt af van je berichtenapp.</p></details>`,
    },
  ],
  number: {
    label: "Getallen omzetten naar woorden", input: "Getallen", result: "Resultaat in Vietnamese woorden", placeholder: "Eén getal per regel, bijv. 1250000", resultPlaceholder: "Het resultaat verschijnt hier…",
    help: "Maximaal 30.000 tekens, 300 tekens per getal. Lege regels blijven behouden, zodat je terug kunt plakken in Excel.", noscript: "Schakel JavaScript in om getallen op je apparaat om te zetten.",
    groups: [
      { title: "Getalnotatie", choices: [["Vietnamees: 1.234.567,89", "Punt scheidt duizendtallen, komma voor de decimalen."], ["Internationaal: 1,234,567.89", "Komma scheidt duizendtallen, punt voor de decimalen."]] },
      { title: "Eenheid aan het eind", choices: [["Đồng (VND)", "Voegt „đồng” toe na het resultaat, voor geldbedragen."], ["Geen eenheid", "Leest alleen het getal."]] },
    ],
    examples: [
      ["Factuurbedrag", "Bedrag in Vietnamees formaat, met punten tussen duizendtallen en de eenheid đồng aan het eind."],
      ["Kolom uit Excel plakken", "Eén getal per regel. Lege regels blijven behouden zodat elk resultaat bij zijn cel past."],
      ["Internationaal decimaal getal", "Komma tussen duizendtallen, punt voor decimalen. Alleen het getal, zonder eenheid."],
    ],
  },
  counter: {
    label: "Tekstteller", input: "Tekst", stats: "Statistieken", placeholder: "Typ of plak je tekst hier…", help: "Maximaal 100.000 tekens. De telregels worden hieronder uitgelegd.", noscript: "Schakel JavaScript in om woorden en tekens te tellen.",
    labels: { words: "Woorden gescheiden door spaties", characters: "Tekens", withoutSpaces: "Tekens zonder spaties", lines: "Regels" },
    examples: [
      ["Groet met emoji", "Een emoji telt als één teken, maar niet als woord.", "Hallo wereld! 👋\nKleine tools maken elke dag lichter."],
      ["Productbeschrijving", "Controleer de lengte van de beschrijving voordat je die op een marktplaats zet.", "T-shirt van 100% katoen, losse pasvorm, ademend. Levering in 2–3 dagen."],
      ["Artikeltitel", "SEO-titels horen kort te zijn; tel tekens zodat ze niet worden afgekapt in zoekresultaten.", "Zo schrijf je bedragen correct in woorden op facturen"],
    ],
  },
  sticker: {
    label: "Stickermaker", input: "Invoerafbeelding", result: "Resultaat", open: "Stickermaker openen", editor: "Editor openen",
    drop: "Klik om een foto te kiezen of sleep hem hierheen. Hij opent in de stickermaker.",
    note: "Bij de eerste achtergrondverwijdering wordt een model van ongeveer 46 MB gedownload. De duur hangt af van je apparaat; de editor is in het Engels.",
  },
  about: {
    title: "Over ons, privacy & broncode", description: "Over 94 Tools, hoe je gegevens in de browser worden verwerkt en welke opensourceprojecten we gebruiken.",
    h1: "Kleine tools. Open source.", lead: "94 Tools bundelt eenvoudige hulpmiddelen waarmee je dagelijkse taken direct in je browser afhandelt.",
    html: `<h2>Gratis en zonder account</h2><p>Alle huidige tools zijn gratis. De website is gebouwd met opensourceprojecten en standaard browserfuncties.</p><h2>Je gegevens</h2><p>Tekst, getallen en afbeeldingen worden op je apparaat verwerkt en niet naar een server gestuurd om om te zetten. De stickereditor bewaart je werk in de browseropslag zodat je het later weer kunt openen. Wis op een gedeelde computer na afloop de sitegegevens in je browserinstellingen.</p><p>De server ontvangt nog wel verzoeken voor pagina’s, JavaScript en het model, inclusief technische informatie zoals je IP-adres. Deze versie bevat geen advertenties of analysetools van derden.</p><h2>Open source en licenties</h2>`,
    feedback: `<h2>Feedback en foutmeldingen</h2><p>Technische problemen kun je melden via <a href="https://github.com/namkiba13/stickerCanvas/issues">GitHub Issues</a>. Gebruik voorbeeldinhoud in plaats van privébedragen of -foto’s.</p>`,
  },
  credits: { source: "Broncode van de website en Sticker Canvas", fork: "fork van", license: "Licentie", counter: "Gebruikt als referentie; de teller op deze site volgt de witruimte- en Unicode-regels op de toolpagina.", ui: "Interface gebaseerd op", cards: "Herschreven als statische HTML en CSS; de achtergrond van de homepage komt van OmniTools. Artikelkaarten geïnspireerd door", font: "Lettertype", icons: "Iconen via", model: "Het IS-Net-model voor achtergrondverwijdering valt onder Apache-2.0. De HEIC-decoder bevat ISC/LGPLv3-componenten.", notices: "Vermeldingen van derden", modelLicense: "Modellicentie" },
  js: { line: "Regel", format: "Getal of scheidingstekens passen niet bij het gekozen formaat.", length: "Elk getal mag maximaal 300 tekens hebben.", errors: "{n} regel(s) moeten worden verbeterd. Controleer de getalnotatie bij Toolopties.", copied: "Gekopieerd.", selected: "Inhoud geselecteerd. Druk op Ctrl+C of kies Kopiëren op je telefoon.", segmenter: "Werk je browser bij om Unicode-tekens en emoji nauwkeurig te tellen.", file: "vietnamese-getallen-in-woorden.txt" },
};
