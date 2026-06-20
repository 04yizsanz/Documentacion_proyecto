const GestionCitas = ({ citas = [], onEliminar, onEditar }) => {
  const [filtro, setFiltro] = useState('todas');

  const citasFiltradas = filtro === 'todas' ? citas : citas.filter(c => c.estado === filtro);

  return (
    <div className="w-full bg-white rounded-xl shadow-lg p-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Calendar className="w-6 h-6 text-blue-600 mr-2" />
          <h2 className="text-2xl font-bold text-gray-800">Gestión de Citas</h2>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setFiltro('todas')}
            className={`px-4 py-2 rounded-lg ${filtro === 'todas' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Todas
          </button>
          <button
            onClick={() => setFiltro('confirmada')}
            className={`px-4 py-2 rounded-lg ${filtro === 'confirmada' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Confirmadas
          </button>
          <button
            onClick={() => setFiltro('cancelada')}
            className={`px-4 py-2 rounded-lg ${filtro === 'cancelada' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Canceladas
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Cliente</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Servicio</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Fecha</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Hora</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Estado</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {citasFiltradas.map((cita, idx) => (
              <tr key={idx} className="border-b hover:bg-gray-50">
                <td className="px-6 py-3 text-sm text-gray-800">{cita.cliente}</td>
                <td className="px-6 py-3 text-sm text-gray-800">{cita.servicio}</td>
                <td className="px-6 py-3 text-sm text-gray-800">{cita.fecha}</td>
                <td className="px-6 py-3 text-sm text-gray-800">{cita.hora}</td>
                <td className="px-6 py-3 text-sm">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${cita.estado === 'confirmada' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {cita.estado}
                  </span>
                </td>
                <td className="px-6 py-3 text-sm flex gap-2">
                  <button
                    onClick={() => onEditar(idx)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onEliminar(idx)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {citasFiltradas.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <Clock className="w-12 h-12 mx-auto mb-2 opacity-50" />
          <p>No hay citas {filtro !== 'todas' ? 'con este estado' : ''}</p>
        </div>
      )}
    </div>
  );
};