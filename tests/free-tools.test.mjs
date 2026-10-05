import assert from "node:assert/strict";
import test from "node:test";
import { readAmount, countText } from "../site/logic.mjs";

test("Vietnamese amounts retain precision, validate grouping, and respect the selected locale", () => {
  assert.equal(readAmount("1.250.000"), "Một triệu hai trăm năm mươi nghìn đồng");
  assert.equal(readAmount("0"), "Không đồng");
  assert.match(readAmount("-15"), /^Âm mười lăm đồng$/);
  assert.equal(readAmount("1,5"), "Một phẩy năm đồng");
  assert.equal(readAmount("1,250,000", "en"), readAmount("1.250.000"));
  assert.equal(readAmount("5", "vn", ""), "Năm");
  assert.notEqual(readAmount("9007199254740993"), readAmount("9007199254740992"));
  for (const invalid of ["", "1.25", "1.000.00", "1e6", "<script>", "1 000", "9".repeat(301)]) {
    assert.throws(() => readAmount(invalid));
  }
});

test("text counting follows documented whitespace and grapheme rules", () => {
  assert.deepEqual(countText(""), { words:0, characters:0, withoutSpaces:0, lines:0 });
  assert.equal(countText("Xin chào Việt Nam!").words, 4);
  assert.equal(countText("... 👨‍👩‍👧‍👦").words, 0);
  assert.equal(countText("á").characters, countText("a\u0301").characters);
  assert.equal(countText("👨‍👩‍👧‍👦").characters, 1);
  assert.equal(countText("a\r\nb").lines, 2);
  assert.equal(countText("a\r\nb").characters, 3);
  assert.equal(countText(" \t\n").withoutSpaces, 0);
  assert.equal(countText("xin\tchào\n123").words, 3);
});
