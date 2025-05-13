import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";
import { Permiso } from "../types/Permiso";
import { usePermisos } from "../hooks/usePermisos";
import { useState, useMemo } from "react";

const TablaPermisos = () => {
  const { permisos, loading, deletePermiso } = usePermisos();
  const [filtroGlobal, setFiltroGlobal] = useState("");

  const columnas: ColumnDef<Permiso>[] = [
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
    {
      accessorKey: "estadoProceso",
      header: "Estado de Proceso",
      cell: info => {
        const value = info.getValue() as Permiso["estadoProceso"];
        const color = value.includes("Aprobado")
          ? "text-green-600"
          : value.includes("Rechazado")
          ? "text-red-600"
          : "text-yellow-600";
        return <span className={`font-semibold ${color}`}>{value}</span>;
      },
    },
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

  const permisosFiltrados = useMemo(() => {
    const search = filtroGlobal.toLowerCase();
    return permisos.filter((permiso) =>
      Object.values(permiso).some((valor) =>
        String(valor).toLowerCase().includes(search)
      )
    );
  }, [permisos, filtroGlobal]);

  const table = useReactTable({
    data: permisosFiltrados,
    columns: columnas,
    getCoreRowModel: getCoreRowModel(),
  });

  if (loading) return <div>Cargando...</div>;

  return (
    <div className="overflow-x-auto border rounded-md shadow-sm bg-white p-4 space-y-4">
      <input
        type="text"
        placeholder="Buscar en toda la tabla..."
        className="border px-3 py-2 rounded-md w-full md:w-1/2 text-black"
        value={filtroGlobal}
        onChange={(e) => setFiltroGlobal(e.target.value)}
      />

      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
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
          {table.getRowModel().rows.map((row) => (
            <tr className="hover:bg-gray-300" key={row.id}>
              {row.getVisibleCells().map((cell) => (
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
