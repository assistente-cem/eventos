import React, { useState } from 'react';
import CadastroEvento from './components/CadastroEvento';
import NominataLocutor from './components/NominataLocutor';

// Para teste, usaremos um ID de evento fixo que você criou no Supabase
const EVENTO_ID_TESTE = "COLE_AQUI_O_ID_DO_EVENTO_DO_SUPABASE";

function App() {
  const [aba, setAba] = useState('cadastro');

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Menu Superior Militar */}
      <nav className="bg-navy-900 bg-[#002147] text-white p-4 shadow-lg flex justify-between">
        <span className="font-bold">COM4ºDN - Sistema de Eventos</span>
        <div className="space-x-4">
          <button onClick={() => setAba('cadastro')} className={`hover:text-yellow-500 ${aba === 'cadastro' ? 'text-yellow-500' : ''}`}>Organização</button>
          <button onClick={() => setAba('checkin')} className={`hover:text-yellow-500 ${aba === 'checkin' ? 'text-yellow-500' : ''}`}>Posto de Controle</button>
          <button onClick={() => setAba('nominata')} className={`hover:text-yellow-500 ${aba === 'nominata' ? 'text-yellow-500' : ''}`}>Nominata</button>
        </div>
      </nav>

      {/* Conteúdo Dinâmico */}
      <main className="container mx-auto p-6">
        {aba === 'cadastro' && <CadastroEvento />}
        {aba === 'nominata' && <NominataLocutor eventoId={EVENTO_ID_TESTE} />}
        {aba === 'checkin' && (
          <div className="p-10 bg-white rounded shadow text-center">
            <h2 className="text-xl font-bold">Módulo de Check-in</h2>
            <p>Em desenvolvimento: Aqui o militar confirmará a presença.</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
