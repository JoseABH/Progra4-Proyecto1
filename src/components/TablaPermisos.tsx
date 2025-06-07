import {useReactTable, getCoreRowModel,flexRender,ColumnDef,} from "@tanstack/react-table";
import { Permiso } from "../types/Permiso";
import { usePermisos } from "../hooks/usePermisos";
import { useState, useMemo } from "react";
import {Trash2 } from "lucide-react";
import Loading from './Loading';
const TablaPermisos = () => {
  const { permisos, loading, deletePermiso } = usePermisos();
  const [filtroGlobal, setFiltroGlobal] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filtrado global
  const permisosFiltrados = useMemo(() => {
    const search = filtroGlobal.toLowerCase();
    return permisos.filter((permiso) =>
      Object.values(permiso).some((valor) =>
        String(valor).toLowerCase().includes(search)
      )
    );
  }, [permisos, filtroGlobal]);

  const pageCount = Math.ceil(permisosFiltrados.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  const permisosPaginados = permisosFiltrados.slice(startIdx, endIdx);

  const columnas: ColumnDef<Permiso>[] = [
    { accessorKey: "empleado", header: "Empleado" },
    { accessorKey: "motivo", header: "Motivo" },
    { accessorKey: "tipo", header: "Tipo" },
    { accessorKey: "fechaInicio", header: "Fecha Inicio" },
    { accessorKey: "fechaFin", header: "Fecha Fin" },
    
    {
      accessorKey: "estadoProceso",
      header: "Estado de Proceso",
      cell: info => {
        const value = info.getValue() as Permiso["estadoProceso"];
        const color = value.includes("Aprobado")
          ? "bg-green-100 text-green-800"
          : value.includes("Rechazado")
          ? "bg-red-100 text-red-800"
          : "bg-yellow-100 text-yellow-800";
        return (
          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${color}`}>
            {value}
          </span>
        );
      },
    },
    {
      accessorKey: "estadoGeneral",
      header: "Estado General",
      cell: info => {
        const value = info.getValue() as Permiso["estadoGeneral"];
        const color =
          value === "Aprobado"
            ? "bg-green-100 text-green-800"
            : value === "Rechazado"
            ? "bg-red-100 text-red-800"
            : "bg-yellow-100 text-yellow-800";
        return (
          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${color}`}>
            {value}
          </span>
        );
      },
    },
    {
      id: "acciones",
      header: () => <div className="text-center">Acciones</div>,
      cell: ({ row }) => (
        <div className="flex justify-center gap-2 text-sm text-gray-700">
          
          <button
            onClick={() => deletePermiso(row.original.id)}
            className="p-1 text-red-600 hover:text-red-800 hover:bg-gray-100 rounded-full transition"
            title="Eliminar"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: permisosFiltrados, //  Usa todos los datos filtrados
    columns: columnas,
    getCoreRowModel: getCoreRowModel(),
  });

  if (loading) return <div className="text-gray-700"><Loading></Loading></div>;

  return (
    <div className="overflow-x-auto bg-white border border-gray-200 rounded-lg p-4">
      <input
        type="text"
        placeholder="Buscar en toda la tabla..."
        className="mb-4 border px-3 py-2 rounded-md w-full md:w-1/2 text-sm text-gray-800"
        value={filtroGlobal}
        onChange={(e) => {
          setFiltroGlobal(e.target.value);
          setCurrentPage(1);
        }}
      />

      <table className="min-w-full text-left">
        <thead className="border-b border-gray-200 bg-white">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-6 py-3 text-sm font-medium text-gray-700"
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="divide-y divide-gray-200">
          {permisosPaginados.length > 0 ? (
            permisosPaginados.map((permiso, idx) => {
              const row = table.getRowModel().rows[startIdx + idx];
              return (
                <tr key={row.id} className="hover:bg-gray-50">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-6 py-4 text-sm text-gray-800">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={columnas.length} className="px-6 py-8 text-center text-sm text-gray-500">
                No se encontraron permisos.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Paginación */}
      {pageCount > 1 && (
        <div className="flex justify-between items-center px-6 py-4 bg-gray-50 mt-4 rounded-b-md">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-white border rounded disabled:opacity-50"
          >
            Anterior
          </button>
          <span className="text-sm text-gray-700">
            Página {currentPage} de {pageCount}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, pageCount))}
            disabled={currentPage === pageCount}
            className="px-3 py-1 bg-white border rounded disabled:opacity-50"
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
};

export default TablaPermisos;
