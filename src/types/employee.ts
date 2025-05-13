export interface Employee {
  id: number
  nombre: string
  correo: string
  departamento: string
  cargo: string
  estado: 'Activo' | 'Ausente' | 'Terminado'
}
