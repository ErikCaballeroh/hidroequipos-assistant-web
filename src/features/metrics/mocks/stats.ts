import type { Stats } from "../types";

export const stats: Stats = {
  topProducts: [
    { name: "Cloro Granulado 5kg", value: 128 },
    { name: "pH Plus 1L", value: 96 },
    { name: "Alguicida 2L", value: 74 },
    { name: "Filtro de Arena 50L", value: 41 },
    { name: "Bomba Centrífuga 1HP", value: 22 },
  ],
  approval: 85,
  failedCount: 12,
  failedMessages: [
    "¿Puedo usar sal de mesa en el clorador salino de la alberca?",
    "El calentador solar no sube la temperatura más de dos grados en…",
    "¿Cada cuánto reemplazo la celda del sistema de electrólisis sali…",
  ],
};
