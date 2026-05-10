import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Calendar, MapPin, Shield, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ConsultarEventos() {
  const [eventos, setEventos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEventos = async () => {
      const { data, error } = await supabase
        .from('eventos')
        .select(`
          *,
          locais (nome, sigla),
          uniformes (nome, codigo)
        `)
        .order('data_hora', { ascending: true });
      
      if (!error) setEventos(data);
    };
    fetchEventos();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 text-blue-900 font-bold mb-6">
        <ArrowLeft size={20} /> Voltar ao Painel
      </button>

      <h2 className="text-2xl font-bold text-slate-800 mb-6">Agenda de Eventos</h2>

      <div className="grid grid-cols-1 gap-4">
        {eventos.map(evento => (
          <div key={evento.id} className="bg-white p-5 rounded-xl shadow-sm border-l-4 border-blue-900 flex justify-between items-center">
            <div>
              <h3 className="font-bold text-lg text-slate-800">{evento.titulo}</h3>
              <div className="flex gap-4 mt-2 text-sm text-slate-500">
                <span className="flex items-center gap-1"><Calendar size={14}/> {new Date(evento.data_hora).toLocaleDateString()}</span>
                <span className="flex items-center gap-1"><MapPin size={14}/> {evento.locais?.sigla}</span>
                <span className="flex items-center gap-1"><Shield size={14}/> {evento.uniformes?.codigo}</span>
              </div>
            </div>
            <button 
              onClick={() => navigate(`/evento/${evento.id}`)}
              className="bg-slate-100 text-slate-700 px-4 py-2 rounded-lg text-sm font-bold hover:bg-slate-200"
            >
              Gerenciar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
