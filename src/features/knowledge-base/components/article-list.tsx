import { EmptyState, Icon } from "@/components/ui";
import type { Article } from "../types";

export default function ArticleList({
  articles,
  onEdit,
}: {
  articles: Article[];
  onEdit: (article: Article) => void;
}) {
  if (articles.length === 0) {
    return <EmptyState title="No hay artículos en la base de conocimiento." />;
  }

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-2">
      {articles.map((a) => (
        <button
          key={a.id}
          onClick={() => onEdit(a)}
          className="group flex items-start justify-between gap-4 rounded-[4px] border border-line bg-white p-4 text-left transition-colors hover:bg-subtle"
        >
          <div className="min-w-0">
            <p className="font-medium text-ink">{a.title}</p>
            <p className="mt-1 line-clamp-2 text-sm text-slate">
              {a.description}
            </p>
          </div>
          <Icon
            name="pencil"
            size={16}
            className="mt-0.5 shrink-0 text-slate transition-colors group-hover:text-primary"
          />
        </button>
      ))}
    </div>
  );
}
