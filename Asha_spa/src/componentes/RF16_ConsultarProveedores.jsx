import { useState } from "react";

const proveedoresMock = [
  { id: 1, nit: "900-123-456", razonSocial: "Confecciones del Norte S.A.S", contacto: "Carlos Herrera", email: "ventas@confnorte.com", telefono: "310 555 1234", ciudad: "Medellín", categoria: "Ropa y calzado", activo: true },
  { id: 2, nit: "800-987-321", razonSocial: "Tecnología Empresarial Ltda",   contacto: "Sandra Gómez",  email: "sgomez@tecnemp.com",    telefono: "318 444 5678", ciudad: "Bogotá",   categoria: "Electrónica",   activo: true  },
  { id: 3, nit: "700-456-789", razonSocial: "Distribuidora Belleza Total",   contacto: "Lucía Ríos",    email: "lucia@bellezat.com",    telefono: "301 333 9012", ciudad: "Cali",     categoria: "Cosméticos",   activo: true  },
  { id: 4, nit: "901-321-654", razonSocial: "Ferretería Industrial Vargas",  contacto: "Jorge Vargas",  email: "jvargas@fervar.com",    telefono: "315 222 3456", ciudad: "Barranquilla", categoria: "Herramientas", activo: false },
  { id: 5, nit: "800-654-123", razonSocial: "Alimentos del Campo S.A",       contacto: "Marta Nieto",   email: "mnieto@alicampo.com",   telefono: "320 111 7890", ciudad: "Bucaramanga", categoria: "Alimentos",   activo: true  },
];

const catColors = {
  "Ropa y calzado": "bg-purple-50 text-purple-700",
  "Electrónica":    "bg-blue-50 text-blue-700",
  "Cosméticos":     "bg-pink-50 text-pink-700",
  "Herramientas":   "bg-orange-50 text-orange-700",
  "Alimentos":      "bg-green-50 text-green-700",
};

export default function RF16_ConsultarProveedores() {
  const [busqueda, setBusqueda] = useState("");
  const [filtroCategoria, setFiltroCategoria] = useState("Todas");
  const [filtroEstado, setFiltroEstado] = useState("Todos");
  const [seleccionado, setSeleccionado] = useState(null);

  const categorias = ["Todas", ...new Set(proveedoresMock.map(p => p.categoria))];

  const filtrados = proveedoresMock.filter(p => {
    const q = busqueda.toLowerCase();
    const matchQ = !q || p.razonSocial.toLowerCase().includes(q) || p.nit.includes(q) || p.contacto.toLowerCase().includes(q);
    const matchCat = filtroCategoria === "Todas" || p.categoria === filtroCategoria;
    const matchEst = filtroEstado === "Todos" || (filtroEstado === "Activo" ? p.activo : !p.activo);
    return matchQ && matchCat && matchEst;
  });

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="flex items-start justify-between">
          <div>
            <span className="text-xs font-semibold tracking-widest text-indigo-500 uppercase">RF-16</span>
            <h1 className="text-3xl font-bold text-slate-800 mt-1">Consultar Proveedores</h1>
            <p className="text-slate-500 mt-1">Directorio de proveedores activos e inactivos.</p>
          </div>
          <div className="bg-white border border-slate-100 rounded-2xl shadow-sm px-5 py-3 text-center">
            <p className="text-2xl font-bold text-indigo-600">{proveedoresMock.filter(p => p.activo).length}</p>
            <p className="text-xs text-slate-400">proveedores activos</p>
          </div>
        </div>

        {/* Filtros */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex flex-wrap gap-4 items-end">
          <div className="flex-1 min-w-[180px]">
            <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">Buscar</label>
            <input value={busqueda} onChange={e => setBusqueda(e.target.value)}
              className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              placeholder="Nombre, NIT, contacto..." />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">Categoría</label>
            <select value={filtroCategoria} onChange={e => setFiltroCategoria(e.target.value)}
              className="border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition bg-white">
              {categorias.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">Estado</label>
            <select value={filtroEstado} onChange={e => setFiltroEstado(e.target.value)}
              className="border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition bg-white">
              {["Todos", "Activo", "Inactivo"].map(e => <option key={e}>{e}</option>)}
            </select>
          </div>
        </div>

        {/* Lista */}
        <div className="grid gap-3">
          {filtrados.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-100 p-10 text-center text-slate-400">Sin resultados para los filtros aplicados.</div>
          ) : filtrados.map(p => (
            <div key={p.id} onClick={() => setSeleccionado(seleccionado?.id === p.id ? null : p)}
              className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 cursor-pointer hover:border-indigo-200 transition">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="font-bold text-slate-800">{p.razonSocial}</h3>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg ${catColors[p.categoria] || "bg-slate-100 text-slate-600"}`}>{p.categoria}</span>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg ${p.activo ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>
                      {p.activo ? "Activo" : "Inactivo"}
                    </span>
                  </div>
                  <p className="text-sm text-slate-500 mt-1">NIT: {p.nit} · {p.ciudad}</p>
                </div>
                <svg className={`w-5 h-5 text-slate-300 transition-transform shrink-0 mt-1 ${seleccionado?.id === p.id ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>

              {/* Detalle expandido */}
              {seleccionado?.id === p.id && (
                <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-xs text-slate-400 font-semibold mb-0.5">Contacto</p>
                    <p className="text-slate-700">{p.contacto}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-semibold mb-0.5">Correo</p>
                    <a href={`mailto:${p.email}`} className="text-indigo-600 hover:underline">{p.email}</a>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-semibold mb-0.5">Teléfono</p>
                    <p className="text-slate-700">{p.telefono}</p>
                  </div>
                  <div className="md:col-span-3 flex gap-3 mt-2">
                    <button className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 border border-indigo-200 px-4 py-2 rounded-lg transition">Editar</button>
                    <button className={`text-xs font-semibold px-4 py-2 rounded-lg transition border ${p.activo ? "text-red-500 border-red-200 hover:bg-red-50" : "text-emerald-600 border-emerald-200 hover:bg-emerald-50"}`}>
                      {p.activo ? "Desactivar" : "Activar"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <p className="text-xs text-slate-400 text-center">{filtrados.length} de {proveedoresMock.length} proveedores</p>
      </div>
    </div>
  );
}
