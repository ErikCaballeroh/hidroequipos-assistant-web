"use client";

import { useRouter } from "next/navigation";
import PageHeader from "@/components/layout/page-header";
import TraceTable from "@/features/trace/components/trace-table";
import { useTraceList } from "@/features/trace/hooks/use-trace-list";

export default function MessagesTraceListPage() {
  const router = useRouter();
  const { traces } = useTraceList();

  return (
    <div className="flex h-full flex-col">
      <PageHeader title="Trazabilidad" />
      <div className="flex-1 overflow-auto px-6 py-4">
        <TraceTable
          traces={traces}
          onSelect={(id) => router.push(`/admin/messages/${id}`)}
        />
      </div>
    </div>
  );
}
