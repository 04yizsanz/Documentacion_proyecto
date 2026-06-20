import { useState } from "react";

const inventarioMock = [
  { id: 1, codigo: "CAM-BL-M-001", nombre: "Camisa blanca talla M", categoria: "Ropa",      stock: 12, minimo: 5,  precio: 40000,  costo: 22000 },
  { id: 2, codigo: "PAN-NG-32-002", nombre: "Pantalón negro 32",     categoria: "Ropa",      stock: 3,  minimo: 5,  precio: 120000, costo: 65000 },
  { id: 3, codigo: "ZAP-CF-42-003", nombre: "Zapatos café 42",       categoria: "Calzado",   stock: 2,  minimo: 4,  precio: 180000, costo: 95000 },
  { id: 4, codigo: "CRE-HID-004",   nombre: "Crema hidratante",      categoria: "Cosméticos",stock: 20, minimo: 10, precio: 35000,  costo: 18000 },
  { id: 5, codigo: "TAL-PO-005",    nombre: "Talco corporal 200g",   categoria: "Cosméticos",stock: 8,  minimo: 5,  precio: 15000,  costo: 7000  },
  { id: 6, codigo: "CAB-USB-006",   nombre: "Cable USB-C",           categoria: "Electrónica",stock: 0, minimo: 10, precio: 25000,  costo: 12000 },
  { id: 7, codigo: "AUD-BT-007",    nombre: "Audífonos Bluetooth",   categoria: "Electrónica",stock: 5, minimo: 3,  precio: 85000,  costo: 45000 },
];

const fmt = (n) => new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(n);

const estadoBadge = (stock, minimo) => {
  if (stock === 0) return { label: "Agotado", cls: "bg-red-100 text-red-600" };
  if (stock <= minimo) return { label: "Stock bajo", cls: "bg-amber-100 text-amber-700" };
  return { label: "Normal", cls: "bg-emerald-100 text-emerald-700" };
};

export default function RF14_ReporteInventario() {
  const [filtroCategoria, setFiltroCategoria] = useState("Todas");
  const [filtroEstado, setFiltroEstado] = useState("Todos");
  const [busqueda, setBusqueda] = useState("");

  const categorias = ["Todas", ...new Set(inventarioMock.map(p => p.categoria))];

  const filtrados = inventarioMock.filter(p => {
    const matchCat = filtroCategoria === "Todas" || p.categoria === filtroCategoria;
    const { label } = estadoBadge(p.stock, p.minimo);
    const matchEst = filtroEstado === "Todos" || label === filtroEstado;
    const matchBus = p.nombre.toLowerCase().includes(busqueda.toLowerCase()) || p.codigo.toLowerCase().includes(busqueda.toLowerCase());
    return matchCat && matchEst && matchBus;
  });

  const valorTotal = filtrados.reduce((a, p) => a + p.stock * p.costo, 0);
  const agotados = inventarioMock.filter(p => p.stock === 0).length;
  const bajos = inventarioMock.filter(p => p.stock > 0 && p.stock <= p.minimo).length;

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-5xl mx-auto space-y-8">
        <div>
          <span className="text-xs font-semibold tracking-widest text-indigo-500 uppercase">RF-14</span>
          <h1 className="text-3xl font-bold text-slate-800 mt-1">Reporte de Inventario</h1>
          <p className="text-slate-500 mt-1">Estado actual del inventario con alertas de stock.</p>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Productos", value: inventarioMock.length, color: "text-slate-800" },
            { label: "Valor en inventario", value: fmt(inventarioMock.reduce((a, p) => a + p.stock * p.costo, 0)), color: "text-indigo-600" },
            { label: "Stock bajo", value: bajos, color: "text-amber-600" },
            { label: "Agotados", value: agotados, color: "text-red-600" },
          ].map(k => (
            <div key={k.label} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
              <p className="text-xs text-slate-400 font-medium mb-1">{k.label}</p>
              <p className={`text-xl font-bold ${k.color}`}>{k.value}</p>
            </div>
          ))}
        </div>

        {/* Filtros */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex flex-wrap gap-4 items-end">
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">Buscar</label>
            <input value={busqueda} onChange={e => setBusqueda(e.target.value)}
              className="border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              placeholder="Nombre o código..." />
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
              {["Todos", "Normal", "Stock bajo", "Agotado"].map(e => <option key={e}>{e}</option>)}
            </select>
          </div>
        </div>

        {/* Tabla */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-base font-bold text-slate-700">{filtrados.length} productos</h2>
            <p className="text-sm text-slate-500">Valor filtrado: <span className="font-bold text-indigo-600">{fmt(valorTotal)}</span></p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs font-semibold text-slate-400 uppercase tracking-wide border-b border-slate-100">
                  <th className="text-left pb-3 pr-4">Código</th>
                  <th className="text-left pb-3 pr-4">Producto</th>
                  <th className="text-left pb-3 pr-4">Categoría</th>
                  <th className="text-left pb-3 pr-4">Stock</th>
                  <th className="text-left pb-3 pr-4">Mínimo</th>
                  <th className="text-left pb-3 pr-4">Precio venta</th>
                  <th className="text-left pb-3 pr-4">Valor inv.</th>
                  <th className="text-left pb-3">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filtrados.map(p => {
                  const est = estadoBadge(p.stock, p.minimo);
                  return (
                    <tr key={p.id} className="hover:bg-slate-50">
                      <td className="py-3 pr-4 font-mono text-xs text-slate-500">{p.codigo}</td>
                      <td className="py-3 pr-4 font-medium text-slate-800">{p.nombre}</td>
                      <td className="py-3 pr-4 text-slate-500">{p.categoria}</td>
                      <td className={`py-3 pr-4 font-bold ${p.stock === 0 ? "text-red-500" : p.stock <= p.minimo ? "text-amber-600" : "text-slate-800"}`}>{p.stock}</td>
                      <td className="py-3 pr-4 text-slate-400">{p.minimo}</td>
                      <td className="py-3 pr-4 text-slate-700">{fmt(p.precio)}</td>
                      <td className="py-3 pr-4 text-slate-600">{fmt(p.stock * p.costo)}</td>
                      <td className="py-3">
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg ${est.cls}`}>{est.label}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
