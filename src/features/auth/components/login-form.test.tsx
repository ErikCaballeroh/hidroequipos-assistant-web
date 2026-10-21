import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import LoginForm from "./login-form";

describe("LoginForm", () => {
  it("submits the entered email and password", () => {
    const onSubmit = vi.fn();
    render(<LoginForm onSubmit={onSubmit} loading={false} error={null} />);

    fireEvent.change(screen.getByPlaceholderText("nombre@hidroequipos.mx"), {
      target: { value: "empleado@hidroequipos.mx" },
    });
    fireEvent.change(screen.getByPlaceholderText("••••••••"), {
      target: { value: "secret123" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Iniciar sesión" }));

    expect(onSubmit).toHaveBeenCalledWith({
      email: "empleado@hidroequipos.mx",
      password: "secret123",
    });
  });

  it("shows the error message when present", () => {
    render(<LoginForm onSubmit={vi.fn()} loading={false} error="Credenciales inválidas." />);
    expect(screen.getByText("Credenciales inválidas.")).toBeTruthy();
  });
});
