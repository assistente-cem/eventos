// Note a mudança de BrowserRouter para HashRouter
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from './lib/supabaseClient';

import Login from './components/Login';
import OrganizadorDashboard from './components/OrganizadorDashboard';
import ConsultarEventos from './components/ConsultarEventos';
import CheckIn from './components/CheckIn';
import FormularioPessoa from './components/FormularioPessoa';

export default function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#002147]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
    </div>
  );

  return (
    <Router> 
      {/* O HashRouter NÃO precisa do basename="/eventos" */}
      <Routes>
        <Route path="/" element={!session ? <Login /> : <Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={session ? <OrganizadorDashboard /> : <Navigate to="/" />} />
        <Route path="/consultar-eventos" element={session ? <ConsultarEventos /> : <Navigate to="/" />} />
        <Route path="/checkin" element={session ? <CheckIn /> : <Navigate to="/" />} />
        <Route path="/pessoas" element={session ? <FormularioPessoa /> : <Navigate to="/" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}
