/* Cited source shape agreed with the backend: name + 0-1 similarity score. */
export type TraceSource = {
  name: string;
  similarity: number;
};

export type TraceSummary = {
  id: string;
  question: string;
  date: string;
  success: boolean;
};

export type TraceDetail = TraceSummary & {
  answer: string;
  products: TraceSource[];
  articles: TraceSource[];
};
