
import { useContext } from 'react';
import UserTable from '../components/UserTable';
import { AuthContext } from "../Context/AuthContext"
import { UserDashboard } from '../components/UserDashboard';

export default function UserPage() {
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
            <h1 className="text-4xl font-extrabold text-gray-900">Gestión de usuarios</h1>
            <p className="mt-2 text-gray-600">
              Bienvenido, Administrador. Aquí puedes Aquí puedes buscar, añadir o editar usuarios.
            </p>
          </header>
          <UserTable />
        </div>
        : <UserDashboard />}

    </>
  );
}