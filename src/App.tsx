import { Routes, Route } from 'react-router-dom';
import TopBar from './components/TopBar';
import SideMenu from './components/SideMenu';
import ConfigModal from './components/ConfigModal';
import { useAppStore } from './store/useAppStore';
import VerbsPage from './pages/VerbsPage';
import NomsPage from './pages/NomsPage';
import VocabulariPage from './pages/VocabulariPage';
import TraduccioPage from './pages/TraduccioPage';
import PronomsFeblesPage from './pages/PronomsFeblesPage';
import ConnectorsPage from './pages/ConnectorsPage';
import FrasesFetesPage from './pages/FrasesFetesPage';

export default function App() {
  const modalAbierto = useAppStore((s) => s.modalAbierto);

  return (
    <div className="app">
      <TopBar />
      <SideMenu />
      <main className="zona-trabajo">
        <Routes>
          <Route path="/" element={null} />
          <Route path="/verbs" element={<VerbsPage />} />
          <Route path="/noms" element={<NomsPage />} />
          <Route path="/vocabulari" element={<VocabulariPage />} />
          <Route path="/traduccio" element={<TraduccioPage />} />
          <Route path="/pronoms-febles" element={<PronomsFeblesPage />} />
          <Route path="/connectors" element={<ConnectorsPage />} />
          <Route path="/frases-fetes" element={<FrasesFetesPage />} />
        </Routes>
      </main>
      {modalAbierto && <ConfigModal />}
    </div>
  );
}
