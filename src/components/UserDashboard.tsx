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
import { empleadoService } from "../services/GestionEmpleadosService";
import { Employee } from '../types/employee';
import Loading from './Loading';

export const UserDashboard = () => {
  const { user } = useContext(AuthContext)!;

  const [empleado, setEmpleado] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Si no tenemos user o user.id, no hacemos nada
    if (!user || !user.id) {
      setError("Usuario no válido");
      setLoading(false);
      return;
    }

    (async () => {
      setLoading(true);
      try {
        // Convertimos user.id (string) a number antes de pasarlo a getById
        const emp = await empleadoService.getById(Number(user.id));
        setEmpleado(emp);
        setError(null);
      } catch (err) {
        console.error("Error cargando datos del empleado:", err);
        setError("Error cargando datos del empleado");
      } finally {
        setLoading(false);
      }
    })();
  }, [user]);

  if (loading) return <Loading></Loading>;
  if (error) return <div className="p-8 text-red-500 bg-red-50 border border-red-200 rounded-lg mx-6">{error}</div>;
  if (!empleado) return <div className="p-8 text-gray-600 bg-gray-50 border border-gray-200 rounded-lg mx-6">Empleado no encontrado.</div>;

  //const initials = empleado.nombre
  const initials = user?.name
    .split(' ')
    .map((n: string) => n[0])
    .slice(0, 2)
    .join('');
  const randomColor = `hsl(${Math.floor(Math.random() * 360)}, 70%, 80%)`;

  return (
    <div className="p-2 min-h-full bg-gray-50">
      {/* Contenedor principal */}
      <div className="flex flex-col lg:flex-row gap-5">
        {/* Columna izquierda: bienvenida + info */}
        <div className="flex-1 space-y-6">
          {/* Bienvenida */}
          <div className="bg-sky-900 text-white p-4 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-2">
              Bienvenido, {empleado.nombre}
            </h1>
            <p className="text-blue-100">Gestione su información personal.</p>
          </div>

          {/* Información personal */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm relative">
            <span className="absolute top-4 right-4 px-3 py-1 bg-green-500 text-white rounded-full text-xs font-medium">
              {empleado.estado}
            </span>
            
            <h2 className="text-lg font-semibold mb-4 text-gray-800">Información Personal</h2>

            <div className="flex items-center space-x-4 mb-6">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-lg font-bold text-gray-700 border-2 border-gray-200"
                style={{ backgroundColor: randomColor }}
              >
                {initials}
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">{empleado.nombre}</h3>
                <p className="text-blue-600 font-medium">{empleado.cargo}</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                  <FaEnvelope className="text-white w-4 h-4" />
                </div>
                <div className="ml-3">
                  <p className="text-xs text-gray-500 font-medium">Correo electrónico</p>
                  <p className="text-gray-800">{empleado.correo}</p>
                </div>
              </div>
              
              <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                  <FaBuilding className="text-white w-4 h-4" />
                </div>
                <div className="ml-3">
                  <p className="text-xs text-gray-500 font-medium">Departamento</p>
                  <p className="text-gray-800">{empleado.departamento}</p>
                </div>
              </div>
              
              <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                  <FaBriefcase className="text-white w-4 h-4" />
                </div>
                <div className="ml-3">
                  <p className="text-xs text-gray-500 font-medium">Cargo</p>
                  <p className="text-gray-800">{empleado.cargo}</p>
                </div>
              </div>
              
              <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                  <FaRegIdCard className="text-white w-4 h-4" />
                </div>
                <div className="ml-3">
                  <p className="text-xs text-gray-500 font-medium">ID</p>
                  <p className="text-gray-800">{empleado.id}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Columna derecha: estadísticas */}
        <div className="flex flex-col gap-6 w-full lg:w-80">
          {
            user?.role === "Jefe de RRHH" || user?.role === "admin" ? (
              <>
                <EstadisticasEmpleados />
                <EstadisticasSolicitudes />
              </>
            ) : user?.role === "Jefe de Departamento" ? (
              <>
                <EstadisticasSolicitudes />
              </>
            ) : user?.role === "Usuario Comun" ? (
              <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <FaRegIdCard className="text-white w-6 h-6" />
                </div>
                <p className="text-gray-600">No tienes estadísticas disponibles</p>
              </div>
            ) : null
          }
        </div>
      </div>
    </div>
  );
};