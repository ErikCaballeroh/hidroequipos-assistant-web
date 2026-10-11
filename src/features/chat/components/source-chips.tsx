import { Chip } from "@/components/ui";
import type { ChatSource } from "../types";

export default function SourceChips({ sources }: { sources: ChatSource[] }) {
  if (sources.length === 0) return null;

  return (
    <div className="mt-2.5 flex flex-wrap gap-1.5">
      {sources.map((s) => (
        <Chip key={`${s.type}-${s.name}`}>
          {s.name} · {Math.round(s.similarity * 100)}%
        </Chip>
      ))}
    </div>
  );
}
