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
    <div className="crearSolicitudP fixed inset-0 flex items-center justify-center z-50 bg-opacity-50 backdrop-blur-sm p-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-4xl border border-gray-100 max-h-[95vh] overflow-y-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-2">
            Crear Solicitud de Permiso
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-sky-500 to-sky-900 mx-auto rounded-full"></div>
        </div>
        
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-center space-x-3">
            <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs font-bold">!</span>
            </div>
            <span>{error}</span>
          </div>
        )}
        
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Empleado */}
            <div className="space-y-2">
              <label
                htmlFor="empleado"
                className="block text-sm font-semibold text-gray-700 mb-2"
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
                    <div className="relative">
                      <input
                        id="empleado"
                        name="empleado"
                        placeholder="Nombre del empleado"
                        value={state.value}
                        onChange={(e) => handleChange(e.target.value)}
                        onBlur={handleBlur}
                        disabled={true}
                        required
                        className="w-full bg-gray-50 border-2 border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 font-medium text-gray-600"
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                      </div>
                    </div>
                    {state.meta.errors && (
                      <span className="text-red-500 text-sm mt-2 block">
                        {state.meta.errors.join(", ")}
                      </span>
                    )}
                  </div>
                )}
              </form.Field>
            </div>

            {/* Tipo de permiso */}
            <div className="space-y-2">
              <label htmlFor="tipo" className="block text-sm font-semibold text-gray-700 mb-2">
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
                    <div className="relative">
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
                        className="w-full bg-white border-2 border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 font-medium text-gray-700 appearance-none cursor-pointer"
                      >
                        <option value="Permiso personal">Permiso personal</option>
                        <option value="Vacaciones">Vacaciones</option>
                        <option value="Asuntos medicos">Asuntos Médicos</option>
                      </select>
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                    {state.meta.errors && (
                      <span className="text-red-500 text-sm mt-2 block">
                        {state.meta.errors.join(", ")}
                      </span>
                    )}
                  </div>
                )}
              </form.Field>
            </div>

            {/* Fecha Inicio */}
            <div className="space-y-2">
              <label
                htmlFor="fechaInicio"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Fecha de Inicio
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
                    <div className="relative">
                      <input
                        id="fechaInicio"
                        name="fechaInicio"
                        type="date"
                        value={state.value}
                        onChange={(e) => handleChange(e.target.value)}
                        onBlur={handleBlur}
                        required
                        className="w-full bg-white border-2 border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 font-medium text-gray-700"
                      />
                     
                    </div>
                    {state.meta.errors && (
                      <span className="text-red-500 text-sm mt-2 block">
                        {state.meta.errors.join(", ")}
                      </span>
                    )}
                  </div>
                )}
              </form.Field>
            </div>

            {/* Fecha Fin */}
            <div className="space-y-2">
              <label htmlFor="fechaFin" className="block text-sm font-semibold text-gray-700 mb-2">
                Fecha de Finalización
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
                    <div className="relative">
                      <input
                        id="fechaFin"
                        name="fechaFin"
                        type="date"
                        value={state.value}
                        onChange={(e) => handleChange(e.target.value)}
                        onBlur={handleBlur}
                        required
                        className="w-full bg-white border-2 border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 font-medium text-gray-700"
                      />
                     
                    </div>
                    {state.meta.errors && (
                      <span className="text-red-500 text-sm mt-2 block">
                        {state.meta.errors.join(", ")}
                      </span>
                    )}
                  </div>
                )}
              </form.Field>
            </div>
          </div>

          {/* Motivo - Campo completo */}
          <div className="space-y-2">
            <label htmlFor="motivo" className="block text-sm font-semibold text-gray-700 mb-2">
              Motivo del Permiso
            </label>
            <form.Field
              name="motivo"
              validators={{
                onChange: ({ value }) => (!value ? "El motivo es requerido" : undefined),
              }}
            >
              {({ state, handleChange, handleBlur }) => (
                <div>
                  <div className="relative">
                    <textarea
                      id="motivo"
                      name="motivo"
                      placeholder="Describe el motivo de tu solicitud de permiso..."
                      value={state.value}
                      onChange={(e) => handleChange(e.target.value)}
                      onBlur={handleBlur}
                      required
                      rows={4}
                      className="w-full bg-white border-2 border-gray-200 px-4 py-3 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 font-medium text-gray-700"
                    />
                    <div className="absolute right-3 top-3 pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </div>
                  </div>
                  {state.meta.errors && (
                    <span className="text-red-500 text-sm mt-2 block">
                      {state.meta.errors.join(", ")}
                    </span>
                  )}
                </div>
              )}
            </form.Field>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-6 border-t border-gray-100">
            <button
              type="submit"
              className="bg-gradient-to-r from-sky-600 to-sky-900 text-white px-8 py-3 rounded-xl hover:from-sky-500 hover:to-sky-900 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span>Crear Solicitud</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-8 py-3 rounded-xl transition-all duration-200 font-semibold hover:shadow-md flex items-center justify-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span>Cancelar</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormularioPermiso;