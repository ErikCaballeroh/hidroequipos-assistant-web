import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ChangePasswordForm from "./change-password-form";

describe("ChangePasswordForm", () => {
  it("disables submit until both fields satisfy the validation rule", () => {
    render(<ChangePasswordForm onSubmit={vi.fn()} loading={false} error={null} />);

    const submit = screen.getByRole("button", { name: "Actualizar contraseña" });
    expect(submit).toHaveProperty("disabled", true);

    fireEvent.change(screen.getAllByPlaceholderText("••••••••")[0], {
      target: { value: "current-pass" },
    });
    expect(submit).toHaveProperty("disabled", true);

    fireEvent.change(screen.getAllByPlaceholderText("••••••••")[1], {
      target: { value: "short" },
    });
    expect(submit).toHaveProperty("disabled", true);

    fireEvent.change(screen.getAllByPlaceholderText("••••••••")[1], {
      target: { value: "longenough" },
    });
    expect(submit).toHaveProperty("disabled", false);
  });

  it("submits the current and new password once valid", () => {
    const onSubmit = vi.fn();
    render(<ChangePasswordForm onSubmit={onSubmit} loading={false} error={null} />);

    fireEvent.change(screen.getAllByPlaceholderText("••••••••")[0], {
      target: { value: "current-pass" },
    });
    fireEvent.change(screen.getAllByPlaceholderText("••••••••")[1], {
      target: { value: "longenough" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Actualizar contraseña" }));

    expect(onSubmit).toHaveBeenCalledWith({
      currentPassword: "current-pass",
      newPassword: "longenough",
    });
  });
});
