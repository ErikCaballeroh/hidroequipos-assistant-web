import { describe, expect, it } from "vitest";
import { formatDate, toKnowledgeSources, toPercentage } from "./mappers";

describe("toPercentage", () => {
  it("converts a 0-1 similarity to a rounded 0-100 percentage", () => {
    expect(toPercentage(0.853)).toBe(85);
  });

  it("rounds 0.5 up", () => {
    expect(toPercentage(0.005)).toBe(1);
  });
});

describe("formatDate", () => {
  it("formats an ISO date including the year", () => {
    const formatted = formatDate("2026-10-17T17:06:00.000Z");
    expect(formatted).toMatch(/^\d{2}\/\d{2}\/\d{4}, \d{2}:\d{2}/);
  });
});

describe("toKnowledgeSources", () => {
  it("maps knowledge entries' title to name, keeping similarity", () => {
    const result = toKnowledgeSources([
      { id: 1, title: "Cómo tratar agua verde", distance: 0.15, similarity: 0.85 },
    ]);
    expect(result).toEqual([{ name: "Cómo tratar agua verde", similarity: 0.85 }]);
  });

  it("returns an empty array for no knowledge sources", () => {
    expect(toKnowledgeSources([])).toEqual([]);
  });
});
