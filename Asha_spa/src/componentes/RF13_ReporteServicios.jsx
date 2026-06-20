import { useState } from "react";

const serviciosMock = [
  { servicio: "Mantenimiento preventivo", solicitudes: 48, ingresos: 4800000, satisfaccion: 4.8 },
  { servicio: "Instalación de software",  solicitudes: 35, ingresos: 2800000, satisfaccion: 4.5 },
  { servicio: "Soporte técnico remoto",   solicitudes: 62, ingresos: 3100000, satisfaccion: 4.6 },
  { servicio: "Reparación de hardware",   solicitudes: 27, ingresos: 5400000, satisfaccion: 4.3 },
  { servicio: "Configuración de redes",   solicitudes: 19, ingresos: 3800000, satisfaccion: 4.7 },
  { servicio: "Capacitación usuarios",    solicitudes: 14, ingresos: 2100000, satisfaccion: 4.9 },
];

const fmt = (n) => new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(n);

const Estrellas = ({ valor }) => (
  <div className="flex gap-0.5">
    {[1,2,3,4,5].map(i => (
      <svg key={i} className={`w-3.5 h-3.5 ${i <= Math.round(valor) ? "text-amber-400" : "text-slate-200"}`} fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
      </svg>
    ))}
    <span className="ml-1 text-xs text-slate-500">{valor.toFixed(1)}</span>
  </div>
);

export default function RF13_ReporteServicios() {
  const [periodo, setPeriodo] = useState("mes");
  const [orden, setOrden] = useState("solicitudes");

  const ordenados = [...serviciosMock].sort((a, b) => b[orden] - a[orden]);
  const maxSol = Math.max(...ordenados.map(s => s.solicitudes));
  const totalSol = ordenados.reduce((a, s) => a + s.solicitudes, 0);
  const totalIng = ordenados.reduce((a, s) => a + s.ingresos, 0);
  const promSat = (ordenados.reduce((a, s) => a + s.satisfaccion, 0) / ordenados.length).toFixed(1);

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <span className="text-xs font-semibold tracking-widest text-indigo-500 uppercase">RF-13</span>
          <h1 className="text-3xl font-bold text-slate-800 mt-1">Servicios Más Solicitados</h1>
          <p className="text-slate-500 mt-1">Análisis de demanda y satisfacción por servicio.</p>
        </div>

        {/* Controles */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex flex-wrap gap-4 items-center justify-between">
          <div className="flex gap-2">
            {["semana", "mes", "trimestre", "año"].map(p => (
              <button key={p} onClick={() => setPeriodo(p)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold capitalize transition ${periodo === p ? "bg-indigo-600 text-white" : "text-slate-500 hover:bg-slate-100"}`}>
                {p}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <span className="font-medium">Ordenar por:</span>
            <select value={orden} onChange={e => setOrden(e.target.value)}
              className="border border-slate-200 rounded-lg px-3 py-1.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white">
              <option value="solicitudes">Solicitudes</option>
              <option value="ingresos">Ingresos</option>
              <option value="satisfaccion">Satisfacción</option>
            </select>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Total solicitudes", value: totalSol, color: "text-indigo-600" },
            { label: "Ingresos generados", value: fmt(totalIng), color: "text-emerald-600" },
            { label: "Satisfacción promedio", value: `${promSat} / 5`, color: "text-amber-500" },
          ].map(k => (
            <div key={k.label} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 text-center">
              <p className="text-xs text-slate-400 font-medium mb-1">{k.label}</p>
              <p className={`text-xl font-bold ${k.color}`}>{k.value}</p>
            </div>
          ))}
        </div>

        {/* Ranking */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-4">
          <h2 className="text-base font-bold text-slate-700">Ranking de servicios</h2>
          {ordenados.map((s, i) => (
            <div key={s.servicio} className="flex items-center gap-4">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0
                ${i === 0 ? "bg-amber-100 text-amber-600" : i === 1 ? "bg-slate-100 text-slate-500" : i === 2 ? "bg-orange-50 text-orange-500" : "bg-slate-50 text-slate-400"}`}>
                {i + 1}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-semibold text-slate-800 truncate">{s.servicio}</span>
                  <span className="text-xs text-slate-500 ml-2 shrink-0">{s.solicitudes} solics.</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full bg-indigo-500" style={{ width: `${(s.solicitudes / maxSol) * 100}%` }} />
                </div>
              </div>
              <div className="shrink-0 text-right hidden md:block">
                <Estrellas valor={s.satisfaccion} />
              </div>
              <div className="shrink-0 text-right w-28 hidden md:block">
                <p className="text-xs text-slate-400">Ingresos</p>
                <p className="text-sm font-bold text-emerald-600">{fmt(s.ingresos)}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Tabla completa */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <h2 className="text-base font-bold text-slate-700 mb-4">Detalle completo</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs font-semibold text-slate-400 uppercase tracking-wide border-b border-slate-100">
                  <th className="text-left pb-3 pr-4">#</th>
                  <th className="text-left pb-3 pr-4">Servicio</th>
                  <th className="text-left pb-3 pr-4">Solicitudes</th>
                  <th className="text-left pb-3 pr-4">Ingresos</th>
                  <th className="text-left pb-3">Satisfacción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {ordenados.map((s, i) => (
                  <tr key={s.servicio} className="hover:bg-slate-50">
                    <td className="py-3 pr-4 text-slate-400 font-semibold">{i + 1}</td>
                    <td className="py-3 pr-4 font-medium text-slate-800">{s.servicio}</td>
                    <td className="py-3 pr-4 text-slate-700 font-semibold">{s.solicitudes}</td>
                    <td className="py-3 pr-4 text-emerald-600 font-semibold">{fmt(s.ingresos)}</td>
                    <td className="py-3"><Estrellas valor={s.satisfaccion} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
