import type { QueryTemplate } from "../types";

export default function QuickTemplatesSidebar({
  templates,
  onSelect,
}: {
  templates: QueryTemplate[];
  onSelect: (body: string) => void;
}) {
  return (
    <aside className="flex flex-col border-r border-line bg-subtle">
      <h2 className="font-display px-4 pb-2 pt-4 text-sm text-ink">
        Consultas Frecuentes
      </h2>
      <div className="flex flex-col gap-1 overflow-y-auto px-3 pb-4">
        {templates.map((t) => (
          <button
            key={t.id}
            onClick={() => onSelect(t.body)}
            className="group flex h-10 items-center rounded-[4px] border border-line bg-white px-3 text-sm text-ink transition-all duration-150 [transition-timing-function:var(--ease-swift)] hover:border-l-[3px] hover:border-l-primary hover:pl-[10px]"
          >
            {t.title}
          </button>
        ))}
        {templates.length === 0 && (
          <p className="px-1 py-8 text-center text-xs text-slate">
            No hay consultas configuradas.
          </p>
        )}
      </div>
    </aside>
  );
}
