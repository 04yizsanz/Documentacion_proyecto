import { useState } from "react";

const tiposPersona = ["Natural", "Jurídica"];
const regimenes = ["Simplificado", "Común", "Gran contribuyente"];
const categorias = ["Ropa y calzado", "Electrónica", "Alimentos", "Cosméticos", "Herramientas", "Servicios", "Otro"];

export default function RF15_RegistrarProveedor() {
  const [form, setForm] = useState({
    tipoPersona: "", nit: "", razonSocial: "", contacto: "",
    email: "", telefono: "", ciudad: "", direccion: "",
    regimen: "", categoria: "", plazoCredito: "", notas: "",
  });
  const [ok, setOk] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    setOk(true);
    setForm({ tipoPersona:"",nit:"",razonSocial:"",contacto:"",email:"",telefono:"",ciudad:"",direccion:"",regimen:"",categoria:"",plazoCredito:"",notas:"" });
    setTimeout(() => setOk(false), 3500);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <span className="text-xs font-semibold tracking-widest text-indigo-500 uppercase">RF-15</span>
          <h1 className="text-3xl font-bold text-slate-800 mt-1">Registrar Proveedor</h1>
          <p className="text-slate-500 mt-1">Agrega un nuevo proveedor al directorio comercial.</p>
        </div>

        {ok && (
          <div className="mb-6 flex items-center gap-3 bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-xl text-sm font-medium">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            Proveedor registrado exitosamente.
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8 space-y-6">

          {/* Sección: Identificación */}
          <div>
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Identificación</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Tipo de persona <span className="text-red-400">*</span></label>
                <select name="tipoPersona" value={form.tipoPersona} onChange={handleChange} required
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition bg-white">
                  <option value="">Seleccionar...</option>
                  {tiposPersona.map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">NIT / Cédula <span className="text-red-400">*</span></label>
                <input name="nit" value={form.nit} onChange={handleChange} required
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                  placeholder="000-000-0000" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Régimen tributario</label>
                <select name="regimen" value={form.regimen} onChange={handleChange}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition bg-white">
                  <option value="">Seleccionar...</option>
                  {regimenes.map(r => <option key={r}>{r}</option>)}
                </select>
              </div>
            </div>
            <div className="mt-5">
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Razón social / Nombre <span className="text-red-400">*</span></label>
              <input name="razonSocial" value={form.razonSocial} onChange={handleChange} required
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                placeholder="Nombre completo o razón social" />
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Sección: Contacto */}
          <div>
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Contacto</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Persona de contacto</label>
                <input name="contacto" value={form.contacto} onChange={handleChange}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                  placeholder="Nombre del representante" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Correo electrónico <span className="text-red-400">*</span></label>
                <input name="email" type="email" value={form.email} onChange={handleChange} required
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                  placeholder="correo@empresa.com" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Teléfono <span className="text-red-400">*</span></label>
                <input name="telefono" value={form.telefono} onChange={handleChange} required
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                  placeholder="300 000 0000" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Ciudad</label>
                <input name="ciudad" value={form.ciudad} onChange={handleChange}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                  placeholder="Bogotá, Medellín..." />
              </div>
            </div>
            <div className="mt-5">
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Dirección</label>
              <input name="direccion" value={form.direccion} onChange={handleChange}
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                placeholder="Calle, carrera, barrio..." />
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Sección: Comercial */}
          <div>
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Información comercial</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Categoría de productos</label>
                <select name="categoria" value={form.categoria} onChange={handleChange}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition bg-white">
                  <option value="">Seleccionar...</option>
                  {categorias.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Plazo de crédito (días)</label>
                <input name="plazoCredito" type="number" min="0" value={form.plazoCredito} onChange={handleChange}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                  placeholder="30, 60, 90..." />
              </div>
            </div>
            <div className="mt-5">
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Notas adicionales</label>
              <textarea name="notas" rows={3} value={form.notas} onChange={handleChange}
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition resize-none"
                placeholder="Condiciones especiales, observaciones..." />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition">
              Registrar proveedor
            </button>
            <button type="reset" onClick={() => setForm({ tipoPersona:"",nit:"",razonSocial:"",contacto:"",email:"",telefono:"",ciudad:"",direccion:"",regimen:"",categoria:"",plazoCredito:"",notas:"" })}
              className="border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium px-5 py-2.5 rounded-xl text-sm transition">
              Limpiar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
