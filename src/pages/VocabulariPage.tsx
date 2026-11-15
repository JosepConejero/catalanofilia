import { useState } from 'react';
import { vocabulari } from '../data/vocabulari';
import Campo from '../components/Campo';
import BarraNavegacion from '../components/BarraNavegacion';
import { useNavegadorLista } from '../hooks/useNavegadorLista';

type Clave = 'catala' | 'sinonims' | 'castella' | 'fraseCat' | 'fraseCast';

export default function VocabulariPage() {
  const nav = useNavegadorLista(vocabulari);
  // true = texto oculto
  const [ocultos, setOcultos] = useState<Record<Clave, boolean>>({
    catala: false,
    sinonims: true,
    castella: true,
    fraseCat: true,
    fraseCast: true,
  });

  if (!nav.actual) return <div>No hi ha vocabulari.</div>;

  const [catala, sinonims, castella, fraseCat, fraseCast] = nav.actual;

  const toggle = (c: Clave) => setOcultos((o) => ({ ...o, [c]: !o[c] }));

  const campos: { clave: Clave; etiqueta: string; texto: string }[] = [
    { clave: 'catala', etiqueta: 'Català', texto: catala },
    { clave: 'sinonims', etiqueta: 'Sinònims', texto: sinonims },
    { clave: 'castella', etiqueta: 'Castellà', texto: castella },
    { clave: 'fraseCat', etiqueta: 'Exemples en català', texto: fraseCat },
    { clave: 'fraseCast', etiqueta: 'Traduccions al castellà dels exemples', texto: fraseCast },
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