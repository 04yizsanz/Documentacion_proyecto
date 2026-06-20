/**
 * EJEMPLOS DE USO DE COMPONENTES INDIVIDUALES
 * 
 * Este archivo contiene ejemplos de cómo usar los componentes
 * de forma individual en diferentes partes de tu aplicación
 */

import React, { useState } from 'react';
import {
  RegistroUsuario,
  InicioDeSesion,
  AgendarCita,
  GestionCitas,
  CrearServicio,
  GestionarServicios,
  RegistrarPago,
  GestionarComprobante,
  RegistrarProducto,
  RegistrarCampana,
  ConsultarCampanas,
  GenerarPredicciones,
  VisualizacionAR
} from './ComponentesSENAGestion';

// ============================================
// EJEMPLO 1: Página de Autenticación
// ============================================

export function PaginaAutenticacion() {
  const [usuarioLogueado, setUsuarioLogueado] = useState(null);

  const handleRegistro = (datosUsuario) => {
    console.log('Usuario registrado:', datosUsuario);
    setUsuarioLogueado(datosUsuario);
    // Aquí podrías enviar los datos a tu backend
    // fetch('/api/registro', { method: 'POST', body: JSON.stringify(datosUsuario) })
  };

  const handleInicio = (credenciales) => {
    console.log('Intento de login:', credenciales);
    setUsuarioLogueado({ email: credenciales.email });
    // Aquí podrías autenticar con tu backend
  };

  if (usuarioLogueado) {
    return (
      <div className="p-8 bg-green-50 rounded-lg">
        <h2 className="text-2xl font-bold text-green-800 mb-4">¡Bienvenido!</h2>
        <p className="text-green-700 mb-4">Has iniciado sesión como: {usuarioLogueado.email}</p>
        <button
          onClick={() => setUsuarioLogueado(null)}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
        >
          Cerrar Sesión
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-12">Sistema de Gestión</h1>
        <div className="grid md:grid-cols-2 gap-8">
          <RegistroUsuario onRegistro={handleRegistro} />
          <InicioDeSesion onInicio={handleInicio} />
        </div>
      </div>
    </div>
  );
}

// ============================================
// EJEMPLO 2: Página de Citas
// ============================================

export function PaginaCitas() {
  const [citas, setCitas] = useState([
    {
      cliente: 'María González',
      servicio: 'Corte Premium',
      fecha: '2024-02-15',
      hora: '10:30',
      profesional: 'Ana García',
      estado: 'confirmada'
    },
    {
      cliente: 'Carlos López',
      servicio: 'Coloración',
      fecha: '2024-02-15',
      hora: '14:00',
      profesional: 'María Rodríguez',
      estado: 'confirmada'
    }
  ]);

  const handleAgendar = (nuevaCita) => {
    setCitas([...citas, { ...nuevaCita, estado: 'confirmada' }]);
    alert('✅ Cita agendada exitosamente');
  };

  const handleEliminar = (indice) => {
    setCitas(citas.filter((_, i) => i !== indice));
    alert('❌ Cita eliminada');
  };

  const handleEditar = (indice) => {
    alert(`📝 Editar cita de ${citas[indice].cliente}`);
    // Aquí podrías abrir un modal de edición
  };

  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 gap-8">
        <AgendarCita onAgendar={handleAgendar} />
      </div>
      <GestionCitas
        citas={citas}
        onEliminar={handleEliminar}
        onEditar={handleEditar}
      />
    </div>
  );
}

// ============================================
// EJEMPLO 3: Página de Servicios
// ============================================

