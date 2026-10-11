/* similarity llega de 0 a 1; se muestra como porcentaje en la interfaz. */
export function toPercentage(similarity: number): number {
  return Math.round(similarity * 100);
}
