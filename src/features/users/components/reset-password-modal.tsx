import { Button, Modal } from "@/components/ui";
import type { User } from "../types";

export default function ResetPasswordModal({
  user,
  password,
  onClose,
}: {
  user: User;
  password: string;
  onClose: () => void;
}) {
  return (
    <Modal
      title="Resetear contraseña"
      onClose={onClose}
      footer={
        <Button variant="secondary" onClick={onClose}>
          Cerrar
        </Button>
      }
    >
      <p className="text-sm text-slate">
        Contraseña temporal para <span className="text-ink">{user.name}</span>:
      </p>
      <p className="my-4 text-center font-display text-3xl font-medium tracking-wide text-primary">
        {password}
      </p>
      <p className="text-xs text-slate">
        Esta contraseña se muestra UNA sola vez. Cópiala y entrégasela al
        empleado.
      </p>
    </Modal>
  );
}
