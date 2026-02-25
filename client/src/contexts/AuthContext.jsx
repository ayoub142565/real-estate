import { createContext, useContext, useMemo, useState } from 'react';
import { authService, bootstrapStore } from '../services/store';

const AuthContext = createContext(null);
bootstrapStore();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('user');
    return raw ? JSON.parse(raw) : null;
  });

  const login = async (payload) => {
    const data = authService.login(payload);
    localStorage.setItem('user', JSON.stringify(data));
    setUser(data);
  };

  const register = async (payload) => {
    const data = authService.register(payload);
    localStorage.setItem('user', JSON.stringify(data));
    setUser(data);
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const value = useMemo(() => ({ user, login, register, logout }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
