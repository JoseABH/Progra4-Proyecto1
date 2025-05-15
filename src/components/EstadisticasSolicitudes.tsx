import React, { useEffect, useState } from "react";
import {
  FaClipboardList,
  FaHourglassHalf,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

import { permisoService } from "../services/permisosService";
import { Permiso } from "../types/Permiso";

export const EstadisticasSolicitudes = () => {
  const [permisos, setPermisos] = useState<Permiso[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    permisoService
      .getAll()
      .then((data) => {
        setPermisos(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Error al cargar solicitudes");
        setLoading(false);
      });
  }, []);

  if (loading)
    return <div className="p-6 text-center text-gray-500">Cargando...</div>;

  if (error)
    return (
      <div className="p-6 text-center text-red-600 font-semibold">{error}</div>
    );

  const total = permisos.length;
  const pendientes = permisos.filter((p) => p.estadoGeneral === "Pendiente").length;
  const aprobadas = permisos.filter((p) => p.estadoGeneral === "Aprobado").length;
  const rechazadas = permisos.filter((p) => p.estadoGeneral === "Rechazado").length;

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
  <h2 className="text-xl font-bold text-center text-gray-800 mb-6">Estadísticas de Solicitudes</h2>

  <div className="grid grid-cols-2 gap-4">
    {/* Total */}
    <div className="flex items-center gap-4 bg-blue-50 rounded-xl p-4 shadow-sm hover:shadow-md transition">
      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100">
        <FaClipboardList className="text-blue-700 w-6 h-6" />
      </div>
      <div>
        <p className="text-sm text-blue-800">Total</p>
        <p className="text-xl font-bold text-blue-900">{total}</p>
      </div>
    </div>

    {/* Pendientes */}
    <div className="flex items-center gap-4 bg-yellow-50 rounded-xl p-4 shadow-sm hover:shadow-md transition">
      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-yellow-100">
        <FaHourglassHalf className="text-yellow-700 w-6 h-6" />
      </div>
      <div>
        <p className="text-sm text-yellow-800">Pendientes</p>
        <p className="text-xl font-bold text-yellow-900">{pendientes}</p>
      </div>
    </div>

    {/* Aprobadas */}
    <div className="flex items-center gap-4 bg-green-50 rounded-xl p-4 shadow-sm hover:shadow-md transition">
      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-green-100">
        <FaCheckCircle className="text-green-700 w-6 h-6" />
      </div>
      <div>
        <p className="text-sm text-green-800">Aprobadas</p>
        <p className="text-xl font-bold text-green-900">{aprobadas}</p>
      </div>
    </div>

    {/* Rechazadas */}
    <div className="flex items-center gap-4 bg-red-50 rounded-xl p-4 shadow-sm hover:shadow-md transition">
      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-red-100">
        <FaTimesCircle className="text-red-700 w-6 h-6" />
      </div>
      <div>
        <p className="text-sm text-red-800">Rechazadas</p>
        <p className="text-xl font-bold text-red-900">{rechazadas}</p>
      </div>
    </div>
  </div>
</div>

  );
};
