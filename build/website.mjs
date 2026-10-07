import { readFileSync } from "node:fs";
import { cp, mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { resolve } from "node:path";
import { build } from "vite";
import { countText, readLines, searchKey } from "../site/logic.mjs";

const origin = new URL(process.env.SITE_URL || "http://localhost:4321").origin;
const output = resolve("dist-site");
// Iconify SVGs in site/icons (licenses on /about/); colors follow OmniTools' category palette.
const colors = ["#8FBC5D", "#3CB6E2", "#B17F59", "#FFD400", "#AB6993"];
const svg = (name, attrs = "") => readFileSync(`site/icons/${name}.svg`, "utf8").replace(' width="1em" height="1em"', ` aria-hidden="true" focusable="false" ${attrs}`);
// Vietnamese is the default locale at the root with Vietnamese slugs; the other locales (OmniTools' list) live under /<code>/ with English slugs.
const codes = ["vi", "en", "de", "es", "fr", "pt", "ja", "hi", "nl", "ru", "uk", "zh"];
const locales = Object.fromEntries(await Promise.all(codes.map(async (code) => [code, (await import(`../site/locales/${code}.mjs`)).default])));
const prefix = (code) => code === "vi" ? "" : `/${code}`;
const categoryData = [["number", "lsicon__number-filled"], ["text", "solar__text-bold-duotone"], ["image", "material-symbols-light__image-outline-rounded"]];
const toolData = [["vietnamese-number-to-words", "fluent__text-number-format-24-regular", 0, "number"], ["word-counter", "fluent__document-landscape-data-24-filled", 1, "counter"], ["sticker-maker", "mdi__image-remove", 2, "sticker"]];

const esc = (text) => text.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;");
const json = (data) => JSON.stringify(data).replaceAll("<", "\\u003c");
const vnDate = (date) => date.split("-").reverse().join("/");
// Blog is Vietnamese-only. Each post: content/blog/<slug>.html = "---" front matter (title, description, date, optional updated/tool) "---" then HTML body.
const posts = await Promise.all((await readdir("content/blog")).filter((file) => file.endsWith(".html")).map(async (file) => {
  const [, head, body] = (await readFile(`content/blog/${file}`, "utf8")).match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/) ?? [];
  if (!head) throw new Error(`content/blog/${file}: missing front matter`);
  const meta = Object.fromEntries(head.split(/\r?\n/).map((line) => [line.slice(0, line.indexOf(":")).trim(), line.slice(line.indexOf(":") + 1).trim()]));
  for (const key of ["title", "description", "date"]) if (!meta[key]) throw new Error(`content/blog/${file}: missing ${key}`);
  const toolIndex = toolData.findIndex(([slug]) => `/${slug}/` === meta.tool);
  const toc = [];
  const html = body.replace(/<h2>([\s\S]*?)<\/h2>/g, (_, inner) => {
    const text = inner.replace(/<[^>]+>/g, "");
    const id = searchKey(text).replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    toc.push({ id, text });
    return `<h2 id="${id}">${inner}</h2>`;
  });
  const words = body.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
  return { ...meta, slug: file.slice(0, -5), body: html, toc, toolIndex, category: toolIndex < 0 ? "Hướng dẫn" : locales.vi.categories[toolData[toolIndex][2]].name, minutes: Math.max(1, Math.round(words / 200)) };
}));
posts.sort((a, b) => b.date.localeCompare(a.date));

