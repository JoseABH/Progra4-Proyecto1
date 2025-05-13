export type EstadoGeneral = "Pendiente" | "Aprobado" | "Rechazado";

export type EstadoProceso = "Jefe de Departamento" | "Recursos Humanos" | "Dirección";


export type Permiso = {
  id: number;
  empleado: string;
  motivo: string;
  tipo : "Vacaciones" | "Permiso personal";
  fechaInicio: string;
  fechaFin: string;
  estadoGeneral: EstadoGeneral;
  estadoProceso: EstadoProceso;
};
