import { Permiso } from "../types/Permiso";

interface Props {
  permiso: Permiso;
  onRevisar?: () => void;
  revisable?: boolean;
}

const SolicitudCard = ({ permiso, onRevisar, revisable = false }: Props) => {
  return (
    <div className="bg-white border border-gray-200 shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-lg font-semibold text-gray-800">{permiso.empleado}</p>
          <p className="text-sm text-gray-500 italic">{permiso.tipo}</p>
          <p className="text-sm text-gray-500">
            {permiso.fechaInicio} &mdash; {permiso.fechaFin}
          </p>
        </div>
        <div>
          <span className="inline-block px-3 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full shadow-sm">
            {permiso.estadoProceso}
          </span>
        </div>
      </div>

      <p className="mt-4 text-gray-700 leading-relaxed">{permiso.motivo}</p>

      {revisable && (
        <div className="mt-6 text-right">
          <button
            onClick={onRevisar}
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2 rounded-md transition duration-200 shadow-sm"
          >
            Revisar
          </button>
        </div>
      )}
    </div>
  );
};

export default SolicitudCard;
