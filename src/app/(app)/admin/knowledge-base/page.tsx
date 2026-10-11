"use client";

import { useMemo, useState } from "react";
import PageHeader from "@/components/layout/page-header";
import { Button, Icon, Input } from "@/components/ui";
import ArticleList from "@/features/knowledge-base/components/article-list";
import ArticleModal from "@/features/knowledge-base/components/article-modal";
import { useArticles } from "@/features/knowledge-base/hooks/use-articles";
import type { Article } from "@/features/knowledge-base/types";

export default function KnowledgeBasePage() {
  const { articles, saveArticle } = useArticles();
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState<Article | null>(null);
  const [open, setOpen] = useState(false);

  const filtered = useMemo(
    () => articles.filter((a) => a.title.toLowerCase().includes(query.toLowerCase())),
    [articles, query],
  );

  return (
    <div className="flex h-full flex-col">
      <PageHeader
        title="Base de conocimiento"
        action={
          <Button
            onClick={() => {
              setEditing(null);
              setOpen(true);
            }}
          >
            <Icon name="plus" size={16} />
            Nuevo artículo
          </Button>
        }
      />

      <div className="border-b border-line px-6 py-3">
        <div className="relative w-72">
          <Icon
            name="search"
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate"
          />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por título..."
            className="pl-9"
          />
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6">
        <ArticleList
          articles={filtered}
          onEdit={(a) => {
            setEditing(a);
            setOpen(true);
          }}
        />
      </div>

      {open && (
        <ArticleModal
          article={editing}
          onClose={() => setOpen(false)}
          onSave={(a) => {
            saveArticle(a);
            setOpen(false);
          }}
        />
      )}
    </div>
  );
}
