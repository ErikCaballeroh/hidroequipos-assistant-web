import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import TraceTable from "./trace-table";
import type { MessageTraceItem } from "../types";

const baseTrace: MessageTraceItem = {
  id: 1,
  createdAt: "2026-10-17T17:06:00.000Z",
  question: "¿Cada cuánto debo revisar el cloro libre?",
  answerPreview: "Revisa el cloro libre a diario...",
  feedback: null,
  bestMatchDistance: 0.1,
  success: true,
};

describe("TraceTable", () => {
  it("renders an empty state when there are no traces", () => {
    render(<TraceTable traces={[]} onSelect={vi.fn()} />);
    expect(screen.getByText("No hay respuestas registradas.")).toBeTruthy();
  });

  it("renders a row per trace, with a fallback for a missing question", () => {
    render(
      <TraceTable
        traces={[baseTrace, { ...baseTrace, id: 2, question: null, success: false }]}
        onSelect={vi.fn()}
      />,
    );

    expect(screen.getByText("¿Cada cuánto debo revisar el cloro libre?")).toBeTruthy();
    expect(screen.getByText("(sin pregunta)")).toBeTruthy();
    expect(screen.getByText("Éxito")).toBeTruthy();
    expect(screen.getByText("Error")).toBeTruthy();
  });

  it("calls onSelect with the trace id when a row is clicked", () => {
    const onSelect = vi.fn();
    render(<TraceTable traces={[baseTrace]} onSelect={onSelect} />);

    fireEvent.click(screen.getByText("¿Cada cuánto debo revisar el cloro libre?"));
    expect(onSelect).toHaveBeenCalledWith(1);
  });
});
