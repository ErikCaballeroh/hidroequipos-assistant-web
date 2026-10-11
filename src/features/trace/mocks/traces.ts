import type { TraceDetail } from "../types";

export const traces: TraceDetail[] = [
  {
    id: "m1",
    question:
      "El agua de la alberca del cliente está turbia y con tono verdoso, ¿qué recomiendo?",
    date: "12/09/2026 09:41",
    success: true,
    answer:
      "El tono verdoso indica presencia de algas. Aplica una cloración de choque (3× la dosis normal) por la noche, cepilla paredes y piso, y mantén la filtración 24 h continuas. Complementa con alguicida al día siguiente y reajusta el pH a 7.2–7.6.",
    products: [
      { name: "Cloro Granulado 5kg", similarity: 0.94 },
      { name: "Alguicida 2L", similarity: 0.81 },
      { name: "pH Plus 1L", similarity: 0.62 },
    ],
    articles: [
      { name: "Eliminación de algas verdes", similarity: 0.9 },
      { name: "Ajuste de pH en albercas", similarity: 0.55 },
    ],
  },
  {
    id: "m2",
    question: "¿Cuál es la dosis de cloro para una alberca de 30 m³?",
    date: "11/09/2026 10:02",
    success: true,
    answer:
      "Para 30 m³ y mantener 1–3 ppm de cloro libre, aplica aproximadamente 90–120 g de cloro granulado disuelto, con la bomba en marcha y de preferencia al anochecer. Vuelve a medir a las 2 horas.",
    products: [{ name: "Cloro Granulado 5kg", similarity: 0.92 }],
    articles: [],
  },
  {
    id: "m3",
    question: "¿Puedo usar sal de mesa en el clorador salino de la alberca?",
    date: "10/09/2026 08:12",
    success: false,
    answer:
      "No encontré contexto suficiente en el catálogo ni en la base de conocimiento para responder con certeza. Te recomiendo verificar con el fabricante del clorador salino.",
    products: [],
    articles: [],
  },
];
