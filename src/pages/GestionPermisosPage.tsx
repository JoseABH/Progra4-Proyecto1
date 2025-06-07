import { useContext } from "react";
import TablaPermisos from "../components/TablaPermisos";
import { UserDashboard } from "../components/UserDashboard";
import { AuthContext, } from "../Context/AuthContext"
const PermisosPage = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('Login debe estar dentro de un AuthProvider')
  }
  const { user } = context
  return (
    <>
      {user?.role === "Jefe de RRHH" ?
        <div className="p-6">
          <header className="mb-8">
            <h1 className="text-4xl font-extrabold text-gray-900">Vista de solicitides</h1>
            <p className="mt-2 text-gray-600">
              Bienvenido, Administrador. Aquí puedes visualizar las solicitudes de permisos.
            </p>
          </header>
          <TablaPermisos />
        </div>
        : <UserDashboard />}

    </>


  );
};

export default PermisosPage;
