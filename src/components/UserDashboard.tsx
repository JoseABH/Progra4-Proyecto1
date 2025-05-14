// src/views/UserDashboard.tsx
import { useState, useEffect, useContext } from 'react';
import {
  FaEnvelope,
 
  FaUserCircle,
} from 'react-icons/fa';


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
    if (!user) return;

    (async () => {
      try {
        const allPerms = await permisoService.getAll();
        // Filtramos por el nombre completo que viene en user.name
        const myPerms = allPerms.filter(p => p.empleado === user.name);
        setSolicitudes(myPerms);
      } catch (e) {
        console.error(e);
        setError('Error cargando permisos');
      } finally {
        setLoading(false);
      }
    })();
  }, [user]);

  if (loading) return <div className="p-8">Cargando datos…</div>;
  if (error)   return <div className="p-8 text-red-600">{error}</div>;
  if (!user)   return <div className="p-8">Usuario no disponible.</div>;

  const pendingCount = solicitudes.filter(s => s.estadoGeneral === 'Pendiente').length;

  const handleCreateSolicitud = () => {
    alert('Aquí abres el formulario para crear una nueva solicitud');
  };

  return (
    <div className="p-8 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="space-y-1 mb-6">
        <h1 className="text-4xl font-bold">
          Bienvenido, {user.name} <FaUserCircle className="inline text-2xl" />
        </h1>
        <p className="text-gray-600">Rol: {user.role}</p>
      </div>

      {/* Tabs */}
      <nav className="flex space-x-2 mb-6">
        {(['perfil','solicitudes'] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 text-sm font-medium rounded-lg border ${
              tab===t
                ? 'bg-white text-blue-600 border-gray-200'
                : 'bg-white text-gray-600 border-transparent'
            }`}
          >
            {t==='perfil' ? 'Mi Perfil' : 'Solicitudes'}
          </button>
        ))}
      </nav>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* === PERFIL === */}
        {tab==='perfil' && (
          <div className="flex-1 bg-white border border-gray-200 rounded-lg p-6 space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-xl text-gray-500">
                {user.name.charAt(0)}
              </div>
              <div>
                <h2 className="text-2xl font-bold">{user.name}</h2>
                <p className="text-gray-500">{user.role}</p>
              </div>
            </div>
            <ul className="space-y-3">
              <li className="flex items-center border border-gray-200 rounded-lg p-4">
                <FaEnvelope className="text-gray-400 w-5 h-5" />
                <div className="ml-3">
                  <p className="text-xs text-gray-500">Correo electrónico</p>
                  <p className="text-gray-700">{user.email}</p>
                </div>
              </li>
              {/* Si dispones de más campos en user (departamento, cargo, etc),
                  agrégalos aquí de manera similar */}
            </ul>
          </div>
        )}

        {/* === SOLICITUDES === 
        {tab==='solicitudes' && (
          <div className="w-full lg:w-80 flex flex-col gap-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Solicitudes</h3>
                <button
                  onClick={handleCreateSolicitud}
                  className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition"
                >
                  + Crear solicitud
                </button>
              </div>

              {solicitudes.length === 0 ? (
                <p className="text-gray-600">No tienes solicitudes.</p>
              ) : (
                <ul className="space-y-3">
                  {solicitudes.map(s => (
                    <li key={s.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{s.tipo}</span>
                        <span className="text-sm text-gray-500">{s.estadoGeneral}</span>
                      </div>
                      <p className="text-sm text-gray-700 mt-1">{s.motivo}</p>
                      <div className="text-xs text-gray-500 mt-1">
                        {s.fechaInicio} – {s.fechaFin}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
              <h3 className="text-lg font-semibold">Resumen</h3>
              <div className="space-y-1">
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <span>Solicitudes pendientes</span>
                  <span className="bg-black text-white text-xs px-2 py-0.5 rounded-full">
                    {pendingCount}
                  </span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-black"
                    style={{ width: `${(pendingCount/10)*100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}*/}
      </div>
    </div>
  );
};
