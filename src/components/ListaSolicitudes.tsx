import SolicitudCard from "./SolicitudCard";
import { Permiso } from "../types/Permiso";

interface Props {
  titulo: string;
  permisos: Permiso[];
  revisable?: boolean;
  onSeleccionar?: (id: number) => void;
}

const ListaSolicitudes = ({ titulo, permisos, revisable = false, onSeleccionar }: Props) => {
  return (
    <section>
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">{titulo}</h2>

      {permisos.length === 0 ? (
        <p className="text-gray-500 text-center">No hay solicitudes.</p>
      ) : (
        <div className="space-y-6">
          {permisos.map((permiso) => (
            <SolicitudCard
              key={permiso.id}
              permiso={permiso}
              revisable={revisable}
              onRevisar={() => onSeleccionar?.(permiso.id)}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default ListaSolicitudes;
