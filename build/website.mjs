import { readFileSync } from "node:fs";
import { cp, mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { build } from "vite";
import { countText, readLines, searchKey } from "../site/logic.mjs";

const origin = new URL(process.env.SITE_URL || "http://localhost:4321").origin;
const output = resolve("dist-site");
// Iconify SVGs in site/icons (licenses on /gioi-thieu/); colors follow OmniTools' category palette.
const colors = ["#8FBC5D", "#3CB6E2", "#B17F59", "#FFD400", "#AB6993"];
const svg = (name, attrs = "") => readFileSync(`site/icons/${name}.svg`, "utf8").replace(' width="1em" height="1em"', ` aria-hidden="true" focusable="false" ${attrs}`);
const categories = {
  so: { name: "Công cụ số", icon: "lsicon__number-filled", description: "Công cụ làm việc với con số – đổi số tiền thành chữ tiếng Việt, đọc cả cột số từ Excel cho hóa đơn, phiếu chi, hợp đồng và nhiều hơn nữa." },
  "van-ban": { name: "Công cụ văn bản", icon: "solar__text-bold-duotone", description: "Công cụ làm việc với văn bản – đếm số từ, ký tự có và không có khoảng trắng, số dòng cho bài viết, bài tập, mô tả sản phẩm và nhiều hơn nữa." },
  "hinh-anh": { name: "Công cụ hình ảnh", icon: "material-symbols-light__image-outline-rounded", description: "Công cụ làm việc với hình ảnh – xóa nền ảnh, thêm viền, chèn chữ và tạo sticker PNG ngay trên trình duyệt, không cần cài đặt." },
};
Object.entries(categories).forEach(([slug, category], index) => Object.assign(category, { slug, path: `/cong-cu/${slug}/`, color: colors[index % colors.length] }));
const tools = [
  { path: "/doi-so-thanh-chu/", name: "Đổi số thành chữ", icon: "fluent__text-number-format-24-regular", category: "so", short: "Đọc số tiền bằng chữ tiếng Việt", keywords: "đọc số tiền bằng chữ hóa đơn phiếu chi excel", description: "Đọc số tiền bằng tiếng Việt. Dán cả cột từ Excel và sao chép kết quả trong một lần." },
  { path: "/dem-tu/", name: "Đếm từ & ký tự", icon: "fluent__document-landscape-data-24-filled", category: "van-ban", short: "Đếm số từ, ký tự và dòng của văn bản", keywords: "đếm số từ đếm ký tự word count văn bản", description: "Kiểm tra số từ, ký tự và dòng ngay khi nhập. Hỗ trợ tiếng Việt và emoji." },
  { path: "/tao-sticker/", name: "Tạo sticker từ ảnh", icon: "mdi__image-remove", category: "hinh-anh", short: "Xóa nền ảnh, thêm viền và xuất PNG", keywords: "xóa nền ảnh png sticker zalo viền", description: "Xóa nền, thêm viền, chữ và xuất PNG. Biến ảnh của bạn thành sticker ngay trên trình duyệt." },
];
tools.forEach((tool, index) => { tool.color = colors[index % colors.length]; });
const quickLinks = [["Đọc số tiền bằng chữ", tools[0]], ["Đếm số từ", tools[1]], ["Tạo sticker từ ảnh", tools[2]], ["Đổi cột số từ Excel", tools[0]], ["Đếm ký tự", tools[1]], ["Xóa nền ảnh", tools[2]]];

const esc = (text) => text.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;");
const vnDate = (date) => date.split("-").reverse().join("/");
// Each post: content/blog/<slug>.html = "---" front matter (title, description, date, optional updated/tool) "---" then HTML body.
const posts = await Promise.all((await readdir("content/blog")).filter((file) => file.endsWith(".html")).map(async (file) => {
  const [, head, body] = (await readFile(`content/blog/${file}`, "utf8")).match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/) ?? [];
  if (!head) throw new Error(`content/blog/${file}: missing front matter`);
  const meta = Object.fromEntries(head.split(/\r?\n/).map((line) => [line.slice(0, line.indexOf(":")).trim(), line.slice(line.indexOf(":") + 1).trim()]));
  for (const key of ["title", "description", "date"]) if (!meta[key]) throw new Error(`content/blog/${file}: missing ${key}`);
  const tool = tools.find((item) => item.path === meta.tool);
  const toc = [];
  const html = body.replace(/<h2>([\s\S]*?)<\/h2>/g, (_, inner) => {
    const text = inner.replace(/<[^>]+>/g, "");
    const id = searchKey(text).replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    toc.push({ id, text });
    return `<h2 id="${id}">${inner}</h2>`;
  });
  const words = body.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
  return { ...meta, slug: file.slice(0, -5), body: html, toc, tool, category: tool ? categories[tool.category].name : "Hướng dẫn", minutes: Math.max(1, Math.round(words / 200)) };
}));
posts.sort((a, b) => b.date.localeCompare(a.date));

const cover = (post, large = false) => `<div class="cover${large ? " cover-lg" : ""}">${svg(post.tool?.icon ?? "mdi__file-document-edit-outline", `style="color:${post.tool?.color ?? colors[4]}"`)}</div>`;

