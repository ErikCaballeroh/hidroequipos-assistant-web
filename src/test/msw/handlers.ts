import { http, HttpResponse } from "msw";
import type { components } from "@/lib/api/schema";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type Stats = components["schemas"]["StatsEntity"];
type MessagePage = components["schemas"]["MessagePageEntity"];
type ProductPage = components["schemas"]["ProductPageEntity"];
type Product = components["schemas"]["ProductEntity"];
type SendMessageResponse = components["schemas"]["SendMessageResponseEntity"];
type LoginResponse = components["schemas"]["LoginResponseDto"];

export const stats: Stats = {
  topProducts: [{ productId: 1, sku: "QUI-003", name: "Alguicida 10L", count: 17 }],
  feedback: { likes: 3, dislikes: 1, total: 4, approvalRate: 0.75 },
  noMatch: {
    count: 1,
    recent: [{ messageId: 42, question: "qué hora es en Tokio", createdAt: "2026-10-17T17:06:00.000Z" }],
  },
};

export const messagePage: MessagePage = {
  items: [
    {
      id: 1,
      createdAt: "2026-10-17T17:06:00.000Z",
      question: "¿Cada cuánto debo revisar el cloro libre?",
      answerPreview: "Revisa el cloro libre a diario...",
      feedback: null,
      bestMatchDistance: 0.1,
      success: true,
    },
  ],
  page: 1,
  pageSize: 15,
  total: 1,
};

const sampleProduct: Product = {
  id: 1,
  sku: "QUI-003",
  name: "Alguicida 10L",
  description: null,
  category: "quimico",
  price: 500,
  stock: 40,
  active: true,
  createdAt: "2026-10-01T00:00:00.000Z",
  updatedAt: "2026-10-01T00:00:00.000Z",
};

export const productPage: ProductPage = {
  items: [sampleProduct],
  page: 1,
  pageSize: 200,
  total: 1,
};

export const loginResponse: LoginResponse = {
  accessToken: "test-access-token",
  mustChangePassword: false,
};

export const sendMessageResponse: SendMessageResponse = {
  message: {
    id: 2,
    conversationId: 1,
    role: "assistant",
    content: "Respuesta del asistente.",
    bestMatchDistance: 0.1,
    responseTimeMs: 500,
    createdAt: "2026-10-20T10:00:00.000Z",
    feedback: null,
  },
  sources: { products: [], knowledge: [] },
};

export const handlers = [
  http.post(`${API_URL}/auth/login`, () => HttpResponse.json(loginResponse)),
  http.get(`${API_URL}/admin/stats`, () => HttpResponse.json(stats)),
  http.get(`${API_URL}/admin/messages`, () => HttpResponse.json(messagePage)),
  http.get(`${API_URL}/products`, () => HttpResponse.json(productPage)),
  http.post(`${API_URL}/products`, () => HttpResponse.json(sampleProduct)),
  http.post(`${API_URL}/conversations/:conversationId/messages`, () =>
    HttpResponse.json(sendMessageResponse),
  ),
];
