// src/hooks/useEmployeeTable.ts
import { useEffect, useState } from 'react';
import { Employee } from '../types/employee';
import { getEmpleados, saveEmpleados } from '../services/GestionEmpleadosService';

export const useEmployeeTable = () => {
  const [data, setData] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const empleados = await getEmpleados();
        setData(empleados);
      } catch (error) {
        console.error('Error fetching employees:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const addEmployee = (nuevo: Omit<Employee, 'id'>) => {
    const nuevoConId: Employee = {
      id: Date.now(), // 
      ...nuevo,
    };
    const nuevos = [nuevoConId, ...data];
    setData(nuevos);
    saveEmpleados(nuevos).catch((error) => {
      console.error('Error saving employees:', error);
    
      setData(data);
    });
  };

  const updateEmployee = (id: number, actualizado: Employee) => {
    const nuevos = data.map((emp) => (emp.id === id ? actualizado : emp));
    setData(nuevos);
    saveEmpleados(nuevos).catch((error) => {
      console.error('Error saving employees:', error);
      
      setData(data);
    });
  };

  const deleteEmployee = (id: number) => {
    const nuevos = data.filter((emp) => emp.id !== id);
    setData(nuevos);
    saveEmpleados(nuevos).catch((error) => {
      console.error('Error saving employees:', error);
    
      setData(data);
    });
  };

  return {
    data,
    loading,
    openMenuId,
    setOpenMenuId,
    pagination,
    setPagination,
    addEmployee,
    updateEmployee,
    deleteEmployee,
  };
};