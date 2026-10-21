import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Modal, StatusBadge, Toggle } from "./index";

describe("Toggle", () => {
  it("reflects the checked state and calls onChange when clicked", () => {
    const onChange = vi.fn();
    render(<Toggle checked={false} onChange={onChange} />);

    const button = screen.getByRole("switch");
    expect(button.getAttribute("aria-checked")).toBe("false");

    fireEvent.click(button);
    expect(onChange).toHaveBeenCalledWith(true);
  });
});

describe("StatusBadge", () => {
  it('shows "Activo" when active', () => {
    render(<StatusBadge active />);
    expect(screen.getByText("Activo")).toBeTruthy();
  });

  it('shows "Inactivo" when not active', () => {
    render(<StatusBadge active={false} />);
    expect(screen.getByText("Inactivo")).toBeTruthy();
  });
});

describe("Modal", () => {
  it("calls onClose on Escape and on a backdrop click, but not on content click", () => {
    const onClose = vi.fn();
    const { container } = render(
      <Modal title="Confirmar" onClose={onClose}>
        <p>Contenido</p>
      </Modal>,
    );

    fireEvent.mouseDown(screen.getByText("Contenido"));
    expect(onClose).not.toHaveBeenCalled();

    fireEvent.keyDown(window, { key: "Escape" });
    expect(onClose).toHaveBeenCalledTimes(1);

    const backdrop = container.firstChild as HTMLElement;
    fireEvent.mouseDown(backdrop);
    expect(onClose).toHaveBeenCalledTimes(2);
  });
});
