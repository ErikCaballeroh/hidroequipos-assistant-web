"use client";

import { useState } from "react";
import ChatHeader from "@/features/chat/components/chat-header";
import MessageInput from "@/features/chat/components/message-input";
import MessageList from "@/features/chat/components/message-list";
import QuickTemplatesSidebar from "@/features/chat/components/quick-templates-sidebar";
import { useConversations } from "@/features/chat/hooks/use-conversations";
import { getMessagesForConversation, useMessages } from "@/features/chat/hooks/use-messages";
import { useQueryTemplates } from "@/features/chat/hooks/use-query-templates";
import { useSendMessage } from "@/features/chat/hooks/use-send-message";
import { now } from "@/features/chat/lib/time";
import type { ChatMessage } from "@/features/chat/types";

function Chat() {
  const { conversations } = useConversations();
  const { templates } = useQueryTemplates();
  const { messages: initialMessages } = useMessages();
  const { sendMessage, sending, error } = useSendMessage();

  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [draft, setDraft] = useState("");
  const [activeConv, setActiveConv] = useState("c1");

  const send = async (text: string) => {
    const t = text.trim();
    if (!t) return;
    setMessages((m) => [
      ...m,
      { id: crypto.randomUUID(), role: "user", text: t, time: now() },
    ]);
    setDraft("");
    const reply = await sendMessage(t);
    if (reply) setMessages((m) => [...m, reply]);
  };

  const newConversation = () => {
    setMessages([]);
    setActiveConv("");
  };

  const selectConversation = (id: string) => {
    setActiveConv(id);
    setMessages(getMessagesForConversation(id));
  };

  return (
    <div className="grid h-full grid-cols-[280px_1fr]">
      <QuickTemplatesSidebar templates={templates} onSelect={setDraft} />

      <div className="flex min-w-0 flex-col">
        <ChatHeader
          conversations={conversations}
          activeConversationId={activeConv}
          onSelectConversation={selectConversation}
          onNewConversation={newConversation}
        />
        <MessageList messages={messages} thinking={sending} error={error} />
        <MessageInput value={draft} onChange={setDraft} onSubmit={() => send(draft)} />
      </div>
    </div>
  );
}

export default function Home() {
  return <Chat />;
}
