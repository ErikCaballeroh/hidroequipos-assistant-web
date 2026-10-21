"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PageHeader from "@/components/layout/page-header";
import { Button, ErrorState, Skeleton } from "@/components/ui";
import { Pagination } from "@/components/ui/pagination";
import TraceTable from "@/features/trace/components/trace-table";
import { useTraceList } from "@/features/trace/hooks/use-trace-list";
import type { MessagesFilter } from "@/features/trace/api/trace";

const FILTERS: { value: MessagesFilter; label: string }[] = [
  { value: "all", label: "Todos" },
  { value: "noMatch", label: "Sin match" },
  { value: "dislike", label: "Con dislike" },
];

export default function MessagesTraceListPage() {
  const router = useRouter();
  const [filter, setFilter] = useState<MessagesFilter>("all");
  const [page, setPage] = useState(1);
  const { traces, pageSize, total, isLoading, isError } = useTraceList(filter, page);

  const changeFilter = (value: MessagesFilter) => {
    setFilter(value);
    setPage(1);
  };

  return (
    <div className="flex h-full flex-col">
      <PageHeader title="Trazabilidad" />

      <div className="flex items-center gap-2 border-b border-line px-6 py-3">
        {FILTERS.map((f) => (
          <Button
            key={f.value}
            variant={filter === f.value ? "primary" : "secondary"}
            onClick={() => changeFilter(f.value)}
          >
            {f.label}
          </Button>
        ))}
      </div>

      <div className="flex-1 overflow-auto px-6 py-4">
        {isLoading ? (
          <div className="flex flex-col gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-11 w-full" />
            ))}
          </div>
        ) : isError ? (
          <ErrorState
            title="No se pudieron cargar las trazas."
            onRetry={() => window.location.reload()}
          />
        ) : (
          <TraceTable
            traces={traces}
            onSelect={(id) => router.push(`/admin/messages/${id}`)}
          />
        )}
      </div>

      {!isLoading && !isError && (
        <Pagination page={page} pageSize={pageSize} total={total} onPageChange={setPage} />
      )}
    </div>
  );
}
