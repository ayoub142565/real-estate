import { Heart, Home, LogOut, Menu, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const linkClass = 'hover:text-brand-600 transition-colors';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-30 border-b bg-white/95 backdrop-blur">
      <nav className="container-x flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold text-brand-700">
          <Home size={22} /> EstatePro
        </Link>

        <button className="md:hidden" onClick={() => setOpen((v) => !v)}>
          <Menu />
        </button>

        <div className={`${open ? 'flex' : 'hidden'} absolute left-0 top-16 w-full flex-col gap-4 border-b bg-white p-4 md:static md:flex md:w-auto md:flex-row md:items-center md:border-none md:p-0`}>
          <Link to="/properties" className={linkClass}>Properties</Link>
          <Link to="/contact" className={linkClass}>Contact</Link>
          {user && <Link to="/favorites" className="flex items-center gap-1 hover:text-brand-600"><Heart size={16} /> Favorites</Link>}
          {user?.role === 'admin' && <Link to="/admin" className={linkClass}>Admin</Link>}
          {user ? (
            <button className="flex items-center gap-1 text-sm text-slate-700" onClick={logout}>
              <LogOut size={16} /> Logout
            </button>
          ) : (
            <Link to="/login" className="flex items-center gap-1 rounded-lg bg-brand-600 px-3 py-2 text-sm font-semibold text-white"><User size={16} /> Login</Link>
          )}
        </div>
      </nav>
    </header>
  );
}
