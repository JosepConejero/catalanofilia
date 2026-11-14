import { NavLink } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';

const opciones = [
  { texto: 'Verbs', ruta: '/verbs' },
  { texto: 'Noms', ruta: '/noms' },
  { texto: 'Vocabulari', ruta: '/vocabulari' },
  { texto: 'Traducció', ruta: '/traduccio' },
  { texto: 'Pronoms febles', ruta: '/pronoms-febles' },
  { texto: 'Connectors', ruta: '/connectors' },
  { texto: 'Frases fetes', ruta: '/frases-fetes' },
];

export default function SideMenu() {
  const menuAbierto = useAppStore((s) => s.menuAbierto);
  const cerrarMenu = useAppStore((s) => s.cerrarMenu);

  if (!menuAbierto) return null;

  return (
    <div className="menu-overlay" onClick={cerrarMenu}>
      <nav className="menu-lateral" onClick={(e) => e.stopPropagation()}>
        {opciones.map((o) => (
          <NavLink key={o.ruta} to={o.ruta} onClick={cerrarMenu}>
            {o.texto}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}