export function PaginaServicios() {
  const [servicios, setServicios] = useState([
    {
      nombre: 'Corte de Cabello',
      descripcion: 'Corte profesional con técnicas modernas',
      precio: '50000',
      duracion: '30',
      categoria: 'cabello'
    },
    {
      nombre: 'Coloración Total',
      descripcion: 'Cambio de color completo con productos premium',
      precio: '120000',
      duracion: '90',
      categoria: 'cabello'
    },
    {
      nombre: 'Manicura',
      descripcion: 'Manicura con diseño personalizado',
      precio: '35000',
      duracion: '45',
      categoria: 'uñas'
    }
  ]);

  const handleCrear = (nuevoServicio) => {
    setServicios([...servicios, nuevoServicio]);
    alert('✅ Servicio creado exitosamente');
  };

  const handleEliminar = (indice) => {
    const nombre = servicios[indice].nombre;
    setServicios(servicios.filter((_, i) => i !== indice));
    alert(`❌ ${nombre} eliminado`);
  };

  const handleEditar = (indice) => {
    alert(`📝 Editar: ${servicios[indice].nombre}`);
  };

  return (
    <div className="space-y-8">
      <CrearServicio onCrear={handleCrear} />
      <GestionarServicios
        servicios={servicios}
        onEliminar={handleEliminar}
        onEditar={handleEditar}
      />
    </div>
  );
}

// ============================================
// EJEMPLO 4: Página de Pagos
// ============================================

export function PaginaPagos() {
  const [pagos, setPagos] = useState([
    {
      cliente: 'María González',
      monto: '50000',
      metodo: 'tarjeta',
      referencia: 'TRX001234',
      fecha: '2024-02-10'
    },
    {
      cliente: 'Carlos López',
      monto: '120000',
      metodo: 'transferencia',
      referencia: 'REF5678',
      fecha: '2024-02-10'
    }
  ]);

  const handleRegistrar = (nuevoPago) => {
    setPagos([...pagos, nuevoPago]);
    alert('✅ Pago registrado exitosamente');
  };

  const handleEliminar = (indice) => {
    setPagos(pagos.filter((_, i) => i !== indice));
    alert('❌ Pago eliminado');
  };

  return (
    <div className="space-y-8">
      <RegistrarPago onRegistrar={handleRegistrar} />
      <GestionarComprobante
        pagos={pagos}
        onDescargar={(idx) => console.log('Descargando:', idx)}
        onEliminar={handleEliminar}
      />
    </div>
  );
}

// ============================================
// EJEMPLO 5: Dashboard de Marketing
// ============================================

export function DashboardMarketing() {
  const [campanas, setCampanas] = useState([
    {
      nombre: 'Oferta San Valentín',
      descripcion: 'Descuentos especiales para parejas',
      fechaInicio: '2024-02-10',
      fechaFin: '2024-02-14',
      presupuesto: '5000000',
      objetivo: 'conversiones',
      canales: ['redes sociales', 'whatsapp']
    },
    {
      nombre: 'Promoción de Primavera',
      descripcion: 'Nuevos servicios y estilos para la estación',
      fechaInicio: '2024-03-01',
      fechaFin: '2024-03-31',
      presupuesto: '3000000',
      objetivo: 'awareness',
      canales: ['email', 'publicidad digital']
    }
  ]);

  const handleRegistrar = (nuevaCampana) => {
    setCampanas([...campanas, nuevaCampana]);
    alert('✅ Campaña registrada exitosamente');
  };

  return (
    <div className="space-y-8">
      <RegistrarCampana onRegistrar={handleRegistrar} />
      <ConsultarCampanas campanas={campanas} />
    </div>
  );
}

// ============================================
// EJEMPLO 6: Panel de IA y AR
// ============================================

export function PanelIAyAR() {
  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Herramientas de IA y Realidad Aumentada</h2>
        <p className="text-gray-600 mb-6">
          Usa nuestras herramientas avanzadas para predecir tendencias y visualizar estilos en realidad aumentada.
        </p>
      </div>
      
      <GenerarPredicciones />
      <VisualizacionAR />
    </div>
  );
}

// ============================================
// EJEMPLO 7: Página Combinada - Sistema Completo
// ============================================

