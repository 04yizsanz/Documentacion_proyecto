import { useState } from "react";

const cargos = ["Vendedor", "Cajero", "Bodeguero", "Supervisor", "Administrador", "Contador", "Otro"];
const tiposContrato = ["Término fijo", "Término indefinido", "Prestación de servicios", "Aprendiz"];
const areas = ["Ventas", "Inventario", "Administración", "Contabilidad", "Operaciones"];

export default function RF17_RegistrarEmpleado() {
  const [form, setForm] = useState({
    nombres: "", apellidos: "", cedula: "", fechaNac: "",
    email: "", telefono: "", ciudad: "", direccion: "",
    cargo: "", area: "", contrato: "", salario: "",
    fechaIngreso: "", eps: "", arl: "", notas: "",
  });
  const [paso, setPaso] = useState(1);
  const [ok, setOk] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    setOk(true);
    setForm({ nombres:"",apellidos:"",cedula:"",fechaNac:"",email:"",telefono:"",ciudad:"",direccion:"",cargo:"",area:"",contrato:"",salario:"",fechaIngreso:"",eps:"",arl:"",notas:"" });
    setPaso(1);
    setTimeout(() => setOk(false), 3500);
  };

  const pasos = ["Datos personales", "Cargo y contrato", "Seguridad social"];
  const fmt = (n) => new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(n || 0);

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <span className="text-xs font-semibold tracking-widest text-indigo-500 uppercase">RF-17</span>
          <h1 className="text-3xl font-bold text-slate-800 mt-1">Registrar Empleado</h1>
          <p className="text-slate-500 mt-1">Vincula un nuevo empleado al sistema.</p>
        </div>

        {ok && (
          <div className="mb-6 flex items-center gap-3 bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-xl text-sm font-medium">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/></svg>
            Empleado registrado exitosamente.
          </div>
        )}

        {/* Stepper */}
        <div className="flex items-center gap-2 mb-8">
          {pasos.map((p, i) => (
            <div key={p} className="flex items-center flex-1">
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition
                  ${paso > i + 1 ? "bg-indigo-600 text-white" : paso === i + 1 ? "bg-indigo-600 text-white" : "bg-slate-200 text-slate-500"}`}>
                  {paso > i + 1 ? <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/></svg> : i + 1}
                </div>
                <span className={`text-xs font-semibold hidden md:block ${paso === i + 1 ? "text-indigo-600" : "text-slate-400"}`}>{p}</span>
              </div>
              {i < pasos.length - 1 && <div className={`flex-1 h-0.5 mx-3 ${paso > i + 1 ? "bg-indigo-600" : "bg-slate-200"}`} />}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
          {/* Paso 1: Datos personales */}
          {paso === 1 && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Nombres <span className="text-red-400">*</span></label>
                  <input name="nombres" value={form.nombres} onChange={handleChange}
                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                    placeholder="Nombres completos" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Apellidos <span className="text-red-400">*</span></label>
                  <input name="apellidos" value={form.apellidos} onChange={handleChange}
                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                    placeholder="Apellidos completos" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Cédula <span className="text-red-400">*</span></label>
                  <input name="cedula" value={form.cedula} onChange={handleChange}
                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                    placeholder="Número de documento" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Fecha de nacimiento</label>
                  <input name="fechaNac" type="date" value={form.fechaNac} onChange={handleChange}
                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Correo electrónico</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange}
                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                    placeholder="empleado@empresa.com" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Teléfono</label>
                  <input name="telefono" value={form.telefono} onChange={handleChange}
                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                    placeholder="300 000 0000" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Dirección</label>
                <input name="direccion" value={form.direccion} onChange={handleChange}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                  placeholder="Dirección de residencia" />
              </div>
            </div>
          )}

          {/* Paso 2: Cargo y contrato */}
          {paso === 2 && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Cargo <span className="text-red-400">*</span></label>
                  <select name="cargo" value={form.cargo} onChange={handleChange}
                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition bg-white">
                    <option value="">Seleccionar...</option>
                    {cargos.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Área</label>
                  <select name="area" value={form.area} onChange={handleChange}
                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition bg-white">
                    <option value="">Seleccionar...</option>
                    {areas.map(a => <option key={a}>{a}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Tipo de contrato</label>
                  <select name="contrato" value={form.contrato} onChange={handleChange}
                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition bg-white">
                    <option value="">Seleccionar...</option>
                    {tiposContrato.map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Fecha de ingreso</label>
                  <input name="fechaIngreso" type="date" value={form.fechaIngreso} onChange={handleChange}
                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Salario mensual</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-400 text-sm">$</span>
                  <input name="salario" type="number" min="0" value={form.salario} onChange={handleChange}
                    className="w-full border border-slate-200 rounded-xl pl-7 pr-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                    placeholder="0" />
                </div>
                {form.salario && <p className="text-xs text-slate-400 mt-1">{fmt(form.salario)}</p>}
              </div>
            </div>
          )}

          {/* Paso 3: Seguridad social */}
          {paso === 3 && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">EPS</label>
                  <input name="eps" value={form.eps} onChange={handleChange}
                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                    placeholder="Nombre de la EPS" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">ARL</label>
                  <input name="arl" value={form.arl} onChange={handleChange}
                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                    placeholder="Nombre de la ARL" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Notas</label>
                <textarea name="notas" rows={3} value={form.notas} onChange={handleChange}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition resize-none"
                  placeholder="Observaciones adicionales..." />
              </div>
            </div>
          )}

          {/* Navegación */}
          <div className="flex justify-between mt-8 pt-6 border-t border-slate-100">
            <button onClick={() => setPaso(p => Math.max(1, p - 1))} disabled={paso === 1}
              className="border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-30 font-medium px-5 py-2.5 rounded-xl text-sm transition">
              Anterior
            </button>
            {paso < 3 ? (
              <button onClick={() => setPaso(p => p + 1)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition">
                Siguiente
              </button>
            ) : (
              <button onClick={handleSubmit}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition">
                Registrar empleado
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
