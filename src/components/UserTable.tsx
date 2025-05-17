// src/components/UserTable.tsx
import React, { useMemo } from 'react';
import { useReactTable, getCoreRowModel, ColumnDef, flexRender } from '@tanstack/react-table';
import { FiEdit, FiTrash2, FiRefreshCw, FiPlus, FiMoreVertical } from 'react-icons/fi';
import { CiSearch } from 'react-icons/ci';
import { User } from '../types/user';
import { useUserTable } from '../hooks/useUserTable';
import UserForm from './UserForm';

// Define TableUser type
type TableUser = User & {
  onEdit?: (user: User) => void;
  onDelete?: (id: number) => void;
};

const StatusBadge = ({ type }: { type: User['role'] }) => {
  const styles = {
    'Usuario Comun': 'bg-gray-100 text-gray-600',
    'Jefe de Departamento': 'bg-green-100 text-green-800',
    'Jefe de RRHH': 'bg-yellow-100 text-yellow-800',
  };

  const validType = styles[type] ? type : 'Usuario Comun';

  return (
    <span className={`text-xs px-2 py-1 rounded-full ${styles[validType]}`}>
      {validType}
    </span>
  );
};

const UserTable: React.FC = () => {
  const {
    filter,
    setFilter,
    loading,
    error,
    showForm,
    editingUser,
    activeDropdown,
    currentPage,
    setCurrentPage,
    pageCount,
    paginatedData,
    loadUsers,
    handleAddUser,
    handleEditUser,
    toggleDropdown,
    setShowForm,
    setEditingUser,
  } = useUserTable();

  const columns = useMemo<ColumnDef<TableUser>[]>(() => [
    {
      header: 'ID',
      accessorKey: 'id',
      cell: (info) => <span className="text-sm text-gray-500">{info.getValue() as string}</span>,
    },
    {
      header: 'Nombre',
      accessorKey: 'name',
      cell: (info) => <span className="text-sm font-medium text-gray-900">{info.getValue() as string}</span>,
    },
    {
      header: 'Email',
      accessorKey: 'email',
      cell: (info) => <span className="text-sm text-gray-500">{info.getValue() as string}</span>,
    },
    {
      header: 'Rol',
      accessorKey: 'role',
      cell: (info) => <StatusBadge type={info.getValue() as User['role']} />,
    },
    {
      id: 'actions',
      header: () => (
        <div className="flex justify-center text-xs font-medium text-gray-500 uppercase tracking-wider">
          Acciones
        </div>
      ),
      cell: ({ row }) => (
        <div className="flex justify-center relative">
          <button
            onClick={(e) => toggleDropdown(row.original.id, e)}
            className="text-gray-400 hover:text-gray-600"
          >
            <FiMoreVertical size={20} />
          </button>
          {activeDropdown === row.original.id && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
              <div className="py-1">
                <button
                  onClick={() => {
                    setEditingUser(row.original);
                    setShowForm(true);
                  }}
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  <FiEdit className="mr-2" /> Editar
                </button>
                <button
                  onClick={() => {
                    row.original.onDelete?.(row.original.id);
                  }}
                  className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"
                >
                  <FiTrash2 className="mr-2" /> Eliminar
                </button>
              </div>
            </div>
          )}
        </div>
      ),
    },
  ], [activeDropdown, setShowForm, setEditingUser]);

  // Explicitly type the table with TableUser
  const table = useReactTable<TableUser>({
    data: paginatedData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-6 bg-white rounded-xl shadow-md space-y-6">
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col">
          <h2 className="text-lg font-bold text-gray-800"></h2>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-purple-700 mr-2"></span>
            <h3 className="text-lg font-bold text-gray-800">Lista de Usuarios</h3>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={loadUsers}
              className="flex items-center gap-1 px-4 py-2 bg-gray-800 text-white text-sm rounded hover:bg-gray-700 transition"
            >
              <FiRefreshCw /> Actualizar
            </button>
            <button
              onClick={() => {
                setEditingUser(null);
                setShowForm(true);
              }}
              className="flex items-center gap-1 px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-500 transition"
            >
              <FiPlus /> Agregar
            </button>
          </div>
        </div>

        <div className="relative w-4/12">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
            <CiSearch size={23} />
          </span>
          <input
            type="text"
            placeholder="Filtrar por nombre..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:outline-none text-black placeholder-gray-500"
          />
        </div>

        {loading && <p className="text-gray-600">Cargando usuarios...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-white">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50">
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-6 py-4 whitespace-nowrap">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

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

      {showForm && (
        <UserForm
          user={editingUser ? editingUser : undefined}
          onSave={(userData) =>
            editingUser
              ? handleEditUser(userData as User)
              : handleAddUser(userData as Omit<User, 'id'>)
          }
          onCancel={() => {
            setShowForm(false);
            setEditingUser(null);
          }}
        />
      )}
    </div>
  );
};

export default UserTable;