import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { EmptyState, ErrorState } from "./index";

describe("EmptyState", () => {
  it("renders the title", () => {
    render(<EmptyState title="No hay productos en el catálogo." />);
    expect(screen.getByText("No hay productos en el catálogo.")).toBeTruthy();
  });

  it("renders the optional action", () => {
    render(<EmptyState title="Vacío" action={<button>Crear nuevo</button>} />);
    expect(screen.getByText("Crear nuevo")).toBeTruthy();
  });
});

describe("ErrorState", () => {
  it("renders the title and calls onRetry", () => {
    const onRetry = vi.fn();
    render(<ErrorState title="No se pudo cargar." onRetry={onRetry} />);

    expect(screen.getByText("No se pudo cargar.")).toBeTruthy();
    fireEvent.click(screen.getByText("Reintentar"));
    expect(onRetry).toHaveBeenCalledTimes(1);
  });
});
