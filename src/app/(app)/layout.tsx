import type { ReactNode } from "react";
import Sidebar from "@/components/layout/sidebar";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="grid h-full grid-cols-[220px_1fr]">
      <Sidebar />
      <main className="min-w-0 overflow-hidden bg-white">{children}</main>
    </div>
  );
}
