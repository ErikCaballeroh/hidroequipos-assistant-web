/* Source shape agreed with the backend: a cited product or article with its match score. */
export type ChatSource = {
  name: string;
  type: "product" | "article";
  similarity: number;
};

export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  text: string;
  time: string;
  sources?: ChatSource[];
};

/* Shape of a chat reply as the backend will send it (Fase 9). */
export type ChatResponse = {
  message: string;
  sources: ChatSource[];
};

export type Conversation = {
  id: string;
  title: string;
  date: string;
};

export type QueryTemplate = {
  id: string;
  title: string;
  body: string;
  active: boolean;
};
