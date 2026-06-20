import React, { useState } from 'react';
import {
  Calendar,
  User,
  Lock,
  LogIn,
  Plus,
  Edit2,
  Trash2,
  DollarSign,
  Package,
  Zap,
  TrendingUp,
  Eye,
  Settings,
  Bell,
  LogOut,
  ChevronRight,
  Search,
  Filter,
  Download,
  AlertCircle,
  CheckCircle,
  Clock,
  Users,
  Sparkles
} from 'lucide-react';

// ============== COMPONENTES DE AUTENTICACIÓN ==============

const InicioDeSesion = ({ onInicio }) => {
  const [formData, setFormData] = useState({ email: '', contraseña: '' });

  const manejarEnvio = (e) => {
    e.preventDefault();
    onInicio(formData);
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-lg p-8">
      <div className="flex items-center justify-center mb-6">
        <LogIn className="w-8 h-8 text-blue-600 mr-2" />
        <h2 className="text-2xl font-bold text-gray-800">Inicio de Sesión</h2>
      </div>

      <form onSubmit={manejarEnvio} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            placeholder="tu@email.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
          <input
            type="password"
            placeholder="••••••••"
            value={formData.contraseña}
            onChange={(e) => setFormData({ ...formData, contraseña: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition duration-200"
        >
          Ingresar
        </button>
      </form>

      <p className="text-center text-gray-600 text-sm mt-4">
        ¿Olvidaste tu contraseña? <a href="#" className="text-blue-600 hover:underline">Recuperar</a>
      </p>
    </div>
  );
};

// ============== COMPONENTES DE CITAS ==============

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

// ============== COMPONENTES DE SERVICIOS ==============

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

const GestionarServicios = ({ servicios = [], onEliminar, onEditar }) => {
  const [busqueda, setBusqueda] = useState('');

  const serviciosFiltrados = servicios.filter(s =>
    s.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="w-full bg-white rounded-xl shadow-lg p-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Settings className="w-6 h-6 text-purple-600 mr-2" />
          <h2 className="text-2xl font-bold text-gray-800">Gestionar Servicios</h2>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar servicio..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {serviciosFiltrados.map((servicio, idx) => (
          <div key={idx} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-bold text-gray-800">{servicio.nombre}</h3>
              <div className="flex gap-2">
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
              </div>
            </div>

            <p className="text-sm text-gray-600 mb-3">{servicio.descripcion}</p>

            <div className="space-y-2 text-sm">
              <p className="text-gray-700"><strong>Precio:</strong> ${servicio.precio}</p>
              <p className="text-gray-700"><strong>Duración:</strong> {servicio.duracion} min</p>
              <p className="text-gray-700"><strong>Categoría:</strong> {servicio.categoria}</p>
            </div>
          </div>
        ))}
      </div>

      {serviciosFiltrados.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <Package className="w-12 h-12 mx-auto mb-2 opacity-50" />
          <p>No se encontraron servicios</p>
        </div>
      )}
    </div>
  );
};

// ============== COMPONENTES DE PAGOS ==============

const RegistrarPago = ({ onRegistrar }) => {
  const [formData, setFormData] = useState({
    cliente: '',
    monto: '',
    metodo: '',
    referencia: '',
    fecha: new Date().toISOString().split('T')[0]
  });

  const manejarEnvio = (e) => {
    e.preventDefault();
    onRegistrar(formData);
    setFormData({
      cliente: '',
      monto: '',
      metodo: '',
      referencia: '',
      fecha: new Date().toISOString().split('T')[0]
    });
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-lg p-8">
      <div className="flex items-center mb-6">
        <DollarSign className="w-6 h-6 text-green-600 mr-2" />
        <h2 className="text-2xl font-bold text-gray-800">Registrar Pago</h2>
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
          <label className="block text-sm font-medium text-gray-700 mb-1">Monto ($)</label>
          <input
            type="number"
            placeholder="50000"
            value={formData.monto}
            onChange={(e) => setFormData({ ...formData, monto: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Método de Pago</label>
          <select
            value={formData.metodo}
            onChange={(e) => setFormData({ ...formData, metodo: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">Selecciona un método</option>
            <option value="efectivo">Efectivo</option>
            <option value="tarjeta">Tarjeta</option>
            <option value="transferencia">Transferencia</option>
            <option value="daviplata">Daviplata</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Referencia / Confirmación</label>
          <input
            type="text"
            placeholder="Código de transacción"
            value={formData.referencia}
            onChange={(e) => setFormData({ ...formData, referencia: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
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

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 transition duration-200"
        >
          Registrar Pago
        </button>
      </form>
    </div>
  );
};

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

// ============== COMPONENTES DE PRODUCTOS ==============
//voy aqui
const RegistrarProducto = ({ onRegistrar }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    stock: '',
    marca: '',
    categoria: ''
  });

  const manejarEnvio = (e) => {
    e.preventDefault();
    onRegistrar(formData);
    setFormData({
      nombre: '',
      descripcion: '',
      precio: '',
      stock: '',
      marca: '',
      categoria: ''
    });
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-lg p-8">
      <div className="flex items-center mb-6">
        <Package className="w-6 h-6 text-indigo-600 mr-2" />
        <h2 className="text-2xl font-bold text-gray-800">Registrar Producto</h2>
      </div>

      <form onSubmit={manejarEnvio} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del Producto</label>
          <input
            type="text"
            placeholder="Champú profesional"
            value={formData.nombre}
            onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
          <textarea
            placeholder="Describe el producto..."
            value={formData.descripcion}
            onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 h-20"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Precio ($)</label>
            <input
              type="number"
              placeholder="25000"
              value={formData.precio}
              onChange={(e) => setFormData({ ...formData, precio: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
            <input
              type="number"
              placeholder="50"
              value={formData.stock}
              onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Marca</label>
          <input
            type="text"
            placeholder="Nombre de la marca"
            value={formData.marca}
            onChange={(e) => setFormData({ ...formData, marca: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
          <select
            value={formData.categoria}
            onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Selecciona una categoría</option>
            <option value="shampoo">Shampoo</option>
            <option value="acondicionador">Acondicionador</option>
            <option value="tintes">Tintes</option>
            <option value="accesorios">Accesorios</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition duration-200"
        >
          Registrar Producto
        </button>
      </form>
    </div>
  );
};

// ============== COMPONENTES DE MARKETING ==============

const RegistrarCampana = ({ onRegistrar }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    fechaInicio: '',
    fechaFin: '',
    presupuesto: '',
    objetivo: '',
    canales: []
  });

  const manejarCanal = (canal) => {
    const nuevosCanales = formData.canales.includes(canal)
      ? formData.canales.filter(c => c !== canal)
      : [...formData.canales, canal];
    setFormData({ ...formData, canales: nuevosCanales });
  };

  const manejarEnvio = (e) => {
    e.preventDefault();
    onRegistrar(formData);
    setFormData({
      nombre: '',
      descripcion: '',
      fechaInicio: '',
      fechaFin: '',
      presupuesto: '',
      objetivo: '',
      canales: []
    });
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-lg p-8">
      <div className="flex items-center mb-6">
        <TrendingUp className="w-6 h-6 text-pink-600 mr-2" />
        <h2 className="text-2xl font-bold text-gray-800">Registrar Campaña</h2>
      </div>

      <form onSubmit={manejarEnvio} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nombre de la Campaña</label>
          <input
            type="text"
            placeholder="Verano 2024"
            value={formData.nombre}
            onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
          <textarea
            placeholder="Describe la campaña..."
            value={formData.descripcion}
            onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 h-20"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Fecha Inicio</label>
            <input
              type="date"
              value={formData.fechaInicio}
              onChange={(e) => setFormData({ ...formData, fechaInicio: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Fecha Fin</label>
            <input
              type="date"
              value={formData.fechaFin}
              onChange={(e) => setFormData({ ...formData, fechaFin: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Presupuesto ($)</label>
          <input
            type="number"
            placeholder="1000000"
            value={formData.presupuesto}
            onChange={(e) => setFormData({ ...formData, presupuesto: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Objetivo</label>
          <select
            value={formData.objetivo}
            onChange={(e) => setFormData({ ...formData, objetivo: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
          >
            <option value="">Selecciona un objetivo</option>
            <option value="awareness">Conciencia de marca</option>
            <option value="trafico">Tráfico web</option>
            <option value="conversiones">Conversiones</option>
            <option value="retension">Retención de clientes</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Canales</label>
          <div className="space-y-2">
            {['redes sociales', 'email', 'whatsapp', 'publicidad digital'].map(canal => (
              <label key={canal} className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.canales.includes(canal)}
                  onChange={() => manejarCanal(canal)}
                  className="w-4 h-4 text-pink-600 rounded"
                />
                <span className="ml-2 text-sm text-gray-700 capitalize">{canal}</span>
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-pink-600 text-white py-2 rounded-lg font-medium hover:bg-pink-700 transition duration-200"
        >
          Registrar Campaña
        </button>
      </form>
    </div>
  );
};

const ConsultarCampanas = ({ campanas = [] }) => {
  const [filtro, setFiltro] = useState('activa');

  const ahora = new Date().toISOString().split('T')[0];
  const campanasFiltradas = filtro === 'activa'
    ? campanas.filter(c => c.fechaInicio <= ahora && c.fechaFin >= ahora)
    : campanas;

  return (
    <div className="w-full bg-white rounded-xl shadow-lg p-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Bell className="w-6 h-6 text-pink-600 mr-2" />
          <h2 className="text-2xl font-bold text-gray-800">Campañas de Marketing</h2>
        </div>
        <select
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
        >
          <option value="activa">Activas</option>
          <option value="todas">Todas</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {campanasFiltradas.map((campana, idx) => {
          const estado = new Date(campana.fechaInicio) <= new Date(ahora) && new Date(campana.fechaFin) >= new Date(ahora) ? 'activa' : 'inactiva';
          return (
            <div key={idx} className="border border-pink-200 rounded-lg p-6 bg-gradient-to-br from-pink-50 to-white">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-bold text-gray-800">{campana.nombre}</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${estado === 'activa' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                  {estado}
                </span>
              </div>

              <p className="text-sm text-gray-600 mb-4">{campana.descripcion}</p>

              <div className="space-y-2 text-sm mb-4">
                <p className="text-gray-700"><strong>Período:</strong> {campana.fechaInicio} - {campana.fechaFin}</p>
                <p className="text-gray-700"><strong>Presupuesto:</strong> ${campana.presupuesto}</p>
                <p className="text-gray-700"><strong>Objetivo:</strong> {campana.objetivo}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                {campana.canales.map(canal => (
                  <span key={canal} className="bg-pink-200 text-pink-800 px-3 py-1 rounded-full text-xs capitalize">
                    {canal}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {campanasFiltradas.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <TrendingUp className="w-12 h-12 mx-auto mb-2 opacity-50" />
          <p>No hay campañas {filtro === 'activa' ? 'activas' : ''}</p>
        </div>
      )}
    </div>
  );
};

// ============== COMPONENTES DE IA Y AR ==============

const GenerarPredicciones = () => {
  const [datos, setDatos] = useState({
    periodicidad: 'mensual',
    metrica: 'ingresos'
  });

  const [prediccion, setPrediccion] = useState(null);

  const generarPrediccion = (e) => {
    e.preventDefault();
    // Simulación de predicción con IA
    const predicciones = {
      ingresos: ['$1.2M', '$1.4M', '$1.6M'],
      clientes: [150, 180, 210],
      citas: [450, 520, 600]
    };

    setPrediccion({
      metrica: datos.metrica,
      periodicidad: datos.periodicidad,
      predicciones: predicciones[datos.metrica],
      confianza: 87
    });
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-lg p-8">
      <div className="flex items-center mb-6">
        <Sparkles className="w-6 h-6 text-yellow-600 mr-2" />
        <h2 className="text-2xl font-bold text-gray-800">Predicciones con IA</h2>
      </div>

      <form onSubmit={generarPrediccion} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Métrica a Predecir</label>
          <select
            value={datos.metrica}
            onChange={(e) => setDatos({ ...datos, metrica: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            <option value="ingresos">Ingresos</option>
            <option value="clientes">Nuevos clientes</option>
            <option value="citas">Citas agendadas</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Periodicidad</label>
          <select
            value={datos.periodicidad}
            onChange={(e) => setDatos({ ...datos, periodicidad: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            <option value="semanal">Semanal</option>
            <option value="mensual">Mensual</option>
            <option value="trimestral">Trimestral</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-yellow-600 text-white py-2 rounded-lg font-medium hover:bg-yellow-700 transition duration-200"
        >
          Generar Predicción
        </button>
      </form>

      {prediccion && (
        <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <div className="flex items-center mb-3">
            <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
            <h3 className="font-bold text-gray-800">Predicción Generada</h3>
          </div>

          <div className="space-y-2 text-sm">
            <p className="text-gray-700"><strong>Métrica:</strong> {prediccion.metrica}</p>
            <p className="text-gray-700"><strong>Periodicidad:</strong> {prediccion.periodicidad}</p>
            <p className="text-gray-700"><strong>Confianza:</strong> {prediccion.confianza}%</p>

            <div className="mt-3">
              <p className="font-medium text-gray-800 mb-2">Próximos 3 períodos:</p>
              <div className="space-y-1">
                {prediccion.predicciones.map((pred, idx) => (
                  <p key={idx} className="text-gray-700">
                    Período {idx + 1}: <strong>{pred}</strong>
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const VisualizacionAR = () => {
  const [estilo, setEstilo] = useState('moderno');

  const estilos = {
    moderno: { descripcion: 'Corte moderno con líneas limpias', color: 'bg-blue-100', icon: '✨' },
    clasico: { descripcion: 'Estilo clásico y tradicional', color: 'bg-amber-100', icon: '👔' },
    rock: { descripcion: 'Estilo rock con volumen', color: 'bg-red-100', icon: '🎸' },
    retro: { descripcion: 'Estilo retro de los 70s', color: 'bg-yellow-100', icon: '🕺' },
    minimalista: { descripcion: 'Corte minimalista y limpio', color: 'bg-gray-100', icon: '⚫' }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
      <div className="flex items-center mb-6">
        <Eye className="w-6 h-6 text-cyan-600 mr-2" />
        <h2 className="text-2xl font-bold text-gray-800">Visualización AR de Estilos</h2>
      </div>

      <p className="text-gray-600 mb-6">Explora diferentes estilos de peinado en realidad aumentada</p>

      <div className={`${estilos[estilo].color} rounded-lg p-12 text-center mb-6 transition-colors`}>
        <div className="text-6xl mb-4">{estilos[estilo].icon}</div>
        <p className="text-2xl font-bold text-gray-800 mb-2">{estilo.charAt(0).toUpperCase() + estilo.slice(1)}</p>
        <p className="text-gray-700">{estilos[estilo].descripcion}</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
        {Object.keys(estilos).map(s => (
          <button
            key={s}
            onClick={() => setEstilo(s)}
            className={`px-4 py-2 rounded-lg font-medium capitalize transition ${
              estilo === s
                ? 'bg-cyan-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-4">
        <div className="flex items-start">
          <AlertCircle className="w-5 h-5 text-cyan-600 mr-3 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-cyan-800">
            <p className="font-medium">Nota:</p>
            <p>Esta es una demostración de visualización. En una aplicación real, se utilizaría tecnología AR para superponer los estilos sobre la imagen del usuario en tiempo real.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============== COMPONENTE PRINCIPAL ==============

export default function GestionSystem() {
  const [seccionActiva, setSeccionActiva] = useState('inicio');
  const [usuario, setUsuario] = useState(null);

  // Estados para datos
  const [citas, setCitas] = useState([
    { cliente: 'Ana García', servicio: 'Corte', fecha: '2024-01-15', hora: '10:00', estado: 'confirmada' }
  ]);
  const [servicios, setServicios] = useState([
    { nombre: 'Corte de cabello', descripcion: 'Corte profesional', precio: '50000', duracion: '30', categoria: 'cabello' }
  ]);
  const [pagos, setPagos] = useState([
    { cliente: 'Ana García', monto: '50000', metodo: 'tarjeta', referencia: 'ABC123', fecha: '2024-01-15' }
  ]);
  const [campanas, setCampanas] = useState([
    {
      nombre: 'Descuento Navidad',
      descripcion: 'Oferta especial de fin de año',
      fechaInicio: '2024-12-01',
      fechaFin: '2024-12-31',
      presupuesto: '2000000',
      objetivo: 'conversiones',
      canales: ['redes sociales', 'email']
    }
  ]);

  const menuPrincipal = [
    { id: 'inicio', label: '🏠 Inicio' },
    { id: 'auth', label: '🔐 Autenticación' },
    { id: 'citas', label: '📅 Citas' },
    { id: 'servicios', label: '💼 Servicios' },
    { id: 'pagos', label: '💳 Pagos' },
    { id: 'productos', label: '📦 Productos' },
    { id: 'marketing', label: '📢 Marketing' },
    { id: 'ia', label: '🤖 IA & AR' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold">Sistema de Gestión SENA</h1>
          <p className="text-blue-100 mt-1">Programa Análisis y Desarrollo de Software</p>
        </div>
      </header>

      {/* Navegación */}
      <nav className="bg-gray-800 border-b border-gray-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex overflow-x-auto space-x-1 py-4">
            {menuPrincipal.map(item => (
              <button
                key={item.id}
                onClick={() => setSeccionActiva(item.id)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap font-medium transition ${
                  seccionActiva === item.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Contenido Principal */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {seccionActiva === 'inicio' && (
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Bienvenido al Sistema</h2>
              <p className="text-gray-600 mb-4">
                Este es un sistema completo de gestión para servicios de salón y estética, desarrollado con React y Tailwind CSS.
              </p>
              <div className="space-y-3">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                  <span className="text-gray-700">Gestión de citas y agendamiento</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                  <span className="text-gray-700">Control de servicios y productos</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                  <span className="text-gray-700">Gestión de pagos y comprobantes</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                  <span className="text-gray-700">Campañas de marketing integradas</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                  <span className="text-gray-700">Predicciones con IA y visualización AR</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Estadísticas Rápidas</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b pb-3">
                  <span className="text-gray-600">Citas Agendadas</span>
                  <span className="text-2xl font-bold text-blue-600">{citas.length}</span>
                </div>
                <div className="flex justify-between items-center border-b pb-3">
                  <span className="text-gray-600">Servicios Disponibles</span>
                  <span className="text-2xl font-bold text-green-600">{servicios.length}</span>
                </div>
                <div className="flex justify-between items-center border-b pb-3">
                  <span className="text-gray-600">Pagos Registrados</span>
                  <span className="text-2xl font-bold text-orange-600">${pagos.reduce((sum, p) => sum + parseInt(p.monto), 0)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Campañas Activas</span>
                  <span className="text-2xl font-bold text-pink-600">{campanas.length}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {seccionActiva === 'auth' && (
          <div className="grid md:grid-cols-2 gap-8">
            <RegistroUsuario onRegistro={(data) => {
              setUsuario(data);
              alert('Registro exitoso: ' + data.nombre);
            }} />
            <InicioDeSesion onInicio={(data) => alert('Bienvenido: ' + data.email)} />
          </div>
        )}

        {seccionActiva === 'citas' && (
          <div className="space-y-8">
            <AgendarCita onAgendar={(data) => {
              setCitas([...citas, { ...data, estado: 'confirmada' }]);
              alert('Cita agendada exitosamente');
            }} />
            <GestionCitas
              citas={citas}
              onEliminar={(idx) => setCitas(citas.filter((_, i) => i !== idx))}
              onEditar={(idx) => alert('Editar cita: ' + citas[idx].cliente)}
            />
          </div>
        )}

        {seccionActiva === 'servicios' && (
          <div className="space-y-8">
            <CrearServicio onCrear={(data) => {
              setServicios([...servicios, data]);
              alert('Servicio creado exitosamente');
            }} />
            <GestionarServicios
              servicios={servicios}
              onEliminar={(idx) => setServicios(servicios.filter((_, i) => i !== idx))}
              onEditar={(idx) => alert('Editar servicio: ' + servicios[idx].nombre)}
            />
          </div>
        )}

        {seccionActiva === 'pagos' && (
          <div className="space-y-8">
            <RegistrarPago onRegistrar={(data) => {
              setPagos([...pagos, data]);
              alert('Pago registrado exitosamente');
            }} />
            <GestionarComprobante
              pagos={pagos}
              onDescargar={(idx) => alert('Descargando comprobante...')}
              onEliminar={(idx) => setPagos(pagos.filter((_, i) => i !== idx))}
            />
          </div>
        )}

        {seccionActiva === 'productos' && (
          <RegistrarProducto onRegistrar={(data) => {
            alert('Producto registrado: ' + data.nombre);
          }} />
        )}

        {seccionActiva === 'marketing' && (
          <div className="space-y-8">
            <RegistrarCampana onRegistrar={(data) => {
              setCampanas([...campanas, data]);
              alert('Campaña registrada exitosamente');
            }} />
            <ConsultarCampanas campanas={campanas} />
          </div>
        )}

        {seccionActiva === 'ia' && (
          <div className="space-y-8">
            <GenerarPredicciones />
            <VisualizacionAR />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-400 text-center py-6 mt-12 border-t border-gray-700">
        <p>© 2024 Sistema de Gestión SENA | Análisis y Desarrollo de Software</p>
        <p className="text-sm mt-2">Componentes creados con React, Tailwind CSS y Lucide Icons</p>
      </footer>
    </div>
  );
}