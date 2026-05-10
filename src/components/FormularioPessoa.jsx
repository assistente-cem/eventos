import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function FormularioPessoa() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nome_completo: '',
    nome_guerra: '',
    posto_graduacao_titulo: '',
    categoria: 'Militar',
    foto_url: ''
  });

  async function handleFileUpload(e) {
    const file = e.target.files[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `autoridades/${fileName}`;

    setLoading(true);
    let { error: uploadError } = await supabase.storage
      .from('fotos-autoridades')
      .upload(filePath, file);

    if (!uploadError) {
      const { data } = supabase.storage.from('fotos-autoridades').getPublicUrl(filePath);
      setFormData({ ...formData, foto_url: data.publicUrl });
    }
    setLoading(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const { error } = await supabase.from('pessoas').insert([formData]);
    if (!error) alert('Cadastro realizado com sucesso!');
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-[#002147] mb-6">Cadastro de Pessoa/Autoridade</h2>
      
      <div className="space-y-4">
        <input 
          placeholder="Nome Completo" 
          className="input-field"
          onChange={e => setFormData({...formData, nome_completo: e.target.value})}
        />
        
        <div className="grid grid-cols-2 gap-4">
          <input 
            placeholder="Posto/Título" 
            className="input-field"
            onChange={e => setFormData({...formData, posto_graduacao_titulo: e.target.value})}
          />
          <select 
            className="input-field"
            onChange={e => setFormData({...formData, categoria: e.target.value})}
          >
            <option value="Militar">Militar</option>
            <option value="Civil">Civil</option>
          </select>
        </div>

        <div className="border-2 border-dashed border-gray-300 p-4 text-center">
          <label className="cursor-pointer block">
            <span className="text-gray-600">Carregar Foto</span>
            <input type="file" className="hidden" onChange={handleFileUpload} />
          </label>
          {loading && <p className="animate-pulse text-blue-500">Enviando...</p>}
          {formData.foto_url && <img src={formData.foto_url} className="w-20 h-20 mx-auto mt-2 rounded-full object-cover" />}
        </div>

        <button type="submit" className="btn-primary w-full">Gravar no Banco</button>
      </div>
    </form>
  );
}
