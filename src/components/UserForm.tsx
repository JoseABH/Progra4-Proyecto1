import React, { useState, useEffect } from 'react';
import { User } from '../types/user';
import { fetchUsers } from '../services/userSevice';

interface UserFormProps {
  user?: User;
  onSave: (user: Omit<User, 'id'> | User) => void;
  onCancel: () => void;
}

const UserForm: React.FC<UserFormProps> = ({ user, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: user?.password || '',
    role: user?.role || 'Usuario Comun',
    id_empleado: user?.id_empleado?.toString() || '',
  });
  const [employees, setEmployees] = useState<User[]>([]);
  const [loadingEmployees, setLoadingEmployees] = useState(false);

  // Fetch users for the employee dropdown
  useEffect(() => {
    const loadEmployees = async () => {
      setLoadingEmployees(true);
      try {
        const data = await fetchUsers();
        setEmployees(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error loading employees:', error);
        setEmployees([]);
      } finally {
        setLoadingEmployees(false);
      }
    };
    loadEmployees();
  }, []);

  // Sync formData with user prop when it changes
  useEffect(() => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      password: user?.password || '',
      role: user?.role || 'Usuario Comun',
      id_empleado: user?.id_empleado?.toString() || '',
    });
  }, [user]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      id_empleado: formData.id_empleado ? parseInt(formData.id_empleado) : undefined,
      ...(user ? { id: user.id } : {}),
    });
  };

  return (
    <div className="User-form text-black fixed inset-0 bg-black bg-opacity-60 p-6 rounded-xl flex items-center justify-center z-50">
      <div className="bg-white bg-opacity-100 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">
          {user ? 'Editar Usuario' : 'Agregar Usuario'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Empleado A asociar</label>
            <select
              name="id_empleado"
              value={formData.id_empleado}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Seleccione un empleado</option>
              {employees.map((employee) => (
                <option key={employee.id} value={employee.id}>
                  {employee.name}
                </option>
              ))}
            </select>
            {loadingEmployees && <p className="text-sm text-gray-500">Cargando empleados...</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Nombre</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Contraseña</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required={!user}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Rol</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Usuario Comun">Usuario Común</option>
              <option value="Jefe de Departamento">Jefe de Departamento</option>
              <option value="Jefe de RRHH">Jefe de RRHH</option>
            </select>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;