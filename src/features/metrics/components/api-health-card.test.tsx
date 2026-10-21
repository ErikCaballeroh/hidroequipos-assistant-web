import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ApiHealthCard from "./api-health-card";

describe("ApiHealthCard", () => {
  it("shows an empty state when there are no logs", () => {
    render(<ApiHealthCard logs={[]} />);
    expect(screen.getByText("Sin llamadas registradas en este periodo.")).toBeTruthy();
  });

  it("colors success/failure and falls back to an em dash with no response time", () => {
    render(
      <ApiHealthCard
        logs={[
          { id: 1, createdAt: "2026-10-17T17:06:00.000Z", success: true, errorCode: null, responseTimeMs: 500 },
          { id: 2, createdAt: "2026-10-17T17:06:00.000Z", success: false, errorCode: "TIMEOUT", responseTimeMs: null },
        ]}
      />,
    );

    expect(screen.getByText("Éxito")).toBeTruthy();
    expect(screen.getByText("Error")).toBeTruthy();
    expect(screen.getByText("500 ms")).toBeTruthy();
    expect(screen.getByText("—")).toBeTruthy();
  });
});
