// Devuelve las posiciones 0..total-1 desordenadas, con 'primero' siempre en la posición 0
export function barajarConPrimero(total: number, primero: number): number[] {
  const resto = Array.from({ length: total }, (_, i) => i).filter((i) => i !== primero);
  for (let i = resto.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [resto[i], resto[j]] = [resto[j], resto[i]];
  }
  return [primero, ...resto];
}