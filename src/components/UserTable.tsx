import React, { useMemo, useState, useEffect } from 'react';
import { useReactTable, getCoreRowModel, ColumnDef, flexRender } from '@tanstack/react-table';
import { FiEdit, FiTrash2, FiRefreshCw, FiPlus, FiMoreVertical } from 'react-icons/fi';
import { CiSearch } from "react-icons/ci";
import { fetchUsers, createUser, updateUser, deleteUser } from '../services/userSevice';
import { User } from '../types/user';
import UserForm from './UserForm';


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
  const [users, setUsers] = useState<User[]>([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  
  // Nuevas variables para paginación
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6; // Número de usuarios por página

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await fetchUsers();
      setUsers(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err) {
      setError('No se pudieron cargar los usuarios.');
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = async (userData: Omit<User, 'id'>) => {
    try {
      await createUser(userData);
      await loadUsers();
      setShowForm(false);
    } catch (err) {
      setError('No se pudo agregar el usuario.');
    }
  };

  const handleEditUser = async (user: User) => {
    try {
      await updateUser(user);
      await loadUsers();
      setShowForm(false);
      setEditingUser(null);
    } catch (err) {
      setError('No se pudo actualizar el usuario.');
    }
  };

  const handleDeleteUser = async (userId: number) => {
    if (window.confirm('¿Estás seguro de eliminar este usuario?')) {
      try {
        await deleteUser(userId);
        await loadUsers();
      } catch (err) {
        setError('No se pudo eliminar el usuario.');
      }
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // Resetear la página actual cuando cambia el filtro
  useEffect(() => {
    setCurrentPage(1);
  }, [filter]);

  const filteredData = useMemo(() => {
    // Primero filtramos los usuarios
    const filtered = users
      .filter(user => 
        user.name.toLowerCase().includes(filter.toLowerCase()) ||
        user.email.toLowerCase().includes(filter.toLowerCase())
      )
      .map(user => ({
        ...user,
        onEdit: (u: User) => {
          setEditingUser(u);
          setShowForm(true);
        },
        onDelete: handleDeleteUser,
      }));
    
    return filtered;
  }, [users, filter]);

  // Calcular datos paginados
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredData.slice(startIndex, startIndex + pageSize);
  }, [filteredData, currentPage, pageSize]);

  // Calcular el número total de páginas
  const pageCount = Math.ceil(filteredData.length / pageSize);

  const toggleDropdown = (userId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveDropdown(activeDropdown === userId ? null : userId);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setActiveDropdown(null);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Define columns for TanStack Table
  const columns = useMemo<ColumnDef<TableUser>[]>(() => [
    {
      header: 'ID',
      accessorKey: 'id',
      cell: info => <span className="text-sm text-gray-500">{info.getValue() as string}</span>
    },
    {
      header: 'Nombre',
      accessorKey: 'name',
      cell: info => <span className="text-sm font-medium text-gray-900">{info.getValue() as string}</span>
    },
    {
      header: 'Email',
      accessorKey: 'email',
      cell: info => <span className="text-sm text-gray-500">{info.getValue() as string}</span>
    },
    {
      header: 'Rol',
      accessorKey: 'role',
      cell: info => <StatusBadge type={info.getValue() as User['role']} />
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
                    setActiveDropdown(null);
                  }}
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  <FiEdit className="mr-2" /> Editar
                </button>
                <button
                  onClick={() => {
                    handleDeleteUser(row.original.id);
                    setActiveDropdown(null);
                  }}
                  className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"
                >
                  <FiTrash2 className="mr-2" /> Eliminar
                </button>
              </div>
            </div>
          )}
        </div>
      )
    }
  ], [activeDropdown]);

  // Initialize the table con datos paginados
  const table = useReactTable({
    data: paginatedData,
    columns,
    getCoreRowModel: getCoreRowModel()
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
            <CiSearch size={23}/>
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
                {table.getHeaderGroups().map(headerGroup => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map(header => (
                      <th 
                        key={header.id}
                        scope="col" 
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {header.isPlaceholder ? null : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {table.getRowModel().rows.map(row => (
                  <tr key={row.id} className="hover:bg-gray-50">
                    {row.getVisibleCells().map(cell => (
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