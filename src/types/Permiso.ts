export type EstadoGeneral = "Pendiente" | "Aprobado" | "Rechazado";

export type EstadoProceso = "Jefe de Departamento" | "Jefe de RRHH";


export type Permiso = {
  id: number;
  empleado: string;
  motivo: string;
  tipo : "Vacaciones" | "Permiso personal"| "Asuntos medicos";
  fechaInicio: string;
  fechaFin: string;
  estadoGeneral: EstadoGeneral;
  estadoProceso: EstadoProceso;
  comentarios?: string;
  solicitadoEn?: string;
};
