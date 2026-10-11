export type TopProduct = {
  name: string;
  value: number;
};

export type Stats = {
  topProducts: TopProduct[];
  approval: number;
  failedCount: number;
  failedMessages: string[];
};

export type GeminiLogEntry = {
  time: string;
  ok: boolean;
  ms: number;
};
