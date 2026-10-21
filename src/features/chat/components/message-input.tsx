import { Button, Icon, Input } from "@/components/ui";
import QuickTemplatesButton from "./quick-templates-button";
import type { QueryTemplate } from "../types";

export default function MessageInput({
  value,
  onChange,
  onSubmit,
  templates,
  onSelectTemplate,
}: {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  templates: QueryTemplate[];
  onSelectTemplate: (body: string) => void;
}) {
  return (
    <div className="border-t border-line px-6 py-4">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
        className="mx-auto flex max-w-3xl gap-2"
      >
        <QuickTemplatesButton templates={templates} onSelect={onSelectTemplate} />
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Escribe tu consulta sobre mantenimiento de albercas..."
        />
        <Button type="submit">
          <Icon name="send" size={16} />
          Enviar
        </Button>
      </form>
    </div>
  );
}
