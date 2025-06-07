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
    <div className="soliacep fixed inset-0 bg-black bg-opacity-50 backdrop-blur-lg flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-4xl p-6 rounded-3xl shadow-2xl relative border border-gray-100 h-fit">
        {/* Header con gradiente decorativo */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
              <FaAddressCard className="text-white w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Revisión de Solicitud</h2>
              <p className="text-gray-500 text-xs">Evalúa y procesa la solicitud de permiso</p>
            </div>
          </div>
          <div className="w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
        </div>
        
        {/* Información del permiso con cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
          {/* Card Empleado */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-100">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 bg-blue-500 rounded-lg">
                <FaUserCircle className="text-white w-4 h-4" />
              </div>
              <span className="font-semibold text-gray-900 text-sm">Empleado</span>
            </div>
            <p className="text-gray-700 font-medium text-base">{permiso.empleado}</p>
          </div>

          {/* Card Tipo */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-100">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 bg-purple-500 rounded-lg">
                <TbFiles className="text-white w-4 h-4" />
              </div>
              <span className="font-semibold text-gray-900 text-sm">Tipo</span>
            </div>
            <p className="text-gray-700 font-medium text-base">{permiso.tipo}</p>
          </div>

          {/* Card Estado */}
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-4 rounded-xl border border-orange-100">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 bg-orange-500 rounded-lg">
                <BsBroadcast className="text-white w-4 h-4" />
              </div>
              <span className="font-semibold text-gray-900 text-sm">Estado</span>
            </div>
            <span className="px-2 py-1 bg-orange-200 text-orange-800 rounded-full text-xs font-semibold">
              {permiso.estadoProceso}
            </span>
          </div>
        </div>

        {/* Fechas y Motivo en fila */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Card Fechas */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl border border-green-100">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-1.5 bg-green-500 rounded-lg">
                <FaCalendarAlt className="text-white w-4 h-4" />
              </div>
              <span className="font-semibold text-gray-900 text-sm">Período</span>
            </div>
            <div className="text-gray-700 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Desde:</span>
                <span className="font-semibold">{permiso.fechaInicio}</span>
              </div>
              <div className="flex justify-between items-center mt-1">
                <span className="text-gray-600">Hasta:</span>
                <span className="font-semibold">{permiso.fechaFin}</span>
              </div>
            </div>
          </div>

          {/* Card Motivo */}
          <div className="bg-gradient-to-br from-gray-50 to-slate-50 p-4 rounded-xl border border-gray-100">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-1.5 bg-gray-500 rounded-lg">
                <FaFileSignature className="text-white w-4 h-4" />
              </div>
              <span className="font-semibold text-gray-900 text-sm">Motivo</span>
            </div>
            <div className="bg-white p-3 rounded-lg border border-gray-200 max-h-20 overflow-y-auto">
              <p className="text-gray-700 text-sm leading-relaxed">{permiso.motivo}</p>
            </div>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="flex flex-col sm:flex-row justify-center gap-3 pt-4 border-t border-gray-200">
          <button
            onClick={rechazar}
            className="group bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-2.5 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2 font-semibold text-sm"
          >
            <FaCalendarTimes className="group-hover:scale-110 transition-transform duration-200 w-4 h-4" />
            <span>Rechazar</span>
          </button>
          
          <button
            onClick={avanzarProceso}
            className="group bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white px-6 py-2.5 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2 font-semibold text-sm"
          >
            <FaCalendarCheck className="group-hover:scale-110 transition-transform duration-200 w-4 h-4" />
            <span>Aprobar</span>
          </button>
          
          <button
            onClick={onClose}
            className="group bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2.5 rounded-xl transition-all duration-200 hover:shadow-md flex items-center justify-center gap-2 font-semibold border border-gray-200 text-sm"
          >
            <MdCancel className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
            <span>Cancelar</span>
          </button>
        </div>
      </div>
    </div>
  );
}