import type { User } from "../types";

export const users: User[] = [
  { id: "u1", name: "María Fernández", email: "maria.fernandez@hidroequipos.mx", role: "supervisor", active: true },
  { id: "u2", name: "Carlos Gómez", email: "carlos.gomez@hidroequipos.mx", role: "empleado", active: true },
  { id: "u3", name: "Laura Sánchez", email: "laura.sanchez@hidroequipos.mx", role: "empleado", active: false },
];
