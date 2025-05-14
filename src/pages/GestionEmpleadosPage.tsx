// src/pages/GestionEmpleadosPage.tsx

import { useState, useEffect } from 'react';
import { FiSearch } from 'react-icons/fi';
import TablaEmpleados from '../components/TablaEmpleados';
import EmpleadoForm   from '../components/EmpleadoForm';

import { getEmpleados, saveEmpleados } from '../services/GestionEmpleadosService';
import { Employee } from '../types/employee';

export default function GestionEmpleadosPage() {
  const [search,    setSearch]    = useState('');
  const [empleados, setEmpleados] = useState<Employee[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing,   setEditing]   = useState<Employee | null>(null);

  // 1) Carga inicial
  useEffect(() => {
    getEmpleados()
      .then(setEmpleados)
      .catch(err => console.error('Error al cargar empleados:', err));
  }, []);

  // 2) Filtrado local
  const filtrados = empleados.filter(e =>
    [e.nombre, e.correo, e.departamento, e.cargo]
      .some(f => f.toLowerCase().includes(search.toLowerCase()))
  );

  // 3) Sincroniza state + JSONBin
  const sync = async (arr: Employee[]) => {
    setEmpleados(arr);
    await saveEmpleados(arr);
  };

  const handleAdd = (data: Omit<Employee,'id'>) => {
    const nuevo: Employee = { id: Date.now(), ...data };
    return sync([nuevo, ...empleados]);
  };
  const handleUpdate = (upd: Employee) =>
    sync(empleados.map(e => e.id === upd.id ? upd : e));
  const handleDelete = (id: number) =>
    sync(empleados.filter(e => e.id !== id));

  // 4) Handler unificado para add/update
  const handleForm = (d: Employee | Omit<Employee,'id'>) => {
    editing
      ? handleUpdate(d as Employee)
      : handleAdd(d as Omit<Employee,'id'>);
  };

  return (
    <main className="mt-4 container mx-auto px-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900">Gestión de Empleados</h1>
        <p className="mt-2 text-gray-600">
          Bienvenido, Administrador. Aquí puedes buscar, añadir o editar empleados.
        </p>
      </header>

      {/* Buscador + Botón */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <div className="relative w-full sm:w-80">
          <FiSearch className="absolute left-4 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar empleados..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-12 pr-4 py-2 w-full border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <button
          onClick={() => { setEditing(null); setModalOpen(true); }}
          className="inline-flex items-center bg-indigo-600 text-white px-5 py-2 rounded-lg shadow hover:bg-indigo-700 transition"
        >
          + Agregar Empleado
        </button>
      </div>

      {/* Tabla */}
      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <TablaEmpleados
          data={filtrados}
          onEdit   ={emp => { setEditing(emp); setModalOpen(true); }}
          onDelete ={handleDelete}
        />
      </div>

      {/* Modal de formulario */}
      <EmpleadoForm
        isOpen      ={modalOpen}
        onClose     ={() => setModalOpen(false)}
        empleadoForm={handleForm}
        initialData ={editing ?? undefined}
      />
    </main>
  );
}
