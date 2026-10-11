"use client";

import {
  type ButtonHTMLAttributes,
  type InputHTMLAttributes,
  type ReactNode,
  type TextareaHTMLAttributes,
  useEffect,
} from "react";

/* ------------------------------- Buttons ------------------------------- */

type Variant = "primary" | "secondary" | "danger";

const base =
  "inline-flex items-center justify-center gap-2 rounded-[4px] text-sm font-medium transition-colors duration-150 [transition-timing-function:var(--ease-swift)] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 disabled:opacity-50 disabled:pointer-events-none select-none";

const variants: Record<Variant, string> = {
  primary: "bg-primary text-white hover:bg-highlight",
  secondary: "border border-line text-ink bg-transparent hover:bg-subtle",
  danger: "border border-danger text-danger bg-transparent hover:bg-[#fef2f2]",
};

export function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: { variant?: Variant } & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`${base} ${variants[variant]} px-4 py-2 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

/* Plain text action (e.g. "Resetear contraseña") */
export function LinkButton({
  className = "",
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`text-primary text-[13px] font-medium transition-colors duration-150 hover:text-highlight active:scale-[0.97] ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

/* ------------------------------- Inputs -------------------------------- */

export function Input({
  className = "",
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={`h-11 w-full rounded-[4px] border border-line px-3 text-sm text-ink placeholder:text-slate transition-colors duration-150 focus:border-primary focus:outline-none ${className}`}
      {...props}
    />
  );
}

export function Textarea({
  className = "",
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={`min-h-20 w-full rounded-[4px] border border-line px-3 py-2 text-sm text-ink placeholder:text-slate transition-colors duration-150 focus:border-primary focus:outline-none ${className}`}
      {...props}
    />
  );
}

export function Select({
  className = "",
  children,
  ...props
}: InputHTMLAttributes<HTMLSelectElement> & { children: ReactNode }) {
  return (
    <select
      className={`h-11 rounded-[4px] border border-line bg-white px-3 text-sm text-ink transition-colors duration-150 focus:border-primary focus:outline-none ${className}`}
      {...(props as object)}
    >
      {children}
    </select>
  );
}

export function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: ReactNode;
  hint?: string;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-medium text-slate">{label}</span>
      {children}
      {hint && <span className="text-[11px] text-slate">{hint}</span>}
    </label>
  );
}

/* ------------------------------- Badges -------------------------------- */

export function StatusBadge({ active }: { active: boolean }) {
  return (
    <span
      className="inline-flex items-center rounded-[2px] px-2 py-0.5 text-[11px] font-medium"
      style={
        active
          ? { color: "#00a8c8", background: "#e6fffa" }
          : { color: "#64748b", background: "#f1f5f9" }
      }
    >
      {active ? "Activo" : "Inactivo"}
    </span>
  );
}

export function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-[2px] bg-line px-2 py-0.5 text-[11px] text-ink">
      {children}
    </span>
  );
}

/* ------------------------------- Toggle -------------------------------- */

export function Toggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="relative h-5 w-9 shrink-0 rounded-full transition-colors duration-150 [transition-timing-function:var(--ease-swift)]"
      style={{ background: checked ? "#0870b8" : "#e2e8f0" }}
    >
      <span
        className="absolute left-0 top-0.5 size-4 rounded-full bg-white transition-transform duration-150 [transition-timing-function:var(--ease-swift)]"
        style={{ transform: checked ? "translateX(18px)" : "translateX(2px)" }}
      />
    </button>
  );
}

/* ------------------------------- Modal --------------------------------- */

