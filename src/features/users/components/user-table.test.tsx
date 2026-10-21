import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import UserTable from "./user-table";
import type { User } from "../types";

const user: User = {
  id: 1,
  name: "María Fernández",
  email: "maria.fernandez@hidroequipos.mx",
  role: "supervisor",
  active: true,
};

describe("UserTable", () => {
  it("shows an empty state when there are no users", () => {
    render(<UserTable users={[]} onResetPassword={vi.fn()} onToggleActive={vi.fn()} />);
    expect(screen.getByText("No hay usuarios registrados.")).toBeTruthy();
  });

  it("renders the mapped role label and wires up the row actions", () => {
    const onResetPassword = vi.fn();
    const onToggleActive = vi.fn();
    render(
      <UserTable users={[user]} onResetPassword={onResetPassword} onToggleActive={onToggleActive} />,
    );

    expect(screen.getByText("María Fernández")).toBeTruthy();
    expect(screen.getByText("Supervisor")).toBeTruthy();

    fireEvent.click(screen.getByText("Resetear contraseña"));
    expect(onResetPassword).toHaveBeenCalledWith(user);

    fireEvent.click(screen.getByRole("switch"));
    expect(onToggleActive).toHaveBeenCalledWith(user);
  });
});
