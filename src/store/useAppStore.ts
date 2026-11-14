import { create } from 'zustand';

export interface Ajustes {
  // Opción de ejemplo; aquí irán las opciones reales de configuración
  opcionDemo: boolean;
}

interface AppState {
  menuAbierto: boolean;
  modalAbierto: boolean;
  ajustes: Ajustes;
  toggleMenu: () => void;
  cerrarMenu: () => void;
  abrirModal: () => void;
  cerrarModal: () => void;
  aplicarAjustes: (nuevos: Ajustes) => void;
}

export const useAppStore = create<AppState>((set) => ({
  menuAbierto: false,
  modalAbierto: false,
  ajustes: { opcionDemo: false },
  toggleMenu: () => set((s) => ({ menuAbierto: !s.menuAbierto })),
  cerrarMenu: () => set({ menuAbierto: false }),
  abrirModal: () => set({ modalAbierto: true }),
  cerrarModal: () => set({ modalAbierto: false }),
  aplicarAjustes: (nuevos) => set({ ajustes: nuevos, modalAbierto: false }),
}));