interface CampoProps {
  etiqueta: string;
  texto: string;
  oculto: boolean;
  onToggle: () => void;
}

// Label + texto; pulsar sobre cualquiera de los dos alterna la visibilidad del texto
export default function Campo({ etiqueta, texto, oculto, onToggle }: CampoProps) {
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