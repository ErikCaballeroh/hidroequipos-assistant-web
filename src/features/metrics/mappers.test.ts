import { describe, expect, it } from "vitest";
import { formatDateTime, toApprovalPercent } from "./mappers";

describe("toApprovalPercent", () => {
  it("converts a 0-1 rate to a rounded 0-100 percentage", () => {
    expect(toApprovalPercent(0.75)).toBe(75);
  });

  it("rounds to the nearest integer", () => {
    expect(toApprovalPercent(0.666)).toBe(67);
  });

  it("returns 0 when there is no data", () => {
    expect(toApprovalPercent(null)).toBe(0);
  });
});

describe("formatDateTime", () => {
  it("formats an ISO date as day/month, hour:minute", () => {
    const formatted = formatDateTime("2026-10-17T17:06:00.000Z");
    expect(formatted).toMatch(/^\d{2}\/\d{2}, \d{2}:\d{2}/);
  });
});
