"use client";

import PageHeader from "@/components/layout/page-header";
import ApiHealthCard from "@/features/metrics/components/api-health-card";
import FailedMatchesCard from "@/features/metrics/components/failed-matches-card";
import FeedbackCard from "@/features/metrics/components/feedback-card";
import TopProductsCard from "@/features/metrics/components/top-products-card";
import { useGeminiLogs } from "@/features/metrics/hooks/use-gemini-logs";
import { useStats } from "@/features/metrics/hooks/use-stats";

export default function MetricsPage() {
  const { stats } = useStats();
  const { logs } = useGeminiLogs();

  return (
    <div className="flex h-full flex-col">
      <PageHeader title="Panel de métricas" />

      <div className="flex-1 overflow-auto p-6">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <TopProductsCard products={stats.topProducts} />
          <FeedbackCard approval={stats.approval} />
          <FailedMatchesCard count={stats.failedCount} messages={stats.failedMessages} />
          <ApiHealthCard logs={logs} />
        </div>
      </div>
    </div>
  );
}
