// src/services/GestionEmpleadosService.ts

import axios from "axios";
import { Employee } from "../types/employee";

const BIN_ID     = "682291ac8960c979a59844dc";
const ACCESS_KEY = "$2a$10$Qezppy1o5Y8Fm3ab6pfHB.ZivJSeJgzx1ERSldBy24y2M6KqWAyKO";
const BASE_URL   = `https://api.jsonbin.io/v3/b/${BIN_ID}`;

// Cliente Axios preconfigurado para JSONBin
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "X-Access-Key": ACCESS_KEY,
    "Content-Type": "application/json",
  },
});

/**
 * GET /latest → Employee[]
 */
export async function getEmpleados(): Promise<Employee[]> {
  const res = await api.get("/latest");
  const record = res.data.record;
  // JSONBin a veces envuelve el array en { record: [...] }
  return Array.isArray(record) ? record : record.record;
}

/**
 * GET por ID → Employee
 */
export async function getEmpleadoById(id: number): Promise<Employee> {
  const emps = await getEmpleados();
  const emp  = emps.find(e => e.id === id);
  if (!emp) {
    throw new Error(`Empleado con id ${id} no encontrado`);
  }
  return emp;
}

/**
 * PUT (sobrescribe todo el bin) → no return
 */
export async function saveEmpleados(arr: Employee[]): Promise<void> {
  // Si JSONBin espera directamente el array:
  await api.put("", arr);
  // Si JSONBin espera { record: [...] }, usar en su lugar:
  // await api.put("", { record: arr });
}
