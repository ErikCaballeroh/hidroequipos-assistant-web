import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import MessageList from "./message-list";
import type { ChatMessage } from "../types";

describe("MessageList", () => {
  it("shows a loading skeleton while there are no messages yet", () => {
    const { container } = render(
      <MessageList messages={[]} thinking={false} loading conversationId={null} />,
    );
    expect(container.querySelectorAll(".anim-skeleton").length).toBeGreaterThan(0);
  });

  it('shows the "Nueva consulta" empty state when idle with no messages', () => {
    render(<MessageList messages={[]} thinking={false} conversationId={null} />);
    expect(screen.getByText("Nueva consulta")).toBeTruthy();
  });

  it("renders messages and the thinking indicator while a reply is pending", () => {
    const messages: ChatMessage[] = [
      { id: "1", role: "user", text: "¿Agua verde?", time: "10:00" },
      { id: "2", role: "assistant", text: "Aplica alguicida.", time: "10:01" },
    ];
    render(<MessageList messages={messages} thinking conversationId={null} />);

    expect(screen.getByText("¿Agua verde?")).toBeTruthy();
    expect(screen.getByText("Aplica alguicida.")).toBeTruthy();
  });

  it("shows the error line when present", () => {
    const messages: ChatMessage[] = [
      { id: "1", role: "user", text: "¿Agua verde?", time: "10:00" },
    ];
    render(
      <MessageList
        messages={messages}
        thinking={false}
        error="No se pudo generar una respuesta."
        conversationId={null}
      />,
    );
    expect(screen.getByText("No se pudo generar una respuesta.")).toBeTruthy();
  });
});
