import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";
import { Permiso } from "../types/Permiso";
import { usePermisos } from "../hooks/usePermisos";

const TablaPermisos = () => {
  const { permisos, loading, deletePermiso } = usePermisos();

  const columns: ColumnDef<Permiso>[] = [
    { accessorKey: "empleado", header: "Empleado" },
    { accessorKey: "motivo", header: "Motivo" },
    { accessorKey: "tipo", header: "Tipo" },
    { accessorKey: "fechaInicio", header: "Fecha Inicio" },
    { accessorKey: "fechaFin", header: "Fecha Fin" },
    {
      accessorKey: "estadoGeneral",
      header: "Estado General",
      cell: info => {
        const value = info.getValue() as Permiso["estadoGeneral"];
        const color =
          value === "Aprobado"
            ? "text-green-600"
            : value === "Rechazado"
            ? "text-red-600"
            : "text-yellow-600";
        return <span className={`font-semibold ${color}`}>{value}</span>;
      },
    },
    { accessorKey: "estadoProceso", header: "Estado de Proceso" },
    {
      id: "acciones",
      header: "Acciones",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <button
            onClick={() => alert(`Editar ID: ${row.original.id}`)}
            className="text-blue-600 hover:underline"
          >
            Editar
          </button>
          <button
            onClick={() => deletePermiso(row.original.id)}
            className="text-red-600 hover:underline"
          >
            Eliminar
          </button>
        </div>

      ),
    },
  ];

  const table = useReactTable({
    data: permisos,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (loading) return <div>Cargando...</div>;

  return (
    <div className="overflow-x-auto border rounded-md shadow-sm bg-white">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th
                  key={header.id}
                  className="px-4 py-2 text-left text-sm font-semibold text-gray-700"
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className="px-4 py-2 text-sm text-gray-800">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablaPermisos;
