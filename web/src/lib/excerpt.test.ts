import { describe, expect, it } from "vitest";

import { excerpt } from "~/lib/excerpt";

describe("excerpt", () => {
  it("skips a credit line and takes the first sentence of a long paragraph", () => {
    const text = `Supported by Erasmus+\n\n${"Finding housing in Luxembourg is hard for young people. ".repeat(4)}`;
    expect(excerpt(text)).toBe("Finding housing in Luxembourg is hard for young people.");
  });

  it("keeps a short paragraph whole", () => {
    expect(excerpt("Understanding your rights. Preventing violence. Finding help.\n\nMore.")).toBe(
      "Understanding your rights. Preventing violence. Finding help.",
    );
  });

  it("skips headings and lists, unwraps links and emphasis", () => {
    expect(excerpt("### Goals\n\n- one\n- two\n\nSee *the* [guide](https://example.org) for all five steps.")).toBe(
      "See the guide for all five steps.",
    );
  });

  it("cuts a very long sentence at a word, with an ellipsis", () => {
    const result = excerpt(`${"word ".repeat(60)}end.`);
    expect(result.endsWith("…")).toBe(true);
    expect(result.length).toBeLessThanOrEqual(170);
    expect(result).not.toMatch(/\s…$/);
  });
});
