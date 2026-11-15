import { useState } from 'react';
import { barajarConPrimero } from '../utils/barajar';

export function useNavegadorLista<T>(lista: T[]) {
  // Posición dentro de la lista que se está recorriendo (la original o 'orden')
  const [indice, setIndice] = useState(0);
  const [aleatorio, setAleatorio] = useState(false);
  // Posiciones de 'lista' en el orden aleatorio actual
  const [orden, setOrden] = useState<number[]>([]);

  const total = lista.length;

  // Posición real en 'lista' del elemento que se muestra
  const indiceReal = aleatorio ? orden[indice] : indice;
  const actual: T | undefined = total === 0 ? undefined : lista[indiceReal];

  const anterior = () => setIndice((i) => (i > 0 ? i - 1 : i));
  const siguiente = () => setIndice((i) => (i < total - 1 ? i + 1 : i));

  const toggleRandom = () => {
    if (!aleatorio) {
      // Activar: nuevo orden con el elemento actual en primer lugar
      setOrden(barajarConPrimero(total, indice));
      setIndice(0);
      setAleatorio(true);
    } else {
      // Desactivar: volver a la lista original en la posición del elemento actual
      setIndice(orden[indice]);
      setAleatorio(false);
    }
  };

  return {
    actual,
    posicion: indice + 1,
    total,
    aleatorio,
    hayAnterior: indice > 0,
    haySiguiente: indice < total - 1,
    anterior,
    siguiente,
    toggleRandom,
  };
}