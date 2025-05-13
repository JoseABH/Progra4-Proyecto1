// src/components/TablaEmpleados.tsx

import { useState } from 'react'
import { MoreVertical, Pencil, Trash2 } from 'lucide-react'
import { Employee } from '../types/employee'

interface TablaEmpleadosProps {
  data: Employee[]
  onEdit?: (emp: Employee) => void
  onDelete?: (id: number) => void
}

export default function TablaEmpleados({ data, onEdit, onDelete }: TablaEmpleadosProps) {
  const [openMenuId, setOpenMenuId]     = useState<number | null>(null)
  const [currentPage, setCurrentPage]   = useState(1)
  const itemsPerPage = 5

  // Cálculo de paginación
  const pageCount = Math.ceil(data.length / itemsPerPage)
  const startIdx  = (currentPage - 1) * itemsPerPage
  const paginatedData = data.slice(startIdx, startIdx + itemsPerPage)

  const toggleMenu = (id: number) =>
    setOpenMenuId(openMenuId === id ? null : id)

  return (
    <div className="overflow-x-auto bg-white border border-gray-200 rounded-lg">
      <table className="min-w-full text-left">
        <thead className="border-b border-gray-200 bg-white">
          <tr>
            <th className="px-6 py-3 text-sm font-medium text-gray-700">Nombre</th>
            <th className="px-6 py-3 text-sm font-medium text-gray-700">Correo Electrónico</th>
            <th className="px-6 py-3 text-sm font-medium text-gray-700">Departamento</th>
            <th className="px-6 py-3 text-sm font-medium text-gray-700">Cargo</th>
            <th className="px-6 py-3 text-sm font-medium text-gray-700">Estado</th>
            <th className="px-6 py-3 text-center text-sm font-medium text-gray-700">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {paginatedData.map(emp => (
            <tr key={emp.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 text-sm text-gray-800">{emp.nombre}</td>
              <td className="px-6 py-4 text-sm text-gray-800">{emp.correo}</td>
              <td className="px-6 py-4 text-sm text-gray-800">{emp.departamento}</td>
              <td className="px-6 py-4 text-sm text-gray-800">{emp.cargo}</td>
              <td className="px-6 py-4 text-sm">
                <span
                  className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                    emp.estado === 'Activo'
                      ? 'bg-green-100 text-green-800'
                      : emp.estado === 'Ausente'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {emp.estado}
                </span>
              </td>
              <td className="px-6 py-4 text-center text-sm text-gray-500 relative">
                <button
                  onClick={() => toggleMenu(emp.id)}
                  className="p-1 hover:text-gray-700 hover:bg-gray-100 rounded-full transition"
                >
                  <MoreVertical />
                  <span className="sr-only">Abrir acciones</span>
                </button>
                {openMenuId === emp.id && (
                  <div
                    className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-20"
                    onMouseLeave={() => setOpenMenuId(null)}
                  >
                    <div
                      onClick={() => { setOpenMenuId(null); onEdit?.(emp) }}
                      className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                    >
                      <Pencil className="mr-2 h-4 w-4" /> Editar
                    </div>
                    <div
                      onClick={() => { setOpenMenuId(null); onDelete?.(emp.id) }}
                      className="flex items-center px-3 py-2 text-sm text-red-600 hover:bg-gray-100 cursor-pointer"
                    >
                      <Trash2 className="mr-2 h-4 w-4" /> Eliminar
                    </div>
                  </div>
                )}
              </td>
            </tr>
          ))}

          {data.length === 0 && (
            <tr>
              <td colSpan={6} className="px-6 py-8 text-center text-sm text-gray-500">
                No se encontraron empleados.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Paginación */}
      {pageCount > 1 && (
        <div className="flex justify-between items-center px-6 py-4 bg-gray-50">
          <button
            onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-white border rounded disabled:opacity-50"
          >
            Anterior
          </button>
          <span className="text-sm text-gray-700">
            Página {currentPage} de {pageCount}
          </span>
          <button
            onClick={() => setCurrentPage(p => Math.min(p + 1, pageCount))}
            disabled={currentPage === pageCount}
            className="px-3 py-1 bg-white border rounded disabled:opacity-50"
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  )
}
