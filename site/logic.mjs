import { ReadingConfig, doReadNumber } from "read-vietnamese-number";

export function readAmount(input, format = "vn", unit = "đồng") {
  const value = input.trim();
  // Require correctly grouped thousands before the library removes separators.
  const pattern = format === "vn"
    ? /^-?(?:\d+|\d{1,3}(?:\.\d{3})+)(?:,\d+)?$/
    : /^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/;
  if (!pattern.test(value)) throw Object.assign(new Error("Số hoặc dấu phân cách chưa đúng định dạng đã chọn."), { code: "format" });
  if (value.length > 300) throw Object.assign(new Error("Mỗi số tối đa 300 ký tự."), { code: "length" });
  const config = new ReadingConfig();
  // Normalize validated input; the upstream thousands separator is a regex.
  const normalized = format === "vn" ? value.replaceAll(".", "").replace(",", ".") : value.replaceAll(",", "");
  config.pointText = "phẩy";
  config.unit = unit ? [unit] : [];
  const result = doReadNumber(normalized, config);
  return result.charAt(0).toUpperCase() + result.slice(1);
}

// One number per line; blank lines stay blank so the column can be pasted back into Excel.
// t: optional localized { line, format, length } messages; output stays Vietnamese.
export function readLines(text, format, unit, t = {}) {
  let errors = 0;
  const value = text.split(/\r\n|\r|\n/).map((line, index) => {
    if (!line.trim()) return "";
    try {
      return readAmount(line, format, unit);
    } catch (error) {
      errors++;
      return `${t.line ?? "Dòng"} ${index + 1}: ${t[error.code] ?? error.message}`;
    }
  }).join("\n");
  return { value, errors };
}

// Accent-insensitive key so "dem tu" finds "Đếm từ".
export const searchKey = (text) => text.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase().replaceAll("đ", "d");

export function countText(text) {
  const graphemes = new Intl.Segmenter("vi", { granularity: "grapheme" }).segment(text);
  let characters = 0;
  let withoutSpaces = 0;
  for (const { segment } of graphemes) {
    characters++;
    if (!/^\s+$/u.test(segment)) withoutSpaces++;
  }
  return {
    words: (text.match(/\S+/gu) ?? []).filter((token) => /[\p{L}\p{N}]/u.test(token)).length,
    characters,
    withoutSpaces,
    lines: text ? text.split(/\r\n|\r|\n/u).length : 0,
  };
}
