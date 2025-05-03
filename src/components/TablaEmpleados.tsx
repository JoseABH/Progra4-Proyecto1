import { useMemo, useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  flexRender,
  ColumnDef,
} from '@tanstack/react-table';
import { HiOutlinePencil, HiOutlineTrash, HiOutlinePlus } from 'react-icons/hi';

type Empleado = {
  id: number;
  nombre: string;
  cargo: string;
  departamento: string;
  estado: 'Activo' | 'Inactivo';
  documento: string;
  fechaContratacion: string;
};

const datosEmpleados: Empleado[] = [
  {
    id: 1,
    nombre: 'Juan Pérez',
    cargo: 'Desarrollador Frontend',
    departamento: 'Tecnología',
    estado: 'Activo',
    documento: '12345678A',
    fechaContratacion: '14/01/2022',
  },
  {
    id: 2,
    nombre: 'María López',
    cargo: 'Gerente de Proyecto',
    departamento: 'Administración',
    estado: 'Activo',
    documento: '87654321B',
    fechaContratacion: '09/06/2021',
  },
  {
    id: 3,
    nombre: 'Carlos Rodríguez',
    cargo: 'Analista de Datos',
    departamento: 'Tecnología',
    estado: 'Inactivo',
    documento: '23456789C',
    fechaContratacion: '21/03/2023',
  },
];

const TablaEmpleados = () => {
  const [filtroNombre, setFiltroNombre] = useState('');

  const columns = useMemo<ColumnDef<Empleado>[]>(
    () => [
      {
        header: 'Nombre',
        accessorKey: 'nombre',
        cell: info => <span className="font-semibold">{info.getValue() as string}</span>,
      },
      {
        header: 'Cargo',
        accessorKey: 'cargo',
        cell: info => info.getValue(),
      },
      {
        header: 'Departamento',
        accessorKey: 'departamento',
        cell: info => info.getValue(),
      },
      {
        header: 'Estado',
        accessorKey: 'estado',
        cell: ({ getValue }) => {
          const estado = getValue() as string;
          const color = estado === 'Activo' ? 'bg-green-500' : 'bg-red-500';
          return (
            <span className={`px-3 py-1 rounded-full text-white text-sm font-semibold ${color}`}>
              {estado}
            </span>
          );
        },
      },
      {
        header: 'Documento',
        accessorKey: 'documento',
        cell: info => info.getValue(),
      },
      {
        header: 'Fecha Contratación',
        accessorKey: 'fechaContratacion',
        cell: info => info.getValue(),
      },
      {
        header: 'Acciones',
        cell: () => (
          <div className="flex items-center gap-4 text-black">
            <button title="Editar">
              <HiOutlinePencil className="w-5 h-5" />
            </button>
            <button title="Eliminar">
              <HiOutlineTrash className="w-5 h-5" />
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const empleadosFiltrados = datosEmpleados.filter((empleado) =>
    empleado.nombre.toLowerCase().includes(filtroNombre.toLowerCase())
  );

  const table = useReactTable({
    data: empleadosFiltrados,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-6">Sistema de Gestión de Empleados</h2>

        {/* Tabs */}
        <div className="flex gap-2 mb-4">
          <button className="px-4 py-2 bg-gray-100 text-sm font-semibold rounded-md border border-gray-300">
            Gestión de Empleados
          </button>
          <button className="px-4 py-2 text-sm text-gray-500 font-medium rounded-md hover:bg-gray-100 transition">
            Reportes
          </button>
        </div>

        {/* Filtro y botón */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <input
            type="text"
            placeholder="🔍 Buscar empleados..."
            value={filtroNombre}
            onChange={(e) => setFiltroNombre(e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded-md w-full sm:w-1/2"
          />
          <button className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-900">
            <HiOutlinePlus className="w-5 h-5" />
            Añadir Empleado
          </button>
        </div>

        {/* Tabla */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white text-sm">
            <thead className="bg-gray-100 text-gray-600 font-medium">
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th key={header.id} className="px-4 py-3 text-left">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-gray-200">
              {table.getRowModel().rows.map(row => (
                <tr key={row.id} className="hover:bg-gray-50">
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id} className="px-4 py-3">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TablaEmpleados;
