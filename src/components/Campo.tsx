interface CampoProps {
  etiqueta: string;
  texto: string;
  oculto: boolean;
  onToggle: () => void;
}

export default function Campo({ etiqueta, texto, oculto, onToggle }: CampoProps) {
  const vacio = !texto || texto.trim() === '';

  // El oculto tiene prioridad: aunque esté vacío, se muestra gris y sin texto
  let clase = 'campo-texto';
  let contenido = texto;

  if (oculto) {
    clase += ' campo-oculto';
    contenido = '';
  } else if (vacio) {
    clase += ' campo-vacio';
    contenido = '-------';
  }

  return (
    <div className="campo">
      <label className="campo-label" onClick={onToggle}>
        {etiqueta}
      </label>
      <p className={clase} onClick={onToggle}>
        {contenido}
      </p>
    </div>
  );
}