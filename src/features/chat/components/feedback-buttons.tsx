"use client";

import { useState } from "react";
import { Button, Icon, Textarea } from "@/components/ui";
import { useMessageFeedback } from "../hooks/use-feedback";
import type { MessageFeedback } from "../types";

export default function FeedbackButtons({
  conversationId,
  messageId,
  feedback,
}: {
  conversationId: string;
  messageId: string;
  feedback?: MessageFeedback | null;
}) {
  const { giveFeedback, removeFeedback, loading } = useMessageFeedback(conversationId, messageId);
  const [composing, setComposing] = useState(false);
  const [comment, setComment] = useState("");

  const toggleLike = () => {
    if (loading) return;
    if (feedback?.type === "like") {
      removeFeedback();
    } else {
      giveFeedback({ type: "like" });
    }
  };

  const toggleDislike = () => {
    if (loading) return;
    if (feedback?.type === "dislike") {
      removeFeedback();
      return;
    }
    setComposing(true);
  };

  const submitDislike = async () => {
    await giveFeedback({ type: "dislike", comment: comment.trim() || undefined });
    setComposing(false);
    setComment("");
  };

  return (
    <div className="mt-2.5">
      <div className="flex items-center gap-1">
        <button
          onClick={toggleLike}
          aria-pressed={feedback?.type === "like"}
          className="rounded-[4px] p-1 transition-colors hover:bg-line"
          style={{ color: feedback?.type === "like" ? "#0870b8" : "#64748b" }}
        >
          <Icon name="thumbsUp" size={15} />
        </button>
        <button
          onClick={toggleDislike}
          aria-pressed={feedback?.type === "dislike"}
          className="rounded-[4px] p-1 transition-colors hover:bg-line"
          style={{ color: feedback?.type === "dislike" ? "#0870b8" : "#64748b" }}
        >
          <Icon name="thumbsUp" className="rotate-180" size={15} />
        </button>
      </div>

      {composing && (
        <div className="mt-2 flex flex-col gap-2">
          <Textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="¿Qué estuvo mal? (opcional)"
            className="min-h-14 text-xs"
          />
          <div className="flex gap-2">
            <Button variant="secondary" onClick={() => setComposing(false)}>
              Cancelar
            </Button>
            <Button onClick={submitDislike} disabled={loading}>
              Enviar
            </Button>
          </div>
        </div>
      )}

      {!composing && feedback?.type === "dislike" && feedback.comment && (
        <p className="mt-1 text-[11px] italic text-slate">&ldquo;{feedback.comment}&rdquo;</p>
      )}
    </div>
  );
}