function postCards(list) {
  return `<div class="grid-3">${list.map((post) => `<a class="post-card" href="/blog/${post.slug}/">${cover(post)}<div class="post-body"><span class="chip">${post.category}</span><h3>${esc(post.title)}</h3><p>${esc(post.description)}</p><span class="small"><time datetime="${post.date}">${vnDate(post.date)}</time> · ${post.minutes} phút đọc</span></div></a>`).join("")}</div>`;
}

const crumbNav = (crumbs) => !crumbs.length ? "" : `<nav class="crumbs" aria-label="Breadcrumb"><ol>${crumbs.map((crumb, index) => index < crumbs.length - 1 ? `<li><a href="${crumb.path}">${esc(crumb.name)}</a></li>` : `<li aria-current="page">${esc(crumb.name)}</li>`).join("")}</ol></nav>`;

function hero(heading = "h1") {
  const groups = Object.values(categories).map((category) => `<div role="group" aria-labelledby="group-${category.slug}"><div class="group" id="group-${category.slug}">${category.name}</div>${tools.filter((tool) => tool.category === category.slug).map((tool) => `<a role="option" tabindex="-1" id="option-${tools.indexOf(tool)}" href="${tool.path}" data-keywords="${tool.keywords}" aria-selected="false">${svg(tool.icon)}<span><strong>${tool.name}</strong><small>${tool.short}</small></span></a>`).join("")}</div>`).join("");
  return `<section class="hero"><${heading} class="hero-title">Xong việc nhanh chóng với <span>94 Tools</span></${heading}><p class="hero-desc">Tăng tốc công việc với 94 Tools – bộ công cụ online miễn phí giúp bạn xong việc thật nhanh! Đổi số thành chữ, đếm từ, tạo sticker từ ảnh và nhiều tiện ích khác, xử lý ngay trên trình duyệt.</p><div class="search hero-search"><label class="sr-only" for="tool-search">Tìm công cụ</label><input id="tool-search" type="text" role="combobox" aria-expanded="false" aria-controls="tool-list" aria-autocomplete="list" placeholder="Tìm tất cả công cụ" autocomplete="off" spellcheck="false">${svg("mdi__magnify")}<div class="listbox" id="tool-list" role="listbox" aria-label="Công cụ" hidden>${groups}<p class="none" hidden>Không có kết quả</p></div></div><ul class="quick-grid">${quickLinks.map(([label, tool]) => `<li><a class="quick" href="${tool.path}">${label}</a></li>`).join("")}</ul></section>`;
}

function categoryCard(category) {
  const first = tools.find((tool) => tool.category === category.slug);
  return `<article class="cat-card"><div class="cat-head">${svg(category.icon, `style="color:${category.color}"`)}<h2><a href="${category.path}">${category.name}</a></h2></div><p>${category.description}</p><div class="cat-actions"><a class="btn contained" href="${category.path}">Xem tất cả ${category.name.toLowerCase()}</a><a class="btn outlined" href="${first.path}">Thử ${first.name}</a></div></article>`;
}

const toolTile = (tool, index) => `<a class="tool-tile" href="${tool.path}" data-keywords="${tool.keywords}">${svg(tool.icon, `style="color:${colors[index % colors.length]}"`)}<span><span class="tile-name">${tool.name}</span><span class="tile-desc">${tool.short}</span></span></a>`;
const toolCard = (tool) => `<a class="tool-card" href="${tool.path}"><span class="tool-card-head">${svg(tool.icon)}<strong>${tool.name}</strong>${svg("mdi__chevron-right")}</span><span class="tool-card-desc">${tool.short}</span></a>`;

// Option groups render both the live tool options and the read-only state of each example card.
const optionGroups = (groups, values) => groups.map((group) => `<fieldset class="opt-group"><legend>${group.title}</legend>${group.choices.map(([value, label, help], index) => `<label class="radio">${values ? `<span class="fake-radio${values[group.name] === value ? " on" : ""}"></span>` : `<input type="radio" name="${group.name}" value="${value}"${index ? "" : " checked"}>`}<span>${label}</span></label><p class="opt-desc">${help}</p>`).join("")}</fieldset>`).join("");
const optionsBox = (groups) => `<section class="options" aria-labelledby="options-title"><h2 id="options-title">${svg("mdi__cog")}Tùy chọn công cụ</h2><div class="opt-groups">${optionGroups(groups)}</div></section>`;

