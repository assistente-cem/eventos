import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from './lib/supabaseClient';

// Importação dos seus componentes
import Login from './components/Login';
import Dashboard from './components/OrganizadorDashboard';
import CheckIn from './components/CheckIn';

export default function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    // Verifica se já existe alguém logado
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <Router basename="/eventos">
      <Routes>
        {/* Se NÃO houver sessão, mostra Login. Se houver, vai para o Dashboard */}
        <Route 
          path="/" 
          element={!session ? <Login /> : <Navigate to="/dashboard" />} 
        />

        <Route 
          path="/dashboard" 
          element={session ? <Dashboard /> : <Navigate to="/" />} 
        />

        <Route 
          path="/checkin" 
          element={session ? <CheckIn /> : <Navigate to="/" />} 
        />
      </Routes>
    </Router>
  );
}
