import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from './lib/supabaseClient';

// Importação dos Componentes/Telas
import Login from './components/Login';
import OrganizadorDashboard from './components/OrganizadorDashboard';
import ConsultarEventos from './components/ConsultarEventos';
import CheckIn from './components/CheckIn';
import FormularioPessoa from './components/FormularioPessoa';

export default function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Busca sessão inicial
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Escuta mudanças na autenticação (Login/Logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Tela de carregamento simples enquanto verifica o login
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#002147]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <Router basename="/eventos">
      <Routes>
        {/* ROTA RAIZ: Se não estiver logado, vai para Login. Se estiver, vai para Dashboard */}
        <Route 
          path="/" 
          element={!session ? <Login /> : <Navigate to="/dashboard" />} 
        />

        {/* DASHBOARD PRINCIPAL */}
        <Route 
          path="/dashboard" 
          element={session ? <OrganizadorDashboard /> : <Navigate to="/" />} 
        />

        {/* CONSULTA DE EVENTOS */}
        <Route 
          path="/consultar-eventos" 
          element={session ? <ConsultarEventos /> : <Navigate to="/" />} 
        />

        {/* CHECK-IN PORTAL (MOBILE) */}
        <Route 
          path="/checkin" 
          element={session ? <CheckIn /> : <Navigate to="/" />} 
        />

        {/* CADASTRO DE PESSOAS/AUTORIDADES */}
        <Route 
          path="/pessoas" 
          element={session ? <FormularioPessoa /> : <Navigate to="/" />} 
        />

        {/* REDIRECIONAMENTO DE SEGURANÇA: Qualquer rota inexistente volta para o início */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}
