import React, { useEffect, useState } from "react";
import { FaUsers, FaUserCheck, FaUserTimes, FaUserClock } from "react-icons/fa";

import { getEmpleados } from "../services/GestionEmpleadosService";
import { Employee } from "../types/employee";

export const EstadisticasEmpleados = () => {
  const [empleados, setEmpleados] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getEmpleados()
      .then((data) => {
        setEmpleados(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Error al cargar empleados");
        setLoading(false);
      });
  }, []);

  if (loading)
    return <div className="p-6 text-center text-gray-500">Cargando...</div>;

  if (error)
    return (
      <div className="p-6 text-center text-red-600 font-semibold">{error}</div>
    );

  const total = empleados.length;
 const activos = empleados.filter((e) => e.estado === "Activo").length;
const inactivos = empleados.filter((e) => e.estado === "Ausente").length;
const pendientes = empleados.filter((e) => e.estado === "Terminado").length;


  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
  <h2 className="text-xl font-bold text-center text-gray-800 mb-6">Estadísticas de Empleados</h2>

  <div className="grid grid-cols-2 gap-4">
    {/* Total */}
    <div className="flex items-center gap-4 bg-blue-50 rounded-xl p-4 shadow-sm hover:shadow-md transition">
      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100">
        <FaUsers className="text-blue-700 w-6 h-6" />
      </div>
      <div>
        <p className="text-sm text-blue-800">Total</p>
        <p className="text-xl font-bold text-blue-900">{total}</p>
      </div>
    </div>

    {/* Activos */}
    <div className="flex items-center gap-4 bg-green-50 rounded-xl p-4 shadow-sm hover:shadow-md transition">
      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-green-100">
        <FaUserCheck className="text-green-700 w-6 h-6" />
      </div>
      <div>
        <p className="text-sm text-green-800">Activos</p>
        <p className="text-xl font-bold text-green-900">{activos}</p>
      </div>
    </div>

    {/* Inactivos */}
    <div className="flex items-center gap-4 bg-red-50 rounded-xl p-4 shadow-sm hover:shadow-md transition">
      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-red-100">
        <FaUserTimes className="text-red-700 w-6 h-6" />
      </div>
      <div>
        <p className="text-sm text-red-800">Inactivos</p>
        <p className="text-xl font-bold text-red-900">{inactivos}</p>
      </div>
    </div>

    {/* Pendientes */}
    <div className="flex items-center gap-4 bg-yellow-50 rounded-xl p-4 shadow-sm hover:shadow-md transition">
      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-yellow-100">
        <FaUserClock className="text-yellow-700 w-6 h-6" />
      </div>
      <div>
        <p className="text-sm text-yellow-800">Pendientes</p>
        <p className="text-xl font-bold text-yellow-900">{pendientes}</p>
      </div>
    </div>
  </div>
</div>

  );
};
