import { Permiso, EstadoProceso } from "../types/Permiso";
import { usePermisos } from "../hooks/usePermisos";

const pasosProceso: EstadoProceso[] = [
  "Jefe de Departamento",
  "Recursos Humanos",
  "Dirección",
];

export default function ModalRevision({
  permiso,
  onClose,
}: {
  permiso: Permiso;
  onClose: () => void;
}) {
  const { updatePermiso } = usePermisos();

  const avanzarProceso = () => {
    const actualIndex = pasosProceso.indexOf(permiso.estadoProceso);
    const esUltimo = actualIndex === pasosProceso.length - 1;

    const actualizado: Permiso = {
      ...permiso,
      estadoProceso: esUltimo
        ? permiso.estadoProceso
        : pasosProceso[actualIndex + 1],
      estadoGeneral: esUltimo ? "Aprobado" : "Pendiente",
    };

    updatePermiso(permiso.id, actualizado);
    onClose();
  };

  const rechazar = () => {
    const actualizado: Permiso = {
      ...permiso,
      estadoGeneral: "Rechazado",
    };

    updatePermiso(permiso.id, actualizado);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-2xl p-6 rounded-lg shadow-lg relative">
        <h2 className="text-xl font-semibold mb-4">Revisión de Solicitud</h2>
        <p><strong>Empleado:</strong> {permiso.empleado}</p>
        <p><strong>Tipo:</strong> {permiso.tipo}</p>
        <p><strong>Motivo:</strong> {permiso.motivo}</p>
        <p><strong>Rango de fechas:</strong> {permiso.fechaInicio} a {permiso.fechaFin}</p>
        <p><strong>Estado actual:</strong> {permiso.estadoProceso}</p>
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={rechazar}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Rechazar
          </button>
          <button
            onClick={avanzarProceso}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Aceptar
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
