// src/hooks/useUserTable.ts
import { useState, useEffect, useMemo } from 'react';
import { fetchUsers, createUser, updateUser, deleteUser } from '../services/userSevice';
import { User } from '../types/user';

export const useUserTable = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const pageSize = 6;

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

  useEffect(() => {
    setCurrentPage(1);
  }, [filter]);

  const filteredData = useMemo(() => {
    const filtered = users
      .filter(
        (user) =>
          user.name.toLowerCase().includes(filter.toLowerCase()) ||
          user.email.toLowerCase().includes(filter.toLowerCase())
      )
      .map((user) => ({
        ...user,
        onEdit: (u: User) => {
          setEditingUser(u);
          setShowForm(true);
        },
        onDelete: handleDeleteUser,
      }));
    return filtered;
  }, [users, filter]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredData.slice(startIndex, startIndex + pageSize);
  }, [filteredData, currentPage]);

  const pageCount = Math.ceil(filteredData.length / pageSize);

  const toggleDropdown = (userId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveDropdown(activeDropdown === userId ? null : userId);
  };

  useEffect(() => {
    const handleClickOutside = () => setActiveDropdown(null);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return {
    users,
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
  };
};