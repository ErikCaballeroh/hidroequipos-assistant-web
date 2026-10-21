import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import TraceSources from "./trace-sources";

describe("TraceSources", () => {
  it('shows "Sin coincidencias." when there are no sources', () => {
    render(<TraceSources title="Productos" sources={[]} />);
    expect(screen.getByText("Sin coincidencias.")).toBeTruthy();
  });

  it("renders each source with its rounded percentage", () => {
    render(
      <TraceSources
        title="Productos"
        sources={[
          { name: "Alguicida 10L", similarity: 0.853 },
          { name: "Sulfato de Cobre", similarity: 0.5 },
        ]}
      />,
    );

    expect(screen.getByText("Alguicida 10L")).toBeTruthy();
    expect(screen.getByText("85%")).toBeTruthy();
    expect(screen.getByText("Sulfato de Cobre")).toBeTruthy();
    expect(screen.getByText("50%")).toBeTruthy();
  });
});
