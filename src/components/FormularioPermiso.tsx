import { useState } from "react";
import { Permiso } from "../types/Permiso";
import { usePermisos } from "../hooks/usePermisos";

const FormularioPermiso = ({ onSuccess, onClose }: { onSuccess?: () => void, onClose?: () => void }) => {
  const { addPermiso } = usePermisos();
  const [formData, setFormData] = useState<Omit<Permiso, "id">>({
    empleado: "",
    motivo: "",
    tipo: "Permiso personal",
    fechaInicio: "",
    fechaFin: "",
    estadoGeneral: "Pendiente",
    estadoProceso: "Jefe de Departamento",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addPermiso(formData);
    onSuccess?.(); // Callback para informar que la acción se completó
    alert("Permiso creado correctamente");
    onClose?.(); // Llama a la función para cerrar el modal
  };

  return (
    <div className="crearSolicitudP fixed inset-0 flex items-center justify-center z-50 ">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl">
        <h2 className="text-xl font-bold mb-4 text-center">Crear Solicitud de Permiso</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="empleado" className="block text-sm font-medium mb-1">Empleado</label>
              <input
                name="empleado"
                placeholder="Nombre del empleado"
                value={formData.empleado}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="motivo" className="block text-sm font-medium mb-1">Motivo</label>
              <textarea
                name="motivo"
                placeholder="Motivo del permiso"
                value={formData.motivo}
                onChange={handleChange}
                required
                rows={4}
                className="w-full border border-gray-300 px-4 py-2 rounded-lg resize-y focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="tipo" className="block text-sm font-medium mb-1">Tipo de Permiso</label>
              <select
                name="tipo"
                value={formData.tipo}
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Personal">Permiso personal</option>
                <option value="Vacaciones">Vacaciones</option>
              </select>
            </div>
            <div>
              <label htmlFor="fechaInicio" className="block text-sm font-medium mb-1">Fecha Inicio</label>
              <input
                name="fechaInicio"
                type="date"
                value={formData.fechaInicio}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="fechaFin" className="block text-sm font-medium mb-1">Fecha Fin</label>
              <input
                name="fechaFin"
                type="date"
                value={formData.fechaFin}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex justify-between mt-6">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Crear Solicitud
            </button>
            <button
              type="button"
              onClick={onClose} // Llama a la función para cerrar el modal
              className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700"
            >
              Cerrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormularioPermiso;
