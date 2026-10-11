import type { QueryTemplate } from "../types";

export const templates: QueryTemplate[] = [
  { id: "t1", title: "Dosis de cloro", body: "¿Cuál es la dosis de cloro recomendada para una alberca de 30 m³ con uso residencial?", active: true },
  { id: "t2", title: "Ajustar pH", body: "El pH está en 7.9, ¿cómo lo corrijo y con qué producto?", active: true },
  { id: "t3", title: "Algas verdes", body: "La alberca tiene agua verde, ¿qué tratamiento aplico?", active: true },
  { id: "t4", title: "Filtro lento", body: "El filtro está recirculando muy lento, ¿qué reviso primero?", active: true },
  { id: "t5", title: "Agua turbia", body: "El agua está turbia pero los químicos están balanceados, ¿qué hago?", active: false },
];
