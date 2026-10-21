import { Button, DropLogo, Icon } from "@/components/ui";
import ConversationHistory from "./conversation-history";
import type { Conversation } from "../types";

export default function ChatHeader({
  conversations,
  activeConversationId,
  onSelectConversation,
  onNewConversation,
}: {
  conversations: Conversation[];
  activeConversationId: string;
  onSelectConversation: (id: string) => void;
  onNewConversation: () => void;
}) {
  return (
    <header className="relative flex h-16 items-center justify-between border-b border-line px-6">
      <div className="flex items-center gap-2">
        <DropLogo size={22} />
        <span className="font-display text-lg text-ink">
          HidroEquipos y Albercas
        </span>
      </div>

      <div className="flex items-center gap-2">
        <ConversationHistory
          conversations={conversations}
          activeId={activeConversationId}
          onSelect={onSelectConversation}
        />

        <Button onClick={onNewConversation}>
          <Icon name="plus" size={16} />
          Nuevo
        </Button>
      </div>
    </header>
  );
}
