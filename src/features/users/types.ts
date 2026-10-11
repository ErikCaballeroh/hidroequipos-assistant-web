export type User = {
  id: string;
  name: string;
  email: string;
  role: "supervisor" | "empleado";
  active: boolean;
};
