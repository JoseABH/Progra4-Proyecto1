// src/components/UserForm.tsx
import React, { useState, useEffect } from 'react'
import { useForm } from '@tanstack/react-form'
import { User } from '../types/user'
import { Employee } from '../types/employee'
import { getEmpleados } from '../services/GestionEmpleadosService'

interface UserFormProps {
  user?: User
  onSave: (user: Omit<User, 'id'> | User) => void
  onCancel: () => void
}

type FormValues = {
  name: string
  email: string
  password: string
  role: 'Usuario Comun' | 'Jefe de Departamento' | 'Jefe de RRHH'
  id_empleado: string
}

const UserForm: React.FC<UserFormProps> = ({ user, onSave, onCancel }) => {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [loadingEmployees, setLoadingEmployees] = useState(false)

  // 1) Creamos el form con los 10 parámetros genéricos
  const form = useForm<
    FormValues,    // TFieldValues
    undefined,     // TOnMount
    undefined,     // TOnChange
    undefined,     // TOnChangeAsync
    undefined,     // TOnBlur
    undefined,     // TOnBlurAsync
    undefined,     // TOnSubmit
    undefined,     // TOnSubmitAsync
    undefined,     // TServerSubmit
    undefined      // TSubmitMeta
  >({
    defaultValues: {
      name:        user?.name     ?? '',
      email:       user?.email    ?? '',
      password:    user?.password ?? '',
      role:        user?.role     ?? 'Usuario Comun',
      id_empleado: user?.id_empleado?.toString() ?? '',
    },
    onSubmit: ({ value }) =>
      onSave({
        ...value,
        id_empleado: value.id_empleado
          ? parseInt(value.id_empleado, 10)
          : undefined,
        ...(user ? { id: user.id } : {}),
      }),
  })

  // 2) Cargamos empleados para el dropdown
  useEffect(() => {
    setLoadingEmployees(true)
    getEmpleados()
      .then(setEmployees)
      .catch(() => setEmployees([]))
      .finally(() => setLoadingEmployees(false))
  }, [])

  // 3) Sincronizamos valores del user prop al form
  useEffect(() => {
    form.setFieldValue('name',        user?.name     ?? '')
    form.setFieldValue('email',       user?.email    ?? '')
    form.setFieldValue('password',    user?.password ?? '')
    form.setFieldValue('role',        user?.role     ?? 'Usuario Comun')
    form.setFieldValue('id_empleado', user?.id_empleado?.toString() ?? '')
  }, [user])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    form.handleSubmit()
  }

  return (
    <div className="User-form text-black fixed inset-0 bg-opacity-60 p-6 rounded-xl flex items-center justify-center z-50">
      <div className="bg-white bg-opacity-100 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">
          {user ? 'Editar Usuario' : 'Agregar Usuario'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Empleado A asociar */}
          <form.Field name="id_empleado">
            {field => (
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Empleado A asociar
                </label>
                <select
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={e => {
                    field.handleChange(e.target.value)
                    const sel = employees.find(emp => emp.id === +e.target.value)
                    if (sel) {
                      form.setFieldValue('name',  sel.nombre)
                      form.setFieldValue('email', sel.correo)
                    }
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Seleccione un empleado</option>
                  {employees.map(emp => (
                    <option key={emp.id} value={emp.id}>
                      {emp.nombre}
                    </option>
                  ))}
                </select>
                {loadingEmployees && (
                  <p className="text-sm text-gray-500">Cargando empleados...</p>
                )}
              </div>
            )}
          </form.Field>

          {/* Nombre */}
          <form.Field name="name">
            {field => (
              <div>
                <label className="block text-sm font-medium text-gray-700">Nombre</label>
                <input
                  id={field.name}
                  name={field.name}
                  type="text"
                  value={field.state.value}
                  onChange={e => field.handleChange(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}
          </form.Field>

          {/* Email */}
          <form.Field name="email">
            {field => (
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  id={field.name}
                  name={field.name}
                  type="email"
                  value={field.state.value}
                  onChange={e => field.handleChange(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}
          </form.Field>

          {/* Contraseña */}
          <form.Field name="password">
            {field => (
              <div>
                <label className="block text-sm font-medium text-gray-700">Contraseña</label>
                <input
                  id={field.name}
                  name={field.name}
                  type="password"
                  value={field.state.value}
                  onChange={e => field.handleChange(e.target.value)}
                  required={!user}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}
          </form.Field>

          {/* Rol */}
          <form.Field name="role">
            {field => (
              <div>
                <label className="block text-sm font-medium text-gray-700">Rol</label>
                <select
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={e => field.handleChange(e.target.value as FormValues['role'])}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Usuario Comun">Usuario Común</option>
                  <option value="Jefe de Departamento">Jefe de Departamento</option>
                  <option value="Jefe de RRHH">Jefe de RRHH</option>
                </select>
              </div>
            )}
          </form.Field>

          {/* Botones */}
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
  )
}

export default UserForm
