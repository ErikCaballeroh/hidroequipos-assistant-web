import { type ReactNode } from "react";

export default function PageHeader({
  title,
  action,
}: {
  title: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex h-16 shrink-0 items-center justify-between border-b border-line px-6">
      <h1 className="font-display text-xl text-ink">{title}</h1>
      {action}
    </div>
  );
}

/* Segmented control to demo loading / empty / error states per screen. */
export function StateSwitch({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: "ready" | "loading" | "empty" | "error") => void;
}) {
  const opts: { k: "ready" | "loading" | "empty" | "error"; l: string }[] = [
    { k: "ready", l: "Datos" },
    { k: "loading", l: "Carga" },
    { k: "empty", l: "Vacío" },
    { k: "error", l: "Error" },
  ];
  return (
    <div className="flex overflow-hidden rounded-[4px] border border-line">
      {opts.map((o) => (
        <button
          key={o.k}
          onClick={() => onChange(o.k)}
          className="border-l border-line px-2.5 py-1 text-[11px] transition-colors first:border-l-0"
          style={{
            background: value === o.k ? "#0870b8" : "transparent",
            color: value === o.k ? "#fff" : "#64748b",
          }}
        >
          {o.l}
        </button>
      ))}
    </div>
  );
}
