interface CampoProps {
  etiqueta: string;
  texto: string;
  oculto: boolean;
  onToggle: () => void;
}

export default function Campo({ etiqueta, texto, oculto, onToggle }: CampoProps) {
  const vacio = !texto || texto.trim() === '';

  let clase = 'campo-texto';
  let contenido: React.ReactNode = texto;

  if (oculto) {
    clase += ' campo-oculto';
    contenido = vacio ? '-------' : <span className="texto-borroso">? ? ? ?</span>;
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
