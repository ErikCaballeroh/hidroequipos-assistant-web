import type { ChatMessage } from "../types";

export const seedMessages: ChatMessage[] = [
  {
    id: "m1",
    role: "user",
    text: "El agua de la alberca del cliente está turbia y con tono verdoso, ¿qué recomiendo?",
    time: "09:41",
  },
  {
    id: "m2",
    role: "assistant",
    text: "El tono verdoso indica presencia de algas. Aplica una cloración de choque (3× la dosis normal) por la noche, cepilla paredes y piso, y mantén la filtración 24 h continuas. Complementa con alguicida al día siguiente y reajusta el pH a 7.2–7.6.",
    time: "09:41",
    sources: [
      { name: "Cloro Granulado 5kg", type: "product", similarity: 0.94 },
      { name: "Alguicida 2L", type: "product", similarity: 0.81 },
      { name: "pH Plus 1L", type: "product", similarity: 0.62 },
    ],
  },
];

export const conversationMessages: Record<string, ChatMessage[]> = {
  c1: [
    {
      id: "c1-1",
      role: "user",
      text: "El filtro de arena está recirculando muy lento, ¿qué reviso primero?",
      time: "08:15",
    },
    {
      id: "c1-2",
      role: "assistant",
      time: "08:15",
      text: "Un flujo lento suele indicar el medio filtrante saturado. Primero revisa la presión del manómetro: si subió 8–10 psi sobre lo normal, realiza un retrolavado. Si persiste, revisa la canastilla del skimmer y de la bomba por obstrucciones.",
      sources: [{ name: "Filtro de Arena 50L", type: "product", similarity: 0.89 }],
    },
  ],
  c2: [
    {
      id: "c2-1",
      role: "user",
      text: "¿Cuál es la dosis de cloro para una alberca de 30 m³?",
      time: "10:02",
    },
    {
      id: "c2-2",
      role: "assistant",
      time: "10:02",
      text: "Para 30 m³ y mantener 1–3 ppm de cloro libre, aplica aproximadamente 90–120 g de cloro granulado disuelto, con la bomba en marcha y de preferencia al anochecer. Vuelve a medir a las 2 horas.",
      sources: [{ name: "Cloro Granulado 5kg", type: "product", similarity: 0.92 }],
    },
  ],
  c3: [
    {
      id: "c3-1",
      role: "user",
      text: "El pH está en 6.8, ¿cómo lo subo?",
      time: "16:44",
    },
    {
      id: "c3-2",
      role: "assistant",
      time: "16:44",
      text: "Un pH de 6.8 es ácido y reduce la vida útil de los equipos. Añade pH Plus de forma gradual, disuelto y con recirculación activa, hasta alcanzar el rango 7.2–7.6. Mide de nuevo tras 4–6 horas antes de dosificar otra vez.",
      sources: [{ name: "pH Plus 1L", type: "product", similarity: 0.85 }],
    },
  ],
};
