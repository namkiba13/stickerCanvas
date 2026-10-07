import { countText, readLines, searchKey } from "./logic.mjs";
import { saveUpload } from "../lib/upload-handoff.ts";

const matches = (element, words) => {
  const key = searchKey(`${element.textContent} ${element.dataset.keywords ?? ""}`);
  return words.every((word) => key.includes(word));
};
const wordsOf = (value) => searchKey(value).split(/\s+/).filter(Boolean);

// Hero search: ARIA combobox with grouped listbox (WAI-ARIA APG pattern).
const field = document.querySelector("#tool-search");
if (field) {
  const list = document.querySelector("#tool-list");
  const options = [...list.querySelectorAll('[role="option"]')];
  let active = -1;
  const visible = () => options.filter((option) => !option.hidden);
  const setActive = (index) => {
    const shown = visible();
    active = shown.length ? (index + shown.length) % shown.length : -1;
    options.forEach((option) => option.setAttribute("aria-selected", "false"));
    const option = shown[active];
    if (option) {
      option.setAttribute("aria-selected", "true");
      option.scrollIntoView({ block: "nearest" });
    }
    field.setAttribute("aria-activedescendant", option?.id ?? "");
  };
  const open = (show) => {
    list.hidden = !show;
    field.setAttribute("aria-expanded", String(show));
    if (!show) setActive(-1);
  };
  const filter = () => {
    const words = wordsOf(field.value);
    for (const option of options) option.hidden = !matches(option, words);
    for (const group of list.querySelectorAll('[role="group"]')) group.hidden = !group.querySelector('[role="option"]:not([hidden])');
    list.querySelector(".none").hidden = visible().length > 0;
    setActive(-1);
    open(true);
  };
  // Keep focus in the field so blur does not close the list before an option click lands.
  list.addEventListener("mousedown", (event) => event.preventDefault());
  field.addEventListener("input", filter);
  field.addEventListener("focus", filter);
  field.addEventListener("blur", () => setTimeout(() => open(false), 150));
  field.addEventListener("keydown", (event) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      if (list.hidden) filter();
      setActive(active + (event.key === "ArrowDown" ? 1 : -1));
    } else if (event.key === "Enter") {
      const option = visible()[Math.max(active, 0)];
      if (option && !list.hidden) {
        event.preventDefault();
        option.click();
      }
    } else if (event.key === "Escape") {
      open(false);
    }
  });
}

// Category page: filter tool tiles in place.
const categorySearch = document.querySelector("#category-search");
if (categorySearch) {
  const tiles = [...document.querySelectorAll(".tile-grid .tool-tile")];
  categorySearch.addEventListener("input", () => {
    const words = wordsOf(categorySearch.value);
    for (const tile of tiles) tile.hidden = !matches(tile, words);
    document.querySelector("#tile-empty").hidden = tiles.some((tile) => !tile.hidden);
  });
}

const input = document.querySelector("#input");
const status = document.querySelector("#status");
const result = document.querySelector("#result");
const copy = document.querySelector("#copy");
const mode = document.body.dataset.tool;
const t = JSON.parse(document.querySelector("#i18n")?.textContent ?? "{}");

// Sticker page: pick or drop a photo here, then open the editor with it.
const drop = document.querySelector("#sticker-drop");
if (drop) {
  const picker = document.querySelector("#sticker-file");
  const open = async (file) => {
    if (!file) return;
    try {
      await saveUpload(file);
      location.href = `${drop.href}#upload`;
    } catch {
      location.href = drop.href;
    }
  };
  drop.addEventListener("click", (event) => {
    event.preventDefault();
    picker.click();
  });
  picker.addEventListener("change", () => open(picker.files[0]));
  drop.addEventListener("dragover", (event) => {
    event.preventDefault();
    drop.classList.add("over");
  });
  drop.addEventListener("dragleave", () => drop.classList.remove("over"));
  drop.addEventListener("drop", (event) => {
    event.preventDefault();
    drop.classList.remove("over");
    open([...event.dataTransfer.files].find((file) => file.type.startsWith("image/") || /\.(heic|heif)$/i.test(file.name)));
  });
}
const option = (name) => document.querySelector(`input[name="${name}"]:checked`)?.value ?? "";

function update() {
  status.textContent = "";
  if (mode === "number") {
    const { value, errors } = readLines(input.value, option("format"), option("unit"), t);
    result.value = value;
    input.setAttribute("aria-invalid", String(errors > 0));
    status.textContent = errors ? t.errors.replace("{n}", errors) : "";
    copy.disabled = errors > 0 || !value.trim();
    document.querySelector("#download").disabled = copy.disabled;
  } else {
    if (typeof Intl.Segmenter !== "function") {
      status.textContent = t.segmenter;
      copy.disabled = true;
      return;
    }
    for (const [key, value] of Object.entries(countText(input.value))) {
      document.querySelector(`[data-count="${key}"]`).textContent = value.toLocaleString(document.documentElement.lang);
    }
    copy.disabled = !input.value;
  }
}

if (input) {
  const file = document.querySelector("#file");
  input.addEventListener("input", update);
  document.querySelectorAll('.options input[type="radio"]').forEach((radio) => radio.addEventListener("change", update));
  document.querySelector("#clear").addEventListener("click", () => {
    input.value = "";
    update();
    input.focus();
  });
  document.querySelector("#import").addEventListener("click", () => file.click());
  file.addEventListener("change", async () => {
    const [chosen] = file.files;
    if (!chosen) return;
    input.value = (await chosen.text()).slice(0, input.maxLength);
    file.value = "";
    update();
  });
  document.querySelector("#download")?.addEventListener("click", () => {
    const link = document.createElement("a");
    link.href = URL.createObjectURL(new Blob([result.value], { type: "text/plain;charset=utf-8" }));
    link.download = t.file;
    link.click();
    URL.revokeObjectURL(link.href);
  });
  copy.addEventListener("click", async () => {
    const source = result ?? input;
    try {
      await navigator.clipboard.writeText(source.value);
      status.textContent = t.copied;
    } catch {
      source.focus();
      source.select();
      status.textContent = t.selected;
    }
  });
  for (const card of document.querySelectorAll(".ex-card")) {
    const tryExample = () => {
      input.value = card.dataset.input;
      for (const name of ["format", "unit"]) {
        const radio = document.querySelector(`input[name="${name}"][value="${card.dataset[name]}"]`);
        if (radio && name in card.dataset) radio.checked = true;
      }
      update();
      document.querySelector("#tool").scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
      input.focus({ preventScroll: true });
    };
    card.addEventListener("click", tryExample);
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        tryExample();
      }
    });
  }
  update();
}
