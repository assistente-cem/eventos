import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function CadastroEvento() {
  const [loading, setLoading] = useState(false);
  const [vogais, setVogais] = useState([]);
  const [evento, setEvento] = useState({
    tipo_evento: 'Passagem de Comando',
    titulo: '',
    data_hora: '',
    om_militares_escalados: '',
    quantidade_escalados: 0,
    voga_id: '',
    particularidades: ''
  });

  // Carrega a lista de Vogais cadastrados ao abrir a página
  useEffect(() => {
    async function fetchVogais() {
      const { data } = await supabase.from('vogal').select('*');
      setVogais(data || []);
    }
    fetchVogais();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const { error } = await supabase.from('eventos').insert([evento]);

    if (error) alert('Erro ao salvar evento: ' + error.message);
    else alert('Evento registrado no repositório com sucesso!');
    
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white shadow-md rounded-lg space-y-4">
      <h2 className="text-2xl font-bold text-navy-900">Novo Registro de Evento</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <label className="block">
          <span>Tipo de Evento</span>
          <select 
            className="w-full mt-1 border-gray-300 rounded-md"
            onChange={(e) => setEvento({...evento, tipo_evento: e.target.value})}
          >
            <option>Passagem de Comando</option>
            <option>Passagem de Função</option>
            <option>Transferência para a Reserva</option>
            <option>Palestra</option>
            <option>Incorporação de Meios Navais</option>
            {/* Adicione os outros tipos aqui */}
          </select>
        </label>

        <label className="block">
          <span>Título do Evento</span>
          <input type="text" className="w-full mt-1 border-gray-300 rounded-md" required
            onChange={(e) => setEvento({...evento, titulo: e.target.value})} />
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <label className="block">
          <span>OM Escalada</span>
          <input type="text" className="w-full mt-1 border-gray-300 rounded-md"
            onChange={(e) => setEvento({...evento, om_militares_escalados: e.target.value})} />
        </label>

        <label className="block">
          <span>Qtd. Escalados</span>
          <input type="number" className="w-full mt-1 border-gray-300 rounded-md"
            onChange={(e) => setEvento({...evento, quantidade_escalados: e.target.value})} />
        </label>

        <label className="block">
          <span>Vogal Responsável</span>
          <select 
            className="w-full mt-1 border-gray-300 rounded-md"
            onChange={(e) => setEvento({...evento, voga_id: e.target.value})}
          >
            <option value="">Selecione um Vogal...</option>
            {vogais.map(v => (
              <option key={v.id} value={v.id}>{v.posto_grad} {v.nome_completo}</option>
            ))}
          </select>
        </label>
      </div>

      <label className="block">
        <span>Particularidades (Memória da Formatura)</span>
        <textarea className="w-full mt-1 border-gray-300 rounded-md" rows="4"
          placeholder="Ex: Pós-ação, detalhes do cerimonial, condições meteorológicas..."
          onChange={(e) => setEvento({...evento, particularidades: e.target.value})}></textarea>
      </label>

      <button type="submit" disabled={loading}
        className="px-6 py-2 bg-blue-700 text-white rounded hover:bg-blue-800 disabled:bg-gray-400">
        {loading ? 'Salvando...' : 'Salvar no Repositório'}
      </button>
    </form>
  );
}
