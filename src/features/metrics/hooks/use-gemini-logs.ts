"use client";

import { geminiLogs } from "../mocks/gemini-logs";

export function useGeminiLogs() {
  return { logs: geminiLogs };
}