const link = (href, text) => `<a href="${href}">${text}</a>`;
const credits = (c) => `<ul><li>${link("https://github.com/namkiba13/stickerCanvas/tree/site/free-tools", c.source)} — ${c.fork} ${link("https://github.com/jonbrown66/stickerCanvas", "jonbrown66/stickerCanvas")}, MIT. ${link("/licenses/stickerCanvas.txt", c.license)}.</li><li>${link("https://github.com/namkiba13/read-vietnamese-number-js", "read-vietnamese-number")} — Vu Tong, MIT, 2.4.0. ${link("/licenses/read-vietnamese-number.txt", c.license)}.</li><li>${link("https://github.com/namkiba13/JavaScript-Word-Counter-Web-Application", "JavaScript Word Counter Web Application")} — Saeed Kohansal, MIT. ${c.counter}</li><li>${c.ui} ${link("https://github.com/iib0011/omni-tools", "OmniTools")} — Ibrahima Gaye Coulibaly, MIT (${link("/assets/omni-tools-LICENSE.txt", c.license)}). ${c.cards} ${link("https://github.com/themesberg/flowbite", "Flowbite")} (MIT).</li><li>${c.font} ${link("https://github.com/andrew-paglinawan/QuicksandFamily", "Quicksand")} — SIL Open Font License 1.1 (${link("/assets/Quicksand-OFL.txt", c.license)}).</li><li>${c.icons} ${link("https://iconify.design/", "Iconify")}: ${link("https://github.com/Templarian/MaterialDesign", "Material Design Icons")} (Pictogrammers), ${link("https://github.com/material-icons/material-icons", "Google Material Icons")}, ${link("https://github.com/google/material-design-icons", "Material Symbols")} (Apache-2.0); ${link("https://github.com/microsoft/fluentui-system-icons", "Fluent UI System Icons")} (Microsoft), ${link("https://www.lsicon.com/", "Lsicon")} (Wis Design, MIT); ${link("https://www.figma.com/community/file/1166831539721848736", "Solar")} (480 Design, ${link("https://creativecommons.org/licenses/by/4.0/", "CC BY 4.0")}).</li></ul><p>${c.model} ${link("/licenses/THIRD_PARTY_NOTICES.md", c.notices)} · ${link("/sticker-maker/editor/models/isnet-general-use-onnx/LICENSE", c.modelLicense)}.</p>`;

const crumbNav = (crumbs) => !crumbs.length ? "" : `<nav class="crumbs" aria-label="Breadcrumb"><ol>${crumbs.map((crumb, index) => index < crumbs.length - 1 ? `<li><a href="${crumb.path}">${esc(crumb.name)}</a></li>` : `<li aria-current="page">${esc(crumb.name)}</li>`).join("")}</ol></nav>`;
// Option groups render both the live tool options and the read-only state of each example card.
const optionGroups = (groups, values) => groups.map((group) => `<fieldset class="opt-group"><legend>${group.title}</legend>${group.choices.map(([value, label, help], index) => `<label class="radio">${values ? `<span class="fake-radio${values[group.name] === value ? " on" : ""}"></span>` : `<input type="radio" name="${group.name}" value="${value}"${index ? "" : " checked"}>`}<span>${label}</span></label><p class="opt-desc">${help}</p>`).join("")}</fieldset>`).join("");
const ioFoot = (buttons) => `<div class="io-foot">${buttons.map(([id, icon, label]) => `<button type="button" class="btn text" id="${id}">${svg(icon)}${label}</button>`).join("")}</div>`;
const numberValues = [["format", ["vn", "en"]], ["unit", ["đồng", ""]]];
const numberInputs = [["1.250.000", "vn", "đồng"], ["1250000\n15005\n\n2500000000", "vn", "đồng"], ["1,234,567.89", "en", ""]];

// page.key ties the same page across locales: alternates[key][code] = path, used for hreflang, the sitemap and the language menu.
const alternates = {};
const version = {};

