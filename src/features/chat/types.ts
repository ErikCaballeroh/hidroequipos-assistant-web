export type ChatSource = {
  name: string;
  type: "product" | "article";
  similarity: number;
};

export type MessageFeedback = {
  type: "like" | "dislike";
  comment: string | null;
};

export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  text: string;
  time: string;
  sources?: ChatSource[];
  feedback?: MessageFeedback | null;
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
