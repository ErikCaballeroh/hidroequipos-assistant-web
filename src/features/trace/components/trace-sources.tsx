import TraceScoreRow from "./trace-score-row";
import type { TraceSource } from "../types";

export default function TraceSources({
  title,
  sources,
}: {
  title: string;
  sources: TraceSource[];
}) {
  return (
    <div>
      <h2 className="font-display pb-3 text-sm text-ink">{title}</h2>
      <div className="flex flex-col gap-3">
        {sources.length === 0 ? (
          <p className="text-sm text-slate">Sin coincidencias.</p>
        ) : (
          sources.map((s) => <TraceScoreRow key={s.name} source={s} />)
        )}
      </div>
    </div>
  );
}