export function Modal({
  title,
  onClose,
  children,
  footer,
  width = "max-w-md",
}: {
  title: string;
  onClose: () => void;
  children: ReactNode;
  footer?: ReactNode;
  width?: string;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#005068]/20 p-4 anim-fade"
      onMouseDown={onClose}
    >
      <div
        className={`anim-modal w-full ${width} rounded-[4px] border border-line bg-white`}
        style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-line px-6 py-4">
          <h2 className="font-display text-lg text-ink">{title}</h2>
          <button
            onClick={onClose}
            className="text-slate transition-colors hover:text-ink"
            aria-label="Cerrar"
          >
            <Icon name="x" />
          </button>
        </div>
        <div className="p-6">{children}</div>
        {footer && (
          <div className="flex justify-end gap-2 border-t border-line px-6 py-4">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

/* -------------------------------- Card ---------------------------------- */

export function Card({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-[4px] border border-line p-4">
      <h2 className="font-display pb-3 text-sm text-ink">{title}</h2>
      {children}
    </section>
  );
}

/* ------------------------------ Skeleton ------------------------------- */

export function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`anim-skeleton rounded-[2px] bg-line ${className}`} />;
}

/* ------------------------------ Empty / Error -------------------------- */

export function EmptyState({
  title,
  action,
}: {
  title: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 border border-dashed border-line py-16 text-center">
      <Icon name="inbox" className="text-slate" />
      <p className="text-sm text-slate">{title}</p>
      {action}
    </div>
  );
}

export function ErrorState({
  title,
  onRetry,
}: {
  title: string;
  onRetry: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 border border-dashed border-line py-16 text-center">
      <Icon name="alert" className="text-danger" />
      <p className="text-sm text-slate">{title}</p>
      <Button variant="secondary" onClick={onRetry}>
        Reintentar
      </Button>
    </div>
  );
}

/* -------------------------------- Icons -------------------------------- */
/* Minimal stroke icons — 1.5px, matches utilitarian tone. */

const paths: Record<string, ReactNode> = {
  x: <path d="M18 6 6 18M6 6l12 12" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  chevronDown: <path d="m6 9 6 6 6-6" />,
  arrowLeft: <path d="M19 12H5m6-7-7 7 7 7" />,
  pencil: <path d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />,
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" />
    </>
  ),
  plus: <path d="M12 5v14M5 12h14" />,
  send: <path d="m22 2-7 20-4-9-9-4Z M22 2 11 13" />,
  drag: <path d="M8 6h.01M8 12h.01M8 18h.01M16 6h.01M16 12h.01M16 18h.01" />,
  chat: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />,
  book: (
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5z" />
  ),
  box: (
    <>
      <path d="M21 8v8a2 2 0 0 1-1 1.7l-7 4a2 2 0 0 1-2 0l-7-4A2 2 0 0 1 3 16V8a2 2 0 0 1 1-1.7l7-4a2 2 0 0 1 2 0l7 4A2 2 0 0 1 21 8z" />
      <path d="m3.3 7 8.7 5 8.7-5M12 22V12" />
    </>
  ),
  layout: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="1" />
      <path d="M3 9h18M9 21V9" />
    </>
  ),
  users: (
    <>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </>
  ),
  chart: <path d="M3 3v18h18M7 15l4-4 3 3 5-6" />,
  activity: <path d="M22 12h-4l-3 9L9 3l-3 9H2" />,
  inbox: (
    <>
      <path d="M22 12h-6l-2 3h-4l-2-3H2" />
      <path d="M5.5 5h13l3.5 7v6a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-6z" />
    </>
  ),
  alert: (
    <>
      <path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" />
      <path d="M12 9v4M12 17h.01" />
    </>
  ),
  logout: <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />,
  thumbsUp: (
    <path d="M7 11v9H4a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1zm0 0 4-8a2 2 0 0 1 2 2v3h5.5a2 2 0 0 1 2 2.3l-1.3 7A2 2 0 0 1 17.2 20H7" />
  ),
};

export function Icon({
  name,
  className = "",
  size = 18,
}: {
  name: keyof typeof paths | string;
  className?: string;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {paths[name] ?? null}
    </svg>
  );
}

/* Brand water-drop mark */
export function DropLogo({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 2c4 5.5 7 9 7 12.5A7 7 0 1 1 5 14.5C5 11 8 7.5 12 2z"
        fill="#0870b8"
      />
      <path
        d="M12 2c4 5.5 7 9 7 12.5A7 7 0 0 1 12 21.5V2z"
        fill="#00a8c8"
      />
      <circle cx="9.2" cy="15" r="1.6" fill="#ffffff" opacity="0.85" />
    </svg>
  );
}
