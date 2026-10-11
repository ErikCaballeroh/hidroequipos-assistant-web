import type { UserRole } from "./types";

export function roleLabel(role: UserRole): string {
  return role === "supervisor" ? "Supervisor" : "Empleado";
}
