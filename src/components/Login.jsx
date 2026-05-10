import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert("Erro ao acessar: " + error.message);
    else window.location.href = '/dashboard';
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-200">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md border-t-8 border-[#002147]">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-[#002147]">Acesso ao Sistema</h1>
          <p className="text-gray-500">Gestão de Eventos - Com4ºDN</p>
        </div>
        <input type="email" placeholder="E-mail funcional" className="input-field mb-4" onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Senha" className="input-field mb-6" onChange={e => setPassword(e.target.value)} />
        <button type="submit" className="btn-primary w-full py-3">Entrar no Sistema</button>
      </form>
    </div>
  );
}
