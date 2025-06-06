import { useContext, useState } from "react";
import { useForm } from "@tanstack/react-form";
import { Permiso } from "../types/Permiso";
import { usePermisos } from "../hooks/usePermisos";
import { AuthContext } from "../Context/AuthContext";

const FormularioPermiso = ({
  onSuccess,
  onClose,
}: {
  onSuccess?: () => void;
  onClose?: () => void;
}) => {
  const { addPermiso } = usePermisos();
  const { user } = useContext(AuthContext)!;
  const [error, setError] = useState<string | null>(null);

  // Determinar estadoProceso según rol actual (ajusta si cambias lógica)
  const proceso =
    user?.role === "Usuario Comun"
      ? "Jefe de Departamento"
      : user?.role === "Jefe de Departamento"
      ? "Jefe de RRHH"
      : "Jefe de RRHH";

  const form = useForm<Omit<Permiso, "id">>({
    defaultValues: {
      empleado: user?.name,
      motivo: "",
      tipo: "Permiso personal" as const,
      fechaInicio: "",
      fechaFin: "",
      estadoGeneral: "Pendiente",
      estadoProceso: proceso,
    },
    onSubmit: async ({ value }) => {
      setError(null);
      try {
        await addPermiso(value); // addPermiso debe hacer POST al backend con la data
        onSuccess?.();
        alert("Permiso creado correctamente");
        onClose?.();
      } catch (e: any) {
        // Mostrar error si falla la creación
        setError(e?.message || "Error al crear la solicitud");
      }
    },
  });

  return (
    <div className="crearSolicitudP fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl">
        <h2 className="text-xl font-bold mb-4 text-center">
          Crear Solicitud de Permiso
        </h2>
        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{error}</div>
        )}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-4"
        >
          {/* Campos del formulario (idénticos a lo que tienes) */}
          {/* Empleado */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="empleado"
                className="block text-sm font-medium mb-1"
              >
                Empleado
              </label>
              <form.Field
                name="empleado"
                validators={{
                  onChange: ({ value }) => (!value ? "El empleado es requerido" : undefined),
                }}
              >
                {({ state, handleChange, handleBlur }) => (
                  <div>
                    <input
                      id="empleado"
                      name="empleado"
                      placeholder="Nombre del empleado"
                      value={state.value}
                      onChange={(e) => handleChange(e.target.value)}
                      onBlur={handleBlur}
                      disabled={true}
                      required
                      className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {state.meta.errors && (
                      <span className="text-red-500 text-xs mt-1">
                        {state.meta.errors.join(", ")}
                      </span>
                    )}
                  </div>
                )}
              </form.Field>
            </div>
            {/* Motivo */}
            <div>
              <label htmlFor="motivo" className="block text-sm font-medium mb-1">
                Motivo
              </label>
              <form.Field
                name="motivo"
                validators={{
                  onChange: ({ value }) => (!value ? "El motivo es requerido" : undefined),
                }}
              >
                {({ state, handleChange, handleBlur }) => (
                  <div>
                    <textarea
                      id="motivo"
                      name="motivo"
                      placeholder="Motivo del permiso"
                      value={state.value}
                      onChange={(e) => handleChange(e.target.value)}
                      onBlur={handleBlur}
                      required
                      rows={4}
                      className="w-full border border-gray-300 px-4 py-2 rounded-lg resize-y focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {state.meta.errors && (
                      <span className="text-red-500 text-xs mt-1">
                        {state.meta.errors.join(", ")}
                      </span>
                    )}
                  </div>
                )}
              </form.Field>
            </div>
            {/* Tipo de permiso */}
            <div>
              <label htmlFor="tipo" className="block text-sm font-medium mb-1">
                Tipo de Permiso
              </label>
              <form.Field
                name="tipo"
                validators={{
                  onChange: ({ value }) => (!value ? "El tipo es requerido" : undefined),
                }}
              >
                {({ state, handleChange, handleBlur }) => (
                  <div>
                    <select
                      id="tipo"
                      name="tipo"
                      value={state.value}
                      onChange={(e) =>
                        handleChange(
                          e.target.value as "Vacaciones" | "Permiso personal" | "Asuntos medicos"
                        )
                      }
                      onBlur={handleBlur}
                      className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Permiso personal">Permiso personal</option>
                      <option value="Vacaciones">Vacaciones</option>
                      <option value="Asuntos medicos">Asuntos Médicos</option>
                    </select>
                    {state.meta.errors && (
                      <span className="text-red-500 text-xs mt-1">
                        {state.meta.errors.join(", ")}
                      </span>
                    )}
                  </div>
                )}
              </form.Field>
            </div>
            {/* Fecha Inicio */}
            <div>
              <label
                htmlFor="fechaInicio"
                className="block text-sm font-medium mb-1"
              >
                Fecha Inicio
              </label>
              <form.Field
                name="fechaInicio"
                validators={{
                  onChange: ({ value }) =>
                    !value ? "La fecha de inicio es requerida" : undefined,
                }}
              >
                {({ state, handleChange, handleBlur }) => (
                  <div>
                    <input
                      id="fechaInicio"
                      name="fechaInicio"
                      type="date"
                      value={state.value}
                      onChange={(e) => handleChange(e.target.value)}
                      onBlur={handleBlur}
                      required
                      className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {state.meta.errors && (
                      <span className="text-red-500 text-xs mt-1">
                        {state.meta.errors.join(", ")}
                      </span>
                    )}
                  </div>
                )}
              </form.Field>
            </div>
            {/* Fecha Fin */}
            <div>
              <label htmlFor="fechaFin" className="block text-sm font-medium mb-1">
                Fecha Fin
              </label>
              <form.Field
                name="fechaFin"
                validators={{
                  onChange: ({ value, fieldApi }) => {
                    if (!value) return "La fecha de fin es requerida";
                    const fechaInicio = fieldApi.form.getFieldValue("fechaInicio");
                    if (fechaInicio && value < fechaInicio) {
                      return "La fecha de fin no puede ser anterior a la fecha de inicio";
                    }
                    return undefined;
                  },
                }}
              >
                {({ state, handleChange, handleBlur }) => (
                  <div>
                    <input
                      id="fechaFin"
                      name="fechaFin"
                      type="date"
                      value={state.value}
                      onChange={(e) => handleChange(e.target.value)}
                      onBlur={handleBlur}
                      required
                      className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {state.meta.errors && (
                      <span className="text-red-500 text-xs mt-1">
                        {state.meta.errors.join(", ")}
                      </span>
                    )}
                  </div>
                )}
              </form.Field>
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
              onClick={onClose}
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
