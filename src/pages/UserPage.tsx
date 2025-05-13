
import UserTable from '../components/UserTable';

export default function UserPage() {
  return (
    <div className="">
      <div className="">
        <h1 className="">Gestión de usuarios </h1>
        <p className="">Administra eficientemente todos los perfiles y solicitudes del sistema.</p>

        <UserTable/>
      </div>
    </div>
  );
}