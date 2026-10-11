export type Conversation = {
  id: string;
  title: string;
  date: string;
};

export const conversations: Conversation[] = [
  { id: "c1", title: "Filtro sucio", date: "12/09/2026" },
  { id: "c2", title: "Cloro", date: "11/09/2026" },
  { id: "c3", title: "pH bajo", date: "10/09/2026" },
];

export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  text: string;
  time: string;
  products?: string[];
};

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
    products: ["Cloro Granulado 5kg", "Alguicida 2L", "pH Plus 1L"],
  },
];

export const conversationMessages: Record<string, ChatMessage[]> = {
  c1: [
    { id: "c1-1", role: "user", text: "El filtro de arena está recirculando muy lento, ¿qué reviso primero?", time: "08:15" },
    {
      id: "c1-2",
      role: "assistant",
      time: "08:15",
      text: "Un flujo lento suele indicar el medio filtrante saturado. Primero revisa la presión del manómetro: si subió 8–10 psi sobre lo normal, realiza un retrolavado. Si persiste, revisa la canastilla del skimmer y de la bomba por obstrucciones.",
      products: ["Filtro de Arena 50L"],
    },
  ],
  c2: [
    { id: "c2-1", role: "user", text: "¿Cuál es la dosis de cloro para una alberca de 30 m³?", time: "10:02" },
    {
      id: "c2-2",
      role: "assistant",
      time: "10:02",
      text: "Para 30 m³ y mantener 1–3 ppm de cloro libre, aplica aproximadamente 90–120 g de cloro granulado disuelto, con la bomba en marcha y de preferencia al anochecer. Vuelve a medir a las 2 horas.",
      products: ["Cloro Granulado 5kg"],
    },
  ],
  c3: [
    { id: "c3-1", role: "user", text: "El pH está en 6.8, ¿cómo lo subo?", time: "16:44" },
    {
      id: "c3-2",
      role: "assistant",
      time: "16:44",
      text: "Un pH de 6.8 es ácido y reduce la vida útil de los equipos. Añade pH Plus de forma gradual, disuelto y con recirculación activa, hasta alcanzar el rango 7.2–7.6. Mide de nuevo tras 4–6 horas antes de dosificar otra vez.",
      products: ["pH Plus 1L"],
    },
  ],
};

export const quickPrompts = [
  "Dosis de cloro",
  "Ajustar pH",
  "Algas verdes",
  "Filtro lento",
  "Agua turbia",
];

export const topProducts = [
  { name: "Cloro Granulado 5kg", value: 128 },
  { name: "pH Plus 1L", value: 96 },
  { name: "Alguicida 2L", value: 74 },
  { name: "Filtro de Arena 50L", value: 41 },
  { name: "Bomba Centrífuga 1HP", value: 22 },
];

export const failedMessages = [
  "¿Puedo usar sal de mesa en el clorador salino de la alberca?",
  "El calentador solar no sube la temperatura más de dos grados en…",
  "¿Cada cuánto reemplazo la celda del sistema de electrólisis sali…",
];

export const apiHealth = [
  { time: "12/09 09:41", ok: true, ms: 320 },
  { time: "12/09 09:12", ok: true, ms: 288 },
  { time: "12/09 08:55", ok: false, ms: 5010 },
  { time: "12/09 08:30", ok: true, ms: 412 },
  { time: "12/09 08:02", ok: true, ms: 301 },
];

export const traceProducts = [
  { name: "Cloro Granulado 5kg", score: 0.94 },
  { name: "Alguicida 2L", score: 0.81 },
  { name: "pH Plus 1L", score: 0.62 },
];

export const traceArticles = [
  { name: "Eliminación de algas verdes", score: 0.9 },
  { name: "Ajuste de pH en albercas", score: 0.55 },
];
