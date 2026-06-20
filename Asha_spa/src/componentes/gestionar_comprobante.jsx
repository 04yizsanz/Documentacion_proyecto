const GestionarComprobante = ({ pagos = [], onDescargar, onEliminar }) => {
  const [filtro, setFiltro] = useState('todos');

  const pagosFiltrados = filtro === 'todos' ? pagos : pagos.filter(p => p.metodo === filtro);

  const generarComprobante = (pago, idx) => {
    const contenido = `
COMPROBANTE DE PAGO
================================
Cliente: ${pago.cliente}
Monto: $${pago.monto}
Método: ${pago.metodo}
Referencia: ${pago.referencia}
Fecha: ${pago.fecha}
Comprobante #${idx + 1001}
================================
    `;
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(contenido));
    element.setAttribute('download', `comprobante_${idx}.txt`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="w-full bg-white rounded-xl shadow-lg p-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Download className="w-6 h-6 text-orange-600 mr-2" />
          <h2 className="text-2xl font-bold text-gray-800">Gestionar Comprobantes</h2>
        </div>
      </div>

      <div className="mb-6 flex gap-2">
        <button
          onClick={() => setFiltro('todos')}
          className={`px-4 py-2 rounded-lg ${filtro === 'todos' ? 'bg-orange-600 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          Todos
        </button>
        {['efectivo', 'tarjeta', 'transferencia', 'daviplata'].map(metodo => (
          <button
            key={metodo}
            onClick={() => setFiltro(metodo)}
            className={`px-4 py-2 rounded-lg capitalize ${filtro === metodo ? 'bg-orange-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            {metodo}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Cliente</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Monto</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Método</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Fecha</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {pagosFiltrados.map((pago, idx) => (
              <tr key={idx} className="border-b hover:bg-gray-50">
                <td className="px-6 py-3 text-sm text-gray-800">{pago.cliente}</td>
                <td className="px-6 py-3 text-sm text-gray-800 font-medium">${pago.monto}</td>
                <td className="px-6 py-3 text-sm text-gray-800 capitalize">{pago.metodo}</td>
                <td className="px-6 py-3 text-sm text-gray-800">{pago.fecha}</td>
                <td className="px-6 py-3 text-sm flex gap-2">
                  <button
                    onClick={() => generarComprobante(pago, idx)}
                    className="text-green-600 hover:text-green-800 flex items-center gap-1"
                  >
                    <Download className="w-4 h-4" />
                    Descargar
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

      {pagosFiltrados.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <AlertCircle className="w-12 h-12 mx-auto mb-2 opacity-50" />
          <p>No hay comprobantes disponibles</p>
        </div>
      )}
    </div>
  );
};