function toolPage(tool, { ui, info, prose, examples = [], groups = [], links }) {
  const category = categories[tool.category];
  const guides = posts.filter((post) => post.tool === tool);
  const siblings = tools.filter((other) => other.category === tool.category && other !== tool);
  const more = siblings.length ? siblings : tools.filter((other) => other !== tool);
  const crumbs = [{ path: "/", name: "Tất cả công cụ" }, { path: category.path, name: category.name }, { path: tool.path, name: tool.name }];
  const exampleCards = examples.map((example) => `<div class="ex-card" role="button" tabindex="0" aria-label="Thử ví dụ: ${esc(example.title)}" data-input="${esc(example.input)}"${Object.entries(example.options ?? {}).map(([key, value]) => ` data-${key}="${value}"`).join("")}><h3>${example.title}</h3><p>${example.description}</p><div class="ex-box"><pre>${esc(example.input)}</pre></div>${svg("mdi__arrow-down", 'class="ex-arrow"')}<div class="ex-box"><pre>${esc(example.result)}</pre></div>${groups.length ? `<div class="ex-opts">${optionGroups(groups, example.options)}</div>` : ""}</div>`).join("");
  return {
    crumbs,
    content: `<div class="tool-head"><div><h1>${tool.name}</h1><p class="tool-desc">${tool.description}</p><div class="head-links">${links ?? `<a class="btn outlined paper" href="#examples">Xem ví dụ</a>`}</div></div>${svg(tool.icon, `class="tool-art" style="color:${tool.color}"`)}</div>${ui}${groups.length ? optionsBox(groups) : ""}<section class="info"><h2>${tool.name} là gì?</h2><p>${info}</p></section>${prose}<hr class="sep">${examples.length ? `<section class="examples" id="examples"><h2 class="title">Ví dụ ${tool.name.toLowerCase()} <span>Bấm để thử!</span></h2><div class="grid-3">${exampleCards}</div></section>` : ""}${guides.length ? `<section class="guides"><h2 class="title">Bài viết hướng dẫn</h2>${postCards(guides)}</section>` : ""}${examples.length || guides.length ? '<hr class="sep">' : ""}<section class="all-tools"><h2 class="title">${siblings.length ? `Tất cả ${category.name.toLowerCase()}` : "Thêm công cụ cho bạn"}</h2><div class="grid-3">${more.map(toolCard).join("")}</div></section>`,
  };
}

const ioFoot = (buttons) => `<div class="io-foot">${buttons.map(([id, icon, label]) => `<button type="button" class="btn text" id="${id}">${svg(icon)}${label}</button>`).join("")}</div>`;
const numberGroups = [
  { name: "format", title: "Định dạng số", choices: [["vn", "Việt Nam: 1.234.567,89", "Dấu chấm ngăn hàng nghìn, dấu phẩy trước phần thập phân."], ["en", "Quốc tế: 1,234,567.89", "Dấu phẩy ngăn hàng nghìn, dấu chấm trước phần thập phân."]] },
  { name: "unit", title: "Đơn vị ở cuối", choices: [["đồng", "Đồng", "Thêm chữ “đồng” sau kết quả, dùng cho số tiền."], ["", "Không thêm đơn vị", "Chỉ đọc con số."]] },
];
const numberExample = (title, description, input, format, unit) => ({ title, description, input, options: { format, unit }, result: readLines(input, format, unit).value });
const countLabels = { words: "Từ theo khoảng trắng", characters: "Ký tự", withoutSpaces: "Ký tự không khoảng trắng", lines: "Dòng" };
const countExample = (title, description, input) => ({ title, description, input, result: Object.entries(countText(input)).map(([key, value]) => `${countLabels[key]}: ${value}`).join("\n") });

