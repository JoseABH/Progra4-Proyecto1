import TablaPermisos from "../components/TablaPermisos";

const PermisosPage = () => {
  return (
    <div className="p-6">
      <header className="mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900">Vista de solicitides</h1>
        <p className="mt-2 text-gray-600">
          Bienvenido, Administrador. Aquí puedes visualizar las solicitudes de permisos.
        </p>
      </header>
      <TablaPermisos />
    </div>
  );
};

export default PermisosPage;
