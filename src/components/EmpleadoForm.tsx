// src/components/EmpleadoForm.tsx
import React, { useState, useEffect } from 'react'

import { FiX }      from 'react-icons/fi'
import { Employee } from '../types/employee'

interface EmpleadoFormProps {
  isOpen       : boolean
  onClose      : () => void
  empleadoForm : (data: Omit<Employee,'id'> | Employee) => void
  initialData? : Employee
}

const departamentos = ['Engineering','Marketing','Human Resources','Finance','Sales'] as const
const estados       = ['Activo','Ausente','Terminado']               as const

export default function EmpleadoForm({
  isOpen, onClose, empleadoForm, initialData
}: EmpleadoFormProps) {
  const isEdit = Boolean(initialData)
  const [form, setForm] = useState<Omit<Employee,'id'>>({
    nombre      : '',
    correo      : '',
    departamento: 'Engineering',
    cargo       : '',
    estado      : 'Activo',
  })

  useEffect(() => {
    if (initialData) {
      const { id, ...rest } = initialData
      setForm(rest)
    } else {
      setForm({
        nombre      : '',
        correo      : '',
        departamento: 'Engineering',
        cargo       : '',
        estado      : 'Activo',
      })
    }
  }, [initialData, isOpen])

  const handleChange = (f: keyof typeof form, v: string) =>
    setForm(prev => ({ ...prev, [f]: v }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    empleadoForm(isEdit
      ? ({ ...(initialData as Employee), ...form })
      : form
    )
    onClose()
  }

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
        <form onSubmit={handleSubmit} className="px-8 py-6 space-y-6">
          {/* Nombre */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
            <input
              type="text"
              value={form.nombre}
              onChange={e => handleChange('nombre', e.target.value)}
              className="w-full border-gray-300 border px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          {/* Correo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
            <input
              type="email"
              value={form.correo}
              onChange={e => handleChange('correo', e.target.value)}
              className="w-full border-gray-300 border px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          {/* Departamento */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Departamento</label>
            <select
              value={form.departamento}
              onChange={e => handleChange('departamento', e.target.value)}
              className="w-full border-gray-300 border px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500"
            >
              {departamentos.map(dep => <option key={dep} value={dep}>{dep}</option>)}
            </select>
          </div>
          {/* Cargo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cargo</label>
            <input
              type="text"
              value={form.cargo}
              onChange={e => handleChange('cargo', e.target.value)}
              className="w-full border-gray-300 border px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          {/* Estado */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
            <select
              value={form.estado}
              onChange={e => handleChange('estado', e.target.value)}
              className="w-full border-gray-300 border px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500"
            >
              {estados.map(est => <option key={est} value={est}>{est}</option>)}
            </select>
          </div>

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