const numberTool = {
  tool: tools[0],
  groups: numberGroups,
  ui: `<section class="io" id="tool" aria-label="Chuyển số thành chữ"><div><h2 class="io-title"><label for="input">Số cần đổi</label></h2><textarea id="input" maxlength="30000" spellcheck="false" placeholder="Nhập mỗi dòng một số, ví dụ: 1250000" aria-describedby="number-help status"></textarea>${ioFoot([["import", "mdi__publish", "Nhập từ tệp"], ["clear", "mdi__close", "Xóa"]])}<input type="file" id="file" accept=".txt,.csv,text/plain,text/csv" hidden></div><div><h2 class="io-title"><label for="result">Kết quả bằng chữ</label></h2><textarea id="result" readonly placeholder="Kết quả sẽ xuất hiện ở đây…"></textarea>${ioFoot([["download", "mdi__download", "Tải xuống"], ["copy", "mdi__content-paste", "Sao chép"]])}</div></section><p class="status" id="status" role="status" aria-live="polite"></p><p class="opt-desc" id="number-help">Tối đa 30.000 ký tự, 300 ký tự mỗi số. Dòng trống được giữ nguyên để dễ dán lại vào Excel.</p><noscript>Bật JavaScript để chuyển số thành chữ trên thiết bị của bạn.</noscript>`,
  info: "Đổi số thành chữ là công cụ online giúp chuyển một con số – như số tiền trên hóa đơn, phiếu chi hay hợp đồng – thành cách đọc bằng chữ tiếng Việt. Bạn có thể nhập một số hoặc dán cả cột số từ Excel, chọn định dạng dấu phân cách và đơn vị, rồi sao chép hoặc tải kết quả về máy.",
  examples: [
    numberExample("Số tiền trên hóa đơn", "Số tiền định dạng Việt Nam, dấu chấm ngăn hàng nghìn, thêm đơn vị đồng ở cuối.", "1.250.000", "vn", "đồng"),
    numberExample("Dán cột số từ Excel", "Mỗi dòng một số. Dòng trống được giữ nguyên để kết quả khớp từng ô khi dán lại vào bảng tính.", "1250000\n15005\n\n2500000000", "vn", "đồng"),
    numberExample("Số thập phân kiểu quốc tế", "Dấu phẩy ngăn hàng nghìn, dấu chấm trước phần thập phân. Chỉ đọc số, không thêm đơn vị.", "1,234,567.89", "en", ""),
  ],
};
const counterTool = {
  tool: tools[1],
  ui: `<section class="io" id="tool" aria-label="Bộ đếm văn bản"><div><h2 class="io-title"><label for="input">Văn bản</label></h2><textarea id="input" maxlength="100000" placeholder="Nhập hoặc dán nội dung vào đây…" aria-describedby="counter-help"></textarea>${ioFoot([["import", "mdi__publish", "Nhập từ tệp"], ["copy", "mdi__content-paste", "Sao chép"], ["clear", "mdi__close", "Xóa"]])}<input type="file" id="file" accept=".txt,.md,.csv,.html,text/*" hidden></div><div><h2 class="io-title">Thống kê</h2><dl class="result-box">${Object.entries(countLabels).map(([key, label]) => `<div><dt>${label}</dt><dd data-count="${key}">0</dd></div>`).join("")}</dl></div></section><p class="status" id="status" role="status" aria-live="polite"></p><p class="opt-desc" id="counter-help">Tối đa 100.000 ký tự. Quy tắc đếm được giải thích bên dưới.</p><noscript>Bật JavaScript để xem số từ và ký tự.</noscript>`,
  info: "Đếm từ & ký tự là công cụ online giúp bạn biết ngay văn bản có bao nhiêu từ, bao nhiêu ký tự có và không có khoảng trắng, bao nhiêu dòng. Công cụ hữu ích khi viết bài theo giới hạn số từ, soạn mô tả sản phẩm, tiêu đề SEO hay nội dung mạng xã hội.",
  examples: [
    countExample("Lời chào có emoji", "Emoji được tính là một ký tự nhưng không được tính là một từ.", "Xin chào Việt Nam! 👋\nCông cụ nhỏ, giúp việc mỗi ngày nhẹ hơn."),
    countExample("Mô tả sản phẩm", "Kiểm tra độ dài mô tả trước khi đăng lên sàn thương mại điện tử.", "Áo thun cotton 100%, form rộng, thoáng mát. Giao hàng toàn quốc trong 2–3 ngày."),
    countExample("Tiêu đề bài viết", "Tiêu đề SEO nên ngắn gọn; đếm ký tự để không bị cắt trên trang kết quả tìm kiếm.", "Cách viết số tiền bằng chữ đúng chuẩn trên hóa đơn"),
  ],
};
const stickerTool = {
  tool: tools[2],
  links: '<a class="btn outlined paper" href="/tao-sticker/editor/">Mở trình tạo sticker</a>',
  ui: `<section class="io" id="tool" aria-label="Tạo sticker"><div><h2 class="io-title">Ảnh đầu vào</h2><a class="drop" href="/tao-sticker/editor/">${svg("mdi__publish")}<span>Bấm vào đây để mở trình tạo sticker, rồi chọn ảnh từ thiết bị hoặc kéo thả ảnh vào canvas.</span></a><div class="io-foot"><a class="btn text" href="/tao-sticker/editor/">${svg("mdi__file-document-edit-outline")}Mở trình chỉnh sửa</a></div></div><div><h2 class="io-title">Kết quả</h2><div class="drop demo" aria-hidden="true"><span>✦</span></div><p class="opt-desc">Lần đầu xóa nền cần tải model khoảng 46 MB. Thời gian xử lý tùy thiết bị; trình chỉnh sửa hiện dùng giao diện tiếng Anh.</p></div></section>`,
  info: "Tạo sticker từ ảnh là công cụ online giúp bạn biến một bức ảnh thành sticker: xóa nền ngay trên thiết bị, thêm viền trắng, chèn chữ và tải về file PNG. Không cần cài ứng dụng hay tạo tài khoản, ảnh không bị gửi lên máy chủ để xóa nền.",
};

