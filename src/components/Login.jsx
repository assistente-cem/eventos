import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    
    if (error) {
      alert("Falha no login: " + error.message);
    } else {
      navigate('/dashboard'); // Redireciona após sucesso
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#002147] p-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <div className="text-center mb-8">
          <img src="/brasao-marinha.png" alt="MB" className="w-20 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-[#002147]">Gestão de Eventos</h1>
          <p className="text-gray-500 text-sm">Comando do 4º Distrito Naval</p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <input 
            type="email" 
            placeholder="E-mail funcional" 
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input 
            type="password" 
            placeholder="Senha" 
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="w-full bg-[#002147] text-white p-3 rounded-lg font-bold hover:bg-blue-900 transition-colors">
            Acessar
          </button>
        </form>
      </div>
    </div>
  );
}
