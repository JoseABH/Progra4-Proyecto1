// src/services/GestionEmpleadosService.ts

import { Employee } from "../types/employee";

const BIN_ID     = '682291ac8960c979a59844dc';
const ACCESS_KEY = '$2a$10$Qezppy1o5Y8Fm3ab6pfHB.ZivJSeJgzx1ERSldBy24y2M6KqWAyKO';
const BASE_URL   = `https://api.jsonbin.io/v3/b/${BIN_ID}`;

// Cabeceras para GET y PUT
const readHeaders = {
  'X-Access-Key': ACCESS_KEY,
};
const writeHeaders = {
  ...readHeaders,
  'Content-Type': 'application/json',
};



/** GET /latest → Employee[] */
export async function getEmpleados(): Promise<Employee[]> {
  const res = await fetch(`${BASE_URL}/latest`, {
    method:  "GET",
    headers: readHeaders,
  });
  if (!res.ok) throw new Error(`getEmpleados: ${res.status}`);
  const json = await res.json();
  const data = Array.isArray(json.record)
    ? json.record
    : json.record.record;
  return data as Employee[];
}

/** GET por ID → Employee */
export async function getEmpleadoById(id: number): Promise<Employee> {
  const emps = await getEmpleados();
  const emp  = emps.find(e => e.id === id);
  if (!emp) throw new Error(`Empleado con id ${id} no encontrado`);
  return emp;
}

/** PUT (sobrescribe) → no return */
export async function saveEmpleados(arr: Employee[]): Promise<void> {
  const res = await fetch(BASE_URL, {
    method:  'PUT',
    headers: writeHeaders,
    // Opción A: guardar directamente el array
    body:    JSON.stringify(arr),
    // Si prefieres seguir guardando en { record: [...] }, descomenta la línea siguiente y comenta la anterior:
    // body: JSON.stringify({ record: arr }),
  });
  if (!res.ok) throw new Error(`saveEmpleados: ${res.status}`);
}
