# Sistema de Gestión SENA - Componentes React

## 📋 Descripción

Este es un conjunto completo de componentes React para un sistema de gestión integral que incluye:

- **RF-01**: Registro de Usuario
- **RF-02**: Inicio de Sesión
- **RF-03**: Agendar Cita
- **RF-04**: Gestión de Citas
- **RF-05**: Crear Servicio
- **RF-06**: Gestionar Servicios
- **RF-07**: Registrar Pago
- **RF-08**: Gestionar Comprobante
- **RF-09**: Registrar Producto
- **RF-19**: Registrar Campaña de Marketing
- **RF-20**: Consultar Campañas
- **RF-21**: Generar Predicciones con IA
- **RF-22**: Visualización AR de Estilos

## 🚀 Requisitos Previos

- Node.js 14+ instalado
- npm o yarn como gestor de paquetes
- React 18+ (recomendado)

## 📦 Instalación

### 1. Crear un proyecto React (si no tienes uno)

```bash
npx create-react-app mi-proyecto
cd mi-proyecto
```

### 2. Instalar dependencias necesarias

```bash
npm install lucide-react
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### 3. Configurar Tailwind CSS

Edita el archivo `tailwind.config.js`:

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### 4. Importar estilos de Tailwind

En tu archivo `src/index.css`, asegúrate de tener:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 5. Copiar el componente

Copia el archivo `ComponentesSENAGestion.jsx` a la carpeta `src` de tu proyecto.

## 🎯 Uso

### Opción 1: Usar el componente principal completo

En tu archivo `App.jsx`:

```jsx
import GestionSystem from './ComponentesSENAGestion';

function App() {
  return <GestionSystem />;
}

export default App;
```

### Opción 2: Usar componentes individuales

Puedes importar y usar componentes específicos:

```jsx
import {
  RegistroUsuario,
  AgendarCita,
  GestionCitas,
  CrearServicio,
  RegistrarPago
} from './ComponentesSENAGestion';

