// src/hooks/useEmployeeTable.ts

import { useEffect, useState } from "react";
import { Employee } from "../types/employee";
import { empleadoService } from "../services/GestionEmpleadosService";

export interface UseEmployeeTableResult {
  data: Employee[];
  loading: boolean;
  error: string | null;
  openMenuId: number | null;
  setOpenMenuId: React.Dispatch<React.SetStateAction<number | null>>;
  pagination: {
    pageIndex: number;
    pageSize: number;
  };
  setPagination: React.Dispatch<
    React.SetStateAction<{
      pageIndex: number;
      pageSize: number;
    }>
  >;
  addEmployee: (nuevo: Omit<Employee, "id">) => Promise<void>;
  updateEmployee: (actualizado: Employee) => Promise<void>;
  deleteEmployee: (id: number) => Promise<void>;
}

export const useEmployeeTable = (): UseEmployeeTableResult => {
  const [data, setData] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });

  // 1) Carga inicial
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const empleados = await empleadoService.getAll();
        setData(empleados);
        setError(null);
      } catch (err: any) {
        console.error("Error al cargar empleados:", err);
        setError("Error al cargar empleados");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // 2) Crear un nuevo empleado
  const addEmployee = async (nuevo: Omit<Employee, "id">) => {
    setLoading(true);
    try {
      const creado = await empleadoService.create(nuevo);
      setData((prev) => [creado, ...prev]);
      setError(null);
    } catch (err: any) {
      console.error("Error al crear empleado:", err);
      setError("Error al crear empleado");
    } finally {
      setLoading(false);
    }
  };

  // 3) Actualizar un empleado existente
  const updateEmployee = async (actualizado: Employee) => {
    setLoading(true);
    try {
      await empleadoService.update(actualizado.id, actualizado);
      setData((prev) =>
        prev.map((e) => (e.id === actualizado.id ? actualizado : e))
      );
      setError(null);
    } catch (err: any) {
      console.error("Error al actualizar empleado:", err);
      setError("Error al actualizar empleado");
    } finally {
      setLoading(false);
    }
  };

  // 4) Eliminar un empleado
  const deleteEmployee = async (id: number) => {
    setLoading(true);
    try {
      await empleadoService.delete(id);
      setData((prev) => prev.filter((e) => e.id !== id));
      setError(null);
      if (openMenuId === id) {
        setOpenMenuId(null);
      }
    } catch (err: any) {
      console.error("Error al eliminar empleado:", err);
      setError("Error al eliminar empleado");
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    error,
    openMenuId,
    setOpenMenuId,
    pagination,
    setPagination,
    addEmployee,
    updateEmployee,
    deleteEmployee,
  };
};
