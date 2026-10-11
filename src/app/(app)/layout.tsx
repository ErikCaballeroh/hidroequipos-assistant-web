"use client";

import { useEffect, useState, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import Sidebar from "@/components/layout/sidebar";
import { Skeleton } from "@/components/ui";
import { useLogout } from "@/features/auth/hooks/use-logout";
import { useMe } from "@/features/auth/hooks/use-me";
import { getToken } from "@/lib/auth/session";

export default function AppLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const logout = useLogout();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Reads localStorage (unavailable during SSR) to decide whether a session
    // exists. This can only run client-side, after mount, hence the effect.
    const storedToken = getToken();
    if (!storedToken) {
      router.replace("/login");
    } else {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setToken(storedToken);
    }
  }, [router]);

  const { data: user, isLoading, isError } = useMe({ enabled: !!token });
  const isForbiddenAdminAccess = user?.role === "employee" && pathname.startsWith("/admin");

  useEffect(() => {
    if (isForbiddenAdminAccess) {
      router.replace("/");
    }
  }, [isForbiddenAdminAccess, router]);

  if (!token) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Skeleton className="size-8 rounded-full" />
      </div>
    );
  }

  if (isError || !user || isForbiddenAdminAccess) {
    // The 401 interceptor already clears the session and redirects to /login;
    // isForbiddenAdminAccess is handled by the effect above.
    return null;
  }

  return (
    <div className="grid h-full grid-cols-[220px_1fr]">
      <Sidebar user={user} onLogout={logout} />
      <main className="min-w-0 overflow-hidden bg-white">{children}</main>
    </div>
  );
}
