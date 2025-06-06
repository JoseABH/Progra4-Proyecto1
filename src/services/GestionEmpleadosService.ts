// src/services/GestionEmpleadosService.ts

import { Employee } from "../types/employee";
import { client } from "./AuthService"; 


export const empleadoService = {
  /**
   * GET /api/employees
   * → Devuelve array de Employee[]
   */
  async getAll(): Promise<Employee[]> {
    const res = await client.get<Employee[]>("/api/employees");
    return res.data;
  },

  /**
   * GET /api/employees/{id}
   * → Devuelve un solo Employee
   */
  async getById(id: number): Promise<Employee> {
    const res = await client.get<Employee>(`/api/employees/${id}`);
    return res.data;
  },

  /**
   * POST /api/employees
   * → Crear un nuevo empleado (recibe Omit<Employee,"id">)
   *    y devuelve el Employee creado con su id.
   */
  async create(data: Omit<Employee, "id">): Promise<Employee> {
    const res = await client.post<Employee>("/api/employees", data);
    return res.data;
  },

  /**
   * PUT /api/employees/{id}
   * → Actualiza un empleado existente. No devuelve body (Promise<void>).
   */
  async update(id: number, data: Employee): Promise<void> {
    await client.put(`/api/employees/${id}`, data);
  },

  /**
   * DELETE /api/employees/{id}
   * → Elimina un empleado. No devuelve body (Promise<void>).
   */
  async delete(id: number): Promise<void> {
    await client.delete(`/api/employees/${id}`);
  },
};
