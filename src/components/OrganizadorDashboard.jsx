import { useNavigate } from 'react-router-dom';
import { Calendar, Users, MapPin, CheckSquare, LogOut } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

export default function OrganizadorDashboard() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navbar Superior */}
      <nav className="bg-[#002147] text-white p-4 shadow-lg flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <span className="text-[#002147] font-bold">4º</span>
          </div>
          <h1 className="font-bold tracking-tight">Com4ºDN | Gestão de Eventos</h1>
        </div>
        <button onClick={handleLogout} className="flex items-center gap-2 text-sm opacity-80 hover:opacity-100">
          <LogOut size={18} /> Sair
        </button>
      </nav>

      <main className="max-w-7xl mx-auto p-6">
        <header className="mb-8">
          <h2 className="text-2xl font-bold text-slate-800">Painel de Controle</h2>
          <p className="text-slate-500">Bem-vindo, Organizador. Selecione uma ação abaixo.</p>
        </header>

        {/* Grid de Ações Principais */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Botão Consultar Eventos */}
          <button 
            onClick={() => navigate('/consultar-eventos')}
            className="group bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:border-blue-500 hover:shadow-md transition-all text-left"
          >
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <Calendar size={24} />
            </div>
            <h3 className="font-bold text-slate-800">Consultar Eventos</h3>
            <p className="text-sm text-slate-500 mt-1">Veja a agenda e detalhes dos cerimoniais.</p>
          </button>

          {/* Botão Check-in (Mobile Friendly) */}
          <button 
            onClick={() => navigate('/checkin')}
            className="group bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:border-green-500 hover:shadow-md transition-all text-left"
          >
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mb-4 group-hover:bg-green-600 group-hover:text-white transition-colors">
              <CheckSquare size={24} />
            </div>
            <h3 className="font-bold text-slate-800">Check-in Portal</h3>
            <p className="text-sm text-slate-500 mt-1">Confirmar presença na recepção (QR Code).</p>
          </button>

          {/* Botão Pessoas */}
          <button 
            onClick={() => navigate('/pessoas')}
            className="group bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:border-purple-500 hover:shadow-md transition-all text-left"
          >
            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:bg-purple-600 group-hover:text-white transition-colors">
              <Users size={24} />
            </div>
            <h3 className="font-bold text-slate-800">Autoridades</h3>
            <p className="text-sm text-slate-500 mt-1">Gerenciar cadastros e precedências.</p>
          </button>

          {/* Botão Locais */}
          <button 
            onClick={() => navigate('/locais')}
            className="group bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:border-orange-500 hover:shadow-md transition-all text-left"
          >
            <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center mb-4 group-hover:bg-orange-600 group-hover:text-white transition-colors">
              <MapPin size={24} />
            </div>
            <h3 className="font-bold text-slate-800">Locais</h3>
            <p className="text-sm text-slate-500 mt-1">Configurar salões, cais e estruturas.</p>
          </button>

        </div>

        {/* Seção de Resumo Rápido */}
        <section className="mt-10 bg-[#002147] rounded-3xl p-8 text-white flex flex-col md:flex-row justify-between items-center shadow-xl">
          <div>
            <h4 className="text-xl font-bold">Próximo Evento</h4>
            <p className="opacity-80">Passagem de Comando - 15 Junho, 10:00h</p>
          </div>
          <button 
            onClick={() => navigate('/evento-detalhes')}
            className="mt-4 md:mt-0 bg-white text-[#002147] px-6 py-2 rounded-full font-bold hover:bg-blue-50 transition-colors"
          >
            Ver Nominata
          </button>
        </section>
      </main>
    </div>
  );
}
