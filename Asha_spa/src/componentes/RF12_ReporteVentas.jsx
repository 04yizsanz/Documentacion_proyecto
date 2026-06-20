import { useState } from "react";

const ventasMock = [
  { id: "V-001", fecha: "2025-06-01", cliente: "Juan García", producto: "Camisa blanca M", cantidad: 2, total: 80000 },
  { id: "V-002", fecha: "2025-06-03", cliente: "María López", producto: "Crema hidratante", cantidad: 1, total: 35000 },
  { id: "V-003", fecha: "2025-06-05", cliente: "Carlos Ruiz", producto: "Pantalón negro 32", cantidad: 1, total: 120000 },
  { id: "V-004", fecha: "2025-06-08", cliente: "Ana Torres", producto: "Camisa blanca M", cantidad: 3, total: 120000 },
  { id: "V-005", fecha: "2025-06-12", cliente: "Pedro Silva", producto: "Zapatos café 42", cantidad: 1, total: 180000 },
  { id: "V-006", fecha: "2025-06-15", cliente: "Laura Mora", producto: "Crema hidratante", cantidad: 2, total: 70000 },
];

const fmt = (n) => new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(n);

export default function RF12_ReporteVentas() {
  const [desde, setDesde] = useState("2025-06-01");
  const [hasta, setHasta] = useState("2025-06-30");
  const [generado, setGenerado] = useState(false);

  const filtradas = ventasMock.filter(v => v.fecha >= desde && v.fecha <= hasta);
  const totalVentas = filtradas.reduce((a, v) => a + v.total, 0);
  const totalUnidades = filtradas.reduce((a, v) => a + v.cantidad, 0);
  const ticketProm = filtradas.length ? totalVentas / filtradas.length : 0;

  const productosAgrupados = filtradas.reduce((acc, v) => {
    acc[v.producto] = (acc[v.producto] || 0) + v.total;
    return acc;
  }, {});
  const top = Object.entries(productosAgrupados).sort((a, b) => b[1] - a[1]);
  const maxVal = top[0]?.[1] || 1;

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <span className="text-xs font-semibold tracking-widest text-indigo-500 uppercase">RF-12</span>
          <h1 className="text-3xl font-bold text-slate-800 mt-1">Reporte de Ventas</h1>
          <p className="text-slate-500 mt-1">Resumen de ventas por rango de fechas.</p>
        </div>

        {/* Filtro */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex flex-wrap gap-4 items-end">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Desde</label>
            <input type="date" value={desde} onChange={e => setDesde(e.target.value)}
              className="border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Hasta</label>
            <input type="date" value={hasta} onChange={e => setHasta(e.target.value)}
              className="border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition" />
          </div>
          <button onClick={() => setGenerado(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition">
            Generar reporte
          </button>
          {generado && (
            <button onClick={() => window.print()}
              className="border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium px-5 py-2.5 rounded-xl text-sm transition flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
              Imprimir
            </button>
          )}
        </div>

        {generado && (
          <>
            {/* KPIs */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Total ventas", value: fmt(totalVentas), color: "text-indigo-600" },
                { label: "Transacciones", value: filtradas.length, color: "text-slate-800" },
                { label: "Unidades vendidas", value: totalUnidades, color: "text-slate-800" },
                { label: "Ticket promedio", value: fmt(ticketProm), color: "text-emerald-600" },
              ].map(k => (
                <div key={k.label} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
                  <p className="text-xs text-slate-400 font-medium mb-1">{k.label}</p>
                  <p className={`text-xl font-bold ${k.color}`}>{k.value}</p>
                </div>
              ))}
            </div>

            {/* Ventas por producto */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <h2 className="text-base font-bold text-slate-700 mb-5">Ventas por producto</h2>
              <div className="space-y-3">
                {top.map(([prod, val]) => (
                  <div key={prod}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-700 font-medium">{prod}</span>
                      <span className="text-slate-500">{fmt(val)}</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${(val / maxVal) * 100}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tabla de ventas */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <h2 className="text-base font-bold text-slate-700 mb-4">Detalle de ventas</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-xs font-semibold text-slate-400 uppercase tracking-wide border-b border-slate-100">
                      <th className="text-left pb-3 pr-4">ID</th>
                      <th className="text-left pb-3 pr-4">Fecha</th>
                      <th className="text-left pb-3 pr-4">Cliente</th>
                      <th className="text-left pb-3 pr-4">Producto</th>
                      <th className="text-left pb-3 pr-4">Cant.</th>
                      <th className="text-right pb-3">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {filtradas.map(v => (
                      <tr key={v.id} className="hover:bg-slate-50">
                        <td className="py-3 pr-4 text-indigo-600 font-mono text-xs">{v.id}</td>
                        <td className="py-3 pr-4 text-slate-500">{v.fecha}</td>
                        <td className="py-3 pr-4 font-medium text-slate-800">{v.cliente}</td>
                        <td className="py-3 pr-4 text-slate-600">{v.producto}</td>
                        <td className="py-3 pr-4 text-slate-700">{v.cantidad}</td>
                        <td className="py-3 text-right font-semibold text-slate-800">{fmt(v.total)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="border-t-2 border-slate-200">
                      <td colSpan={5} className="pt-3 font-bold text-slate-700 text-sm">Total</td>
                      <td className="pt-3 text-right font-bold text-indigo-600">{fmt(totalVentas)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
