import { Route, Routes, NavLink } from "react-router-dom";
import Home from "./pages/Home";
import Forge from "./pages/Forge";
import Play from "./pages/Play";
import FAQ from "./pages/FAQ";
import Principles from "./pages/Principles";
import NotFound from "./pages/NotFound";

function Nav() {
  const link = "px-3 py-2 rounded hover:bg-gray-800 transition-colors";
  const active = "bg-gray-800 text-brand-cyan font-semibold";
  return (
    <nav className="sticky top-0 z-10 bg-gray-950/80 backdrop-blur border-b border-gray-800">
      <div className="max-w-6xl mx-auto flex items-center justify-between p-3">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-6 rounded bg-gradient-to-b from-cyan-400 to-violet-500" />
          <span className="font-bold">FactForge</span>
        </div>
        <div className="flex gap-1 text-sm">
          <NavLink to="/" end className={({isActive}) => `${link} ${isActive?active:""}`}>Home</NavLink>
          <NavLink to="/forge" className={({isActive}) => `${link} ${isActive?active:""}`}>Forge</NavLink>
          <NavLink to="/play" className={({isActive}) => `${link} ${isActive?active:""}`}>Play</NavLink>
          <NavLink to="/faq" className={({isActive}) => `${link} ${isActive?active:""}`}>FAQ</NavLink>
          <NavLink to="/principles" className={({isActive}) => `${link} ${isActive?active:""}`}>Why Free?</NavLink>
        </div>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-800">
      <div className="max-w-6xl mx-auto p-6 text-sm text-gray-400">
        <p>FactForge — Forge quizzes from any text. Free, offline-friendly, no login.</p>
        <p className="mt-2">© {new Date().getFullYear()} Eskinder Kassahun</p>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div>
      <Nav />
      <main className="max-w-6xl mx-auto p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/forge" element={<Forge />} />
          <Route path="/play" element={<Play />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/principles" element={<Principles />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
