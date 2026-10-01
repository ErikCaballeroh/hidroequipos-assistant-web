"use client";

import { type ReactNode } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { DropLogo, Icon } from "./ui";

const nav: { href: string; label: string; icon: string; group: string }[] = [
  { href: "/", label: "Chat", icon: "chat", group: "Asistente" },
  { href: "/admin/products", label: "Catálogo", icon: "box", group: "Catálogo" },
  { href: "/admin/knowledge-base", label: "Base de conocimiento", icon: "book", group: "Catálogo" },
  { href: "/admin/query-templates", label: "Plantillas rápidas", icon: "layout", group: "Gestión" },
  { href: "/admin/users", label: "Usuarios", icon: "users", group: "Gestión" },
  { href: "/admin/metrics", label: "Métricas", icon: "chart", group: "Monitoreo" },
  { href: "/admin/messages/m1", label: "Trazabilidad", icon: "activity", group: "Monitoreo" },
];

export default function Shell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const groups = [...new Set(nav.map((n) => n.group))];

  return (
    <div className="grid h-full grid-cols-[220px_1fr]">
      {/* Nav rail */}
      <nav className="flex flex-col border-r border-line bg-subtle">
        <div className="flex h-16 items-center gap-2 border-b border-line px-4">
          <DropLogo />
          <span className="font-display text-[15px] leading-tight text-ink">
            HidroEquipos
          </span>
        </div>

        <div className="flex-1 overflow-y-auto py-3">
          {groups.map((g) => (
            <div key={g} className="mb-3">
              <p className="px-4 pb-1 text-[11px] font-medium uppercase tracking-wide text-slate">
                {g}
              </p>
              {nav
                .filter((n) => n.group === g)
                .map((n) => {
                  const on = n.href === "/" ? pathname === "/" : pathname.startsWith(n.href);
                  return (
                    <Link
                      key={n.href}
                      href={n.href}
                      className="flex w-full items-center gap-2.5 px-4 py-2 text-sm transition-colors duration-150 [transition-timing-function:var(--ease-swift)]"
                      style={{
                        color: on ? "#0870b8" : "#005068",
                        background: on ? "#ffffff" : "transparent",
                        boxShadow: on ? "inset 3px 0 0 #0870b8" : "none",
                        fontWeight: on ? 500 : 400,
                      }}
                      onMouseEnter={(e) => {
                        if (!on) e.currentTarget.style.background = "#ffffff";
                      }}
                      onMouseLeave={(e) => {
                        if (!on) e.currentTarget.style.background = "transparent";
                      }}
                    >
                      <Icon name={n.icon} size={16} />
                      {n.label}
                    </Link>
                  );
                })}
            </div>
          ))}
        </div>

        <div className="border-t border-line p-3">
          <div className="mb-2 px-1">
            <p className="text-sm text-ink">María Fernández</p>
            <p className="text-[11px] text-slate">Supervisor</p>
          </div>
          <button
            onClick={() => router.push("/login")}
            className="flex w-full items-center gap-2 rounded-[4px] px-2 py-1.5 text-sm text-slate transition-colors hover:bg-white hover:text-ink"
          >
            <Icon name="logout" size={16} />
            Cerrar sesión
          </button>
        </div>
      </nav>

      <main className="min-w-0 overflow-hidden bg-white">{children}</main>
    </div>
  );
}