function MiPagina() {
  const [citas, setCitas] = useState([]);

  return (
    <div>
      <AgendarCita onAgendar={(data) => setCitas([...citas, data])} />
      <GestionCitas citas={citas} />
    </div>
  );
}
```

## 🎨 Personalización

### Cambiar colores

Los componentes usan colores de Tailwind CSS. Para cambiar el esquema de colores, puedes:

1. Modificar los valores de color en `tailwind.config.js`
2. Buscar y reemplazar las clases de color en el componente (ej: `bg-blue-600` → `bg-indigo-600`)

### Cambiar fuentes

Edita el `tailwind.config.js`:

```javascript
theme: {
  extend: {
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
    }
  }
}
```

### Agregar más funcionalidades

Cada componente es modular. Puedes:

1. Copiar un componente existente
2. Modificar su estructura
3. Adaptarlo a tus necesidades

## 📱 Componentes Disponibles

### Autenticación
- `RegistroUsuario` - Formulario de registro con validación
- `InicioDeSesion` - Formulario de login

### Citas
- `AgendarCita` - Crear nuevas citas
- `GestionCitas` - Ver, editar y eliminar citas con filtros

### Servicios
- `CrearServicio` - Registrar nuevos servicios
- `GestionarServicios` - Vista de grid de servicios con búsqueda

### Pagos
- `RegistrarPago` - Registrar transacciones
- `GestionarComprobante` - Gestionar y descargar comprobantes

### Productos
- `RegistrarProducto` - Agregar productos al catálogo

### Marketing
- `RegistrarCampana` - Crear campañas de marketing
- `ConsultarCampanas` - Ver campañas activas e inactivas

### IA y AR
- `GenerarPredicciones` - Simular predicciones con IA
- `VisualizacionAR` - Demostración de visualización AR

## 🔧 Gestión de Estado

El componente principal (`GestionSystem`) gestiona el estado con `useState`. Para proyectos más grandes, considera usar:

- **Context API**: Para estado global simple
- **Redux**: Para estado complejo
- **Zustand**: Para estado ligero y escalable

Ejemplo con Context:

```jsx
import { createContext, useState } from 'react';

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [citas, setCitas] = useState([]);
  const [servicios, setServicios] = useState([]);
  
  return (
    <AppContext.Provider value={{ citas, setCitas, servicios, setServicios }}>
      {children}
    </AppContext.Provider>
  );
}
```

## 🌐 Integración con Backend

Los componentes incluyen funciones `on*` (callbacks) para manejar acciones. Para conectar con un backend:

```jsx
const handleAgendar = async (data) => {
  try {
    const response = await fetch('https://tu-api.com/citas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const result = await response.json();
    setCitas([...citas, result]);
  } catch (error) {
    console.error('Error:', error);
  }
};

<AgendarCita onAgendar={handleAgendar} />
```

## 📊 Estructura de Datos

### Cita
```javascript
{
  cliente: string,
  servicio: string,
  fecha: string (YYYY-MM-DD),
  hora: string (HH:MM),
  profesional: string,
  estado: 'confirmada' | 'cancelada'
}
```

### Servicio
```javascript
{
  nombre: string,
  descripcion: string,
  precio: number,
  duracion: number (minutos),
  categoria: string
}
```

### Pago
```javascript
{
  cliente: string,
  monto: number,
  metodo: 'efectivo' | 'tarjeta' | 'transferencia' | 'daviplata',
  referencia: string,
  fecha: string (YYYY-MM-DD)
}
```

### Campaña
```javascript
{
  nombre: string,
  descripcion: string,
  fechaInicio: string (YYYY-MM-DD),
  fechaFin: string (YYYY-MM-DD),
  presupuesto: number,
  objetivo: string,
  canales: string[]
}
```

## 🎓 Objetivos de Aprendizaje (SENA)

Este proyecto cubre:

- ✅ Componentes funcionales con Hooks
- ✅ Manejo de estado con `useState`
- ✅ Formularios controlados
- ✅ Validación de datos
- ✅ Renderizado condicional
- ✅ Mapeo de listas
- ✅ Eventos y callbacks
- ✅ Estilos con Tailwind CSS
- ✅ Iconografía con Lucide React
- ✅ Estructura de componentes reutilizables

## 🚨 Validaciones Implementadas

- Campos requeridos en formularios
- Validación de email
- Confirmación de contraseñas
- Rango de fechas
- Valores numéricos positivos
- Mensajes de error dinámicos

## 🎯 Próximas Mejoras

- [ ] Agregar persistencia con localStorage
- [ ] Integrar con una API real
- [ ] Agregar autenticación JWT
- [ ] Implementar paginación
- [ ] Agregar gráficos con Chart.js
- [ ] Mejorar respuesta móvil
- [ ] Agregar temas oscuro/claro
- [ ] Implementar búsqueda avanzada
- [ ] Agregar notificaciones tipo toast
- [ ] Integrar con servicios de terceros (pagos, mapas, etc)

## 📝 Notas

- Los datos se guardan en memoria (se pierden al recargar la página)
- Las "predicciones de IA" son simuladas
- La visualización AR es una demostración (requeriría THREE.js o similar para funcionalidad real)
- Los comprobantes se descargan como archivos de texto simples

## 🆘 Soporte

Para problemas comunes:

**Los estilos no se aplican**: Asegúrate de que Tailwind CSS esté correctamente instalado y configurado.

**Errores de módulos**: Verifica que todas las dependencias estén instaladas: `npm install lucide-react`

**Componentes no renderean**: Revisa la consola del navegador para errores específicos.

## 📄 Licencia

Este proyecto es educativo, desarrollado para el programa Análisis y Desarrollo de Software de SENA.

---

**Creado con ❤️ para el programa SENA**
**React + Tailwind CSS + Lucide Icons**
