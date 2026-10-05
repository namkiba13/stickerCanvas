import { readAmount, countText, searchKey } from "./logic.mjs";

const finder = document.querySelector("#finder");
if (finder) {
  const cards = [...document.querySelectorAll("#tool-grid .card")];
  const field = document.querySelector("#tool-search");
  const filters = [...document.querySelectorAll("[data-filter]")];
  let category = "";
  const filter = () => {
    const words = searchKey(field.value).split(/\s+/).filter(Boolean);
    let shown = 0;
    for (const card of cards) {
      const key = searchKey(`${card.textContent} ${card.dataset.keywords}`);
      card.hidden = !((!category || card.dataset.category === category) && words.every((word) => key.includes(word)));
      if (!card.hidden) shown++;
    }
    document.querySelector("#tool-empty").hidden = shown > 0;
    document.querySelector("#tool-count").textContent = `${shown} công cụ`;
  };
  finder.hidden = false;
  document.querySelector("#filters").hidden = false;
  field.addEventListener("input", filter);
  finder.addEventListener("submit", (event) => {
    event.preventDefault();
    cards.find((card) => !card.hidden)?.click();
  });
  for (const button of filters) {
    button.addEventListener("click", () => {
      category = button.dataset.filter;
      for (const other of filters) other.setAttribute("aria-pressed", String(other === button));
      filter();
    });
  }
}

const input = document.querySelector("#input");
const status = document.querySelector("#status");
const result = document.querySelector("#result");
const copy = document.querySelector("#copy");
const mode = document.body.dataset.tool;

function update() {
  status.textContent = "";
  if (mode === "number") {
    let errors = 0;
    result.value = input.value.split(/\r\n|\r|\n/).map((line, index) => {
      if (!line.trim()) return "";
      try {
        return readAmount(line, document.querySelector("#format").value, document.querySelector("#unit").value);
      } catch (error) {
        errors++;
        return `Dòng ${index + 1}: ${error.message}`;
      }
    }).join("\n");
    input.setAttribute("aria-invalid", String(errors > 0));
    status.textContent = errors ? `${errors} dòng cần sửa. Kiểm tra định dạng số bên dưới.` : "";
    copy.disabled = errors > 0 || !result.value.trim();
  } else {
    if (typeof Intl.Segmenter !== "function") {
      status.textContent = "Vui lòng cập nhật trình duyệt để đếm ký tự Unicode và emoji chính xác.";
      copy.disabled = true;
      return;
    }
    for (const [key, value] of Object.entries(countText(input.value))) {
      document.querySelector(`[data-count="${key}"]`).textContent = value.toLocaleString("vi-VN");
    }
    copy.disabled = !input.value;
  }
}

if (input) {
  input.addEventListener("input", update);
  document.querySelectorAll("select").forEach((select) => select.addEventListener("change", update));
  document.querySelector("#example").addEventListener("click", () => {
    input.value = mode === "number" ? "1250000\n15005\n0" : "Xin chào Việt Nam! 👋\nCông cụ nhỏ, giúp việc mỗi ngày nhẹ hơn.";
    update();
    input.focus();
  });
  document.querySelector("#clear").addEventListener("click", () => {
    input.value = "";
    update();
    input.focus();
  });
  copy.addEventListener("click", async () => {
    const source = result ?? input;
    try {
      await navigator.clipboard.writeText(source.value);
      status.textContent = "Đã sao chép.";
    } catch {
      source.focus();
      source.select();
      status.textContent = "Đã chọn nội dung. Nhấn Ctrl+C hoặc chọn Sao chép trên điện thoại.";
    }
  });
  update();
}
