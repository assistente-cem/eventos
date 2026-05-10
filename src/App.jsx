import { useEffect, useState } from 'react';
import { supabase } from './lib/supabaseClient';
import FormularioPessoa from './components/FormularioPessoa';

export default function App() {
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    fetchEventos();
  }, []);

  async function fetchEventos() {
    const { data } = await supabase
      .from('eventos')
      .select('*, locais(nome), uniformes(sigla)')
      .order('data_hora', { ascending: true });
    setEventos(data || []);
  }

  return (
    <div className="min-h-screen p-8">
      <header className="flex justify-between items-center mb-10 border-b-4 border-[#002147] pb-4">
        <h1 className="text-3xl font-extrabold text-[#002147]">Eventos Com4ºDN</h1>
        <button className="btn-primary">+ Novo Evento</button>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Lado Esquerdo: Lista de Eventos (Read) */}
        <section>
          <h2 className="text-xl font-bold mb-4">Eventos Planejados</h2>
          {eventos.map(evento => (
            <div key={evento.id} className="bg-white p-4 mb-4 rounded shadow border-l-8 border-yellow-500">
              <h3 className="font-bold text-lg">{evento.titulo}</h3>
              <p className="text-gray-600">{new Date(evento.data_hora).toLocaleString('pt-BR')}</p>
              <p className="text-sm font-semibold">Local: {evento.locais?.nome}</p>
              <span className="inline-block mt-2 px-2 py-1 bg-gray-200 text-xs rounded">
                Uniforme: {evento.uniformes?.sigla}
              </span>
            </div>
          ))}
        </section>

        {/* Lado Direito: Cadastro (Create) */}
        <section>
          <FormularioPessoa />
        </section>
      </main>
    </div>
  );
}
