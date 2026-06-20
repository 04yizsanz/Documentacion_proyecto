import { useState } from "react";

const categorias = ["Electrónica", "Ropa", "Alimentos", "Herramientas", "Cosméticos", "Otro"];
const unidades = ["Unidad", "Caja", "Kg", "Litro", "Metro", "Par"];

export default function RF09_RegistrarProducto() {
  const [form, setForm] = useState({
    nombre: "", codigo: "", categoria: "", precio: "", costo: "",
    stock: "", stockMinimo: "", unidad: "", descripcion: "", proveedor: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <span className="text-xs font-semibold tracking-widest text-indigo-500 uppercase">RF-09</span>
          <h1 className="text-3xl font-bold text-slate-800 mt-1">Registrar Producto</h1>
          <p className="text-slate-500 mt-1">Ingresa los datos del nuevo producto al inventario.</p>
        </div>

        {submitted && (
          <div className="mb-6 flex items-center gap-3 bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-xl text-sm font-medium">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            Producto registrado exitosamente.
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 space-y-6">
          {/* Fila 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Nombre del producto <span className="text-red-400">*</span></label>
              <input name="nombre" value={form.nombre} onChange={handleChange} required
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
                placeholder="Ej. Camisa blanca talla M" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Código / SKU <span className="text-red-400">*</span></label>
              <input name="codigo" value={form.codigo} onChange={handleChange} required
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
                placeholder="Ej. CAM-BL-M-001" />
            </div>
          </div>

          {/* Fila 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Categoría <span className="text-red-400">*</span></label>
              <select name="categoria" value={form.categoria} onChange={handleChange} required
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition bg-white">
                <option value="">Seleccionar...</option>
                {categorias.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Unidad de medida</label>
              <select name="unidad" value={form.unidad} onChange={handleChange}
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition bg-white">
                <option value="">Seleccionar...</option>
                {unidades.map(u => <option key={u}>{u}</option>)}
              </select>
            </div>
          </div>

          {/* Fila 3 — precios */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Precio de venta <span className="text-red-400">*</span></label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-slate-400 text-sm">$</span>
                <input name="precio" type="number" min="0" value={form.precio} onChange={handleChange} required
                  className="w-full border border-slate-200 rounded-xl pl-7 pr-4 py-2.5 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                  placeholder="0.00" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Costo</label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-slate-400 text-sm">$</span>
                <input name="costo" type="number" min="0" value={form.costo} onChange={handleChange}
                  className="w-full border border-slate-200 rounded-xl pl-7 pr-4 py-2.5 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                  placeholder="0.00" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Stock inicial <span className="text-red-400">*</span></label>
              <input name="stock" type="number" min="0" value={form.stock} onChange={handleChange} required
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                placeholder="0" />
            </div>
          </div>

          {/* Fila 4 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Stock mínimo</label>
              <input name="stockMinimo" type="number" min="0" value={form.stockMinimo} onChange={handleChange}
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                placeholder="Alerta cuando baje de..." />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Proveedor</label>
              <input name="proveedor" value={form.proveedor} onChange={handleChange}
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                placeholder="Nombre del proveedor" />
            </div>
          </div>

          {/* Descripción */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Descripción</label>
            <textarea name="descripcion" rows={3} value={form.descripcion} onChange={handleChange}
              className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition resize-none"
              placeholder="Descripción breve del producto..." />
          </div>

          {/* Acciones */}
          <div className="flex gap-3 pt-2">
            <button type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition">
              Registrar producto
            </button>
            <button type="reset" onClick={() => setForm({ nombre:"",codigo:"",categoria:"",precio:"",costo:"",stock:"",stockMinimo:"",unidad:"",descripcion:"",proveedor:"" })}
              className="border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium px-5 py-2.5 rounded-xl text-sm transition">
              Limpiar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
