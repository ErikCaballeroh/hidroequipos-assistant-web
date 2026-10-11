import { toPercentage } from "../mappers";
import type { TraceSource } from "../types";

export default function TraceScoreRow({ source }: { source: TraceSource }) {
  const percentage = toPercentage(source.similarity);

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between">
        <span className="text-sm text-ink">{source.name}</span>
        <span className="text-[11px] tabular-nums text-slate">{percentage}%</span>
      </div>
      <div className="h-1.5 rounded-[2px] bg-line">
        <div
          className="h-1.5 rounded-[2px] bg-secondary"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
