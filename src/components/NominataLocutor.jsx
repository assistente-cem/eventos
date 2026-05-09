import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function NominataLocutor({ eventoId }) {
  const [presentes, setPresentes] = useState([]);

  useEffect(() => {
    // 1. Busca inicial das autoridades já presentes
    fetchPresentes();

    // 2. Escuta em TEMPO REAL: Se alguém marcar presença, a tela atualiza sozinha
    const subscription = supabase
      .channel('checkin-realtime')
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'participacoes' }, 
      payload => {
        fetchPresentes();
      })
      .subscribe();

    return () => supabase.removeChannel(subscription);
  }, [eventoId]);

  async function fetchPresentes() {
    const { data, error } = await supabase
      .from('participacoes')
      .select(`
        status_presenca,
        precedencia_no_evento,
        pessoas (posto_grad_titulo, nome_completo, cargo_funcao)
      `)
      .eq('evento_id', eventoId)
      .eq('status_presenca', true)
      .order('precedencia_no_evento', { ascending: true });

    if (!error) setPresentes(data);
  }

  return (
    <div className="p-8 bg-slate-900 min-h-screen text-white">
      <h1 className="text-3xl font-bold border-b-2 border-yellow-500 mb-6 pb-2">
        NOMINATA DE AUTORIDADES - EM TEMPO REAL
      </h1>
      
      <div className="space-y-4">
        {presentes.length === 0 ? (
          <p className="text-gray-400 italic">Aguardando início do check-in no posto de controle...</p>
        ) : (
          presentes.map((p, index) => (
            <div key={index} className="flex items-center gap-4 bg-slate-800 p-4 rounded-lg shadow-lg animate-pulse-once">
              <span className="text-2xl font-mono text-yellow-500 font-bold">{index + 1}º</span>
              <div>
                <p className="text-xl font-semibold uppercase">
                  {p.pessoas.posto_grad_titulo} {p.pessoas.nome_completo}
                </p>
                <p className="text-sm text-gray-400">{p.pessoas.cargo_funcao}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}