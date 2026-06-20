import { useState } from "react";

const productosEjemplo = [
  { id: 1, codigo: "CAM-BL-M-001", nombre: "Camisa blanca talla M", stock: 12, unidad: "Unidad" },
  { id: 2, codigo: "PAN-NG-32-002", nombre: "Pantalón negro talla 32", stock: 5, unidad: "Unidad" },
  { id: 3, codigo: "ZAP-CF-42-003", nombre: "Zapatos café talla 42", stock: 3, unidad: "Par" },
  { id: 4, codigo: "CRE-HID-004",   nombre: "Crema hidratante 200ml", stock: 20, unidad: "Unidad" },
];

export default function RF10_ActualizarExistencias() {
  const [busqueda, setBusqueda] = useState("");
  const [seleccionado, setSeleccionado] = useState(null);
  const [cantidad, setCantidad] = useState("");
  const [motivo, setMotivo] = useState("");
  const [tipo, setTipo] = useState("entrada");
  const [productos, setProductos] = useState(productosEjemplo);
  const [alerta, setAlerta] = useState(null);

  const filtrados = productos.filter(p =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    p.codigo.toLowerCase().includes(busqueda.toLowerCase())
  );

  const handleActualizar = () => {
    if (!seleccionado || !cantidad || !motivo) return;
    const cant = parseInt(cantidad);
    setProductos(prev => prev.map(p => {
      if (p.id !== seleccionado.id) return p;
      const nuevo = tipo === "entrada" ? p.stock + cant : Math.max(0, p.stock - cant);
      return { ...p, stock: nuevo };
    }));
    setAlerta({ tipo: "ok", msg: `Existencias de "${seleccionado.nombre}" actualizadas.` });
    setSeleccionado(null); setCantidad(""); setMotivo(""); setBusqueda("");
    setTimeout(() => setAlerta(null), 3500);
  };

  const stockColor = (s) => s <= 3 ? "text-red-500 bg-red-50" : s <= 8 ? "text-amber-600 bg-amber-50" : "text-emerald-600 bg-emerald-50";

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <span className="text-xs font-semibold tracking-widest text-indigo-500 uppercase">RF-10</span>
          <h1 className="text-3xl font-bold text-slate-800 mt-1">Actualizar Existencias</h1>
          <p className="text-slate-500 mt-1">Ajusta el stock de un producto por entradas, salidas o ajustes.</p>
        </div>

        {alerta && (
          <div className="mb-5 flex items-center gap-3 bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-xl text-sm font-medium">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            {alerta.msg}
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 space-y-6">
          {/* Buscador */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Buscar producto</label>
            <input value={busqueda} onChange={e => { setBusqueda(e.target.value); setSeleccionado(null); }}
              className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              placeholder="Nombre o código..." />
          </div>

          {/* Lista */}
          {busqueda && !seleccionado && (
            <div className="border border-slate-100 rounded-xl overflow-hidden divide-y divide-slate-100">
              {filtrados.length === 0 ? (
                <p className="text-center text-slate-400 text-sm py-6">Sin resultados.</p>
              ) : filtrados.map(p => (
                <button key={p.id} onClick={() => { setSeleccionado(p); setBusqueda(p.nombre); }}
                  className="w-full flex items-center justify-between px-5 py-3 hover:bg-indigo-50 transition text-left">
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{p.nombre}</p>
                    <p className="text-xs text-slate-400">{p.codigo}</p>
                  </div>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-lg ${stockColor(p.stock)}`}>
                    {p.stock} {p.unidad}
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* Producto seleccionado */}
          {seleccionado && (
            <div className="bg-indigo-50 border border-indigo-100 rounded-xl px-5 py-4 flex items-center justify-between">
              <div>
                <p className="font-semibold text-slate-800 text-sm">{seleccionado.nombre}</p>
                <p className="text-xs text-slate-500">{seleccionado.codigo}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-500">Stock actual</p>
                <p className={`text-lg font-bold ${stockColor(seleccionado.stock).split(" ")[0]}`}>{seleccionado.stock}</p>
              </div>
            </div>
          )}

          {/* Tipo de movimiento */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Tipo de ajuste</label>
            <div className="flex gap-3">
              {[{ v:"entrada", label:"Entrada", icon:"↑" }, { v:"salida", label:"Salida", icon:"↓" }, { v:"ajuste", label:"Ajuste", icon:"⇄" }].map(t => (
                <button key={t.v} onClick={() => setTipo(t.v)}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-semibold border transition ${tipo === t.v ? "bg-indigo-600 text-white border-indigo-600" : "border-slate-200 text-slate-600 hover:border-indigo-300"}`}>
                  <span className="mr-1">{t.icon}</span>{t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Cantidad y motivo */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Cantidad <span className="text-red-400">*</span></label>
              <input type="number" min="1" value={cantidad} onChange={e => setCantidad(e.target.value)}
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                placeholder="Ej. 10" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Motivo <span className="text-red-400">*</span></label>
              <input value={motivo} onChange={e => setMotivo(e.target.value)}
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                placeholder="Ej. Recepción de pedido" />
            </div>
          </div>

          <button onClick={handleActualizar} disabled={!seleccionado || !cantidad || !motivo}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-200 disabled:text-slate-400 text-white font-semibold py-3 rounded-xl text-sm transition">
            Aplicar actualización
          </button>
        </div>
      </div>
    </div>
  );
}
