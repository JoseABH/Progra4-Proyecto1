// src/components/EmpleadoForm.tsx
import { useEffect } from 'react'
import { useForm } from '@tanstack/react-form'
import { FiX } from 'react-icons/fi'
import { Employee } from '../types/employee'

interface EmpleadoFormProps {
  isOpen       : boolean
  onClose      : () => void
  empleadoForm : (data: Omit<Employee,'id'> | Employee) => void
  initialData? : Employee
}

const departamentos = ['Engineering','Marketing','Human Resources','Finance','Sales'] as const
const estados       = ['Activo','Ausente','Terminado']               as const

// Valores iniciales vacíos tipados como Omit<Employee,'id'>
const emptyValues: Omit<Employee,'id'> = {
  nombre: '',
  correo: '',
  departamento: 'Engineering',
  cargo: '',
  estado: 'Activo',
}

export default function EmpleadoForm({
  isOpen,
  onClose,
  empleadoForm,
  initialData,
}: EmpleadoFormProps) {
  const isEdit = Boolean(initialData)

  // Combina initialData con emptyValues garantizando el tipo
  const initialValues = initialData ?? emptyValues

  const form = useForm({
    defaultValues: initialValues as Omit<Employee,'id'>,
    onSubmit: ({ value }) => {
      const payload = isEdit
        ? { ...(initialData as Employee), ...value }
        : value
      empleadoForm(payload)
      onClose()
    },
  })

  useEffect(() => {
    form.reset(initialValues as Omit<Employee,'id'>)
  }, [initialData, isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-full max-w-lg mx-4 overflow-hidden shadow-2xl">
        <div className="px-8 py-4 bg-indigo-600 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-white">
            {isEdit ? 'Editar Empleado' : 'Agregar Nuevo Empleado'}
          </h2>
          <button onClick={onClose} className="text-white hover:text-indigo-200">
            <FiX size={24} />
          </button>
        </div>
        <form onSubmit={form.handleSubmit} className="px-8 py-6 space-y-6">
          <form.Field name="nombre">
            {field => (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                <input
                  type="text"
                  value={field.state.value as string}
                  onBlur={field.handleBlur}
                  onChange={e => field.handleChange(e.target.value as any)}
                  className="w-full border-gray-300 border px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
            )}
          </form.Field>

          <form.Field name="correo">
            {field => (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
                <input
                  type="email"
                  value={field.state.value as string}
                  onBlur={field.handleBlur}
                  onChange={e => field.handleChange(e.target.value as any)}
                  className="w-full border-gray-300 border px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
            )}
          </form.Field>

          <form.Field name="departamento">
            {field => (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Departamento</label>
                <select
                  value={field.state.value as string}
                  onBlur={field.handleBlur}
                  onChange={e => field.handleChange(e.target.value as any)}
                  className="w-full border-gray-300 border px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500"
                >
                  {departamentos.map(dep => <option key={dep} value={dep}>{dep}</option>)}
                </select>
              </div>
            )}
          </form.Field>

            <form.Field name="cargo">
            {field => (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cargo</label>
                <select
                  value={field.state.value as string}
                  onBlur={field.handleBlur}
                  onChange={e => field.handleChange(e.target.value as any)}
                  className="w-full border-gray-300 border px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  required
                >
                  <option value="Usuario Comun">Usuario Común</option>
                  <option value="Jefe de Departamento">Jefe de Departamento</option>
                  <option value="Jefe de RRHH">Jefe de RRHH</option>
                </select>
              </div>
            )}
          </form.Field>

          <form.Field name="estado">
            {field => (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
                <select
                  value={field.state.value as string}
                  onBlur={field.handleBlur}
                  onChange={e => field.handleChange(e.target.value as any)}
                  className="w-full border-gray-300 border px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500"
                >
                  {estados.map(est => <option key={est} value={est}>{est}</option>)}
                </select>
              </div>
            )}
          </form.Field>

          <div className="flex justify-end space-x-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition"
            >
              {isEdit ? 'Guardar' : 'Agregar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
