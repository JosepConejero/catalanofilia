import { useEffect, useRef } from 'react';
import { useAppStore } from '../store/useAppStore';

// Pulsar la tecla "1" llama a onTecla(0), la "2" a onTecla(1), etc., hasta 'total' (máx. 9)
export function useAtajosNumericos(total: number, onTecla: (indice: number) => void) {
  const modalAbierto = useAppStore((s) => s.modalAbierto);

  // Guardamos siempre la última versión de onTecla sin tener que volver a suscribir el listener
  const onTeclaRef = useRef(onTecla);
  useEffect(() => {
    onTeclaRef.current = onTecla;
  });

  useEffect(() => {
    // Con el modal abierto, las teclas no deben afectar a lo que hay detrás
    if (modalAbierto) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.repeat || e.ctrlKey || e.metaKey || e.altKey) return;

      // No interferir si se está escribiendo en un campo de formulario
      const el = e.target as HTMLElement | null;
      if (el && (['INPUT', 'TEXTAREA', 'SELECT'].includes(el.tagName) || el.isContentEditable)) return;

      const numero = Number(e.key);
      if (Number.isInteger(numero) && numero >= 1 && numero <= Math.min(total, 9)) {
        onTeclaRef.current(numero - 1);
      }
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [total, modalAbierto]);
}