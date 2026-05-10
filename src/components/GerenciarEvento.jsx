import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function GerenciarEvento() {
  const [evento, setEvento] = useState({ titulo: '', data_hora: '', local_id: '', uniforme_id: '' });
  const [convidados, setConvidados] = useState([]);

  // Lógica para carregar autoridades e convidados e vincular ao evento
  const vincularParticipante = async (pessoaId) => {
    // Código para insert na tabela participacoes
    alert("Participante vinculado ao evento!");
  };

  return (
    <div className="p-8 space-y-8">
      <section className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Dados do Evento</h2>
        <div className="grid grid-cols-2 gap-4">
          <input className="input-field" placeholder="Título do Evento" />
          <input className="input-field" type="datetime-local" />
          <select className="input-field"><option>Selecione o Local</option></select>
          <select className="input-field"><option>Selecione o Uniforme</option></select>
        </div>
      </section>

      <section className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Lista de Presença e Nominata</h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th className="p-2 border">Posto/Nome</th>
              <th className="p-2 border">Confirmação (RSVP)</th>
              <th className="p-2 border">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-blue-50">
              <td className="p-2 border">Alte Esq Mello Almeida</td>
              <td className="p-2 border text-green-600 font-bold">Confirmado</td>
              <td className="p-2 border">
                <button className="bg-blue-900 text-white text-xs px-2 py-1 rounded">Definir Precedência</button>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
}