function localeSite(code) {
  const t = locales[code];
  const home = `${prefix(code)}/`;
  const path = (slug) => `${prefix(code)}/${slug}/`;
  const categories = Object.fromEntries(categoryData.map(([slug, icon], index) => [slug, { ...t.categories[index], slug, icon, path: path(`tools/${slug}`), color: colors[index % colors.length] }]));
  const tools = toolData.map(([slug, icon, category, mode], index) => ({ ...t.tools[index], path: path(slug), icon, category: categoryData[category][0], mode, color: colors[index % colors.length] }));
  const aboutPath = path("about");
  const quickLinks = t.quick.map((label, index) => [label, tools[index % tools.length]]);
  const ownPosts = code === "vi" ? posts.map((post) => ({ ...post, tool: tools[post.toolIndex] })) : [];
  const allTools = { path: home, name: t.ui.allTools };

  const cover = (post, large = false) => `<div class="cover${large ? " cover-lg" : ""}">${svg(post.tool?.icon ?? "mdi__file-document-edit-outline", `style="color:${post.tool?.color ?? colors[4]}"`)}</div>`;
  const postCards = (list) => `<div class="grid-3">${list.map((post) => `<a class="post-card" href="/blog/${post.slug}/">${cover(post)}<div class="post-body"><span class="chip">${post.category}</span><h3>${esc(post.title)}</h3><p>${esc(post.description)}</p><span class="small"><time datetime="${post.date}">${vnDate(post.date)}</time> · ${post.minutes} phút đọc</span></div></a>`).join("")}</div>`;

  function hero(heading = "h1") {
    const groups = Object.values(categories).map((category) => `<div role="group" aria-labelledby="group-${category.slug}"><div class="group" id="group-${category.slug}">${category.name}</div>${tools.filter((tool) => tool.category === category.slug).map((tool) => `<a role="option" tabindex="-1" id="option-${tools.indexOf(tool)}" href="${tool.path}" data-keywords="${esc(tool.keywords)}" aria-selected="false">${svg(tool.icon)}<span><strong>${tool.name}</strong><small>${tool.short}</small></span></a>`).join("")}</div>`).join("");
    return `<section class="hero"><${heading} class="hero-title">${t.ui.heroTitle("<span>94 Tools</span>")}</${heading}><p class="hero-desc">${t.ui.heroDesc}</p><div class="search hero-search"><label class="sr-only" for="tool-search">${t.ui.search}</label><input id="tool-search" type="text" role="combobox" aria-expanded="false" aria-controls="tool-list" aria-autocomplete="list" placeholder="${t.ui.searchPlaceholder}" autocomplete="off" spellcheck="false">${svg("mdi__magnify")}<div class="listbox" id="tool-list" role="listbox" aria-label="${t.ui.tools}" hidden>${groups}<p class="none" hidden>${t.ui.noResults}</p></div></div><ul class="quick-grid">${quickLinks.map(([label, tool]) => `<li><a class="quick" href="${tool.path}">${label}</a></li>`).join("")}</ul></section>`;
  }

  function categoryCard(category) {
    const first = tools.find((tool) => tool.category === category.slug);
    return `<article class="cat-card"><div class="cat-head">${svg(category.icon, `style="color:${category.color}"`)}<h2><a href="${category.path}">${category.name}</a></h2></div><p>${category.description}</p><div class="cat-actions"><a class="btn contained" href="${category.path}">${t.ui.seeAll(category.name)}</a><a class="btn outlined" href="${first.path}">${t.ui.tryTool(first.name)}</a></div></article>`;
  }

  const toolTile = (tool, index) => `<a class="tool-tile" href="${tool.path}" data-keywords="${esc(tool.keywords)}">${svg(tool.icon, `style="color:${colors[index % colors.length]}"`)}<span><span class="tile-name">${tool.name}</span><span class="tile-desc">${tool.short}</span></span></a>`;
  const toolCard = (tool) => `<a class="tool-card" href="${tool.path}"><span class="tool-card-head">${svg(tool.icon)}<strong>${tool.name}</strong>${svg("mdi__chevron-right")}</span><span class="tool-card-desc">${tool.short}</span></a>`;
  const optionsBox = (groups) => `<section class="options" aria-labelledby="options-title"><h2 id="options-title">${svg("mdi__cog")}${t.ui.options}</h2><div class="opt-groups">${optionGroups(groups)}</div></section>`;

  function toolPage(index, { ui, examples = [], groups = [], links }) {
    const tool = tools[index];
    const category = categories[tool.category];
    const guides = ownPosts.filter((post) => post.tool === tool);
    const siblings = tools.filter((other) => other.category === tool.category && other !== tool);
    const more = siblings.length ? siblings : tools.filter((other) => other !== tool);
    const exampleCards = examples.map((example) => `<div class="ex-card" role="button" tabindex="0" aria-label="${esc(`${t.ui.tryExample}: ${example.title}`)}" data-input="${esc(example.input)}"${Object.entries(example.options ?? {}).map(([key, value]) => ` data-${key}="${value}"`).join("")}><h3>${example.title}</h3><p>${example.description}</p><div class="ex-box"><pre>${esc(example.input)}</pre></div>${svg("mdi__arrow-down", 'class="ex-arrow"')}<div class="ex-box"><pre>${esc(example.result)}</pre></div>${groups.length ? `<div class="ex-opts">${optionGroups(groups, example.options)}</div>` : ""}</div>`).join("");
    return {
      key: `tool:${index}`, path: tool.path, name: tool.name, mode: tool.mode, title: `${tool.title} | 94 Tools`, description: tool.meta,
      crumbs: [allTools, { path: category.path, name: category.name }, { path: tool.path, name: tool.name }],
      content: `<div class="tool-head"><div><h1>${tool.name}</h1><p class="tool-desc">${tool.description}</p><div class="head-links">${links ?? `<a class="btn outlined paper" href="#examples">${t.ui.seeExamples}</a>`}</div></div>${svg(tool.icon, `class="tool-art" style="color:${tool.color}"`)}</div>${ui}${groups.length ? optionsBox(groups) : ""}<section class="info"><h2>${t.ui.whatIs(tool.name)}</h2><p>${tool.info}</p></section><article class="prose">${tool.prose}</article><hr class="sep">${examples.length ? `<section class="examples" id="examples"><h2 class="title">${t.ui.examples(tool.name)} <span>${t.ui.clickToTry}</span></h2><div class="grid-3">${exampleCards}</div></section>` : ""}${guides.length ? `<section class="guides"><h2 class="title">Bài viết hướng dẫn</h2>${postCards(guides)}</section>` : ""}${examples.length || guides.length ? '<hr class="sep">' : ""}<section class="all-tools"><h2 class="title">${siblings.length ? t.ui.allOf(category.name) : t.ui.moreTools}</h2><div class="grid-3">${more.map(toolCard).join("")}</div></section>`,
    };
  }

  const n = t.number;
  const numberGroups = n.groups.map((group, index) => ({ name: numberValues[index][0], title: group.title, choices: group.choices.map(([label, help], choice) => [numberValues[index][1][choice], label, help]) }));
  const c = t.counter;
  const s = t.sticker;
  const pages = [
    {
      key: "home", path: home, bare: true, title: t.site.title, description: t.site.description,
      schema: { "@context": "https://schema.org", "@type": "WebSite", name: "94 Tools", url: origin + home, inLanguage: t.htmlLang, description: t.site.description },
      content: `<div class="home">${hero()}<section class="categories" id="cong-cu" aria-label="${t.ui.categories}">${Object.values(categories).map(categoryCard).join("")}</section>${ownPosts.length ? `<section class="home-posts"><div class="section-head"><h2 class="title">Hướng dẫn &amp; mẹo hay</h2><a href="/blog/">Xem tất cả bài viết</a></div>${postCards(ownPosts.slice(0, 3))}</section>` : ""}</div>`,
    },
    toolPage(0, {
      groups: numberGroups,
      ui: `<section class="io" id="tool" aria-label="${n.label}"><div><h2 class="io-title"><label for="input">${n.input}</label></h2><textarea id="input" maxlength="30000" spellcheck="false" placeholder="${n.placeholder}" aria-describedby="number-help status"></textarea>${ioFoot([["import", "mdi__publish", t.ui.import], ["clear", "mdi__close", t.ui.clear]])}<input type="file" id="file" accept=".txt,.csv,text/plain,text/csv" hidden></div><div><h2 class="io-title"><label for="result">${n.result}</label></h2><textarea id="result" readonly placeholder="${n.resultPlaceholder}"></textarea>${ioFoot([["download", "mdi__download", t.ui.download], ["copy", "mdi__content-paste", t.ui.copy]])}</div></section><p class="status" id="status" role="status" aria-live="polite"></p><p class="opt-desc" id="number-help">${n.help}</p><noscript>${n.noscript}</noscript>`,
      examples: numberInputs.map(([input, format, unit], index) => ({ title: n.examples[index][0], description: n.examples[index][1], input, options: { format, unit }, result: readLines(input, format, unit, t.js).value })),
    }),
    toolPage(1, {
      ui: `<section class="io" id="tool" aria-label="${c.label}"><div><h2 class="io-title"><label for="input">${c.input}</label></h2><textarea id="input" maxlength="100000" placeholder="${c.placeholder}" aria-describedby="counter-help"></textarea>${ioFoot([["import", "mdi__publish", t.ui.import], ["copy", "mdi__content-paste", t.ui.copy], ["clear", "mdi__close", t.ui.clear]])}<input type="file" id="file" accept=".txt,.md,.csv,.html,text/*" hidden></div><div><h2 class="io-title">${c.stats}</h2><dl class="result-box">${Object.entries(c.labels).map(([key, label]) => `<div><dt>${label}</dt><dd data-count="${key}">0</dd></div>`).join("")}</dl></div></section><p class="status" id="status" role="status" aria-live="polite"></p><p class="opt-desc" id="counter-help">${c.help}</p><noscript>${c.noscript}</noscript>`,
      examples: c.examples.map(([title, description, input]) => ({ title, description, input, result: Object.entries(countText(input)).map(([key, value]) => `${c.labels[key]}: ${value}`).join("\n") })),
    }),
    toolPage(2, {
      links: `<a class="btn outlined paper" href="/sticker-maker/editor/">${s.open}</a>`,
      ui: `<section class="io" id="tool" aria-label="${s.label}"><div><h2 class="io-title">${s.input}</h2><a class="drop" id="sticker-drop" href="/sticker-maker/editor/">${svg("mdi__publish")}<span>${s.drop}</span></a><input type="file" id="sticker-file" accept="image/*,.heic,.heif" hidden><div class="io-foot"><a class="btn text" href="/sticker-maker/editor/">${svg("mdi__file-document-edit-outline")}${s.editor}</a></div></div><div><h2 class="io-title">${s.result}</h2><div class="drop demo" aria-hidden="true"><span>✦</span></div><p class="opt-desc">${s.note}</p></div></section>`,
    }),
    ...Object.values(categories).map((category) => ({
      key: `category:${category.slug}`, path: category.path, bare: true, crumbs: [allTools, { path: category.path, name: category.name }], title: `${t.ui.categoryTitle(category.name)} | 94 Tools`, description: category.description,
      content: `<div class="hero-wrap">${hero("p")}</div><hr class="divider"><section class="category"><div class="category-bar"><div><h1><a class="back" href="${home}" aria-label="${t.ui.back}">${svg("mdi__arrow-left")}</a>${t.ui.allOf(category.name)}</h1><p>${category.description}</p></div><div class="search small-search"><label class="sr-only" for="category-search">${t.ui.searchIn(category.name)}</label><input id="category-search" type="text" placeholder="${t.ui.searchPlaceholder}" autocomplete="off" spellcheck="false">${svg("mdi__magnify")}</div></div><div class="tile-grid">${tools.filter((tool) => tool.category === category.slug).map(toolTile).join("")}</div><p class="none" id="tile-empty" hidden>${t.ui.noResults}</p></section>`,
    })),
    {
      key: "about", path: aboutPath, name: t.ui.about, crumbs: [{ path: home, name: t.ui.home }, { path: aboutPath, name: t.ui.about }], title: `${t.about.title} | 94 Tools`, description: t.about.description,
      content: `<div class="page-head"><h1>${t.about.h1}</h1><p class="lead">${t.about.lead}</p></div><article class="prose">${t.about.html}${credits(t.credits)}${t.about.feedback}</article>`,
    },
  ];
  if (code === "vi") pages.push(
    {
      key: "blog", path: "/blog/", name: "Blog", crumbs: [{ path: "/", name: "Trang chủ" }, { path: "/blog/", name: "Blog" }], title: "Blog 94 Tools — Hướng dẫn và mẹo cho công việc hằng ngày", description: "Hướng dẫn viết số tiền bằng chữ, mẹo soạn thảo văn bản, tạo sticker và các bài viết hữu ích khi dùng công cụ online miễn phí.",
      content: `<div class="page-head"><h1>Hướng dẫn &amp; mẹo hay</h1><p class="lead">Kiến thức ngắn gọn, dễ áp dụng cho công việc văn phòng, viết lách và sáng tạo.</p></div>${postCards(ownPosts)}`,
    },
    ...ownPosts.map((post) => {
      const { tool } = post;
      const related = ownPosts.filter((other) => other !== post).slice(0, 3);
      return {
        key: `post:${post.slug}`, path: `/blog/${post.slug}/`, crumbs: [{ path: "/", name: "Trang chủ" }, { path: "/blog/", name: "Blog" }, { path: `/blog/${post.slug}/`, name: post.title }], title: `${esc(post.title)} | 94 Tools`, description: esc(post.description), ogType: "article", lastmod: post.updated || post.date,
        schema: { "@context": "https://schema.org", "@type": "BlogPosting", headline: post.title, description: post.description, datePublished: post.date, dateModified: post.updated || post.date, inLanguage: "vi", mainEntityOfPage: `${origin}/blog/${post.slug}/`, author: { "@type": "Organization", name: "94 Tools", url: `${origin}/` }, publisher: { "@type": "Organization", name: "94 Tools" } },
        content: `<div class="post-head"><span class="chip">${post.category}</span><h1>${esc(post.title)}</h1><p class="lead">${esc(post.description)}</p><p class="small">Bởi <strong>94 Tools</strong> · Cập nhật <time datetime="${post.updated || post.date}">${vnDate(post.updated || post.date)}</time> · ${post.minutes} phút đọc</p></div>${cover(post, true)}<div class="post-layout">${post.toc.length > 2 ? `<nav class="toc" aria-label="Mục lục"><strong>Mục lục</strong><ol>${post.toc.map((item) => `<li><a href="#${item.id}">${item.text}</a></li>`).join("")}</ol></nav>` : ""}<article class="prose">${post.body}${tool ? `<div class="tool-cta"><p class="small">Công cụ miễn phí dùng ngay</p>${toolCard(tool)}</div>` : ""}</article></div>${related.length ? `<hr class="sep"><section><h2 class="title">Bài viết liên quan</h2>${postCards(related)}</section>` : ""}`,
      };
    }),
  );
  for (const page of pages) (alternates[page.key] ??= {})[code] = page.path;

  function render(page) {
    const crumbs = page.crumbs ?? [];
    const alts = alternates[page.key] ?? {};
    const hreflang = Object.keys(alts).length > 1 ? `${Object.entries(alts).map(([other, path]) => `<link rel="alternate" hreflang="${locales[other].htmlLang}" href="${origin}${path}">`).join("")}<link rel="alternate" hreflang="x-default" href="${origin}${alts.vi}">${Object.keys(alts).filter((other) => other !== code).map((other) => `<meta property="og:locale:alternate" content="${locales[other].ogLocale}">`).join("")}` : "";
    const schemas = [page.schema ?? (page.key?.startsWith("tool:") ? { "@context": "https://schema.org", "@type": "WebApplication", name: page.name, url: origin + page.path, applicationCategory: "UtilitiesApplication", operatingSystem: "Web", inLanguage: t.htmlLang, isAccessibleForFree: true, offers: { "@type": "Offer", price: "0", priceCurrency: "VND" } } : null), crumbs.length && { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: crumbs.map((crumb, index) => ({ "@type": "ListItem", position: index + 1, name: crumb.name, item: origin + crumb.path })) }].filter(Boolean);
    const inTools = /^(tool|category):/.test(page.key ?? "");
    const nav = [[`${home}#cong-cu`, t.ui.tools, inTools], ["/blog/", t.ui.blog, page.path.startsWith("/blog/")], [aboutPath, t.ui.about, page.path === aboutPath]].map(([href, label, current]) => `<a href="${href}"${current ? ' aria-current="page"' : ""}${href === "/blog/" && code !== "vi" ? ' hreflang="vi"' : ""}>${label}</a>`).join("");
    const languages = `<label class="lang">${svg("mdi__translate")}<span class="sr-only">${t.ui.language}</span><select onchange="location.href=this.value">${codes.map((other) => `<option value="${alts[other] ?? `${prefix(other)}/`}" lang="${locales[other].htmlLang}"${other === code ? " selected" : ""}>${locales[other].label}</option>`).join("")}</select></label>`;
    return `<!doctype html><html lang="${t.htmlLang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#F5F5FA"><title>${page.title}</title><meta name="description" content="${page.description}">${page.noindex ? '<meta name="robots" content="noindex,follow">' : `<link rel="canonical" href="${origin}${page.path}"><meta property="og:url" content="${origin}${page.path}">`}${hreflang}<meta property="og:type" content="${page.ogType || "website"}"><meta property="og:locale" content="${t.ogLocale}"><meta property="og:title" content="${page.title}"><meta property="og:description" content="${page.description}"><meta property="og:image" content="${origin}/assets/og.png"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta name="twitter:card" content="summary_large_image"><link rel="icon" href="/favicon.svg" type="image/svg+xml"><link rel="preload" href="/assets/Quicksand-VariableFont_wght.ttf" as="font" type="font/ttf" crossorigin><link rel="stylesheet" href="/style.css?v=${version.css}">${schemas.map((schema) => `<script type="application/ld+json">${json(schema)}</script>`).join("")}${page.mode || page.bare ? `<script type="module" src="/tools.js?v=${version.js}"></script>` : ""}${page.mode ? `<script type="application/json" id="i18n">${json(t.js)}</script>` : ""}</head><body data-tool="${page.mode || ""}"${page.key === "home" ? ' class="home-bg"' : ""}><a class="skip" href="#main">${t.ui.skip}</a><header class="topbar"><a class="logo" href="${home}" aria-label="94 Tools — ${t.ui.home}">94 Tools</a><nav aria-label="${t.ui.menu}">${nav}${languages}</nav></header><main id="main"${page.bare ? "" : ' class="page"'}>${page.bare ? "" : crumbNav(crumbs)}${page.content}</main><footer><p><strong>94 Tools</strong> · ${t.site.tagline}</p><p>${tools.map((tool) => link(tool.path, tool.name)).join(" · ")}</p><p>${Object.values(categories).map((category) => link(category.path, category.name)).join(" · ")} · ${link("/blog/", t.ui.blog)} · ${link(aboutPath, t.ui.aboutFooter)}</p></footer></body></html>`;
  }
  return { pages, render };
}

