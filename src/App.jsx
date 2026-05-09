import React, { useState } from 'react';
import CadastroEvento from './components/CadastroEvento';
import NominataLocutor from './components/NominataLocutor';
import CheckInMilitar from './components/CheckInMilitar';

function App() {
  const [telaAtiva, setTelaAtiva] = useState('cadastro');
  const [eventoSelecionado, setEventoSelecionado] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-navy-900 text-white p-4 flex gap-4 shadow-lg">
        <button onClick={() => setTelaAtiva('cadastro')} className="hover:text-yellow-500">Novo Evento</button>
        <button onClick={() => setTelaAtiva('checkin')} className="hover:text-yellow-500">Check-in Militar</button>
        <button onClick={() => setTelaAtiva('nominata')} className="hover:text-yellow-500">Nominata Real-time</button>
      </nav>

      <main className="p-6">
        {telaAtiva === 'cadastro' && <CadastroEvento />}
        {telaAtiva === 'checkin' && <CheckInMilitar setEvento={setEventoSelecionado} />}
        {telaAtiva === 'nominata' && <NominataLocutor eventoId={eventoSelecionado} />}
      </main>
    </div>
  );
}

export default App;