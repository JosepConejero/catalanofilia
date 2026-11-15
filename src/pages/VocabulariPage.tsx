import { useState } from 'react';
import { vocabulari } from '../data/vocabulari';

type Clave = 'catala' | 'sinonims' | 'castella' | 'fraseCat' | 'fraseCast';

interface CampoProps {
  etiqueta: string;
  texto: string;
  oculto: boolean;
  onToggle: () => void;
}

function Campo({ etiqueta, texto, oculto, onToggle }: CampoProps) {
  return (
    <div className="campo">
      <label className="campo-label" onClick={onToggle}>
        {etiqueta}
      </label>
      <p className="campo-texto" onClick={onToggle}>
        {oculto ? '' : texto}
      </p>
    </div>
  );
}

// Devuelve las posiciones 0..total-1 desordenadas, con 'primero' siempre en la posición 0
function barajarConPrimero(total: number, primero: number): number[] {
  const resto = Array.from({ length: total }, (_, i) => i).filter((i) => i !== primero);
  for (let i = resto.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [resto[i], resto[j]] = [resto[j], resto[i]];
  }
  return [primero, ...resto];
}

export default function VocabulariPage() {
  // Posición dentro de la lista que se está recorriendo (vocabulari u 'orden')
  const [indice, setIndice] = useState(0);
  const [aleatorio, setAleatorio] = useState(false);
  // Posiciones de 'vocabulari' en el orden aleatorio actual
  const [orden, setOrden] = useState<number[]>([]);
  const [ocultos, setOcultos] = useState<Record<Clave, boolean>>({
    catala: false,
    sinonims: true,
    castella: true,
    fraseCat: true,
    fraseCast: true,
  });

  const totalPalabras = vocabulari.length;

  if (totalPalabras === 0) return <div>No hi ha vocabulari.</div>;

  // Posición real en 'vocabulari' de la palabra que se muestra
  const indiceReal = aleatorio ? orden[indice] : indice;
  const posicionPalabraActual = indice + 1;

  const [catala, sinonims, castella, fraseCat, fraseCast] = vocabulari[indiceReal];

  const toggle = (c: Clave) => setOcultos((o) => ({ ...o, [c]: !o[c] }));

  const anterior = () => setIndice((i) => (i > 0 ? i - 1 : i));
  const siguiente = () => setIndice((i) => (i < totalPalabras - 1 ? i + 1 : i));

  const toggleRandom = () => {
    if (!aleatorio) {
      // Activar: nuevo orden con la palabra actual en primer lugar
      setOrden(barajarConPrimero(totalPalabras, indice));
      setIndice(0);
      setAleatorio(true);
    } else {
      // Desactivar: volver a vocabulari en la posición de la palabra actual
      setIndice(orden[indice]);
      setAleatorio(false);
    }
  };

  const campos: { clave: Clave; etiqueta: string; texto: string }[] = [
    { clave: 'catala', etiqueta: 'Català', texto: catala },
    { clave: 'sinonims', etiqueta: 'Sinònims', texto: sinonims },
    { clave: 'castella', etiqueta: 'Castellà', texto: castella },
    { clave: 'fraseCat', etiqueta: 'Exemples en català', texto: fraseCat },
    { clave: 'fraseCast', etiqueta: 'Traduccions al castellà dels exemples', texto: fraseCast },
  ];

  return (
    <div className="traduccio">
      <div className="fila-botones">
        <button onClick={anterior} disabled={indice === 0}>anterior</button>
        <button onClick={siguiente} disabled={indice === totalPalabras - 1}>siguiente</button>
        <button
          className={aleatorio ? 'toggle pulsado' : 'toggle'}
          aria-pressed={aleatorio}
          onClick={toggleRandom}
        >
          random
        </button>
        <span className="contador">
          {posicionPalabraActual}/{totalPalabras}
        </span>
      </div>

      {campos.map((c) => (
        <Campo
          key={c.clave}
          etiqueta={c.etiqueta}
          texto={c.texto}
          oculto={ocultos[c.clave]}
          onToggle={() => toggle(c.clave)}
        />
      ))}
    </div>
  );
}
