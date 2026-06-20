const AgendarCita = ({ onAgendar }) => {
  const [formData, setFormData] = useState({
    cliente: '',
    servicio: '',
    fecha: '',
    hora: '',
    profesional: ''
  });

  const manejarEnvio = (e) => {
    e.preventDefault();
    onAgendar(formData);
    setFormData({ cliente: '', servicio: '', fecha: '', hora: '', profesional: '' });
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-lg p-8">
      <div className="flex items-center mb-6">
        <Calendar className="w-6 h-6 text-green-600 mr-2" />
        <h2 className="text-2xl font-bold text-gray-800">Agendar Cita</h2>
      </div>

      <form onSubmit={manejarEnvio} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Cliente</label>
          <input
            type="text"
            placeholder="Nombre del cliente"
            value={formData.cliente}
            onChange={(e) => setFormData({ ...formData, cliente: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Servicio</label>
          <select
            value={formData.servicio}
            onChange={(e) => setFormData({ ...formData, servicio: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">Selecciona un servicio</option>
            <option value="corte">Corte de cabello</option>
            <option value="color">Coloración</option>
            <option value="peinado">Peinado</option>
            <option value="manicura">Manicura</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Fecha</label>
          <input
            type="date"
            value={formData.fecha}
            onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Hora</label>
          <input
            type="time"
            value={formData.hora}
            onChange={(e) => setFormData({ ...formData, hora: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Profesional</label>
          <select
            value={formData.profesional}
            onChange={(e) => setFormData({ ...formData, profesional: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">Selecciona un profesional</option>
            <option value="maria">María García</option>
            <option value="carlos">Carlos López</option>
            <option value="ana">Ana Rodríguez</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 transition duration-200"
        >
          Agendar Cita
        </button>
      </form>
    </div>
  );
};