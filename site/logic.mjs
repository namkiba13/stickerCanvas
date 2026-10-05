import { ReadingConfig, doReadNumber } from "read-vietnamese-number";

export function readAmount(input, format = "vn", unit = "đồng") {
  const value = input.trim();
  // Require correctly grouped thousands before the library removes separators.
  const pattern = format === "vn"
    ? /^-?(?:\d+|\d{1,3}(?:\.\d{3})+)(?:,\d+)?$/
    : /^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/;
  if (!pattern.test(value)) throw new Error("Số hoặc dấu phân cách chưa đúng định dạng đã chọn.");
  if (value.length > 300) throw new Error("Mỗi số tối đa 300 ký tự.");
  const config = new ReadingConfig();
  // Normalize validated input; the upstream thousands separator is a regex.
  const normalized = format === "vn" ? value.replaceAll(".", "").replace(",", ".") : value.replaceAll(",", "");
  config.pointText = "phẩy";
  config.unit = unit ? [unit] : [];
  const result = doReadNumber(normalized, config);
  return result.charAt(0).toUpperCase() + result.slice(1);
}

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
