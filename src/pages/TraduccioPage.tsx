import { useState } from 'react';
import { traduccio } from '../data/traduccio';
import Campo from '../components/Campo';
import BarraNavegacion from '../components/BarraNavegacion';
import { useNavegadorLista } from '../hooks/useNavegadorLista';
import { useAtajosNumericos } from '../hooks/useAtajosNumericos';

type Clave = 'catala' | 'castella';

// Orden de los cuadros en pantalla: la tecla 1 es el primero, la 2 el segundo, etc.
const CLAVES: Clave[] = ['catala', 'castella'];

export default function TraduccioPage() {
  const nav = useNavegadorLista(traduccio);
  // true = texto oculto
  const [ocultos, setOcultos] = useState<Record<Clave, boolean>>({
    catala: true,
    castella: false,
  });

  const toggle = (c: Clave) => setOcultos((o) => ({ ...o, [c]: !o[c] }));

  useAtajosNumericos(CLAVES.length, (i) => toggle(CLAVES[i]));

  if (!nav.actual) return <div>No hi ha traduccions.</div>;

  const [catala, castella] = nav.actual;

  const campos: { clave: Clave; etiqueta: string; texto: string }[] = [
    { clave: 'catala', etiqueta: 'Català', texto: catala },
    { clave: 'castella', etiqueta: 'Castellà', texto: castella },
  ];

  return (
    <div className="traduccio">
      <BarraNavegacion nav={nav} />

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
import { traduccio } from '../data/traduccio';
import Campo from '../components/Campo';
import BarraNavegacion from '../components/BarraNavegacion';
import { useNavegadorLista } from '../hooks/useNavegadorLista';

type Clave = 'catala' | 'castella';

export default function TraduccioPage() {
  const nav = useNavegadorLista(traduccio);
  // true = texto oculto
  const [ocultos, setOcultos] = useState<Record<Clave, boolean>>({
    catala: true,
    castella: false,
  });

  if (!nav.actual) return <div>No hi ha traduccions.</div>;

  const [catala, castella] = nav.actual;

  const toggle = (c: Clave) => setOcultos((o) => ({ ...o, [c]: !o[c] }));

  const campos: { clave: Clave; etiqueta: string; texto: string }[] = [
    { clave: 'castella', etiqueta: 'Castellà', texto: castella },
    { clave: 'catala', etiqueta: 'Català', texto: catala },
  ];

  return (
    <div className="traduccio">
      <BarraNavegacion nav={nav} />

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
} */