const pages = [
  {
    path: "/", bare: true, title: "94 Tools — Công cụ online miễn phí, dùng ngay", description: "Đổi số thành chữ tiếng Việt, đếm từ và ký tự, tạo sticker từ ảnh. Công cụ miễn phí, không cần tài khoản, xử lý ngay trong trình duyệt.",
    content: `<div class="home">${hero()}<section class="categories" id="cong-cu" aria-label="Danh mục công cụ">${Object.values(categories).map(categoryCard).join("")}</section>${posts.length ? `<section class="home-posts"><div class="section-head"><h2 class="title">Hướng dẫn &amp; mẹo hay</h2><a href="/blog/">Xem tất cả bài viết</a></div>${postCards(posts.slice(0, 3))}</section>` : ""}</div>`,
  },
  {
    path: tools[0].path, name: tools[0].name, mode: "number", title: "Đổi số tiền thành chữ tiếng Việt — Dán nhiều dòng từ Excel | 94 Tools", description: "Chuyển số thành chữ tiếng Việt miễn phí. Hỗ trợ số tiền, số âm, số thập phân và nhiều dòng từ Excel; giữ chính xác số lớn.",
    ...toolPage(numberTool.tool, { ...numberTool, prose: `<article class="prose"><h2>Cách đổi số thành chữ</h2><ol><li>Chọn định dạng Việt Nam hoặc quốc tế đúng với dữ liệu của bạn.</li><li>Nhập số, hoặc sao chép một cột số từ Excel vào ô bên trái.</li><li>Kiểm tra kết quả, bấm <strong>Sao chép</strong> dưới ô kết quả rồi dán vào bảng tính hoặc tài liệu.</li></ol><p>Ví dụ <code>1.250.000</code> ở định dạng Việt Nam được đọc là <strong>một triệu hai trăm năm mươi nghìn đồng</strong>. Nếu chỉ cần đọc số, chọn “Không thêm đơn vị”.</p><h2>Dấu chấm và dấu phẩy được hiểu thế nào?</h2><p>Ở định dạng Việt Nam, dấu chấm phân tách hàng nghìn và dấu phẩy phân tách phần thập phân: <code>1.234,5</code>. Định dạng quốc tế đảo ngược hai dấu này: <code>1,234.5</code>. Công cụ yêu cầu nhóm hàng nghìn đủ ba chữ số; không tự đoán một chuỗi nhập sai.</p><h2>Câu hỏi thường gặp</h2><details><summary>Có hỗ trợ số lớn và số âm không?</summary><p>Có. Số đầu vào được giữ dưới dạng chuỗi, tránh mất chữ số ở giới hạn số nguyên của JavaScript. Số âm được đọc với tiền tố “âm”.</p></details><details><summary>Phần thập phân được đọc như thế nào?</summary><p>Phần thập phân được đọc sau từ “phẩy”, rồi thêm đơn vị đã chọn. Công cụ không đổi phần lẻ sang xu hoặc tự làm tròn số tiền.</p></details><details><summary>Có thể dùng để viết hóa đơn không?</summary><p>Bạn có thể sao chép kết quả vào tài liệu. Hãy đối chiếu số tiền, dấu phân cách và cách ghi đơn vị theo yêu cầu của chứng từ trước khi sử dụng.</p></details></article>`,
    }),
  },
  {
    path: tools[1].path, name: tools[1].name, mode: "counter", title: "Đếm từ, đếm ký tự tiếng Việt online miễn phí | 94 Tools", description: "Đếm số từ, ký tự có và không có khoảng trắng, số dòng ngay khi nhập. Bộ đếm hỗ trợ dấu tiếng Việt và emoji, không gửi văn bản lên máy chủ.",
    ...toolPage(counterTool.tool, { ...counterTool, prose: `<article class="prose"><h2>Công cụ đếm từ tiếng Việt hoạt động thế nào?</h2><p>Dán văn bản vào ô <strong>Văn bản</strong>. Bộ đếm cập nhật trực tiếp, giúp bạn kiểm tra độ dài bài viết, bài tập, mô tả sản phẩm hoặc nội dung mạng xã hội.</p><h2>Quy tắc đếm rõ ràng</h2><ul><li><strong>Từ theo khoảng trắng:</strong> mỗi nhóm tách bằng dấu cách, tab hoặc xuống dòng, có ít nhất một chữ cái hoặc chữ số, được tính là một đơn vị. “Xin chào Việt Nam” được tính là 4.</li><li><strong>Ký tự:</strong> đếm cụm ký tự hiển thị (Unicode grapheme), có tính khoảng trắng và ngắt dòng. Một emoji gia đình ghép thành một hình được tính là 1.</li><li><strong>Ký tự không khoảng trắng:</strong> loại khoảng trắng, tab và ngắt dòng.</li><li><strong>Dòng:</strong> tách theo ngắt dòng bạn nhập; dòng tự xuống do chiều rộng màn hình không tạo dòng mới trong thống kê. Ô rỗng có 0 dòng.</li></ul><p>Đây là cách đếm đơn vị theo khoảng trắng, không phải phân tích từ ghép tiếng Việt theo ngôn ngữ học. Dấu câu hoặc emoji đứng riêng không được tính là từ.</p><h2>Câu hỏi thường gặp</h2><details><summary>Tại sao số đếm khác Word hoặc một mạng xã hội?</summary><p>Các nền tảng có thể dùng cách tách từ và tính emoji khác nhau. Hãy dùng quy tắc hoặc bộ đếm của nền tảng đích nếu cần tuân thủ một giới hạn cụ thể.</p></details><details><summary>Văn bản của tôi có được lưu trên máy chủ không?</summary><p>Không có chức năng gửi văn bản lên máy chủ. Việc đếm diễn ra trong trình duyệt. Nội dung ô đếm không được công cụ lưu lại sau khi tải lại trang.</p></details></article>`,
    }),
  },
  {
    path: tools[2].path, name: tools[2].name, title: "Tạo sticker từ ảnh online — Xóa nền, thêm viền, xuất PNG | 94 Tools", description: "Tạo sticker từ ảnh miễn phí ngay trên trình duyệt. Xóa nền ảnh, thêm viền, chữ và tải PNG với trình chỉnh sửa Sticker Canvas.",
    ...toolPage(stickerTool.tool, { ...stickerTool, prose: `<article class="prose"><h2>Cách tạo sticker từ ảnh</h2><ol><li>Bấm <strong>Mở trình tạo sticker</strong>, chọn nút tải ảnh hoặc kéo ảnh vào canvas.</li><li>Chọn ảnh trên canvas, rồi chọn <strong>Remove background</strong> trong bảng chỉnh sửa để xóa nền.</li><li>Điều chỉnh viền (Outline), kích thước hoặc thêm chữ với công cụ văn bản.</li><li>Dùng nút lưu PNG của ảnh đang chọn để tải riêng sticker; nút tải trong menu canvas xuất toàn bố cục.</li></ol><h2>Xóa nền ngay trên thiết bị</h2><p>Model xử lý ảnh chạy trong trình duyệt. Ảnh không được tải lên API xóa nền. Lần sử dụng đầu cần tải các tệp xử lý; trình duyệt có thể lưu bộ nhớ đệm để dùng lại.</p><p>Ảnh rõ nét, chủ thể tách biệt với nền thường dễ xử lý hơn. Tóc, vật trong suốt và nền phức tạp có thể còn viền hoặc bị mất chi tiết. Hãy kiểm tra kết quả trước khi tải xuống.</p><h2>Câu hỏi thường gặp</h2><details><summary>Ảnh PNG tải xuống có nền trong suốt không?</summary><p>Sau khi xóa nền, chức năng lưu riêng ảnh được chọn tạo PNG sticker. Xuất toàn canvas bao gồm nền giấy và các thành phần của bố cục; hai cách xuất cho kết quả khác nhau.</p></details><details><summary>Có dùng trên điện thoại được không?</summary><p>Có giao diện thích ứng với màn hình nhỏ. Xóa nền cần bộ nhớ và thời gian xử lý; máy tính hoặc điện thoại mới thường có trải nghiệm tốt hơn.</p></details><details><summary>Công cụ có tự tạo gói sticker WhatsApp hoặc Zalo không?</summary><p>Hiện công cụ tạo và tải ảnh PNG. Việc nhập ảnh thành gói sticker phụ thuộc chức năng và yêu cầu của ứng dụng nhắn tin bạn sử dụng.</p></details></article>`,
    }),
  },
  ...Object.values(categories).map((category) => ({
    path: category.path, bare: true, crumbs: [{ path: "/", name: "Tất cả công cụ" }, { path: category.path, name: category.name }], title: `${category.name} online miễn phí | 94 Tools`, description: category.description,
    content: `<div class="hero-wrap">${hero("p")}</div><hr class="divider"><section class="category"><div class="category-bar"><div><h1><a class="back" href="/" aria-label="Về trang chủ">${svg("mdi__arrow-left")}</a>Tất cả ${category.name.toLowerCase()}</h1><p>${category.description}</p></div><div class="search small-search"><label class="sr-only" for="category-search">Tìm trong ${category.name.toLowerCase()}</label><input id="category-search" type="text" placeholder="Tìm tất cả công cụ" autocomplete="off" spellcheck="false">${svg("mdi__magnify")}</div></div><div class="tile-grid">${tools.filter((tool) => tool.category === category.slug).map(toolTile).join("")}</div><p class="none" id="tile-empty" hidden>Không có kết quả</p></section>`,
  })),
  {
    path: "/gioi-thieu/", name: "Giới thiệu", crumbs: [{ path: "/", name: "Trang chủ" }, { path: "/gioi-thieu/", name: "Giới thiệu" }], title: "Giới thiệu, quyền riêng tư & mã nguồn | 94 Tools", description: "Thông tin về 94 Tools, cách xử lý dữ liệu trong trình duyệt và các dự án mã nguồn mở được sử dụng.",
    content: `<div class="page-head"><h1>Công cụ nhỏ. Mã nguồn mở.</h1><p class="lead">94 Tools tập hợp những tiện ích đơn giản để bạn xử lý công việc thường ngày ngay trong trình duyệt.</p></div><article class="prose"><h2>Miễn phí và không cần tài khoản</h2><p>Ba công cụ hiện tại được dùng miễn phí. Website được xây dựng từ các dự án mã nguồn mở và các tính năng sẵn có của trình duyệt.</p><h2>Dữ liệu của bạn</h2><p>Văn bản, số và ảnh được xử lý trên thiết bị, không được công cụ gửi lên máy chủ để chuyển đổi. Trình chỉnh sửa sticker lưu công việc trong bộ nhớ trình duyệt để bạn có thể mở lại. Khi dùng máy chung, hãy xóa dữ liệu trang web trong cài đặt trình duyệt sau khi hoàn tất.</p><p>Máy chủ vẫn nhận các yêu cầu tải trang, mã JavaScript và model, bao gồm thông tin kỹ thuật như địa chỉ IP. Phiên bản hiện tại không tích hợp quảng cáo hay công cụ phân tích bên thứ ba.</p><h2>Nguồn mở và giấy phép</h2><ul><li><a href="https://github.com/namkiba13/stickerCanvas/tree/site/free-tools">Mã nguồn website và Sticker Canvas</a> — fork từ <a href="https://github.com/jonbrown66/stickerCanvas">jonbrown66/stickerCanvas</a>, giấy phép MIT. <a href="/licenses/stickerCanvas.txt">Bản quyền và giấy phép</a>.</li><li><a href="https://github.com/namkiba13/read-vietnamese-number-js">read-vietnamese-number</a> — thư viện của Vu Tong, MIT, phiên bản 2.4.0. <a href="/licenses/read-vietnamese-number.txt">Giấy phép</a>.</li><li><a href="https://github.com/namkiba13/JavaScript-Word-Counter-Web-Application">JavaScript Word Counter Web Application</a> — bản mẫu tham khảo của Saeed Kohansal, MIT. Bộ đếm trên website này dùng quy tắc khoảng trắng và Unicode được mô tả trên trang công cụ.</li><li>Giao diện mô phỏng <a href="https://github.com/iib0011/omni-tools">OmniTools</a> của Ibrahima Gaye Coulibaly (MIT, <a href="/assets/omni-tools-LICENSE.txt">giấy phép</a>), viết lại bằng HTML và CSS tĩnh; ảnh nền trang chủ lấy từ OmniTools. Thẻ bài viết tham khảo <a href="https://github.com/themesberg/flowbite">Flowbite</a> (MIT).</li><li>Phông chữ <a href="https://github.com/andrew-paglinawan/QuicksandFamily">Quicksand</a> – SIL Open Font License 1.1 (<a href="/assets/Quicksand-OFL.txt">giấy phép</a>).</li><li>Biểu tượng qua <a href="https://iconify.design/">Iconify</a>: <a href="https://github.com/Templarian/MaterialDesign">Material Design Icons</a> của Pictogrammers, <a href="https://github.com/material-icons/material-icons">Google Material Icons</a> và <a href="https://github.com/google/material-design-icons">Material Symbols</a> (Apache-2.0); <a href="https://github.com/microsoft/fluentui-system-icons">Fluent UI System Icons</a> của Microsoft và <a href="https://www.lsicon.com/">Lsicon</a> của Wis Design (MIT); biểu tượng văn bản <a href="https://www.figma.com/community/file/1166831539721848736">Solar</a> của 480 Design (<a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>).</li></ul><p>Model xóa nền IS-Net sử dụng Apache-2.0. Bộ giải mã HEIC có các thành phần ISC/LGPLv3. Xem <a href="/licenses/THIRD_PARTY_NOTICES.md">thông báo thành phần</a> và <a href="/tao-sticker/editor/models/isnet-general-use-onnx/LICENSE">giấy phép model</a>.</p><h2>Góp ý hoặc báo lỗi</h2><p>Bạn có thể gửi vấn đề kỹ thuật qua <a href="https://github.com/namkiba13/stickerCanvas/issues">GitHub Issues</a>. Khi báo lỗi, vui lòng dùng nội dung mẫu thay cho số tiền hoặc ảnh riêng tư.</p></article>`,
  },
  {
    path: "/blog/", name: "Blog", crumbs: [{ path: "/", name: "Trang chủ" }, { path: "/blog/", name: "Blog" }], title: "Blog 94 Tools — Hướng dẫn và mẹo cho công việc hằng ngày", description: "Hướng dẫn viết số tiền bằng chữ, mẹo soạn thảo văn bản, tạo sticker và các bài viết hữu ích khi dùng công cụ online miễn phí.",
    content: `<div class="page-head"><h1>Hướng dẫn &amp; mẹo hay</h1><p class="lead">Kiến thức ngắn gọn, dễ áp dụng cho công việc văn phòng, viết lách và sáng tạo.</p></div>${postCards(posts)}`,
  },
  ...posts.map((post) => {
    const { tool } = post;
    const related = posts.filter((other) => other !== post).slice(0, 3);
    return {
      path: `/blog/${post.slug}/`, crumbs: [{ path: "/", name: "Trang chủ" }, { path: "/blog/", name: "Blog" }, { path: `/blog/${post.slug}/`, name: post.title }], title: `${esc(post.title)} | 94 Tools`, description: esc(post.description), ogType: "article", lastmod: post.updated || post.date,
      schema: { "@context": "https://schema.org", "@type": "BlogPosting", headline: post.title, description: post.description, datePublished: post.date, dateModified: post.updated || post.date, inLanguage: "vi", mainEntityOfPage: `${origin}/blog/${post.slug}/`, author: { "@type": "Organization", name: "94 Tools", url: `${origin}/` }, publisher: { "@type": "Organization", name: "94 Tools" } },
      content: `<div class="post-head"><span class="chip">${post.category}</span><h1>${esc(post.title)}</h1><p class="lead">${esc(post.description)}</p><p class="small">Bởi <strong>94 Tools</strong> · Cập nhật <time datetime="${post.updated || post.date}">${vnDate(post.updated || post.date)}</time> · ${post.minutes} phút đọc</p></div>${cover(post, true)}<div class="post-layout">${post.toc.length > 2 ? `<nav class="toc" aria-label="Mục lục"><strong>Mục lục</strong><ol>${post.toc.map((item) => `<li><a href="#${item.id}">${item.text}</a></li>`).join("")}</ol></nav>` : ""}<article class="prose">${post.body}${tool ? `<div class="tool-cta"><p class="small">Công cụ miễn phí dùng ngay</p>${toolCard(tool)}</div>` : ""}</article></div>${related.length ? `<hr class="sep"><section><h2 class="title">Bài viết liên quan</h2>${postCards(related)}</section>` : ""}`,
    };
  }),
];

