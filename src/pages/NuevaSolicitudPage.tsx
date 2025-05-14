import { useState } from "react";
import FormularioPermiso from "../components/FormularioPermiso";
import { PlusCircle, Briefcase, HeartPulse, PlaneTakeoff } from "lucide-react";

const NuevaSolicitudPage = () => {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const abrirFormulario = () => setMostrarFormulario(true);
  const cerrarFormulario = () => setMostrarFormulario(false);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto space-y-10">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">
            Solicitudes de Permiso
          </h1>
          <p className="text-gray-500 mt-2">
            Aquí puedes gestionar tus solicitudes de permisos de forma rápida y sencilla.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="bg-white rounded-xl shadow p-5 text-center">
            <PlaneTakeoff className="mx-auto w-8 h-8 text-blue-600" />
            <h2 className="font-semibold text-lg mt-2">Vacaciones</h2>
            <p className="text-sm text-gray-500">
              Solicita días de descanso programado para vacaciones.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow p-5 text-center">
            <HeartPulse className="mx-auto w-8 h-8 text-red-500" />
            <h2 className="font-semibold text-lg mt-2">Permiso Personal</h2>
            <p className="text-sm text-gray-500">
              Tiempo libre por razones personales o emergencias familiares.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow p-5 text-center">
            <Briefcase className="mx-auto w-8 h-8 text-green-600" />
            <h2 className="font-semibold text-lg mt-2">Asuntos Médicos</h2>
            <p className="text-sm text-gray-500">
              Solicita permiso por citas médicas o enfermedad.
            </p>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={abrirFormulario}
            className="inline-flex items-center gap-2 bg-blue-700 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-800 transition duration-300"
          >
            <PlusCircle className="w-5 h-5" />
            Nueva solicitud
          </button>
        </div>

        {mostrarFormulario && (
          <div className="formsoli w-screen h-screen  fixed inset-0 flex items-center justify-center z-30">
           
            <FormularioPermiso
              onSuccess={cerrarFormulario}
              onClose={cerrarFormulario}
            />
      
          </div>
          
        )}
      </div>
    </div>
  );
};

export default NuevaSolicitudPage;
