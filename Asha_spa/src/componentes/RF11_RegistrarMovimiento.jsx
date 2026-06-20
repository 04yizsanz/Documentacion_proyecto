import { useState } from "react";

const tiposMovimiento = ["Entrada por compra", "Salida por venta", "Ajuste positivo", "Ajuste negativo", "Traslado", "Devolución", "Merma"];

const historial = [
  { id: 1, fecha: "2025-06-18", producto: "Camisa blanca M", tipo: "Entrada por compra", cantidad: 20, responsable: "Ana Torres" },
  { id: 2, fecha: "2025-06-17", producto: "Pantalón negro 32", tipo: "Salida por venta", cantidad: 3, responsable: "Luis Pérez" },
  { id: 3, fecha: "2025-06-15", producto: "Crema hidratante", tipo: "Ajuste negativo", cantidad: 2, responsable: "Ana Torres" },
];

const tipoColor = (t) => {
  if (t.includes("Entrada") || t.includes("positivo") || t.includes("Devolución")) return "bg-emerald-50 text-emerald-700";
  if (t.includes("Salida") || t.includes("negativo") || t.includes("Merma")) return "bg-red-50 text-red-600";
  return "bg-blue-50 text-blue-600";
};

export default function RF11_RegistrarMovimiento() {
  const [form, setForm] = useState({ producto: "", tipo: "", cantidad: "", responsable: "", notas: "", fecha: "" });
  const [movimientos, setMovimientos] = useState(historial);
  const [ok, setOk] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    setMovimientos(prev => [{
      id: prev.length + 1,
      fecha: form.fecha || new Date().toISOString().split("T")[0],
      producto: form.producto,
      tipo: form.tipo,
      cantidad: parseInt(form.cantidad),
      responsable: form.responsable,
    }, ...prev]);
    setOk(true);
    setForm({ producto: "", tipo: "", cantidad: "", responsable: "", notas: "", fecha: "" });
    setTimeout(() => setOk(false), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <span className="text-xs font-semibold tracking-widest text-indigo-500 uppercase">RF-11</span>
          <h1 className="text-3xl font-bold text-slate-800 mt-1">Registrar Movimiento</h1>
          <p className="text-slate-500 mt-1">Documenta cada entrada o salida del inventario.</p>
        </div>

        {ok && (
          <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-xl text-sm font-medium">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/></svg>
            Movimiento registrado correctamente.
          </div>
        )}

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Producto <span className="text-red-400">*</span></label>
              <input name="producto" value={form.producto} onChange={handleChange} required
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                placeholder="Nombre o código del producto" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Tipo de movimiento <span className="text-red-400">*</span></label>
              <select name="tipo" value={form.tipo} onChange={handleChange} required
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition bg-white">
                <option value="">Seleccionar...</option>
                {tiposMovimiento.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Cantidad <span className="text-red-400">*</span></label>
              <input name="cantidad" type="number" min="1" value={form.cantidad} onChange={handleChange} required
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                placeholder="0" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Responsable <span className="text-red-400">*</span></label>
              <input name="responsable" value={form.responsable} onChange={handleChange} required
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                placeholder="Nombre del responsable" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Fecha</label>
              <input name="fecha" type="date" value={form.fecha} onChange={handleChange}
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Notas</label>
            <textarea name="notas" rows={2} value={form.notas} onChange={handleChange}
              className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition resize-none"
              placeholder="Observaciones opcionales..." />
          </div>

          <button type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition">
            Registrar movimiento
          </button>
        </form>

        {/* Historial reciente */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <h2 className="text-base font-bold text-slate-700 mb-4">Historial reciente</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs font-semibold text-slate-400 uppercase tracking-wide border-b border-slate-100">
                  <th className="text-left pb-3 pr-4">Fecha</th>
                  <th className="text-left pb-3 pr-4">Producto</th>
                  <th className="text-left pb-3 pr-4">Tipo</th>
                  <th className="text-left pb-3 pr-4">Cantidad</th>
                  <th className="text-left pb-3">Responsable</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {movimientos.map(m => (
                  <tr key={m.id} className="hover:bg-slate-50">
                    <td className="py-3 pr-4 text-slate-500">{m.fecha}</td>
                    <td className="py-3 pr-4 font-medium text-slate-800">{m.producto}</td>
                    <td className="py-3 pr-4">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg ${tipoColor(m.tipo)}`}>{m.tipo}</span>
                    </td>
                    <td className="py-3 pr-4 font-semibold text-slate-700">{m.cantidad}</td>
                    <td className="py-3 text-slate-600">{m.responsable}</td>
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