function render(page) {
  const crumbs = page.crumbs ?? [];
  const isTool = tools.some((tool) => tool.path === page.path);
  const schemas = [page.schema ?? (isTool ? { "@context": "https://schema.org", "@type": "WebApplication", name: page.name, url: origin + page.path, applicationCategory: "UtilitiesApplication", operatingSystem: "Web", inLanguage: "vi", isAccessibleForFree: true, offers: { "@type": "Offer", price: "0", priceCurrency: "VND" } } : null), crumbs.length && { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: crumbs.map((crumb, index) => ({ "@type": "ListItem", position: index + 1, name: crumb.name, item: origin + crumb.path })) }].filter(Boolean);
  const nav = [["/#cong-cu", "Công cụ", isTool || page.path.startsWith("/cong-cu/")], ["/blog/", "Blog", page.path.startsWith("/blog/")], ["/gioi-thieu/", "Giới thiệu", page.path === "/gioi-thieu/"]].map(([href, label, current]) => `<a href="${href}"${current ? ' aria-current="page"' : ""}>${label}</a>`).join("");
  return `<!doctype html><html lang="vi"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#F5F5FA"><title>${page.title}</title><meta name="description" content="${page.description}">${page.noindex ? '<meta name="robots" content="noindex,follow">' : `<link rel="canonical" href="${origin}${page.path}"><meta property="og:url" content="${origin}${page.path}">`}<meta property="og:type" content="${page.ogType || "website"}"><meta property="og:locale" content="vi_VN"><meta property="og:title" content="${page.title}"><meta property="og:description" content="${page.description}"><link rel="icon" href="/favicon.svg" type="image/svg+xml"><link rel="preload" href="/assets/Quicksand-VariableFont_wght.ttf" as="font" type="font/ttf" crossorigin><link rel="stylesheet" href="/style.css">${schemas.map((schema) => `<script type="application/ld+json">${JSON.stringify(schema).replaceAll("<", "\u003c")}</script>`).join("")}${page.mode || page.bare ? '<script type="module" src="/tools.js"></script>' : ""}</head><body data-tool="${page.mode || ""}"${page.path === "/" ? ' class="home-bg"' : ""}><a class="skip" href="#main">Đến nội dung chính</a><header class="topbar"><a class="logo" href="/" aria-label="94 Tools — Trang chủ">94 Tools</a><nav aria-label="Menu chính">${nav}<a class="btn contained pill" href="https://github.com/namkiba13/stickerCanvas/issues">${svg("ic__round-feedback")}Góp ý</a></nav></header><main id="main"${page.bare ? "" : ' class="page"'}>${page.bare ? "" : crumbNav(crumbs)}${page.content}</main><footer><p><strong>94 Tools</strong> · Tiện ích mỗi ngày, miễn phí.</p><p>${tools.map((tool) => `<a href="${tool.path}">${tool.name}</a>`).join(" · ")}</p><p>${Object.values(categories).map((category) => `<a href="${category.path}">${category.name}</a>`).join(" · ")} · <a href="/blog/">Blog</a> · <a href="/gioi-thieu/">Giới thiệu · Quyền riêng tư · Mã nguồn</a></p></footer></body></html>`;
}

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
await cp("site/assets", `${output}/assets`, { recursive: true });
await mkdir(`${output}/tao-sticker/editor`, { recursive: true });
await cp("dist", `${output}/tao-sticker/editor`, { recursive: true, filter: (path) => !path.includes(".openai") });
const editorFile = `${output}/tao-sticker/editor/index.html`;
const editor = await readFile(editorFile, "utf8");
await writeFile(editorFile, editor.replace("<title>Sticker Canvas</title>", '<title>Sticker Canvas | 94 Tools</title><meta name="robots" content="noindex,follow">').replace('<div id="root"></div>', '<a href="/tao-sticker/" style="position:fixed;top:18px;left:72px;z-index:100;padding:8px 12px;border-radius:8px;background:#fff;color:#1c76ce;font:14px system-ui;text-decoration:none">← 94 Tools</a><div id="root"></div>'));
for (const page of pages) {
  await mkdir(output + page.path, { recursive: true });
  await writeFile(output + page.path + "index.html", render(page));
}
await writeFile(`${output}/404.html`, render({ path: "/404.html", title: "Không tìm thấy trang | 94 Tools", description: "Trang bạn tìm không tồn tại.", noindex: true, content: '<section class="page-head"><h1>Không tìm thấy trang.</h1><p>Đường dẫn có thể đã thay đổi. Hãy chọn lại một công cụ từ trang chủ.</p><a class="btn contained" href="/">Về trang chủ</a></section>' }));
await writeFile(`${output}/favicon.svg`, '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="15" fill="#1976d2"/><text x="32" y="43" text-anchor="middle" fill="white" font-family="system-ui,sans-serif" font-weight="700" font-size="34">94</text></svg>');
await writeFile(`${output}/sitemap.xml`, `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${pages.map((page) => `<url><loc>${origin}${page.path}</loc>${page.lastmod ? `<lastmod>${page.lastmod}</lastmod>` : ""}</url>`).join("")}</urlset>`);
await writeFile(`${output}/robots.txt`, `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`);
await mkdir(`${output}/licenses`, { recursive: true });
await cp("LICENSE", `${output}/licenses/stickerCanvas.txt`);
await cp("node_modules/read-vietnamese-number/LICENSE.txt", `${output}/licenses/read-vietnamese-number.txt`);
await cp("THIRD_PARTY_NOTICES.md", `${output}/licenses/THIRD_PARTY_NOTICES.md`);
console.log(`Built ${pages.length} static pages and sticker editor for ${origin}`);
