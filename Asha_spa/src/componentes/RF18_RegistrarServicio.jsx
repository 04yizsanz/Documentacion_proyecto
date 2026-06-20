import { useState } from "react";

// RF-18 está listado como "Registrar Producto" igual que RF-09.
// Se interpreta como variante orientada a Servicios/Mantenimiento para diferenciar funcionalidades.

const categorias = ["Mantenimiento preventivo", "Reparación", "Instalación", "Soporte técnico", "Capacitación", "Consultoría", "Otro"];
const unidades = ["Por hora", "Por sesión", "Por visita", "Por mes", "Por proyecto"];
const responsables = ["Ana Torres", "Luis Pérez", "Carlos Herrera", "Sandra Gómez"];

export default function RF18_RegistrarServicio() {
  const [form, setForm] = useState({
    nombre: "", codigo: "", categoria: "", descripcion: "",
    precio: "", duracion: "", unidad: "", responsable: "",
    activo: true, garantia: "", materiales: "",
  });
  const [ok, setOk] = useState(false);
  const [servicios, setServicios] = useState([
    { id: 1, codigo: "SRV-001", nombre: "Mantenimiento preventivo PC", categoria: "Mantenimiento preventivo", precio: 100000, activo: true },
    { id: 2, codigo: "SRV-002", nombre: "Instalación de software",     categoria: "Instalación",              precio: 80000,  activo: true },
  ]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    setServicios(prev => [...prev, {
      id: prev.length + 1,
      codigo: form.codigo,
      nombre: form.nombre,
      categoria: form.categoria,
      precio: parseInt(form.precio) || 0,
      activo: form.activo,
    }]);
    setOk(true);
    setForm({ nombre:"",codigo:"",categoria:"",descripcion:"",precio:"",duracion:"",unidad:"",responsable:"",activo:true,garantia:"",materiales:"" });
    setTimeout(() => setOk(false), 3500);
  };

  const fmt = (n) => new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(n);

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <span className="text-xs font-semibold tracking-widest text-indigo-500 uppercase">RF-18</span>
          <h1 className="text-3xl font-bold text-slate-800 mt-1">Registrar Servicio</h1>
          <p className="text-slate-500 mt-1">Añade un nuevo servicio al catálogo del negocio.</p>
        </div>

        {ok && (
          <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-xl text-sm font-medium">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/></svg>
            Servicio registrado exitosamente.
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulario */}
          <form onSubmit={handleSubmit} className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm p-8 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Nombre del servicio <span className="text-red-400">*</span></label>
                <input name="nombre" value={form.nombre} onChange={handleChange} required
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                  placeholder="Ej. Mantenimiento preventivo" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Código <span className="text-red-400">*</span></label>
                <input name="codigo" value={form.codigo} onChange={handleChange} required
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                  placeholder="SRV-001" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Categoría <span className="text-red-400">*</span></label>
                <select name="categoria" value={form.categoria} onChange={handleChange} required
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition bg-white">
                  <option value="">Seleccionar...</option>
                  {categorias.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Responsable</label>
                <select name="responsable" value={form.responsable} onChange={handleChange}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition bg-white">
                  <option value="">Sin asignar</option>
                  {responsables.map(r => <option key={r}>{r}</option>)}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Precio <span className="text-red-400">*</span></label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-400 text-sm">$</span>
                  <input name="precio" type="number" min="0" value={form.precio} onChange={handleChange} required
                    className="w-full border border-slate-200 rounded-xl pl-7 pr-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                    placeholder="0" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Unidad de precio</label>
                <select name="unidad" value={form.unidad} onChange={handleChange}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition bg-white">
                  <option value="">Seleccionar...</option>
                  {unidades.map(u => <option key={u}>{u}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Duración estimada</label>
                <input name="duracion" value={form.duracion} onChange={handleChange}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                  placeholder="Ej. 2 horas" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Materiales incluidos</label>
              <input name="materiales" value={form.materiales} onChange={handleChange}
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                placeholder="Ej. Paño de limpieza, pasta térmica" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Garantía</label>
              <input name="garantia" value={form.garantia} onChange={handleChange}
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                placeholder="Ej. 30 días de garantía" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Descripción</label>
              <textarea name="descripcion" rows={3} value={form.descripcion} onChange={handleChange}
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition resize-none"
                placeholder="Descripción detallada del servicio..." />
            </div>

            <div className="flex items-center gap-3">
              <button type="button" onClick={() => setForm(f => ({ ...f, activo: !f.activo }))}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${form.activo ? "bg-indigo-600" : "bg-slate-300"}`}>
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${form.activo ? "translate-x-6" : "translate-x-1"}`} />
              </button>
              <span className="text-sm text-slate-600 font-medium">Servicio activo</span>
            </div>

            <div className="flex gap-3 pt-2">
              <button type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition">
                Registrar servicio
              </button>
            </div>
          </form>

          {/* Panel lateral - catálogo */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h2 className="text-sm font-bold text-slate-700 mb-4">Catálogo actual</h2>
            <div className="space-y-3">
              {servicios.map(s => (
                <div key={s.id} className="border border-slate-100 rounded-xl p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-semibold text-slate-800 leading-tight">{s.nombre}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{s.codigo}</p>
                    </div>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-lg shrink-0 ${s.activo ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>
                      {s.activo ? "Activo" : "Inactivo"}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-xs text-slate-500">{s.categoria}</span>
                    <span className="text-sm font-bold text-indigo-600">{fmt(s.precio)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
