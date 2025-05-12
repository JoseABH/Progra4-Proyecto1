import { useState, useEffect } from "react";
import { Permiso, EstadoGeneral } from "../types/Permiso";

type Props = {
  initial?: Permiso;
  onClose: () => void;
  onSave: (permiso: Permiso) => void;
};

const emptyPermiso: Permiso = {
  id: Date.now(),
  empleado: "",
  motivo: "",
  tipo: "",
  fechaInicio: "",
  fechaFin: "",
  estadoGeneral: "Pendiente",
  estadoProceso: ""
};

export default function ModalPermiso({ initial, onClose, onSave }: Props) {
  const [form, setForm] = useState<Permiso>(initial || { ...emptyPermiso, id: Date.now() });

  useEffect(() => {
    if (initial) setForm(initial);
  }, [initial]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-4">
          {initial ? "Editar Permiso" : "Nuevo Permiso"}
        </h2>

        <div className="grid grid-cols-2 gap-4">
          <input name="empleado" value={form.empleado} onChange={handleChange} placeholder="Empleado" className="border p-2 rounded" />
          <input name="tipo" value={form.tipo} onChange={handleChange} placeholder="Tipo" className="border p-2 rounded" />
          <input name="motivo" value={form.motivo} onChange={handleChange} placeholder="Motivo" className="border p-2 rounded col-span-2" />
          <input type="date" name="fechaInicio" value={form.fechaInicio} onChange={handleChange} className="border p-2 rounded" />
          <input type="date" name="fechaFin" value={form.fechaFin} onChange={handleChange} className="border p-2 rounded" />
          <select name="estadoGeneral" value={form.estadoGeneral} onChange={handleChange} className="border p-2 rounded">
            {["Pendiente", "Aprobado", "Rechazado"].map(e => (
              <option key={e} value={e}>{e}</option>
            ))}
          </select>
          <select
  name="estadoProceso"
  value={form.estadoProceso}
  onChange={handleChange}
  className="border p-2 rounded col-span-2"
>
  <option>Pendiente de Jefe de Departamento</option>
  <option>Aprobado por Jefe de Departamento</option>
  <option>Rechazado por Jefe de Departamento</option>
  <option>Pendiente de Recursos Humanos</option>
  <option>Aprobado por Recursos Humanos</option>
  <option>Rechazado por Recursos Humanos</option>
</select>

        </div>

        <div className="mt-4 flex justify-end space-x-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Cancelar</button>
          <button onClick={() => onSave(form)} className="px-4 py-2 bg-blue-600 text-white rounded">
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}