export function SistemaCompleto() {
  const [seccion, setSeccion] = useState('citas');
  const [citas, setCitas] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [pagos, setPagos] = useState([]);
  const [campanas, setCampanas] = useState([]);

  const tabs = [
    { id: 'citas', label: '📅 Citas', icon: 'calendar' },
    { id: 'servicios', label: '💼 Servicios', icon: 'briefcase' },
    { id: 'pagos', label: '💳 Pagos', icon: 'credit-card' },
    { id: 'marketing', label: '📢 Marketing', icon: 'megaphone' },
    { id: 'ia', label: '🤖 IA & AR', icon: 'brain' }
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
        <h1 className="text-3xl font-bold">Sistema de Gestión Integrado</h1>
        <p className="text-blue-100">Gestiona todos los aspectos de tu negocio</p>
      </header>

      {/* Navegación */}
      <nav className="bg-gray-800 p-4 flex gap-4 overflow-x-auto">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setSeccion(tab.id)}
            className={`px-6 py-2 rounded-lg font-medium whitespace-nowrap transition ${
              seccion === tab.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {/* Contenido */}
      <main className="max-w-7xl mx-auto p-8">
        {seccion === 'citas' && <PaginaCitas />}
        {seccion === 'servicios' && <PaginaServicios />}
        {seccion === 'pagos' && <PaginaPagos />}
        {seccion === 'marketing' && <DashboardMarketing />}
        {seccion === 'ia' && <PanelIAyAR />}
      </main>
    </div>
  );
}

// ============================================
// EJEMPLO 8: Hook personalizado para gestión de datos
// ============================================

/**
 * Hook reutilizable para gestionar CRUD de citas
 */
export function useCitas(inicial = []) {
  const [citas, setCitas] = useState(inicial);

  const agregar = (cita) => {
    setCitas([...citas, { ...cita, estado: 'confirmada' }]);
  };

  const eliminar = (indice) => {
    setCitas(citas.filter((_, i) => i !== indice));
  };

  const actualizar = (indice, datos) => {
    setCitas(citas.map((cita, i) => (i === indice ? { ...cita, ...datos } : cita)));
  };

  const obtener = (indice) => citas[indice];

  return { citas, agregar, eliminar, actualizar, obtener };
}

// Uso del hook:
// const misCitas = useCitas();
// misCitas.agregar({ cliente: 'Juan', ... });

// ============================================
// EJEMPLO 9: Integración con una API
// ============================================

export function PaginaCitasConAPI() {
  const [citas, setCitas] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  // Simulación de fetch desde un API
  const cargarCitas = async () => {
    setCargando(true);
    try {
      // const response = await fetch('https://tu-api.com/citas');
      // const datos = await response.json();
      // setCitas(datos);

      // Simulación:
      setTimeout(() => {
        setCitas([
          {
            cliente: 'Ana García',
            servicio: 'Corte',
            fecha: '2024-02-20',
            hora: '10:00',
            profesional: 'María',
            estado: 'confirmada'
          }
        ]);
        setCargando(false);
      }, 1000);
    } catch (err) {
      setError(err.message);
      setCargando(false);
    }
  };

  const agregarCita = async (nuevaCita) => {
    try {
      // const response = await fetch('https://tu-api.com/citas', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(nuevaCita)
      // });
      // const cita = await response.json();

      setCitas([...citas, { ...nuevaCita, estado: 'confirmada' }]);
      alert('✅ Cita guardada');
    } catch (err) {
      alert('❌ Error: ' + err.message);
    }
  };

  return (
    <div>
      {cargando && <p className="text-center p-4">Cargando...</p>}
      {error && <p className="text-red-600 p-4">{error}</p>}
      <AgendarCita onAgendar={agregarCita} />
      <GestionCitas citas={citas} onEliminar={(idx) => setCitas(citas.filter((_, i) => i !== idx))} />
    </div>
  );
}

// ============================================
// EXPORTACIÓN DE EJEMPLOS
// ============================================

export default SistemaCompleto;
