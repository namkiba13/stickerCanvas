export default {
  label: "English", htmlLang: "en", ogLocale: "en_US",
  site: { title: "94 Tools — Free online tools, ready to use", description: "Convert numbers to Vietnamese words, count words and characters, make stickers from photos. Free tools with no account, processed right in your browser.", tagline: "Everyday utilities, free." },
  ui: {
    skip: "Skip to main content", menu: "Main menu", language: "Language", home: "Home", allTools: "All tools", tools: "Tools", blog: "Blog (Vietnamese)", about: "About", aboutFooter: "About · Privacy · Source code",
    heroTitle: (b) => `Get Things Done Quickly with ${b}`, heroDesc: "Boost your productivity with 94 Tools – a free online toolkit for getting things done fast! Convert numbers to words, count words, make stickers from photos and more, all processed right in your browser.",
    search: "Search tools", searchPlaceholder: "Search all tools", noResults: "No results", categories: "Tool categories",
    seeAll: (c) => `See all ${c.toLowerCase()}`, tryTool: (t) => `Try ${t}`, allOf: (c) => `All ${c.toLowerCase()}`, searchIn: (c) => `Search ${c.toLowerCase()}`, back: "Back to home", categoryTitle: (c) => `Free online ${c.toLowerCase()}`,
    seeExamples: "See examples", options: "Tool options", whatIs: (t) => `What is ${t}?`, examples: (t) => `${t} examples`, clickToTry: "Click to try!", tryExample: "Try example", moreTools: "More tools for you",
    import: "Import from file", clear: "Clear", download: "Download", copy: "Copy",
  },
  quick: ["Vietnamese amount in words", "Count words", "Make a sticker", "Convert an Excel column", "Count characters", "Remove image background"],
  categories: [
    { name: "Number tools", description: "Tools for working with numbers – convert amounts to Vietnamese words, read a whole column of numbers from Excel for invoices, receipts, contracts and more." },
    { name: "Text tools", description: "Tools for working with text – count words, characters with and without spaces, and lines for articles, homework, product descriptions and more." },
    { name: "Image tools", description: "Tools for working with images – remove backgrounds, add outlines and text, and create PNG stickers right in your browser, nothing to install." },
  ],
  tools: [
    {
      name: "Vietnamese number to words", short: "Spell out amounts in Vietnamese", keywords: "number to words vietnamese dong amount invoice excel spell out",
      description: "Spell out amounts in Vietnamese. Paste a whole Excel column and copy all results at once.",
      title: "Vietnamese Number to Words Converter — Paste Excel Columns", meta: "Free converter that spells out numbers in Vietnamese words. Supports amounts in đồng, negative and decimal numbers, and multiple Excel lines.",
      info: "Vietnamese number to words is an online tool that turns a number – such as an amount on an invoice, receipt or contract – into its spelled-out Vietnamese form. Enter one number or paste a whole column from Excel, choose the separator format and unit, then copy or download the result. The output is always in Vietnamese.",
      prose: `<h2>How to convert numbers to Vietnamese words</h2><ol><li>Choose the Vietnamese or international format that matches your data.</li><li>Type a number, or paste a column of numbers from Excel into the left box.</li><li>Check the result, click <strong>Copy</strong> below it and paste it into your spreadsheet or document.</li></ol><p>For example, <code>1.250.000</code> in Vietnamese format reads as <strong>một triệu hai trăm năm mươi nghìn đồng</strong> (one million two hundred fifty thousand dong). To read the number only, choose “No unit”.</p><h2>How are dots and commas interpreted?</h2><p>In Vietnamese format, the dot separates thousands and the comma marks decimals: <code>1.234,5</code>. The international format swaps them: <code>1,234.5</code>. Thousands groups must have exactly three digits; the tool never guesses malformed input.</p><h2>Frequently asked questions</h2><details><summary>Are large and negative numbers supported?</summary><p>Yes. Input is kept as a string, so no digits are lost at JavaScript's integer limit. Negative numbers are read with the prefix “âm”.</p></details><details><summary>How is the decimal part read?</summary><p>The decimal part is read after the word “phẩy”, followed by the chosen unit. The tool does not convert fractions to cents or round amounts.</p></details><details><summary>Can I use it for invoices?</summary><p>You can copy the result into your documents. Always double-check the amount, separators and unit against the requirements of the document before use.</p></details>`,
    },
    {
      name: "Word & character counter", short: "Count words, characters and lines", keywords: "word count character counter letters lines text length",
      description: "Check words, characters and lines as you type. Supports accents, all languages and emoji.",
      title: "Free Online Word Counter & Character Counter", meta: "Count words, characters with and without spaces, and lines as you type. Works with accents and emoji; your text never leaves your browser.",
      info: "Word & character counter is an online tool that instantly tells you how many words, characters with and without spaces, and lines your text has. It helps when writing to a word limit, drafting product descriptions, SEO titles or social media posts.",
      prose: `<h2>How does the word counter work?</h2><p>Paste your text into the <strong>Text</strong> box. The counts update live, so you can check the length of articles, homework, product descriptions or social posts.</p><h2>Clear counting rules</h2><ul><li><strong>Space-separated words:</strong> each group separated by spaces, tabs or line breaks that contains at least one letter or digit counts as one. “Hello big wide world” counts as 4.</li><li><strong>Characters:</strong> visible characters (Unicode graphemes), including spaces and line breaks. A combined family emoji counts as 1.</li><li><strong>Characters without spaces:</strong> excludes spaces, tabs and line breaks.</li><li><strong>Lines:</strong> split by the line breaks you type; soft wrapping on screen does not add lines. An empty box has 0 lines.</li></ul><p>Words are counted by whitespace, not by linguistic analysis, so languages written without spaces (such as Chinese or Japanese) count each run of text as one word. Standalone punctuation or emoji are not words.</p><h2>Frequently asked questions</h2><details><summary>Why does the count differ from Word or a social network?</summary><p>Platforms split words and count emoji differently. Use the target platform's own counter if you must meet a specific limit.</p></details><details><summary>Is my text stored on a server?</summary><p>No. Counting happens in your browser and nothing is uploaded. The box is not saved after you reload the page.</p></details>`,
    },
    {
      name: "Sticker maker from photos", short: "Remove background, add outline, export PNG", keywords: "sticker maker remove background png outline cutout transparent",
      description: "Remove the background, add an outline and text, and export PNG. Turn your photo into a sticker right in your browser.",
      title: "Free Online Sticker Maker — Remove Background, PNG", meta: "Make stickers from photos for free in your browser. Remove the background, add outlines and text, and download PNG with the Sticker Canvas editor.",
      info: "Sticker maker is an online tool that turns a photo into a sticker: remove the background on your device, add a white outline, insert text and download a PNG file. No app to install and no account; your photo is not uploaded to a server for background removal.",
      prose: `<h2>How to make a sticker from a photo</h2><ol><li>Click <strong>Open sticker maker</strong>, then use the upload button or drag a photo onto the canvas.</li><li>Select the photo on the canvas and choose <strong>Remove background</strong> in the edit panel.</li><li>Adjust the outline, size, or add text with the text tool.</li><li>Use the PNG button of the selected image to download the sticker alone; the canvas menu download exports the whole layout.</li></ol><h2>Background removal on your device</h2><p>The image model runs in your browser. Photos are not sent to a background-removal API. The first use downloads the processing files; your browser may cache them for later.</p><p>Sharp photos with a subject clearly separated from the background work best. Hair, transparent objects and busy backgrounds may leave edges or lose detail. Check the result before downloading.</p><h2>Frequently asked questions</h2><details><summary>Does the downloaded PNG have a transparent background?</summary><p>After removing the background, saving the selected image creates a sticker PNG. Exporting the whole canvas includes the paper background and all layout elements; the two exports differ.</p></details><details><summary>Does it work on phones?</summary><p>Yes, the interface adapts to small screens. Background removal needs memory and processing time; newer computers and phones give a better experience.</p></details><details><summary>Does it create WhatsApp or Zalo sticker packs?</summary><p>It currently creates and downloads PNG images. Importing them as a sticker pack depends on the features and requirements of your messaging app.</p></details>`,
    },
  ],
  number: {
    label: "Convert numbers to words", input: "Numbers", result: "Result in Vietnamese words", placeholder: "One number per line, e.g. 1250000", resultPlaceholder: "The result will appear here…",
    help: "Up to 30,000 characters, 300 characters per number. Blank lines are kept so you can paste back into Excel.", noscript: "Enable JavaScript to convert numbers to words on your device.",
    groups: [
      { title: "Number format", choices: [["Vietnamese: 1.234.567,89", "Dot separates thousands, comma before decimals."], ["International: 1,234,567.89", "Comma separates thousands, dot before decimals."]] },
      { title: "Unit at the end", choices: [["Đồng (VND)", "Adds “đồng” after the result, for money amounts."], ["No unit", "Reads the number only."]] },
    ],
    examples: [
      ["Invoice amount", "An amount in Vietnamese format, dots between thousands, with the đồng unit at the end."],
      ["Paste a column from Excel", "One number per line. Blank lines are kept so results line up with each cell when pasted back."],
      ["International decimal", "Comma between thousands, dot before decimals. Reads the number only, without a unit."],
    ],
  },
  counter: {
    label: "Text counter", input: "Text", stats: "Statistics", placeholder: "Type or paste your text here…", help: "Up to 100,000 characters. Counting rules are explained below.", noscript: "Enable JavaScript to see word and character counts.",
    labels: { words: "Space-separated words", characters: "Characters", withoutSpaces: "Characters without spaces", lines: "Lines" },
    examples: [
      ["Greeting with emoji", "An emoji counts as one character but not as a word.", "Hello world! 👋\nSmall tools make every day lighter."],
      ["Product description", "Check the length of a description before listing it on a marketplace.", "100% cotton T-shirt, relaxed fit, breathable. Nationwide delivery in 2–3 days."],
      ["Article title", "SEO titles should be short; count characters so they are not cut off in search results.", "How to write amounts in words correctly on invoices"],
    ],
  },
  sticker: {
    label: "Sticker maker", input: "Input image", result: "Result", open: "Open sticker maker", editor: "Open editor",
    drop: "Click to choose a photo or drag it here. It opens in the sticker maker.",
    note: "The first background removal downloads a model of about 46 MB. Processing time depends on your device; the editor uses an English interface.",
  },
  about: {
    title: "About, privacy & source code", description: "About 94 Tools, how your data is processed in the browser, and the open-source projects we use.",
    h1: "Small tools. Open source.", lead: "94 Tools brings together simple utilities so you can handle everyday tasks right in your browser.",
    html: `<h2>Free, no account needed</h2><p>All current tools are free to use. The website is built on open-source projects and standard browser features.</p><h2>Your data</h2><p>Text, numbers and images are processed on your device and are not sent to a server for conversion. The sticker editor saves your work in browser storage so you can reopen it. On a shared computer, clear the site data in your browser settings when you are done.</p><p>The server still receives requests for pages, JavaScript and the model, including technical information such as your IP address. This version has no ads or third-party analytics.</p><h2>Open source and licenses</h2>`,
    feedback: `<h2>Feedback and bug reports</h2><p>You can report technical issues on <a href="https://github.com/namkiba13/stickerCanvas/issues">GitHub Issues</a>. Please use sample content instead of private amounts or photos.</p>`,
  },
  credits: { source: "Website and Sticker Canvas source code", fork: "forked from", license: "License", counter: "Used as a reference; the counter on this site follows the whitespace and Unicode rules described on the tool page.", ui: "Interface modeled on", cards: "Rewritten as static HTML and CSS; the home page background comes from OmniTools. Article cards inspired by", font: "Font", icons: "Icons via", model: "The IS-Net background-removal model is licensed under Apache-2.0. The HEIC decoder includes ISC/LGPLv3 components.", notices: "Third-party notices", modelLicense: "Model license" },
  js: { line: "Line", format: "Number or separators do not match the selected format.", length: "Each number can have at most 300 characters.", errors: "{n} line(s) need fixing. Check the number format in Tool options.", copied: "Copied.", selected: "Content selected. Press Ctrl+C, or choose Copy on your phone.", segmenter: "Please update your browser to count Unicode characters and emoji accurately.", file: "vietnamese-number-words.txt" },
};
