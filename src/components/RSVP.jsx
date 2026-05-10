export default function RSVP() {
  const [confirmado, setConfirmado] = useState(null);

  return (
    <div className="max-w-xl mx-auto mt-20 p-8 bg-white shadow-lg rounded-lg text-center">
      <h2 className="text-2xl font-bold text-[#002147] mb-4">Confirmação de Presença</h2>
      <p className="mb-8">Você foi convidado para: <strong>Passagem de Comando</strong></p>
      
      <div className="flex justify-center gap-4">
        <button 
          onClick={() => setConfirmado(true)}
          className={`px-8 py-3 rounded-lg font-bold ${confirmado === true ? 'bg-green-600 text-white' : 'bg-gray-200'}`}
        >
          Confirmar Presença
        </button>
        <button 
          onClick={() => setConfirmado(false)}
          className={`px-8 py-3 rounded-lg font-bold ${confirmado === false ? 'bg-red-600 text-white' : 'bg-gray-200'}`}
        >
          Não poderei ir
        </button>
      </div>
      {confirmado !== null && <p className="mt-6 text-green-700 font-medium text-lg">Resposta enviada com sucesso!</p>}
    </div>
  );
}
