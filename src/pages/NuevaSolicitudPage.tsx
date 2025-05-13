import { useState } from "react";
import FormularioPermiso from "../components/FormularioPermiso";

const NuevaSolicitudPage = () => {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const abrirFormulario = () => setMostrarFormulario(true);
  const cerrarFormulario = () => setMostrarFormulario(false);

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6 text-black">
      <h1 className="text-2xl font-bold text-center">Solicitudes de Permiso</h1>

      <div className="text-center">
        <button
          onClick={abrirFormulario}
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
        >
          Nueva solicitud
        </button>
      </div>

      {mostrarFormulario && (
        <FormularioPermiso
          onSuccess={() => {
            setMostrarFormulario(false); // Cierra el modal tras éxito
            alert("Solicitud creada correctamente");
          }}
          onClose={cerrarFormulario} // Cierra el modal
        />
      )}
    </div>
  );
};

export default NuevaSolicitudPage;
