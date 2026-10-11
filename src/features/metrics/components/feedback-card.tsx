import { Card, Icon } from "@/components/ui";

export default function FeedbackCard({ approval }: { approval: number }) {
  return (
    <Card title="Feedback de empleados">
      <p className="font-display flex items-center gap-2 text-4xl font-medium text-primary">
        {approval}%
        <Icon name="thumbsUp" size={28} className="text-primary" />
      </p>
      <p className="mb-3 mt-1 text-xs text-slate">
        Aprobación de las respuestas del asistente
      </p>
      <div className="flex h-2 overflow-hidden rounded-[2px] bg-line">
        <div className="h-2 bg-primary" style={{ width: `${approval}%` }} />
      </div>
    </Card>
  );
}
