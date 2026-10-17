"use client";

import PageHeader from "@/components/layout/page-header";
import { ErrorState, Skeleton } from "@/components/ui";
import ApiHealthCard from "@/features/metrics/components/api-health-card";
import FailedMatchesCard from "@/features/metrics/components/failed-matches-card";
import FeedbackCard from "@/features/metrics/components/feedback-card";
import TopProductsCard from "@/features/metrics/components/top-products-card";
import { useGeminiLogs } from "@/features/metrics/hooks/use-gemini-logs";
import { useStats } from "@/features/metrics/hooks/use-stats";
import { toApprovalPercent } from "@/features/metrics/mappers";

export default function MetricsPage() {
  const { stats, isLoading: statsLoading, isError: statsError } = useStats();
  const { logs, isLoading: logsLoading, isError: logsError } = useGeminiLogs();

  const isLoading = statsLoading || logsLoading;
  const isError = statsError || logsError;

  return (
    <div className="flex h-full flex-col">
      <PageHeader title="Panel de métricas" />

      <div className="flex-1 overflow-auto p-6">
        {isLoading ? (
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-40 w-full" />
            ))}
          </div>
        ) : isError || !stats ? (
          <ErrorState
            title="No se pudieron cargar las métricas."
            onRetry={() => window.location.reload()}
          />
        ) : (
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <TopProductsCard products={stats.topProducts} />
            <FeedbackCard approval={toApprovalPercent(stats.feedback.approvalRate)} />
            <FailedMatchesCard count={stats.noMatch.count} items={stats.noMatch.recent} />
            <ApiHealthCard logs={logs} />
          </div>
        )}
      </div>
    </div>
  );
}
