const CrearServicio = ({ onCrear }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    duracion: '',
    categoria: ''
  });

  const manejarEnvio = (e) => {
    e.preventDefault();
    onCrear(formData);
    setFormData({ nombre: '', descripcion: '', precio: '', duracion: '', categoria: '' });
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-lg p-8">
      <div className="flex items-center mb-6">
        <Plus className="w-6 h-6 text-purple-600 mr-2" />
        <h2 className="text-2xl font-bold text-gray-800">Crear Servicio</h2>
      </div>

      <form onSubmit={manejarEnvio} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del Servicio</label>
          <input
            type="text"
            placeholder="Corte de cabello premium"
            value={formData.nombre}
            onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
          <textarea
            placeholder="Describe el servicio..."
            value={formData.descripcion}
            onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 h-24"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Precio ($)</label>
          <input
            type="number"
            placeholder="50000"
            value={formData.precio}
            onChange={(e) => setFormData({ ...formData, precio: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Duración (minutos)</label>
          <input
            type="number"
            placeholder="30"
            value={formData.duracion}
            onChange={(e) => setFormData({ ...formData, duracion: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
          <select
            value={formData.categoria}
            onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="">Selecciona una categoría</option>
            <option value="cabello">Cabello</option>
            <option value="uñas">Uñas</option>
            <option value="faciales">Faciales</option>
            <option value="corporales">Corporales</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded-lg font-medium hover:bg-purple-700 transition duration-200"
        >
          Crear Servicio
        </button>
      </form>
    </div>
  );
};