const sites = codes.map(localeSite);

await build({
  configFile: false,
  publicDir: false,
  build: {
    outDir: output,
    emptyOutDir: true,
    lib: { entry: resolve("site/tools.mjs"), formats: ["es"], fileName: () => "tools.js" },
  },
});
await cp("site/style.css", `${output}/style.css`);
// Cache-busting query so CDN/browser caches pick up each deploy.
const hash = async (file) => createHash("sha256").update(await readFile(file)).digest("hex").slice(0, 8);
version.css = await hash(`${output}/style.css`);
version.js = await hash(`${output}/tools.js`);
await cp("site/assets", `${output}/assets`, { recursive: true });
await mkdir(`${output}/sticker-maker/editor`, { recursive: true });
await cp("dist", `${output}/sticker-maker/editor`, { recursive: true, filter: (path) => !path.includes(".openai") });
const editorFile = `${output}/sticker-maker/editor/index.html`;
const editor = await readFile(editorFile, "utf8");
await writeFile(editorFile, editor.replace("<title>Sticker Canvas</title>", '<title>Sticker Canvas | 94 Tools</title><meta name="robots" content="noindex,follow">').replace('<div id="root"></div>', '<a href="/sticker-maker/" style="position:fixed;top:18px;left:72px;z-index:100;padding:8px 12px;border-radius:8px;background:#fff;color:#1c76ce;font:14px system-ui;text-decoration:none">← 94 Tools</a><div id="root"></div>'));
for (const { pages, render } of sites) {
  for (const page of pages) {
    await mkdir(output + page.path, { recursive: true });
    await writeFile(output + page.path + "index.html", render(page));
  }
}
await writeFile(`${output}/404.html`, sites[0].render({ path: "/404.html", title: "Không tìm thấy trang | 94 Tools", description: "Trang bạn tìm không tồn tại.", noindex: true, content: '<section class="page-head"><h1>Không tìm thấy trang.</h1><p>Đường dẫn có thể đã thay đổi. Hãy chọn lại một công cụ từ trang chủ.</p><a class="btn contained" href="/">Về trang chủ</a></section>' }));
await writeFile(`${output}/favicon.svg`, '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="15" fill="#1976d2"/><text x="32" y="43" text-anchor="middle" fill="white" font-family="system-ui,sans-serif" font-weight="700" font-size="34">94</text></svg>');
const all = sites.flatMap((site) => site.pages);
await writeFile(`${output}/sitemap.xml`, `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${all.map((page) => {
  const alts = Object.entries(alternates[page.key]);
  const links = alts.length > 1 ? `${alts.map(([code, path]) => `<xhtml:link rel="alternate" hreflang="${locales[code].htmlLang}" href="${origin}${path}"/>`).join("")}<xhtml:link rel="alternate" hreflang="x-default" href="${origin}${alternates[page.key].vi}"/>` : "";
  return `<url><loc>${origin}${page.path}</loc>${page.lastmod ? `<lastmod>${page.lastmod}</lastmod>` : ""}${links}</url>`;
}).join("")}</urlset>`);
await writeFile(`${output}/robots.txt`, `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`);
await mkdir(`${output}/licenses`, { recursive: true });
await cp("LICENSE", `${output}/licenses/stickerCanvas.txt`);
await cp("node_modules/read-vietnamese-number/LICENSE.txt", `${output}/licenses/read-vietnamese-number.txt`);
await cp("THIRD_PARTY_NOTICES.md", `${output}/licenses/THIRD_PARTY_NOTICES.md`);
console.log(`Built ${all.length} static pages in ${codes.length} languages and sticker editor for ${origin}`);
