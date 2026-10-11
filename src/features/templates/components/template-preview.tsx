import type { QueryTemplate } from "../types";

export default function TemplatePreview({ templates }: { templates: QueryTemplate[] }) {
  const active = templates.filter((t) => t.active);

  return (
    <div>
      <p className="pb-2 text-[11px] font-medium uppercase tracking-wide text-slate">
        Vista previa en el chat
      </p>
      <div className="rounded-[4px] border border-line bg-subtle p-3">
        <h3 className="font-display pb-2 text-sm text-ink">
          Consultas Frecuentes
        </h3>
        <div className="flex flex-col gap-1">
          {active.map((t) => (
            <div
              key={t.id}
              className="flex h-10 items-center rounded-[4px] border border-line bg-white px-3 text-sm text-ink"
            >
              {t.title}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
