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

/* import { useState } from 'react';
import { vocabulari } from '../data/vocabulari';

const entradas = Object.entries(vocabulari);

type Clave = 'catala' | 'castella' | 'fraseCat' | 'fraseCast';

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
  // true = botón pulsado = texto oculto
  const [ocultos, setOcultos] = useState<Record<Clave, boolean>>({
    catala: false,
    castella: true,
    fraseCat: true,
    fraseCast: true,
  });

  if (entradas.length === 0) return <div>No hi ha vocabulari.</div>;

  const [paraula, [dada1, frases1, frases2]] = entradas[indice];

  const toggle = (c: Clave) => setOcultos((o) => ({ ...o, [c]: !o[c] }));

  const anterior = () => setIndice((i) => (i > 0 ? i - 1 : i));
  const siguiente = () => setIndice((i) => (i < entradas.length - 1 ? i + 1 : i));
  const random = () =>
    setIndice((actual) => {
      if (entradas.length === 1) return actual;
      let nuevo = actual;
      while (nuevo === actual) nuevo = Math.floor(Math.random() * entradas.length);
      return nuevo;
    });

  const botones: { clave: Clave; texto: string }[] = [
    { clave: 'catala', texto: 'català' },
    { clave: 'castella', texto: 'castellà' },
    { clave: 'fraseCat', texto: 'frases català' },
    { clave: 'fraseCast', texto: 'frases castellà' },
  ];

  const campos: { clave: Clave; etiqueta: string; texto: string }[] = [
    { clave: 'catala', etiqueta: 'Català', texto: paraula },
    { clave: 'castella', etiqueta: 'Castellà', texto: dada1 },
    { clave: 'fraseCat', etiqueta: 'Exemples en català', texto: frases1 },
    { clave: 'fraseCast', etiqueta: 'Traduccions al castellà dels exemples', texto: frases2 },
  ];

  return (
    <div className="traduccio">
      <div className="fila-botones">
        {botones.map((b) => (
          <button
            key={b.clave}
            className={ocultos[b.clave] ? 'toggle pulsado' : 'toggle'}
            aria-pressed={ocultos[b.clave]}
            onClick={() => toggle(b.clave)}
          >
            {b.texto}
          </button>
        ))}
      </div>

      <div className="fila-botones">
        <button onClick={anterior} disabled={indice === 0}>anterior</button>
        <button onClick={siguiente} disabled={indice === entradas.length - 1}>siguiente</button>
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


 */