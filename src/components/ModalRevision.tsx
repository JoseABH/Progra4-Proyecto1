import { Permiso, EstadoProceso } from "../types/Permiso";
import { usePermisos } from "../hooks/usePermisos";
import {
  FaCalendarAlt,
  FaAddressCard,
  FaUserCircle,
  FaFileSignature,
  FaCalendarCheck,
  FaCalendarTimes
} from 'react-icons/fa';
import { BsBroadcast } from "react-icons/bs"
import { TbFiles } from "react-icons/tb";
import { MdCancel } from "react-icons/md";

const pasosProceso: EstadoProceso[] = [
  "Jefe de Departamento",
  "Jefe de RRHH",
];

export default function ModalRevision({
  permiso,
  onClose,
}: {
  permiso: Permiso;
  onClose: () => void;
}) {
  const { updatePermiso } = usePermisos();

  const avanzarProceso = () => {
    const actualIndex = pasosProceso.indexOf(permiso.estadoProceso);
    const esUltimo = actualIndex === pasosProceso.length - 1;

    const actualizado: Permiso = {
      ...permiso,
      estadoProceso: esUltimo
        ? permiso.estadoProceso
        : pasosProceso[actualIndex + 1],
      estadoGeneral: esUltimo ? "Aprobado" : "Pendiente",
    };

    updatePermiso(permiso.id, actualizado);
    onClose();
  };

  const rechazar = () => {
    const actualizado: Permiso = {
      ...permiso,
      estadoGeneral: "Rechazado",
    };

    updatePermiso(permiso.id, actualizado);
    onClose();
  };

  return (
    <div className="soliacep fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
  <div className="bg-white w-2/3 p-8 rounded-2xl shadow-2xl relative animate-fade-in">
    <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2 flex items-center gap-3"><FaAddressCard /> Revisión de Solicitud</h2>
    
    <div className="space-y-3 text-gray-700 text-base">
      <div><p><span className="font-medium text-gray-900 flex gap-2">  <FaUserCircle className="text-gray-500 w-5 h-5" /> Empleado:</span> {permiso.empleado}</p>
      <p><span className="font-medium text-gray-900 flex gap-2"> <TbFiles  className="text-gray-500 w-6 h-6" /> Tipo:</span> {permiso.tipo}</p>
      <p><span className="font-medium text-gray-900 flex gap-2"><FaFileSignature className="text-gray-500 w-5 h-5" /> Motivo:</span> {permiso.motivo}</p>
      <p><span className="font-medium text-gray-900 flex gap-2"> <FaCalendarAlt className="text-gray-500 w-5 h-5" />Rango de fechas:</span> {permiso.fechaInicio} a {permiso.fechaFin}</p>
      <p><span className="font-medium text-gray-900 flex gap-2"><BsBroadcast className="text-gray-500 w-5 h-5" /> Estado actual:</span> {permiso.estadoProceso}</p>

      </div>
      <div>
        
        
      </div>
      
    </div>

    <div className="mt-8 flex justify-end gap-4">
      <button
        onClick={rechazar}
        className="px-5 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl transition-all shadow-md flex items-center gap-2"
      >
        <FaCalendarTimes /> Rechazar
      </button>
      <button
        onClick={avanzarProceso}
        className="px-5 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl transition-all shadow-md flex items-center gap-2"
      >
        <FaCalendarCheck />Aceptar
      </button>
      <button
        onClick={onClose}
        className="px-5 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-xl transition-all shadow flex items-center gap-2"
      >
        <MdCancel className="w-6 h-6" /> Cancelar
      </button>
    </div>
  </div>
</div>

  );
}
