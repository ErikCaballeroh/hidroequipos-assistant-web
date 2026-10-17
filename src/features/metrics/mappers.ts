export function toApprovalPercent(approvalRate: number | null): number {
  return approvalRate === null ? 0 : Math.round(approvalRate * 100);
}

export function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString("es-MX", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}
