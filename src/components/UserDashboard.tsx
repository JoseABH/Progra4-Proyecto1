// src/views/UserDashboard.tsx
import { useState, useEffect, useContext } from 'react';
import {
  FaEnvelope,
  FaBuilding,
  FaBriefcase,
  FaCalendarAlt,
  FaUserCircle,
} from 'react-icons/fa';
import { FiChevronRight } from 'react-icons/fi';

import { AuthContext }    from '../Context/AuthContext';
import { permisoService } from '../services/permisosService';
import { Permiso }        from '../types/Permiso';

export const UserDashboard = () => {
  const { user } = useContext(AuthContext)!;

  const [tab, setTab]                 = useState<'perfil'|'solicitudes'>('perfil');
  const [solicitudes, setSolicitudes] = useState<Permiso[]>([]);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState<string|null>(null);

  useEffect(() => {
    (async () => {
      try {
        const all = await permisoService.getAll();
        setSolicitudes(all.filter(p => p.empleado === user.name));
      } catch {
        setError('Error cargando permisos');
      } finally {
        setLoading(false);
      }
    })();
  }, [user.name]);

  if (loading) return <div className="p-8">Cargando datos…</div>;
  if (error)   return <div className="p-8 text-red-600">{error}</div>;

  const pendingCount = solicitudes.filter(s => s.estadoGeneral === 'Pendiente').length;
  const activeCount  = user.activeProjects ?? 0;
  const pctPend      = solicitudes.length ? (pendingCount/solicitudes.length)*100 : 0;
 

  // Iniciales para el avatar
  const initials = user.name
    .split(' ')
    .map((n: string) => n[0])
    .slice(0,2)
    .join('');

  return (
    <div className="p-8 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="space-y-1 mb-6">
        <h1 className="text-4xl font-bold">
          Bienvenido, {user.name} <FaUserCircle className="inline text-2xl" />
        </h1>
        <p className="text-gray-600">Gestione su información y solicitudes.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* PERFIL */}
        <div className="flex-1 relative">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <span className="absolute top-6 right-6 px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs">
              {user.status}
            </span>
            <h2 className="text-lg font-semibold mb-4">Información Personal</h2>

            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-xl text-gray-500">
                {initials}
              </div>
              <div>
                <h3 className="text-xl font-bold">{user.name}</h3>
                <p className="text-gray-500">{user.cargo}</p>
              </div>
            </div>

            <div className="space-y-3">
              {/* Email */}
              <div className="flex items-center border border-gray-200 rounded-lg p-4">
                <FaEnvelope className="text-gray-400 w-5 h-5" />
                <div className="ml-3">
                  <p className="text-xs text-gray-500">Correo electrónico</p>
                  <p className="text-gray-700">{user.email}</p>
                </div>
              </div>

              {/* Departamento */}
              <div className="flex items-center border border-gray-200 rounded-lg p-4">
                <FaBuilding className="text-gray-400 w-5 h-5" />
                <div className="ml-3">
                  <p className="text-xs text-gray-500">Departamento</p>
                  <p className="text-gray-700">{user.departamento}</p>
                </div>
              </div>

              {/* Cargo */}
              <div className="flex items-center border border-gray-200 rounded-lg p-4">
                <FaBriefcase className="text-gray-400 w-5 h-5" />
                <div className="ml-3">
                  <p className="text-xs text-gray-500">Cargo</p>
                  <p className="text-gray-700">{user.cargo}</p>
                </div>
              </div>

              {/* Fecha de ingreso */}
              <div className="flex items-center border border-gray-200 rounded-lg p-4">
                <FaCalendarAlt className="text-gray-400 w-5 h-5" />
                <div className="ml-3">
                  <p className="text-xs text-gray-500">Fecha de ingreso</p>
                  <p className="text-gray-700">{user.fechaIngreso}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ACCIONES RÁPIDAS + RESUMEN */}
        <div className="w-full lg:w-80 flex flex-col gap-6">
          
          

          {/* Resumen */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Resumen</h3>
            <div className="space-y-4">
              {/* Pendientes */}
              <div>
                <div className="flex justify-between items-center text-sm text-gray-600 mb-1">
                  <span>Solicitudes pendientes</span>
                  <span className="bg-black text-white text-xs px-2 py-0.5 rounded-full">
                    {pendingCount}
                  </span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-black" style={{ width: `${pctPend}%` }} />
                </div>
              </div>
            
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                 
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    
  );
};
