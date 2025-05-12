export type EstadoGeneral = "Pendiente" | "Aprobado" | "Rechazado";

export type EstadoProceso =
  | "Pendiente de Jefe de Departamento"
  | "Aprobado por Jefe de Departamento"
  | "Rechazado por Jefe de Departamento"
  | "Pendiente de Recursos Humanos"
  | "Aprobado por Recursos Humanos"
  | "Rechazado por Recursos Humanos";

export type Permiso = {
  id: number;
  empleado: string;
  motivo: string;
  tipo: string;
  fechaInicio: string;
  fechaFin: string;
  estadoGeneral: EstadoGeneral;
  estadoProceso: EstadoProceso;
};
