import type { Product } from "../types";

export const categories = ["Químicos", "Filtración", "Bombas", "Accesorios"];

export const products: Product[] = [
  { sku: "QM-CL05", name: "Cloro Granulado 5kg", category: "Químicos", price: 890, stock: 42, active: true, description: "Cloro granulado estabilizado para desinfección de albercas residenciales y comerciales." },
  { sku: "QM-PH01", name: "pH Plus 1L", category: "Químicos", price: 220, stock: 18, active: true, description: "Incrementador de pH para corregir aguas ácidas y proteger la superficie de la alberca." },
  { sku: "QM-AL02", name: "Alguicida 2L", category: "Químicos", price: 340, stock: 7, active: true, description: "Alguicida concentrado de acción prolongada contra algas verdes y negras." },
  { sku: "FL-AR50", name: "Filtro de Arena 50L", category: "Filtración", price: 4200, stock: 5, active: true, description: "Medio filtrante de arena sílica de alta pureza para filtros de tanque." },
  { sku: "BM-CE1H", name: "Bomba Centrífuga 1HP", category: "Bombas", price: 6800, stock: 0, active: false, description: "Bomba centrífuga autocebante de 1HP para recirculación de agua." },
];
