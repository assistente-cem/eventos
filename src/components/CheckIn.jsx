import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { CheckCircle, User, Search, Clock } from 'lucide-react';

export default function CheckIn() {
  const [busca, setBusca] = useState('');
  const [participantes, setParticipantes] = useState([]);
  const [loading, setLoading] = useState(false);

  // Busca os participantes confirmados (RSVP) para o evento ativo
  async function carregarLista() {
    setLoading(true);
    const { data, error } = await supabase
      .from('participacoes')
      .select(`
        id,
        check_in,
        hora_chegada,
        pessoas (nome_completo, nome_guerra, posto_graduacao_titulo, foto_url)
      `)
      .order('check_in', { ascending: true }); // Pendentes primeiro

    if (!error) setParticipantes(data);
    setLoading(false);
  }

  useEffect(() => { carregarLista(); }, []);

  // Registra a entrada no banco de dados
  async function registrarEntrada(id) {
    const agora = new Date().toISOString();
    const { error } = await supabase
      .from('participacoes')
      .update({ 
        check_in: true, 
        hora_chegada: agora 
      })
      .eq('id', id);

    if (!error) carregarLista(); // Atualiza a lista visualmente
  }

  const listaFiltrada = participantes.filter(p => 
    p.pessoas.nome_completo.toLowerCase().includes(busca.toLowerCase()) ||
    p.pessoas.nome_guerra.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 pb-20">
      <header className="mb-6">
        <h1 className="text-xl font-bold text-[#002147]">Recepção Com4ºDN</h1>
        <p className="text-sm text-gray-500">Check-in de Autoridades e Convidados</p>
      </header>

      {/* Barra de Busca Fixa */}
      <div className="sticky top-2 z-10 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Buscar por nome ou guerra..." 
            className="w-full pl-10 pr-4 py-3 rounded-full border-2 border-[#002147] shadow-lg focus:outline-none"
            onChange={(e) => setBusca(e.target.value)}
          />
        </div>
      </div>

      {/* Lista de Convidados */}
      <div className="space-y-3">
        {listaFiltrada.map((item) => (
          <div key={item.id} className={`flex items-center justify-between p-4 rounded-xl shadow-sm border ${item.check_in ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'}`}>
            <div className="flex items-center gap-3">
              <img 
                src={item.pessoas.foto_url || 'https://via.placeholder.com/150'} 
                className="w-12 h-12 rounded-full object-cover border border-gray-300"
              />
              <div>
                <p className="font-bold text-[#002147] text-sm">
                  {item.pessoas.posto_graduacao_titulo} {item.pessoas.nome_guerra}
                </p>
                <p className="text-xs text-gray-500 uppercase">{item.pessoas.nome_completo}</p>
              </div>
            </div>

            {item.check_in ? (
              <div className="text-right">
                <CheckCircle className="text-green-600 ml-auto" size={24} />
                <span className="text-[10px] text-green-700 font-mono">
                  {new Date(item.hora_chegada).toLocaleTimeString([], {hour: '2d', minute:'2d'})}
                </span>
              </div>
            ) : (
              <button 
                onClick={() => registrarEntrada(item.id)}
                className="bg-[#002147] text-white px-4 py-2 rounded-lg text-sm font-bold active:scale-95 transition-transform"
              >
                CHECK-IN
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
