import { useState } from 'react';
import { vocabulari } from '../data/vocabulari';

type Clave = 'catala' | 'sinonims' | 'castella' | 'fraseCat' | 'fraseCast';

interface CampoProps {
  etiqueta: string;
  texto: string;
  oculto: boolean;
  onToggle: () => void;
}

// Label + texto; pulsar sobre cualquiera de los dos alterna la visibilidad del texto
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

export default function TraduccioPage() {
  const [indice, setIndice] = useState(0);
  // true = texto oculto
  const [ocultos, setOcultos] = useState<Record<Clave, boolean>>({
    catala: false,
    sinonims: true,
    castella: true,
    fraseCat: true,
    fraseCast: true,
  });

  if (vocabulari.length === 0) return <div>No hi ha vocabulari.</div>;

  const [catala, sinonims, castella, fraseCat, fraseCast] = vocabulari[indice];

  const toggle = (c: Clave) => setOcultos((o) => ({ ...o, [c]: !o[c] }));

  const anterior = () => setIndice((i) => (i > 0 ? i - 1 : i));
  const siguiente = () => setIndice((i) => (i < vocabulari.length - 1 ? i + 1 : i));
  const random = () =>
    setIndice((actual) => {
      if (vocabulari.length === 1) return actual;
      let nuevo = actual;
      while (nuevo === actual) nuevo = Math.floor(Math.random() * vocabulari.length);
      return nuevo;
    });

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
        <button onClick={siguiente} disabled={indice === vocabulari.length - 1}>siguiente</button>
        <button onClick={random}>random</button>
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

