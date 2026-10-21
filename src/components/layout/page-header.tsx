import { type ReactNode } from "react";

export default function PageHeader({
  title,
  action,
}: {
  title: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex h-16 shrink-0 items-center justify-between border-b border-line px-6">
      <h1 className="font-display text-xl text-ink">{title}</h1>
      {action}
    </div>
  );
}
