"use client";

import { useEffect, useRef, useState } from "react";
import ChatHeader from "@/features/chat/components/chat-header";
import MessageInput from "@/features/chat/components/message-input";
import MessageList from "@/features/chat/components/message-list";
import QuickTemplatesSidebar from "@/features/chat/components/quick-templates-sidebar";
import { useConversations } from "@/features/chat/hooks/use-conversations";
import { useMessages } from "@/features/chat/hooks/use-messages";
import { useNewConversation } from "@/features/chat/hooks/use-new-conversation";
import { useQueryTemplates } from "@/features/chat/hooks/use-query-templates";
import { useSendMessage } from "@/features/chat/hooks/use-send-message";

function Chat() {
  const { conversations } = useConversations();
  const { templates } = useQueryTemplates();
  const { createConversation } = useNewConversation();
  const { sendMessage, sending, error } = useSendMessage();

  const [activeConv, setActiveConv] = useState<string | null>(null);
  const [draft, setDraft] = useState("");
  const { messages, isLoading: loadingMessages } = useMessages(activeConv);

  const didAutoSelect = useRef(false);
  useEffect(() => {
    if (didAutoSelect.current || conversations.length === 0) return;
    didAutoSelect.current = true;
    if (!activeConv) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActiveConv(conversations[0].id);
    }
  }, [activeConv, conversations]);

  const send = async (text: string) => {
    const t = text.trim();
    if (!t) return;
    setDraft("");
    try {
      const conversationId = activeConv ?? (await createConversation()).id;
      if (conversationId !== activeConv) setActiveConv(conversationId);
      await sendMessage(conversationId, t);
    } catch {
      // the error message is already surfaced via the hook's `error`
    }
  };

  return (
    <div className="grid h-full grid-cols-[280px_1fr]">
      <QuickTemplatesSidebar templates={templates} onSelect={setDraft} />

      <div className="flex h-full min-h-0 min-w-0 flex-col">
        <ChatHeader
          conversations={conversations}
          activeConversationId={activeConv ?? ""}
          onSelectConversation={setActiveConv}
          onNewConversation={() => setActiveConv(null)}
        />
        <MessageList
          messages={messages}
          thinking={sending}
          error={error}
          loading={loadingMessages}
        />
        <MessageInput value={draft} onChange={setDraft} onSubmit={() => send(draft)} />
      </div>
    </div>
  );
}

export default function Home() {
  return <Chat />;
}
