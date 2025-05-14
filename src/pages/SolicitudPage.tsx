import { useState, useContext } from "react";
import { usePermisos } from "../hooks/usePermisos";
import ModalRevision from "../components/ModalRevision";
import { AuthContext } from "../Context/AuthContext";

const SolicitudesPage = () => {
  const { permisos, loading } = usePermisos();
  const [seleccionado, setSeleccionado] = useState<number | null>(null);
  const { user } = useContext(AuthContext)!;

  if (loading)
    return (
      <div className="p-6 flex  justify-center items-center h-screen">
        <div className="flex items-center justify-center h-screen">
          <div className="w-80 p-5 rounded-xl shadow-lg bg-white animate-pulse space-y-3">
            <div className="h-6 w-2/3 bg-slate-300 rounded" />
            <div className="h-4 w-full bg-slate-300 rounded" />
            <div className="h-4 w-5/6 bg-slate-300 rounded" />
            <div className="h-4 w-4/6 bg-slate-300 rounded" />
            <div className="h-4 w-2/3 bg-slate-300 rounded" />
            <p>Cargando solicitudes...</p>
          </div>
          
        </div>

      </div>
    );

  const permisosFiltrados = permisos.filter(
    (p) => p.estadoProceso === user.role
  );

  const permisoActual = permisos.find((p) => p.id === seleccionado);

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8 text-black">
      <h1 className="text-3xl font-extrabold text-center text-gray-800 tracking-tight">
        Solicitudes de Permiso
      </h1>

      <div className="space-y-6">
        {permisosFiltrados.length === 0 ? (
          <div className="text-center text-gray-500 text-lg">
            No hay solicitudes en este estado.
          </div>
        ) : (
          permisosFiltrados.map((permiso) => (
            <div
              key={permiso.id}
              className="bg-white border border-gray-200 shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-lg font-semibold text-gray-800">
                    {permiso.empleado}
                  </p>
                  <p className="text-sm text-gray-500 italic">{permiso.tipo}</p>
                  <p className="text-sm text-gray-500">
                    {permiso.fechaInicio} &mdash; {permiso.fechaFin}
                  </p>
                </div>
                <div>
                  <span className="inline-block px-3 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full shadow-sm">
                    {permiso.estadoProceso}
                  </span>
                </div>
              </div>

              <p className="mt-4 text-gray-700 leading-relaxed">{permiso.motivo}</p>

              {permiso.estadoGeneral === "Pendiente" && (
                <div className="mt-6 text-right">
                  <button
                    onClick={() => setSeleccionado(permiso.id)}
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2 rounded-md transition duration-200 shadow-sm"
                  >
                    Revisar
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {permisoActual && (
        <ModalRevision permiso={permisoActual} onClose={() => setSeleccionado(null)} />
      )}
    </div>
  );
};

export default SolicitudesPage;

