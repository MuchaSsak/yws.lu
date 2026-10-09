import { describe, expect, it } from "vitest";

import { formatDate } from "~/lib/format";

describe("formatDate", () => {
  it("writes the day as each locale does (site/i18n.md § Formatting)", () => {
    expect(formatDate("2026-04-09", "en")).toBe("9 April 2026");
    expect(formatDate("2026-04-09", "fr")).toBe("9 avril 2026");
  });
  it("keeps the first of the month on its day", () => {
    expect(formatDate("2026-01-01", "fr")).toBe("1 janvier 2026");
  });
});
