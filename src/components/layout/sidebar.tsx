"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DropLogo, Icon } from "../ui";

type Role = "employee" | "supervisor";

const nav: { href: string; label: string; icon: string; group: string; supervisorOnly?: boolean }[] = [
  { href: "/", label: "Chat", icon: "chat", group: "Asistente" },
  { href: "/admin/products", label: "Catálogo", icon: "box", group: "Catálogo", supervisorOnly: true },
  { href: "/admin/knowledge-base", label: "Base de conocimiento", icon: "book", group: "Catálogo", supervisorOnly: true },
  { href: "/admin/query-templates", label: "Plantillas rápidas", icon: "layout", group: "Gestión", supervisorOnly: true },
  { href: "/admin/users", label: "Usuarios", icon: "users", group: "Gestión", supervisorOnly: true },
  { href: "/admin/metrics", label: "Métricas", icon: "chart", group: "Monitoreo", supervisorOnly: true },
  { href: "/admin/messages", label: "Trazabilidad", icon: "activity", group: "Monitoreo", supervisorOnly: true },
];

export default function Sidebar({
  user,
  onLogout,
}: {
  user: { name: string; role: Role };
  onLogout: () => void;
}) {
  const pathname = usePathname();
  const visibleNav = nav.filter((n) => !n.supervisorOnly || user.role === "supervisor");
  const groups = [...new Set(visibleNav.map((n) => n.group))];

  return (
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
            {visibleNav
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
          <p className="text-sm text-ink">{user.name}</p>
          <p className="text-[11px] text-slate">
            {user.role === "supervisor" ? "Supervisor" : "Empleado"}
          </p>
        </div>
        <Link
          href="/change-password"
          className="flex w-full items-center gap-2 rounded-[4px] px-2 py-1.5 text-sm text-slate transition-colors hover:bg-white hover:text-ink"
        >
          <Icon name="pencil" size={16} />
          Cambiar contraseña
        </Link>
        <button
          onClick={onLogout}
          className="flex w-full items-center gap-2 rounded-[4px] px-2 py-1.5 text-sm text-slate transition-colors hover:bg-white hover:text-ink"
        >
          <Icon name="logout" size={16} />
          Cerrar sesión
        </button>
      </div>
    </nav>
  );
}
