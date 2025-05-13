import { useState } from "react";
import { usePermisos } from "../hooks/usePermisos";
import ModalRevision from "../components/ModalRevision";

const SolicitudesPage = () => {
  const { permisos, loading } = usePermisos();
  const [seleccionado, setSeleccionado] = useState<number | null>(null);

  const permisoActual = permisos.find((p) => p.id === seleccionado);

  if (loading) return <p className="p-6">Cargando solicitudes...</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6 text-black">
      <h1 className="text-2xl font-bold text-center">Solicitudes</h1>
      <div className="space-y-4">
        {permisos.map((permiso) => (
          <div key={permiso.id} className="bg-white shadow rounded p-4">
            <div className="flex justify-between">
              <div>
                <p><strong>{permiso.empleado}</strong> - {permiso.tipo}</p>
                <p className="text-sm text-gray-600">{permiso.fechaInicio} a {permiso.fechaFin}</p>
              </div>
              <div>
                <span className="px-2 py-1 text-xs rounded bg-yellow-100 text-yellow-800">
                  {permiso.estadoProceso}
                </span>
              </div>
            </div>
            <p className="mt-2 text-gray-700">{permiso.motivo}</p>
            {permiso.estadoGeneral === "Pendiente" && (
              <div className="mt-4 text-right">
                <button
                  onClick={() => setSeleccionado(permiso.id)}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Revisar
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
      {permisoActual && (
        <ModalRevision permiso={permisoActual} onClose={() => setSeleccionado(null)} />
      )}
    </div>
  );
};

export default SolicitudesPage;
