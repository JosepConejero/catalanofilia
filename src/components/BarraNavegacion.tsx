import { useEffect } from 'react';
import { useAppStore } from '../store/useAppStore';

interface Navegacion {
  posicion: number;
  total: number;
  aleatorio: boolean;
  hayAnterior: boolean;
  haySiguiente: boolean;
  anterior: () => void;
  siguiente: () => void;
  toggleRandom: () => void;
}

interface BarraNavegacionProps {
  nav: Navegacion;
}

export default function BarraNavegacion({ nav }: BarraNavegacionProps) {
  const modalAbierto = useAppStore((s) => s.modalAbierto);
  const { anterior, siguiente, toggleRandom } = nav;

  useEffect(() => {
    // Con el modal abierto, las teclas no deben afectar a lo que hay detrás
    if (modalAbierto) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey || e.shiftKey) return;

      // No interferir si se está escribiendo o seleccionando en un campo de formulario
      const el = e.target as HTMLElement | null;
      if (el && (['INPUT', 'TEXTAREA', 'SELECT'].includes(el.tagName) || el.isContentEditable)) return;

      if (e.key === 'ArrowLeft') anterior();
      else if (e.key === 'ArrowRight') siguiente();
      else if (e.key.toLowerCase() === 'r' && !e.repeat) toggleRandom();
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [modalAbierto, anterior, siguiente, toggleRandom]);

  return (
    <div className="fila-botones">
      <button onClick={nav.anterior} disabled={!nav.hayAnterior}>anterior</button>
      <button onClick={nav.siguiente} disabled={!nav.haySiguiente}>siguiente</button>
      <button
        className={nav.aleatorio ? 'toggle pulsado' : 'toggle'}
        aria-pressed={nav.aleatorio}
        onClick={nav.toggleRandom}
      >
        random
      </button>
      <span className="contador">
        {nav.posicion}/{nav.total}
      </span>
    </div>
  );
}

/* interface Navegacion {
  posicion: number;
  total: number;
  aleatorio: boolean;
  hayAnterior: boolean;
  haySiguiente: boolean;
  anterior: () => void;
  siguiente: () => void;
  toggleRandom: () => void;
}

interface BarraNavegacionProps {
  nav: Navegacion;
}

export default function BarraNavegacion({ nav }: BarraNavegacionProps) {
  return (
    <div className="fila-botones">
      <button onClick={nav.anterior} disabled={!nav.hayAnterior}>anterior</button>
      <button onClick={nav.siguiente} disabled={!nav.haySiguiente}>siguiente</button>
      <button
        className={nav.aleatorio ? 'toggle pulsado' : 'toggle'}
        aria-pressed={nav.aleatorio}
        onClick={nav.toggleRandom}
      >
        random
      </button>
      <span className="contador">
        {nav.posicion}/{nav.total}
      </span>
    </div>
  );
} */