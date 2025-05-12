import React, { useMemo, useState, useEffect } from 'react';
import { useReactTable, getCoreRowModel, ColumnDef } from '@tanstack/react-table';
import { FiEye, FiEdit, FiTrash2, FiCalendar } from 'react-icons/fi';
import { fetchUsers } from '../service/UserSevice';

type User = {
    id: number;
    name: string;
    email: string;
    password: string;
    role: 'admin' | 'user' | 'moderator' | 'pendiente' | 'aprobada';
};

const columns: ColumnDef<User>[] = [
    { header: 'ID', accessorKey: 'id' },
    { header: 'Nombre', accessorKey: 'name' },
    { header: 'Email', accessorKey: 'email' },
    { header: 'Rol', accessorKey: 'role' },
];

const StatusBadge = ({ type }: { type: 'admin' | 'user' | 'moderator' | 'pendiente' | 'aprobada' }) => {
    const styles = {
        'admin': 'bg-yellow-100 text-yellow-800',
        'user': 'bg-gray-100 text-gray-600',
        'moderator': 'bg-green-100 text-green-800',
        'pendiente': 'bg-yellow-100 text-yellow-800',
        'aprobada': 'bg-green-100 text-green-800'
    };

    return (
        <span className={`text-xs px-2 py-1 rounded-full ${styles[type] || 'bg-gray-100 text-gray-800'}`}>
            {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
    );
};

const UserTable: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        const loadUsers = async () => {
            const data = await fetchUsers();
            setUsers(data);
        };
        loadUsers();
    }, []);

    const filteredData = useMemo(() => users.filter(user => user.name.toLowerCase().includes(filter.toLowerCase())), [filter, users]);

    const table = useReactTable({
        data: filteredData,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="p-6 bg-white rounded-xl shadow-md space-y-6">
            <h2 className="text-xl font-bold text-gray-800">👥 Lista de Usuarios</h2>
            <input
                type="text"
                placeholder="🔍 Filtrar por nombre..."
                value={filter}
                onChange={e => setFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:outline-none text-black placeholder-gray-500"
            />

            <div className="space-y-4">
                {table.getRowModel().rows.map(row => (
                    <div key={row.original.id} className="border border-gray-200 rounded-lg p-4 shadow-sm bg-white hover:shadow-md transition">
                        <div className="flex justify-between items-start">
                            <div className="space-y-2">
                                <div className="flex items-center space-x-2 mb-1">
                                    <span className="font-medium text-gray-900">{row.original.name}</span>
                                    <StatusBadge type={row.original.role} />
                                </div>
                                <p className="text-gray-700 text-sm">
                                    <FiCalendar className="inline mr-1" /> Registro: {new Date().toLocaleDateString()}
                                </p>
                            </div>
                            <div className="flex space-x-2">
                                <button className="bg-black text-white px-3 py-1 rounded hover:bg-gray-800 transition text-sm flex items-center">
                                    <FiEye className="mr-1" /> Ver
                                </button>
                                <button className="bg-blue-800 text-white px-3 py-1 rounded hover:bg-blue-700 transition text-sm flex items-center">
                                    <FiEdit className="mr-1" /> Editar
                                </button>
                                <button className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition text-sm flex items-center">
                                    <FiTrash2 className="mr-1" /> Eliminar
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserTable;
