"use client";

import { useState } from "react";
import PageHeader from "@/components/layout/page-header";
import { Button, ErrorState, Icon, Skeleton } from "@/components/ui";
import NewUserModal from "@/features/users/components/new-user-modal";
import ResetPasswordModal from "@/features/users/components/reset-password-modal";
import UserTable from "@/features/users/components/user-table";
import { useResetPassword } from "@/features/users/hooks/use-reset-password";
import { useUsers } from "@/features/users/hooks/use-users";
import type { User } from "@/features/users/types";

export default function UsersPage() {
  const { users, isLoading, isError, createUser, isCreating, createError, toggleActive } =
    useUsers();
  const { resetPassword, loading: resetting } = useResetPassword();
  const [resetFor, setResetFor] = useState<User | null>(null);
  const [tempPw, setTempPw] = useState("");
  const [newOpen, setNewOpen] = useState(false);

  const openReset = async (u: User) => {
    try {
      const password = await resetPassword(u.id);
      setTempPw(password);
      setResetFor(u);
    } catch {
      // ignore: the reset simply doesn't open the confirmation modal
    }
  };

  return (
    <div className="flex h-full flex-col">
      <PageHeader
        title="Usuarios"
        action={
          <Button onClick={() => setNewOpen(true)}>
            <Icon name="plus" size={16} />
            Nuevo empleado
          </Button>
        }
      />

      <div className="flex-1 overflow-auto px-6 py-4">
        {isLoading && (
          <div className="flex flex-col gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-11 w-full" />
            ))}
          </div>
        )}

        {isError && (
          <ErrorState
            title="No se pudo cargar la lista de usuarios."
            onRetry={() => window.location.reload()}
          />
        )}

        {!isLoading && !isError && (
          <UserTable
            users={users}
            onResetPassword={openReset}
            onToggleActive={(u) => toggleActive(u)}
          />
        )}
      </div>

      {resetFor && !resetting && (
        <ResetPasswordModal
          user={resetFor}
          password={tempPw}
          onClose={() => setResetFor(null)}
        />
      )}

      {newOpen && (
        <NewUserModal
          onClose={() => setNewOpen(false)}
          loading={isCreating}
          error={createError}
          onCreate={async (input) => {
            try {
              await createUser(input);
              setNewOpen(false);
            } catch {
              // the error message is already surfaced via createError
            }
          }}
        />
      )}
    </div>
  );
}
