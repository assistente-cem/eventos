export default function OrganizadorDashboard() {
  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded shadow border-l-4 border-blue-600">
        <h3 className="font-bold text-lg">Gestão de Pessoas</h3>
        <p className="text-sm text-gray-500 mb-4">Cadastre Autoridades e Convidados Civis/Militares.</p>
        <button className="text-blue-600 font-semibold hover:underline">Abrir Cadastro →</button>
      </div>
      <div className="bg-white p-6 rounded shadow border-l-4 border-green-600">
        <h3 className="font-bold text-lg">Locais e Estrutura</h3>
        <p className="text-sm text-gray-500 mb-4">Gerencie auditórios, cais e salões.</p>
        <button className="text-green-600 font-semibold hover:underline">Configurar Locais →</button>
      </div>
      <div className="bg-white p-6 rounded shadow border-l-4 border-yellow-600">
        <h3 className="font-bold text-lg">Uniformes</h3>
        <p className="text-sm text-gray-500 mb-4">Tabela de uniformes por categoria.</p>
        <button className="text-yellow-600 font-semibold hover:underline">Gerenciar Lista →</button>
      </div>
    </div>
  );
}
