// src/components/TablaEmpleados.tsx

import React from "react";
import {
  useReactTable,
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";
import { Employee } from "../types/employee";

/**
 * Ahora incluimos "data: Employee[]" en la interfaz de props,
 * ya que la página le pasará el array filtrado.
 */
interface TablaEmpleadosProps {
  data: Employee[];
  onEdit?: (emp: Employee) => void;
  onDelete?: (id: number) => void;
}

export default function TablaEmpleados({
  data,
  onEdit,
  onDelete,
}: TablaEmpleadosProps) {
  // Aquí se definen las columnas para React Table
  const columns: ColumnDef<Employee>[] = [
    { accessorKey: "nombre", header: "Nombre" },
    { accessorKey: "correo", header: "Correo Electrónico" },
    { accessorKey: "departamento", header: "Departamento" },
    { accessorKey: "cargo", header: "Cargo" },
    {
      accessorKey: "estado",
      header: "Estado",
      cell: (info) => {
        const estado = info.getValue<string>();
        const colorClasses =
          estado === "Activo"
            ? "bg-green-100 text-green-800"
            : estado === "Ausente"
            ? "bg-yellow-100 text-yellow-800"
            : "bg-red-100 text-red-800";
        return (
          <span
            className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${colorClasses}`}
          >
            {estado}
          </span>
        );
      },
    },
    {
      id: "acciones",
      header: () => <span className="text-center">Acciones</span>,
      cell: ({ row }) => {
        const emp = row.original;
        // Cada celda de “Acciones” puede tener su propio estado para el menú
        const [openMenuId, setOpenMenuId] = React.useState<number | null>(
          null
        );

        return (
          <div className="relative text-center">
            <button
              onClick={() =>
                setOpenMenuId(openMenuId === emp.id ? null : emp.id)
              }
              className="p-1 hover:text-gray-700 hover:bg-gray-100 rounded-full transition"
            >
              <MoreVertical />
              <span className="sr-only">Abrir acciones</span>
            </button>
            {openMenuId === emp.id && (
              <div
                className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-20"
                onMouseLeave={() => setOpenMenuId(null)}
              >
                <div
                  onClick={() => {
                    setOpenMenuId(null);
                    onEdit?.(emp);
                  }}
                  className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                >
                  <Pencil className="mr-2 h-4 w-4" /> Editar
                </div>
                <div
                  onClick={() => {
                    setOpenMenuId(null);
                    onDelete?.(emp.id);
                  }}
                  className="flex items-center px-3 py-2 text-sm text-red-600 hover:bg-gray-100 cursor-pointer"
                >
                  <Trash2 className="mr-2 h-4 w-4" /> Eliminar
                </div>
              </div>
            )}
          </div>
        );
      },
    },
  ];

  // Construimos la tabla usando el arreglo "data" enviado desde la página
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const rows = table.getRowModel().rows;
  const pageCount = table.getPageCount();
  const currentPage = table.getState().pagination.pageIndex + 1;

  return (
    <div className="overflow-x-auto bg-white border border-gray-200 rounded-lg">
      <table className="min-w-full text-left">
        <thead className="border-b border-gray-200 bg-white">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className={`px-6 py-3 text-sm font-medium text-gray-700 ${
                    header.id === "acciones" ? "text-center" : ""
                  }`}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="divide-y divide-gray-200">
          {rows.map((row) => (
            <tr key={row.id} className="hover:bg-gray-50">
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className={`px-6 py-4 text-sm text-gray-800 ${
                    cell.column.id === "acciones"
                      ? "text-center text-gray-500 relative"
                      : ""
                  }`}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}

          {data.length === 0 && (
            <tr>
              <td
                colSpan={6}
                className="px-6 py-8 text-center text-sm text-gray-500"
              >
                No se encontraron empleados.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {pageCount > 1 && (
        <div className="flex justify-between items-center px-6 py-4 bg-gray-50">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="px-3 py-1 bg-white border rounded disabled:opacity-50"
          >
            Anterior
          </button>
          <span className="text-sm text-gray-700">
            Página {currentPage} de {pageCount}
          </span>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="px-3 py-1 bg-white border rounded disabled:opacity-50"
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
}
