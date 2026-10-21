import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Pagination } from "./pagination";

describe("Pagination", () => {
  it("renders nothing when there is no data", () => {
    const { container } = render(
      <Pagination page={1} pageSize={15} total={0} onPageChange={vi.fn()} />,
    );
    expect(container.firstChild).toBeNull();
  });

  it("shows the current range and page", () => {
    render(<Pagination page={2} pageSize={15} total={35} onPageChange={vi.fn()} />);
    expect(screen.getByText("Mostrando 16–30 de 35")).toBeTruthy();
    expect(screen.getByText("Página 2 de 3")).toBeTruthy();
  });

  it('disables "Anterior" on the first page', () => {
    render(<Pagination page={1} pageSize={15} total={35} onPageChange={vi.fn()} />);
    expect(screen.getByText("Anterior")).toHaveProperty("disabled", true);
    expect(screen.getByText("Siguiente")).toHaveProperty("disabled", false);
  });

  it('disables "Siguiente" on the last page', () => {
    render(<Pagination page={3} pageSize={15} total={35} onPageChange={vi.fn()} />);
    expect(screen.getByText("Siguiente")).toHaveProperty("disabled", true);
    expect(screen.getByText("Anterior")).toHaveProperty("disabled", false);
  });

  it("calls onPageChange with the next/previous page", () => {
    const onPageChange = vi.fn();
    render(<Pagination page={2} pageSize={15} total={35} onPageChange={onPageChange} />);

    fireEvent.click(screen.getByText("Siguiente"));
    expect(onPageChange).toHaveBeenCalledWith(3);

    fireEvent.click(screen.getByText("Anterior"));
    expect(onPageChange).toHaveBeenCalledWith(1);
  });
});
