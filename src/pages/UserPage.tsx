
import UserTable from '../components/UserTable';

export default function UserPage() {
  return (


       <div className="p-6">
      <header className="mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900">Gestión de usuarios</h1>
        <p className="mt-2 text-gray-600">
          Bienvenido, Administrador. Aquí puedes Aquí puedes buscar, añadir o editar usuarios.
        </p>
      </header>
      <UserTable />
    </div>
  );
}