import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import TopProductsCard from "./top-products-card";

describe("TopProductsCard", () => {
  it("shows an empty state when there are no products", () => {
    render(<TopProductsCard products={[]} />);
    expect(screen.getByText("Sin consultas registradas en este periodo.")).toBeTruthy();
  });

  it("renders a bar per product, scaled against the highest count", () => {
    const { container } = render(
      <TopProductsCard
        products={[
          { productId: 1, sku: "QUI-003", name: "Alguicida 10L", count: 20 },
          { productId: 2, sku: "QUI-004", name: "Alguicida 1L", count: 10 },
        ]}
      />,
    );

    expect(screen.getByText("Alguicida 10L")).toBeTruthy();
    expect(screen.getByText("Alguicida 1L")).toBeTruthy();

    const bars = container.querySelectorAll<HTMLDivElement>(".bg-primary");
    expect(bars[0].style.width).toBe("100%");
    expect(bars[1].style.width).toBe("50%");
  });
});
