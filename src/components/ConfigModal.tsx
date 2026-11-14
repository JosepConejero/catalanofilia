import { useEffect, useState } from 'react';
import { useAppStore } from '../store/useAppStore';

export default function ConfigModal() {
  const ajustes = useAppStore((s) => s.ajustes);
  const cerrarModal = useAppStore((s) => s.cerrarModal);
  const aplicarAjustes = useAppStore((s) => s.aplicarAjustes);
  const [borrador, setBorrador] = useState(ajustes);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') cerrarModal();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [cerrarModal]);

  return (
    <div className="modal-fondo">
      <div className="modal" role="dialog" aria-modal="true">
        <button className="modal-cerrar" onClick={cerrarModal} aria-label="Tancar">
          ✕
        </button>
        <h2>Configuració</h2>

        <div className="modal-contenido">
          {/* Aquí irán las opciones reales; esta es solo de ejemplo */}
          <label>
            <input
              type="checkbox"
              checked={borrador.opcionDemo}
              onChange={(e) => setBorrador({ ...borrador, opcionDemo: e.target.checked })}
            />
            Opció de prova
          </label>
        </div>

        <div className="modal-botones">
          <button onClick={() => aplicarAjustes(borrador)}>Acceptar</button>
          <button onClick={cerrarModal}>Cancel·lar</button>
        </div>
      </div>
    </div>
  );
}