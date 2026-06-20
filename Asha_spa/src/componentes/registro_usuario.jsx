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

const RegistroUsuario = ({ onRegistro }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    contraseña: '',
    confirmarContraseña: ''
  });

  const [errores, setErrores] = useState({});

  const validar = () => {
    const nuevosErrores = {};
    if (!formData.nombre) nuevosErrores.nombre = 'El nombre es requerido';
    if (!formData.email) nuevosErrores.email = 'El email es requerido';
    if (formData.contraseña !== formData.confirmarContraseña) {
      nuevosErrores.contraseña = 'Las contraseñas no coinciden';
    }
    if (formData.contraseña.length < 6) {
      nuevosErrores.contraseña = 'La contraseña debe tener al menos 6 caracteres';
    }
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const manejarEnvio = (e) => {
    e.preventDefault();
    if (validar()) {
      onRegistro(formData);
      setFormData({ nombre: '', email: '', telefono: '', contraseña: '', confirmarContraseña: '' });
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-lg p-8">
      <div className="flex items-center justify-center mb-6">
        <User className="w-8 h-8 text-blue-600 mr-2" />
        <h2 className="text-2xl font-bold text-gray-800">Registro de Usuario</h2>
      </div>
      
      <form onSubmit={manejarEnvio} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nombre Completo</label>
          <input
            type="text"
            placeholder="Juan Pérez"
            value={formData.nombre}
            onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errores.nombre && <p className="text-red-500 text-sm mt-1">{errores.nombre}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            placeholder="juan@ejemplo.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errores.email && <p className="text-red-500 text-sm mt-1">{errores.email}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
          <input
            type="tel"
            placeholder="+57 300 123 4567"
            value={formData.telefono}
            onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
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

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Confirmar Contraseña</label>
          <input
            type="password"
            placeholder="••••••••"
            value={formData.confirmarContraseña}
            onChange={(e) => setFormData({ ...formData, confirmarContraseña: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errores.contraseña && <p className="text-red-500 text-sm mt-1">{errores.contraseña}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition duration-200"
        >
          Registrarse
        </button>
      </form>
    </div>
  );
};