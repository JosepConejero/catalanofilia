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