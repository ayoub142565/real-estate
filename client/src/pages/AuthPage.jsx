import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function AuthPage() {
  const isRegister = useLocation().pathname.includes('register');
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const payload = {
      name: form.get('name'),
      email: form.get('email'),
      password: form.get('password')
    };
    try {
      if (isRegister) await register(payload);
      else await login(payload);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Authentication failed');
    }
  };

  return (
    <section className="container-x flex min-h-[70vh] items-center justify-center py-10">
      <form onSubmit={submit} className="w-full max-w-md rounded-2xl bg-white p-8 shadow-card">
        <h1 className="text-2xl font-bold">{isRegister ? 'Create account' : 'Welcome back'}</h1>
        {isRegister && <input name="name" placeholder="Full name" className="mt-4 w-full rounded border px-3 py-2" required />}
        <input name="email" type="email" placeholder="Email" className="mt-4 w-full rounded border px-3 py-2" required />
        <input name="password" type="password" placeholder="Password" className="mt-4 w-full rounded border px-3 py-2" required />
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        <button className="mt-6 w-full rounded-lg bg-brand-600 px-4 py-2 font-semibold text-white">{isRegister ? 'Register' : 'Login'}</button>
      </form>
    </section>
  );
}
