// src/views/UserDashboard.tsx
import { useState, useEffect, useContext } from 'react';
import {
  FaEnvelope,
  FaBuilding,
  FaBriefcase,
  FaRegIdCard,
} from 'react-icons/fa';

import { EstadisticasSolicitudes } from "./EstadisticasSolicitudes";
import { EstadisticasEmpleados } from "../components/EstadisticasEmpleados";
import { AuthContext } from '../Context/AuthContext';
import { getEmpleadoById } from '../services/GestionEmpleadosService';
import { Employee } from '../types/employee';

export const UserDashboard = () => {
  const { user } = useContext(AuthContext)!;

  const [empleado, setEmpleado] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const emp = await getEmpleadoById(Number(user?.id));
  //       setEmpleado(emp);
  //     } catch {
  //       setError('Error cargando datos del empleado');
  //     } finally {
  //       setLoading(false);
  //     }
  //   })();
  // }, [user?.name]);

  if (loading) return <div className="p-8"><div className="p-6 flex  justify-center items-center h-screen">
    <div className="flex items-center justify-center h-screen">
      <div className="w-80 p-5 rounded-xl shadow-lg bg-white animate-pulse space-y-3">
        <div className="h-6 w-2/3 bg-slate-300 rounded" />
        <div className="h-4 w-full bg-slate-300 rounded" />
        <div className="h-4 w-5/6 bg-slate-300 rounded" />
        <div className="h-4 w-4/6 bg-slate-300 rounded" />
        <div className="h-4 w-2/3 bg-slate-300 rounded" />
        <p>Cargando datos...</p>
      </div>

    </div>

  </div></div>;
  if (error) return <div className="p-8 text-red-600">{error}</div>;
  if (!empleado) return <div className="p-8">Empleado no encontrado.</div>;

  //const initials = empleado.nombre
  const initials = user?.name
    .split(' ')
    .map((n: string) => n[0])
    .slice(0, 2)
    .join('');
  const randomColor = `hsl(${Math.floor(Math.random() * 360)}, 70%, 80%)`;
  return (
    <div className="p-6 min-h-full bg-gray-50">
      {/* Contenedor principal */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Columna izquierda: bienvenida + info */}
        <div className="flex-1 space-y-6">
          {/* Bienvenida */}
          <div>
            <h1 className="text-4xl font-bold mb-2">Bienvenido, {empleado.nombre}</h1>
            <p className="text-gray-600">Gestione su información personal.</p>
          </div>

          {/* Información personal */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm relative">
            <span className="absolute top-6 right-6 px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs">
              {empleado.estado}
            </span>
            <h2 className="text-lg font-semibold mb-4">Información Personal</h2>

            <div className="flex items-center space-x-4 mb-6">
              <div
                className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-xl text-gray-500"
                style={{ backgroundColor: randomColor }}
              >
                {initials}
              </div>
              <div>
                <h3 className="text-xl font-bold">{empleado.nombre}</h3>
                <p className="text-gray-500">{empleado.cargo}</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center border border-gray-200 rounded-lg p-4">
                <FaEnvelope className="text-gray-400 w-5 h-5" />
                <div className="ml-3">
                  <p className="text-xs text-gray-500">Correo electrónico</p>
                  <p className="text-gray-700">{empleado.correo}</p>
                </div>
              </div>
              <div className="flex items-center border border-gray-200 rounded-lg p-4">
                <FaBuilding className="text-gray-400 w-5 h-5" />
                <div className="ml-3">
                  <p className="text-xs text-gray-500">Departamento</p>
                  <p className="text-gray-700">{empleado.departamento}</p>
                </div>
              </div>
              <div className="flex items-center border border-gray-200 rounded-lg p-4">
                <FaBriefcase className="text-gray-400 w-5 h-5" />
                <div className="ml-3">
                  <p className="text-xs text-gray-500">Cargo</p>
                  <p className="text-gray-700">{empleado.cargo}</p>
                </div>
              </div>
              <div className="flex items-center border border-gray-200 rounded-lg p-4">
                <FaRegIdCard className="text-gray-400 w-5 h-5" />
                <div className="ml-3">
                  <p className="text-xs text-gray-500">ID</p>
                  <p className="text-gray-700">{empleado.id}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Columna derecha: estadísticas */}
        <div className="flex flex-col gap-12 w-full lg:w-80">
          <EstadisticasEmpleados />
          <EstadisticasSolicitudes />
        </div>
      </div>
    </div>




  );
};
