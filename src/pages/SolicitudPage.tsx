import { useState, useContext } from "react";
import { usePermisos } from "../hooks/usePermisos";
import ModalRevision from "../components/ModalRevision";
import { AuthContext } from "../Context/AuthContext";
import ListaSolicitudes from "../components/ListaSolicitudes";

const SolicitudesPage = () => {
  const { permisos, loading } = usePermisos();
  const [seleccionado, setSeleccionado] = useState<number | null>(null);
  const { user } = useContext(AuthContext)!;

  if (loading) {
    return (
      <div className="p-6 flex justify-center items-center h-screen">
        <div className="w-80 p-5 rounded-xl shadow-lg bg-white animate-pulse space-y-3">
          <div className="h-6 w-2/3 bg-slate-300 rounded" />
          <div className="h-4 w-full bg-slate-300 rounded" />
          <div className="h-4 w-5/6 bg-slate-300 rounded" />
          <div className="h-4 w-4/6 bg-slate-300 rounded" />
          <div className="h-4 w-2/3 bg-slate-300 rounded" />
          <p className="text-gray-500">Cargando solicitudes...</p>
        </div>
      </div>
    );
  }

  const pendientes = permisos.filter(
    (p) => p.estadoProceso === user?.role && p.estadoGeneral === "Pendiente"
  );

  const otras = permisos.filter(
    (p) => p.estadoProceso !== user?.role || p.estadoGeneral !== "Pendiente"
  );

  const permisoActual = permisos.find((p) => p.id === seleccionado);

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-12 text-black">
      <h1 className="text-3xl font-extrabold text-center text-gray-800 tracking-tight">
        Solicitudes de Permiso
      </h1>

      <ListaSolicitudes
        titulo="Pendientes de revisión"
        permisos={pendientes}
        revisable
        onSeleccionar={setSeleccionado}
      />

      <ListaSolicitudes titulo="Otras solicitudes" permisos={otras} />

      {permisoActual && (
        <ModalRevision permiso={permisoActual} onClose={() => setSeleccionado(null)} />
      )}
    </div>
  );
};

export default SolicitudesPage;
