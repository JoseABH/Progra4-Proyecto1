import React, { useMemo, useState, useEffect } from 'react';
import { useReactTable, getCoreRowModel, ColumnDef,} from '@tanstack/react-table';
import { FiEdit, FiTrash2, FiRefreshCw, FiPlus } from 'react-icons/fi';
import { fetchUsers, createUser, updateUser, deleteUser } from '../services/UserSevice';
import { User } from '../types/user';
import UserForm from './UserForm';

// Extend TableMeta to include custom properties
declare module '@tanstack/react-table' {
  interface TableMeta<TData> {
    setEditingUser?: (user: User | null) => void;
    setShowForm?: (show: boolean) => void;
    handleDeleteUser?: (userId: number) => void;
  }
}

const columns: ColumnDef<User>[] = [
  { header: 'ID', accessorKey: 'id' },
  { header: 'Nombre', accessorKey: 'name' },
  { header: 'Email', accessorKey: 'email' },
  {
    header: 'Rol',
    accessorKey: 'role',
    cell: (info) => <StatusBadge type={info.getValue() as User['role']} />,
  },
  {
    header: 'Acciones',
    id: 'acciones',
    cell: ({ row, table }) => (
      <div className="flex space-x-2">
        <button
          onClick={() => {
            const setEditingUser = table.options.meta?.setEditingUser;
            const setShowForm = table.options.meta?.setShowForm;
            if (setEditingUser && setShowForm) {
              setEditingUser(row.original);
              setShowForm(true);
            }
          }}
          className="bg-blue-800 text-white px-3 py-1 rounded hover:bg-blue-700 transition text-sm flex items-center"
        >
          <FiEdit className="mr-1" /> Editar
        </button>
        <button
          onClick={() => {
            const handleDeleteUser = table.options.meta?.handleDeleteUser;
            if (handleDeleteUser) {
              handleDeleteUser(row.original.id);
            }
          }}
          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition text-sm flex items-center"
        >
          <FiTrash2 className="mr-1" /> Eliminar
        </button>
      </div>
    ),
  },
];

const StatusBadge = ({ type }: { type: User['role'] }) => {
  const styles = {
    admin: 'bg-yellow-100 text-yellow-800',
    user: 'bg-gray-100 text-gray-600',
    moderator: 'bg-green-100 text-green-800',
  };

  const validType = styles[type] ? type : 'user';

  return (
    <span className={`text-xs px-2 py-1 rounded-full ${styles[validType]}`}>
      {validType.charAt(0).toUpperCase() + validType.slice(1)}
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

  const filteredData = useMemo(
    () => users.filter((user) => user.name.toLowerCase().includes(filter.toLowerCase())),
    [users, filter]
  );

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      setEditingUser,
      setShowForm,
      handleDeleteUser,
    },
  });

  return (
    <div className="p-6 bg-white rounded-xl shadow-md space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800">👥 Lista de Usuarios</h2>
        <div className="flex space-x-2">
          <button
            onClick={loadUsers}
            className="flex items-center gap-1 px-3 py-1 bg-gray-800 text-white text-sm rounded hover:bg-gray-700 transition"
          >
            <FiRefreshCw /> Actualizar
          </button>
          <button
            onClick={() => {
              setEditingUser(null);
              setShowForm(true);
            }}
            className="flex items-center gap-1 px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition"
          >
            <FiPlus /> Agregar
          </button>
        </div>
      </div>

      <input
        type="text"
        placeholder="🔍 Filtrar por nombre..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:outline-none text-black placeholder-gray-500"
      />

      {loading && <p className="text-gray-600">Cargando usuarios...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="space-y-4">
        {!loading &&
          !error &&
          table.getRowModel().rows.map((row) => (
            <div
              key={row.original.id}
              className="border border-gray-200 rounded-lg p-4 shadow-sm bg-white hover:shadow-md transition"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-medium text-gray-900">{row.original.name}</span>
                    <StatusBadge type={row.original.role} />
                  </div>
                  <p className="text-gray-700 text-sm">Email: {row.original.email}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      setEditingUser(row.original);
                      setShowForm(true);
                    }}
                    className="bg-blue-800 text-white px-3 py-1 rounded hover:bg-blue-700 transition text-sm flex items-center"
                  >
                    <FiEdit className="mr-1" /> Editar
                  </button>
                  <button
                    onClick={() => handleDeleteUser(row.original.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition text-sm flex items-center"
                  >
                    <FiTrash2 className="mr-1" /> Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))}
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