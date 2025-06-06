import React, { useState, useEffect } from 'react';
import { useForm } from '@tanstack/react-form';
import { User } from '../types/user';
import { Employee } from '../types/employee';
import { empleadoService } from "../services/GestionEmpleadosService";

interface UserFormProps {
  user?: User;
  onSave: (user: Omit<User, 'id'> | User) => void;
  onCancel: () => void;
}

type FormValues = {
  name: string;
  email: string;
  password: string;
  role: 'Usuario Comun' | 'Jefe de Departamento' | 'Jefe de RRHH';
  id_empleado: string | null;
};

const UserForm: React.FC<UserFormProps> = ({ user, onSave, onCancel }) => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loadingEmployees, setLoadingEmployees] = useState(false);

  const form = useForm({
    defaultValues: {
      name: user?.name ?? '',
      email: user?.email ?? '',
      role: user?.role ?? 'Usuario Comun',
      id_empleado: user?.id_empleado?.toString() ?? null,
      password: user?.password ?? '',
    },
    onSubmit: ({ value }: { value: FormValues }) => {
      console.log('Datos antes de onSave:', value); // Depuración adicional
      const baseUserData = {
        ...value,
        id_empleado:
          value.id_empleado !== null && value.id_empleado !== ''
            ? parseInt(value.id_empleado, 10)
            : user?.id_empleado ?? undefined,
      };
      // Ensure id_empleado is undefined if null
      if (baseUserData.id_empleado === null) {
        baseUserData.id_empleado = undefined;
      }
      const userData = user && typeof user.id === 'number'
        ? { ...baseUserData, id: user.id }
        : baseUserData;
      console.log('Datos enviados a onSave:', userData); // Depuración final
      onSave(userData);
    },
  });

  useEffect(() => {
    setLoadingEmployees(true);
    empleadoService.getAll()
      .then(setEmployees)
      .catch(() => setEmployees([]))
      .finally(() => setLoadingEmployees(false));
  }, []);

  useEffect(() => {
    form.setFieldValue('name', user?.name ?? '');
    form.setFieldValue('email', user?.email ?? '');
    form.setFieldValue('password', user?.password ?? '');
    form.setFieldValue('role', user?.role ?? 'Usuario Comun');
    form.setFieldValue('id_empleado', user?.id_empleado?.toString() ?? null);
  }, [user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    form.handleSubmit();
  };

  return (
    <div className="fixed inset-0 backdrop-blur-xs flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
        {/* Encabezado del modal */}
        <div className="bg-indigo-600 text-white font-bold text-lg py-3 px-5 rounded-t-xl flex justify-between items-center">
          <h2>{user ? 'EDITAR USUARIO' : 'AGREGAR USUARIO'}</h2>
          <button onClick={onCancel} className="text-white hover:text-gray-200">
            ✕
          </button>
        </div>

        {/* Cuerpo del formulario */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Empleado A asociar (oculto en modo edición) */}
          <form.Field name="id_empleado">
            {field => (
              <div>
                {!user && (
                  <>
                    <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                      Empleado A asociar
                    </label>
                    <select
                      id={field.name}
                      name={field.name}
                      value={field.state.value || ''}
                      onChange={e => {
                        field.handleChange(e.target.value);
                        const sel = employees.find(emp => emp.id === +e.target.value);
                        if (sel) {
                          form.setFieldValue('name', sel.nombre);
                          form.setFieldValue('email', sel.correo);
                          if (sel.cargo && !user) {
                            form.setFieldValue('role', sel.cargo as FormValues['role']);
                          }
                        }
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                    >
                      <option value="">Seleccione un empleado</option>
                      {employees.map(emp => (
                        <option key={emp.id} value={emp.id}>
                          {emp.nombre}
                        </option>
                      ))}
                    </select>
                    {loadingEmployees && (
                      <p className="text-sm text-gray-500 mt-1">Cargando empleados...</p>
                    )}
                  </>
                )}
                {user && (
                  <>
                    <input
                      type="hidden"
                      id={field.name}
                      name={field.name}
                      value={field.state.value || ''}
                      onChange={e => field.handleChange(e.target.value)}
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Empleado asociado: {user?.name || 'Sin empleado asociado'}
                    </p>
                  </>
                )}
              </div>
            )}
          </form.Field>

          {/* Nombre */}
          <form.Field name="name">
            {field => (
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                  Nombre
                </label>
                <input
                  id={field.name}
                  name={field.name}
                  type="text"
                  value={field.state.value}
                  onChange={e => field.handleChange(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                />
              </div>
            )}
          </form.Field>

          {/* Email */}
          <form.Field name="email">
            {field => (
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                  Correo Electrónico
                </label>
                <input
                  id={field.name}
                  name={field.name}
                  type="email"
                  value={field.state.value}
                  onChange={e => field.handleChange(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                />
              </div>
            )}
          </form.Field>

          {/* Contraseña */}
          <form.Field name="password">
            {field => (
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                  Contraseña
                </label>
                <input
                  id={field.name}
                  name={field.name}
                  type="password"
                  value={field.state.value}
                  onChange={e => field.handleChange(e.target.value)}
                  required={!user}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                />
              </div>
            )}
          </form.Field>

          {/* Rol */}
          <form.Field name="role">
            {field => (
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                  Cargo
                </label>
                <select
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={e => field.handleChange(e.target.value as FormValues['role'])}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-700"
                >
                  <option value="Usuario Comun">Usuario Común</option>
                  <option value="Jefe de Departamento">Jefe de Departamento</option>
                  <option value="Jefe de RRHH">Jefe de RRHH</option>
                </select>
              </div>
            )}
          </form.Field>

          {/* Botones */}
          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              {user ? 'Actualizar' : 'Agregar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;