// src/pages/GestionEmpleadosPage.tsx

import { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import TablaEmpleados from "../components/TablaEmpleados";
import EmpleadoForm from "../components/EmpleadoForm";

import { empleadoService } from "../services/GestionEmpleadosService";
import { Employee } from "../types/employee";

export default function GestionEmpleadosPage() {
  const [search, setSearch] = useState("");
  const [empleados, setEmpleados] = useState<Employee[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 1) Carga inicial desde el backend
  useEffect(() => {
    cargarEmpleados();
  }, []);

  const cargarEmpleados = async () => {
    setLoading(true);
    try {
      const lista = await empleadoService.getAll();
      setEmpleados(lista);
      setError(null);
    } catch (err: any) {
      console.error("Error al cargar empleados:", err);
      setError("Error al cargar empleados");
    } finally {
      setLoading(false);
    }
  };

  // 2) Filtrado local según search
  const filtrados = empleados.filter((e) =>
    [e.nombre, e.correo, e.departamento, e.cargo]
      .some((campo) => campo.toLowerCase().includes(search.toLowerCase()))
  );

  // 3a) Agregar nuevo empleado
  const handleAdd = async (data: Omit<Employee, "id">) => {
    setLoading(true);
    try {
      const nuevoEmp = await empleadoService.create(data);
      setEmpleados((prev) => [nuevoEmp, ...prev]);
      setError(null);
    } catch (err: any) {
      console.error("Error al crear empleado:", err);
      setError("Error al crear empleado");
    } finally {
      setLoading(false);
      setModalOpen(false);
      setEditing(null);
    }
  };

  // 3b) Actualizar empleado existente
  const handleUpdate = async (upd: Employee) => {
    setLoading(true);
    try {
      await empleadoService.update(upd.id, upd);
      setEmpleados((prev) =>
        prev.map((e) => (e.id === upd.id ? { ...upd } : e))
      );
      setError(null);
    } catch (err: any) {
      console.error("Error al actualizar empleado:", err);
      setError("Error al actualizar empleado");
    } finally {
      setLoading(false);
      setModalOpen(false);
      setEditing(null);
    }
  };

  // 3c) Eliminar empleado
  const handleDelete = async (id: number) => {
    setLoading(true);
    try {
      await empleadoService.delete(id);
      setEmpleados((prev) => prev.filter((e) => e.id !== id));
      setError(null);
      if (editing && editing.id === id) {
        setModalOpen(false);
        setEditing(null);
      }
    } catch (err: any) {
      console.error("Error al eliminar empleado:", err);
      setError("Error al eliminar empleado");
    } finally {
      setLoading(false);
    }
  };

  // 4) Handler unificado: si editing tiene valor, hacemos update; caso contrario, create.
  const handleForm = (d: Employee | Omit<Employee, "id">) => {
    if (editing) {
      handleUpdate(d as Employee);
    } else {
      handleAdd(d as Omit<Employee, "id">);
    }
  };

  return (
    <main className="mt-4 container mx-auto px-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900">
          Gestión de Empleados
        </h1>
        <p className="mt-2 text-gray-600">
          Bienvenido, Administrador. Aquí puedes buscar, añadir o editar empleados.
        </p>
      </header>

      {/* Buscador + Botón Agregar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <div className="relative w-full sm:w-80">
          <FiSearch className="absolute left-4 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar empleados..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-12 pr-4 py-2 w-full border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <button
          onClick={() => {
            setEditing(null);
            setModalOpen(true);
          }}
          className="inline-flex items-center bg-indigo-600 text-white px-5 py-2 rounded-lg shadow hover:bg-indigo-700 transition"
        >
          + Agregar Empleado
        </button>
      </div>

      {/* Mensaje de error o cargando */}
      {error && (
        <div className="bg-red-100 text-red-800 p-3 mb-4 rounded">{error}</div>
      )}
      {loading && <p className="text-gray-600 mb-4">Cargando...</p>}

      {/* Tabla */}
      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <TablaEmpleados
          data={filtrados}
          onEdit={(emp) => {
            setEditing(emp);
            setModalOpen(true);
          }}
          onDelete={handleDelete}
        />
      </div>

      {/* Modal de formulario */}
      <EmpleadoForm
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditing(null);
        }}
        empleadoForm={handleForm}
        initialData={editing ?? undefined}
      />
    </main>
  );
}
