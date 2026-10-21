import { describe, expect, it } from "vitest";
import { toChatMessage, toConversation, toQueryTemplate, toSources } from "./mappers";

describe("toConversation", () => {
  it("keeps the given title", () => {
    const result = toConversation({
      id: 1,
      userId: 1,
      title: "Agua verde",
      createdAt: "2026-10-17T17:06:00.000Z",
      updatedAt: "2026-10-17T17:06:00.000Z",
    });
    expect(result).toEqual({ id: "1", title: "Agua verde", date: result.date });
  });

  it("falls back to a default title when null", () => {
    const result = toConversation({
      id: 2,
      userId: 1,
      title: null,
      createdAt: "2026-10-17T17:06:00.000Z",
      updatedAt: "2026-10-17T17:06:00.000Z",
    });
    expect(result.title).toBe("Nueva conversación");
  });
});

describe("toSources", () => {
  it("combines products and knowledge with their type", () => {
    const result = toSources({
      products: [{ id: 1, sku: "QUI-003", name: "Alguicida 10L", distance: 0.1, similarity: 0.9 }],
      knowledge: [{ id: 2, title: "Guía de cloro", distance: 0.2, similarity: 0.8 }],
    });
    expect(result).toEqual([
      { name: "Alguicida 10L", type: "product", similarity: 0.9 },
      { name: "Guía de cloro", type: "article", similarity: 0.8 },
    ]);
  });
});

describe("toChatMessage", () => {
  it("maps a message without feedback to null", () => {
    const result = toChatMessage({
      id: 1,
      conversationId: 1,
      role: "assistant",
      content: "Respuesta",
      bestMatchDistance: 0.1,
      responseTimeMs: 500,
      createdAt: "2026-10-17T17:06:00.000Z",
      feedback: null,
    });
    expect(result.feedback).toBeNull();
  });

  it("maps a message's feedback type and comment", () => {
    const result = toChatMessage({
      id: 1,
      conversationId: 1,
      role: "assistant",
      content: "Respuesta",
      bestMatchDistance: 0.1,
      responseTimeMs: 500,
      createdAt: "2026-10-17T17:06:00.000Z",
      feedback: { id: 1, messageId: 1, userId: 1, type: "like", comment: null, createdAt: "2026-10-17T17:06:00.000Z" },
    });
    expect(result.feedback).toEqual({ type: "like", comment: null });
  });
});

describe("toQueryTemplate", () => {
  it("maps queryText to body", () => {
    const result = toQueryTemplate({
      id: 1,
      title: "Agua verde",
      queryText: "¿Qué hago si el agua está verde?",
      displayOrder: 0,
      active: true,
    });
    expect(result).toEqual({
      id: "1",
      title: "Agua verde",
      body: "¿Qué hago si el agua está verde?",
      active: true,
    });
  });
});
